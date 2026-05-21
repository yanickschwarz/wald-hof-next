/**
 * Skip-Link für Screenreader/Tastaturnavigation.
 * Springt direkt zum Hauptinhalt. Sichtbar nur bei Fokus.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg focus:outline focus:outline-2 focus:outline-moss"
    >
      Zum Inhalt springen
    </a>
  );
}
