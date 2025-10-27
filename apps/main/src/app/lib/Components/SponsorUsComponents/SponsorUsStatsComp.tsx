"use client";

import React from "react";
import RibbonTitle from "@repo/ui/RibbonTitle";
import Image from "next/image";
import FullCloudBackground from "../../Assets/SVG/SponsorUsAssets/FullCloudBackground";

export default function SponsorUsBenefitCardComp() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-tomato">
      {/* <TopClouds className="absolute top-0 left-1/2 z-10 w-[140vw] h-[30%] -translate-x-1/2" /> */}
      {/* <CloudsTop className="absolute z-50 top-0 left-1/2 w-[100vw] h-auto -translate-x-1/2" />
      <CloudBackground
        className="absolute bottom-0 left-1/2 w-[160vw] h-auto -translate-x-1/2"
        preserveAspectRatio="xMidYMid meet"
      /> */}
      <FullCloudBackground
        className="absolute z-0 inset-0 w-[100vw] h-full justify-self-center"
        preserveAspectRatio="object-cover"
      />
      <div className="relative inset-0 z-20 flex flex-col items-center justify-center">
        <div className="w-1/2 mt-64 mb-12">
          <RibbonTitle text={"STATS"} />
        </div>
        <div className="relative w-full flex h-full">
          <Image
            src={"/sponsor-stats/orangeballoon.svg"}
            alt={""}
            width={200}
            height={300}
            style={{
              transform: "translate(18vw, 20vw)",
            }}
            className="absolute z-10"
          />
          <Image
            src={"/sponsor-stats/darkgreenballoon.svg"}
            alt={""}
            width={200}
            height={300}
            style={{
              transform: "translate(42vw, 30vw)",
            }}
            className="absolute z-10"
          />
          <Image
            src={"/sponsor-stats/purpleballoon.svg"}
            alt={""}
            width={200}
            height={300}
            style={{
              transform: "translate(70vw, 20vw)",
            }}
            className="absolute z-10"
          />
          <Image
            src={"/sponsor-stats/lightgreenballoon.svg"}
            alt={""}
            width={200}
            height={300}
            style={{
              transform: "translate(48vw, 4vw)",
            }}
            className="absolute"
          />
          <Image
            src={"/sponsor-stats/darkredballoon.svg"}
            alt={""}
            width={150}
            height={200}
            style={{
              transform: "translate(11vw, 4vw)",
            }}
            className="absolute z-0"
          />
          <Image
            src={"/sponsor-stats/peachballoon.svg"}
            alt={""}
            width={150}
            height={200}
            style={{
              transform: "translate(30vw, -3vw)",
            }}
            className="absolute z-0"
          />
          <Image
            src={"/sponsor-stats/navyballoon.svg"}
            alt={""}
            width={150}
            height={200}
            style={{
              transform: "translate(70vw, 0vw)",
            }}
            className="absolute z-0"
          />
        </div>
      </div>
    </div>
  );
}
