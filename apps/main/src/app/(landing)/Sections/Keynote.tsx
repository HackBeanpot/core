"use client";

import React from "react";
// absolute or next path (has to define in tsconfig)
// import Tent from "../../lib/Assets/SVG/tent.tsx";
// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";
// import Banner from "../../lib/Assets/SVG/banner.tsx";
import Popcorn from "../../lib/Assets/SVG/popcorn.tsx";
import KeynoteSpeaker from "../../lib/Assets/SVG/KeynoteSpeaker.tsx";
import GuestPhoto from "../../lib/Assets/SVG/guestphoto.tsx";
export default function Keynote(): React.ReactNode {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Keynote</h1>
        <p className="text-lg">Lorem ipsum dolor sit amet...</p>
        <GuestPhoto />
        <Popcorn className="absolute top-[750px] left-[560px] w-24 h-24" />
        <KeynoteSpeaker />
      </div>
    </>
  );
  // TODO: update content
  // TODO: update title
  //
}
