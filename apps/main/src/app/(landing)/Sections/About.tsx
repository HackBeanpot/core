"use client";

import React from "react";
import TextBackground from "../../lib/Assets/AboutLandingAssets/text";
import TeamPicture from "../../lib/Assets/AboutLandingAssets/teamPicture";
import PurpleBear from "../../lib/Assets/AboutLandingAssets/purpleBear";
import YellowBear from "../../lib/Assets/AboutLandingAssets/yellowBear";
import RibbonTitle from "@repo/ui/RibbonTitle";
import Background from "../../lib/Assets/AboutLandingAssets/background";
import Dart from "../../lib/Assets/AboutLandingAssets/dart";

export default function About(): React.ReactNode {
  return (
    <div>
      <div className="mb-10">
        <RibbonTitle text="ABOUT US" />
      </div>
      <div className="absolute top-[20%] left-[80%]">
        <YellowBear />
      </div>

      <div className="mt-20 flex flex-row items-start justify-center scale-125">
        <TextBackground />
        <div className="-ml-14 mt-8">
          <TeamPicture />
        </div>
      </div>

      <div className="absolute top-[65%] left-[46%]">
        <PurpleBear />
      </div>
      <div className="absolute top-[68%] left-[79%]">
        <Dart />
      </div>

      <div className="relative mt-10 mb-20">
        <Background />
      </div>
    </div>
  );
}
