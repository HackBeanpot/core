"use client";

import React, { useState, useCallback, useEffect } from "react";
import Train from "./Train";
// import TrainTracks from "./TestimonialAssets/TrainTracks";
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
  const { isMobile, isTablet } = useDevice();
  const [pixelPos, setPixelPos] = useState(1400);
  const [boundsID, setBoundsID] = useState(2);

  const currBounds = deviceBounds[boundsID];

  useEffect(() => {
    setBoundsID(isMobile ? 0 : isTablet ? 1 : 2);
  }, [isMobile, isTablet]);

  const handleLeftClick = useCallback(() => {
    if (pixelPos > currBounds.leftBound + currBounds.threshold) {
      setPixelPos((prev) => prev - currBounds.threshold);
    }
  }, [pixelPos, currBounds]);

  const handleRightClick = useCallback(() => {
    if (pixelPos < currBounds.rightBound) {
      setPixelPos((prev) => prev + currBounds.threshold);
    }
    // console.log(pixelPos);
  }, [pixelPos, currBounds]);

  return (
    <div className="flex max-w-screen h-[400px]">
      <div className="relative overflow-hidden w-screen z-10 bg-tomato p-12">
        <Train
          className={`h-full transition-transform ease-in-out duration-300`}
          style={{ transform: `translateX(-${pixelPos}px)` }}
        />
      </div>
      {/* <div className="relative w-full">
        <TrainTracks className="absolute z-10 bottom-10 w-fit" />
      </div> */}
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
