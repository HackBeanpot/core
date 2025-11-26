"use client";

import React, { useState, useCallback, useEffect } from "react";
import Train from "./Train";
import Button from "./Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useDevice from "@repo/util/hooks/useDevice";
// import clsx from "clsx";

export default function TestimonialTrain() {
  const { isDesktop } = useDevice();

  const numCarts = 4;
  const [currCart, setCurrCart] = useState(1);

  const startingPos = isDesktop ? -59.7 : -63;
  const [pixelPos, setPixelPos] = useState(startingPos);

  useEffect(() => {
    setPixelPos(startingPos);
  }, [startingPos]);

  const currBounds = { leftBound: 0, rightBound: 10000, threshold: 21.7 };

  const handleLeftClick = useCallback(() => {
    if (currCart < numCarts) {
      setPixelPos((prev) => prev + currBounds.threshold);
      setCurrCart((prev) => prev + 1);
    }
  }, [currCart, currBounds.threshold]);

  const handleRightClick = useCallback(() => {
    if (currCart > 1) {
      setPixelPos((prev) => prev - currBounds.threshold);
      setCurrCart((prev) => prev - 1);
    }
  }, [currCart, currBounds.threshold]);

  return (
    <div className={`relative w-full ${isDesktop ? "h-[45vw]" : "h-[60vw]"}`}>
      <div
        className={`relative ${isDesktop ? "w-[300vw]" : "w-[400vw]"} h-full z-10 p-[3vw]`}
      >
        <Train
          className={`transition-transform ease-in-out duration-300`}
          style={{ transform: `translateX(${pixelPos}%)` }}
        />
      </div>
      <div className="absolute w-full z-20 top-1/2 trans self-center">
        <div
          className={`
              absolute
              flex flex-row items-center justify-center
              ${isDesktop ? "gap-[65vw]" : "gap-[75vw]"}
              w-full
              h-auto`}
        >
          <Button
            color="ribbonBlue"
            textColor="starlightBlue"
            icon={<IoIosArrowBack size={"4vw"} />}
            removePadding={true}
            onClick={handleLeftClick}
          />
          <Button
            color="ribbonBlue"
            textColor="starlightBlue"
            icon={<IoIosArrowForward size={"4vw"} />}
            removePadding={true}
            onClick={handleRightClick}
          />
        </div>
      </div>
    </div>
  );
}
