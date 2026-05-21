/**
 * Whitelist + Daten für alle Lokal-Landingpages /rollrasen/[ort].
 * Liegt bewusst NICHT in page.tsx, weil Next.js in Page-Files nur die
 * vorgesehenen Named-Exports erlaubt (metadata, generateStaticParams, …).
 */

export interface OrtData {
  name: string;
  kanton: string;
  distanzKm: number;
  lieferzeit: string;
  intro: string;
}

export const ORTE: Record<string, OrtData> = {
  bern:       { name: "Bern",       kanton: "BE", distanzKm: 25, lieferzeit: "noch am Erntetag", intro: "Die Bundesstadt liegt direkt in unserem Kerngebiet. Lieferungen erfolgen meist innerhalb von 24 Stunden nach Bestellung." },
  solothurn:  { name: "Solothurn",  kanton: "SO", distanzKm: 30, lieferzeit: "noch am Erntetag", intro: "Solothurn liegt in unserer Heimatregion. Kurze Wege, frischer Rasen, faire Preise — alles inklusive." },
  thun:       { name: "Thun",       kanton: "BE", distanzKm: 40, lieferzeit: "innert 24 h",       intro: "Vom Thunersee bis zum Niesen — Rollrasen-Lieferungen in den Raum Thun gehören seit Jahren zu unserem Alltag." },
  biel:       { name: "Biel",       kanton: "BE", distanzKm: 35, lieferzeit: "noch am Erntetag", intro: "Biel/Bienne ist Teil unseres engeren Liefergebiets. Zweisprachiger Service inklusive." },
  burgdorf:   { name: "Burgdorf",   kanton: "BE", distanzKm: 18, lieferzeit: "am Vormittag",      intro: "Burgdorf ist quasi um die Ecke. Kürzere Wege gibt es nur mit Selbstabholung." },
  langenthal: { name: "Langenthal", kanton: "BE", distanzKm: 22, lieferzeit: "am Vormittag",      intro: "Langenthal und Umgebung liefern wir täglich. Die Nähe spüren Sie in der Frische des Rasens." },
  aarau:      { name: "Aarau",      kanton: "AG", distanzKm: 55, lieferzeit: "innert 24 h",       intro: "Im Aargau sind wir ein etablierter Lieferant für Gartenbau-Betriebe. Kein Aufschlag, fixe Slots." },
  luzern:     { name: "Luzern",     kanton: "LU", distanzKm: 75, lieferzeit: "innert 24 h",       intro: "Luzern liegt am Rand unseres Kerngebiets — wir liefern mehrmals wöchentlich Rollrasen in die Region." },
  freiburg:   { name: "Freiburg",   kanton: "FR", distanzKm: 50, lieferzeit: "innert 24 h",       intro: "Service auf Deutsch oder Französisch, je nach Wunsch. Auch grössere Mengen kein Problem." },
  basel:      { name: "Basel",      kanton: "BS", distanzKm: 95, lieferzeit: "innert 24–48 h",    intro: "Basel und Umgebung beliefern wir mehrmals pro Woche. Bei Bestellungen ab 500 m² ist die Lieferung inklusive." },
};

export const SUPPORTED_ORTE = Object.keys(ORTE);
