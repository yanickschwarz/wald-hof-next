"use client";

import { useEffect, useRef } from "react";
import type { StaticImageData } from "next/image";

interface Props {
  image: string | StaticImageData;
  alt: string;
  /** CSS height of the section (e.g. "80vh"). Default 80vh. */
  height?: string;
  /** Parallax strength in px (default 120) */
  strength?: number;
  className?: string;
}

/**
 * Vollformat-Bild mit sanftem Parallax-Effekt beim Scrollen.
 * Bild wird leicht überskaliert und vertikal mit dem Scroll versetzt.
 */
export default function ParallaxImage({ image, alt, height = "80vh", strength = 120, className }: Props) {
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
    <figure
      ref={wrapRef}
      className={`relative w-full overflow-hidden bg-ink ${className ?? ""}`}
      style={{ height }}
    >
      <img
        ref={imgRef}
        src={typeof image === "string" ? image : image.src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "scale(1.18)" }}
      />
    </figure>
  );
}
