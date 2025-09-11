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
      <div className="relative flex flex-col items-center justify-center">
        <KeynoteSpeaker />
        <GuestPhoto className="absolute top-[550px] left-[560px] w-80 h-80 " />
        {/* Text positioned inside the black portion of the tent */}
        <div className="absolute top-[560px] left-1/2 transform -translate-x-1/4 max-w-lg text-white text-3xl font-semibold font-['NeulisNeue-Bold'] leading-relaxed px-0">
          Jamie Chen
        </div>
        <div className="absolute top-[605px] left-1/2 transform -translate-x-1/4 max-w-lg mx-auto text-left text-white text-md font-light font-['DMSans-Regular'] leading-relaxed px-8">
          Jamie Chen is Director of Product Engineering at Luma Labs, where she
          leads teams building ethical, user-focused AI tools. With a background
          in computer science and over a decade in tech, she&apos;s known for
          her leadership in inclusive innovation. Jamie also mentors emerging
          engineers and speaks on ethical development and tech for social good.
        </div>
      </div>
    </>
  );
  // TODO: update content
  // TODO: update title
  //
}
