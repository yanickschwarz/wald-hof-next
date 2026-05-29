import type { Metadata } from "next";
import View from "./View";

export const metadata: Metadata = {
  title: "Rollrasen verlegen — Schritt-für-Schritt-Anleitung",
  description: "So verlegen Sie Rollrasen richtig: Boden vorbereiten, Bahnen verlegen, wässern. Praxis-Tipps von Hans Vögeli, Rasen vom Waldhof.",
  alternates: { canonical: "/rollrasen-verlegen" },
  openGraph: { title: "Rollrasen verlegen — Schritt-für-Schritt-Anleitung", description: "So verlegen Sie Rollrasen richtig: Boden vorbereiten, Bahnen verlegen, wässern. Praxis-Tipps von Hans Vögeli, Rasen vom Waldhof.", url: "/rollrasen-verlegen", type: "website" },
};

export default function Page() {
  return <View />;
}
