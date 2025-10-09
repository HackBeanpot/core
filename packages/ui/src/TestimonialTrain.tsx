"use client";

import React, { useState, useCallback, useEffect } from "react";
import Train from "./Train";
import TrainTracks from "./TestimonialAssets/TrainTracks";
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
    if (pixelPos < currBounds.rightBound) {
      setPixelPos((prev) => prev + currBounds.threshold);
    }
  }, [pixelPos, currBounds]);

  return (
    <div className="relative w-full h-[400px] bg-tomato">
      <div className="relative overflow-hidden w-screen z-10 p-10">
        <Train
          className={`h-full transition-transform ease-in-out duration-300`}
          style={{ transform: `translateX(-${pixelPos}px)` }}
        />
      </div>
      <div className="absolute w-full z-20 h-1/2 self-center">
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
      <div className="absolute w-full z-0 bottom-10">
        <TrainTracks />
      </div>
    </div>
  );
}
