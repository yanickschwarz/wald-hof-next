import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.wald-hof.ch/sitemap.xml",
    host: "https://www.wald-hof.ch",
  };
}
