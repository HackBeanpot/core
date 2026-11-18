"use client";

import React, { forwardRef } from "react";
import "./decor.css";
import {
  animAttr,
  cssVars,
  decorColors,
  DecorBaseProps,
  SPARKLE_PATH,
} from "./shared";

export type SparkleProps = DecorBaseProps & {
  /** Rendered width/height in px. */
  size?: number;
  color?: string;
  /** Twinkle when animating. */
  twinkle?: boolean;
  /** Twinkle start offset in seconds, so nearby sparkles twinkle out of sync. */
  delay?: number;
};

export const Sparkle = forwardRef<SVGSVGElement, SparkleProps>(
  (
    {
      size = 24,
      color = decorColors.sparkle,
      twinkle = true,
      delay = 0,
      animate = true,
      className,
      style,
    },
    ref,
  ) => (
    <svg
      ref={ref}
      data-anim={animAttr(animate)}
      data-decor="sparkle"
      width={size}
      height={size}
      viewBox="0 0 24 24"
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
      <path
        d={SPARKLE_PATH}
        fill={color}
        className={twinkle ? "decor-part decor-twinkle" : undefined}
        style={cssVars({ "--decor-delay": `${delay}s` })}
      />
    </svg>
  ),
);
Sparkle.displayName = "Sparkle";

/**
 * Big star in the middle, two small ones on opposite diagonal corners (Figma 5597:16837).
 * Centers and sizes are in the cluster's 100×100 box.
 */
const CLUSTER = [
  { cx: 48, cy: 52, size: 42, delay: 0 },
  { cx: 78, cy: 16, size: 17, delay: 0.8 },
  { cx: 22, cy: 86, size: 15, delay: 1.5 },
] as const;

export type SparkleClusterProps = SparkleProps & {
  /** Mirror horizontally (small stars top-left and bottom-right). */
  flip?: boolean;
};

/** The 3-star sparkle group. `size` is the cluster's overall width/height. */
export const SparkleCluster = forwardRef<SVGSVGElement, SparkleClusterProps>(
  (
    {
      size = 64,
      color = decorColors.sparkle,
      twinkle = true,
      delay = 0,
      flip = false,
      animate = true,
      className,
      style,
    },
    ref,
  ) => (
    <svg
      ref={ref}
      data-anim={animAttr(animate)}
      data-decor="sparkle-cluster"
      width={size}
      height={size}
      viewBox="0 0 100 100"
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
      <g transform={flip ? "translate(100 0) scale(-1 1)" : undefined}>
        {CLUSTER.map((s, i) => {
          const k = s.size / 24;
          return (
            <g
              key={i}
              transform={`translate(${s.cx - s.size / 2} ${s.cy - s.size / 2}) scale(${k})`}
            >
              <path
                d={SPARKLE_PATH}
                fill={color}
                className={twinkle ? "decor-part decor-twinkle" : undefined}
                style={cssVars({ "--decor-delay": `${delay + s.delay}s` })}
              />
            </g>
          );
        })}
      </g>
    </svg>
  ),
);
SparkleCluster.displayName = "SparkleCluster";

export default Sparkle;
