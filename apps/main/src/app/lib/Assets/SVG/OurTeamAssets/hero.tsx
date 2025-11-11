import React from "react";
import HeroBackground from "./heroBackground";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden -mt-[1vh]">
      <HeroBackground />

      <svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full pointer-events-none"
        viewBox="0 20 1200 160"
        preserveAspectRatio="xMaxYMin slice"
        aria-hidden
      >
        <defs>
          <filter
            id="titleShadow"
            x="0"
            y="0"
            width="1200"
            height="160"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow dx="3" dy="4" stdDeviation="0.6" floodOpacity="0.6" />
          </filter>
        </defs>
        <g
          stroke="#F2E06F"
          strokeWidth="6"
          strokeLinejoin="round"
          paintOrder="stroke fill"
          vectorEffect="non-scaling-stroke"
          filter="url(#titleShadow)"
        >
          <text
            x="50%"
            y="57%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-Sancreek-Regular"
            fontSize="80"
            fill="#CC322D"
          >
            OUR TEAM
          </text>
        </g>
      </svg>
    </section>
  );
}
