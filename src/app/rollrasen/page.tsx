"use client";

import EditorialHero from "@/components/editorial/EditorialHero";
import SortenCase from "@/components/editorial/SortenCase";
import FaqAccordion from "@/components/editorial/FaqAccordion";
import Marquee from "@/components/editorial/Marquee";
import Reveal from "@/components/editorial/Reveal";
import SeoHead from "@/components/editorial/SeoHead";
import DuengerEmpfehlung from "@/components/editorial/DuengerEmpfehlung";
import ParallaxHero from "@/components/editorial/ParallaxHero";

import Link from "next/link";
import { BestellTrigger } from "@/components/BestellModal";
import Magnetic from "@/components/Magnetic";
import rollrasenHero from "@/assets/rollrasen-hero-new.jpg";
import sorteHaus from "@/assets/sorte-premium.webp";
import sorteMini from "@/assets/sorte-mini-kraeuter-flora.jpg";

/**
 * /rollrasen — Sortenseite.
 * Zwei Sorten als grossformatige Cases mit Specs, danach Dünger-Empfehlung.
 */
export default function Rollrasen() {
  const faqs = [
    {
      q: "Welche Sorte passt zu meinem Garten?",
      a: "Für klassische Hausgärten, Parks und Sportflächen empfehlen wir den Haus- und Allzweckrasen — robust, dichtwüchsig und alltagstauglich. Die Mini-Kräuter-Flora ist die richtige Wahl für Dachbegrünungen oder als nachhaltige, biodiverse Alternative.",
    },
    {
      q: "Wie frisch ist der Rasen bei der Lieferung?",
      a: "Feldfrisch — frischer geht es nicht. Unser Rollrasen wird am selben Tag geerntet.",
    },
    {
      q: "Kann ich beide Sorten kombinieren?",
      a: "Ja. Geben Sie uns die gewünschten Quadratmeter pro Sorte an — wir liefern entsprechend getrennt.",
    },
    {
      q: "Wie lange ist der Rasen lagerfähig?",
      a: "Maximal 24 Stunden, im Sommer kürzer. Wir empfehlen, am Liefertag mit der Verlegung zu beginnen. Bei längeren Bauphasen koordinieren wir Teillieferungen.",
    },
    {
      q: "Gibt es Spezialpreise für Gärtner und Gartenbau-Betriebe?",
      a: "Ja — Spezialpreise für Gartenbauer, Gärtner und Kommunen sind auf Anfrage erhältlich. Melden Sie sich direkt bei uns.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SeoHead
        title="Rollrasen-Sorten — Haus- und Allzweckrasen & Mini-Kräuter-Flora"
        description="Zwei Schweizer Rollrasen-Sorten aus eigener Produktion in Wiler. Haus- und Allzweckrasen für Garten und Sport, Mini-Kräuter-Flora für Dachbegrünung."
        canonical="/rollrasen"
        jsonLd={faqJsonLd}
      />

      <ParallaxHero
        image={rollrasenHero}
        alt="Frischer Rollrasen mit Morgentau bei Sonnenaufgang"
        title={<>Schweizer Rollrasen<br /><em className="italic font-light text-glow">aus eigener Produktion.</em></>}
        ctas={
          <>
            <BestellTrigger className="pointer-events-auto bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
              Jetzt bestellen
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
        number="01"
        eyebrow="Sortiment"
        title={<>Zwei Sorten.<br /><em className="italic text-moss">Eine Herkunft.</em></>}
        subline="Jede Bahn wächst auf unseren Feldern in Wiler. Heute bestellt, morgen abholbereit ab Hof — oder übermorgen geliefert. Saison: März bis November."
        rightSlot={
          <div className="flex flex-wrap gap-4">
            <BestellTrigger className="bg-ink px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg hover:bg-moss transition-colors">
              Jetzt bestellen
            </BestellTrigger>
            <Magnetic>
              <Link href="/preis-konfigurator" data-cursor="link" className="inline-block border border-ink px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-bg transition-colors">
                Preis berechnen
              </Link>
            </Magnetic>
          </div>
        }
      />

      {/* Marquee */}
      <Marquee
        items={["Haus- und Allzweckrasen", "Mini-Kräuter-Flora", "100% Schweiz", "Frisch geerntet", "März – November"]}
        separator="·"
      />

      {/* Sorte 01 */}
      <SortenCase
        index="01"
        name="Haus- und Allzweckrasen"
        tagline="Der Allrounder für Hausgärten, Parks und den Sportbereich."
        description="Eine ausgewogene, robuste Mischung. Dichte Narbe, sattes Grün, hohe Strapazierfähigkeit. Geeignet für Privatgärten, repräsentative Parkflächen sowie Sport- und Spielwiesen. Unsere Hauptsorte und für die meisten Projekte die richtige Wahl."
        image={sorteHaus}
        imageAlt="Haus- und Allzweckrasen, dicht und sattgrün, frisch verlegt"
        badge="Hauptsorte"
        specs={[
          { label: "Einsatz", value: "Garten · Park · Sport" },
          { label: "Schnitt", value: "30–40 mm" },
          { label: "Sonnenbedarf", value: "5–8 h / Tag" },
          { label: "Belastung", value: "Hoch" },
          { label: "Anwuchs", value: "10–14 Tage" },
        ]}
        bestFor={["Hausgärten", "Parks", "Sportbereich", "Familien mit Kindern"]}
      />

      {/* Sorte 02 */}
      <SortenCase
        index="02"
        name="Mini-Kräuter-Flora"
        tagline="Die nachhaltige Alternative — auch für die Dachbegrünung."
        description="Eine niedrigwüchsige, biodiverse Mischung aus Kräutern und kleinen Blütenpflanzen. Speziell entwickelt für die Begrünung von Dachflächen und überall dort, wo eine nachhaltige, pflegeleichte Alternative zum klassischen Rasen gefragt ist."
        image={sorteMini}
        imageAlt="Mini-Kräuter-Flora auf einer Dachfläche, niedrige Kräuter und kleine Blüten"
        reverse
        specs={[
          { label: "Einsatz", value: "Dachbegrünung · Naturgarten" },
          { label: "Höhe", value: "Niedrigwüchsig" },
          { label: "Sonnenbedarf", value: "6–8 h / Tag" },
          { label: "Belastung", value: "Gering" },
          { label: "Pflege", value: "Minimal" },
        ]}
        bestFor={["Dachflächen", "Retensionsbecken", "Nachhaltige Gärten", "Biodiversität", "Pflegearme Flächen"]}
      />

      {/* Dünger-Empfehlungen */}
      <DuengerEmpfehlung />

      {/* CTA-Block */}
      <section className="bg-ink py-24 text-bg md:py-36">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-10 px-6 md:px-10">
          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow text-bg/60">Nächster Schritt</p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <h2 className="h-section">
                Unsicher, welche Sorte zu Ihrem Projekt passt?
              </h2>
              <p className="mt-6 max-w-xl text-lg text-bg/75 md:text-xl">
                Schicken Sie uns Quadratmeter, Lage und gewünschten Liefertermin — wir antworten so schnell wie möglich mit Empfehlung und Offerte. Spezialpreise für Gartenbauer und Gärtner auf Anfrage.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Magnetic>
                  <Link
                    href="/preis-konfigurator"
                    data-cursor="link"
                    className="inline-block bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink transition-colors hover:bg-glow"
                  >
                    Preis berechnen
                  </Link>
                </Magnetic>
                <Link
                  href="/kontakt"
                  className="story-link inline-block self-center text-sm uppercase tracking-[0.16em] text-bg/80"
                >
                  Persönlich beraten lassen
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-36">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-10 px-6 md:px-10">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-ink/55">Fragen / Antworten</p>
            <h2 className="h-section mt-6 text-ink">Häufig gefragt</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
