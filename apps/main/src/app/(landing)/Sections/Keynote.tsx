"use client";

import React from "react";
// import Tent from "../../lib/Assets/SVG/tent.tsx";
// import clsx from "clsx";
import useDevice from "@repo/util/hooks/useDevice";
import KeynoteSpeaker from "../../lib/Assets/SVG/KeynoteSpeaker.tsx";
import GuestPhoto from "../../lib/Assets/SVG/guestphoto.tsx";

export default function Keynote(): React.ReactNode {
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <div className={`relative flex flex-col items-center justify-center w-full h-full'
      ${isMobile ? "h-[95vh]" : ""}`}>
      <KeynoteSpeaker
        className={`
          ${isMobile ? "scale-x-110" : ""}`}
      />
      <div
        className={`w-[72%] flex justify-center
          ${isMobile ? "absolute top-[42%] w-11/12 flex-col items-center" : ""}
          ${isTablet ? "absolute top-[55%]  flex-col gap-y-12 items-center" : ""}
          ${isDesktop ? "absolute top-[59%] flex-row justify-between items-start gap-x-8" : ""}`}
      >
        <GuestPhoto
          className={`transform
            ${isMobile ? "scale-[0.45]" : ""}
            ${isTablet ? "scale-100 w-1/3 h-1/3" : ""}
            ${isDesktop ? "scale-150 w-80 h-80 w-1/2 h-1/3" : ""}`}
        />

        <div
          className={`text-left
          ${isMobile ? "max-w-sm space-y-0 relative -top-6" : ""}
          ${isTablet ? "max-w-full space-y-2" : ""}
          ${isDesktop ? "max-w-2xl space-y-5" : ""}`}
        >
          <div
            className={`font-semibold font-['NeulisNeue-Bold'] leading-relaxed
            ${isMobile ? "text-xl relative" : ""}
              ${isTablet ? "text-charcoalFog text-3xl" : ""}
              ${isDesktop ? "text-white text-5xl" : ""}`}
          >
            Jamie Chen
          </div>
          <div
            className={`font-light font-['DMSans-Regular'] leading-relaxed
            ${isMobile ? "relative text-charcoalFog text-sm" : ""}
              ${isTablet ? "text-charcoalFog text-xl" : ""}
              ${isDesktop ? "text-white text-2xl" : ""}`}
          >
            Jamie Chen is Director of Product Engineering at Luma Labs, where
            she leads teams building ethical, user-focused AI tools. With a
            background in computer science and over a decade in tech, she&apos;s
            known for her leadership in inclusive innovation. Jamie also mentors
            emerging engineers and speaks on ethical development and tech for
            social good.
          </div>
        </div>
      </div>
    </div>
  );
}
