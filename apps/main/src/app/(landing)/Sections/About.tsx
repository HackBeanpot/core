"use client";

import React from "react";
import Image from "next/image";
import StreetSign from "@repo/ui/StreetSign";
import TopAboutBar from "../../lib/Assets/SVG/AboutAssets/TopAboutBar";
import BottomAboutBar from "../../lib/Assets/SVG/AboutAssets/BottomAboutBar";
import Squiggle from "../../lib/Assets/SVG/AboutAssets/Squiggle";
import Cities from "../../lib/Assets/SVG/AboutAssets/Cities";
import Journal from "../../lib/Assets/SVG/AboutAssets/Journal";
import Thumbtack1 from "../../lib/Assets/SVG/AboutAssets/Thumbtack1";
import Thumbtack2 from "../../lib/Assets/SVG/AboutAssets/Thumbtack2";
import Thumbtack3 from "../../lib/Assets/SVG/AboutAssets/Thumbtack3";
import AboutParagraph from "../../lib/Assets/SVG/AboutAssets/AboutParagraph";
export default function About(): React.ReactNode {
  return (
    <div className="w-full h-full min-h-screen bg-[#F3E7D7] flex flex-col relative">
    <div className="w-full">
      <TopAboutBar />
        </div>

    <div className="w-full px-4 sm:px-12 md:px-24 lg:px-36 mt-4">
    <Squiggle />
    </div>

    <div className="w-full mt-auto">
    <BottomAboutBar />
  </div>

  <div className="absolute hidden md:block w-[45vw] left-[56vw]">
    <Journal />
  </div>
      {/* the journal parts*/}
      <div className="absolute left-[90%] mt-24">
        <Image alt="AboutPicture" src="/about_1.png" width={250} height={100} />
      </div>
      <div className="absolute left-[90%] mt-96">
        <Image alt="AboutPicture" src="/about_2.png" width={350} height={200} />
      </div>
      <div className="absolute left-[63%] mt-48">
        <Image alt="AboutPicture" src="/about_3.png" width={300} height={300} />
      </div>

      <div className="absolute left-[68%] mt-48">
        <Thumbtack1 />
      </div>

      <div className="absolute left-[95%] mt-96">
        <Thumbtack2 />
      </div>

      <div className="absolute left-[95%] mt-28">
        <Thumbtack3 />
      </div>

      <div className="absolute h-full w-[50vw] ml-24 mr-auto mt-24 flex text-[1.8vw]">
        <div className="w-[50vw]">
          <StreetSign streetName={"ABOUT"} suffix="HBP" />
          <div>
          <AboutParagraph />
          </div>
          <button className="mt-12 bg-[#02877F] text-white py-3 px-7 rounded-[64px]">
            {"View Past Photos"}
          </button>
        </div>
        <div className="absolute bottom-32 left-[15%] w-[80vw]">
          <Cities />
        </div>
      </div>
    </div>
  );
}
