"use client";

import React from "react";
// import ApplyLeftLog from "../../lib/Assets/SVG/ApplyAssets/ApplyLeftLog";
// import ApplyRightLog from "../../lib/Assets/SVG/ApplyAssets/ApplyRightLog";
import ApplyBackground from "../../lib/Assets/SVG/ApplyAssets/ApplyBackground";
import ApplyLeftBush from "../../lib/Assets/SVG/ApplyAssets/ApplyLeftBush";
// import ApplyRightBush from "../../lib/Assets/SVG/ApplyAssets/ApplyRightBush";

const Apply = () => {
  return (
    <>
      <div className="relative w-full mt-44 flex flex-col flex-none h-[68vh]">
        <div className="w-full h-full z-0">
          <ApplyBackground preserveAspectRatio="xMidYMid meet" />
        </div>

        <div className="absolute left-[50%] top-[-20%] z-10 flex justify-center items-center px-4 text-center">
          <div className="max-w-xl">
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

        <div className="absolute top-[-5%] left-0 max-w-[120%] z-31 invisible desktop:visible">
          <ApplyLeftBush className="w-[20%] h-[20%]" />
        </div>

        {/* <div className="absolute top-[-15%] right-[-2%] max-w-[120%] h-[120%] z-31 invisible desktop:visible">
          <ApplyRightBush className="w-full h-full" />
        </div> */}

        {/* <div className="absolute top-[-10%] left-0 max-w-[30%] h-[120%] z-31 invisible desktop:visible">
          <ApplyLeftLog className="w-full h-full" />
        </div> */}

        {/* <div className="absolute top-[-10%] right-0 max-w-[30%] h-[120%] z-31 invisible desktop:visible">
          <ApplyRightLog className="w-full h-full" />
        </div> */}
      </div>
    </>
  );
};

export default Apply;
