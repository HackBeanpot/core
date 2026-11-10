"use client";

import React, { useRef } from "react";
import { positions } from "../../../../public/speakers/positions";
import {
  CarouselArrow,
  CarouselRegion,
  CarouselSwap,
  useCarousel,
  useSwipe,
} from "../../lib/Components/museum";
import { Typography } from "../../lib/Components/museum/Typography";
import { speakers, speakersSection } from "../../lib/content/speakers";
import { sm, smBox, smUnitVar } from "./smUnits";

const { artboard, "gazebo-opening": opening } = positions.sm;

/** Full-artboard SM exports (MS-109) are drawn at 0,0 at the artboard's size. */
const ARTBOARD_BOX = { x: 0, y: 0, w: artboard.w, h: artboard.h };

/**
 * The arch opening, copied from public/speakers/sm/gazebo-opening.svg (MS-109)
 * in artboard px. A CSS clip-path can't point into an external SVG file, so it
 * lives here, like the LG/MD paths in SpeakersScene.
 */
const OPENING_PATH =
  "M309.148 250.472c0-21.433-17.374-38.807-38.806-38.807H133.784c-21.433 0-38.807 17.374-38.807 38.807-47.357 17.904-78.264 47.365-78.264 80.683v337.678h370.716V331.155c0-33.31-30.908-62.77-78.265-80.683z";
const CLIP_ID = "speakers-sm-arch-clip";

/**
 * Figma "image 29" (5615:26337): a 378px square under the arch mask, as an
 * offset from the opening's corner. Its bottom edge (y 590) stops above the
 * scalloped trim in scene.svg, so the photo doesn't fill the whole opening.
 */
const PHOTO = { x: 12.99 - opening.x, y: 212.03 - opening.y, w: 378, h: 378 };

/** Gold name plate (5615:26365): full width, top edge at y 497. */
const PLATE_TOP = 497;

/** The bio (5615:26383) starts at y 654, below the art. */
const BIO_TOP = 654;

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

/**
 * SM Speakers (Figma `5615:26316`), fully static: no animation, and the
 * carousel swaps instantly. The arrows, ←/→ on the focused carousel and
 * horizontal swipes change the speaker. Vertical swipes still scroll the page
 * (`useSwipe` sets `touch-action: pan-y`).
 *
 * The art (scene, arch photo, name plate, curtain, title) is the 402px frame
 * scaled to the viewport width (`sm()`), so it stays aligned from 320 to
 * 639px. The bio below it is normal flow at its fixed SM size, so a long bio
 * grows the section instead of overflowing.
 */
export function MobileSpeakers() {
  const swipeRef = useRef<HTMLDivElement>(null);
  const { index, item, next, prev, canPrev, canNext, direction } =
    useCarousel(speakers);
  useSwipe(swipeRef, { onLeft: next, onRight: prev });
  if (!item) return null;

  // A focused arrow that becomes disabled drops focus to <body>; keep it on
  // the carousel so ←/→ still work (same as the LG/MD scenes).
  const focusRegion = () =>
    swipeRef.current?.querySelector<HTMLElement>('[role="region"]')?.focus();
  const onPrev = () => {
    prev();
    if (index - 1 <= 0) focusRegion();
  };
  const onNext = () => {
    next();
    if (index + 1 >= speakers.length - 1) focusRegion();
  };

  return (
    // `data-sm-scene`, not `id="speakers"`: the LG/MD SceneFrame owns that id and both
    // are in the DOM. Header links and `/#speakers` find this via `fallbackScrollToScene`.
    <section
      data-sm-scene="speakers"
      aria-labelledby="speakers-title-sm"
      className="scroll-mt-20 relative w-full overflow-hidden bg-[linear-gradient(180deg,theme(colors.museum-terracotta-light)_0%,theme(colors.museum-gold-dark)_78.818%)]"
      // Height comes from the art plus the bio (874 at 402 with Figma's bio).
      style={smUnitVar}
    >
      <div ref={swipeRef}>
        <CarouselRegion label="Speakers" onPrev={prev} onNext={next}>
          {/* Art, in Figma's layer order: scene, photo, name plate, curtain, title */}
          <div className="relative" style={{ height: sm(BIO_TOP) }}>
            <Art src="/speakers/sm/scene.svg" style={smBox(ARTBOARD_BOX)} />

            <svg width="0" height="0" aria-hidden className="absolute">
              <defs>
                <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
                  <path
                    d={OPENING_PATH}
                    transform={`scale(${1 / opening.w} ${1 / opening.h}) translate(${-opening.x} ${-opening.y})`}
                  />
                </clipPath>
              </defs>
            </svg>
            <div style={{ ...smBox(opening), clipPath: `url(#${CLIP_ID})` }}>
              <CarouselSwap
                swapKey={index}
                direction={direction}
                animated={false}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- photo inside a clipped box */}
                <img
                  src={item.photo.src}
                  alt={item.photo.alt}
                  draggable={false}
                  className="max-w-none select-none object-cover"
                  style={smBox(PHOTO)}
                />
              </CarouselSwap>
            </div>

            {/* Name plate with the arrows (5615:26365) */}
            <div
              className="absolute inset-x-0 flex items-center justify-center bg-[linear-gradient(-73.57deg,theme(colors.museum-gold)_18.913%,theme(colors.museum-gold-light)_91.976%)]"
              style={{
                top: sm(PLATE_TOP),
                gap: sm(4),
                padding: `${sm(12)} ${sm(10)}`,
              }}
            >
              <CarouselArrow
                direction="left"
                disabled={!canPrev}
                onClick={onPrev}
                aria-label="Previous speaker"
              />
              {/* Shrinks below 267 artboard px when the fixed 48px arrows need the room (320px) */}
              <CarouselSwap
                swapKey={index}
                direction={direction}
                animated={false}
                className="w-[calc(267*var(--smu))] min-w-0"
              >
                <div
                  className="flex flex-col items-center text-center leading-[normal] [word-break:break-word]"
                  style={{ gap: sm(4) }}
                >
                  <h3
                    className="bg-[linear-gradient(109.33deg,#8F5801_0.218%,#6B4100_93.418%)] bg-clip-text font-gothic text-transparent"
                    style={{ fontSize: sm(32) }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="max-w-full font-merriweather font-normal text-[#8F5801]"
                    style={{ fontSize: sm(18), width: sm(228) }}
                  >
                    {item.role}
                  </p>
                </div>
              </CarouselSwap>
              <CarouselArrow
                direction="right"
                disabled={!canNext}
                onClick={onNext}
                aria-label="Next speaker"
              />
            </div>

            <Art src="/speakers/sm/curtain.svg" style={smBox(ARTBOARD_BOX)} />

            <div
              id="speakers-title-sm"
              className="absolute inset-x-0"
              style={{ top: sm(20) }}
            >
              <Typography variant="sectionTitle" as="h2">
                {speakersSection.title}
              </Typography>
            </div>
          </div>

          {/* Bio (5615:26383): normal flow, 20px side margins */}
          <CarouselSwap
            swapKey={index}
            direction={direction}
            animated={false}
            className="relative px-5 pb-[44px]"
          >
            <Typography variant="body" as="p">
              {item.bio}
            </Typography>
          </CarouselSwap>
        </CarouselRegion>
      </div>
    </section>
  );
}
