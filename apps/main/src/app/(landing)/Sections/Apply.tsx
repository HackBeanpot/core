"use client";

import React from "react";
import ApplyLeftLog from "../../lib/Assets/SVG/ApplyAssets/ApplyLeftLog";
import ApplyRightLog from "../../lib/Assets/SVG/ApplyAssets/ApplyRightLog";
import ApplyBackground from "../../lib/Assets/SVG/ApplyAssets/ApplyBackground";
import ApplyLeftBush from "../../lib/Assets/SVG/ApplyAssets/ApplyLeftBush";
import ApplyRightBush from "../../lib/Assets/SVG/ApplyAssets/ApplyRightBush";

const Apply = () => {
  return (
    <>
      <div className="relative w-full mt-44 flex flex-col flex-none h-[559px]">
        <div className="w-full h-full z-0">
          <ApplyBackground height={555} preserveAspectRatio="none" />
        </div>

        <div className="relative top-[-480px] z-10 flex justify-center items-center w-full h-full">
          <div className="w-1/2 text-center">
            <p className="text-[20px] tablet:desktop:text-2xl desktop:text-3xl font-GT-Walsheim-Regular">
              Applications have not been released for HackBeanpot 2026. Check in
              with us again this fall!
            </p>
            <div className="pt-8">
              <button
                onClick={() =>
                  alert(
                    "Applications for HackBeanpot 2026 have not been released. Check in with us again this fall!",
                  )
                }
                className="p-3 bg-[#84AF67] text-text-light rounded-full drop-shadow-md w-44 h-14 text-2xl"
              >
                Apply here
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-[-60px] left-0 w-[40%] h-[120%] z-31 invisible desktop:visible">
          <ApplyLeftBush className="w-full h-full" />
        </div>

        <div className="absolute top-[-140px] -right-16 w-[40%] h-[120%] z-31 invisible desktop:visible">
          <ApplyRightBush className="w-full h-full" />
        </div>

        <div className="absolute top-[30px] left-0 w-[40%] h-[120%] z-31 invisible desktop:visible">
          <ApplyLeftLog />
        </div>

        <div className="absolute top-[40px] -right-40 w-[40%] h-[120%] z-31 invisible desktop:visible">
          <ApplyRightLog />
        </div>
      </div>
    </>
  );
};

export default Apply;
