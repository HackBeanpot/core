"use client";

import React from "react";
import { Section } from "@repo/ui";
import TopAboutBar from "../../lib/Assets/SVG/AboutAssets/TopAboutBar";
import BottomAboutBar from "../../lib/Assets/SVG/AboutAssets/BottomAboutBar";
import Squiggle from "../../lib/Assets/SVG/AboutAssets/Squiggle";

const background = (
  <div className="w-full h-full bg-[#F3E7D7] flex flex-col flex-none">
    <div className="w-[100vw]">
      <TopAboutBar />
    </div>
    <div className="w-[50vw]">
      <Squiggle />
    </div>
    <div className="w-[100vw] mt-auto">
      <BottomAboutBar />
    </div>
  </div>
);

const content = (
  <div className="w-full text-[#474747] h-full grid grid-cols-2 grid-rows-2 justify-center content-center font-GT-Walsheim-Regular tablet:text-2xl"></div>
);

export default function Values(): React.ReactNode {
  return (
    <Section
      name={"values"}
      background={background}
      content={content}
      height={80}
    />
  );
}
