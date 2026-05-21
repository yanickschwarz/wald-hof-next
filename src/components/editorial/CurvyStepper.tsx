"use client";

import { useEffect, useRef, useState } from "react";

export interface CurvyStep { title: string; body: string }

interface Props { steps: CurvyStep[] }

/**
 * Vertikaler Prozess-Stepper mit Scroll-gekoppelter SVG-Linie und animierten
 * Schritten. Die Linie zeichnet sich progressiv von oben nach unten. Sobald
 * der Scroll-Progress die Höhe eines Schrittes überschreitet, ploppt dieser
 * Schritt mit einer kombinierten Fade-Up + Scale + Color-Animation auf.
 *
 * Respektiert prefers-reduced-motion: dort werden alle Schritte sofort
 * sichtbar und die Linie wird ohne Übergang gezeichnet.
 */
export default function CurvyStepper({ steps }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Konstanten für die SVG (viewBox-Höhe pro Schritt)
  const STEP_H = 220;
  const VB_W = 200;
  const VB_H = STEP_H * (steps.length - 1) + 80;
  const CX = VB_W / 2;

  const points = steps.map((_, i) => ({ x: CX, y: 40 + i * STEP_H }));

  const buildPath = () => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  // prefers-reduced-motion einmalig auslesen
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [steps.length]);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }
    let ticking = false;
    const compute = () => {
      const node = wrapRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.2;
      const total = rect.height;
      const scrolled = start - rect.top;
      const span = total + (start - end);
      const p = scrolled / span;
      setProgress(Math.min(1, Math.max(0, p)));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  const drawn = pathLen * progress;

  // Pro-Step-Aktivierung: Schritt i wird aktiv, sobald der Linien-Progress
  // diese Schwelle überschreitet. Die Schwellen liegen bewusst deutlich VOR
  // dem geometrischen Position des Knotens (i / (n-1)), damit die Punkte
  // früh und großzügig aufploppen — nicht erst, wenn der User schon halb
  // durch ist. Schritt 1 ist von Anfang an sichtbar.
  //
  // Für 4 Schritte ergibt das die Schwellen [0%, 14%, 32%, 50%] — d.h. der
  // letzte Schritt poppt bereits bei der Hälfte der Sektion auf.
  const stepThresholds = steps.map((_, i) => {
    if (i === 0) return 0;
    if (steps.length === 1) return 0;
    return (i / (steps.length - 1)) * 0.5 - 0.02;
  });

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-5xl">
      {/* SVG-Kurve — auf Desktop hinter den Karten */}
      <svg
        aria-hidden
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        <path
          d={buildPath()}
          fill="none"
          stroke="hsl(var(--ink) / 0.15)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={pathRef}
          d={buildPath()}
          fill="none"
          stroke="hsl(var(--moss))"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={pathLen || 1}
          strokeDashoffset={pathLen ? pathLen - drawn : 0}
        />
      </svg>

      <ol className="relative space-y-12 md:space-y-24">
        {steps.map((s, i) => {
          const left = i % 2 === 0;
          const isActive = progress >= stepThresholds[i];

          return (
            <li key={i} className="relative md:grid md:grid-cols-2 md:items-center md:gap-12">
              {/* Karte mit Fade-Up + Scale Animation */}
              <div
                className={
                  (left
                    ? "md:col-start-1 md:pr-10 md:text-right"
                    : "md:col-start-2 md:pl-10 md:text-left") +
                  " transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]"
                }
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
                  transitionDelay: isActive ? "120ms" : "0ms",
                }}
              >
                <p
                  className="font-display text-5xl leading-none transition-colors duration-700 md:text-6xl"
                  style={{ color: isActive ? "hsl(var(--moss))" : "hsl(var(--ink) / 0.25)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-tight text-ink md:text-3xl">
                  {s.title}
                </h3>
                <p
                  className={`mt-3 max-w-md text-base leading-relaxed text-ink/75 ${
                    left ? "md:ml-auto" : ""
                  }`}
                >
                  {s.body}
                </p>
              </div>

              {/* Knotenpunkt auf der Mittelachse — nur Desktop. Beim Aktivieren
                  pulsiert er kurz und füllt sich satt mit Moss-Grün. */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
              >
                {/* Glow-Ring, der beim Aktivieren kurz aufploppt */}
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "hsl(var(--moss) / 0.18)",
                    opacity: isActive ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.4})`,
                  }}
                />
                {/* Eigentlicher Knoten */}
                <span
                  className="relative block rounded-full border-2 transition-[background-color,border-color,transform] duration-500"
                  style={{
                    width: "16px",
                    height: "16px",
                    borderColor: "hsl(var(--moss))",
                    background: isActive ? "hsl(var(--moss))" : "hsl(var(--bg))",
                    transform: isActive ? "scale(1.25)" : "scale(1)",
                  }}
                />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
