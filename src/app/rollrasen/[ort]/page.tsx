"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import EditorialHero from "@/components/editorial/EditorialHero";
import Reveal from "@/components/editorial/Reveal";
import SeoHead from "@/components/editorial/SeoHead";
import BigStat from "@/components/editorial/BigStat";
import schweiz from "@/assets/rollrasen-schweiz.webp";
import { ORTE } from "./orte";

/**
 * /rollrasen/:ort — Dynamisch generierte Lokal-Landingpage.
 * Die Liste der unterstützten Orte ist whitelisted (siehe ./orte.ts),
 * alles andere → 404.
 */

export default function LokalLanding() {
  const params = useParams<{ ort: string }>();
  const ort = params?.ort;
  const data = ort ? ORTE[ort.toLowerCase()] : undefined;
  if (!data) {
    notFound();
  }

  return (
    <>
      <SeoHead
        title={`Rollrasen ${data.name} — Schweizer Qualität, frisch geliefert`}
        description={`Rollrasen für ${data.name} (${data.kanton}). Lieferung ${data.lieferzeit} ab eigener Produktion in Wiler BE. Premium, Schatten, Sport, Zier — alles aus Schweizer Boden.`}
        canonical={`/rollrasen/${ort}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Rollrasen-Lieferung",
          areaServed: { "@type": "City", name: data.name },
          provider: { "@type": "LocalBusiness", name: "Rasen vom Waldhof" },
        }}
      />

      <EditorialHero
        number={data.kanton}
        eyebrow={`Rollrasen für ${data.name}`}
        title={<>Frischer Rasen.<br /><em className="italic text-moss">Direkt nach {data.name}.</em></>}
        subline={data.intro}
      />

      {/* Stats */}
      <section className="grid grid-cols-2 gap-px bg-ink/15 md:grid-cols-4">
        <BigStat number={`${data.distanzKm} km`} label={`Luftlinie zwischen Wiler und ${data.name}`} />
        <BigStat number={data.lieferzeit} label="Vom Feld zu Ihrer Baustelle" />
        <BigStat number="4" label="Sorten verfügbar — Premium, Schatten, Sport, Zier" />
        <BigStat number="0 CHF" label="Lieferung ab 200 m² in Ihrer Region" />
      </section>

      {/* Bildband */}
      <Reveal variant="mask">
        <figure className="relative h-[60vh] w-full overflow-hidden">
          <img src={schweiz.src} alt={`Rollrasen für die Region ${data.name}`} className="h-full w-full object-cover" loading="lazy" />
          <figcaption className="absolute bottom-8 left-8 max-w-md font-display text-2xl italic text-bg drop-shadow md:text-4xl">
            "Schweizer Boden für {data.name}. So nah wie möglich."
          </figcaption>
        </figure>
      </Reveal>

      {/* Argumente */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 md:px-10">
          <div className="col-span-12 md:col-span-3">
            <h2 className="h-section mt-6">Kurze Wege, frische Ware.</h2>
          </div>
          <ul className="col-span-12 grid gap-px bg-ink/15 md:col-span-9 md:grid-cols-3">
            {[
              { t: "Regionale Nähe", b: `Nur ${data.distanzKm} km zwischen unseren Feldern und ${data.name}. Das macht Rollrasen frischer als jede importierte Bahnware.` },
              { t: "Persönlicher Service", b: "Sie sprechen direkt mit Hans Vögeli, dem Inhaber. Keine Hotline, kein Ticketsystem, keine automatisierten Antworten." },
              { t: "Faire Konditionen", b: `In ${data.kanton} liefern wir ohne Aufschlag in der Region — bei Bestellungen ab 200 m² ist die Lieferung inklusive.` },
            ].map((x) => (
              <li key={x.t} className="bg-bg p-8 md:p-10">
                <Reveal>
                  <h3 className="font-display text-2xl tracking-tight">{x.t}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink/75">{x.b}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-bg md:py-32">
        <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <h2 className="h-section">Rollrasen-Lieferung nach {data.name}.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-bg/75">
            Berechnen Sie Ihren Bedarf in Sekunden — oder rufen Sie direkt an.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link href="/preis-konfigurator" data-cursor="link" className="bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
              Preis berechnen
            </Link>
            <a href="tel:+41799355545" className="story-link self-center text-sm uppercase tracking-[0.16em] text-bg/80">
              +41 79 935 55 45
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
