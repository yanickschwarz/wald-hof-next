import { ReactNode } from "react";
import Reveal from "./Reveal";

interface EditorialHeroProps {
  /** Beibehalten für Abwärtskompatibilität, wird aber nicht mehr gerendert. */
  number?: string;
  /** Beibehalten für Abwärtskompatibilität, wird aber nicht mehr gerendert. */
  eyebrow?: string;
  title: ReactNode;
  subline?: ReactNode;
  rightSlot?: ReactNode;
  bg?: "bg" | "cream" | "ink";
  /** Heading-Level für SEO. Default h1 — auf "h2" setzen, wenn ParallaxHero bereits ein H1 zeigt. */
  titleAs?: "h1" | "h2";
}

/**
 * Wiederverwendbarer Editorial-Hero für alle Inhaltsseiten.
 * Layout: Display-Headline · optional Bild/Slot rechts.
 * Hinweis: Die früheren Eyebrow-Labels ("01 / Sortiment" etc.) wurden bewusst
 * entfernt; die Props bleiben in der Signatur, damit bestehende Page-Aufrufe
 * nicht angepasst werden müssen.
 */
export default function EditorialHero({
  title,
  subline,
  rightSlot,
  bg = "bg",
  titleAs = "h1",
}: EditorialHeroProps) {
  const bgCls = bg === "ink" ? "bg-ink text-bg" : bg === "cream" ? "bg-cream/50" : "bg-bg";
  const text = bg === "ink" ? "text-bg" : "text-ink";
  const TitleTag = titleAs;
  return (
    <section className={`relative ${bgCls} pt-36 md:pt-44`}>
      <div className="mx-auto grid max-w-none grid-cols-12 gap-x-6 gap-y-10 px-6 pb-20 md:px-10 md:pb-28">
        <div className={`col-span-12 ${rightSlot ? "md:col-span-8" : "md:col-span-11"} ${text}`}>
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
