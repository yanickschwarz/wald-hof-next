import type { Metadata } from "next";
import View from "./View";

export const metadata: Metadata = {
  title: "Rollrasen B2B für Gartenbau-Betriebe",
  description: "Schweizer Rollrasen für Gartenbau-Betriebe. Mengenrabatt ab 200 m², Lieferung am Erntetag, direkter Draht zum Inhaber. Standort Wiler BE.",
  alternates: { canonical: "/fuer-gaertner" },
  openGraph: { title: "Rollrasen B2B für Gartenbau-Betriebe", description: "Schweizer Rollrasen für Gartenbau-Betriebe. Mengenrabatt ab 200 m², Lieferung am Erntetag, direkter Draht zum Inhaber. Standort Wiler BE.", url: "/fuer-gaertner", type: "website" },
};

export default function Page() {
  return <View />;
}
