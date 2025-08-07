"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { MobileContext } from "../providers";

const SponsorsBackground = () => {
  const { isMobile } = useContext(MobileContext);

  return (
    <div className="w-full h-full overflow-visible">
      <Image
        alt="Sponsors Background"
        src={
          isMobile
            ? "/sponsors_background.svg"
            : "/sponsors_background_mobile.svg"
        }
        fill
        className="object-cover"
      />
      <Image
        alt="Sponsors Arrow"
        src={"/sponsors_arrow.svg"}
        width={1000}
        height={100}
        className="object-cover absolute left-0"
      />
    </div>
  );
};

export default SponsorsBackground;
