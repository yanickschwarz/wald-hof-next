import type { Metadata } from "next";
import View from "./View";

export const metadata: Metadata = {
  title: "Preis-Konfigurator — Rollrasen-Kosten berechnen",
  description: "Berechnen Sie in Sekunden den Richtpreis für Schweizer Rollrasen. Staffelpreise pro m² für Haus- und Allzweckrasen sowie Mini-Kräuter-Flora.",
  alternates: { canonical: "/preis-konfigurator" },
  openGraph: { title: "Preis-Konfigurator — Rollrasen-Kosten berechnen", description: "Berechnen Sie in Sekunden den Richtpreis für Schweizer Rollrasen. Staffelpreise pro m² für Haus- und Allzweckrasen sowie Mini-Kräuter-Flora.", url: "/preis-konfigurator", type: "website" },
};

export default function Page() {
  return <View />;
}
