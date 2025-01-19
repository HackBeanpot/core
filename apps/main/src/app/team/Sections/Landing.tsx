"use client";
import { Section } from "@repo/ui";
import { useContentHeight, useWindowSize } from "@repo/util";
import Image from "next/image";
import React, { useRef } from "react";

const Landing = () => {
  const ref = useRef<HTMLImageElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  const [contentHeight, setContentHeight] = useContentHeight(ref);

  if (!windowHeight || !windowWidth) return;

  const content = (
    <div className="w-full h-full flex items-center justify-center font-Wilden text-[10rem] text-text-light [text-shadow:_0_10px_0_rgb(0_0_0_/_20%)]">
      Our Team
    </div>
  );

  const background = (
    <Image
      ref={ref}
      src={"/teams_landing.png"}
      alt={""}
      width={windowWidth}
      height={0}
      priority
      onLoad={() => setContentHeight(ref.current?.clientHeight || 0)}
    />
  );

  return (
    <Section
      name="team_landing"
      background={background}
      content={content}
      height={(contentHeight * 100) / windowHeight}
    />
  );
};

export default Landing;
