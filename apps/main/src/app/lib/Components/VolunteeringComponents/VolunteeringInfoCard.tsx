"use client";

import React from "react";
import { ProjectStarIcon } from "../../Assets/SVG";
import { TiChevronRight } from "react-icons/ti";

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
  return (
    <div className="bg-carouselCreamLight rounded-lg w-1/4 h-auto p-4 drop-shadow-lg font-NeulisNeue-Regular transform hover:scale-105 transition duration-300 ease-in-out">
      <div className="flex flex-row font-NeulisNeue-Bold text-2xl items-center gap-4">
        <ProjectStarIcon />
              <a href={url} className="flex flex-row items-center transform hover:scale-105 transition duration-300 ease-in-out">
          {title}
          <TiChevronRight />
        </a>
      </div>
      <div className="mt-4">{content}</div>
    </div>
  );
}
