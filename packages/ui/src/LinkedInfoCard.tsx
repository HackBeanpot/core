"use client";

import React from "react";
import { ProjectStarIcon } from "../../Assets/SVG";
import { TiChevronRight } from "react-icons/ti";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";

export type InfoCardProps = {
  title: string;
  content: string;
  url: string;
};

export default function LinkedInfoCard({
  title,
  content,
  url,
}: InfoCardProps): React.ReactNode {
  const { isMobile, isTablet } = useDevice();
  const cardStyles = clsx("w-1/4", isTablet && "w-[50vw]", isMobile && "w-3/4");
  return (
    <div
      className={`bg-carouselCreamLight rounded-lg h-auto p-5 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.10)] font-NeulisNeue-Regular transform hover:scale-105 transition duration-300 ease-in-out ${cardStyles}`}
    >
      <div className="flex flex-row font-NeulisNeue-Bold text-xl items-center gap-3">
        <ProjectStarIcon />
        <a
          href={url}
          className="flex flex-row items-center transform hover:scale-105 transition duration-300 ease-in-out text-charcoalFogDark"
        >
          {title}
          <TiChevronRight />
        </a>
      </div>
      <div className="mt-3 font-DMSans-Regular text-charcoalFogDark">
        {content}
      </div>
    </div>
  );
}
