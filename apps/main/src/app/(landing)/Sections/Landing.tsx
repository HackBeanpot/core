"use client";

import React from "react";

import HeroLandingForeground from "../../lib/Assets/SVG/Hero/LandingAssets/HeroLandingForeground.tsx";
import HeroLandingBackground from "../../lib/Assets/SVG/Hero/LandingAssets/HeroLandingBackground.tsx";
import YearSign from "../../lib/Assets/SVG/Hero/LandingAssets/YearSign.tsx";
import Balloon from "../../lib/Assets/SVG/Hero/LandingAssets/Balloon.tsx";
import RollerCoaster from "../../lib/Assets/SVG/Hero/LandingAssets/RollerCoaster.tsx";
import FerrisWheel from "../../lib/Assets/SVG/Hero/LandingAssets/FerrisWheel.tsx";
import MLHLogo from "../../../../../../packages/ui/src/Logos/MLHLogo.tsx";
import SocialsButtonsRow from "../../../../../../packages/ui/src/SocialsButtonsRow.tsx";
import HBPLogo from "../../lib/Assets/SVG/Hero/LandingAssets/HBPLogo.tsx";

import useDevice from "@util/hooks/useDevice.ts";

export default function Landing(): React.ReactNode {
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <div className="relative z-10 overflow-hidden">
      <div
        className={`relative w-full overflow-hidden ${
          isMobile ? "aspect-[1]" : "aspect-[1.72/1]"
        }`}
      >
        <HeroLandingBackground
          className="w-full h-auto overflow-hidden"
          style={{
            transform: isMobile ? "scale(2.5)" : "scale(1)",
            transformOrigin: "top center",
          }}
        />

        {/* TODO: Remove if we are not MLH */}
        <MLHLogo
          className={`absolute top-0 left-0 h-auto ${isMobile ? "w-[14vw]" : "w-[7vw]"}`}
          style={{ transform: "translate(4vw, 0)" }}
        />

        {(isDesktop || isTablet) && (
          <div
            className={`absolute top-0 right-0 transition-transform duration-300}`}
            style={{
              transform: `translate(-3vw, 1vw) ${isTablet ? `scale(0.6)` : "scale(1)"}`,
              transformOrigin: "top right",
            }}
          >
            <SocialsButtonsRow />
          </div>
        )}

        <h1
          className="absolute left-1/2 -translate-x-1/2 font-NeulisNeue-Bold flex flex-col items-center"
          style={{
            fontSize: isMobile ? "4vw" : "2vw",
            top: isMobile ? "17%" : "5%",
          }}
        >
          COME ONE, COME ALL
        </h1>

        <HBPLogo
          className={`absolute left-1/2  h-auto
      ${isMobile ? "top-[25%] -translate-x-1/2 w-[60vw]" : "top-[12%] -translate-x-1/2 w-[45vw]"}`}
        />

        <YearSign
          className={`absolute top-0 right-0 h-auto ${isMobile ? "w-[20vw]" : "w-[10vw]"}`}
          style={{
            transform: isMobile
              ? "translate(-15vw, 35vw)"
              : "translate(-26vw, 14vw)",
          }}
        />

        {/* TODO: elements to be animated */}
        <Balloon
          className={`absolute top-0 right-0 h-auto ${isMobile ? "w-[8vw]" : "w-[5vw]"}`}
          style={{
            transform: isMobile
              ? "translate(-25vw, 45vw)"
              : "translate(-10vw, 12vw)",
          }}
        />
        <Balloon
          className={`absolute top-0 right-0 h-auto ${isMobile ? "w-[5vw]" : "w-[3vw]"}`}
          style={{
            transform: isMobile
              ? "translate(-20vw, 52vw)"
              : "translate(-7vw, 8vw)",
          }}
        />
        <Balloon
          className={`absolute top-0 left-0 h-auto ${isMobile ? "w-[5vw]" : "w-[3vw]"}`}
          style={{
            transform: isMobile
              ? "translate(20vw, 38vw)"
              : "translate(30vw, 15vw)",
          }}
        />

        {(isDesktop || isTablet) && (
          <Balloon
            className="absolute top-0 left-0 w-[3vw] h-auto"
            style={{ transform: "translate(2vw, 22vw)" }}
          />
        )}

        <RollerCoaster
          className="absolute top-0 right-0 w-[30vw] h-auto"
          style={{
            transform: isMobile
              ? "translate(2vw, 54vw)"
              : "translate(2vw, 17vw)",
          }}
        />
        <FerrisWheel
          className="absolute top-0 left-0 w-[18vw] h-auto"
          style={{
            transform: isMobile
              ? "translate(5vw, 53vw)"
              : "translate(6vw, 15vw)",
          }}
        />

        <HeroLandingForeground
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-auto ${isMobile ? "w-[200vw]" : "w-[170vw]" }`}
        />
      </div>
    </div>
  );
}
