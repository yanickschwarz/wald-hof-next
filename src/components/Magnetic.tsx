"use client";

import { ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  /** When true, wrapping span is block-level */
  block?: boolean;
}

/**
 * Wraps any element (Link, button, anchor) with a magnetic hover effect.
 * The wrapper translates toward the cursor; child translates a bit less for a parallax feel.
 */
export default function Magnetic({ children, strength = 0.3, className, block = false }: MagneticProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    inner.style.transform = `translate(${x * strength * 0.4}px, ${y * strength * 0.4}px)`;
  };
  const onLeave = () => {
    if (wrapRef.current) wrapRef.current.style.transform = "";
    if (innerRef.current) innerRef.current.style.transform = "";
  };

  return (
    <span
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        block ? "block" : "inline-block",
        "transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform",
        className,
      )}
    >
      <span
        ref={innerRef}
        className="block transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
      >
        {children}
      </span>
    </span>
  );
}
