"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { supabase } from "@/integrations/supabase/client";

/**
 * Globales Bestellanfrage-Pop-up.
 * Stellt einen Context-Provider + useBestellModal()-Hook bereit, damit
 * jeder CTA auf der Site das Modal öffnen kann, ohne eigene Route.
 *
 * Schliessen ausschliesslich via X-Button oder ESC (kein Backdrop-Close).
 */

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const BestellCtx = createContext<Ctx | null>(null);

export function useBestellModal() {
  const ctx = useContext(BestellCtx);
  if (!ctx) throw new Error("useBestellModal muss innerhalb von <BestellModalProvider> verwendet werden");
  return ctx;
}

/** Drop-in CTA-Button (eckig + Magnetic-Hover), der das Bestell-Modal öffnet. */
export function BestellTrigger({
  className,
  children,
  magnetic = true,
}: { className?: string; children: ReactNode; magnetic?: boolean }) {
  const { open } = useBestellModal();
  const btn = (
    <button type="button" onClick={open} data-cursor="link" className={className}>
      {children}
    </button>
  );
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn;
}

const baseSchema = z.object({
  company: z.string().trim().max(100).optional(),
  name: z.string().trim().min(2, "Bitte vollständigen Namen angeben").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  phone: z.string().trim().min(7, "Telefonnummer zu kurz").max(30),
  lieferart: z.enum(["liefern", "abholen"]),
  address: z.string().trim().max(200).optional(),
  plz: z.string().trim().max(10).optional(),
  ort: z.string().trim().max(80).optional(),
  sorte: z.enum(["haus", "mini"]),
  qm: z.coerce.number().min(1, "Mindestens 1 m²").max(10000),
  liefertermin: z.string().trim().min(1, "Wunschtermin angeben").max(40),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Bitte zustimmen" }) }),
});

const schema = baseSchema.superRefine((data, ctx) => {
  if (data.lieferart === "liefern") {
    if (!data.address || data.address.length < 5) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["address"], message: "Adresse erforderlich" });
    }
    if (!data.plz || !/^\d{4}$/.test(data.plz)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["plz"], message: "PLZ muss 4-stellig sein" });
    }
    if (!data.ort || data.ort.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["ort"], message: "Ort erforderlich" });
    }
  }
});

type FormData = z.infer<typeof baseSchema>;
type Errors = Partial<Record<keyof FormData, string>>;

export function BestellModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Body scroll lock + ESC
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <BestellCtx.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <BestellOverlay onClose={close} />}
    </BestellCtx.Provider>
  );
}

function BestellOverlay({ onClose }: { onClose: () => void }) {
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [lieferart, setLieferart] = useState<"liefern" | "abholen">("liefern");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    (raw as Record<string, unknown>).consent = fd.get("consent") === "on";
    (raw as Record<string, unknown>).lieferart = lieferart;

    const result = schema.safeParse(raw);
    if (!result.success) {
      const errs: Errors = {};
      result.error.errors.forEach((er) => {
        const k = er.path[0] as keyof FormData;
        if (!errs[k]) errs[k] = er.message;
      });
      setErrors(errs);
      toast.error("Bitte prüfen Sie die markierten Felder");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("wald-hof-order", {
        body: result.data,
      });
      if (error || (data as { error?: string })?.error) {
        throw new Error(error?.message || (data as { error?: string }).error || "Fehler beim Senden");
      }
      (e.target as HTMLFormElement).reset();
      toast.success("Anfrage erhalten — Sie erhalten gleich eine Bestätigung per E-Mail.");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Senden fehlgeschlagen — bitte versuchen Sie es erneut oder rufen Sie uns an.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bestell-modal-title"
      data-lenis-prevent
      onWheelCapture={(e) => e.stopPropagation()}
      onTouchMoveCapture={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-ink/70 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div className="flex min-h-full items-start justify-center p-0 md:py-10">
        <div className="relative w-full max-w-[1100px] bg-bg shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            aria-label="Schliessen"
            className="absolute right-4 top-4 z-10 rounded-full border border-ink/20 bg-bg p-2.5 text-ink transition-colors hover:bg-ink hover:text-bg md:right-6 md:top-6"
            data-cursor="link"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="px-6 pb-12 pt-12 md:px-12 md:pb-16 md:pt-16">
            <p className="eyebrow text-moss">05 / Bestellung</p>
            <h2 id="bestell-modal-title" className="mt-3 font-display text-4xl leading-[1.05] text-ink md:text-6xl">
              Bestellung <em className="italic font-light text-moss">anfragen.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
              Senden Sie uns Ihre Bestellanfrage — wir bestätigen Ihre Bestellung so schnell wie möglich.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12 md:col-span-3">
                <p className="eyebrow text-moss">01 / Kontakt</p>
              </div>
              <div className="col-span-12 grid gap-6 md:col-span-9 md:grid-cols-2">
                <Field label="Firma (optional)" name="company" error={errors.company} placeholder="Müller Gartenbau AG" />
                <Field label="Ihr Name *" name="name" error={errors.name} placeholder="Max Muster" />
                <Field label="E-Mail *" name="email" type="email" error={errors.email} placeholder="max@firma.ch" />
                <Field label="Telefon *" name="phone" type="tel" error={errors.phone} placeholder="079 123 45 67" />
              </div>

              <div className="col-span-12 mt-4 border-t border-ink/15 pt-8 md:col-span-3">
                <p className="eyebrow text-moss">02 / Lieferung</p>
              </div>
              <div className="col-span-12 mt-0 md:col-span-9 md:mt-4 md:border-t md:border-ink/15 md:pt-8">
                <div className="grid grid-cols-2 gap-px bg-ink/15">
                  {([
                    { v: "liefern", label: "Lieferung" },
                    { v: "abholen", label: "Abholen ab Hof" },
                  ] as const).map((opt) => {
                    const active = lieferart === opt.v;
                    return (
                      <button
                        key={opt.v}
                        type="button"
                        onClick={() => setLieferart(opt.v)}
                        data-cursor="link"
                        className={`px-5 py-4 text-left text-sm uppercase tracking-[0.16em] transition-colors ${active ? "bg-ink text-bg" : "bg-bg text-ink hover:bg-cream"}`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div className={`mt-6 grid gap-6 md:grid-cols-3 ${lieferart === "abholen" ? "opacity-50" : ""}`}>
                  <div className="md:col-span-3">
                    <Field
                      label={lieferart === "liefern" ? "Strasse, Nr. *" : "Strasse, Nr. (optional)"}
                      name="address"
                      error={errors.address}
                      placeholder="Zielebachweg 6"
                    />
                  </div>
                  <Field
                    label={lieferart === "liefern" ? "PLZ *" : "PLZ (optional)"}
                    name="plz"
                    error={errors.plz}
                    placeholder="3428"
                  />
                  <div className="md:col-span-2">
                    <Field
                      label={lieferart === "liefern" ? "Ort *" : "Ort (optional)"}
                      name="ort"
                      error={errors.ort}
                      placeholder="Wiler"
                    />
                  </div>
                </div>
                {lieferart === "abholen" && (
                  <p className="mt-3 text-xs text-ink/55">Abholung in Wiler, Zielebachweg 6 — auf Voranmeldung.</p>
                )}
              </div>

              <div className="col-span-12 mt-4 border-t border-ink/15 pt-8 md:col-span-3">
                <p className="eyebrow text-moss">03 / Rollrasen</p>
              </div>
              <div className="col-span-12 mt-0 grid gap-6 md:col-span-9 md:mt-4 md:grid-cols-3 md:border-t md:border-ink/15 md:pt-8">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.16em] text-ink/55">Sorte *</span>
                  <select name="sorte" defaultValue="haus" className="w-full appearance-none border-b border-ink/30 bg-bg py-3 pr-6 text-lg text-ink outline-none focus:border-moss">
                    <option value="haus">Haus- und Allzweckrasen</option>
                    <option value="mini">Mini-Kräuter-Flora</option>
                  </select>
                </label>
                <Field label="Fläche m² *" name="qm" type="number" error={errors.qm} placeholder="200" />
                <Field label="Wunschtermin *" name="liefertermin" type="date" error={errors.liefertermin} />
                <div className="md:col-span-3">
                  <label className="block">
                    <span className="text-xs uppercase tracking-[0.16em] text-ink/55">Bemerkungen</span>
                    <textarea
                      name="message"
                      rows={3}
                      maxLength={1000}
                      placeholder="Anliefer-Slot, Kran nötig, Mischsorte etc."
                      className="w-full resize-none border-b border-ink/30 bg-transparent py-3 text-lg text-ink outline-none placeholder:text-ink/35 focus:border-moss"
                    />
                  </label>
                  {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
                </div>
              </div>

              <div className="col-span-12 mt-4 border-t border-ink/15 pt-8">
                <label className="flex items-start gap-3 text-sm text-ink/75">
                  <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-moss" required />
                  <span>Ich bin einverstanden, dass Waldhof meine Angaben zur Bearbeitung der Anfrage verwendet (siehe <a href="/datenschutz" className="story-link text-ink">Datenschutz</a>).</span>
                </label>
                {errors.consent && <p className="mt-2 text-xs text-destructive">{errors.consent}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  data-cursor="link"
                  className="mt-8 inline-flex items-center gap-3 bg-ink px-10 py-5 text-sm uppercase tracking-[0.16em] text-bg transition-colors hover:bg-moss disabled:opacity-50"
                >
                  {submitting ? "Wird gesendet…" : "Anfrage senden"} <span aria-hidden>→</span>
                </button>
                <p className="mt-4 text-xs text-ink/55">Wir bestätigen Ihre Bestellung so schnell wie möglich.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", error, placeholder,
}: { label: string; name: string; type?: string; error?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.16em] text-ink/55">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full border-b border-ink/30 bg-transparent py-3 text-lg text-ink outline-none placeholder:text-ink/35 focus:border-moss"
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
