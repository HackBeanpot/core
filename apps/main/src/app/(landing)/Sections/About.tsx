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
import useWindowSize from "@repo/util/hooks/useWindowSize";
import AboutParagraph from "../../lib/Assets/SVG/AboutAssets/AboutParagraph";

export default function About(): React.ReactNode {
  const { width } = useWindowSize();
  const isMobile = width != undefined && width < 2000;

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
      <div className="absolute transform
                   w-[373.15px] h-[227.91px] left-[28px] top-[1620px] 
                   scale-[1.9] rotate-[0] origin-left
                   tablet:absolute tablet:w-[45vw] tablet:left-[58vw] tablet:right-0 
                   tablet:transform tablet:-rotate-[7.5deg] tablet:top-[210vh] tablet:scale-[2.2]">
        <Journal/>
      </div>
      {/* the journal parts*/}
      <div className="absolute 
                 left-[280px] scale-[1.15] rotate-[0] top-[1550px] mt-0
                 tablet:left-[94%] tablet:scale-[2.7] tablet:-rotate-[7.5deg] tablet:top-[185vh] tablet:mt-24">
        <Image alt="AboutPicture" src="/about_1.png" width={250} height={100} />
      </div>
      <div className="absolute 
                 left-[245px] scale-[0.75] rotate-[0] top-[1645px]
                 tablet:absolute tablet:left-[96%] tablet:mt-96 tablet:scale-[3.8] tablet:-rotate-[7.5deg] tablet:top-[175vh]">
        <Image alt="AboutPicture" src="/about_2.png" width={350} height={200} />
      </div>
      <div className="absolute
                 w-[148.2px] h-[94.89px] left-[50.46px] top-[1575px] scale-[1.08] rotate-[7.5deg]
                 tablet:absolute tablet:w-[45vw] tablet:h-auto tablet:left-[60vw] tablet:top-[173vh] tablet:mt-48 tablet:scale-100 tablet:rotate-0">
        <Image alt="AboutPicture" src="/about_3.png" width={300} height={300} />
      </div>

      <div className="absolute 
                 left-[80.46px] top-[1555px] scale-[0.45]
                 tablet:absolute tablet:left-[63vw] tablet:top-[173vh] tablet:mt-48 tablet:scale-100">
      <Thumbtack1 />
    </div>
    <div className="absolute 
                 left-[294px] scale-[0.45] top-[1630px]
                 tablet:absolute tablet:left-[94%] tablet:top-[163vh] tablet:mt-96 tablet:scale-100">
      <Thumbtack2 />
    </div>
    <div className="absolute 
                 left-[300px] scale-[0.45] top-[1520px]
                 tablet:absolute tablet:left-[94%] tablet:top-[177vh] tablet:mt-28 tablet:scale-100">
      <Thumbtack3 />
    </div>
      <div className="absolute h-full w-[50vw] ml-24 mr-auto mt-24 flex text-[1.8vw]">
        <div className="w-[50vw]">
          <StreetSign streetName={"ABOUT"} suffix="HBP" />
          <div>
            <AboutParagraph />
            </div>
              <button className="bg-[#02877F] text-white rounded-[64px] text-xs flex items-center justify-center
                                relative top-[265px] w-[162.48px] h-[31.59px] right-[50px]
                                tablet:mt-12 tablet:top-auto tablet:w-auto tablet:h-auto tablet:right-auto
                                tablet:w-[273.17px] tablet:h-[63.69px] tablet:!text-[26.5px]">
                {"View Past Photos"}
              </button>
            </div>
        <div className="absolute 
                 w-[564.34px] h-[132.06px] left-[-160.67px] top-[447.5px]
                 tablet:absolute tablet:w-[312px] tablet:h-auto tablet:left-[66%] 
                 tablet:top-auto tablet:top-[64vh] tablet:scale-[3.3] ">
          <Cities />
        </div>
      </div>
    </div>
  );
}