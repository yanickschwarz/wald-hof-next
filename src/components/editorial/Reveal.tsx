"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "fade-up" | "mask" — mask uses clip-path, fade-up uses translateY */
  variant?: "fade-up" | "mask";
  as?: "div" | "section" | "figure" | "li" | "article";
}

/**
 * IntersectionObserver-driven reveal. Respects prefers-reduced-motion via CSS.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Kleiner Delay sorgt dafür, dass auch above-the-fold-Elemente
          // sichtbar von ihrem hidden-Zustand wegranimieren.
          window.setTimeout(() => setSeen(true), 60);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    obs.observe(node);

    // Safety fallback — guarantees visibility even if observer never fires
    const t = window.setTimeout(() => setSeen(true), 2000);

    return () => {
      obs.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.6,0,0.05,1)] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:[clip-path:none]",
        variant === "fade-up" && (seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"),
        variant === "mask" && (seen ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
