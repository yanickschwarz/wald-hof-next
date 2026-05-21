"use client";

import { useRef, MouseEvent, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  strength?: number;
  asChild?: boolean;
}

/** Magnetic hover: button drifts toward cursor within its bounding box. */
const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, variant = "primary", strength = 0.35, className, ...rest }, ref) => {
    const innerRef = useRef<HTMLSpanElement>(null);
    const localRef = useRef<HTMLButtonElement>(null);

    const onMove = (e: MouseEvent<HTMLButtonElement>) => {
      const el = localRef.current;
      const inner = innerRef.current;
      if (!el || !inner) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      inner.style.transform = `translate(${x * strength * 0.4}px, ${y * strength * 0.4}px)`;
    };
    const onLeave = () => {
      const el = localRef.current;
      const inner = innerRef.current;
      if (el) el.style.transform = "";
      if (inner) inner.style.transform = "";
    };

    const styles = {
      primary: "bg-ink text-bg hover:bg-moss",
      ghost:   "bg-transparent text-ink hover:bg-ink/5",
      outline: "border border-ink/30 text-ink hover:border-ink",
    }[variant];

    return (
      <button
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="link"
        className={cn(
          "group relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] transition-[background-color,color,transform,border-color] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform",
          styles,
          className,
        )}
        {...rest}
      >
        <span ref={innerRef} className="inline-flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
          {children}
        </span>
      </button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
export default MagneticButton;
