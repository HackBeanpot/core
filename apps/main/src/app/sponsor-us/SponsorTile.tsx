"use client";

import React from "react";
import useDevice from "@repo/util/hooks/useDevice";
import clsx from "clsx";

type SponsorProps = {
  title: string;
  titleAlign: string;
  containerDimensions?: {
    width?: string;
    height?: string;
  };
  content: React.ReactNode;
  className?: string;
};

export default function SponsorTile(props: SponsorProps): React.ReactNode {
  const { isMobile, isTablet } = useDevice();

  const containerWidth = props.containerDimensions?.width ?? "";
  const containerHeight = props.containerDimensions?.height ?? "";

  const titleClasses = `${props.titleAlign} text-2xl font-GT-Walsheim-Trial font-medium mb-6`;

  const containerStyling = clsx(
    "bg-eggshell rounded-2xl p-6 text-[#7D6950] w-[666px] scale-100 mt-20 mb-20",
    isTablet && "p-8 w-[500px]",
    isMobile && "w-[375px]",
    containerWidth,
    containerHeight == "" ? "h-auto" : containerHeight,
  );

  const dividerStyling = clsx(
    "bg-[#7D6950] opacity-50 h-[1.5px] -ml-6 -mr-6  mb-6",
    isTablet && "-ml-8 -mr-8",
  );

  const contentStyling = clsx("mb-2");

  return (
    <div className={`${containerStyling} ${props.className}`}>
      <h6 className={titleClasses}>{props.title}</h6>
      <div className={dividerStyling} />
      <div className={contentStyling}>{props.content}</div>
    </div>
  );
}
