"use client";

import React from "react";
import useDevice from "@util/hooks/useDevice.ts";

export default function JudgingInactive(): React.ReactNode {
  const { isMobile } = useDevice();

  return (
    <div>
      <h1
        className="absolute w-full font-NeulisNeue-Bold text-marigoldYellow flex flex-col items-center"
        style={{
          fontSize: isMobile ? "2.8vw" : "1.7vw",
          top: isMobile ? "55%" : "45%",
        }}
      >
        Come back after submissions close
        <br />
        to see where you will be demoing!
      </h1>
    </div>
  );
}
