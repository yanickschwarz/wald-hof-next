import { ReactNode } from "react";
import Reveal from "./Reveal";

interface Spec { label: string; value: string }

interface Props {
  index: string;          // e.g. "01"
  name: string;           // "Premium"
  tagline: string;        // kurzer Pitch
  description: string;
  image: string | { src: string };
  imageAlt: string;
  specs: Spec[];
  bestFor: string[];
  reverse?: boolean;
  badge?: ReactNode;
}

/**
 * Editorial-Case für eine Rasensorte. Grosse Bildfläche, Spec-Tabelle,
 * "Geeignet für" Tag-Liste. Wechselseitige Anordnung via `reverse`.
 */
export default function SortenCase({
  index, name, tagline, description, image, imageAlt, specs, bestFor, reverse, badge,
}: Props) {
  return (
    <article className="border-t border-ink/15 py-20 md:py-32">
      <div className={`mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-10 px-6 md:px-10 ${reverse ? "md:[direction:rtl]" : ""}`}>
        {/* Bild */}
        <Reveal variant="mask" className="col-span-12 md:col-span-7 [direction:ltr]">
          <figure className="relative aspect-[4/3] overflow-hidden bg-cream">
            <img
              src={typeof image === "string" ? image : image.src}
              alt={imageAlt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {badge && (
              <div className="absolute left-6 top-6 bg-bg/95 px-4 py-2 text-xs uppercase tracking-[0.18em] text-ink">
                {badge}
              </div>
            )}
          </figure>
        </Reveal>

        {/* Text */}
        <div className="col-span-12 md:col-span-5 [direction:ltr]">
          <Reveal>
            <p className="eyebrow text-ink/50">{index} / Sorte</p>
            <h2 className="h-section mt-4 text-ink">{name}</h2>
            <p className="mt-4 max-w-md font-display text-2xl italic text-moss">
              {tagline}
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75 md:text-lg">
              {description}
            </p>
          </Reveal>

          {/* Specs */}
          <Reveal delay={120}>
            <dl className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {specs.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-xs uppercase tracking-[0.16em] text-ink/55">{s.label}</dt>
                  <dd className="text-right font-display text-lg text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Geeignet für */}
          <Reveal delay={200}>
            <p className="mt-8 text-xs uppercase tracking-[0.16em] text-ink/55">Geeignet für</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {bestFor.map((b) => (
                <li
                  key={b}
                  className="border border-ink/20 px-3 py-1 text-sm text-ink/80"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
