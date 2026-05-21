# Waldhof Hero – Scroll-Video Frame Sequence (Mittelvariante / empfohlen)

90 Frames aus dem Hero-Video, ausgewogenes Verhaeltnis aus Qualitaet und Dateigroesse.

## Inhalt

```
/desktop  → 90 × WebP @ 1920×1080 (Quality 85) — ca. 20 MB total
/mobile   → 90 × WebP @ 1080×608  (Quality 80) — ca. 7.8 MB total
```

Frames sind nummeriert: `frame-001.webp` bis `frame-090.webp`

**Frame-Anzahl:** 90 (volle 30fps bei 3 Sek Original-Video — kein Downsampling).
**Quality:** Desktop 85, Mobile 80.

> Diese Variante ist der empfohlene Kompromiss: visuell praktisch nicht von der
> Q92-Maximalvariante zu unterscheiden, aber ein Drittel kleiner
> (20 MB statt 30 MB Desktop). Fuer ein Hero-Element die bessere Wahl,
> da schneller geladen.

## Einsatz in Lovable / Next.js

1. Frames nach `/public/frames/desktop/` und `/public/frames/mobile/` legen
2. Im Hero-Component: HTMLImageElement-Array auf einem `<canvas>` zeichnen,
   `currentFrame` an Scroll-Progress binden (GSAP ScrollTrigger mit `scrub`)

## Beispiel-Snippet (Lovable-ready)

```tsx
const FRAME_COUNT = 90;
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const folder = isMobile ? 'mobile' : 'desktop';

const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const img = new Image();
  img.src = `/frames/${folder}/frame-${String(i + 1).padStart(3, '0')}.webp`;
  return img;
});

gsap.to({ frame: 0 }, {
  frame: FRAME_COUNT - 1,
  snap: 'frame',
  ease: 'none',
  scrollTrigger: {
    trigger: heroRef.current,
    start: 'top top',
    end: '+=200%',
    scrub: 0.5,
    pin: true,
    onUpdate: (self) => {
      const frame = Math.round(self.progress * (FRAME_COUNT - 1));
      ctx.drawImage(images[frame], 0, 0, canvas.width, canvas.height);
    },
  },
});
```

## Performance-Hinweise

- **Preloading:** erste 10-15 Frames mit `<link rel="preload" as="image">` im
  `<head>`, Rest im JS preloaden mit `Promise.all` — erst nach vollstaendigem
  Preload den Scrub aktivieren, sonst springen Frames
- **Save-Data-Modus:** `navigator.connection?.saveData` pruefen
  → bei aktiv nur jeden 2. Frame nutzen (effektiv 15fps, ~45 Frames)
- **Reduced Motion:** bei `prefers-reduced-motion: reduce` nur Frame 1 als
  statisches Bild zeigen, kein Scrub
- **DPR-aware Canvas:** `canvas.width = clientWidth * devicePixelRatio` fuer
  scharfe Darstellung auf Retina-Displays
- **Ladeindikator:** waehrend des Preloads einen dezenten Loader oder das
  erste Frame als Standbild zeigen
