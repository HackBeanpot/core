"use client";

import React, { useEffect, useRef, useState } from "react";
import { u } from "../../../lib/scroll/units";
import { SceneFrame } from "../SceneFrame";
import { speakers, speakersSection } from "../../../lib/content/speakers";
import { positions } from "../../../../../public/speakers/positions";
import {
  CarouselArrow,
  CarouselSwap,
  useCarousel,
} from "../../../lib/Components/museum";

type Box = { x: number; y: number; w: number; h: number };
type Breakpoint = "lg" | "md";

/**
 * The strip between the artboard's bottom edge and the screen's bottom edge.
 * SceneFrame is 100svh tall and centers the artboard, so when the window is
 * taller than the artboard's shape this is half the leftover height, else 0.
 */
const BOTTOM_STRIP = "max(0px, calc((100svh - var(--ab-h) * var(--u)) / 2))";

/**
 * Places a px box from positions.ts on the artboard, scaled with u().
 * `toBottom` pushes it down by BOTTOM_STRIP so a box sitting on the artboard's
 * bottom edge stays on the screen's bottom edge.
 */
function place(box: Box, toBottom = false): React.CSSProperties {
  return {
    position: "absolute",
    left: u(box.x),
    top: toBottom ? `calc(${u(box.y)} + ${BOTTOM_STRIP})` : u(box.y),
    width: u(box.w),
    height: u(box.h),
  };
}

/** A decorative SVG from public/speakers/<bp>/, placed by its positions.ts box. */
function Decor({
  src,
  box,
  toBottom = false,
}: {
  src: string;
  box: Box;
  toBottom?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static decorative SVG
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      // max-w-none: Tailwind's base `img { max-width: 100% }` would shrink
      // anything wider than the artboard (the curtain) and shift it.
      className="pointer-events-none max-w-none select-none"
      style={place(box, toBottom)}
    />
  );
}

/**
 * Reads the artboard width (--ab-w) to pick LG (1512) or MD (1000).
 * globals.css switches --ab-w with a media query, and the harness overrides it
 * for `&w=1000`, so reading the variable covers both.
 */
function useArtboardBreakpoint(ref: React.RefObject<HTMLElement>): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("lg");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const w = parseFloat(getComputedStyle(el).getPropertyValue("--ab-w"));
      setBp(w > 0 && w <= 1000 ? "md" : "lg");
    };
    read();
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return bp;
}

// Arch opening paths, copied from public/speakers/<bp>/gazebo-opening.svg (MS-109).
// They're in the gazebo's coordinate space, so ArchClip re-maps them onto the opening box.
const OPENING_PATH: Record<Breakpoint, string> = {
  lg: "M380.008 338.643c0-23.53-19.074-42.603-42.603-42.603H187.488c-23.529 0-42.603 19.074-42.603 42.603-51.99 19.656-85.92 51.998-85.92 88.576v370.712h406.981V427.219c0-36.569-33.931-68.911-85.921-88.576z",
  md: "M288.426 250.79c0-17.424-14.126-31.55-31.551-31.55H145.849c-17.425 0-31.55 14.126-31.55 31.55-38.503 14.558-63.631 38.51-63.631 65.598V590.93h301.401V316.388c0-27.082-25.128-51.034-63.63-65.597z",
};

const ARCH_CLIP_ID = "speakers-arch-clip";

/**
 * Hidden SVG defining the arch clip in 0–1 units, so it scales with the opening box.
 * The transform shifts the path from gazebo coordinates to the opening's corner,
 * then shrinks it to 0–1.
 */
function ArchClip({
  path,
  gazebo,
  opening,
}: {
  path: string;
  gazebo: Box;
  opening: Box;
}) {
  const dx = opening.x - gazebo.x;
  const dy = opening.y - gazebo.y;
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <clipPath id={ARCH_CLIP_ID} clipPathUnits="objectBoundingBox">
          <path
            d={path}
            transform={`scale(${1 / opening.w} ${1 / opening.h}) translate(${-dx} ${-dy})`}
          />
        </clipPath>
      </defs>
    </svg>
  );
}

// Baluster spacing inside balustrade.svg per breakpoint (Figma 5624:1086 LG, 5687:2143 MD),
// used to extend the railing past the artboard's left edge without a visible seam.
const RAIL: Record<
  Breakpoint,
  { pitch: number; first: number; count: number }
> = {
  lg: { pitch: 113.07, first: 19.31, count: 9 },
  md: { pitch: 87.605, first: 14.96, count: 9 },
};
const LEFT_FIRST_BALUSTER = 23.17; // inside lg/balustrade-left.svg

/**
 * A copy of balustrade.svg placed so its last baluster sits one pitch left of
 * `anchorX` (the leftmost existing baluster), continuing the railing to the viewport edge.
 */
function railExtension(main: Box, anchorX: number, bp: Breakpoint): Box {
  const { pitch, first, count } = RAIL[bp];
  const lastBaluster = first + (count - 1) * pitch;
  return { ...main, x: anchorX - pitch - lastBaluster };
}

// Background gradient (Figma 5624:1085 LG, 5687:2142 MD)
const BACKGROUND: Record<Breakpoint, string> = {
  lg: "linear-gradient(180deg, #CA6330 0%, #833711 100%)",
  md: "linear-gradient(180deg, #CA6330 0%, #8F4622 100%)",
};

// Text column "Frame 933" (Figma 5624:1449 LG, 5687:2506 MD)
const TEXT_BOX: Record<
  Breakpoint,
  { left: number; top: number; width: number; gap: number }
> = {
  lg: { left: 724, top: 202, width: 499.5, gap: 32 },
  md: { left: 455, top: 200, width: 390, gap: 16 },
};

// Fonts come from next/font in app/layout.tsx as CSS variables.
// Special Gothic Condensed One isn't loaded yet (see PR note), so it falls back for now.
const FONT = {
  title: "var(--font-amarante), serif",
  name: '"Special Gothic Condensed One", var(--font-merriweather), sans-serif',
  body: "var(--font-merriweather), serif",
};

/**
 * Speakers scene (static, S2), layout A (Figma 5624:1085 LG, 5687:2142 MD).
 * The A/B layout question is still open in motionSpec.ts (SPEAKERS); B is a follow-up.
 *
 * Layer order matches Figma, bottom to top:
 * main railing, curtain, left railing (LG), gazebo + photo, text.
 */
export function SpeakersScene() {
  const artboardRef = useRef<HTMLDivElement>(null);
  const bp = useArtboardBreakpoint(artboardRef);
  const layout = positions[bp];
  const textBox = TEXT_BOX[bp];
  const asset = (name: string) => `/speakers/${bp}/${name}.svg`;

  // Not looping: the design dims the left arrow on the first speaker.
  const { index, item, next, prev, canPrev, canNext, direction } =
    useCarousel(speakers);
  if (!item) return null;

  const opening = layout["gazebo-opening"];
  const openingPath = OPENING_PATH[bp];
  const leftRail =
    "balustrade-left" in layout ? layout["balustrade-left"] : null;
  // LG continues from balustrade-left's first baluster; MD from the main railing's first one.
  const railExt = leftRail
    ? railExtension(layout.balustrade, leftRail.x + LEFT_FIRST_BALUSTER, bp)
    : railExtension(
        layout.balustrade,
        layout.balustrade.x + RAIL[bp].first,
        bp,
      );
  // MD's railing stands alone at the bottom, so it follows the screen's bottom edge.
  // LG's gazebo base sits among the railings, so LG stays on the artboard.
  const railToBottom = bp === "md";

  return (
    <SceneFrame
      sceneId="speakers"
      background={
        <div className="h-full w-full" style={{ background: BACKGROUND[bp] }} />
      }
      content={
        <>
          {/* Fills the artboard; only used to read --ab-w for LG vs MD */}
          <div
            ref={artboardRef}
            className="pointer-events-none absolute inset-0"
            aria-hidden
          />

          {/* 1. Main railing (bottom layer); on MD it also carries the extension */}
          <div data-anim="speakers-balustrade" className="absolute inset-0">
            {!leftRail && (
              <Decor
                src={asset("balustrade")}
                box={railExt}
                toBottom={railToBottom}
              />
            )}
            <Decor
              src={asset("balustrade")}
              box={layout.balustrade}
              toBottom={railToBottom}
            />
          </div>

          {/* 2. Curtain, above the main railing */}
          <div data-anim="speakers-curtain" className="absolute inset-0">
            <Decor src={asset("curtain")} box={layout.curtain} />
          </div>

          {/* 3. Left railing, extended to the viewport edge (LG only) */}
          {leftRail && (
            <div data-anim="speakers-balustrade" className="absolute inset-0">
              <Decor src={asset("balustrade")} box={railExt} />
              <Decor src={asset("balustrade-left")} box={leftRail} />
            </div>
          )}

          {/* 4. Gazebo arch with the photo clipped to its opening, above the railings */}
          <div data-anim="speakers-arch" className="absolute inset-0">
            <Decor src={asset("gazebo")} box={layout.gazebo} />
            <ArchClip
              path={openingPath}
              gazebo={layout.gazebo}
              opening={opening}
            />
            <div
              style={{ ...place(opening), clipPath: `url(#${ARCH_CLIP_ID})` }}
            >
              {/* object-cover fills the arch with portrait or landscape photos */}
              <CarouselSwap
                swapKey={index}
                direction={direction}
                animated
                className="h-full w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- photo fills a clipped box */}
                <img
                  src={item.photo.src}
                  alt={item.photo.alt}
                  className="h-full w-full object-cover"
                />
              </CarouselSwap>
            </div>
          </div>

          {/* 5. Text column (top layer) */}
          <div
            className="absolute z-10 flex flex-col items-start"
            style={{
              left: u(textBox.left),
              top: u(textBox.top),
              width: u(textBox.width),
              gap: u(textBox.gap),
            }}
          >
            <h2
              data-anim="speakers-title"
              className="whitespace-nowrap text-[#FDFBFB]"
              style={{
                fontFamily: FONT.title,
                fontSize: u(50),
                lineHeight: "normal",
              }}
            >
              {speakersSection.title}
            </h2>

            <div
              data-anim="speakers-text"
              className="flex w-full flex-col items-start"
              style={{ gap: u(textBox.gap) }}
            >
              <CarouselSwap
                swapKey={index}
                direction={direction}
                animated
                className="w-full"
              >
                <div
                  aria-live="polite"
                  className="flex flex-col"
                  style={{ gap: u(10) }}
                >
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: FONT.name,
                      fontSize: u(40),
                      lineHeight: "normal",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light text-[#E8B1A5]"
                    style={{
                      fontFamily: FONT.body,
                      fontSize: u(20),
                      lineHeight: "normal",
                    }}
                  >
                    {item.role}
                  </p>
                  <p
                    className="font-light text-white"
                    style={{
                      fontFamily: FONT.body,
                      fontSize: u(18),
                      lineHeight: 1.4,
                    }}
                  >
                    {item.bio}
                  </p>
                </div>
              </CarouselSwap>

              {speakers.length > 1 && (
                <div className="flex items-center" style={{ gap: u(9) }}>
                  <CarouselArrow
                    direction="left"
                    disabled={!canPrev}
                    onClick={prev}
                    aria-label="Previous speaker"
                  />
                  <CarouselArrow
                    direction="right"
                    disabled={!canNext}
                    onClick={next}
                    aria-label="Next speaker"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      }
    />
  );
}
