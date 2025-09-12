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
    <div className="relative flex flex-col items-center justify-center w-full">
      <KeynoteSpeaker
        className={`
          ${isMobile ? "scale-x-110" : ""}`}
      />
      <div
        className={`w-[72%] absolute flex justify-center
          ${isMobile ? "top-[30%] w-11/12 flex-col items-center" : ""}
          ${isTablet ? "top-[55%]  flex-col gap-y-12 items-center" : ""}
          ${isDesktop ? "top-[57%] flex-row justify-between items-start gap-x-8" : ""}`}
      >
        <GuestPhoto
          className={`transform
            ${isMobile ? "scale-[0.45]" : ""}
            ${isTablet ? "scale-100 w-56 h-56" : ""}
            ${isDesktop ? "scale-120 w-80 h-80" : ""}`}
        />

        <div
          className={`text-left
          ${isMobile ? "max-w-sm space-y-0" : ""}
          ${isTablet ? "max-w-full space-y-2" : ""}
          ${isDesktop ? "max-w-lg space-y-2" : ""}`}
        >
          <div
            className={`font-semibold font-['NeulisNeue-Bold'] leading-relaxed
            ${isMobile ? "text-3xl" : ""}
              ${isTablet ? "text-charcoalFog text-3xl" : ""}
              ${isDesktop ? "text-white text-3xl" : ""}`}
          >
            Jamie Chen
          </div>
          <div
            className={`font-light font-['DMSans-Regular'] leading-relaxed
            ${isMobile ? "text-charcoalFog text-sm" : ""}
              ${isTablet ? "text-charcoalFog text-xl" : ""}
              ${isDesktop ? "text-white text-xl" : ""}`}
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
