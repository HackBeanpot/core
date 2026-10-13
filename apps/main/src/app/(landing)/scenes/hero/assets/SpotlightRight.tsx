import React, { type SVGProps } from "react";

/**
 * Right spotlight fixture, drawn raised (Night/Title position). The manifest
 * lowers it behind the bushes for Day/Dusk; the lens lights up in Title.
 *
 * 1512x1024 LG canvas (the 1512x982 artboard plus 42px below it, which MD
 * shows), the same as every hero layer.
 * Colors are CSS custom properties, so a scene can tween them on any ancestor:
 * - `--hero-lens-rim` (default `#393939`)
 * - `--hero-lens-outer` (default `#A4A4A4`)
 * - `--hero-lens-inner` (default `#A4A4A4`)
 */
export function SpotlightRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1512 1024"
      fill="none"
      overflow="visible"
      aria-hidden
      {...props}
    >
      <path
        fill="#28282F"
        d="M1174.82 862.64s-22.29 21.91-27.96 27.35c-5.67 5.43 15.01 29.93 24.34 24.89s27.96-27.35 27.96-27.35z"
      />
      <path
        fill="#090912"
        d="m1194.92 889.44-26.35 25.77.26.25 26.34-25.76zm2.03-.44-26.35 25.76.26.26 26.34-25.77zm-7.91 8.88-15.63 15.28c-.37.36-.48.65-.48.65l.73-.4 15.63-15.28z"
      />
      <path
        fill="#131318"
        d="m1156.99 902.47-10.18 2.24.76 3.46 10.18-2.24zm-.66 3.78-10.18 2.24.76 3.45 10.18-2.23zm6.87 2.12-13.23 2.91 7.79 35.43 13.23-2.9z"
      />
      <path fill="#28282F" d="m1157.09 909.71-7.13 1.57 7.8 35.44 7.12-1.57z" />
      <path fill="#1D1D24" d="m1152 910.83-2.03.45 7.79 35.43 2.03-.44z" />
      <path
        fill="#131318"
        d="m1174.09 863.37-12.33 12.05c6.18 11.57 11.82 17.16 25.16 25.81l5.87-6.3 5.72-6.5z"
      />
      <ellipse
        cx="8.41"
        cy="17.54"
        fill="var(--hero-lens-rim, #393939)"
        rx="8.41"
        ry="17.54"
        transform="scale(-1 1)rotate(44.36 -1641.21 -1019.23)"
      />
      <ellipse
        cx="7.25"
        cy="16.33"
        fill="var(--hero-lens-outer, #A4A4A4)"
        rx="7.25"
        ry="16.33"
        transform="scale(-1 1)rotate(44.36 -1643.01 -1018.25)"
      />
      <ellipse
        cx="6.44"
        cy="13.64"
        fill="var(--hero-lens-inner, #A4A4A4)"
        rx="6.44"
        ry="13.64"
        transform="scale(-1 1)rotate(44.36 -1646.46 -1018.83)"
      />
      <path fill="#090912" d="m1172.4 865.58-26.35 25.76.26.26 26.34-25.76z" />
      <path
        fill="#090912"
        d="m1172.4 865.58-26.35 25.76.26.26 26.34-25.76zm-.14 1.31-26.35 25.76.5.5 26.35-25.76zm19.11 21.84-26.35 25.76.5.5 26.35-25.76zm2.01.41-26.35 25.76.5.51 26.35-25.76zm-20.8-20.83-26.35 25.77.7.7 26.34-25.76zm16.95 19.54-26.35 25.77.7.7 26.34-25.76zm-16.24-17.55-26.35 25.76.7.7 26.34-25.76zm14.18 16.94L1161.12 913l.7.71 26.34-25.76zm-13.38-15.2-26.35 25.76 1.81 1.85 26.35-25.76zm2.14 2.94-26.64 26.05 1.81 1.85 26.64-26.05zm2.52 3.72-26.64 26.05 1.81 1.85 26.64-26.05zm3.16 2.72-26.64 26.05 1.81 1.85 26.64-26.05zm3.05 3.17-26.64 26.05 1.81 1.85 26.64-26.05z"
      />
      <path fill="#28282F" d="m1154.9 906.56-8.75 1.93.22 1.01 8.75-1.92z" />
      <path fill="#24253B" d="m1152.1 903.55-5.3 1.16.23 1.02 5.3-1.17z" />
      <path
        fill="#131318"
        d="M1174.64 862.74s-22.3 21.9-27.97 27.34c-5.67 5.43 15.02 29.93 24.35 24.9 2.78-1.51 6.39-4.56 10.09-8.09a40 40 0 0 1-6.72 4.99c-9.32 5.04-30.01-19.46-24.34-24.9 4.32-4.13 18.29-17.84 24.7-24.13z"
      />
    </svg>
  );
}
