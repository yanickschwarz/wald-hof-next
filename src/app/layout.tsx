import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F4F1EA",
};

// Basis-Metadata für die Site. Pro Page wird mit `export const metadata`
// im jeweiligen page.tsx überschrieben.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.wald-hof.ch"),
  title: {
    default: "Rasen vom Waldhof — Schweizer Rollrasen direkt vom Hof",
    template: "%s | Waldhof",
  },
  description:
    "Premium Rollrasen aus eigener Schweizer Produktion in Wiler BE. Frisch geschält, schnell geliefert, einfach zu verlegen.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Rasen vom Waldhof",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH" className={`${fraunces.variable} ${interTight.variable}`}>
      <body className="antialiased">
        <Providers>
          <Header />
          <main id="main" className="grain">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
