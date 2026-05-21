# wald-hof.ch — Next.js

Migration des ursprünglichen Vite/React-Projekts auf **Next.js 15 (App Router)**.

## Stack

- **Next.js 15** mit App Router (`src/app/`)
- **React 18** + TypeScript
- **Tailwind v3** mit Shadcn/Radix UI (1:1 vom Vite-Projekt übernommen)
- **GSAP 3** + **Lenis** für Scroll-Animationen
- **next/font** (Fraunces + Inter Tight) statt Google-Fonts-CSS-Import
- **Supabase** (nur für das Bestell-Modal)
- **react-helmet-async** → **Next Metadata API** (in Schritt 2 zu vervollständigen)

## Was diese Migration leistet (Schritt 1)

Alles aus dem alten Vite-Repo wurde übernommen und an Next.js angepasst:

- Sämtliche Komponenten (Editorial, Hero, Layout, Shadcn-UI) — mit `"use client"`
  da, wo Hooks oder Browser-APIs verwendet werden.
- Alle 12 Pages als App-Router-Routes (`src/app/<route>/page.tsx`).
- `react-router-dom` → `next/link` + `next/navigation` (`usePathname`, `useParams`).
- Frame-Sequenz-Hero und Scroll-Effekte funktionieren ohne Änderung
  (90 Frames in `public/frames/desktop` und `public/frames/mobile`).
- `robots.ts` und `sitemap.ts` über die Next-Metadata-Routes.
- `next.config.js` mit Image-Optimization, Security-Headers,
  immutable Cache-Headers für `/frames/`.

## Was Schritt 2 noch bringt (SEO-Perfektion)

- `export const metadata` pro Page (statt JSON-LD-only-SeoHead).
- `generateStaticParams` für `/rollrasen/[ort]` → echte SSG aller Lokal-Pages.
- Open-Graph-Bilder pro Route via `opengraph-image.tsx`.
- 301-Redirects von alten Jimdo-URLs (in `next.config.js`).
- JSON-LD `LocalBusiness` Schema im Root-Layout.

## Lokale Entwicklung

```bash
npm install
cp .env.example .env.local   # Supabase-Keys eintragen
npm run dev
```

App läuft auf <http://localhost:3000>.

## Deployment (Vercel)

Projekt mit Vercel verbinden, dann genügt `vercel deploy`. Framework und
Build-Settings werden automatisch erkannt. Die DNS-Umstellung (A-Record auf
`76.76.21.21`, `www`-CNAME auf `cname.vercel-dns.com`) ist separat im
Hostpoint-DNS zu machen — Mail-Records (`MX`, `autoconfig`, `autodiscover`)
**nicht anfassen**.

## Environment Variables

| Name | Zweck |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase-URL (für das Bestell-Modal) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase-Anon-Key |

## Bekannte Punkte für Schritt 2

- Die SeoHead-Komponente rendert aktuell nur noch JSON-LD; Title/Description/OG
  kommen aus der Metadata-API. Pro Page noch zu setzen.
- `/rollrasen/[ort]` ist aktuell dynamisch. Mit `generateStaticParams` wird
  daraus echtes SSG.
- Bildoptimierung könnte überall auf `next/image` umgestellt werden
  (aktuell `<img src={x.src}>` für 1:1-Kompatibilität mit den Animations-Komponenten).
