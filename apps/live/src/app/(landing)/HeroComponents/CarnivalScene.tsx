"use client";

import React from "react";
import HeroBackground from "./HeroBackground";
import YellowFirework from "./YellowFirework";
import OrangeFirework from "./OrangeFirework";
import PurpleTent from "./PurpleTent";
import OrangeTent from "./OrangeTent";
import DartBoard from "./DartBoard";
import LandingGrass from "./LandingGrass";

const CarnivalScene: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden min-h-[1100px] md:min-h-[1300px] lg:min-h-[1500px]">
      {/* Background - Night Sky */}
      <div className="absolute inset-0 w-full h-full">
        <HeroBackground />
      </div>

      {/* Fireworks */}
      {/* Yellow Firework - Left side above purple tent */}
      <div className="absolute left-[2%] top-[2%] z-30 w-[15vw] max-w-[280px] min-w-[100px] sm:left-[4%] sm:top-[4%] sm:w-[12vw] md:w-[10vw] lg:left-[5%] lg:top-[5%]">
        <div className="w-full h-auto">
          <YellowFirework />
        </div>
      </div>

      {/* Orange Firework - Right side above orange tent */}
      <div className="absolute right-[2%] top-[2%] z-30 w-[15vw] max-w-[320px] min-w-[100px] sm:right-[4%] sm:top-[4%] sm:w-[12vw] md:w-[10vw] lg:right-[5%] lg:top-[5%]">
        <div className="w-full h-auto">
          <OrangeFirework />
        </div>
      </div>

      {/* Tents */}
      {/* Purple Tent - Left side */}
      <div className="absolute left-[0%] bottom-[10%] z-20 w-[18vw] max-w-[300px] min-w-[120px] sm:left-[1%] sm:bottom-[12%] sm:w-[16vw] md:w-[14vw] lg:left-[2%] lg:bottom-[15%] lg:w-[12vw] scale-75 origin-center">
        <div className="w-full h-auto">
          <PurpleTent />
        </div>
      </div>

      {/* Orange Tent - Right side */}
      <div className="absolute right-[0%] bottom-[10%] z-20 w-[18vw] max-w-[300px] min-w-[120px] sm:right-[1%] sm:bottom-[12%] sm:w-[16vw] md:w-[14vw] lg:right-[2%] lg:bottom-[15%] lg:w-[12vw] scale-75 origin-center">
        <div className="w-full h-auto">
          <OrangeTent />
        </div>
      </div>

      {/* Central Dart Board Booth */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[15%] z-40 w-[35vw] max-w-[450px] min-w-[200px] sm:bottom-[17%] sm:w-[32vw] md:bottom-[18%] md:w-[28vw] lg:bottom-[20%] lg:w-[25vw] xl:w-[22vw] scale-75 origin-center">
        <div className="w-full h-auto">
          <DartBoard />
        </div>
      </div>

      {/* Grass - Bottom */}
      <div className="absolute bottom-0 left-0 w-full z-10 overflow-visible">
        <div className="w-full h-auto">
          <LandingGrass />
        </div>
      </div>
    </div>
  );
};

export default CarnivalScene;
