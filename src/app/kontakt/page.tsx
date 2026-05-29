import type { Metadata } from "next";
import View from "./View";

export const metadata: Metadata = {
  title: "Kontakt — Zielebachweg 6, 3428 Wiler",
  description: "Rasen vom Waldhof — Zielebachweg 6, 3428 Wiler. Telefon +41 79 935 55 45, info@wald-hof.ch. Persönliche Beratung durch Hans Vögeli.",
  alternates: { canonical: "/kontakt" },
  openGraph: { title: "Kontakt — Zielebachweg 6, 3428 Wiler", description: "Rasen vom Waldhof — Zielebachweg 6, 3428 Wiler. Telefon +41 79 935 55 45, info@wald-hof.ch. Persönliche Beratung durch Hans Vögeli.", url: "/kontakt", type: "website" },
};

export default function Page() {
  return <View />;
}
