import type { MetadataRoute } from "next";

const ORTE = [
  "bern",
  "solothurn",
  "thun",
  "biel",
  "burgdorf",
  "langenthal",
  "aarau",
  "luzern",
  "freiburg",
  "basel",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wald-hof.ch";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/rollrasen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/fuer-gaertner`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/rollrasen-verlegen`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/preis-konfigurator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ueber-uns`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/agb`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const lokalRoutes: MetadataRoute.Sitemap = ORTE.map((o) => ({
    url: `${base}/rollrasen/${o}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...lokalRoutes];
}
