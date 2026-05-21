"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom blob cursor. Morphs (scales + tints) on hover over [data-cursor="link"].
 * Hidden on touch / coarse pointers.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest('a, button, [data-cursor="link"]');
      if (t) {
        ringRef.current?.classList.add("is-hover");
        dotRef.current?.classList.add("is-hover");
      } else {
        ringRef.current?.classList.remove("is-hover");
        dotRef.current?.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  // Render Knoten IMMER, damit React's Reconciler nie einen "verschwundenen"
  // Knoten beim Unmount sucht (Quelle des sporadischen removeChild-Crashs).
  // Sichtbarkeit/Aktivität wird per CSS via `enabled`-State gesteuert.
  return (
    <div aria-hidden style={{ display: enabled ? "block" : "none" }}>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-ink/70 transition-[width,height,background-color,border-color] duration-300 ease-out [&.is-hover]:h-16 [&.is-hover]:w-16 [&.is-hover]:bg-moss/15 [&.is-hover]:border-moss"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-ink transition-opacity duration-200 [&.is-hover]:opacity-0"
      />
    </div>
  );
}
