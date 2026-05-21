"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

interface Props {
  /** Path under /public, without leading slash. e.g. "frames/rollen" */
  basePath: string;
  frameCount: number;
  ctaTo: string;
  ctaLabel: string;
  /** Optional headline displayed centered together with the CTA at the end of scroll */
  headline?: string;
  ariaLabel?: string;
  /** vh height of the scroll wrapper, default 200 */
  heightVh?: number;
}

/**
 * Generischer Scroll-Scrub durch eine Frame-Sequenz (WebP).
 * Frames werden auf ein <canvas> gezeichnet, gebunden an den Scroll-Progress.
 * Am Ende erscheint zentriert eine Headline + CTA.
 */
export default function ScrollFrameSequence({
  basePath,
  frameCount,
  ctaTo,
  ctaLabel,
  headline,
  ariaLabel,
  heightVh = 200,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [firstFrameSrc, setFirstFrameSrc] = useState<string>("");

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const folder = isMobile ? "mobile" : "desktop";
    setFirstFrameSrc(`/${basePath}/${folder}/frame-001.webp`);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setReduced(true); return; }

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const images: HTMLImageElement[] = Array.from({ length: frameCount }, (_, i) => {
      const img = new Image();
      img.src = `/${basePath}/${folder}/frame-${String(i + 1).padStart(3, "0")}.webp`;
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

      const frame = Math.round(raw * (frameCount - 1));
      if (frame !== currentFrame) {
        currentFrame = frame;
        drawFrame(frame);
      }

      // CTA fade-in über die letzten 25 % des Scrolls
      if (ctaRef.current) {
        const t = Math.max(0, Math.min(1, (raw - 0.75) / 0.2));
        ctaRef.current.style.opacity = String(t);
        ctaRef.current.style.transform = `translate3d(0, ${(1 - t) * 24}px, 0)`;
        ctaRef.current.style.pointerEvents = t > 0.6 ? "auto" : "none";
      }
    };

    const requestUpdate = () => { if (!raf) raf = requestAnimationFrame(update); };

    const loadImage = (img: HTMLImageElement) =>
      new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth > 0) return resolve();
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

    Promise.all(images.slice(0, 8).map(loadImage)).then(() => {
      if (!mounted) return;
      resize();
      drawFrame(0);
      requestUpdate();
      Promise.all(images.slice(8).map(loadImage)).then(() => {
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
  }, [basePath, frameCount]);

  return (
    <section
      ref={wrapRef}
      aria-label={ariaLabel}
      className="relative w-full bg-bg"
      style={{ height: reduced ? "100vh" : `${heightVh}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg md:block">
        {/* Canvas-Bühne: mobil 50vh zentriert mit Weiss oben/unten, ab md vollflächig */}
        <div className="relative h-[50vh] w-full md:absolute md:inset-0 md:h-full">
          {!reduced ? (
            <canvas ref={canvasRef} aria-hidden className="block h-full w-full" style={{ width: "100%", height: "100%" }} />
          ) : (
            firstFrameSrc && <img src={firstFrameSrc} alt="" aria-hidden className="h-full w-full object-contain" />
          )}

          {/* Overlay: Headline + CTA, zentriert über dem Video, faden gemeinsam ein */}
          <div
            ref={ctaRef}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-6 text-center"
            style={{ opacity: reduced ? 1 : 0, transform: reduced ? "none" : "translate3d(0,24px,0)" }}
          >
            {headline && (
              <h2 className="h-section max-w-2xl text-balance text-bg drop-shadow-md">
                {headline}
              </h2>
            )}
            <div className="pointer-events-auto">
              <Link href={ctaTo}>
                <MagneticButton variant="primary" className="bg-bg text-ink hover:bg-glow">{ctaLabel} →</MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
