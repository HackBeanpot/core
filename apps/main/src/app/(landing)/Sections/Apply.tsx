"use client";

import React from "react";
import clsx from "clsx";
import useDevice from "@repo/util/hooks/useDevice";
import ApplyLeftLog from "../../lib/Assets/SVG/ApplyAssets/ApplyLeftLog";
import ApplyRightLog from "../../lib/Assets/SVG/ApplyAssets/ApplyRightLog";
import ApplyBackground from "../../lib/Assets/SVG/ApplyAssets/ApplyBackground";
import ApplyLeftBush from "../../lib/Assets/SVG/ApplyAssets/ApplyLeftBush";
import ApplyRightBush from "../../lib/Assets/SVG/ApplyAssets/ApplyRightBush";

const Apply = () => {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const containerStyles = clsx(
    "relative w-full flex flex-col flex-none",
    isMobile && "h-[40vh] -mt-2 -mb-20",
    isTablet && "h-[40vh] mt-10 -mb-[30%]",
    isDesktop && "h-[40vh] -mt-2 -mb-2"
  );

  const bgWrapperStyles = clsx("overflow-hidden", isMobile && "-mb-10");

  const bgInnerStyles = clsx(
    "h-full z-0",
    isMobile && "w-[300%] -translate-x-10",
    isTablet && "w-[160%] -translate-x-10 -translate-y-5",
    isDesktop && "w-[140%] -translate-x-10 -translate-y-5"
  );

  const messageStyles = clsx(
    "absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 z-10 flex items-center text-center",
    isMobile && "top-[40%]",
    isTablet && "top-[25%]",
    isDesktop && "top-[50%]"
  );

  const leftBushStyles = clsx(
    "absolute z-20",
    isMobile && "top-[20%] left-[-48%] w-[80%]",
    isTablet && "-top-[5%] left-[-35%] w-[65%] max-w-[120%] visible",
    isDesktop && "-top-[15%] left-[-28%] w-[55%] max-w-[120%] visible"
  );

  const rightBushStyles = clsx(
    "absolute z-20",
    isMobile && "top-[0%] right-[-40%] w-[75%]",
    isTablet && "top-[-20%] right-[-20%] w-[55%] max-w-[120%] visible",
    isDesktop && "top-[-30%] right-[-10%] w-[42%] max-w-[120%] visible"
  );

  const leftLogStyles = clsx(
    "absolute z-30",
    isMobile && "top-[30%] left-[-15%] w-[40%]",
    isTablet && "-top-[25%] -left-8 max-w-[30%] h-[120%] visible",
    isDesktop && "top-[10%] -left-8 max-w-[30%] h-[120%] visible"
  );

  const rightLogStyles = clsx(
    "absolute z-30",
    isMobile && "top-[30%] right-[-15%] w-[40%]",
    isTablet && "-top-[25%] -right-8 max-w-[30%] h-[120%] visible",
    isDesktop && "top-[10%] -right-8 max-w-[30%] h-[120%] visible"
  );

  return (
    <div className={containerStyles}>
      <div className={bgWrapperStyles}>
        <div className={bgInnerStyles}>
          <ApplyBackground preserveAspectRatio="xMidYMid meet" />
        </div>
      </div>

      <div className={messageStyles}>
        <div className="max-w-2xl">
          <p className="text-md tablet:text-[20px] desktop:text-2xl desktop:text-3xl font-GT-Walsheim-Regular">
            Applications have not been released for HackBeanpot 2026. Check in
            with us again this fall!
          </p>
          <div className="pt-8">
            <button
              onClick={() =>
                alert(
                  "Applications for HackBeanpot 2026 have not been released. Check in with us again this fall!"
                )
              }
              className="p-3 bg-[#84AF67] text-text-light rounded-full drop-shadow-md w-32 tablet:w-44 h-12 tablet:h-14 text-md tablet:text-2xl hover:scale-110 transition-transform transition-duration-300"
            >
              Apply here
            </button>
          </div>
        </div>
      </div>

      <div className={leftBushStyles}>
        <ApplyLeftBush className="w-full h-full" />
      </div>

      <div className={rightBushStyles}>
        <ApplyRightBush className="w-full h-full" />
      </div>

      <div className={leftLogStyles}>
        <ApplyLeftLog className="w-full h-full" />
      </div>

      <div className={rightLogStyles}>
        <ApplyRightLog className="w-full h-full" />
      </div>
    </div>
  );
};

export default Apply;
