"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import oega from "@/assets/oega-messe.jpg";

/**
 * Pop-up auf der Startseite: Besuchen Sie uns an der ÖGA (bis 26.06.).
 * Wird automatisch nach 700ms angezeigt, schliessbar via X oder Escape.
 * Merkt sich Schliessen pro Session.
 */
export default function OegaPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("oega-popup-dismissed")) return;
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleClose = () => {
    sessionStorage.setItem("oega-popup-dismissed", "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="oega-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
    >
      <button
        type="button"
        aria-label="Schliessen"
        onClick={handleClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden bg-bg shadow-2xl animate-scale-in">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Schliessen"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center bg-bg/90 text-ink transition-colors hover:bg-ink hover:text-bg"
        >
          <X className="h-4 w-4" />
        </button>
        <figure className="aspect-[16/9] overflow-hidden bg-cream">
          <img
            src={oega.src}
            alt="Luftaufnahme der ÖGA-Messe — Stände und Maschinen"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="p-8 md:p-10">
          <p className="eyebrow text-moss">Messe · bis 26.06.</p>
          <h2 id="oega-title" className="font-display mt-4 text-3xl tracking-tight text-ink md:text-4xl">
            Besuchen Sie uns an der <em className="italic text-moss">ÖGA</em>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75 md:text-lg">
            Sie finden uns in <strong className="text-ink">Sektor 6, Stand 650</strong>. Wir freuen uns auf Ihren Besuch — kommen Sie auf ein Gespräch vorbei.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-ink px-6 py-3 text-sm uppercase tracking-[0.16em] text-bg transition-colors hover:bg-moss"
            >
              Bis bald an der ÖGA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
