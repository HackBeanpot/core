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
      <div className="relative w-full h-[40vh] -mt-2 -mb-20 tablet:mb-5 flex flex-col flex-none">
        <div className="overflow-hidden -mb-10">
          <div className="w-[300%] tablet:w-full -translate-x-10 tablet:-translate-x-0 h-full z-0">
            <ApplyBackground preserveAspectRatio="xMidYMid meet" />
          </div>
        </div>

        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-[40%] tablet:top-[60%] z-10 flex items-center text-center">
          <div className="max-w-xl">
            <p className=" text-md tablet:text-[20px] tablet:desktop:text-2xl desktop:text-3xl font-GT-Walsheim-Regular">
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
                className="p-3 bg-[#84AF67] text-text-light rounded-full drop-shadow-md w-32 tablet:w-44 h-12 tablet:h-14 text-md tablet:text-2xl"
              >
                Apply here
              </button>
            </div>
          </div>
        </div>

        <div className="absolute -top-[15%] left-[-20%] w-[55%] max-w-[120%] z-20 invisible desktop:visible">
          <ApplyLeftBush className="w-full h-full" />
        </div>

        <div className="absolute top-[-35%] right-[-2%] w-[42%] max-w-[120%] z-20 invisible desktop:visible">
          <ApplyRightBush className="w-full h-full" />
        </div>

        <div className="absolute top-[20%] left-0 max-w-[30%] h-[120%] z-30 invisible desktop:visible">
          <ApplyLeftLog className="w-full h-full" />
        </div>

        <div className="absolute top-[20%] right-0 max-w-[30%] h-[120%] z-30 invisible desktop:visible">
          <ApplyRightLog className="w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default Apply;