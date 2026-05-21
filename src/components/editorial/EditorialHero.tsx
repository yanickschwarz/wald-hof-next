import { ReactNode } from "react";
import Reveal from "./Reveal";

interface EditorialHeroProps {
  number: string;
  eyebrow: string;
  title: ReactNode;
  subline?: ReactNode;
  rightSlot?: ReactNode;
  bg?: "bg" | "cream" | "ink";
  /** Heading-Level für SEO. Default h1 — auf "h2" setzen, wenn ParallaxHero bereits ein H1 zeigt. */
  titleAs?: "h1" | "h2";
}

/**
 * Wiederverwendbarer Editorial-Hero für alle Inhaltsseiten.
 * Layout: Sektionsnummer links · Display-Headline mittig · optional Bild/Slot rechts.
 */
export default function EditorialHero({
  number,
  eyebrow,
  title,
  subline,
  rightSlot,
  bg = "bg",
  titleAs = "h1",
}: EditorialHeroProps) {
  const bgCls = bg === "ink" ? "bg-ink text-bg" : bg === "cream" ? "bg-cream/50" : "bg-bg";
  const accent = bg === "ink" ? "text-bg/60" : "text-ink/50";
  const text = bg === "ink" ? "text-bg" : "text-ink";
  const TitleTag = titleAs;
  return (
    <section className={`relative ${bgCls} pt-36 md:pt-44`}>
      <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-10 px-6 pb-20 md:px-10 md:pb-28">
        <div className="col-span-12 md:col-span-2">
          <Reveal><p className={`eyebrow ${accent}`}>{number} / {eyebrow}</p></Reveal>
        </div>
        <div className={`col-span-12 ${rightSlot ? "md:col-span-6" : "md:col-span-9"} ${text}`}>
          <Reveal>
            <TitleTag className="h-display text-balance">{title}</TitleTag>
          </Reveal>
          {subline && (
            <Reveal delay={120}>
              <p className={`mt-10 max-w-2xl text-lg leading-relaxed md:text-xl ${bg === "ink" ? "text-bg/75" : "text-ink/75"}`}>
                {subline}
              </p>
            </Reveal>
          )}
        </div>
        {rightSlot && (
          <div className="col-span-12 md:col-span-4"><Reveal delay={200}>{rightSlot}</Reveal></div>
        )}
      </div>
    </section>
  );
}
