"use client";

import Link from "next/link";
import EditorialHero from "@/components/editorial/EditorialHero";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/editorial/Reveal";
import BigStat from "@/components/editorial/BigStat";
import SeoHead from "@/components/editorial/SeoHead";
import ParallaxHero from "@/components/editorial/ParallaxHero";
import ParallaxImage from "@/components/editorial/ParallaxImage";
import { BestellTrigger } from "@/components/BestellModal";
import portrait from "@/assets/portrait-hans.webp";
import waldhofAerial from "@/assets/wald-hof-aerial.webp";
import feld from "@/assets/rollrasen-schweiz.webp";
import ernte from "@/assets/ernte-frontal.jpg";

/**
 * /ueber-uns — Familienbetrieb seit über 200 Jahren, Timeline der Meilensteine,
 * Hans, Susanna, Tim, Mika.
 */

const MILESTONES: { year: string; title: string; body: string }[] = [
  {
    year: "Seit > 200 Jahren",
    title: "Landwirtschaft auf dem Waldhof",
    body: "Anfänglich ein gemischter Landwirtschaftsbetrieb — Milchwirtschaft und Ackerbau.",
  },
  {
    year: "1978 – 2006",
    title: "Grünspargel-Pionier",
    body: "Anbau von Grünspargeln als einer der wenigen Pioniere in der Schweiz.",
  },
  {
    year: "2001",
    title: "Start Rollrasenproduktion",
    body: "Erste Felder werden auf Rollrasen umgestellt — der Grundstein für das heutige Kerngeschäft.",
  },
  {
    year: "2007",
    title: "Übernahme durch Susanna & Hans",
    body: "Susanna und Hans übernehmen den elterlichen Betrieb und führen ihn als Familie weiter.",
  },
  {
    year: "Bis 2014",
    title: "Vertrieb über Grossverteiler",
    body: "Erste Jahre der Rollrasen-Vermarktung über etablierte Handelspartner.",
  },
  {
    year: "01.01.2015",
    title: "Eigenständiger Vertrieb",
    body: "Selbständiger Vertrieb von Rollrasen und Dünger — direkt vom Hof zum Kunden.",
  },
  {
    year: "2017",
    title: "Sohn Tim im Betrieb",
    body: "Tim, der älteste Sohn, ist seit 2017 voll im Betrieb tätig.",
  },
  {
    year: "2025",
    title: "Sohn Mika im Betrieb",
    body: "Mika, der zweite Sohn, ist seit 2025 ebenfalls voll im Betrieb tätig.",
  },
  {
    year: "2026",
    title: "Über 20 ha Rasenfläche",
    body: "Stetige Vergrösserung von ursprünglich 1,5 ha auf heute über 20 ha Produktionsfläche.",
  },
];

export default function UeberUns() {
  return (
    <>
      <SeoHead
        title="Über uns — Familie Vögeli, Wiler BE"
        description="Rasen vom Waldhof — Familienbetrieb seit über 200 Jahren in Wiler BE. Susanna, Hans, Tim und Mika produzieren Schweizer Rollrasen auf über 20 ha."
        canonical="/ueber-uns"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Rasen vom Waldhof",
          founder: "Hans Vögeli",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Zielebachweg 6",
            postalCode: "3428",
            addressLocality: "Wiler",
            addressCountry: "CH",
          },
          telephone: "+41 79 935 55 45",
          email: "info@wald-hof.ch",
          url: "https://www.wald-hof.ch",
        }}
      />

      <ParallaxHero
        image={waldhofAerial}
        alt="Luftaufnahme des Waldhofs in Wiler bei Sonnenaufgang mit Blick auf die Voralpen"
        title={<>Der Waldhof.<br /><em className="italic font-light text-glow">Familienbetrieb in Wiler.</em></>}
        ctas={
          <>
            <BestellTrigger className="pointer-events-auto bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
              Rollrasen bestellen
            </BestellTrigger>
            <Magnetic>
              <Link href="/kontakt" data-cursor="link" className="pointer-events-auto inline-block border border-bg/60 px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg hover:bg-bg hover:text-ink transition-colors">
                Hof besuchen
              </Link>
            </Magnetic>
          </>
        }
      />

      <EditorialHero
        titleAs="h2"
        number="06"
        eyebrow="Familienbetrieb · Wiler BE"
        title={<>Über 200 Jahre.<br /><em className="italic text-moss">Eine Familie.</em></>}
        subline="Vom gemischten Bauernhof zum spezialisierten Rollrasenproduzenten — der Waldhof wird seit über zwei Jahrhunderten in der Familie geführt. Heute mit Susanna, Hans, Tim und Mika."
      />

      {/* Ernte bei Sonnenaufgang */}
      <ParallaxImage
        image={ernte}
        alt="Rollrasen-Ernte bei Sonnenaufgang auf den Feldern in Wiler"
        height="70vh"
        strength={140}
      />

      {/* Stats */}
      <section className="grid grid-cols-2 gap-px bg-ink/15 md:grid-cols-4">
        <BigStat number="200+" label="Jahre Landwirtschaft in der Familie" />
        <BigStat number="20+ ha" label="Rasenfläche im Jahr 2026" />
        <BigStat number="seit 2001" label="Rollrasen aus eigener Produktion" />
        <BigStat number="4" label="Familienmitglieder im Betrieb" />
      </section>

      {/* Timeline */}
      <section className="border-t border-ink/15 py-24 md:py-36">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 md:px-10">
          <div className="col-span-12 md:col-span-3">
            <h2 className="h-section mt-6">Vom Hof<br />zur Marke.</h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-ink/70">
              Eine kurze Zeitleiste — Stationen, die den Waldhof zu dem gemacht haben, was er heute ist.
            </p>
          </div>
          <ol className="col-span-12 md:col-span-9">
            {MILESTONES.map((m, i) => (
              <li key={m.year + i} className="grid grid-cols-12 gap-x-6 border-t border-ink/15 py-8 md:py-10">
                <div className="col-span-12 md:col-span-4">
                  <Reveal>
                    <p className="font-display text-2xl text-moss md:text-3xl">{m.year}</p>
                  </Reveal>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <Reveal delay={80}>
                    <h3 className="font-display text-2xl tracking-tight text-ink md:text-3xl">{m.title}</h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/75">{m.body}</p>
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Portrait Hans + Familie */}
      <section className="border-t border-ink/15 bg-cream/40 py-24 md:py-36">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 md:px-10">
          <Reveal variant="mask" className="col-span-12 md:col-span-5">
            <figure className="aspect-[4/5] overflow-hidden bg-cream">
              <img src={portrait.src} alt="Hans Vögeli, Inhaber Rasen vom Waldhof" className="h-full w-full object-cover" loading="lazy" />
              <figcaption className="sr-only">Hans Vögeli, Inhaber</figcaption>
            </figure>
          </Reveal>
          <div className="col-span-12 md:col-span-7 md:pl-10">
            <Reveal>
              <h2 className="h-section mt-6">Susanna, Hans,<br />Tim & Mika.</h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">
                Wir sind ein reiner Familienbetrieb. Zusammen mit meiner Frau Susanna habe ich das Geschäft über die Jahre hinweg aufgebaut. Seit 2017 ist unser ältester Sohn Tim voll im Betrieb tätig, seit 2025 auch unser zweiter Sohn Mika.
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70">
                Was 2001 mit ein paar Quadratmetern begonnen hat, ist heute über 20 Hektaren gross. Was gleich geblieben ist: Sie sprechen mit der Familie — vom ersten Telefonat bis zur Anlieferung auf Ihre Baustelle.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-y-4 text-sm">
                <dt className="text-ink/55">Telefon</dt>
                <dd><a href="tel:+41799355545" className="story-link">+41 79 935 55 45</a></dd>
                <dt className="text-ink/55">E-Mail</dt>
                <dd><a href="mailto:info@wald-hof.ch" className="story-link">info@wald-hof.ch</a></dd>
                <dt className="text-ink/55">Adresse</dt>
                <dd>Zielebachweg 6, 3428 Wiler</dd>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal variant="mask">
        <figure className="h-[60vh] w-full overflow-hidden">
          <img src={feld.src} alt="Rollrasenfeld in Wiler" className="h-full w-full object-cover" loading="lazy" />
        </figure>
      </Reveal>

      <section className="bg-ink py-24 text-bg md:py-32">
        <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <h2 className="h-section">Kommen Sie vorbei.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-bg/75">
            Nach Voranmeldung zeigen wir Ihnen unsere Felder. Sehen Sie selbst, was Sie bestellen.
          </p>
          <div className="mt-10">
            <Magnetic>
              <Link href="/kontakt" data-cursor="link" className="inline-block bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
                Termin vereinbaren
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
