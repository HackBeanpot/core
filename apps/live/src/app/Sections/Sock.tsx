"use client";

import React from "react";
import Section from "@repo/ui/Section";
import FrontRollercoaster from "../lib/Assets/SVG/LandingSock/FrontRollercoaster.tsx";
import BackRollercoaster from "../lib/Assets/SVG/LandingSock/BackRollercoaster.tsx";
import BackGrass from "../lib/Assets/SVG/LandingSock/BackGrass.tsx";
import FrontGrass from "../lib/Assets/SVG/LandingSock/FrontGrass.tsx";
import useIsMobile from "@repo/util/hooks/useIsMobile";

export default function Sock(): JSX.Element {
  const isMobile = useIsMobile();

  const background = (
    <div className='w-full h-full !bg-mossGreen ${isMobile ? "w-[200vw]" : "w-[170vw]"}'></div>
  );

  const content = (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`relative w-full overflow-hidden ${
          isMobile ? "aspect-[1]" : "aspect-[1.5/1]"
        }`}
      >
        <div
          className="absolute top-40 left-1/2 -translate-x-1/2 font-NeulisNeue-Bold text-white flex flex-col items-center"
          style={{
            fontSize: isMobile ? "4vw" : "2vw",
            top: isMobile ? "30%" : "15%",
          }}
        >
          Happy Hacking!
        </div>

        <div
          className="absolute right-0 bottom-0 w-[80vw] h-auto z-0"
          style={{
            transformOrigin: "top",
            transform: "translateY(-15%)",
          }}
        >
          <BackRollercoaster />
        </div>

        <div
          className="absolute left-0 bottom-0 w-[80vw] h-auto z-10"
          style={{
            transformOrigin: "top",
            transform: "translateY(-10%)",
          }}
        >
          <FrontRollercoaster />
        </div>

        <div
          className="absolute left-0 top-0 w-full h-auto overflow-hidden"
          style={{
            transformOrigin: "top",
            transform: "translateY(50%)",
          }}
        >
          <BackGrass />
        </div>

        <div
          className="absolute left-0 top-0 w-full h-auto overflow-hidden z-20"
          style={{
            transformOrigin: "top",
            transform: "translateY(90%)",
          }}
        >
          <FrontGrass />
        </div>
      </div>
    </div>
  );

  return (
    <Section
      name={"sock"}
      background={background}
      content={content}
      height={120}
    />
  );
}
