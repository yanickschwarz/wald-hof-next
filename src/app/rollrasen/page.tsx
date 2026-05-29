import type { Metadata } from "next";
import View from "./View";

export const metadata: Metadata = {
  title: "Rollrasen-Sorten — Haus- & Allzweckrasen und Mini-Kräuter-Flora",
  description: "Zwei Schweizer Rollrasen-Sorten aus eigener Produktion in Wiler BE. Haus- und Allzweckrasen für Garten und Sport, Mini-Kräuter-Flora für Dachbegrünung.",
  alternates: { canonical: "/rollrasen" },
  openGraph: { title: "Rollrasen-Sorten — Haus- & Allzweckrasen und Mini-Kräuter-Flora", description: "Zwei Schweizer Rollrasen-Sorten aus eigener Produktion in Wiler BE. Haus- und Allzweckrasen für Garten und Sport, Mini-Kräuter-Flora für Dachbegrünung.", url: "/rollrasen", type: "website" },
};

export default function Page() {
  return <View />;
}
