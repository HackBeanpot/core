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
      <div className="border relative flex flex-col items-center justify-center w-full">
        <KeynoteSpeaker className="border" />
        <div className="border desktop:mx-[20%] tablet:top-[105%] absolute top-[55%] flex lg:flex-row sm:flex-col justify-center desktop:gap-8">
          <GuestPhoto className="border w-80 h-80" />
          <div className="border max-w-lg text-left tablet:space-y-1 desktop:space-y-2">
            <div className="tablet:text-charcoalFog desktop:text-white text-3xl font-semibold font-['NeulisNeue-Bold'] tablet:leading-1 desktop:leading-relaxed">
              Jamie Chen
            </div>
            <div className="tablet:text-charcoalFog tablet:text-[14px] desktop:text-white desktop:text-2xl text-base font-light font-['DMSans-Regular'] tablet:leading-1 desktop:leading-relaxed">
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
