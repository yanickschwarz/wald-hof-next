"use client";

import EditorialHero from "@/components/editorial/EditorialHero";
import Reveal from "@/components/editorial/Reveal";
import SeoHead from "@/components/editorial/SeoHead";
import ParallaxHero from "@/components/editorial/ParallaxHero";
import Magnetic from "@/components/Magnetic";
import { BestellTrigger } from "@/components/BestellModal";
import transport from "@/assets/rollrasen-transport.webp";

/**
 * /kontakt — Kontaktdaten + Google-Maps-Karte (Embed, kein API-Key nötig).
 */
export default function Kontakt() {
  return (
    <>
      <SeoHead
        title="Kontakt — Rasen vom Waldhof, 3428 Wiler"
        description="Rasen vom Waldhof — Zielebachweg 6, 3428 Wiler. Telefon +41 79 935 55 45, info@wald-hof.ch. Persönliche Beratung durch Hans Vögeli."
        canonical="/kontakt"
      />

      <ParallaxHero
        image={transport}
        alt="Pickup mit Anhänger 'Rasen vom Waldhof' liefert in den Schweizer Bergen"
        title={<>Direkter Draht<br /><em className="italic font-light text-glow">zum Hof.</em></>}
        ctas={
          <>
            <Magnetic>
              <a href="tel:+41799355545" data-cursor="link" className="pointer-events-auto inline-block bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow transition-colors">
                +41 79 935 55 45
              </a>
            </Magnetic>
            <BestellTrigger className="pointer-events-auto border border-bg/60 px-8 py-4 text-sm uppercase tracking-[0.16em] text-bg hover:bg-bg hover:text-ink transition-colors">
              Rollrasen bestellen
            </BestellTrigger>
          </>
        }
      />

      <EditorialHero
        titleAs="h2"
        number="07"
        eyebrow="Kontakt"
        title={<>Schreiben Sie.<br /><em className="italic text-moss">Rufen Sie an.</em></>}
        subline="Direkter Draht zum Inhaber. Wir antworten innert eines Werktags — meist deutlich schneller."
      />

      <section className="border-t border-ink/15 py-20 md:py-28">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 md:px-10">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="mt-4 font-display text-3xl leading-tight md:text-5xl">
              Rasen vom Waldhof<br />
              Zielebachweg 6<br />
              3428 Wiler
            </p>

            <dl className="mt-12 space-y-5 text-base">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-ink/55">Telefon</dt>
                <dd className="mt-1"><a href="tel:+41799355545" className="font-display text-2xl text-ink story-link">+41 79 935 55 45</a></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-ink/55">E-Mail</dt>
                <dd className="mt-1"><a href="mailto:info@wald-hof.ch" className="font-display text-2xl text-ink story-link">info@wald-hof.ch</a></dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-ink/55">Inhaber</dt>
                <dd className="mt-1 font-display text-2xl text-ink">Hans Vögeli</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-ink/55">Öffnungszeiten</dt>
                <dd className="mt-1 text-ink/80">Nach Voranmeldung. Lieferungen Mo–Sa, ganztägig.</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal variant="mask" className="col-span-12 md:col-span-7">
            <div className="h-[60vh] w-full overflow-hidden border border-ink/15 bg-cream">
              <iframe
                title="Google Maps — Rasen vom Waldhof, Zielebachweg 6, 3428 Wiler"
                src="https://www.google.com/maps?q=Zielebachweg+6,+3428+Wiler,+Schweiz&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
