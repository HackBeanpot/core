"use client";

import Image from "next/image";
import React from "react";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";
import { ProjectStarIcon } from "../../lib/Assets/SVG";

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
    "relative flex items-center justify-center z-0 p-4 ",
    isDesktop && "",
    isTablet && "",
    isMobile && ""
  );

  const cardContentStyles = clsx(
    "relative grid z-10 ",
    isDesktop &&
      "grid-cols-2 grid-rows-1 content-start gap-10 h-[50vh] w-[50vw]",
    isTablet && "",
    isMobile && "grid-rows-2 h-[65vh] w-[70vw]"
  );

  const imageStyles = clsx(
    "rounded-xl overflow-hidden",
    isDesktop && "h-[300px] w-[300px] place-self-center",
    isMobile && "h-[200px] w-[200px] place-self-center"
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
        <div className="flex flex-col desktop:py-16 desktop:pr-4 mobile-xl:px-6 mobile-xl:">
          <div className="flex flex-row gap-2 items-center">
            <ProjectStarIcon className="mobile-xl:w-[7vw]"/>
            <p className="font-NeulisNeue-Bold text-marigoldYellow desktop:text-3xl mobile-xl:text-xl">
              {projectName}
            </p>
          </div>
          <p className="font-DMSans-Regular text-white opacity-75 text-wrap desktop:pt-1 mobile-xl:text-xs">{members}</p>
          <p className="font-DMSans-Regular text-white pt-1">{description}</p>
          {award}
        </div>
      </div>
      <div className={projectCardStylesBorder}></div>
      <div className={projectCardStylesBG}></div>
      
    </div>
  );
}

export default Project;
