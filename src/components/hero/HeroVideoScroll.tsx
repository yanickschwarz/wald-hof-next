"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import { BestellTrigger } from "@/components/BestellModal";
import heroFallback from "@/assets/rollrasen-hero.webp";

/**
 * HERO — Frame-Scrub via Canvas.
 * - Scroll-Bereich: 0–70% scrubt durch FRAME_COUNT Frames.
 * - Scroll-Bereich: 70–100% bleibt auf dem letzten Frame und schiebt das Bild
 *   per Translate-Parallax weiter nach oben (sanftes "Über den Rand schauen").
 * - Headline: zentriert, parallaxt mit dem Scroll, fade-out.
 * - CTAs: zentriert unter der Headline, bleiben beim Scrollen still ("fixiert").
 */
const FRAME_COUNT = 70;
const SCRUB_END = 1.0; // Frame-Scrub bis zum Ende — kein Stillstand auf letztem Frame
const FADE_START = 0.45; // Verlauf gleitet parallel zum letzten Drittel des Scrubs ein

export default function HeroVideoScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setReduced(true); return; }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const folder = isMobile ? "mobile" : "desktop";

    const images: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = `/frames/${folder}/frame-${String(i + 1).padStart(3, "0")}.webp`;
      return img;
    });

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentFrame = 0;
    const drawFrame = (idx: number) => {
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw = cw, dh = ch, dx = 0, dy = 0;
      if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; }
      else { dw = cw; dh = cw / ir; dy = (ch - dh) / 2; }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.round(clientWidth * dpr);
      canvas.height = Math.round(clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrame);
    };

    let raf = 0;
    let mounted = true;

    const update = () => {
      raf = 0;
      if (!mounted) return;
      const rect = wrap.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));

      // Frame-Scrub während des ersten Scroll-Abschnitts
      const scrub = Math.min(1, raw / SCRUB_END);
      const frame = Math.round(scrub * (FRAME_COUNT - 1));
      if (frame !== currentFrame) {
        currentFrame = frame;
        drawFrame(frame);
      }

      // Fade-Phase: weisser Farbverlauf gleitet als Parallax-Schicht von unten
      // bereits vor Ende des Frame-Scrubs ein, damit der Übergang nahtlos wirkt.
      const tail = Math.max(0, Math.min(1, (raw - FADE_START) / (1 - FADE_START)));
      canvas.style.transform = "none";
      if (fadeRef.current) {
        const translate = (1 - tail) * 100;
        fadeRef.current.style.transform = `translate3d(0, ${translate}%, 0)`;
      }

      // Text-Parallax: hebt sich an und faded aus
      if (textRef.current) {
        const y = -raw * window.innerHeight * 0.45;
        textRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - raw * 1.4));
      }
    };

    const requestUpdate = () => { if (!raf) raf = requestAnimationFrame(update); };

    const loadImage = (img: HTMLImageElement) =>
      new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth > 0) return resolve();
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

    Promise.all(images.slice(0, 10).map(loadImage)).then(() => {
      if (!mounted) return;
      resize();
      drawFrame(0);
      requestUpdate();
      Promise.all(images.slice(10).map(loadImage)).then(() => {
        if (mounted) requestUpdate();
      });
    });

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      aria-label="Hero — Rasen vom Waldhof"
      className={`${reduced ? "h-screen" : "h-[200vh]"} relative w-full bg-ink`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background frame canvas */}
        <div className="absolute inset-0">
          {!reduced ? (
            <canvas
              ref={canvasRef}
              aria-hidden
              className="block h-full w-full will-change-transform"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <img src={heroFallback.src} alt="" aria-hidden className="h-full w-full object-cover" />
          )}
        </div>

        {/* Weisser Parallax-Verlauf für smoothen Übergang in den nächsten Abschnitt */}
        {!reduced && (
          <div
            ref={fadeRef}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[70vh] will-change-transform"
            style={{
              transform: "translate3d(0, 100%, 0)",
              backgroundImage:
                "linear-gradient(to bottom, hsl(var(--bg) / 0) 0%, hsl(var(--bg) / 0.6) 35%, hsl(var(--bg) / 0.92) 65%, hsl(var(--bg)) 100%)",
            }}
          />
        )}

        {/* Layout: Headline + CTAs unten zentriert */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-end px-6 pb-16 text-center md:pb-24">
          <div ref={textRef} className="will-change-transform">
            <p className="eyebrow text-bg/80 fade-up" style={{ animationDelay: "0.2s" }}>
              Rasen vom Waldhof — seit Generationen
            </p>
            <h1 className="h-display mt-6 text-bg text-balance text-4xl md:text-6xl lg:text-7xl">
              Schweizer Rollrasen<br />
              direkt vom <em className="font-light italic text-glow">Wald-Hof</em>
            </h1>
          </div>

          {/* CTAs: ausserhalb des parallaxenden Containers → bleiben still */}
          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-3 fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <BestellTrigger className="inline-flex items-center gap-2 bg-bg px-7 py-3 text-sm uppercase tracking-[0.16em] text-ink transition-colors hover:bg-glow">
              Bestellen <span aria-hidden>→</span>
            </BestellTrigger>
            <Link href="/fuer-gaertner">
              <MagneticButton variant="outline" className="border-bg/40 text-bg hover:border-bg">
                Für Gärtner
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
