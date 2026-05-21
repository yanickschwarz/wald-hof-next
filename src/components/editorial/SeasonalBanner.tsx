"use client";

import { useState } from "react";
import { X } from "lucide-react";

/**
 * Saison-Banner: dünner Streifen oben mit Hinweis je nach Monat.
 * März–Mai → Frühlings-Verlegezeit; Juni–August → Sommer; September–November → Herbst-Verlegezeit;
 * Dezember–Februar → Winterruhe.
 */
function getSeasonMessage(): string {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 4) return "Frühling — beste Verlegezeit. Lieferungen ab dieser Woche möglich.";
  if (m >= 5 && m <= 7) return "Sommer — bei Hitze morgens verlegen, sofort wässern.";
  if (m >= 8 && m <= 10) return "Herbst — ideale Anwachsbedingungen. Jetzt für die kommende Saison sichern.";
  return "Winterruhe. Bestellungen für die Saison ab März werden bereits angenommen.";
}

export default function SeasonalBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <aside
      role="status"
      className="relative z-40 bg-moss text-bg"
      aria-label="Saisonale Hinweise"
    >
      <div className="mx-auto flex max-w-none items-center justify-between gap-4 px-6 py-2 text-xs md:px-10">
        <p className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-glow animate-pulse" />
          <span className="tracking-wide">{getSeasonMessage()}</span>
        </p>
        <button
          onClick={() => setOpen(false)}
          aria-label="Hinweis schliessen"
          className="rounded-full p-1 hover:bg-bg/10"
          data-cursor="link"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
