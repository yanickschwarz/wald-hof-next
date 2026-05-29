import type { Metadata } from "next";
import View from "./View";

export const metadata: Metadata = {
  title: "Über uns — Familie Vögeli, Wiler BE",
  description: "Rasen vom Waldhof — Familienbetrieb in Wiler BE. Susanna, Hans, Tim und Mika produzieren Schweizer Rollrasen auf über 20 ha.",
  alternates: { canonical: "/ueber-uns" },
  openGraph: { title: "Über uns — Familie Vögeli, Wiler BE", description: "Rasen vom Waldhof — Familienbetrieb in Wiler BE. Susanna, Hans, Tim und Mika produzieren Schweizer Rollrasen auf über 20 ha.", url: "/ueber-uns", type: "website" },
};

export default function Page() {
  return <View />;
}
