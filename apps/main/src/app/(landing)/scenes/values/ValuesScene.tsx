"use client";

import React, { useRef, useState } from "react";
import { positions } from "../../../../../public/values/positions";
import Spotlight from "../../../lib/Components/Decor/Spotlight";
import { Typography } from "../../../lib/Components/museum/Typography";
import { values, valuesSection } from "../../../lib/content/values";
import { u } from "../../../lib/scroll/units";
import {
  useArtboardBreakpoint,
  type ArtboardBreakpoint,
} from "../../../lib/scroll/useArtboardBreakpoint";
import { SceneFrame } from "../SceneFrame";

/** Figma: teal/light → teal/dark, top to bottom (LG `5690:2639`, MD `5690:2283`). */
const BACKGROUND = "linear-gradient(180deg, #37A9C9 0%, #024354 100%)";

/** Asset slug per value, in `values.ts` order. */
const SLUGS = ["exploration", "growth", "community"] as const;

/**
 * Each value is one Figma auto-layout column: stone, then title + body, then
 * its pillar. The pillar follows the text, so an extra wrapped line pushes it
 * down instead of overlapping. Pillar and stone sizes come from
 * `public/values/positions.ts`.
 */
const LAYOUT: Record<
  ArtboardBreakpoint,
  {
    /** Top-left of each 285-wide column, in artboard px. */
    columns: readonly { x: number; y: number }[];
    /** Stone → text gap per column (MD's first column skips the inner group). */
    stoneGap: readonly number[];
    /** Body text width; MD wraps it narrower than the column. */
    bodyWidth: number;
    /**
     * Figma `Polygon 3`: a cone hanging from `apex`, `length` long and
     * `halfEnd` wide at its far end, at 47% opacity.
     */
    beam: { apexX: number; apexY: number; length: number; halfEnd: number };
  }
> = {
  lg: {
    columns: [
      { x: 141, y: 212 },
      { x: 614, y: 371 },
      { x: 1083, y: 251 },
    ],
    stoneGap: [26, 26, 26],
    bodyWidth: 285,
    beam: { apexX: 288, apexY: -538, length: 1281, halfEnd: 229.5 },
  },
  md: {
    columns: [
      { x: 32, y: 213 },
      { x: 357, y: 343 },
      { x: 683, y: 246 },
    ],
    stoneGap: [31, 26, 26],
    bodyWidth: 253,
    beam: { apexX: 175, apexY: -445, length: 1141.5, halfEnd: 204.4 },
  },
};

const COLUMN_WIDTH = 285;
/** Title sits 142 from the top with `leading-normal` (~65 tall at 50px). */
const TITLE = { top: 142, height: 65 };
/** Column → pillar gap. */
const PILLAR_GAP = 31;
/** How far the hovered column lifts. Not in Figma; the annotation just says "raises". */
const HOVER_LIFT = 16;
/** Which column each vase belongs to, for dimming (Figma: vases 4–6 at 80%). */
const VASE_COLUMN = [0, 0, 0, 1, 1, 2] as const;
const VASES = [1, 2, 3, 4, 5, 6] as const;
const DIMMED = 0.8;
/**
 * The strip between the artboard's bottom edge and the screen's. The vases
 * stand on the screen's bottom edge as in Figma (they run off the frame), so
 * on a window taller than the artboard they move down by this instead of
 * floating above the bottom.
 */
const BOTTOM_STRIP =
  "max(0px, calc((100 * var(--vh, 1svh) - var(--ab-h) * var(--u)) / 2))";

/** `Spotlight` draws a 10-wide lip at the origin, then widens by `spread`. */
const SPOTLIGHT_LIP = 10;
const SPOTLIGHT_PAD = 28;

function asset(bp: ArtboardBreakpoint, name: string) {
  return `/values/${bp}/${name}.svg`;
}

function Img({ src, box }: { src: string; box: { w: number; h: number } }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static decorative SVG
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className="block max-w-none"
      style={{ width: u(box.w), height: u(box.h) }}
    />
  );
}

/**
 * Our Values (MS-205). The Figma annotation: hovering a pillar moves the
 * spotlight onto it and raises it, and everything else drops to 80%.
 * Exploration is lit by default, as in the frame.
 *
 * Hover styles live on inner wrappers so they never fight the `data-anim`
 * transforms that `values.animation.ts` puts on the outer ones.
 */
export function ValuesScene() {
  const artboardRef = useRef<HTMLDivElement>(null);
  const bp = useArtboardBreakpoint(artboardRef);
  const layout = LAYOUT[bp];
  const pos = positions[bp];
  // Hovered column, if any. Exploration is lit when nothing is hovered, as
  // in the Figma frame, but only a hovered column lifts.
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? 0;

  const { beam } = layout;
  const spread =
    (Math.atan((beam.halfEnd - SPOTLIGHT_LIP) / beam.length) * 180) / Math.PI;
  // Spotlight's own box for origin="top" (see Spotlight.tsx): the anchor is
  // its top-center, so center it on the apex.
  const beamBox = {
    w: Math.ceil(beam.halfEnd * 2 + 8),
    h: beam.length + SPOTLIGHT_PAD,
  };
  const columnCenter = (i: number) => layout.columns[i].x + COLUMN_WIDTH / 2;
  const beamShift = columnCenter(active) - columnCenter(0);

  const transition =
    "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none";

  return (
    <SceneFrame
      sceneId="values"
      background={
        <div className="h-full w-full" style={{ background: BACKGROUND }} />
      }
      content={
        <div ref={artboardRef} className="relative h-full w-full">
          {/* Spotlight, behind everything else */}
          <div
            data-anim="values-spotlight"
            className="pointer-events-none absolute"
            style={{
              left: u(beam.apexX - beamBox.w / 2),
              top: u(beam.apexY),
              width: u(beamBox.w),
              height: u(beamBox.h),
            }}
          >
            <div
              className={`h-full w-full ${transition}`}
              style={{ transform: `translateX(${u(beamShift)})` }}
            >
              <Spotlight
                origin="top"
                length={beam.length}
                spread={spread}
                style={{ width: "100%", height: "100%", opacity: 0.47 }}
              />
            </div>
          </div>

          <div
            data-anim="values-title"
            className="absolute inset-x-0 flex items-center justify-center"
            style={{ top: u(TITLE.top), height: u(TITLE.height) }}
          >
            <Typography variant="sectionTitle" as="h2">
              {valuesSection.title}
            </Typography>
          </div>

          <div onPointerLeave={() => setHovered(null)}>
            {values.map((value, i) => {
              const slug = SLUGS[i];
              const col = layout.columns[i];
              const isActive = active === i;
              return (
                <div
                  key={value.title}
                  className="absolute"
                  style={{
                    left: u(col.x),
                    top: u(col.y),
                    width: u(COLUMN_WIDTH),
                  }}
                  onPointerEnter={() => setHovered(i)}
                >
                  <div
                    className={`flex flex-col items-center ${transition}`}
                    style={{
                      opacity: isActive ? 1 : DIMMED,
                      transform: `translateY(${hovered === i ? u(-HOVER_LIFT) : "0px"})`,
                    }}
                  >
                    <div data-anim={`values-stone-${i}`}>
                      <Img
                        src={asset(bp, `stone-${slug}`)}
                        box={pos[`stone-${slug}`]}
                      />
                    </div>

                    <div
                      data-anim={`values-text-${i}`}
                      className="flex flex-col items-center text-center"
                      style={{
                        marginTop: u(layout.stoneGap[i]),
                        width: u(layout.bodyWidth),
                        gap: u(12),
                      }}
                    >
                      <h3
                        className="font-gothic font-normal leading-normal text-white"
                        style={{ fontSize: u(24) }}
                      >
                        {value.title}
                      </h3>
                      <Typography variant="body" as="p">
                        {value.body}
                      </Typography>
                    </div>

                    <div
                      data-anim={`values-pillar-${i}`}
                      style={{ marginTop: u(PILLAR_GAP) }}
                    >
                      <Img
                        src={asset(bp, `pillar-${slug}`)}
                        box={pos[`pillar-${slug}`]}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vases sit in front of the pillars */}
          {VASES.map((n, i) => {
            const box = pos[`vase-${n}`];
            return (
              <div
                key={n}
                data-anim={`values-vase-${i}`}
                className="pointer-events-none absolute"
                style={{
                  left: u(box.x),
                  top: `calc(${u(box.y)} + ${BOTTOM_STRIP})`,
                }}
              >
                <div
                  className={transition}
                  style={{ opacity: active === VASE_COLUMN[i] ? 1 : DIMMED }}
                >
                  <Img src={asset(bp, `vase-${n}`)} box={box} />
                </div>
              </div>
            );
          })}
        </div>
      }
    />
  );
}
