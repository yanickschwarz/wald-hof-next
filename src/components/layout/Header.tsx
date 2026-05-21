"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/rollrasen", label: "Rollrasen" },
  { to: "/fuer-gaertner", label: "Für Gärtner" },
  { to: "/rollrasen-verlegen", label: "Verlegen" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const heroBig = !scrolled;
  const isHome = pathname === "/";
  // Im Hero:
  //   - Startseite → dunkel (ink), passt auf den papierhellen Hintergrund
  //   - Unterseiten → hell (bg), für gute Lesbarkeit über den dunklen/farbigen Hero-Bildern
  // Sobald gescrollt wird, ist das Logo immer dunkel (ink), damit es auf dem
  // hellen Seiteninhalt sichtbar bleibt.
  const logoVariant = heroBig ? (isHome ? "ink" : "bg") : "ink";

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled((prev) => {
          const next = y > 32;
          return prev === next ? prev : next;
        });
        if (Math.abs(y - lastY.current) > 6) {
          setHidden(y > lastY.current && y > 200);
          lastY.current = y;
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.4,0,0.1,1)]",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled ? "bg-bg/85 backdrop-blur-md border-b border-ink/5" : "bg-transparent",
        )}
      >
        <div className="flex w-full items-center justify-between px-6 py-4 md:px-10">
          <Link
            href="/"
            aria-label="Rasen vom Waldhof — Startseite"
            className="group flex items-center"
            data-cursor="link"
          >
            <Logo
              className={cn(
                "h-16 w-16 md:h-20 md:w-20 origin-top-left transition-[transform,margin] duration-500 ease-[cubic-bezier(0.4,0,0.1,1)] will-change-transform",
                // Im Hero gross + nach unten/rechts geschoben, damit das skalierte
                // Logo nicht oben/links abgeschnitten wird. Beim Scrollen zurück
                // auf 1x ohne Versatz.
                heroBig ? "scale-[2] ml-4 mt-4 md:ml-6 md:mt-6" : "scale-100 ml-0 mt-0",
              )}
              variant={logoVariant}
            />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-9">
            {NAV.map((n) => {
              const isActive = pathname === n.to || pathname.startsWith(n.to + "/");
              return (
                <Link
                  key={n.to}
                  href={n.to}
                  className={cn(
                    "story-link text-[13px] tracking-wide",
                    isActive ? "text-moss" : "text-ink/80 hover:text-ink",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/preis-konfigurator" className="hidden md:block">
              <MagneticButton>
                Preis berechnen <span aria-hidden>→</span>
              </MagneticButton>
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Menü öffnen"
              className="md:hidden rounded-full border border-ink/20 p-2.5"
              data-cursor="link"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-bg transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] md:hidden",
          open
            ? "[clip-path:circle(150%_at_100%_0%)]"
            : "[clip-path:circle(0%_at_100%_0%)] pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
            <Logo className="h-14 w-14" variant="ink" />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Menü schliessen"
            className="rounded-full border border-ink/20 p-2.5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="px-6 pt-8" aria-label="Mobile Navigation">
          <ul className="space-y-1">
            {NAV.map((n, i) => (
              <li
                key={n.to}
                style={{ transitionDelay: `${open ? 120 + i * 70 : 0}ms` }}
                className={cn(
                  "border-b border-ink/10 transition-all duration-700",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                )}
              >
                <Link
                  href={n.to}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-display text-4xl tracking-tight"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link href="/preis-konfigurator" onClick={() => setOpen(false)}>
              <MagneticButton>Preis berechnen →</MagneticButton>
            </Link>
          </div>
          <p className="eyebrow mt-12 text-ink/60">Zielebachweg 6 · 3428 Wiler</p>
        </nav>
      </div>
    </>
  );
}
