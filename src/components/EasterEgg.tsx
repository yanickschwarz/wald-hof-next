"use client";

import { useEffect, useState } from "react";

/**
 * Easter Egg: Konami-Code (↑ ↑ ↓ ↓ ← → ← → B A) öffnet Overlay.
 * Auch via Sequenz "RASEN" tippen aktivierbar.
 */
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      // Konami
      const next = [...konami, k].slice(-KONAMI.length);
      setKonami(next);
      if (next.join(",") === KONAMI.join(",")) {
        setOpen(true);
        setKonami([]);
      }

      // Typed sequence "rasen"
      if (k.length === 1 && /[a-z]/.test(k)) {
        const t = (typed + k).slice(-5);
        setTyped(t);
        if (t === "rasen") {
          setOpen(true);
          setTyped("");
        }
      }

      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [konami, typed, open]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Easter Egg"
      className="fixed inset-0 z-[200] grid place-items-center bg-ink/95 px-6 backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <div className="max-w-3xl text-center text-bg" onClick={(e) => e.stopPropagation()}>
        <p className="eyebrow text-glow">Geheim · 1972</p>
        <p
          className="mt-6 font-display italic leading-[0.95] text-glow"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)", letterSpacing: "-0.04em" }}
        >
          🌱 Hallo,<br />Rasen-Profi.
        </p>
        <p className="mx-auto mt-8 max-w-xl text-lg text-bg/80">
          Sie haben unseren Easter-Egg-Code gefunden. Als Belohnung: ein persönlicher Anruf von Hans und 5 m² Rollrasen geschenkt bei Ihrer ersten Bestellung.
          Stichwort beim Anruf: <span className="font-display italic text-glow">Konami</span>.
        </p>
        <button
          onClick={() => setOpen(false)}
          className="mt-12 bg-bg px-8 py-4 text-sm uppercase tracking-[0.16em] text-ink hover:bg-glow"
          data-cursor="link"
        >
          Schliessen
        </button>
      </div>
    </div>
  );
}
