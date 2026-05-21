"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SeoHead from "@/components/editorial/SeoHead";

/**
 * Editorial 404 — passend zum restlichen Design.
 * Riesige Display-Zahl, knapper Text, Link zurück zur Startseite.
 */
export default function NotFound() {
  const pathname = usePathname();
  useEffect(() => {
    console.warn("[404] Pfad nicht gefunden:", pathname);
  }, [pathname]);

  return (
    <>
      <SeoHead
        title="Seite nicht gefunden — 404"
        description="Diese Seite existiert nicht. Zurück zur Übersicht — oder direkt zum Rollrasen."
      />
      <section className="grid min-h-[88vh] place-items-center bg-bg pt-32">
        <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 px-6 md:px-10">
          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow text-ink/55">Sackgasse</p>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p
              className="font-display leading-[0.85] text-moss"
              style={{ fontSize: "clamp(8rem, 28vw, 28rem)", letterSpacing: "-0.05em" }}
            >
              404
            </p>
            <h1 className="h-section mt-6 max-w-2xl text-balance">
              Hier wächst nichts. <em className="italic text-moss">Noch nicht.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              Die Seite, die Sie suchen, gibt es nicht — oder sie ist umgezogen. Probieren Sie eine der folgenden Adressen:
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-[0.16em]">
              <li><Link href="/" className="story-link text-ink">Startseite</Link></li>
              <li><Link href="/rollrasen" className="story-link text-ink">Sortiment</Link></li>
              <li><Link href="/preis-konfigurator" className="story-link text-ink">Preis berechnen</Link></li>
              <li><Link href="/kontakt" className="story-link text-ink">Kontakt</Link></li>
            </ul>
            <p className="mt-12 text-xs text-ink/50">Pfad: <code className="font-mono">{pathname}</code></p>
          </div>
        </div>
      </section>
    </>
  );
}
