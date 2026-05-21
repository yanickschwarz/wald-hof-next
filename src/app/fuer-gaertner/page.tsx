"use client";

import Link from "next/link";
import { BestellTrigger } from "@/components/BestellModal";
import Magnetic from "@/components/Magnetic";
import EditorialHero from "@/components/editorial/EditorialHero";
import Reveal from "@/components/editorial/Reveal";
import BigStat from "@/components/editorial/BigStat";
import Marquee from "@/components/editorial/Marquee";
import FaqAccordion from "@/components/editorial/FaqAccordion";
import SeoHead from "@/components/editorial/SeoHead";
import ParallaxHero from "@/components/editorial/ParallaxHero";
import lager from "@/assets/rollrasen-palette.jpg";
import transport from "@/assets/rollrasen-palette.jpg";
import ernte from "@/assets/rollrasen-ernte-new.jpg";
import schweiz from "@/assets/hero-fuer-gaertner.webp";
import gaertnerTeam from "@/assets/gaertner-team.webp";

/**
 * /fuer-gaertner — B2B-Landingpage für Gartenbau-Betriebe.
 * Fokus: Konditionen, Verlässlichkeit, kurze Wege.
 */
export default function FuerGaertner() {
  const benefits = [
    { kicker: "Konditionen", title: "Spezialpreise auf Anfrage", body: "Für Gartenbauer und Gärtner offerieren wir individuelle Spezialkonditionen." },
    { kicker: "Bestellung", title: "Heute bestellt — morgen ab Hof", body: "Heute bestellt, morgen abholbereit ab Hof oder übermorgen geliefert. Lieferzeit: März bis November." },
    { kicker: "Frische", title: "Ernte auf Bestellung", body: "Kein Zwischenlager, kein Umweg. Frisch geerntet, innert 24 Stunden bei Ihnen auf der Baustelle." },
    { kicker: "Beratung", title: "Direkter Draht zur Familie", body: "Kein Callcenter, keine Hotline. Sie sprechen direkt mit Hans, Tim oder Mika — von der Sortenwahl bis zur Reklamation." },
  ];

  const faqs = [
    { q: "Gibt es Spezialpreise für Gartenbauer und Gärtner?", a: "Ja — Spezialpreise für Gartenbauer und Gärtner sind auf Anfrage erhältlich." },
    { q: "Wie weit liefern wir?", a: "Schweizweit. Heute bestellt, morgen abholbereit ab Hof oder übermorgen geliefert. Lieferzeit: März bis November." },
    { q: "Kann ich Rollrasen direkt ab Hof abholen?", a: "Ja. Heute bestellt, morgen abholbereit — auf Voranmeldung. Abholung in Wiler, Holzacherweg 10." },
    { q: "Welche Sorten sind verfügbar?", a: "Zwei Sorten: Haus- und Allzweckrasen für Garten, Park und Sport sowie Mini-Kräuter-Flora für Dachbegrünungen und nachhaltige Projekte." },
    { q: "Gibt es ein Rückgaberecht?", a: "Nein — frischer Rollrasen ist verderbliche Ware. Aus diesem Grund ist keine Rückgabe möglich." },
  ];

  return (
    <>
      <SeoHead
        title="Für Gartenbau-Betriebe — Rollrasen B2B aus der Schweiz"
        description="Schweizer Rollrasen für Gartenbau-Betriebe. Mengenrabatt ab 200 m², Lieferung am Erntetag, direkter Draht zum Inhaber. Standort Wiler BE."
        canonical="/fuer-gaertner"
      />

      <ParallaxHero
        image={schweiz}
        alt="Roter Hoflader belädt Palette mit Rollrasen vor Schweizer Berglandschaft"
        title={<>Schweizer Rollrasen<br /><em className="italic font-light text-glow">für Profis.</em></>}
        ctas={
          <>
            <BestellTrigger className="pointer-events-auto bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
              Offerte anfragen
            </BestellTrigger>
            <Magnetic>
              <Link href="/preis-konfigurator" data-cursor="link" className="pointer-events-auto inline-block border border-bg/60 px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg hover:bg-bg hover:text-ink transition-colors">
                Preise ansehen
              </Link>
            </Magnetic>
          </>
        }
      />

      <EditorialHero
        titleAs="h2"
        number="02"
        eyebrow="Für Gartenbau-Betriebe"
        title={<>Ein Lieferant.<br /><em className="italic text-moss">Ein Versprechen.</em></>}
        subline="95% unserer Bestellungen kommen von Gartenbau-Betrieben. Wir wissen, wie Ihre Baustelle tickt: knappe Slots, präzise Mengen, frische Ware. Unkompliziert, flexibel und schnell."
      />

      {/* Stats */}
      <section className="border-t border-ink/15 bg-cream/50 py-20 md:py-28">
        <div className="mx-auto grid max-w-none grid-cols-1 gap-px bg-ink/15 px-0 md:grid-cols-4">
          <BigStat number="24–48h" label="Zwischen Ernte und Anlieferung auf Ihrer Baustelle" />
          <BigStat number="2 Sorten" label="Haus- und Allzweckrasen & Mini-Kräuter-Flora" />
          <BigStat number="100%" label="Schweizer Rasen aus eigener Produktion in Wiler BE" />
          <BigStat number="400+" label="Gartenbau-Kunden in der ganzen Schweiz" />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-36">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-16 px-6 md:px-10">
          <div className="col-span-12 md:col-span-3">
            <h2 className="h-section mt-6">Unkompliziert. Flexibel. Schnell.</h2>
          </div>
          <ul className="col-span-12 md:col-span-9 grid gap-px bg-ink/15 md:grid-cols-2">
            {benefits.map((b) => (
              <li key={b.title} className="bg-bg p-8 md:p-10">
                <Reveal>
                  <h3 className="font-display mt-4 text-3xl tracking-tight">{b.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">{b.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vollformat-Bild: Gärtner-Team in Aktion */}
      <Reveal variant="mask">
        <figure className="relative h-[70vh] w-full overflow-hidden">
          <img src={gaertnerTeam.src} alt="Gartenbau-Team verlegt Rollrasen vor Schweizer Einfamilienhaus" className="h-full w-full object-cover" loading="lazy" />
          <figcaption className="absolute bottom-8 left-8 max-w-md font-display text-2xl italic text-bg drop-shadow-md md:text-4xl">
            "Profis verlegen, was Profis liefern."
          </figcaption>
        </figure>
      </Reveal>

      {/* Bildband */}
      <section className="grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-3">
        {[ernte, lager, transport].map((src, i) => (
          <Reveal key={i} variant="mask">
            <figure className="aspect-[4/5] overflow-hidden bg-cream md:aspect-[3/4]">
              <img src={src.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </figure>
          </Reveal>
        ))}
      </section>

      <Marquee items={["Mengenrabatt", "Fixe Slots", "Direkt ab Hof", "Schweizer Familie", "Frisch geerntet"]} separator="·" />

      {/* Konditionen */}
      <section className="py-24 md:py-36">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-10 px-6 md:px-10">
          <div className="col-span-12 md:col-span-3">
            <h2 className="h-section mt-6">Spezialpreise<br />auf Anfrage</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="border-y border-ink/15 py-10">
              <p className="max-w-2xl font-display text-2xl leading-snug text-ink md:text-3xl">
                Für Gartenbauer und Gärtner gelten andere Konditionen — abgestimmt auf Bestellvolumen und Liefergebiet.
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75">
                Schicken Sie uns Ihre Anfrage — wir erstellen Ihnen so schnell wie möglich eine massgeschneiderte Offerte. Privatkundenpreise (Staffel ab CHF 9.50 / m²) finden Sie im Preis-Konfigurator.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <BestellTrigger className="bg-ink px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg hover:bg-moss transition-colors">
                  Offerte anfragen
                </BestellTrigger>
                <Link href="/preis-konfigurator" className="story-link self-center text-sm uppercase tracking-[0.16em] text-ink/80">
                  Privatkundenpreise ansehen
                </Link>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink/55">Heute bestellt — morgen abholbereit ab Hof oder übermorgen geliefert. Lieferzeit: März bis November.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-bg md:py-32">
        <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <Reveal>
            <h2 className="h-section mt-6">Lassen Sie uns reden.</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-bg/75">
              Schicken Sie uns eine kurze Nachricht oder rufen Sie direkt an — Hans Vögeli persönlich.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Magnetic>
                <Link href="/kontakt" data-cursor="link" className="inline-block bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
                  Kontakt aufnehmen
                </Link>
              </Magnetic>
              <a href="tel:+41799355545" className="story-link text-sm uppercase tracking-[0.16em] text-bg/80">
                +41 79 935 55 45
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-10 px-6 md:px-10">
          <div className="col-span-12 md:col-span-3">
            <h2 className="h-section mt-6">B2B-FAQ</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
