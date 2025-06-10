"use client";
import useWindowSize from "@repo/util/hooks/useWindowSize";
import Image from "next/image";
import React, { useRef } from "react";

const Landing = () => {
  const ref = useRef<HTMLImageElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  if (!windowHeight || !windowWidth) return null;

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center z-10">
      <Image
        ref={ref}
        src={"/teams_landing.png"}
        alt=""
        fill
        priority
        className="object-cover z-0"
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="font-Wilden text-[10rem] text-text-light [text-shadow:_0_10px_0_rgb(0_0_0_/_20%)]">
          Our Team
        </span>
      </div>
    </div>
  );
};

export default Landing;
