"use client";

import React, { forwardRef, useMemo } from "react";
import "./decor.css";
import { animAttr, cssVars, decorColors, DecorBaseProps } from "./shared";

export type StarfieldProps = DecorBaseProps & {
  /** 0–1. Stars fade in one by one as this rises, so it can be driven by scroll progress. */
  density?: number;
  /** Same seed → same field, on server and client. */
  seed?: number;
  /** Stars at density 1. */
  count?: number;
  color?: string;
  /** Coordinate space (default: the Figma hero, 1512×982); the field covers its box via `xMidYMid slice`. */
  width?: number;
  height?: number;
};

// Figma hero star: a 4-point star in a 7.32 box (6.04 rotated −104°, baked into the path).
const STAR_PATH =
  "M1.46533 7.32031C1.46533 7.32031 2.28549 5.32387 1.97468 4.08197C1.66386 2.84008 -3.68659e-05 1.46534 -3.68659e-05 1.46534C-3.68659e-05 1.46534 1.99641 2.2855 3.2383 1.97468C4.4802 1.66386 5.85494 -3.38606e-05 5.85494 -3.38606e-05C5.85494 -3.38606e-05 5.03478 1.99641 5.3456 3.23831C5.65641 4.4802 7.32031 5.85494 7.32031 5.85494C7.32031 5.85494 5.32386 5.03478 4.08197 5.3456C2.84008 5.65642 1.46533 7.32031 1.46533 7.32031Z";
const STAR_BOX = 7.32031;

type Star = {
  x: number;
  y: number;
  /** Rendered size in px (Figma's is 7.3; they vary). */
  size: number;
  /** Density at which this star starts to appear. */
  threshold: number;
  twinkle: boolean;
  duration: number;
  delay: number;
};

/** mulberry32: tiny deterministic PRNG. No Math.random, so SSR and hydration match. */
const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Round so the serialized attributes are short and identical everywhere.
const round = (n: number, p = 2) => {
  const k = 10 ** p;
  return Math.round(n * k) / k;
};

export const generateStars = (
  seed: number,
  count: number,
  width: number,
  height: number,
): Star[] => {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    // Mostly small, a few large: ~3px up to ~13px, the Figma 7.3 near the middle.
    const size = round(3 + rand() ** 2 * 10);
    return {
      x: round(rand() * width),
      y: round(rand() * height),
      size,
      threshold: round(rand(), 4),
      twinkle: rand() < 0.35,
      duration: round(2.2 + rand() * 3, 1),
      delay: round(-rand() * 5, 1),
    };
  });
};

const FADE_SPAN = 0.08; // how much density it takes one star to fully fade in

/** Deterministic seeded star field in a single SVG. */
const Starfield = forwardRef<SVGSVGElement, StarfieldProps>(
  (
    {
      density = 1,
      seed = 1,
      count = 160,
      color = decorColors.star,
      width = 1512,
      height = 982,
      animate = true,
      className,
      style,
    },
    ref,
  ) => {
    const stars = useMemo(
      () => generateStars(seed, count, width, height),
      [seed, count, width, height],
    );
    const d = Math.min(1, Math.max(0, density));

    return (
      <svg
        ref={ref}
        data-anim={animAttr(animate)}
        data-decor="starfield"
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        focusable={false}
        className={className}
        style={{ display: "block", pointerEvents: "none", ...style }}
      >
        <g fill={color}>
          {stars.map((s, i) => {
            // Outer opacity = density fade-in; the twinkle animates the path inside
            // (kept separate because the CSS animation would override the fade).
            const fade = Math.min(
              1,
              Math.max(0, (d - s.threshold) / FADE_SPAN),
            );
            if (fade <= 0) return null;
            const k = s.size / STAR_BOX;
            return (
              <g key={i} opacity={round(fade, 3)}>
                <g
                  transform={`translate(${round(s.x - s.size / 2)} ${round(s.y - s.size / 2)}) scale(${round(k, 3)})`}
                >
                  <path
                    d={STAR_PATH}
                    {...(s.twinkle && {
                      className: "decor-part decor-twinkle",
                      style: cssVars({
                        "--decor-duration": `${s.duration}s`,
                        "--decor-delay": `${s.delay}s`,
                      }),
                    })}
                  />
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    );
  },
);

Starfield.displayName = "Starfield";

export default Starfield;
