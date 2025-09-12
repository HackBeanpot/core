"use client";

import React from "react";
// absolute or next path (has to define in tsconfig)
// import Tent from "../../lib/Assets/SVG/tent.tsx";
// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";
// import Banner from "../../lib/Assets/SVG/banner.tsx";
import KeynoteSpeaker from "../../lib/Assets/SVG/KeynoteSpeaker.tsx";
import GuestPhoto from "../../lib/Assets/SVG/guestphoto.tsx";
export default function Keynote(): React.ReactNode {
  return (
    <>
      <div className="border relative flex items-center justify-center w-full">
        <KeynoteSpeaker className="relative" />
        <div className="border mx-[20%] absolute mobile:top-[35%] mobile-xl:top-[36%] tablet:top-[55%] desktop:top-[55%] flex flex-row mobile:flex-col tablet:flex-col desktop:flex-row justify-center items-center gap-8">
          <GuestPhoto className="border transform mobile:scale-50 mobile-xl:scale-50 tablet:scale-100 desktop:scale-120 tablet:w-56 tablet:h-56 desktop:w-80 desktop:h-80" />
          <div className="border max-w-lg text-left space-y-2">
            <div className="tablet:text-charcoalFog desktop:text-white text-3xl font-semibold font-['NeulisNeue-Bold'] leading-relaxed">
              Jamie Chen
            </div>
            <div className="tablet:text-charcoalFog desktop:text-white tablet:text-sm desktop:text-xl font-light font-['DMSans-Regular'] leading-relaxed">
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
    </>
  );
  // TODO: update content
  // TODO: update title
  //
}
