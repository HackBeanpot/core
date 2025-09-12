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
    <div className="border relative flex items-center justify-center w-full">
      <KeynoteSpeaker className="relative" />

      <div
        className={`border mx-[20%] absolute flex justify-center items-center gap-8
          ${isMobile ? "top-[35%] flex-col" : ""}
          ${isTablet ? "top-[55%] flex-col" : ""}
          ${isDesktop ? "top-[55%] flex-row" : ""}`}
      >
        <GuestPhoto
          className={`border transform
            ${isMobile ? "scale-50" : ""}
            ${isTablet ? "scale-100 w-56 h-56" : ""}
            ${isDesktop ? "scale-120 w-80 h-80" : ""}`}
        />

        <div className="border max-w-lg text-left space-y-2">
          <div
            className={`text-3xl font-semibold font-['NeulisNeue-Bold'] leading-relaxed
              ${isTablet ? "text-charcoalFog" : ""}
              ${isDesktop ? "text-white" : ""}`}
          >
            Jamie Chen
          </div>
          <div
            className={`font-light font-['DMSans-Regular'] leading-relaxed
              ${isTablet ? "text-charcoalFog text-sm" : ""}
              ${isDesktop ? "text-white text-xl" : ""}`}
          >
            Jamie Chen is Director of Product Engineering at Luma Labs, where
            she leads teams building ethical, user-focused AI tools. With a
            background in computer science and over a decade in tech,
            she&apos;s known for her leadership in inclusive innovation. Jamie
            also mentors emerging engineers and speaks on ethical development
            and tech for social good.
          </div>
        </div>
      </div>
    </div>
  );
}
