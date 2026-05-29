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
  metadataBase: new URL("https://wald-hof.ch"),
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://wald-hof.ch/#business",
  name: "Rasen vom Waldhof",
  description:
    "Premium Rollrasen aus eigener Schweizer Produktion in Wiler BE. Frisch geschält, schnell geliefert, einfach zu verlegen.",
  url: "https://wald-hof.ch",
  email: "info@wald-hof.ch",
  telephone: "+41799355545",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zielebachweg 6",
    postalCode: "3428",
    addressLocality: "Wiler",
    addressRegion: "BE",
    addressCountry: "CH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.1739,
    longitude: 7.5403,
  },
  founder: { "@type": "Person", name: "Hans Vögeli" },
  areaServed: [
    "Bern",
    "Solothurn",
    "Thun",
    "Biel",
    "Burgdorf",
    "Langenthal",
    "Aarau",
    "Luzern",
    "Freiburg",
    "Basel",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
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
