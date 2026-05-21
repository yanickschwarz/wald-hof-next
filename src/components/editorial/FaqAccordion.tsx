"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem { q: string; a: string }

interface Props { items: FaqItem[]; className?: string }

/**
 * Editorial FAQ accordion. Caller can pair this with FAQPage JSON-LD.
 */
export default function FaqAccordion({ items, className }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className={cn("divide-y divide-ink/15 border-y border-ink/15", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              data-cursor="link"
              className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
            >
              <span className="font-display text-2xl tracking-tight text-ink md:text-4xl">{it.q}</span>
              <Plus
                aria-hidden
                className={cn(
                  "h-6 w-6 shrink-0 text-ink/60 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]",
                  isOpen && "rotate-45",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-12 text-base leading-relaxed text-ink/75 md:pb-8 md:text-lg">
                  {it.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
