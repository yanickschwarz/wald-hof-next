import Link from "next/link";
import Logo from "@/components/Logo";
import { BestellTrigger } from "@/components/BestellModal";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-bg">
      <div className="mx-auto max-w-none px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* Left: Logo + address */}
          <div className="col-span-12 md:col-span-4">
            <Link href="/" aria-label="Rasen vom Waldhof — Startseite" className="inline-block">
              <Logo className="h-20 w-20" variant="bg" />
            </Link>
            <address className="mt-6 not-italic text-sm leading-relaxed text-bg/80">
              Rasen vom Waldhof<br />
              Zielebachweg 6<br />
              3428 Wiler<br />
              <a href="tel:+41799355545" className="story-link mt-3 inline-block text-bg/80 hover:text-glow">+41 79 935 55 45</a><br />
              <a href="mailto:info@wald-hof.ch" className="story-link text-bg/80 hover:text-glow">info@wald-hof.ch</a>
            </address>
          </div>

          {/* Middle: Sortiment & Seiten */}
          <div className="col-span-6 md:col-span-4">
            <p className="eyebrow text-bg/55">Sortiment</p>
            <nav aria-label="Sortiment" className="mt-5 flex flex-col items-start gap-3 text-sm text-bg/80">
              <Link href="/rollrasen" className="story-link hover:text-glow">Haus- und Allzweckrasen</Link>
              <Link href="/rollrasen" className="story-link hover:text-glow">Mini-Kräuter-Flora</Link>
              <Link href="/preis-konfigurator" className="story-link hover:text-glow">Preis-Konfigurator</Link>
              <BestellTrigger magnetic={false} className="story-link text-left hover:text-glow">Bestellen</BestellTrigger>
            </nav>
          </div>

          {/* Right: Über */}
          <div className="col-span-6 md:col-span-4">
            <p className="eyebrow text-bg/55">Über</p>
            <nav aria-label="Über" className="mt-5 flex flex-col items-start gap-3 text-sm text-bg/80">
              <Link href="/ueber-uns" className="story-link hover:text-glow">Über uns</Link>
              <Link href="/fuer-gaertner" className="story-link hover:text-glow">Für Gärtner</Link>
              <Link href="/rollrasen-verlegen" className="story-link hover:text-glow">Verlegung</Link>
              <Link href="/kontakt" className="story-link hover:text-glow">Kontakt</Link>
              <Link href="/impressum" className="story-link hover:text-glow">Impressum</Link>
              <Link href="/datenschutz" className="story-link hover:text-glow">Datenschutz</Link>
              <Link href="/agb" className="story-link hover:text-glow">AGB</Link>
            </nav>
          </div>
        </div>

        {/* Bottom row: copyright left · Vlix center */}
        <div className="relative mt-14 grid grid-cols-3 items-center gap-4 border-t border-bg/15 pt-6 text-xs text-bg/50">
          <p className="col-span-3 text-left md:col-span-1">© {new Date().getFullYear()} Rasen vom Waldhof — Hans Vögeli</p>
          <p className="col-span-3 text-left md:col-span-1 md:text-center">
            Webdesign by{" "}
            <a href="https://www.vlix.ch" target="_blank" rel="noopener noreferrer" className="story-link text-bg/80 hover:text-glow">
              Vlix
            </a>
          </p>
          <span className="hidden md:block" />
        </div>
      </div>
    </footer>
  );
}
