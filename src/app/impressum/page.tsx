import type { Metadata } from "next";
import View from "./View";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Angaben der Rasen vom Waldhof, 3428 Wiler, gemäss Schweizer Recht.",
  alternates: { canonical: "/impressum" },
  openGraph: { title: "Impressum", description: "Impressum und rechtliche Angaben der Rasen vom Waldhof, 3428 Wiler, gemäss Schweizer Recht.", url: "/impressum", type: "website" },
};

export default function Page() {
  return <View />;
}
