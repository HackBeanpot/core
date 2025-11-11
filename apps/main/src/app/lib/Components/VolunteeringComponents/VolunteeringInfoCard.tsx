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

export default function VolunteeringInfoCard({
  title,
  content,
  url,
}: InfoCardProps): React.ReactNode {
    const { isMobile } = useDevice();
    const cardStyles = clsx(
        "w-1/4", 
        isMobile && "w-3/4"
    );
  return (
    <div className={`bg-carouselCreamLight rounded-lg h-auto p-4 drop-shadow-lg font-NeulisNeue-Regular transform hover:scale-105 transition duration-300 ease-in-out ${cardStyles}`}>
      <div className="flex flex-row font-NeulisNeue-Bold text-2xl items-center gap-4">
        <ProjectStarIcon />
        <a
          href={url}
          className="flex flex-row items-center transform hover:scale-105 transition duration-300 ease-in-out"
        >
          {title}
          <TiChevronRight />
        </a>
      </div>
      <div className="mt-4">{content}</div>
    </div>
  );
}
