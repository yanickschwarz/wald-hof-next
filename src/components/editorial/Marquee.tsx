interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
}

/**
 * Endlos scrollender Streifen. Animation pausiert per prefers-reduced-motion (siehe index.css).
 */
export default function Marquee({ items, separator = "—", className = "" }: MarqueeProps) {
  return (
    <section
      aria-hidden
      className={`overflow-hidden border-y border-ink/10 bg-bg py-8 ${className}`}
    >
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display text-5xl tracking-tight text-ink/85 md:text-7xl">
        {Array.from({ length: 2 }).flatMap((_, k) =>
          items.flatMap((t, i) => [
            <span key={`${k}-t-${i}`}>{t}</span>,
            <span key={`${k}-s-${i}`} className="text-ink/30">{separator}</span>,
          ]),
        )}
      </div>
    </section>
  );
}
