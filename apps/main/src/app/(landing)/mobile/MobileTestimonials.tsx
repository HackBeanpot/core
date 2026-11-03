"use client";

import React, { useRef } from "react";
import { positions } from "../../../../public/testimonials/positions";
import { Sparkle } from "../../lib/Components/Decor";
import {
  CarouselArrow,
  CarouselRegion,
  CarouselSwap,
  useCarousel,
  useSwipe,
} from "../../lib/Components/museum";
import PictureFrame from "../../lib/Components/museum/PictureFrame";
import { Typography } from "../../lib/Components/museum/Typography";
import {
  testimonials as defaultTestimonials,
  testimonialsSection,
  type Testimonial,
} from "../../lib/content";
import { sm, smBox, smUnitVar } from "./smUnits";

const { artboard } = positions.sm;

/** Full-artboard SM exports (MS-109) are drawn at 0,0 at the artboard's size. */
const ARTBOARD_BOX = { x: 0, y: 0, w: artboard.w, h: artboard.h };

/**
 * Fog vectors 265 (top left) and 266 (bottom right), downloaded from Figma
 * into public/testimonials/sm/ because Decor's Fog shapes don't match the SM
 * frame. Boxes are the unrotated vectors; `transform` is Figma's rotation (and
 * flip) about the box center.
 */
const FOGS = [
  {
    src: "/testimonials/sm/fog-top-left.svg",
    box: { x: -158.161, y: -48.508, w: 595.656, h: 330.516 },
    transform: "rotate(-5.24deg) scaleY(-1)",
  },
  {
    src: "/testimonials/sm/fog-bottom-right.svg",
    box: { x: 170.725, y: 233.67, w: 661.833, h: 920.373 },
    transform: "rotate(24.44deg)",
  },
] as const;

/** Sparkle centers and sizes (artboard px) from groups 5687:1622, 1467, 1474. */
const SPARKLES = {
  topRight: [
    { x: 355.5, y: 109.7, size: 25 },
    { x: 371, y: 86.3, size: 15 },
    { x: 324.5, y: 114.5, size: 15 },
    { x: 347.5, y: 138.3, size: 15 },
  ],
  left: [
    { x: 36.8, y: 208.5, size: 28 },
    { x: 54.3, y: 181.5, size: 21 },
  ],
};

/** Card (Frame 5687:1242): 362.59px column, centered; its top sits at y 102. */
const CARD = { top: 102, w: 362.59, gap: 32, quoteGap: 13, arrowGap: 9 };
const MEDALLION_W = 285;

/** Wraps a quote in curly quotes, dropping any quote marks it already has. */
function curlyQuote(text: string) {
  const bare = text.trim().replace(/^["“”]+|["“”]+$/g, "");
  return `“${bare}”`;
}

/** Static decorative SVG. */
function Art({ src, style }: { src: string; style: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static decorative SVG
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className="pointer-events-none max-w-none select-none"
      style={style}
    />
  );
}

function Sparkles({
  items,
}: {
  items: { x: number; y: number; size: number }[];
}) {
  return (
    <>
      {items.map((s, i) => (
        <div
          key={i}
          aria-hidden
          style={smBox({
            x: s.x - s.size / 2,
            y: s.y - s.size / 2,
            w: s.size,
            h: s.size,
          })}
        >
          <Sparkle
            animate={false}
            size={s.size}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ))}
    </>
  );
}

function Fog({ fog }: { fog: (typeof FOGS)[number] }) {
  return (
    <Art
      src={fog.src}
      style={{ ...smBox(fog.box), transform: fog.transform }}
    />
  );
}

/**
 * An artboard-sized box pinned to the section's bottom edge. When a long quote
 * (or a 320px screen) makes the section taller than the scaled artboard, the
 * corridor floor, footprints and bottom fog stay on the bottom edge and the
 * extra height opens up as plain purple near the top. At 402px it's the
 * artboard exactly.
 */
function FromBottom({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute bottom-0 left-0"
      style={{ width: sm(artboard.w), height: sm(artboard.h) }}
    >
      {children}
    </div>
  );
}

/**
 * SM Hacker Testimonials (Figma `5687:1172`), fully static: no animation, and
 * the carousel swaps instantly. The arrows, ←/→ on the focused carousel and
 * horizontal swipes on the card change the testimonial. Vertical swipes still
 * scroll the page (`useSwipe` sets `touch-action: pan-y`).
 *
 * The art (corridor, fog, sparkles, footprints) is the 402×874 frame scaled
 * to the viewport width (`sm()`); the floor layers sit on the bottom edge
 * (`FromBottom`). The title and card are normal flow at their
 * fixed SM sizes, so a long quote grows the section instead of overflowing.
 *
 * Layer order, bottom to top (as in Figma): purple, corridor, top-right
 * sparkles, top-left fog, title, card, left sparkles, footprints, bottom-right
 * fog.
 */
export function MobileTestimonials({
  items = defaultTestimonials,
}: {
  /** Defaults to `lib/content/testimonials.ts`. */
  items?: Testimonial[];
}) {
  const swipeRef = useRef<HTMLDivElement>(null);
  const { index, item, next, prev, canPrev, canNext, direction } =
    useCarousel(items);
  useSwipe(swipeRef, { onLeft: next, onRight: prev });
  if (!item) return null;

  // A focused arrow that becomes disabled drops focus to <body>; keep it on
  // the carousel so ←/→ still work (same as the LG/MD scene).
  const focusRegion = () =>
    swipeRef.current?.querySelector<HTMLElement>('[role="region"]')?.focus();
  const onPrev = () => {
    prev();
    if (index - 1 <= 0) focusRegion();
  };
  const onNext = () => {
    next();
    if (index + 1 >= items.length - 1) focusRegion();
  };

  const [fogTopLeft, fogBottomRight] = FOGS;

  return (
    // No `id="testimonials"`: the LG/MD SceneFrame owns that anchor and both are in the DOM.
    <section
      aria-labelledby="testimonials-title-sm"
      className="relative w-full overflow-hidden bg-museum-purple-dark"
      style={{ ...smUnitVar, minHeight: sm(artboard.h) }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <FromBottom>
          <Art
            src="/testimonials/sm/corridor.svg"
            style={smBox(ARTBOARD_BOX)}
          />
        </FromBottom>
        <Sparkles items={SPARKLES.topRight} />
        <Fog fog={fogTopLeft} />
      </div>

      <div className="relative px-5" style={{ paddingTop: sm(20) }}>
        <div id="testimonials-title-sm">
          <Typography variant="sectionTitle" as="h2">
            {testimonialsSection.title}
          </Typography>
        </div>

        <div
          ref={swipeRef}
          className="mx-auto w-full pb-[102px]"
          style={{
            maxWidth: CARD.w,
            // Card top at y 102 (scaled with the art), under the 32px title.
            marginTop: `calc(${sm(CARD.top - 20)} - 32px)`,
          }}
        >
          <CarouselRegion
            label="Hacker testimonials"
            onPrev={prev}
            onNext={next}
            className="flex flex-col items-start"
          >
            <div
              className="max-w-full self-center"
              style={{ width: MEDALLION_W }}
            >
              <PictureFrame variant="goldMedallion" width="100%">
                <CarouselSwap
                  swapKey={index}
                  direction={direction}
                  animated={false}
                  className="h-full w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- photo fills a clipped opening */}
                  <img
                    src={item.photo.src}
                    alt={item.photo.alt}
                    draggable={false}
                    className="h-full w-full select-none object-cover"
                  />
                </CarouselSwap>
              </PictureFrame>
            </div>

            <CarouselSwap
              swapKey={index}
              direction={direction}
              animated={false}
              className="w-full"
            >
              <div
                className="flex flex-col items-start break-words text-white [text-shadow:0_0_20px_rgba(0,0,0,0.25)]"
                style={{ marginTop: CARD.gap, gap: CARD.quoteGap }}
              >
                <blockquote className="font-merriweather text-[18px] font-light leading-[1.4]">
                  {curlyQuote(item.quote)}
                </blockquote>
                <div className="leading-[normal]">
                  <p className="font-gothic text-[24px]">{item.name}</p>
                  <p className="font-merriweather text-[16px] font-light text-white/[0.78]">
                    {item.school} &rsquo;{String(item.classYear).slice(-2)}
                  </p>
                </div>
              </div>
            </CarouselSwap>

            <div
              className="flex items-center"
              style={{ marginTop: CARD.gap, gap: CARD.arrowGap }}
            >
              <CarouselArrow
                direction="left"
                disabled={!canPrev}
                onClick={onPrev}
                aria-label="Previous testimonial"
              />
              <CarouselArrow
                direction="right"
                disabled={!canNext}
                onClick={onNext}
                aria-label="Next testimonial"
              />
            </div>
          </CarouselRegion>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Sparkles items={SPARKLES.left} />
        <FromBottom>
          <Art
            src="/testimonials/sm/footprints.svg"
            style={smBox(ARTBOARD_BOX)}
          />
          <Fog fog={fogBottomRight} />
        </FromBottom>
      </div>
    </section>
  );
}
