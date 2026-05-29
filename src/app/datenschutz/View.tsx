"use client";

import EditorialHero from "@/components/editorial/EditorialHero";
import SeoHead from "@/components/editorial/SeoHead";
import Reveal from "@/components/editorial/Reveal";

export default function Datenschutz() {
  return (
    <>
      <SeoHead
        title="Datenschutz — Rasen vom Waldhof"
        description="Datenschutzerklärung gemäss revDSG und DSGVO."
        canonical="/datenschutz"
      />
      <EditorialHero
        number="09"
        eyebrow="Recht"
        title={<>Datenschutz.</>}
        subline="Datenschutzerklärung gemäss revDSG und DSGVO."
      />

      <section className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-12 px-6 pb-32 md:px-10">
        <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-12 text-base leading-relaxed text-ink/80">
          <Reveal>
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten ernst und behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend dem revidierten Schweizer Datenschutzgesetz (revDSG) sowie der
              europäischen Datenschutz-Grundverordnung (DSGVO).
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">1. Verantwortliche Stelle</h2>
            <address className="not-italic">
              Rasen vom Waldhof<br />
              Hans Vögeli<br />
              Zielebachweg 6, 3428 Wiler<br />
              Schweiz<br />
              <a href="mailto:info@wald-hof.ch" className="story-link">info@wald-hof.ch</a>
            </address>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">2. Erhebung und Verarbeitung von Daten</h2>
            <p>
              Wir erheben personenbezogene Daten nur, wenn Sie uns diese im Rahmen einer Bestellung, Anfrage oder
              Kontaktaufnahme freiwillig mitteilen. Dazu gehören insbesondere Name, Adresse, Telefonnummer,
              E-Mail-Adresse und gegebenenfalls Bestelldetails.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">3. Zweck der Datenverarbeitung</h2>
            <p>
              Ihre Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage, zur Abwicklung von Bestellungen
              sowie zur Kommunikation mit Ihnen verwendet. Eine Weitergabe an Dritte erfolgt nur, wenn dies zur
              Vertragserfüllung notwendig ist (z.B. an Logistikpartner).
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">4. Cookies & Tracking</h2>
            <p>
              Diese Website verwendet ausschliesslich technisch notwendige Cookies. Es findet kein Tracking durch
              Drittanbieter und keine Weitergabe von Nutzungsdaten zu Werbezwecken statt.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">5. Datensicherheit</h2>
            <p>
              Die Übertragung Ihrer Daten auf dieser Website erfolgt verschlüsselt via SSL/TLS. Wir treffen
              angemessene technische und organisatorische Massnahmen, um Ihre Daten gegen unberechtigten Zugriff
              zu schützen.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">6. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der
              Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich dazu an{" "}
              <a href="mailto:info@wald-hof.ch" className="story-link">info@wald-hof.ch</a>.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">7. Auftragsverarbeiter</h2>
            <p>
              Für den technischen Betrieb dieser Website setzen wir folgende Dienstleister ein:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Vlix (<a href="https://www.vlix.ch" target="_blank" rel="noopener noreferrer" className="story-link">www.vlix.ch</a>) — Webdesign, Entwicklung und technischer Betrieb</li>
              <li>Resend — Versand von E-Mail-Bestätigungen</li>
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">8. Änderungen</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Es gilt die jeweils aktuelle
              Fassung auf unserer Website.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
