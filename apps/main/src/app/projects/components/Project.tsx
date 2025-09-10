"use client";

import Image from "next/image";
import React from "react";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";

interface ProjectProps {
  projectImage: string;
  projectName: string;
  award: string;
  members: string;
  description: string;
}

function Project({
  projectImage,
  projectName,
  award,
  members,
  description,
}: ProjectProps) {
  const { isDesktop, isTablet, isMobile } = useDevice();

  const projectCardStylesBG = clsx(
    "absolute bg-starlightBlue rounded-xl shadow-[inset_-15px_15px_0_rgba(0,0,0,0.25)]",
    isDesktop && "h-[50vh] w-[50vw]",
    isTablet && "",
    isMobile && "h-[65vh] w-[70vw]"
  );
  const projectCardStylesBorder = clsx(
    "absolute outline outline-[15px] outline-firecrackerRedLight outline-solid rounded-xl drop-shadow-[8px_8px_0_#CC322D]",
    isDesktop && "h-[50vh] w-[50vw]",
    isTablet && "",
    isMobile && "h-[65vh] w-[70vw]"
  );

  const cardStyles = clsx(
    "relative flex items-center justify-center z-0 p-4",
    isDesktop && "",
    isTablet && "",
    isMobile && ""
  );

  const cardContentStyles = clsx(
    "relative flex items-center justify-center z-10",
    isDesktop && "flex-row",
    isTablet && "",
    isMobile && ""
  );

  const imageStyles = clsx(
    "rounded-xl overflow-hidden",
    isDesktop && "h-[300px] w-[300px]",
    isMobile && "h-[200px] w-[200px]"
  );

  return (
    <div className={cardStyles}>
      {/* card content */}
      <div className={cardContentStyles}>
        <Image
          src={projectImage}
          height={200}
          width={200}
          alt={projectImage}
          className={imageStyles}
        />
        {/* description */}
        <div className="flex flex-col">
          <p className="font-NeulisNeue-Bold text-marigoldYellow mobile:text-3xl">{projectName}</p>
        </div>
      </div>
      <div className={projectCardStylesBorder}></div>
      <div className={projectCardStylesBG}></div>
    </div>
  );
}

export default Project;
