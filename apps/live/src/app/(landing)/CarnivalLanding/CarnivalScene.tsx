"use client";

import React from "react";
import HeroBackground from "../../lib/Assets/SVG/CarnivalLanding/HeroBackground";
import YellowFirework from "../../lib/Assets/SVG/CarnivalLanding/YellowFirework";
import OrangeFirework from "../../lib/Assets/SVG/CarnivalLanding/OrangeFirework";
import PurpleTent from "../../lib/Assets/SVG/CarnivalLanding/PurpleTent";
import OrangeTent from "../../lib/Assets/SVG/CarnivalLanding/OrangeTent";
import DartBoard from "../../lib/Assets/SVG/CarnivalLanding/DartBoard";
import FrontBush from "../../lib/Assets/SVG/WelcomeLanding/FrontBush";
import Grass from "./Components/Grass";
import CabinRace from "./Components/CabinRace";
import OpeningText from "./Components/OpeningText";
import useDevice from "@util/hooks/useDevice";

const CarnivalScene: React.FC = () => {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const getMinHeight = () => {
    // Reduce overall scene height so the following section
    // (SponsorFeature) appears closer without a large blank gap.
    if (isDesktop) return "min-h-[1000px]";
    if (isTablet) return "min-h-[1300px]";
    return "min-h-[890px]";
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${getMinHeight()}`}>
      {/* Background - Night Sky */}
      <div
        className={`absolute ${isMobile ? "left-[-200%] w-[180%] top-[-15%]" : "inset-0 w-full"} h-full w-full`}
      >
        <HeroBackground />
      </div>

      {/* Cabin Race - Top Left */}
      <div
        className={`absolute ${isMobile ? "left-1/2 -translate-x-1/2" : "left-10"} top-0 z-30 ${
          isMobile ? "p-2 scale-[1.5]" : isTablet ? "p-4" : "p-6 scale-150"
        }`}
      >
        <div className="w-auto h-auto">
          <CabinRace text="Magicians" />
        </div>
      </div>

      {/* Fireworks */}
      {/* Yellow Firework - Left side behind purple tent */}
      <div
        className={`absolute z-15 max-w-[424px] min-w-[100px] ${isMobile ? "scale-50" : "scale-100"} ${
          isDesktop
            ? "left-[-5%] top-[30%] w-[10vw]"
            : isTablet
              ? "left-[4%] top-[28%] w-[10vw]"
              : isMobile
                ? "left-[-27%] top-[31%] w-[12vw]"
                : "left-[0%] top-[65%] w-[15vw]"
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
            ? "right-[5%] top-[28%] w-[10vw]"
            : isTablet
              ? "right-[4%] top-[28%] w-[10vw]"
              : isMobile
                ? "right-[0%] top-[31%] w-[12vw]"
                : "right-[0%] top-[31%] w-[15vw]"
        }`}
      >
        <div className="w-full h-auto">
          <OrangeFirework />
        </div>
      </div>

      {/* Tents */}
      {/* Purple Tent - Left side */}
      <div
        className={`absolute z-5 max-w-[400px] min-w-[120px] ${isMobile ? "scale-[0.45]" : "scale-100"} origin-center ${
          isDesktop
            ? "left-[-3%] bottom-[18%] w-[15vw]"
            : isTablet
              ? "left-[1%] bottom-[24%] w-[18vw]"
              : isMobile
                ? "left-[-25%] bottom-[13%] w-[25vw]"
                : "left-[0%] bottom-[16%] w-[20vw]"
        }`}
      >
        <div className="w-full h-auto">
          <PurpleTent />
        </div>
      </div>
      {/* Front Bush - In front of purple tent */}
      <div
        className={`absolute z-20 ${
          isDesktop
            ? "left-[-5%] bottom-[16%] w-[18vw]"
            : isTablet
              ? "left-[0%] bottom-[14%] w-[22vw]"
              : isMobile
                ? "left-[-15%] bottom-[22%] w-[35vw]"
                : "left-[0%] bottom-[10%] w-[20vw]"
        }`}
      >
        <FrontBush />
      </div>

      {/* Orange Tent - Right side */}
      <div
        className={`absolute z-5 max-w-[400px] min-w-[120px] ${isMobile ? "scale-[0.40]" : "scale-100"} origin-center ${
          isDesktop
            ? "right-[5%] bottom-[15%] w-[15vw]"
            : isTablet
              ? "right-[1%] bottom-[25%] w-[18vw]"
              : isMobile
                ? "left-[72%] bottom-[14%] w-[25vw]"
                : "right-[0%] bottom-[16%] w-[20vw]"
        }`}
      >
        <div className="w-full h-auto">
          <OrangeTent />
        </div>
      </div>

      {/* Opening Text - Above Dart Board */}
      <div
        className={`absolute left-[52%] -translate-x-[48%] z-40 ${
          isDesktop
            ? "scale-125"
            : isTablet
              ? "scale-100"
              : isMobile
                ? "scale-[0.90]"
                : "scale-[0.85]"
        } ${
          isDesktop
            ? "bottom-[60%]"
            : isTablet
              ? "bottom-[75%]"
              : isMobile
                ? "bottom-[54%]"
                : "bottom-[54%]"
        }`}
      >
        <OpeningText />
      </div>

      {/* Central Dart Board Booth */}
      <div
        className={`absolute ${isMobile ? "left-[32%] -translate-x-1/2" : "left-[48%] -translate-x-1/2"} z-40 flex justify-center items-center ${
          isDesktop
            ? "bottom-[1%]"
            : isTablet
              ? "bottom-[25%]"
              : isMobile
                ? "bottom-[-5%]"
                : "bottom-[0%]"
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
            className={`${isMobile ? "scale-[0.5]" : "scale-[1.0]"} origin-center`}
          >
            <DartBoard />
          </div>
        </div>
      </div>
      {/* Grass - In front of Dart Board */}
      <div
        className={`absolute z-50 ${
          isMobile
            ? "left-[-27%] bottom-[3%] w-full"
            : "left-1/2 -translate-x-[27%] bottom-[0%] w-full"
        }`}
      >
        <div
          className={`${isMobile ? "scale-[0.4]" : "scale-[1.0]"} origin-center`}
        >
          <Grass />
        </div>
      </div>
    </div>
  );
};

export default CarnivalScene;
