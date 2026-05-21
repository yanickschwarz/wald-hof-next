"use client";

import { useEffect, useRef, useState } from "react";

export interface CurvyStep { title: string; body: string }

interface Props { steps: CurvyStep[] }

/**
 * Vertikaler Prozess-Stepper mit gebogener SVG-Kurve, die sich beim Scrollen
 * vom ersten bis zum letzten Schritt füllt. Schritte alternieren links/rechts.
 */
export default function CurvyStepper({ steps }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [progress, setProgress] = useState(0);

  // Konstanten für die SVG (viewBox-Höhe pro Schritt)
  const STEP_H = 220; // px pro Schritt im viewBox
  const VB_W = 200;
  const VB_H = STEP_H * (steps.length - 1) + 80;
  const CX = VB_W / 2;

  // Punkte abwechselnd links/rechts von der Mittelachse
  const points = steps.map((_, i) => ({
    x: CX,
    y: 40 + i * STEP_H,
  }));

  // Gerade vertikale Linie zwischen allen Knotenpunkten
  const buildPath = () => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [steps.length]);

  useEffect(() => {
    const onScroll = () => {
      const node = wrapRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.2;
      const total = rect.height;
      // Fortschritt basierend auf wie weit das Element durch den Viewport gescrollt ist
      const scrolled = start - rect.top;
      const span = total + (start - end);
      const p = scrolled / span;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const drawn = pathLen * progress;

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-5xl">
      {/* SVG-Kurve — auf Desktop hinter den Karten */}
      <svg
        aria-hidden
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        {/* Hintergrund-Spur */}
        <path d={buildPath()} fill="none" stroke="hsl(var(--ink) / 0.15)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        {/* Animierte Kurve */}
        <path
          ref={pathRef}
          d={buildPath()}
          fill="none"
          stroke="hsl(var(--moss))"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={pathLen || 1}
          strokeDashoffset={pathLen ? pathLen - drawn : 0}
          style={{ transition: "stroke-dashoffset 200ms ease-out" }}
        />
      </svg>

      <ol className="relative space-y-12 md:space-y-24">
        {steps.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <li key={i} className="relative md:grid md:grid-cols-2 md:items-center md:gap-12">
              {/* Karte */}
              <div
                className={
                  left
                    ? "md:col-start-1 md:pr-10 md:text-right"
                    : "md:col-start-2 md:pl-10 md:text-left"
                }
              >
                <p className="font-display text-5xl leading-none text-moss/80 md:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-tight text-ink md:text-3xl">{s.title}</h3>
                <p className={`mt-3 max-w-md text-base leading-relaxed text-ink/75 ${left ? "md:ml-auto" : ""}`}>
                  {s.body}
                </p>
              </div>
              {/* Knotenpunkt auf der Mittelachse — nur Desktop */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-moss bg-bg md:block"
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
