import { ReactNode } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object | object[];
  children?: ReactNode;
}

/**
 * Migrated for Next.js: title/description/canonical/OG sind nun über die Next.js
 * Metadata API (export const metadata in jeder Page) gesetzt. Diese Komponente
 * rendert NUR noch JSON-LD-Schemas, damit bestehende Page-Files nicht alle
 * umgebaut werden müssen.
 *
 * Im SEO-Optimierungs-Schritt wird dieses Component komplett durch die Metadata-API
 * und app/<page>/layout.tsx Schema-Injection ersetzt.
 */
export default function SeoHead({ jsonLd }: SeoProps) {
  if (!jsonLd) return null;
  const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return (
    <>
      {data.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
