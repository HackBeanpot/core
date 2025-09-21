"use client";

import React, { useEffect, useRef, useState, useCallback} from "react";
import Train from "./Train";
import Button from "./Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import clsx from "clsx";

export default function TestimonialTrain() {
const [pixelPos, setPixelPos] = useState(-1400);

  const handleLeftClick = useCallback(() => {
    setPixelPos(prev => prev + 700);
    // console.log(pixelPos);
  }, []);

  const handleRightClick = useCallback(() => {
    setPixelPos(prev => prev - 700);
    // console.log(pixelPos);
  }, []);

  useEffect(() => {
    console.log(pixelPos);
  }, [pixelPos]);

  return (
    <div className="flex max-w-screen h-[400px]">
      <div className="relative overflow-hidden w-screen z-0 bg-tomato">
          <Train 
              className={`h-full transition-transform translate-x-[${pixelPos}px] ease-in-out duration-300`}
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
                  onClick={() => handleLeftClick()}
              />
              <Button 
                  color="ribbonBlue"
                  textColor="starlightBlue"
                  icon={<IoIosArrowForward size={28} />}    
                  removePadding={true}
                  onClick={() => handleRightClick()}
              />
          </div>
      </div>
    </div>
  );
}
