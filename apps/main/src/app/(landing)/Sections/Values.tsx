"use client";

import React from "react";
import RibbonTitle from "@repo/ui/RibbonTitle";
import useDevice from "@util/hooks/useDevice.ts";
import { ProjectStarIcon } from "../../lib/Assets/SVG";
import OurTeamValuesForeground from "../../lib/Assets/SVG/OurTeamValuesAssets/OurTeamValuesForeground.tsx";
import CloudsTop from "../../lib/Assets/SVG/OurTeamValuesAssets/CloudsTop.tsx";

export default function Values() {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const titleSize = isMobile
    ? "text-[6vw]"
    : isTablet
      ? "text-[3.5vw]"
      : "text-[2.5vw]";
  const subtitleSize = isMobile
    ? "text-[4.5vw]"
    : isTablet
      ? "text-[2vw]"
      : "text-[1.25vw]";

  {
    /* dynamic flex stuff */
  }
  const flexDirection = isDesktop ? "flex-row" : "flex-col";
  const gapSize = isDesktop
    ? "gap-[2vw]"
    : isTablet
      ? "gap-[6vw]"
      : "gap-[8vw]";

  const aspectRatio = isMobile
    ? "aspect-[1/3]"
    : isTablet
      ? "aspect-[700/1200]"
      : "aspect-[1200/1200]";

  const height = isMobile ? "h-[260vw]" : isTablet ? "h-[145vw]" : "h-[60vw]";

  const wrapLimit = isDesktop
    ? "max-w-[50vw]"
    : isMobile
      ? "max-w-[60vw]"
      : "max-w-[40vw]";

  const iconSize = isMobile ? "w-[6vw]" : isTablet ? "w-[4vw]" : "w-[4vw]";

  return (
    <div
      className={`relative w-full ${aspectRatio} bg-ribbonBlue overflow-visible`}
    >
      {/* Foreground SVG Stuff (ballons, clouds, etc) */}
      <CloudsTop className="absolute z-30 top-0 left-1/2 w-[100vw] -mt-[13vw] h-auto -translate-x-1/2" />
      <OurTeamValuesForeground
        className="absolute bottom-0 left-1/2 w-[160vw] h-auto -translate-x-1/2"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Content container */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center ${height} gap-6`}
      >
        <div className={`${isMobile ? "transform scale-[0.85]" : ""}`}>
          {/* Title */}
          <RibbonTitle text={"OUR VALUES"} />
        </div>

        {/* Values Section */}
        <div
          className={`flex ${flexDirection} justify-center ${gapSize ? gapSize : ""} max-w-6xl mx-auto`}
        >
          {/* Community */}
          <div className="flex flex-col items-center text-center max-w-md">
            <div className={`${iconSize} flex-shrink-0`}>
              <ProjectStarIcon className="w-full h-auto" />
            </div>
            <div
              className={`font-NeulisNeue-Bold text-black ${titleSize} mt-4`}
            >
              Community
            </div>
            <p
              className={`font-DMSans-Regular text-black ${subtitleSize} mt-2 ${wrapLimit}`}
            >
              Connect with fellow students and our partners in the tech
              community. Make connections that will last a lifetime!
            </p>
          </div>

          {/* Growth */}
          <div className="flex flex-col items-center text-center max-w-md">
            <div className={`${iconSize} flex-shrink-0`}>
              <ProjectStarIcon className="w-full h-auto" />
            </div>
            <div
              className={`font-NeulisNeue-Bold text-black ${titleSize} mt-4`}
            >
              Growth
            </div>
            <p
              className={`font-DMSans-Regular text-black ${subtitleSize} mt-2 ${wrapLimit}`}
            >
              Expand beyond your horizons and grow your current skill set in a
              safe and supportive environment.
            </p>
          </div>

          {/* Exploration */}
          <div className="flex flex-col items-center text-center max-w-md">
            <div className={`${iconSize} flex-shrink-0`}>
              <ProjectStarIcon className="w-full h-auto" />
            </div>
            <div
              className={`font-NeulisNeue-Bold text-black ${titleSize} mt-4`}
            >
              Exploration
            </div>
            <p
              className={`font-DMSans-Regular text-black ${subtitleSize} mt-2 ${wrapLimit}`}
            >
              Discover new ideas and technologies with the help of our
              experienced mentors, or learn new skills at our beginner-friendly
              workshops!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
