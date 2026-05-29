import type { Metadata } from "next";
import View from "./View";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Rasen vom Waldhof gemäss revDSG und DSGVO.",
  alternates: { canonical: "/datenschutz" },
  openGraph: { title: "Datenschutz", description: "Datenschutzerklärung der Rasen vom Waldhof gemäss revDSG und DSGVO.", url: "/datenschutz", type: "website" },
};

export default function Page() {
  return <View />;
}
