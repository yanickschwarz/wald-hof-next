import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ORTE, SUPPORTED_ORTE } from "./orte";
import View from "./View";

type Params = Promise<{ ort: string }>;

// Alle Orts-Landingpages zur Build-Zeit statisch vorrendern.
export function generateStaticParams() {
  return SUPPORTED_ORTE.map((ort) => ({ ort }));
}

// Pro Ort eigener Title / Description / Canonical.
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { ort } = await params;
  const data = ORTE[ort.toLowerCase()];
  if (!data) return {};
  const title = `Rollrasen ${data.name} — frisch geliefert ab Hof`;
  const description = `Rollrasen für ${data.name} (${data.kanton}). Lieferung ${data.lieferzeit} ab eigener Produktion in Wiler BE — Haus- und Allzweckrasen sowie Mini-Kräuter-Flora aus Schweizer Boden.`;
  const url = `/rollrasen/${ort.toLowerCase()}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { ort } = await params;
  const key = ort.toLowerCase();
  if (!ORTE[key]) notFound();
  return <View ort={key} />;
}
