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
import useIsMobile from "@util/hooks/useIsMobile";

export default function About(): React.ReactNode {
  const isMobile = useIsMobile();
  return (
    <div className="w-full h-[100vh] bg-[#F3E7D7] flex flex-col flex-none">
      <div className="w-[100vw]">
        <TopAboutBar />
      </div>
      <div className="w-[55vw]">
        <Squiggle />
      </div>
      <div className="w-[100vw] mt-auto">
        <BottomAboutBar />
      </div>
      <div
        className={`
        transform w-[373.15px] h-[220.91px] left-[55px]
        scale-[1.9] rotate-[0] origin-left
        tablet:w-[45vw] tablet:left-[58vw] tablet:right-0 
        tablet:transform tablet:-rotate-[7.5deg] tablet:top-[200vh] tablet:scale-[2.2] 
        ${isMobile ? "relative mt-14" : "absolute tablet:absolute"}
      `}
      >
        <Journal />
      </div>
      <div
        className="absolute 
                 left-[280px] scale-[1.0] rotate-[0] top-[1190px] mt-0
                 tablet:left-[94%] tablet:scale-[2.7] tablet:-rotate-[7.5deg] tablet:top-[185vh] tablet:mt-24 mobile:mt-14"
      >
        <Image alt="AboutPicture" src="/about_1.png" width={250} height={100} />
      </div>
      <div
        className="absolute 
                 left-[265px] scale-[0.75] rotate-[0] top-[1297px]
                 tablet:absolute tablet:left-[96%] tablet:mt-96 tablet:scale-[3.8] tablet:-rotate-[7.5deg] tablet:top-[175vh] mobile:mt-14"
      >
        <Image alt="AboutPicture" src="/about_2.png" width={350} height={200} />
      </div>
      <div
        className="absolute
                 w-[148.2px] h-[94.89px] left-[70.46px] top-[1235px] scale-[1.08] rotate-[7.5deg]
                 tablet:absolute tablet:w-[45vw] tablet:h-auto tablet:left-[60vw] tablet:top-[173vh] tablet:mt-48 tablet:scale-100 tablet:rotate-0 mobile:mt-14"
      >
        <Image alt="AboutPicture" src="/about_3.png" width={300} height={300} />
      </div>

      <div
        className="absolute 
                 left-[90.46px] top-[1215px] scale-[0.45]
                 tablet:absolute tablet:left-[63vw] tablet:top-[173vh] tablet:mt-48 tablet:scale-100 mobile:mt-14"
      >
        <Thumbtack1 />
      </div>
      <div
        className="absolute 
                 left-[324px] scale-[0.45] top-[1285px]
                 tablet:absolute tablet:left-[94%] tablet:top-[163vh] tablet:mt-96 tablet:scale-100 mobile:mt-14"
      >
        <Thumbtack2 />
      </div>
      <div
        className="absolute 
                 left-[300px] scale-[0.45] top-[1170px]
                 tablet:absolute tablet:left-[94%] tablet:top-[177vh] tablet:mt-28 tablet:scale-100 mobile:mt-14"
      >
        <Thumbtack3 />
      </div>
      <div className="absolute h-full w-[50vw] ml-20 mr-auto mt-5 tablet:ml-24 tablet:mt-24 flex text-[1.8vw]">
        <div className="w-[50vw]">
          <div className="scale-75 origin-left -ml-4 tablet:scale-100 tablet:ml-0">
            <StreetSign streetName={"ABOUT"} suffix="HBP" />
          </div>
          <div className="mt-8 tablet:mt-4">
            <AboutParagraph />
          </div>
          <button
            className="font-GT-Walsheim-Regular mt-0 absolute top-[30%] bg-[#02877F] text-white rounded-[64px] text-xs flex items-center justify-center
                                relative top-[310px] desktop:w-[235.22px] desktop:h-[64.05px] right-[50px]
                                tablet:mt-12 tablet:top-auto tablet:w-auto tablet:h-auto tablet:right-auto
                                tablet:w-[308.17px] tablet:h-[67.69px] tablet:!text-[26.5px] mobile:w-[162.48px] mobile:h-[31.59px]"
          >
            {"View Past Photos"}
          </button>
        </div>
        <div
          className="absolute bottom-auto
                 w-[560.34px] h-[132.06px] left-[-160.67px] 
                 tablet:absolute tablet:w-[312px] tablet:h-auto tablet:left-[66%] 
                 tablet:bottom-auto tablet:top-[70vh] tablet:scale-[3.3] mobile:mt-5 mobile:ml-5"
        >
          <Cities />
        </div>
      </div>
    </div>
  );
}
