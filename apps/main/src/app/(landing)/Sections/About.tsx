"use client";

import React from "react";
import StreetSign from "@repo/ui/StreetSign";
import TopAboutBar from "../../lib/Assets/SVG/AboutAssets/TopAboutBar";
import BottomAboutBar from "../../lib/Assets/SVG/AboutAssets/BottomAboutBar";
import Squiggle from "../../lib/Assets/SVG/AboutAssets/Squiggle";
import Cities from "../../lib/Assets/SVG/AboutAssets/Cities";
import AboutParagraph from "../../lib/Assets/SVG/AboutAssets/AboutParagraph";
import Journal2 from "../../lib/Assets/SVG/AboutAssets/Journal2";
export default function About(): React.ReactNode {
  return (
    <div className="w-full h-[100vh] bg-[#F3E7D7] flex flex-col">
      <div className="w-[100vw]">
        <TopAboutBar />
      </div>
      <div className="w-[55vw]">
        <Squiggle />
      </div>

      <div className="mobile:flex-1 mobile:flex mobile:items-center mobilelg:flex-1 mobilelg:flex mobilelg:items-center tablet:block tablet:flex-none desktop:block desktop:flex-none">
        <div
          className={`
      transform w-[373.15px] h-[220.91px] left-[55px] scale-[1.9] rotate-[0] origin-left 
      tablet:w-[45vw] tablet:left-[58vw] tablet:right-0 tablet:transform tablet:-rotate-[7.5deg] tablet:scale-[2.2] tablet:absolute tablet:top-[200vh] 
      mobile:absolute mobile:left-[10px] mobile:top-[121vh]
      mobilelg:absolute mobilelg:left-[50px]
    `}
        >
          <Journal2 />
        </div>
      </div>
      <div className="w-[100vw] mt-auto relative">
        <BottomAboutBar />
      </div>
      <div className="absolute h-full w-[50vw] ml-20 mr-auto mt-5 tablet:ml-24 tablet:mt-24 flex text-[1.8vw]">
        <div className="w-[50vw]">
          <div className="scale-75 origin-left -ml-4 tablet:scale-100 tablet:ml-0">
            <StreetSign streetName={"ABOUT"} suffix="HBP" />
          </div>
          <div>
            <AboutParagraph />
          </div>
          <button
            className="font-GT-Walsheim-Regular mt-0 absolute mobile:top-[29%] tablet:top-[0%] bg-[#02877F] text-white rounded-[64px] text-xs flex items-center justify-center
                                relative mobile:top-[315px] tablet:top-[1px] desktop:w-[235.22px] desktop:h-[64.05px] right-[50px]
                                tablet:mt-5 tablet:top-auto tablet:w-auto tablet:h-auto tablet:right-auto
                                tablet:w-[308.17px] tablet:h-[67.69px] tablet:!text-[26.5px] 
                                mobile:w-[162.48px] mobile:h-[31.59px] mobile:top-[34vh]"
          >
            {"View Past Photos"}
          </button>
        </div>
        <div
          className="absolute
                 w-[560.34px] h-[132.06px] left-[-160.67px] 
                 tablet:absolute tablet:w-[312px] tablet:h-auto tablet:left-[66%] 
                 tablet:bottom-auto tablet:top-[64vh] tablet:scale-[3.3] 
                 mobile:mt-1 mobile:ml-5 mobile:bottom-0 mobile:top-[79vh]
                 mobilelg:bottom-0"
        >
          <Cities />
        </div>
      </div>
    </div>
  );
}
