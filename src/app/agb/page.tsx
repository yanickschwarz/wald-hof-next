import Link from "next/link";

export default function AgbPage() {
  return (
    <section className="relative min-h-screen bg-bg pt-40">
      <div className="mx-auto grid max-w-none grid-cols-12 gap-6 px-6 pb-32 md:px-10">
        <div className="col-span-12 md:col-span-2">
          <p className="eyebrow text-ink/50">10 / Recht</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h1 className="h-display text-ink">AGB</h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl">
            Allgemeine Geschäftsbedingungen.
          </p>
          <p className="mt-16 text-sm text-ink/50">
            — Diese Seite wird im nächsten Schritt mit Inhalten gefüllt.
          </p>
          <Link href="/" className="story-link mt-10 inline-block text-sm">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
}
