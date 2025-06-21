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
        className="tablet:object-cover object-contain"
        sizes="100vw"
        style={{ objectPosition: "center 0%" }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 top-[-75%] tablet:top-0">
        <span className="font-Wilden text-[3rem] tablet:text-[10rem] text-text-light text-center [text-shadow:_0_10px_0_rgb(0_0_0_/_20%)] leading-tight">
          Our Team
        </span>
      </div>
    </div>
  );
};

export default Landing;
