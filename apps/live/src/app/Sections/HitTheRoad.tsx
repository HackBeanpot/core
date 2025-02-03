"use client";

import React from "react";
import { Section } from "@repo/ui";
// import useIsMobile from "@repo/util/hooks/useIsMobile";
import Road from "../lib/Assets/SVG/Road";

export default function HitTheRoad(): JSX.Element {
  //const isMobile = useIsMobile();

  const background = (
    <div className="w-full h-full bg-[#F2E6D7]">
      <div className="ml-[15%] h-[auto] w-[88vw]">
        <Road />
      </div>
    </div>
  );

  const content = <div className="w-full h-full"></div>;

  return (
    <Section
      name={"Hit The Road!"}
      background={background}
      content={content}
      height={90}
    />
  );
}
