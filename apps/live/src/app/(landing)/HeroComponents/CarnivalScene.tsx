"use client";

import React from "react";
import HeroBackground from "./HeroBackground";
import YellowFirework from "./YellowFirework";
import OrangeFirework from "./OrangeFirework";
import PurpleTent from "./PurpleTent";
import OrangeTent from "./OrangeTent";
import DartBoard from "./DartBoard";
import LandingGrass from "./LandingGrass";
import CabinRace from "./CabinRace";
import OpeningText from "./OpeningText";
import useDevice from "@util/hooks/useDevice";

const CarnivalScene: React.FC = () => {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const getMinHeight = () => {
    if (isDesktop) return "min-h-[1500px]";
    if (isTablet) return "min-h-[1300px]";
    return "min-h-[1100px]";
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${getMinHeight()}`}>
      {/* Background - Night Sky */}
      <div className="absolute inset-0 w-full h-full">
        <HeroBackground />
      </div>

      {/* Cabin Race - Top Left */}
      <div
        className={`absolute ${isMobile ? "-left-4" : "left-0"} top-0 z-30 ${isMobile ? "p-2 scale-75" : isTablet ? "p-4" : "p-6"}`}
      >
        <div className="w-auto h-auto">
          <CabinRace text="Magicians" />
        </div>
      </div>

      {/* Fireworks */}
      {/* Yellow Firework - Left side behind purple tent */}
      <div
        className={`absolute z-15 max-w-[280px] min-w-[100px] ${isMobile ? "scale-50" : "scale-100"} ${
          isDesktop
            ? "left-[0%] top-[32%] w-[10vw]"
            : isTablet
              ? "left-[4%] top-[28%] w-[10vw]"
              : isMobile
                ? "left-[2%] top-[20%] w-[12vw]"
                : "left-[0%] top-[25%] w-[15vw]"
        }`}
      >
        <div className="w-full h-auto">
          <YellowFirework />
        </div>
      </div>

      {/* Orange Firework - Right side behind orange tent */}
      <div
        className={`absolute z-0 max-w-[320px] min-w-[100px] ${isMobile ? "scale-50" : "scale-100"} ${
          isDesktop
            ? "right-[5%] top-[32%] w-[10vw]"
            : isTablet
              ? "right-[4%] top-[28%] w-[10vw]"
              : isMobile
                ? "right-[2%] top-[20%] w-[12vw]"
                : "right-[2%] top-[29%] w-[15vw]"
        }`}
      >
        <div className="w-full h-auto">
          <OrangeFirework />
        </div>
      </div>

      {/* Tents */}
      {/* Purple Tent - Left side */}
      <div
        className={`absolute z-5 max-w-[300px] min-w-[120px] ${isMobile ? "scale-[0.65]" : "scale-75"} origin-center ${
          isDesktop
            ? "left-[2%] bottom-[31%] w-[12vw]"
            : isTablet
              ? "left-[1%] bottom-[32%] w-[14vw]"
              : isMobile
                ? "left-[-8%] bottom-[18%] w-[20vw]"
                : "left-[0%] bottom-[23%] w-[18vw]"
        }`}
      >
        <div className="w-full h-auto">
          <PurpleTent />
        </div>
      </div>

      {/* Orange Tent - Right side */}
      <div
        className={`absolute z-5 max-w-[300px] min-w-[120px] ${isMobile ? "scale-[0.65]" : "scale-75"} origin-center ${
          isDesktop
            ? "right-[2%] bottom-[28%] w-[12vw]"
            : isTablet
              ? "right-[1%] bottom-[25%] w-[14vw]"
              : isMobile
                ? "right-[-8%] bottom-[18%] w-[20vw]"
                : "right-[0%] bottom-[23%] w-[18vw]"
        }`}
      >
        <div className="w-full h-auto">
          <OrangeTent />
        </div>
      </div>

      {/* Opening Text - Above Dart Board */}
      <div
        className={`absolute left-[52%] -translate-x-[48%] z-40 ${
          isDesktop ? "scale-150" : isTablet ? "scale-100" : "scale-[0.65]"
        } ${
          isDesktop
            ? "bottom-[72%]"
            : isTablet
              ? "bottom-[75%]"
              : isMobile
                ? "bottom-[80%]"
                : "bottom-[67%]"
        }`}
      >
        <OpeningText />
      </div>

      {/* Central Dart Board Booth */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 z-40 flex justify-center items-center ${
          isDesktop
            ? "bottom-[27%]"
            : isTablet
              ? "bottom-[25%]"
              : isMobile
                ? "bottom-[18%]"
                : "bottom-[22%]"
        }`}
      >
        <div
          className={`max-w-[450px] min-w-[200px] ${
            isDesktop
              ? "w-[25vw]"
              : isTablet
                ? "w-[28vw]"
                : isMobile
                  ? "w-[40vw]"
                  : "w-[35vw]"
          }`}
        >
          <div
            className={`${isMobile ? "scale-[0.65]" : "scale-[1.0]"} origin-center`}
          >
            <DartBoard />
          </div>
        </div>
      </div>

      {/* Grass - Bottom */}
      <div className={`absolute ${isMobile ? "bottom-[8%]" : "bottom-[15%]"} left-0 w-full z-10 overflow-visible`}>
        <div className="w-full h-auto">
          <LandingGrass />
        </div>
      </div>
    </div>
  );
};

export default CarnivalScene;
