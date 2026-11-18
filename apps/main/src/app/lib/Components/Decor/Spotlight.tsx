"use client";

import React, { forwardRef, useId } from "react";
import "./decor.css";
import { animAttr, decorColors, DecorBaseProps } from "./shared";

export type SpotlightProps = DecorBaseProps & {
  /** Tilt in degrees from straight up (origin="bottom") or straight down (origin="top"). Positive = clockwise. */
  angle?: number;
  /** Beam length in px. */
  length?: number;
  color?: string;
  /** Where the lamp sits inside the box. The beam shines away from it. */
  origin?: "bottom" | "top";
  /** Half-angle of the cone in degrees. */
  spread?: number;
  /** Draw the black lamp on its post (hero bushes). The head swivels to aim the beam. */
  fixture?: boolean;
};

// ---------- Lamp (Figma "Auto (Primary)" export, 81×95) ----------
// The export is the whole lamp tilted 12.4°. Its post is straightened here and only the
// head rotates, around the yoke pivot, to aim along the beam.
const PIVOT = { x: 64.1, y: 52.3 };
const POST_TILT = 12.4;
const LENS = { x: 29.75, y: 22.25 };
/** Direction the lens faces in the export, clockwise from straight up. */
const LENS_AIM = -45.64;
/** Bottom-center of the straightened post (where it meets the ground). */
const POST_BASE = { x: 60.9, y: 93.9 };
const LENS_HALF = 15; // beam half-width where it leaves the lens

type El =
  | { t: "path"; d: string; fill: string }
  | {
      t: "rect";
      x: number;
      y: number;
      w: number;
      h: number;
      r: number;
      fill: string;
    }
  | {
      t: "ellipse";
      cx: number;
      cy: number;
      rx: number;
      ry: number;
      r: number;
      fill: string;
    };

const grille = (x: number, y: number, w: number, h: number): El => ({
  t: "rect",
  x,
  y,
  w,
  h,
  r: 44.3601,
  fill: "#090912",
});
const post = (
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
): El => ({
  t: "rect",
  x,
  y,
  w,
  h,
  r: 12.4001,
  fill,
});

// Kept in the export's paint order; head and post layers interleave.
const LAMP: { part: "head" | "post"; els: El[] }[] = [
  {
    part: "head",
    els: [
      {
        t: "path",
        d: "M41.5744 9.65928C41.5744 9.65928 63.8674 31.5686 69.5367 37.0039C75.2061 42.4392 54.5204 66.9345 45.1948 61.8956C35.8692 56.8568 17.2325 34.551 17.2325 34.551L41.5744 9.65928Z",
        fill: "#28282F",
      },
      grille(21.4777, 36.4575, 36.8533, 0.357063),
      grille(19.4419, 36.0098, 36.8533, 0.357063),
      {
        t: "path",
        d: "M27.3584 44.8911C27.3584 44.8911 41.828 59.0426 42.9869 60.1743C43.3589 60.5376 43.4633 60.8227 43.4633 60.8227L42.7373 60.4296L27.1088 45.1464L27.3584 44.8911Z",
        fill: "#090912",
      },
    ],
  },
  {
    part: "post",
    els: [
      post(59.4024, 49.4902, 10.424, 3.54414, "#131318"),
      post(60.0664, 53.2671, 10.424, 3.54414, "#131318"),
      post(53.1964, 55.3872, 13.5511, 36.2754, "#131318"),
      post(59.305, 56.7305, 7.29677, 36.2754, "#28282F"),
      post(64.396, 57.8496, 2.08479, 36.2754, "#1D1D24"),
    ],
  },
  {
    part: "head",
    els: [
      {
        t: "path",
        d: "M42.3091 10.3828L54.6359 22.4373C48.4566 34.0094 42.8149 39.5965 29.4715 48.2504L23.6019 41.942L17.8798 35.4515L42.3091 10.3828Z",
        fill: "#131318",
      },
      // lens: rim, cream glass, bright center
      {
        t: "ellipse",
        cx: 29.6594,
        cy: 22.411,
        rx: 8.41013,
        ry: 17.5434,
        r: 44.362,
        fill: "#090912",
      },
      {
        t: "ellipse",
        cx: 29.8448,
        cy: 22.2706,
        rx: 7.24583,
        ry: 16.3295,
        r: 44.362,
        fill: "#FDEBCC",
      },
      {
        t: "ellipse",
        cx: 29.7566,
        cy: 22.0277,
        rx: 6.43507,
        ry: 13.6425,
        r: 44.362,
        fill: "#FDFBFB",
      },
      grille(43.9906, 12.5938, 36.8533, 0.357063),
      grille(44.1294, 13.9038, 36.8533, 0.707285),
      grille(25.027, 35.7422, 36.8533, 0.707285),
      grille(23.0148, 36.1558, 36.8533, 0.707285),
      grille(43.8158, 15.3306, 36.8533, 0.99285),
      grille(26.8683, 34.8677, 36.8533, 0.99285),
      grille(43.1082, 17.3101, 36.8533, 0.99285),
      grille(28.923, 34.2563, 36.8533, 0.99285),
      grille(42.3089, 19.0537, 36.8533, 2.5866),
      grille(40.1672, 21.9976, 37.2616, 2.5866),
      grille(37.6429, 25.7129, 37.2616, 2.5866),
      grille(34.4826, 28.4331, 37.2616, 2.5866),
      grille(31.4378, 31.6021, 37.2616, 2.5866),
    ],
  },
  {
    part: "post",
    els: [
      post(61.492, 53.5806, 8.9646, 1.0424, "#28282F"),
      post(64.2893, 50.5645, 5.42046, 1.0424, "#24253B"),
    ],
  },
  {
    part: "head",
    els: [
      {
        t: "path",
        d: "M41.758 9.75171C41.758 9.75171 64.0501 31.6604 69.72 37.0962C75.3894 42.5316 54.7039 67.0268 45.3783 61.9879C42.5938 60.4833 38.9811 57.4373 35.2803 53.9074C37.7551 56.0732 40.0763 57.8541 42.0028 58.895C51.3284 63.9339 72.0139 39.4387 66.3445 34.0033C62.0246 29.8617 48.0549 16.1539 41.6484 9.8636L41.758 9.75171Z",
        fill: "#131318",
      },
    ],
  },
];

const renderEl = (el: El, key: number) => {
  if (el.t === "path") return <path key={key} d={el.d} fill={el.fill} />;
  if (el.t === "rect")
    return (
      <rect
        key={key}
        x={el.x}
        y={el.y}
        width={el.w}
        height={el.h}
        transform={`rotate(${el.r} ${el.x} ${el.y})`}
        fill={el.fill}
      />
    );
  return (
    <ellipse
      key={key}
      cx={el.cx}
      cy={el.cy}
      rx={el.rx}
      ry={el.ry}
      transform={`rotate(${el.r} ${el.cx} ${el.cy})`}
      fill={el.fill}
    />
  );
};

/** Rotate point p around c by deg (clockwise, SVG convention). */
const rotate = (
  p: { x: number; y: number },
  c: { x: number; y: number },
  deg: number,
) => {
  const a = (deg * Math.PI) / 180;
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return {
    x: c.x + dx * Math.cos(a) - dy * Math.sin(a),
    y: c.y + dx * Math.sin(a) + dy * Math.cos(a),
  };
};

const PAD = 28; // room around the beam origin when there's no lamp

/**
 * Crisp translucent light cone, cream at the lamp fading to a pale wash, optionally
 * from the Figma lamp.
 * The anchor is the bottom-center of the box (top-center for origin="top"): the beam
 * origin, or the foot of the lamp's post when `fixture` is on. Position the component
 * so that point lands where the light should come from. The beam may extend past the
 * box (overflow is visible).
 */
const Spotlight = forwardRef<SVGSVGElement, SpotlightProps>(
  (
    {
      angle = 0,
      length = 568, // Figma beam: 568 long, 324 wide at the far end
      color = decorColors.beam,
      origin = "bottom",
      spread = 14.5, // ≈ the Figma cone: 15 → 162 half-width over 568
      fixture = false,
      animate = true,
      className,
      style,
    },
    ref,
  ) => {
    const id = useId().replace(/:/g, "");
    const r = (n: number) => Math.round(n * 100) / 100;

    // Beam direction, clockwise from straight up.
    const aim = origin === "bottom" ? angle : 180 + angle;

    // Lamp: post straightened (or flipped to hang for origin="top"), head aimed.
    const postRot = origin === "bottom" ? -POST_TILT : 180 - POST_TILT;
    const headRot = aim - LENS_AIM;
    const base = rotate(POST_BASE, PIVOT, postRot + POST_TILT);
    const lens = rotate(LENS, PIVOT, headRot);

    // World coordinates: anchor at (0, 0).
    const o = fixture
      ? { x: lens.x - base.x, y: lens.y - base.y }
      : { x: 0, y: 0 };
    const halfStart = fixture ? LENS_HALF : 10;
    const halfEnd = halfStart + length * Math.tan((spread * Math.PI) / 180);
    const ey = o.y - length; // beam is drawn pointing up, then rotated by `aim`

    const w = Math.ceil(halfEnd * 2 + 8);
    const h = length + PAD + (fixture ? Math.ceil(Math.abs(o.y)) : 0);
    const viewBox =
      origin === "bottom"
        ? `${-w / 2} ${-h} ${w} ${h}`
        : `${-w / 2} 0 ${w} ${h}`;

    const beam = `M${r(o.x - halfStart)} ${r(o.y)}L${r(o.x - halfEnd)} ${r(ey)}L${r(o.x + halfEnd)} ${r(ey)}L${r(o.x + halfStart)} ${r(o.y)}Z`;

    return (
      <svg
        ref={ref}
        data-anim={animAttr(animate)}
        data-decor="spotlight"
        width={w}
        height={h}
        viewBox={viewBox}
        aria-hidden
        focusable={false}
        className={className}
        style={{
          display: "block",
          pointerEvents: "none",
          overflow: "visible",
          ...style,
        }}
      >
        <defs>
          <linearGradient
            id={`beam-${id}`}
            gradientUnits="userSpaceOnUse"
            x1={r(o.x)}
            y1={r(o.y)}
            x2={r(o.x)}
            y2={r(ey)}
          >
            {/* Figma beam: Yellow/Light solid at the lamp → #FDEBCC at 0%. */}
            <stop offset="0" stopColor={color} stopOpacity="1" />
            <stop offset="1" stopColor={decorColors.beamEnd} stopOpacity="0" />
          </linearGradient>
        </defs>

        <g transform={`rotate(${r(aim)} ${r(o.x)} ${r(o.y)})`}>
          {/* Crisp-edged cone, as in the Figma hero. */}
          <path className="decor-breathe" d={beam} fill={`url(#beam-${id})`} />
        </g>

        {fixture && (
          <g transform={`translate(${r(-base.x)} ${r(-base.y)})`}>
            {LAMP.map((layer, i) => (
              <g
                key={i}
                transform={
                  layer.part === "post"
                    ? `rotate(${postRot} ${PIVOT.x} ${PIVOT.y})`
                    : `rotate(${r(headRot)} ${PIVOT.x} ${PIVOT.y})`
                }
              >
                {layer.els.map(renderEl)}
              </g>
            ))}
          </g>
        )}
      </svg>
    );
  },
);

Spotlight.displayName = "Spotlight";

export default Spotlight;
