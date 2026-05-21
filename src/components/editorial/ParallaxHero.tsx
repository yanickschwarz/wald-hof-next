"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  image: string | { src: string };
  alt: string;
  caption?: string;
  /** Optional H1 für Hero-Bereich (überlagert das Bild zentriert). */
  title?: ReactNode;
  /** Optional CTA-Slot (typischerweise zwei Buttons / Links). */
  ctas?: ReactNode;
  /** Strength of the parallax in px (default 120) */
  strength?: number;
}

/**
 * 100vh full-bleed Hero-Bild mit Parallax-Effekt beim Scrollen.
 * Optional mit überlagertem H1-Titel und CTA-Slot.
 */
export default function ParallaxHero({ image, alt, caption, title, ctas, strength = 120 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const img = imgRef.current;
      if (!wrap || !img) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = (rect.top + rect.height / 2 - vh / 2) / vh;
      img.style.transform = `translate3d(0, ${(-t * strength).toFixed(1)}px, 0) scale(1.18)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <section ref={wrapRef} className="relative h-screen w-full overflow-hidden bg-ink">
      <img
        ref={imgRef}
        src={typeof image === "string" ? image : image.src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "scale(1.18)" }}
      />
      {(title || ctas) && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/60" aria-hidden />
      )}
      {(title || ctas) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-10">
          {title && (
            <h1 className="font-display text-balance text-bg drop-shadow-md text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
              {title}
            </h1>
          )}
          {ctas && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {ctas}
            </div>
          )}
        </div>
      )}
      {caption && (
        <figcaption className="absolute bottom-8 left-6 max-w-md font-display text-xl italic text-bg drop-shadow-md md:bottom-10 md:left-10 md:text-3xl">
          {caption}
        </figcaption>
      )}
    </section>
  );
}
