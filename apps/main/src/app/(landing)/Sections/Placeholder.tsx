"use client";

import React from "react";
import LeftCloud from "../../lib/Assets/SVG/PlaceholderAssets/LeftCloud";
import RightCloud from "../../lib/Assets/SVG/PlaceholderAssets/RightCloud";
import LargeSign from "../../lib/Assets/SVG/PlaceholderAssets/LargeSign";

const InputBox: React.FC = () => {
  return (
    <div className="grid grid-cols-2">
      <input
        className="font-DMSans-Regular text-white rounded-lg w-[24vw] h-[6vh] border border-heather border-8"
        placeholder="Start your journey..."
      />
      <button className="hover:scale-105 transition-transform transition-duration-700 hover:bg-darkSeaFoam font-DMSans-Medium text-bold bg-seaFoam text-white rounded-lg w-[7vw] h-[6vh]">
        Notify Me
      </button>
    </div>
  );
};

export default function Placeholder(): React.ReactNode {
  return (
    <div className="relative bg-gradient-to-b from-skyBlue to-sunnyBlue h-screen w-screen">
      <div className="absolute top-[10%]">
        <LeftCloud />
      </div>
      <div className="absolute right-0 top-[50%]">
        <RightCloud />
      </div>

      <div className="absolute left-0 top-[30%] grid grid-cols-5">
        <LargeSign className="col-span-2" />
        <div className="col-span-3 grid grid-rows-4 mr-28">
          <h3 className="font-Wilden text-pavement text-6xl row-span-2">
            {
              "IT MIGHT BE THE END OF THE ROAD, BUT IT'S JUST THE START OF YOUR JOURNEY!"
            }
          </h3>
          <p className="font-DMSans-Medium mt-4 text-xl">
            Get notified when applications open!
          </p>
          <InputBox />
        </div>
      </div>
    </div>
  );
}
