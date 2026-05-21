"use client";

import Link from "next/link";
import HeroVideoScroll from "@/components/hero/HeroVideoScroll";
import MagneticButton from "@/components/MagneticButton";
import Magnetic from "@/components/Magnetic";
import ScrollFrameSequence from "@/components/editorial/ScrollFrameSequence";
import ParallaxImage from "@/components/editorial/ParallaxImage";
import Reveal from "@/components/editorial/Reveal";
import { BestellTrigger } from "@/components/BestellModal";
import OegaPopup from "@/components/OegaPopup";
import gaertnerTeam from "@/assets/gaertner-team.webp";
import ueberUnsHero from "@/assets/wald-hof-aerial.webp";

const Index = () => {
  return (
    <>
      <OegaPopup />
      <HeroVideoScroll />



      {/* 02 / Produkt */}
      <section className="relative bg-bg" aria-labelledby="intro-heading">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 py-28 md:px-10 md:py-40">
          <div className="col-span-12 md:col-span-2">
            <Reveal><p className="eyebrow text-ink/50">02 / Produkt</p></Reveal>
          </div>

          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <h2 id="intro-heading" className="h-section text-balance text-ink">
                Ein lebendiges Produkt,<br />
                das <em className="font-light italic text-meadow">schnell</em> zu Ihnen kommt.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl">
                Unser Rollrasen wächst über Monate auf eigenen Schweizer Feldern. Heute bestellt, morgen abholbereit ab Hof — oder übermorgen geliefert. Was bei Ihnen ankommt, ist ein Stück Natur, das bei Ihnen weiter lebt.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Magnetic>
                  <Link href="/rollrasen" className="inline-flex items-center gap-3 bg-ink px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg transition-colors hover:bg-moss">
                    Entdecken <span aria-hidden>→</span>
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 mt-14 grid grid-cols-1 gap-px bg-ink/10 md:mt-20 md:grid-cols-3">
            <Reveal><Stat number="2 Sorten" label="Haus- und Allzweckrasen & Mini-Kräuter-Flora" /></Reveal>
            <Reveal delay={120}><Stat number="24–48h" label="Heute bestellt, morgen abholbereit oder übermorgen geliefert" /></Reveal>
            <Reveal delay={240}><Stat number="März–Nov" label="Liefer- und Erntesaison in der Schweiz" /></Reveal>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section aria-hidden className="overflow-hidden border-y border-ink/10 bg-bg py-8">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display text-5xl tracking-tight text-ink/85 md:text-7xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Haus- und Allzweckrasen", "·", "Mini-Kräuter-Flora", "·", "Schweizer Produktion", "·", "Seit Generationen", "·"].map((t, i) => (
              <span key={`${k}-${i}`} className="inline-flex items-center gap-12">
                <span>{t}</span>
              </span>
            )),
          )}
        </div>
      </section>

      {/* Verlegen — Frame-Scrub */}
      <ScrollFrameSequence
        basePath="frames/rollen"
        frameCount={54}
        ctaTo="/rollrasen-verlegen"
        ctaLabel="Zum Verlegen"
        headline="Erfahren Sie mehr über das Verlegen von Rollrasen."
        ariaLabel="Rollrasen verlegen — Scroll-Animation"
      />

      <ParallaxImage
        image={gaertnerTeam}
        alt="Gartenbau-Team verlegt Rollrasen vor Schweizer Einfamilienhaus"
        height="80vh"
      />

      {/* 03 / Partner — Für Gärtner Kurzabschnitt */}
      <section className="relative bg-bg" aria-labelledby="gartner-heading">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-6 px-6 py-28 md:px-10 md:py-40">
          <div className="col-span-12 md:col-span-2">
            <Reveal><p className="eyebrow text-ink/50">03 / Partner</p></Reveal>
          </div>
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <h2 id="gartner-heading" className="h-section text-ink">
                Für Gartenbau-<em className="font-light italic">Betriebe.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75">
                Verlässliche Mengen, faire Konditionen, persönliche Absprache. Über 95% unserer Lieferungen gehen an professionelle Gärtner in der ganzen Schweiz.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/fuer-gaertner"><MagneticButton>Mehr erfahren →</MagneticButton></Link>
                <Link href="/kontakt"><MagneticButton variant="outline">Direkt anrufen</MagneticButton></Link>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-3 md:pt-6">
            <Reveal delay={150}>
              <ul className="space-y-5 border-l border-ink/15 pl-6 text-sm text-ink/80">
                <li><span className="block font-display text-2xl text-ink">Tagesfrisch</span>Heute bestellt, morgen ab Hof oder übermorgen geliefert.</li>
                <li><span className="block font-display text-2xl text-ink">Spezialpreise</span>Für Gartenbauer und Gärtner auf Anfrage.</li>
                <li><span className="block font-display text-2xl text-ink">Termintreu</span>Verbindliche Zeitfenster für Ihre Baustelle.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 / Über uns — Vollformat-Parallax-Sektion */}
      <section className="relative" aria-labelledby="ueber-heading">
        <ParallaxImage image={ueberUnsHero} alt="Wald-Hof in Wiler — Familienbetrieb seit über 200 Jahren" height="100vh" strength={140} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/40 to-ink/80" aria-hidden />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto grid w-full max-w-none grid-cols-12 gap-x-6 gap-y-8 px-6 pb-16 md:px-10 md:pb-24">
            <div className="col-span-12 md:col-span-2">
              <Reveal><p className="eyebrow text-bg/70">04 / Über uns</p></Reveal>
            </div>
            <div className="col-span-12 md:col-span-7">
              <Reveal>
                <h2 id="ueber-heading" className="h-section text-bg drop-shadow-md">
                  Vom Hof in <em className="font-light italic text-glow">Wiler</em> in Ihren Garten.
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-bg/85">
                  Seit Generationen führen wir den Wald-Hof in Wiler BE. Mit Sorgfalt, Erfahrung und einem klaren Anspruch: Schweizer Rollrasen in bester Qualität — direkt vom Feld zu Ihnen.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="pointer-events-auto mt-10">
                  <Magnetic>
                    <Link href="/ueber-uns" className="inline-flex items-center gap-3 border border-bg/70 px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg transition-colors hover:bg-bg hover:text-ink">
                      Mehr über uns <span aria-hidden>→</span>
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-bg p-8 md:p-10">
      <p className="font-display text-6xl leading-none text-moss md:text-7xl">{number}</p>
      <p className="mt-4 max-w-[24ch] text-sm text-ink/70">{label}</p>
    </div>
  );
}

export default Index;
