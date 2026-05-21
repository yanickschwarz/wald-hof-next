"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EditorialHero from "@/components/editorial/EditorialHero";
import Reveal from "@/components/editorial/Reveal";
import SeoHead from "@/components/editorial/SeoHead";
import { formatCHF, formatM2 } from "@/lib/format";
import { BestellTrigger } from "@/components/BestellModal";
import Magnetic from "@/components/Magnetic";

/**
 * /preis-konfigurator — Live-Preisrechner.
 * 1 Rolle = 1 m². Pauschalpreise für 1–4 Rollen, danach m²-Staffel bis 500 m².
 * Ab 501 m²: Preis auf Anfrage. Alle Preise exkl. Lieferung.
 */

type SorteKey = "haus" | "mini";

const SORTEN: Record<SorteKey, { label: string; tagline: string }> = {
  haus: { label: "Haus- und Allzweckrasen", tagline: "Garten · Park · Sport" },
  mini: { label: "Mini-Kräuter-Flora",       tagline: "Dachbegrünung · nachhaltig" },
};

/** Rollen-Pauschalen für sehr kleine Mengen Haus- und Allzweckrasen (1 Rolle = 1 m²). */
const ROLLEN_PAUSCHALE: Record<number, number> = {
  1: 25,
  2: 50,
  3: 70,
  4: 90,
};

/** m²-Staffel ab 4 m² für Haus- und Allzweckrasen. */
function tierPriceHaus(qm: number): number | null {
  if (qm >= 4   && qm <= 10)  return 19;
  if (qm >= 11  && qm <= 20)  return 17;
  if (qm >= 21  && qm <= 50)  return 15;
  if (qm >= 51  && qm <= 100) return 13;
  if (qm >= 101 && qm <= 150) return 12;
  if (qm >= 151 && qm <= 200) return 11;
  if (qm >= 201 && qm <= 300) return 10;
  if (qm >= 301 && qm <= 500) return 9.5;
  return null;
}

/** m²-Staffel für Mini-Kräuter-Flora. Mindestbestellmenge 20 m². */
function tierPriceMini(qm: number): number | null {
  if (qm >= 20  && qm <= 50)  return 28;
  if (qm >= 51  && qm <= 100) return 26;
  if (qm >= 101 && qm <= 150) return 25;
  if (qm >= 151 && qm <= 200) return 24;
  if (qm >= 201 && qm <= 500) return 23;
  return null;
}

interface CalcResult {
  total: number | null;          // null = auf Anfrage
  unitPrice: number | null;      // CHF/m² oder null
  mode: "pauschale" | "staffel" | "anfrage" | "min";
  label: string;                 // Beschreibung der Berechnung
}

function calculate(sorte: SorteKey, qm: number): CalcResult {
  if (qm >= 501) {
    return { total: null, unitPrice: null, mode: "anfrage", label: "Grossfläche — Preis auf Anfrage" };
  }
  if (sorte === "mini") {
    if (qm < 20) {
      return { total: null, unitPrice: null, mode: "min", label: "Mindestbestellmenge: 20 m²" };
    }
    const price = tierPriceMini(qm);
    if (price === null) {
      return { total: null, unitPrice: null, mode: "anfrage", label: "Menge auf Anfrage" };
    }
    return {
      total: price * qm,
      unitPrice: price,
      mode: "staffel",
      label: `${formatCHF(price)} / m² × ${formatM2(qm)}`,
    };
  }
  // Haus- und Allzweckrasen
  if (qm >= 1 && qm <= 4 && Number.isInteger(qm)) {
    const total = ROLLEN_PAUSCHALE[qm];
    return {
      total,
      unitPrice: total / qm,
      mode: "pauschale",
      label: `${qm} Rolle${qm > 1 ? "n" : ""} (Pauschale)`,
    };
  }
  const price = tierPriceHaus(qm);
  if (price === null) {
    return { total: null, unitPrice: null, mode: "anfrage", label: "Menge auf Anfrage" };
  }
  return {
    total: price * qm,
    unitPrice: price,
    mode: "staffel",
    label: `${formatCHF(price)} / m² × ${formatM2(qm)}`,
  };
}

export default function PreisKonfigurator() {
  const [sorte, setSorte] = useState<SorteKey>("haus");
  const [qm, setQm] = useState<number>(50);

  const calc = useMemo<CalcResult>(() => calculate(sorte, qm), [sorte, qm]);

  return (
    <>
      <SeoHead
        title="Preis-Konfigurator — Rollrasen-Kosten berechnen"
        description="Berechnen Sie in Sekunden den Richtpreis für Schweizer Rollrasen. Staffelpreise pro m² für Haus- und Allzweckrasen sowie Mini-Kräuter-Flora."
        canonical="/preis-konfigurator"
      />

      <EditorialHero
        number="04"
        eyebrow="Konfigurator"
        title={<>Was kostet das?<br /><em className="italic text-moss">Rechnen Sie selbst.</em></>}
        subline="Richtpreis in Echtzeit, exkl. Lieferung. Spezialpreise für Gartenbauer und Gärtner auf Anfrage."
        rightSlot={
          <div className="flex flex-wrap gap-4">
            <BestellTrigger className="bg-ink px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg hover:bg-moss transition-colors">
              Bestellen
            </BestellTrigger>
            <Magnetic>
              <a href="tel:+41799355545" data-cursor="link" className="inline-block border border-ink px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-bg transition-colors">
                Beratung anrufen
              </a>
            </Magnetic>
          </div>
        }
      />

      <section className="border-t border-ink/15 pb-24 pt-12 md:pb-36">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 md:px-10">
          {/* Inputs */}
          <div className="col-span-12 md:col-span-7">
            {/* Sorte */}
            <fieldset>
              <legend className="eyebrow text-ink/55">Sorte</legend>
              <p className="mt-3 max-w-md text-xs text-ink/55">Mini-Kräuter-Flora: Mindestbestellmenge 20 m².</p>
              <div className="mt-4 grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-2">
                {(Object.keys(SORTEN) as SorteKey[]).map((k) => {
                  const active = sorte === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setSorte(k)}
                      data-cursor="link"
                      className={`p-5 text-left transition-colors ${active ? "bg-ink text-bg" : "bg-bg text-ink hover:bg-cream"}`}
                    >
                      <p className="font-display text-2xl">{SORTEN[k].label}</p>
                      <p className={`mt-2 text-xs ${active ? "text-bg/65" : "text-ink/55"}`}>{SORTEN[k].tagline}</p>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Fläche */}
            <fieldset className="mt-12">
              <legend className="eyebrow text-ink/55">Fläche (1 Rolle = 1 m²)</legend>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-5xl text-ink md:text-6xl">{formatM2(qm)}</span>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  step={1}
                  value={qm}
                  onChange={(e) => setQm(Math.max(1, Math.min(5000, Number(e.target.value) || 0)))}
                  className="w-32 border-b border-ink/30 bg-transparent py-2 text-right font-display text-xl outline-none focus:border-moss"
                  aria-label="Fläche in Quadratmetern"
                />
              </div>
              <input
                type="range"
                min={1}
                max={500}
                step={1}
                value={Math.min(qm, 500)}
                onChange={(e) => setQm(Number(e.target.value))}
                className="mt-4 w-full accent-moss"
                aria-label="Fläche per Schieberegler"
              />
              <div className="mt-2 flex justify-between text-xs text-ink/55">
                <span>1 m²</span><span>100 m²</span><span>300 m²</span><span>500 m²+</span>
              </div>
            </fieldset>

            {/* Preisstaffel-Übersicht */}
            <fieldset className="mt-12">
              <legend className="eyebrow text-ink/55">Preisstaffel 2026</legend>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-moss">Haus- und Allzweckrasen</p>
              <div className="mt-3 grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-2">
                {[
                  { range: "1 Rolle",       price: "CHF 25.–" },
                  { range: "2 Rollen",      price: "CHF 50.–" },
                  { range: "3 Rollen",      price: "CHF 70.–" },
                  { range: "4 Rollen",      price: "CHF 90.–" },
                  { range: "4 – 10 m²",     price: "CHF 19.– / m²" },
                  { range: "11 – 20 m²",    price: "CHF 17.– / m²" },
                  { range: "21 – 50 m²",    price: "CHF 15.– / m²" },
                  { range: "51 – 100 m²",   price: "CHF 13.– / m²" },
                  { range: "101 – 150 m²",  price: "CHF 12.– / m²" },
                  { range: "151 – 200 m²",  price: "CHF 11.– / m²" },
                  { range: "201 – 300 m²",  price: "CHF 10.– / m²" },
                  { range: "301 – 500 m²",  price: "CHF 9.50 / m²" },
                  { range: "ab 501 m²",     price: "auf Anfrage" },
                ].map((r) => (
                  <div key={r.range} className="flex items-baseline justify-between bg-bg px-4 py-3 text-sm">
                    <span className="text-ink/70">{r.range}</span>
                    <span className="font-display text-base text-ink">{r.price}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-moss">Mini-Kräuter-Flora · ab 20 m²</p>
              <div className="mt-3 grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-2">
                {[
                  { range: "20 – 50 m²",    price: "CHF 28.– / m²" },
                  { range: "51 – 100 m²",   price: "CHF 26.– / m²" },
                  { range: "101 – 150 m²",  price: "CHF 25.– / m²" },
                  { range: "151 – 200 m²",  price: "CHF 24.– / m²" },
                  { range: "201 – 500 m²",  price: "CHF 23.– / m²" },
                  { range: "ab 501 m²",     price: "auf Anfrage" },
                ].map((r) => (
                  <div key={r.range} className="flex items-baseline justify-between bg-bg px-4 py-3 text-sm">
                    <span className="text-ink/70">{r.range}</span>
                    <span className="font-display text-base text-ink">{r.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink/55">Alle Preise exkl. Lieferung. Nicht MwSt.-pflichtig.</p>
            </fieldset>
          </div>

          {/* Resultat */}
          <aside className="col-span-12 md:col-span-5 md:sticky md:top-28 md:self-start">
            <Reveal>
              <div className="bg-ink p-8 text-bg md:p-10">
                {calc.total !== null ? (
                  <>
                    <p className="mt-6 font-display leading-[0.9] text-glow" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
                      {formatCHF(calc.total)}
                    </p>
                    <p className="mt-2 text-sm text-bg/60">exkl. Lieferung — Richtpreis (nicht MwSt.-pflichtig)</p>

                    <dl className="mt-10 space-y-3 border-t border-bg/15 pt-6 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-bg/65">{SORTEN[sorte].label}</dt>
                        <dd className="text-bg/65">{formatM2(qm)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-bg/65">{calc.label}</dt>
                        <dd>{formatCHF(calc.total)}</dd>
                      </div>
                      {calc.unitPrice !== null && (
                        <div className="flex justify-between text-glow">
                          <dt>Effektiver Preis / m²</dt>
                          <dd>{formatCHF(calc.unitPrice)}</dd>
                        </div>
                      )}
                    </dl>
                  </>
                ) : (
                  <>
                    <p className="mt-6 font-display leading-[0.9] text-glow" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}>
                      {calc.mode === "min" ? "Mind. 20 m²" : "Auf Anfrage"}
                    </p>
                    <p className="mt-4 text-sm text-bg/70">
                      {calc.mode === "min"
                        ? "Für Mini-Kräuter-Flora gilt eine Mindestbestellmenge von 20 m²."
                        : `Für ${formatM2(qm)} erstellen wir Ihnen gerne eine individuelle Offerte — so schnell wie möglich.`}
                    </p>
                  </>
                )}

                <BestellTrigger
                  className="mt-10 block w-full bg-bg px-8 py-4 text-center text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors"
                >
                  Bestellen →
                </BestellTrigger>
                <p className="mt-3 text-center text-xs text-bg/55">
                  Oder direkt anrufen: <a href="tel:+41799355545" className="text-bg underline">079 935 55 45</a>
                </p>
              </div>
            </Reveal>

            {/* Hinweis-Box: Gärtner-Spezialpreise */}
            <div className="mt-6 border border-ink/15 bg-cream/60 p-6">
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                Spezialpreise für Gartenbauer und Gärtner auf Anfrage.
              </p>
              <Link href="/fuer-gaertner" className="story-link mt-3 inline-block text-sm uppercase tracking-[0.16em] text-ink">
                Mehr erfahren →
              </Link>
            </div>

            <p className="mt-6 max-w-md text-xs leading-relaxed text-ink/55">
              Richtpreise gemäss Staffel 2026, exkl. Lieferung. Liefer- und Abholoptionen besprechen wir individuell. Heute bestellt — morgen abholbereit ab Hof oder übermorgen geliefert (März – November).
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
