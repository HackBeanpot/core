"use client";

import React from "react";
import TextBackground from "../../lib/Assets/AboutLandingAssets/text";
import TeamPicture from "../../lib/Assets/AboutLandingAssets/teamPicture";
// import PurpleBear from "../../lib/Assets/AboutLandingAssets/purpleBear";
// import YellowBear from "../../lib/Assets/AboutLandingAssets/yellowBear";
import RibbonTitle from "@repo/ui/RibbonTitle";
// import Dart from "../../lib/Assets/AboutLandingAssets/dart";
import useDevice from "@util/hooks/useDevice";

export default function About(): React.ReactNode {
  const { isMobile } = useDevice();
  return (
    <div className="relative w-full my-10 overflow-hidden">
      <div className={`${isMobile ? "transform scale-[0.85]" : ""}`}>
        <RibbonTitle text="ABOUT US" />
      </div>

      {/* <div className="absolute top-[20%] left-[80%]">
        <YellowBear />
      </div> */}

      <div className="mt-[15vh] mobile:mt-20 flex desktop:flex-row mobile:flex-col mobile:items-center items-start justify-center scale-125">
        <div className="relative flex  mobile:w-3/5">
          <p className="text-charcoalFogDark mobile:text-xs font-DMSans-Regular absolute h-full mobile:p-12 desktop:py-20 desktop:px-16 desktop-xl:py-20 desktop-xl:px-16 self-center">
            We&apos;re a non-profit organization in the Boston area that
            organizes an annual undergraduate hackathon. Our goal is to expand
            and nurture the hacker culture that exists in Boston and the
            surrounding areas. We connect students and other aspiring nerds to
            their colleagues so that they can meet new people, learn new things,
            and have a great time.
          </p>
          <TextBackground />
        </div>

        <div className="flex mobile:-mt-16 mobile:-ml-0 desktop:-ml-14 desktop:mt-8 transform mobile:scale-[50%] mobile:items-center">
          <TeamPicture />
        </div>
      </div>

      {/* <div className="absolute top-[68%] left-[46%] mb-10">
        <PurpleBear />
      </div>
      <div className="absolute top-[68%] left-[79%] mb-10">
        <Dart />
      </div> */}
    </div>
  );
}
