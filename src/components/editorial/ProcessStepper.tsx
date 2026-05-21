"use client";

import { useEffect, useRef, useState } from "react";

export interface Step { title: string; body: string }

interface Props { steps: Step[]; }

/**
 * Horizontaler Prozess-Stepper. Progress-Linie animiert mit Scroll-Position.
 */
export default function ProcessStepper({ steps }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const node = wrapRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const p = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      {/* Progress line — desktop only */}
      <div aria-hidden className="absolute left-0 right-0 top-[1.875rem] hidden h-px bg-ink/15 md:block">
        <div
          className="h-full origin-left bg-moss transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <ol className="relative grid gap-12 md:grid-cols-4 md:gap-6">
        {steps.map((s, i) => (
          <li key={i} className="relative">
            <div className="flex items-center gap-4 md:block">
              <span className="grid h-[3.75rem] w-[3.75rem] place-items-center rounded-full border border-ink/20 bg-bg font-display text-xl text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl tracking-tight text-ink">{s.title}</h3>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-ink/70">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
