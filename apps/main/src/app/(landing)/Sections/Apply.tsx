"use client";

import React from "react";
import ApplyLeftLog from "../../lib/Assets/SVG/ApplyAssets/ApplyLeftLog";
import ApplyRightLog from "../../lib/Assets/SVG/ApplyAssets/ApplyRightLog";

const Apply = () => {
  return (
    <>
      <div className="w-full py-48 bg-[url(/apply_background.svg)] bg-cover bg-center flex flex-row justify-center items-center">
        {/* so that when we're not in desktop, logs are no longer visible */}
        <div className="invisible desktop:visible">
          <ApplyLeftLog />
        </div>

        <div className="w-full h-full relative w-1/2 flex flex-col justify-center text-center items-center text-2xl tablet:desktop:text-3xl desktop:text-4xl pb-7 font-GT-Walsheim-Regular">
          <p>
            Applications have not been released for HackBeanpot 2026. Check in with us again this fall!
          </p>
          <div className="pt-10">
            {/* <button
              onClick={() => alert("apply not implemented yet")}
              className="p-3 bg-[#84AF67] text-text-light rounded-full drop-shadow-md w-44 h-14 text-2xl"
            >
              Apply here
            </button> */}
          </div>
        </div>
        <div className="invisible desktop:visible">
          <ApplyRightLog />
        </div>
      </div>
    </>
  );
};

export default Apply;
