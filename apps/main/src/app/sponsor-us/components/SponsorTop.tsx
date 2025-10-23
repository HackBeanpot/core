"use client";

import React from "react";
import Button from "@repo/ui/Button";
import TopBackground from "./TopBackground.tsx";
import BoxWithText from "./BoxWithText.tsx";

const SponsorTop = () => {
  return (
    <div className="relative flex flex-col items-center mobile:pt-20 desktop:pt-40">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <TopBackground />
      </div>

      {/* Title */}
      <div
        className="self-stretch text-center justify-center text-firecrackerRedDark 
        font-Sancreek-Regular text-heading leading-[96px] 
        text-shadow [text-stroke:2px_#F2E06F] [-webkit-text-stroke:2px_#F2E06F]"
      >
        SPONSOR US
      </div>

      {/* Added more margin between title and box */}
      <div className="mobile:mt-10 desktop:mt-20">
        <BoxWithText />
      </div>

      {/* Button */}
      <div className="mt-10">
        <Button
          text="View Sponsorship Packet"
          textColor="white"
          color="firecrackerRed"
          size="medium"
          onClick={() =>
            window.open("https://archive.hackbeanpot.com/", "_blank")
          }
        />
      </div>
    </div>
  );
};

export default SponsorTop;
