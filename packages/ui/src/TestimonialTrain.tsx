"use client";

import React, { useState, useCallback } from "react";
import Train from "./Train";
import Button from "./Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useDevice from "@repo/util/hooks/useDevice";
// import clsx from "clsx";

const deviceBounds = [
  { leftBound: 0, rightBound: 1400, threshold: 500 }, // isMobile
  { leftBound: 0, rightBound: 1400, threshold: 600 }, // isTablet
  { leftBound: 0, rightBound: 1400, threshold: 650 }, // isDesktop
];

export default function TestimonialTrain() {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const [pixelPos, setPixelPos] = useState(1400);
  const [boundsID, setBoundsID] = useState(2);

  const currBounds = deviceBounds[boundsID];

  const handleBounds = useCallback(() => {
    setBoundsID(isMobile ? 0 : isTablet ? 1 : 2);
  }, [isMobile, isTablet, isDesktop]);

  const handleLeftClick = useCallback(() => {
    if (pixelPos > currBounds.leftBound) {
      setPixelPos((prev) => prev - currBounds.threshold);
    }
    // console.log(pixelPos + " - threshold: " + currBounds.threshold);
  }, [pixelPos]);

  const handleRightClick = useCallback(() => {
    if (pixelPos < currBounds.rightBound) {
      setPixelPos((prev) => prev + currBounds.threshold);
    }
    // console.log(pixelPos);
  }, [pixelPos]);

  return (
    <div className="flex max-w-screen h-[400px]">
      <div className="relative overflow-hidden w-screen z-0 bg-tomato">
        <Train
          className={`h-full transition-transform ease-in-out duration-300`}
          style={{ transform: `translateX(-${pixelPos}px)` }}
        />
      </div>
      {/* top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 */}
      <div className="absolute w-full z-10 self-center">
        <div className="flex flex-row items-center justify-center gap-[550px]">
          <Button
            color="ribbonBlue"
            textColor="starlightBlue"
            icon={<IoIosArrowBack size={28} />}
            removePadding={true}
            onClick={handleLeftClick}
          />
          <Button
            color="ribbonBlue"
            textColor="starlightBlue"
            icon={<IoIosArrowForward size={28} />}
            removePadding={true}
            onClick={handleRightClick}
          />
        </div>
      </div>
    </div>
  );
}
