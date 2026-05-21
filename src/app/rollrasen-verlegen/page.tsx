"use client";

import EditorialHero from "@/components/editorial/EditorialHero";
import CurvyStepper from "@/components/editorial/CurvyStepper";
import Reveal from "@/components/editorial/Reveal";
import FaqAccordion from "@/components/editorial/FaqAccordion";
import SeoHead from "@/components/editorial/SeoHead";
import ParallaxHero from "@/components/editorial/ParallaxHero";
import DuengerEmpfehlung from "@/components/editorial/DuengerEmpfehlung";
import ParallaxImage from "@/components/editorial/ParallaxImage";
import Link from "next/link";
import { BestellTrigger } from "@/components/BestellModal";
import Magnetic from "@/components/Magnetic";
import bgImg from "@/assets/rollrasen-schweiz.webp";
import lager from "@/assets/hero-verlegen.webp";

/**
 * /rollrasen-verlegen — Ratgeber-Seite.
 * Schritt-für-Schritt-Anleitung mit ProcessStepper und Pflegehinweisen.
 */
export default function RollrasenVerlegen() {
  const steps = [
    { title: "Boden vorbereiten", body: "Alten Bewuchs entfernen, lockern, planieren, walzen. Eine ebene, steinfreie Fläche ist die halbe Miete." },
    { title: "Frisch anliefern", body: "Heute bestellt, morgen abholbereit ab Hof oder übermorgen geliefert (März bis November). Verlegung am Liefertag beginnen — Bahnen nie länger als 24 h gerollt liegen lassen." },
    { title: "Bahn an Bahn verlegen", body: "Nahtversetzt wie Ziegel. Stösse fest aneinander, keine Lücken, keine Überlappungen. Mit scharfem Messer zuschneiden." },
    { title: "Wässern, walzen, warten", body: "Sofort nach dem Verlegen 15–20 Liter pro m² wässern. In den ersten zwei Wochen täglich. Erster Schnitt nach ca. 14 Tagen." },
  ];

  const tipps = [
    { title: "Werkzeug", body: "Walze, scharfes Messer, Rechen, Spaten, Gartenschlauch mit Brause. Nichts Exotisches — Standard-Gartenwerkzeug." },
    { title: "Witterung", body: "Kann bei jeder Witterung verlegt werden. Wichtig: sofort bewässern." },
    { title: "Erster Schnitt", body: "Sobald der Rasen richtig angewachsen ist. Optimale Schnitthöhe: nie mehr als 1/3 bis max. 1/2 der Halmlänge." },
    { title: "Belastung", body: "Erste 2 Wochen schonen, kein Fussball, keine Möbel. Voll belastbar nach ca. 4 Wochen." },
  ];

  const faqs = [
    { q: "Wie lange darf der Rollrasen vor der Verlegung liegen?", a: "Muss am gleichen Tag verlegt werden." },
    { q: "Was, wenn es regnet?", a: "Leichter Regen ist sogar willkommen — er erspart Ihnen das Wässern. Bei Starkregen oder durchnässtem Boden Verlegung verschieben." },
    { q: "Wann darf ich das erste Mal mähen?", a: "Sobald der Rollrasen angewachsen ist. Meist nach 10–14 Tagen. Optimale Schnitthöhe: nie mehr als 1/3 bis max. 1/2 der Halmlänge." },
    { q: "Wie viel muss ich wässern?", a: "Die Rasensoden dürfen nicht austrocknen — viel wässern, je nach Wetter und Bedarf." },
  ];

  return (
    <>
      <SeoHead
        title="Rollrasen verlegen — Schritt-für-Schritt-Anleitung"
        description="So verlegen Sie Rollrasen richtig: Boden vorbereiten, Bahnen verlegen, wässern. Praxis-Tipps von Hans Vögeli, Rollrasen vom Waldhof."
        canonical="/rollrasen-verlegen"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Rollrasen verlegen",
          step: steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.body,
          })),
        }}
      />

      <ParallaxHero
        image={lager}
        alt="Gestapelte Rollrasen-Bahnen auf Paletten im Lager"
        title={<>Rollrasen verlegen<br /><em className="italic font-light text-glow">in vier Schritten.</em></>}
        ctas={
          <>
            <BestellTrigger className="pointer-events-auto bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
              Rollrasen bestellen
            </BestellTrigger>
            <Magnetic>
              <Link href="/preis-konfigurator" data-cursor="link" className="pointer-events-auto inline-block border border-bg/60 px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg hover:bg-bg hover:text-ink transition-colors">
                Preis berechnen
              </Link>
            </Magnetic>
          </>
        }
      />

      <EditorialHero
        titleAs="h2"
        number="03"
        eyebrow="Ratgeber"
        title={<>Rollrasen verlegen.<br /><em className="italic text-moss">In vier Schritten.</em></>}
        subline="Wer einmal verlegt hat, weiss: es ist einfacher als gedacht. Hier unser bewährtes Vorgehen — geübt auf hunderten Baustellen."
      />

      {/* Process — vertikal mit gebogener Kurve */}
      <section className="border-t border-ink/15 py-20 md:py-32">
        <div className="mx-auto max-w-none px-6 md:px-10">
          <CurvyStepper steps={steps} />
        </div>
      </section>

      {/* Vollformat-Bild mit Parallax */}
      <figure className="relative">
        <ParallaxImage
          image={bgImg}
          alt="Frisch verlegter Rollrasen vom Waldhof"
          height="60vh"
        />
        <figcaption className="pointer-events-none absolute bottom-8 left-8 max-w-md font-display text-2xl italic text-bg drop-shadow-md md:text-4xl">
          "Bahn an Bahn, fest gestossen — wie Ziegel, nicht wie Tapete."
        </figcaption>
      </figure>

      {/* Tipps */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 md:px-10">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-ink/55">Praxistipps</p>
            <h2 className="h-section mt-6">Was wirklich zählt</h2>
          </div>
          <ul className="col-span-12 grid gap-px bg-ink/15 md:col-span-9 md:grid-cols-2">
            {tipps.map((t) => (
              <li key={t.title} className="bg-bg p-8 md:p-10">
                <Reveal>
                  <h3 className="font-display text-2xl tracking-tight">{t.title}</h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-ink/75">{t.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dünger-Empfehlungen */}
      <DuengerEmpfehlung />

      {/* FAQ */}
      <section className="border-t border-ink/15 py-24 md:py-32">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-10 px-6 md:px-10">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-ink/55">Fragen / Antworten</p>
            <h2 className="h-section mt-6">Häufig gefragt</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-moss py-20 text-bg md:py-28">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center px-6 text-center md:px-10">
          <h2 className="h-section">Bereit zu bestellen?</h2>
          <p className="mt-6 max-w-xl text-lg text-bg/75">
            Berechnen Sie zuerst Ihren Bedarf — der Konfigurator liefert Mengen und Richtpreis in Sekunden.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <Magnetic>
              <Link href="/preis-konfigurator" data-cursor="link" className="inline-block bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
                Preis berechnen
              </Link>
            </Magnetic>
            <BestellTrigger className="story-link self-center text-sm uppercase tracking-[0.16em] text-bg/80">
              Direkt bestellen
            </BestellTrigger>
          </div>
        </div>
      </section>
    </>
  );
}
