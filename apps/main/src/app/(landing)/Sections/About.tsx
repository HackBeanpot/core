"use client";

import React from "react";
import TextBackground from "../../lib/Assets/AboutLandingAssets/text";
import TeamPicture from "../../lib/Assets/AboutLandingAssets/teamPicture";
import PurpleBear from "../../lib/Assets/AboutLandingAssets/purpleBear";
import YellowBear from "../../lib/Assets/AboutLandingAssets/yellowBear";
import RibbonTitle from "@repo/ui/RibbonTitle";
import Dart from "../../lib/Assets/AboutLandingAssets/dart";
import useDevice from "@util/hooks/useDevice";

export default function About(): React.ReactNode {
  const { isMobile } = useDevice();
  return (
    <div className="relative w-full max-w-[1400px] mx-auto overflow-visible p-[clamp(2rem,6vw,8rem)] z-20">
      <div className={`${isMobile ? "transform scale-[0.85]" : ""}`}>
        <RibbonTitle text="ABOUT US" />
      </div>

      {
        <div
          className="absolute w-[160vw] h-auto top-[20%] left-[80%]"
          style={{
            transform: isMobile ? "translate(-15vw, 8vh)" : "",
          }}
        >
          <YellowBear />
        </div>
      }

      <div className="mt-20 flex flex-col items-center justify-center scale-125 sm:mt-[15vh] sm:flex-row sm:items-start">
        <div className="relative flex h-auto w-3/5 sm:w-auto">
          <p className="z-10 text-charcoalFogDark text-xs font-DMSans-Regular absolute h-full -mr-16 px-16 py-20 self-center sm:mr-0 sm:text-base xl:p-0">
            We&apos;re a non-profit organization in the Boston area that
            organizes an annual undergraduate hackathon. Our goal is to expand
            and nurture the hacker culture that exists in Boston and the
            surrounding areas. We connect students and other aspiring nerds to
            their colleagues so that they can meet new people, learn new things,
            and have a great time.
          </p>
          <TextBackground
            style={{
              transform: isMobile ? "translate(10vw, 8vh) scale(1.2)" : "",
            }}
          />
        </div>

        <div className="flex -mt-16 transform scale-50 items-center sm:mt-8 sm:-ml-14 sm:scale-100 sm:items-stretch lg:m-0">
          <TeamPicture />
        </div>
      </div>

      <div
        className="absolute w-[160vw] h-auto top-[68%] left-[46%] mb-10"
        style={{
          transform: isMobile ? "translate(-20vw, 8vh)" : "",
        }}
      >
        <PurpleBear />
      </div>

      <div className="absolute w-[160vw] h-auto top-[78%] left-[79%] mb-10">
        <Dart />
      </div>
    </div>
  );
}
