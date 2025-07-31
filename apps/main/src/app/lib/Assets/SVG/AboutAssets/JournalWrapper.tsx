"use client";

import React from "react";
import Image from "next/image";
import Journal from "./Journal";

const JournalWrapper = () => {
  return (
    <>
      <div
        className={`
        transform w-[373.15px] h-[220.91px] left-[55px]
        scale-[1.9] rotate-[0] origin-left
        tablet:w-[45vw] tablet:left-[58vw] tablet:right-0 
        tablet:transform tablet:-rotate-[7.5deg] tablet:scale-[2.2] tablet:absolute tablet:top-[210vh]
        mobile:fixed mobile:top-[95vh]
        mobilelg:fixed mobilelg:top-[80vh]
      `}
      >
        <Journal />
      </div>
      <div
        className="absolute
                 left-[280px] scale-[1.0] rotate-[0] top-[1190px] mt-0
                 tablet:left-[94%] tablet:scale-[2.7] tablet:-rotate-[7.5deg] tablet:top-[185vh] tablet:mt-24
                 mobile:-mt-40 mobile:top-[1230px]
                 mobilelg:mt-0 mobilelg:top-[1210px]"
      >
        <Image alt="AboutPicture" src="/about_1.png" width={250} height={100} />
      </div>
      <div
        className="absolute 
                 left-[265px] scale-[0.75] rotate-[0] top-[1297px]
                 tablet:absolute tablet:left-[96%] tablet:mt-96 tablet:scale-[3.8] tablet:-rotate-[7.5deg] tablet:top-[175vh] 
                 mobile:-mt-40 mobile:top-[1320px]
                 mobilelg:mt-14"
      >
        <Image alt="AboutPicture" src="/about_2.png" width={350} height={200} />
      </div>
      <div
        className="absolute
                 w-[148.2px] h-[94.89px] left-[70.46px] top-[1235px] scale-[1.08] rotate-[7.5deg]
                 tablet:absolute tablet:w-[45vw] tablet:h-auto tablet:left-[60vw] tablet:top-[173vh] tablet:mt-48 tablet:scale-100 tablet:rotate-0 mobile:-mt-40 mobilelg:mt-5"
      >
        <Image alt="AboutPicture" src="/about_3.png" width={300} height={300} />
      </div>
    </>
  );
};

export default JournalWrapper;
