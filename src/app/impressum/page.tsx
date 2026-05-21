"use client";

import EditorialHero from "@/components/editorial/EditorialHero";
import SeoHead from "@/components/editorial/SeoHead";
import Reveal from "@/components/editorial/Reveal";

export default function Impressum() {
  return (
    <>
      <SeoHead
        title="Impressum — Rasen vom Waldhof"
        description="Impressum und rechtliche Angaben gemäss Schweizer Recht."
        canonical="/impressum"
      />
      <EditorialHero
        number="08"
        eyebrow="Recht"
        title={<>Impressum.</>}
        subline="Angaben gemäss Schweizer Recht."
      />

      <section className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 pb-32 md:px-10">
        <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-12 text-base leading-relaxed text-ink/80">
          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">Betreiber</h2>
            <address className="not-italic">
              Rasen vom Waldhof<br />
              Hans Vögeli<br />
              Zielebachweg 6<br />
              3428 Wiler<br />
              Schweiz
            </address>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">Kontakt</h2>
            <p>
              Telefon: <a href="tel:+41799355545" className="story-link">+41 79 935 55 45</a><br />
              E-Mail: <a href="mailto:info@wald-hof.ch" className="story-link">info@wald-hof.ch</a><br />
              Web: <a href="https://www.wald-hof.ch" className="story-link">www.wald-hof.ch</a>
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">Inhaber & verantwortliche Person</h2>
            <p>Hans Vögeli, Inhaber</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">Haftungsausschluss</h2>
            <p>
              Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität,
              Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden
              materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der
              veröffentlichten Informationen entstehen, werden ausgeschlossen.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">Haftung für Links</h2>
            <p>
              Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird
              jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten
              erfolgen auf eigene Gefahr.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">Urheberrechte</h2>
            <p>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website
              gehören ausschliesslich Rasen vom Waldhof oder den speziell genannten Rechteinhabern. Für die
              Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus
              einzuholen.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">Webdesign & Entwicklung</h2>
            <address className="not-italic">
              Vlix<br />
              <a href="https://www.vlix.ch" target="_blank" rel="noopener noreferrer" className="story-link">www.vlix.ch</a><br />
              <a href="mailto:info@vlix.ch" className="story-link">info@vlix.ch</a>
            </address>
          </Reveal>
        </div>
      </section>
    </>
  );
}
