"use client";

import React from "react";
import Button from "@repo/ui/Button";
import {HeroBackground} from "../../lib/Assets/SVG/index";
import LandingCard from "../components/LandingCard";

const SponsorUsHero = () => {
  return (
    <div className="relative flex flex-col items-center mobile:pt-20 desktop:pt-40">
      <div className="absolute w-screen inset-0 -z-10">
        <HeroBackground />
      </div>
      <svg
        className="inset-x-0 -translate-y-1/2 w-full pointer-events-none"
        viewBox="0 0 1200 160"
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
            <feDropShadow dx="0" dy="4" stdDeviation="0" floodOpacity="0.6" />
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
            SPONSOR US
          </text>
        </g>
      </svg>

      <div className="flex justify-center mobile:mt-10 desktop:-mt-20 desktop-xl:-mt-20 desktop-2xl:-mt-20">
        <LandingCard />
      </div>

      <div className="mobile:mt-5 desktop:mt-5 flex justify-center">
        <Button
          text="View Sponsorship Packet"
          textColor="white"
          color="firecrackerRed"
          size="medium"
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/1MNIE0Tgme3mkMVg26E9VZPQQ8i37-VqL/view?usp=sharing",
              "_blank",
            )
          }
        />
      </div>
    </div>
  );
};

export default SponsorUsHero;
