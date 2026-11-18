"use client";

import React, { useRef } from "react";
import { positions } from "../../../../../public/testimonials/positions";
import { Fog, Sparkle, type FogVariant } from "../../../lib/Components/Decor";
import {
  CarouselArrow,
  CarouselRegion,
  CarouselSwap,
  useCarousel,
} from "../../../lib/Components/museum";
import PictureFrame from "../../../lib/Components/museum/PictureFrame";
import {
  testimonials as defaultTestimonials,
  testimonialsSection,
  type Testimonial,
} from "../../../lib/content";
import {
  useArtboardBreakpoint,
  type ArtboardBreakpoint,
} from "../../../lib/scroll/useArtboardBreakpoint";
import { u } from "../../../lib/scroll/units";
import { SceneFrame } from "../SceneFrame";
import { FOOTPRINT_TRAIL } from "./footprintTrail";

type Box = { x: number; y: number; w: number; h: number };

/** Places a px box from the Figma artboard, scaled with u(). */
function place(box: Box): React.CSSProperties {
  return {
    position: "absolute",
    left: u(box.x),
    top: u(box.y),
    width: u(box.w),
    height: u(box.h),
  };
}

/** A decorative SVG from public/testimonials/<bp>/, placed by its box. */
function Art({ src, box }: { src: string; box: Box }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static decorative SVG
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      // max-w-none: Tailwind's base `img { max-width: 100% }` would shrink the
      // near layer, which is wider than the artboard.
      className="pointer-events-none max-w-none select-none"
      style={place(box)}
    />
  );
}

/** Quotes longer than this drop from Figma's 18px to 16px. */
const LONG_QUOTE = 320;

/**
 * Offset from the artboard's side to the viewport's side (negative when the
 * viewport is wider). Pins fog to the screen edges while it stays in
 * `content`, above the corridor, as in Figma.
 */
// --vw, not vw: the dev harness overrides it when forcing a width.
const VIEWPORT_EDGE =
  "calc((var(--ab-w) * var(--u) - 100 * var(--vw, 1vw)) / 2)";

const FONT = {
  title: "var(--font-amarante), serif",
  body: "var(--font-merriweather), serif",
  // Loaded by packages/util/src/fonts/fonts.css (Tailwind `font-gothic`).
  name: "'SpecialGothicCondensedOne-Regular', var(--font-merriweather), sans-serif",
};

type FogPlacement = {
  variant: FogVariant;
  side: "left" | "right";
  /** Distance in from the viewport side (negative runs past it). */
  inset: number;
  top: number;
  w: number;
  /** Vertical stretch on top of the shape's own aspect (MD only). */
  scaleY?: number;
};

/**
 * Everything not covered by positions.ts (MS-109), in artboard px, from Figma
 * LG 5597:16837 and MD 5687:1662.
 */
const LAYOUT: Record<
  ArtboardBreakpoint,
  {
    /** Frame 928: medallion, quote, name/school, arrows. Grows downward. */
    card: { x: number; y: number };
    /** Group 235, cropped by the artboard bottom (`footprintTrail.ts`). */
    trail: Box;
    /**
     * Vectors 264 / 265 / 263. LG is the Decor exports' frames as-is. MD
     * rescales them in Figma (non-uniformly for the bottom-left and right
     * ones); these are the LG shapes scaled by the MD/LG vector sizes, then
     * nudged against the MD screenshot.
     */
    fogs: FogPlacement[];
    /** Stars: centers and sizes of each 4-point star. */
    sparkles: { x: number; y: number; size: number }[];
  }
> = {
  lg: {
    card: { x: 555, y: 251 },
    trail: { x: 761, y: 849, w: 171, h: 133 },
    fogs: [
      { variant: "cornerTopLeft", side: "left", inset: 0, top: 0, w: 667 },
      {
        variant: "cornerBottomLeft",
        side: "left",
        inset: 0,
        top: 748,
        w: 574,
      },
      { variant: "sideRight", side: "right", inset: 0, top: 240, w: 622 },
    ],
    sparkles: [
      // Group 218
      { x: 279, y: 179, size: 15 },
      { x: 256, y: 203, size: 15 },
      { x: 287, y: 207, size: 25 },
      { x: 302, y: 231, size: 15 },
      // Group 219
      { x: 1311, y: 160, size: 25 },
      { x: 1296, y: 184, size: 15 },
      // Group 223
      { x: 1146, y: 260, size: 52 },
      // Left of the card
      { x: 418, y: 522, size: 19 },
      { x: 389, y: 560, size: 48 },
      { x: 365, y: 593, size: 19 },
      // Group 222
      { x: 260, y: 773, size: 41 },
      // Groups 221, 220
      { x: 1074, y: 772, size: 34 },
      { x: 1046, y: 815, size: 44 },
    ],
  },
  md: {
    card: { x: 299, y: 251 },
    trail: { x: 495, y: 837, w: 171, h: 145 },
    fogs: [
      { variant: "cornerTopLeft", side: "left", inset: -86, top: 27, w: 444 },
      {
        variant: "cornerBottomLeft",
        side: "left",
        inset: -218,
        top: 647,
        w: 648,
        scaleY: 1.31,
      },
      {
        variant: "sideRight",
        side: "right",
        inset: 0,
        top: 130,
        w: 380,
        scaleY: 1.15,
      },
    ],
    sparkles: [
      { x: 185, y: 177, size: 10 },
      { x: 170, y: 200, size: 10 },
      { x: 189, y: 204, size: 16 },
      { x: 200, y: 228, size: 10 },
      { x: 867, y: 156, size: 16 },
      { x: 857, y: 181, size: 10 },
      { x: 758, y: 251, size: 35 },
      { x: 193, y: 533, size: 13 },
      { x: 174, y: 566, size: 32 },
      { x: 241, y: 590, size: 13 },
      { x: 172, y: 766, size: 27 },
      { x: 844, y: 775, size: 23 },
      { x: 826, y: 817, size: 29 },
    ],
  },
};

/** Card column width and the gaps inside it (Frame 928 auto layout). */
const CARD = { w: 401, gap: 32, quoteGap: 13, arrowGap: 9 };
/** goldMedallion art size; Figma's Group 55 is the same box. */
const MEDALLION_W = 285;

/** Wraps a quote in curly quotes, dropping any quote marks it already has. */
function curlyQuote(text: string) {
  const bare = text.trim().replace(/^["“”]+|["“”]+$/g, "");
  return `“${bare}”`;
}

/**
 * Hacker Testimonials scene (static, S2). Figma LG 5597:16837, MD 5687:1662.
 *
 * Layer order, bottom to top (as in Figma): purple background, corridor far /
 * mid / near, footprint trail, top-left fog, sparkles, bottom-left fog, right
 * fog, title, card.
 *
 * The card grows downward from a fixed top and the quote wraps inside a fixed
 * width, so long quotes (400+ characters) push the name and arrows down
 * instead of overflowing sideways. Quotes over LONG_QUOTE characters drop one
 * size step.
 *
 * `data-anim` hooks (used by `testimonials.animation.ts`): testimonials-far /
 * -mid / -near (corridor), -foot-{i} (footprints, farthest first), -sparkle
 * (one per star), -fog-{variant}, -title, -card, -medallion, -quote, -arrows.
 */
export function TestimonialsScene({
  items = defaultTestimonials,
}: {
  /** Defaults to `lib/content/testimonials.ts`. */
  items?: Testimonial[];
}) {
  const artboardRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bp = useArtboardBreakpoint(artboardRef);
  const layout = LAYOUT[bp];
  const box = positions[bp];
  const asset = (name: string) => `/testimonials/${bp}/${name}.svg`;

  // Not looping, matching Speakers: the first/last arrow dims.
  const { index, item, next, prev, canPrev, canNext, direction } =
    useCarousel(items);
  if (!item) return null;

  const quoteSize = item.quote.length > LONG_QUOTE ? 16 : 18;

  // A focused button that becomes disabled drops focus to <body>, which would
  // stop ←/→ working after clicking to the first/last item. Keep focus on the
  // carousel region instead.
  const focusRegion = () =>
    cardRef.current?.querySelector<HTMLElement>('[role="region"]')?.focus();
  const onPrev = () => {
    prev();
    if (index - 1 <= 0) focusRegion();
  };
  const onNext = () => {
    next();
    if (index + 1 >= items.length - 1) focusRegion();
  };

  const fog = (f: FogPlacement) => (
    <div
      key={f.variant}
      data-anim={`testimonials-fog-${f.variant}`}
      className="absolute"
      style={{
        [f.side]: `calc(${VIEWPORT_EDGE} + ${u(f.inset)})`,
        top: u(f.top),
        width: u(f.w),
      }}
    >
      {/* Inner wrapper so MS-306 can animate the outer one's transform */}
      <div
        style={{
          transform: f.scaleY ? `scaleY(${f.scaleY})` : undefined,
          transformOrigin: "top",
        }}
      >
        <Fog variant={f.variant} />
      </div>
    </div>
  );
  const [fogTopLeft, ...fogsAboveSparkles] = layout.fogs;

  return (
    <SceneFrame
      sceneId="testimonials"
      background={<div className="h-full w-full bg-museum-purple-dark" />}
      content={
        <>
          {/* Fills the artboard; only used to read --ab-w for LG vs MD */}
          <div
            ref={artboardRef}
            className="pointer-events-none absolute inset-0"
            aria-hidden
          />

          {/* Corridor depth layers. positions.ts: apply the 0.4 once, on the group. */}
          <div className="absolute inset-0" style={{ opacity: 0.4 }}>
            <div data-anim="testimonials-far" className="absolute inset-0">
              <Art src={asset("corridor-far")} box={box["corridor-far"]} />
            </div>
            <div data-anim="testimonials-mid" className="absolute inset-0">
              <Art src={asset("corridor-mid")} box={box["corridor-mid"]} />
            </div>
            <div data-anim="testimonials-near" className="absolute inset-0">
              <Art src={asset("corridor-near")} box={box["corridor-near"]} />
            </div>
          </div>

          {/* Footprints along the floor, inline so each print can fade in */}
          <svg
            aria-hidden
            focusable={false}
            viewBox={`0 0 ${FOOTPRINT_TRAIL[bp].w} ${FOOTPRINT_TRAIL[bp].h}`}
            fill="#D08000"
            className="pointer-events-none"
            style={{
              ...place(layout.trail),
              opacity: box["footprint-pair"].opacity,
            }}
          >
            {FOOTPRINT_TRAIL[bp].prints.map((paths, i) => (
              <g key={i} data-anim={`testimonials-foot-${i}`}>
                {paths.map((d, j) => (
                  <path key={j} d={d} />
                ))}
              </g>
            ))}
          </svg>

          {fog(fogTopLeft)}

          {/* Wrapped: Sparkle's own data-anim switches its twinkle on/off */}
          {layout.sparkles.map((s, i) => (
            <div
              key={i}
              data-anim="testimonials-sparkle"
              className="absolute"
              style={{
                left: u(s.x - s.size / 2),
                top: u(s.y - s.size / 2),
                width: u(s.size),
                height: u(s.size),
              }}
            >
              <Sparkle
                size={s.size}
                delay={(i % 5) * 0.6}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}

          {fogsAboveSparkles.map(fog)}

          <h2
            data-anim="testimonials-title"
            className="absolute inset-x-0 whitespace-nowrap text-center text-museum-ivory-light"
            style={{
              top: u(142),
              fontFamily: FONT.title,
              fontSize: u(50),
              lineHeight: "normal",
            }}
          >
            {testimonialsSection.title}
          </h2>

          <div
            ref={cardRef}
            data-anim="testimonials-card"
            className="absolute"
            style={{
              left: u(layout.card.x),
              top: u(layout.card.y),
              width: u(CARD.w),
            }}
          >
            <CarouselRegion
              label="Hacker testimonials"
              onPrev={prev}
              onNext={next}
              className="flex flex-col items-start"
            >
              <div
                data-anim="testimonials-medallion"
                className="self-center"
                style={{ width: u(MEDALLION_W) }}
              >
                <PictureFrame variant="goldMedallion" width="100%">
                  <CarouselSwap
                    swapKey={index}
                    direction={direction}
                    animated
                    className="h-full w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- photo fills a clipped opening */}
                    <img
                      src={item.photo.src}
                      alt={item.photo.alt}
                      className="h-full w-full object-cover"
                    />
                  </CarouselSwap>
                </PictureFrame>
              </div>

              <div
                data-anim="testimonials-quote"
                className="w-full"
                style={{ marginTop: u(CARD.gap) }}
              >
                <CarouselSwap
                  swapKey={index}
                  direction={direction}
                  animated
                  className="w-full"
                >
                  <div
                    className="flex flex-col items-start break-words text-white"
                    style={{
                      gap: u(CARD.quoteGap),
                      textShadow: "0 0 20px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <blockquote
                      style={{
                        fontFamily: FONT.body,
                        fontWeight: 300,
                        fontSize: u(quoteSize),
                        lineHeight: 1.4,
                      }}
                    >
                      {curlyQuote(item.quote)}
                    </blockquote>
                    <div style={{ lineHeight: "normal" }}>
                      <p style={{ fontFamily: FONT.name, fontSize: u(24) }}>
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontFamily: FONT.body,
                          fontWeight: 300,
                          fontSize: u(16),
                          color: "rgba(255, 255, 255, 0.78)",
                        }}
                      >
                        {item.school} &rsquo;{String(item.classYear).slice(-2)}
                      </p>
                    </div>
                  </div>
                </CarouselSwap>
              </div>

              {/* Always shown, as in Figma; both dim with a single testimonial */}
              <div
                data-anim="testimonials-arrows"
                className="flex items-center"
                style={{ marginTop: u(CARD.gap), gap: u(CARD.arrowGap) }}
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
        </>
      }
    />
  );
}
