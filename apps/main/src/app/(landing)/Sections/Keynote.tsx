"use client";

import React from "react";
// import Tent from "../../lib/Assets/SVG/tent.tsx";
// import clsx from "clsx";
import useDevice from "@repo/util/hooks/useDevice";
import KeynoteSpeakerBackgroundWaves from "../../lib/Assets/SVG/KeynoteSpeakerAssets/KeynoteSpeakerBackgroundWaves.tsx";
import KeynoteSpeakerForegroundWaves from "../../lib/Assets/SVG/KeynoteSpeakerAssets/KeynoteSpeakerForegroundWaves.tsx";
import KeynoteSpeakerTent from "../../lib/Assets/SVG/KeynoteSpeakerAssets/KeynoteSpeakerTent.tsx";
import RibbonTitle from "@repo/ui/RibbonTitle";
import KeynoteSpeakerFrame from "../../lib/Assets/SVG/KeynoteSpeakerAssets/KeynoteSpeakerFrame.tsx";
import KeynoteSpeakerBush from "../../lib/Assets/SVG/KeynoteSpeakerAssets/KeynoteSpeakerBush.tsx";
import KeynoteSpeakerTentShadow from "../../lib/Assets/SVG/KeynoteSpeakerAssets/KeynoteSpeakerTentShadow.tsx";

export default function Keynote(): React.ReactNode {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const speakerName = "Jamie Chen";

  return (
    <div
      className={`relative w-full overflow-hidden ${
        isMobile
          ? "aspect-[1/1.6]"
          : isTablet
            ? "aspect-[1/1.1]"
            : "aspect-[1/0.75]"
      }`}
    >
      <KeynoteSpeakerBackgroundWaves
        className={`absolute w-[160vw] h-auto -mt-[7vw] overflow-hidden`}
        style={{ transform: "translate(-25vw, 0)" }}
      />

      {/* Tent Shadow */}
      <KeynoteSpeakerTentShadow
        className={`absolute w-[98vw] h-auto left-1/2 -mt-[12vw]`}
        style={{
          transform: "translate(-50%, 64vw)",
        }}
      ></KeynoteSpeakerTentShadow>

      {/* Tent */}
      <KeynoteSpeakerTent
        className={`absolute w-[98vw] h-auto left-1/2 -mt-[12vw]`}
        style={{
          transform: "translate(-50.5%, 0)",
        }}
      ></KeynoteSpeakerTent>

      {/* Bush */}
      <KeynoteSpeakerBush
        className={`absolute w-[12vw] h-auto`}
        style={{ transform: "translate(1vw, 48vw)" }}
      ></KeynoteSpeakerBush>

      {/* Ribbon Title */}
      <div
        className="absolute w-[70vw] h-auto left-1/2 -translate-x-1/2"
        style={{ transform: "translate(-50%, 8vw)" }}
      >
        <RibbonTitle text={"GUEST SPEAKER"}></RibbonTitle>
      </div>

      {/* Speaker Headshot, TODO: actually add the headshot in when available */}
      <KeynoteSpeakerFrame
        className="absolute w-[29vw] h-auto"
        style={
          isDesktop
            ? { transform: "translate(12vw, 30.5vw)" }
            : { left: "50%", top: "30.5vw", transform: "translateX(-62%)" }
        }
      ></KeynoteSpeakerFrame>

      {/* Text cluster TODO: update title & content */}
      <div
        className="absolute"
        style={
          isDesktop
            ? { transform: "translate(43vw, 32vw)" }
            : isTablet
              ? { left: "50%", top: "65vw", transform: "translateX(-50%)" }
              : { left: "50%", top: "67vw", transform: "translateX(-50%)" }
        }
      >
        <h1
          className={`font-NeulisNeue-Bold ${isDesktop ? "text-[3vw] text-white" : "text-[5vw] text-charcoalFog"}`}
        >
          {speakerName}
        </h1>
        <p
          className={`font-NeulisNeue-Regular h-auto
              ${
                isDesktop
                  ? "w-[42vw] text-[1.5vw] text-white"
                  : isTablet
                    ? "w-[80vw] text-[2vw] text-charcoalFog"
                    : "w-[80vw] text-[4vw] text-charcoalFog"
              }`}
        >
          Jamie Chen is Director of Product Engineering at Luma Labs, where she
          leads teams building ethical, user-focused AI tools. With a background
          in computer science and over a decade in tech, she&apos;s known for
          her leadership in inclusive innovation. Jamie also mentors emerging
          engineers and speaks on ethical development and tech for social good.
        </p>
      </div>

      <KeynoteSpeakerForegroundWaves
        className={`absolute w-[200vw] h-auto bottom-0 overflow-hidden`}
      ></KeynoteSpeakerForegroundWaves>
    </div>

    // <div
    //   className={`relative flex flex-col items-center justify-center w-full h-full
    //   ${isMobile ? "h-[200vh]" : ""}`}
    //       // >
    //   <KeynoteSpeakerTent></KeynoteSpeakerTent>
    //   <KeynoteSpeakerForegroundWaves></KeynoteSpeakerForegroundWaves>
    //
    //   <div
    //       className={`w-[72%] flex justify-center
    //           ${isMobile ? "absolute top-[43%] w-11/12 flex-col items-center" : ""}
    //           ${isTablet ? "absolute top-[55%]  flex-col gap-y-12 items-center" : ""}
    //           ${isDesktop ? "absolute top-[59%] flex-row justify-between items-start gap-x-8" : ""}`}
    //   >
    //     {/*<GuestPhoto*/}
    //     {/*  className={`transform*/}
    //     {/*    ${isMobile ? "scale-[0.45]" : ""}*/}
    //     {/*    ${isTablet ? "scale-100 w-1/3 h-1/3" : ""}*/}
    //     {/*    ${isDesktop ? "scale-150 w-80 h-80 w-1/2 h-1/3" : ""}`}*/}
    //     {/*/>*/}
    //
    //     <div
    //         className={`text-left
    //           ${isMobile ? "max-w-sm space-y-0 relative -top-6" : ""}
    //           ${isTablet ? "max-w-full space-y-2" : ""}
    //           ${isDesktop ? "max-w-2xl space-y-5" : ""}`}
    //     >
    //
    //       <div
    //           className={`font-semibold font-['NeulisNeue-Bold'] leading-relaxed
    //             ${isMobile ? "text-xl relative" : ""}
    //               ${isTablet ? "text-charcoalFog text-3xl" : ""}
    //               ${isDesktop ? "text-white text-5xl" : ""}`}
    //       >
    //         {speakerName}
    //       </div>
    //       <div
    //           className={`font-light font-['DMSans-Regular'] leading-relaxed
    //             ${isMobile ? "relative text-charcoalFog text-xs" : ""}
    //               ${isTablet ? "text-charcoalFog text-xl" : ""}
    //               ${isDesktop ? "text-white text-2xl" : ""}`}
    //       >
    //         Jamie Chen is Director of Product Engineering at Luma Labs, where
    //         she leads teams building ethical, user-focused AI tools. With a
    //         background in computer science and over a decade in tech, she&apos;s
    //         known for her leadership in inclusive innovation. Jamie also mentors
    //         emerging engineers and speaks on ethical development and tech for
    //         social good.
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
