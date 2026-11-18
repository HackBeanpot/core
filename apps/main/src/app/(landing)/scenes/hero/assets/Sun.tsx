import React, { type SVGProps } from "react";

/**
 * Sun (Day, Dusk) that becomes the yellow moon at Night: same art, moved
 * by the manifest and recolored through `--hero-sun-glow`.
 *
 * 1512x1024 LG canvas (the 1512x982 artboard plus 42px below it, which MD
 * shows), the same as every hero layer.
 * Colors are CSS custom properties, so a scene can tween them on any ancestor:
 * - `--hero-sun-glow` (default `#FEF5D1`)
 */
export function Sun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1512 1024"
      fill="none"
      overflow="visible"
      aria-hidden
      {...props}
    >
      <mask
        id="hero-sun-a"
        width="79"
        height="79"
        x="115"
        y="87"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <circle cx="154.5" cy="126.5" r="39.5" fill="#E7E7E7" />
      </mask>
      <g mask="url(#hero-sun-a)">
        <circle cx="154.5" cy="126.5" r="39.5" fill="#FFFDE7" />
        <circle
          cx="151.78"
          cy="123.79"
          r="39.5"
          fill="var(--hero-sun-glow, #FEF5D1)"
        />
      </g>
    </svg>
  );
}
