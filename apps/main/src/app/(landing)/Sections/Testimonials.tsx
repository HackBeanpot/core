"use client";

import React from "react";
import TestimonialTrain from "@repo/ui/Train";
import RibbonTitle from "@repo/ui/RibbonTitle";
import {
  TestimonialBottomSquiggle,
  TrainTracks,
  TestimonialLeftBush,
  TestimonialRightBush,
} from "../../lib/Assets/SVG";
import useDevice from "@repo/util/hooks/useDevice";

export default function Testimonials(): React.ReactNode {
  const { isDesktop } = useDevice();
  return (
    <>
      <div className={`relative w-full h-[15vw] bg-mossGreen`}>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          {/*<RibbonTitle size={"w-[65vw]"} text={"TESTIMONIALS"}></RibbonTitle>*/}
          <RibbonTitle text={"TESTIMONIALS"}></RibbonTitle>
        </div>
      </div>

      <div
        className={`relative w-full ${isDesktop ? "h-[50vw]" : "h-[62vw]"} bg-mossGreen z-20`}>
        <TestimonialBottomSquiggle className="absolute w-[140vw] h-auto bottom-0 translate-y-[10vw]">
        </TestimonialBottomSquiggle>

        <TrainTracks className="absolute w-[120vw] h-auto bottom-0 translate-y-[-3vw]"></TrainTracks>

        <div className="absolute w-full h-full top-0 -translate-y-[0vw]">
          <TestimonialTrain></TestimonialTrain>
        </div>

        <TestimonialLeftBush className="absolute w-[14vw] h-auto bottom-0 left-0 -translate-x-[-3vw]"></TestimonialLeftBush>

        <TestimonialRightBush className="absolute w-[25vw] h-auto bottom-0 right-0 -translate-x-[2vw]"></TestimonialRightBush>
      </div>
    </>
  );
}
