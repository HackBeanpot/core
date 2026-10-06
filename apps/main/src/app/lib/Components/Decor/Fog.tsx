"use client";

import React, { forwardRef, useId } from "react";
import "./decor.css";
import { animAttr, cssVars, decorColors, DecorBaseProps } from "./shared";

export type FogVariant =
  | "cornerTopLeft"
  | "cornerTopRight"
  | "cornerBottomLeft"
  | "cornerBottomRight"
  | "sideLeft"
  | "sideRight"
  | "ribbon";

export type FogProps = DecorBaseProps & {
  variant: FogVariant;
};

type Stop = [color: string, opacity: number];
type Layer = {
  paths: string[];
  /** userSpaceOnUse gradient, exactly as exported. */
  gradient: { x1: number; y1: number; x2: number; y2: number; stops: Stop[] };
  opacity?: number;
  /** Extra transform for this layer only (inside the drift). */
  transform?: string;
  drift: [x: string, y: string];
  duration: string;
};
type Shape = {
  /** Figma frame size; paths run past it and are clipped to it. */
  w: number;
  h: number;
  layers: Layer[];
  /** Applied inside the frame, for rotated / mirrored reuse of a shape. */
  transform?: string;
  /** Which edge/corner stays pinned when the box is a different aspect. */
  align: string;
};

const CREAM: Stop[] = [
  [decorColors.fogCream, 0.9],
  ["#FFFFFF", 0],
];

// Figma layer exports (frames 5597:15707 About, 5597:16837 Testimonials, 5597:20877 FAQ).

/** Testimonials: bright in the top-left, pouring down. */
const TOP_LEFT: Shape = {
  w: 667,
  h: 668,
  align: "xMinYMin",
  layers: [
    {
      paths: [
        "M513.321 468.084C607.628 451.011 654.768 617.559 666.389 667.427C660.644 655.777 617.285 569.771 521.636 614.588C471.203 638.22 359.016 572.799 316.993 562.085C274.97 551.37 119.567 619.358 56.9307 595.259C-29.9787 561.822 -146.988 462.289 -143.027 496.563L-208.921 -40.7681C-215.968 -24.6541 -258.191 -100.323 -67.367 -72.2085C171.163 -37.065 192.095 147.079 240.135 279.703C270.316 363.024 395.437 489.425 513.321 468.084Z",
      ],
      gradient: {
        x1: 49.6432,
        y1: -134.426,
        x2: 840.375,
        y2: 201.953,
        stops: CREAM,
      },
      drift: ["-1.5%", "-1.5%"],
      duration: "18s",
    },
  ],
};

/** Testimonials: rises from the bottom-left toward the top-right. */
const BOTTOM_LEFT: Shape = {
  w: 574,
  h: 234,
  align: "xMinYMax",
  layers: [
    {
      paths: [
        "M392.36 21.3527C524.705 -15.6426 569.709 5.60128 574 10.6164C566.372 17.4497 522.893 20.0564 493.907 36.8378C457.674 57.8146 427.098 111.645 404.279 177.954C363.756 295.71 259.984 284.833 210.244 343.155L-82 289.283C-57.2093 250.825 21.2797 189.863 126.337 168.19C317.035 128.849 226.93 67.5969 392.36 21.3527Z",
      ],
      gradient: {
        x1: 49.1047,
        y1: 389.151,
        x2: 681.537,
        y2: 102.149,
        stops: CREAM,
      },
      drift: ["2%", "1%"],
      duration: "16s",
    },
  ],
};

/** Testimonials: bright along the right edge. */
const SIDE_RIGHT: Shape = {
  w: 622,
  h: 742,
  align: "xMaxYMid",
  layers: [
    {
      paths: [
        "M1.84737e-05 499.616C0.873847 470.296 25.3224 414.646 116.126 426.606C229.631 441.556 248.873 389.795 260.309 341.016C278.513 263.373 288.193 155.41 502.316 139.251C668.486 126.711 745.052 16.5749 740.604 1.15148L739.961 -5.08572e-06C740.252 0.289898 740.467 0.675598 740.604 1.15148L1178.19 785C1179.32 786.225 1179.97 787.373 1180.11 788.437L1178.19 785C1157.48 762.462 976.451 713.974 866.283 689.276C787.023 671.508 643.32 661.912 473.31 643.217C303.3 624.523 259.334 548.049 137.391 512.517C39.836 484.091 3.01336 492.826 1.84737e-05 499.616Z",
      ],
      gradient: {
        x1: 428.989,
        y1: 33.4844,
        x2: -0.495313,
        y2: 457.229,
        stops: CREAM,
      },
      drift: ["2%", "-1%"],
      duration: "17s",
    },
  ],
};

/**
 * About: the same wave in lavender and in cream. The lavender export is the cream one
 * ×1.266 from a shared origin, so the cream layer is scaled up to sit exactly on it;
 * its fade then reads cream → lavender → transparent across the wave.
 */
const BOTTOM_RIGHT: Shape = {
  w: 1039,
  h: 200,
  align: "xMaxYMax",
  layers: [
    {
      paths: [
        "M202.167 62.1611C111.427 -23.6673 23.7456 74.2249 -2.16729e-05 105.441C8.59607 100.465 73.004 64.4516 158.387 173.617C203.407 231.177 332.075 264.337 376.938 287.848C421.801 311.359 561.691 484.84 630.526 513.347C726.035 552.901 867.801 562.317 855.531 586.85L1051.71 205.129C1054.91 223.475 1115.67 194.905 916.918 71.626C668.474 -82.4729 602.903 49.6051 522.516 119.528C472.014 163.457 315.593 169.447 202.167 62.1611Z",
      ],
      gradient: {
        x1: 1044.95,
        y1: -265.948,
        x2: -17.346,
        y2: -73.8007,
        stops: [
          [decorColors.lavender, 1],
          ["#FFFFFF", 0],
        ],
      },
      drift: ["1.5%", "1%"],
      duration: "20s",
    },
    {
      paths: [
        "M159.69 49.1001C88.0153 -18.6949 18.7564 58.6292 1.29922e-06 83.2866C6.78998 79.3563 57.6652 50.9093 125.108 137.138C160.669 182.604 262.303 208.797 297.74 227.368C333.176 245.939 443.675 382.97 498.047 405.488C573.488 436.731 685.468 444.168 675.776 463.547L830.738 162.029C833.26 176.52 881.259 153.953 724.265 56.5763C528.022 -65.1449 476.227 39.1823 412.731 94.4137C372.839 129.113 249.284 133.844 159.69 49.1001Z",
      ],
      gradient: {
        x1: 643.171,
        y1: -53.6046,
        x2: 11.306,
        y2: 50.5636,
        stops: CREAM,
      },
      transform: "scale(1.266)",
      drift: ["-1%", "1%"],
      duration: "14s",
    },
  ],
};

/** FAQ ribbon: wavy band with a curl, at 60% opacity. */
const RIBBON: Shape = {
  w: 915,
  h: 356,
  align: "xMidYMid",
  layers: [
    {
      opacity: 0.6,
      paths: [
        "M851.559 121.035C863.768 113.281 874.732 106.045 884.832 100.939C911.884 87.2644 959.481 82.0588 973.335 55.0981C989.213 24.2 960.891 -10.3459 928.782 2.91402C875.045 25.1059 837.542 52.0347 795.47 92.646C778.984 108.56 773.933 133.385 758.141 149.988C749.358 159.222 736.27 160.124 717.212 159.221C674.783 153.723 647.124 152.654 608.173 160.924C588.872 165.021 570.573 172.732 553.097 181.89L472.052 224.358C429.405 244.212 405.219 246.711 360.747 212.848L312.44 185.342C299.576 177.833 288.829 173.048 278.831 171.187C239.528 163.871 215.612 232.857 178.118 218.984C174.868 217.781 171.36 216.182 167.546 214.18L152.684 208.501C133.589 201.204 115.974 190.627 98.0755 180.751C68.3324 164.34 46.6338 164.432 22.8377 180.624C3.06101 194.08 -3.01971 219.78 1.33417 243.302L5.38516 265.186C9.01219 284.781 25.0969 299.655 44.9148 301.741C53.6787 302.663 62.5205 300.991 70.3427 296.933L96.2726 283.48C117.348 272.546 133.447 253.171 154.701 242.589C167.063 236.434 181.438 234.539 199.181 233.877C217.306 233.2 235.352 230.736 253.469 229.854C275.681 228.773 293.688 233.398 313.291 244.104C339.385 258.356 364.504 275.209 393.412 282.162C465.753 299.562 507.905 282.948 569.202 238.372C613.274 198.653 646.952 185.616 697.825 185.723C726.984 185.784 756.962 187.201 784.177 176.732C802.541 169.669 816.6 159.711 829.987 141.808C836.01 133.754 843.069 126.426 851.559 121.035Z",
        "M783.29 220.155C790.095 210.889 797.918 202.528 807.218 193.062C817.141 182.961 828.276 174.042 840.641 167.143C879.116 145.675 906.257 137.766 951.034 134.113C950.958 132.924 952.553 132.467 953.118 133.515L993.719 208.87C1002.57 225.3 986.53 242.189 969.486 234.587C941.475 222.094 915.089 215.071 872.979 226.002C863.985 228.337 856.058 233.548 849.715 240.339L843.484 247.012C833.17 258.055 825.798 271.514 822.044 286.15L819.821 294.818C815.218 312.767 807.832 330.947 792.676 341.607C780.99 349.825 769.276 352.421 752.464 354.209C725.129 357.23 708.98 353.03 692.641 336.232C680.923 324.184 670.606 308.988 671.092 292.189C671.252 286.67 672.362 280.878 674.094 273.76C677.721 264.594 681.81 259.151 689.046 256.184C701.996 250.872 718.418 246.186 730.387 253.444C730.728 253.651 731.051 253.877 731.356 254.121C740.096 261.129 733.971 283.72 724.828 277.247C721.563 274.935 717.847 275.918 714.47 278.06C706.273 283.258 700.745 293.931 707.099 301.269C709.945 304.554 715.23 307.047 719.438 308.135C724.935 309.557 729.696 310.065 734.347 309.791C750.101 308.865 765.24 295.752 769.808 280.646C776.064 259.957 770.496 237.577 783.29 220.155Z",
      ],
      gradient: {
        x1: 629.76,
        y1: -88.224,
        x2: 482.327,
        y2: 408.231,
        stops: [
          [decorColors.fogRibbon, 1],
          ["#FFFFFF", 0],
        ],
      },
      drift: ["2%", "0%"],
      duration: "18s",
    },
  ],
};

const SHAPES: Record<FogVariant, Shape> = {
  cornerTopLeft: TOP_LEFT,
  // The Figma top-right piece (688×360, rotate 180°) is the bottom-left wave turned over.
  cornerTopRight: {
    ...BOTTOM_LEFT,
    align: "xMaxYMin",
    transform: `rotate(180 ${BOTTOM_LEFT.w / 2} ${BOTTOM_LEFT.h / 2})`,
  },
  cornerBottomLeft: BOTTOM_LEFT,
  cornerBottomRight: BOTTOM_RIGHT,
  // No separate Figma piece for the left side yet; mirror the right one.
  sideLeft: {
    ...SIDE_RIGHT,
    align: "xMinYMid",
    transform: `translate(${SIDE_RIGHT.w} 0) scale(-1 1)`,
  },
  sideRight: SIDE_RIGHT,
  ribbon: RIBBON,
};

/**
 * Soft cream fog (with a lavender halo on the About piece), from the Figma exports.
 * Renders at the frame's aspect ratio by default: size it with className
 * (e.g. `absolute left-0 top-0 w-1/2`). If you force both width and height, the fog
 * fills the box and stays pinned to its corner/edge.
 */
const Fog = forwardRef<SVGSVGElement, FogProps>(
  ({ variant, animate = true, className, style }, ref) => {
    const id = useId().replace(/:/g, "");
    const shape = SHAPES[variant];

    return (
      <svg
        ref={ref}
        data-anim={animAttr(animate)}
        data-decor="fog"
        viewBox={`0 0 ${shape.w} ${shape.h}`}
        width="100%"
        preserveAspectRatio={`${shape.align} slice`}
        fill="none"
        aria-hidden
        focusable={false}
        className={className}
        style={{
          display: "block",
          pointerEvents: "none",
          // The exported paths run far past the frame; keep them inside it.
          overflow: "hidden",
          ...style,
        }}
      >
        <defs>
          {shape.layers.map((layer, i) => {
            const { x1, y1, x2, y2, stops } = layer.gradient;
            return (
              <linearGradient
                key={i}
                id={`fog-${id}-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                gradientUnits="userSpaceOnUse"
              >
                {stops.map(([color, opacity], j) => (
                  <stop
                    key={j}
                    offset={j / (stops.length - 1)}
                    stopColor={color}
                    stopOpacity={opacity}
                  />
                ))}
              </linearGradient>
            );
          })}
        </defs>
        <g transform={shape.transform}>
          {shape.layers.map((layer, i) => (
            <g
              key={i}
              opacity={layer.opacity}
              className="decor-part decor-fog-drift"
              style={cssVars({
                "--decor-duration": layer.duration,
                "--decor-delay": `${-i * 4}s`,
                "--decor-drift-x": layer.drift[0],
                "--decor-drift-y": layer.drift[1],
              })}
            >
              <g transform={layer.transform}>
                {layer.paths.map((d, j) => (
                  <path key={j} d={d} fill={`url(#fog-${id}-${i})`} />
                ))}
              </g>
            </g>
          ))}
        </g>
      </svg>
    );
  },
);

Fog.displayName = "Fog";

export default Fog;
