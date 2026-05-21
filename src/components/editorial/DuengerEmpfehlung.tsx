"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import Reveal from "./Reveal";

import bio from "@/assets/duenger-bio-beckmann.png";
import starter from "@/assets/duenger-starter.png";
import langzeit from "@/assets/duenger-langzeit.png";
import economic from "@/assets/duenger-economic.png";
import herbst from "@/assets/duenger-herbst.png";

/**
 * Beckmann Profi Dünger — horizontaler Slider mit "schwebenden" Säcken.
 * Kein Karten-Hintergrund, transparente PNGs auf Cream-Section.
 */

interface Duenger {
  image: StaticImageData;
  alt: string;
  name: string;
  formel: string;
  tagline: string;
  zeitraum: string;
  reichweite: string;
}

const DUENGER: Duenger[] = [
  {
    image: bio,
    alt: "Beckmann Profi Bio-Rasendünger organisch — 20 kg Sack",
    name: "Bio organisch",
    formel: "Bio · NPK 9+3+6",
    tagline: "Organischer Bio-Rasendünger — verbessert müde Böden, fördert das Bodenleben und ist unschädlich für Mensch und Tier.",
    zeitraum: "März – Oktober",
    reichweite: "20 kg / ca. 400 m²",
  },
  {
    image: starter,
    alt: "Beckmann Profi Rasendünger Starter 12+22+10",
    name: "Starter",
    formel: "12 + 22 + 10",
    tagline: "Startdünger für Neuanlage und Regeneration — speziell bei der Rollrasen-Verlegung.",
    zeitraum: "März – Oktober",
    reichweite: "25 kg / ca. 700 m²",
  },
  {
    image: langzeit,
    alt: "Beckmann Profi Rasendünger Langzeitwirkung 20+5+8",
    name: "Langzeit",
    formel: "20 + 5 + 8",
    tagline: "Hauptpflege mit über Wochen freigesetztem Stickstoff. Verhindert Stosswachstum.",
    zeitraum: "März – September",
    reichweite: "25 kg / ca. 830 m²",
  },
  {
    image: economic,
    alt: "Beckmann Profi Rasendünger Economic 30+5+6",
    name: "Economic",
    formel: "30 + 5 + 6",
    tagline: "Stickstoffbetonte Pflegedüngung für grosse Zier- und Sportrasenflächen.",
    zeitraum: "März – August",
    reichweite: "25 kg / ca. 1000 m²",
  },
  {
    image: herbst,
    alt: "Beckmann Profi Rasendünger Herbst 6+5+12",
    name: "Herbst",
    formel: "6 + 5 + 12",
    tagline: "Hoher Kaliumanteil stärkt die Zellwände — der Rasen geht winterhart in die Ruhepause.",
    zeitraum: "September – Oktober",
    reichweite: "25 kg / ca. 700 m²",
  },
];

export default function DuengerEmpfehlung() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="border-t border-ink/15 bg-cream/40 py-24 md:py-32">
      <div className="mx-auto max-w-none px-6 md:px-10">
        {/* Header row */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <p className="eyebrow text-ink/55">Passende Pflege</p>
              <h2 className="h-section mt-6 text-ink">Beckmann Profi Dünger</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75">
                Bewährte Beckmann-Profi-Dünger — vom organischen Bio bis zur winterharten Herbstdüngung, passend zum Jahresverlauf. Preise auf Anfrage; gerne legen wir Säcke direkt mit der Lieferung bei.
              </p>
              <Link
                href="/kontakt"
                data-cursor="link"
                className="story-link mt-8 inline-block text-sm uppercase tracking-[0.16em] text-ink"
              >
                Dünger anfragen →
              </Link>
            </Reveal>
          </div>

          {/* Controls */}
          <div className="col-span-12 flex items-end justify-end gap-3 md:col-span-5">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Vorheriger Dünger"
              data-cursor="link"
              className="grid h-12 w-12 place-items-center border border-ink/30 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Nächster Dünger"
              data-cursor="link"
              className="grid h-12 w-12 place-items-center border border-ink/30 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-14 -mx-6 md:-mx-10">
          <div ref={emblaRef} className="overflow-hidden px-6 md:px-10">
            <ul className="flex gap-6 md:gap-10">
              {DUENGER.map((d, i) => (
                <li
                  key={d.name}
                  className="group flex-[0_0_85%] sm:flex-[0_0_55%] md:flex-[0_0_38%] lg:flex-[0_0_28%]"
                >
                  <Reveal delay={i * 80}>
                    <figure className="relative flex aspect-[4/5] items-end justify-center overflow-visible">
                      {/* schwebender Schatten */}
                      <span
                        aria-hidden
                        className="absolute bottom-2 left-1/2 h-4 w-3/5 -translate-x-1/2 rounded-[50%] bg-ink/25 blur-xl transition-all duration-500 group-hover:w-2/3 group-hover:bg-ink/35"
                      />
                      <img
                        src={d.image.src}
                        alt={d.alt}
                        loading="lazy"
                        className="relative h-full w-full select-none object-contain drop-shadow-[0_30px_40px_rgba(20,30,15,0.25)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform group-hover:-translate-y-3"
                        draggable={false}
                      />
                    </figure>
                    <div className="mt-6">
                      <p className="eyebrow text-moss">{d.formel}</p>
                      <h3 className="font-display mt-2 text-3xl tracking-tight text-ink">{d.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/75">{d.tagline}</p>
                      <dl className="mt-5 divide-y divide-ink/10 border-y border-ink/10 text-sm">
                        <div className="flex justify-between py-2">
                          <dt className="text-ink/55">Anwendung</dt>
                          <dd className="text-ink">{d.zeitraum}</dd>
                        </div>
                        <div className="flex justify-between py-2">
                          <dt className="text-ink/55">Reichweite</dt>
                          <dd className="text-ink">{d.reichweite}</dd>
                        </div>
                        <div className="flex justify-between py-2">
                          <dt className="text-ink/55">Preis</dt>
                          <dd className="text-moss">auf Anfrage</dd>
                        </div>
                      </dl>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
