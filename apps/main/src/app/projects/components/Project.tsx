"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";
import Button from "@repo/ui/Button";
import { ProjectStarIcon } from "../../lib/Assets/SVG";

interface ProjectProps {
  projectImage: string;
  projectName: string;
  url: string;
  members: string;
  description: string;
}

function Project({
  projectImage,
  projectName,
  url,
  members,
  description,
}: ProjectProps) {
  const { isDesktop, isTablet, isMobile } = useDevice();

  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  
  const checkOverflow = useCallback(() => {
    if (descRef.current) {
      const el = descRef.current;
      if (el.scrollHeight > el.clientHeight) {
        setNeedsTruncation(true);
        setIsDescExpanded(false); // TODO: rm this, just to prevent build failure
      } else {
        setNeedsTruncation(false);
      }
    }
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [description, isDescExpanded, checkOverflow]);

  useEffect(() => {
    const handleResize = () => {
      checkOverflow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [checkOverflow]);

  const baseSize = isDesktop
    ? "h-[50vh] w-[50vw]"
    : isTablet
      ? "h-[50vh] w-[60vw]"
      : "h-[70vh] w-[70vw]";

  // TODO: use this expandedSize for expanded view if needed
  // const expandedSize = isDescExpanded
  //   ? isDesktop
  //     ? "h-[65vh] w-[50vw]"
  //     : isTablet
  //     ? "h-[75vh] w-[60vw]"
  //     : "h-[90vh] w-[70vw]"
  //   : baseSize;

  const expandedSize = isDescExpanded
    ? isDesktop
      ? "h-[50vh] w-[50vw]"
      : isTablet
        ? "h-[50vh] w-[60vw]"
        : "h-[65vh] w-[70vw]"
    : baseSize;

  const projectCardStylesBG = clsx(
    "absolute bg-starlightBlue rounded-xl shadow-[inset_-15px_15px_0_rgba(0,0,0,0.25)]",
    expandedSize
  );
  const projectCardStylesBorder = clsx(
    "absolute outline outline-[15px] outline-firecrackerRedLight outline-solid rounded-xl drop-shadow-[8px_8px_0_#CC322D]",
    expandedSize
  );

  const cardStyles = clsx(
    "relative flex items-center justify-center z-0 p-4",
    isDescExpanded && "z-20"
  );

  const cardContentStyles = clsx(
    "relative z-10 p-4 overflow-hidden",
    isDesktop &&
      clsx(
        " flex flex-row gap-[5vw]",
        isDescExpanded ? "h-[55vh] w-[55vw]" : "h-[50vh] w-[50vw]"
      ),
    isTablet &&
      clsx(
        "flex flex-row gap-6",
        isDescExpanded ? "h-[55vh] w-[65vw]" : "h-[50vh] w-[60vw]"
      ),
    isMobile &&
      clsx(
        "flex flex-col h-full",
        isDescExpanded ? "h-[90vh] w-[70vw]" : "h-[65vh] w-[70vw]"
      )
  );

  return (
    <div className={cardStyles}>
      <div className={cardContentStyles}>
        <Image
          src={projectImage}
          height={500}
          width={500}
          alt={projectName}
          className={clsx(
            "relative rounded-xl object-cover aspect-square w-full h-auto m-[2.5vh]",
            isDesktop && "",
            isTablet && "my-[10vh]",
            isMobile && "place-self-center"
          )}
        />
        {/* description */}
        <div className="flex flex-col place-self-center 
        desktop-2xl:gap-6 desktopxl:gap-4 desktop:gap-2 tablet:gap-0 mobile-xl:gap-0
        desktop:pr-4 tablet:px-0 mobile-xl:px-2 mobile-xl:py-0">

          <div className="flex flex-row gap-2 items-center">
            <ProjectStarIcon className="mobile-xl:w-[7vw]" />
            <p
              className="font-NeulisNeue-Bold text-marigoldYellow 
            desktop-2xl:text-7xl desktop-xl:text-5xl desktop:text-3xl mobile-xl:text-xl"
            >
              {projectName}
            </p>
          </div>
          <p
            className="font-DMSans-Regular text-white opacity-75 text-wrap 
          desktop:pt-1
          desktop-2xl:text-2xl desktop-xl:text-xl tablet:text-xs mobile-xl:text-xs"
          >
            {members}
          </p>

          <div>
            <p
              ref={descRef}
              className={clsx(
                "font-DMSans-Regular text-white pt-1 leading-relaxed desktop-2xl:text-2xl desktop-xl:text-xl mobile-xl:text-xs",
                !isDescExpanded && "overflow-hidden line-clamp-3"
              )}
            >
              {description}
            </p>
            {/* TODO: maybe? implement expanded view & closure */}
            {needsTruncation && (
              // <button
              //   onClick={() => setIsDescExpanded(prev => !prev)}
              //   className="mt-1 text-marigoldYellow font-bold hover:underline"
              // >
              //   {isDescExpanded ? "Read less -" : "Read more +"}
              // </button>
              <button
                onClick={() => {
                  window.open(url);
                }}
                className="mt-1 text-white font-bold hover:underline"
              >
                Read more +
              </button>
            )}
          </div>

          <a
            href={url}
            className="mt-2"
          >
            <Button color="marigoldYellow" text="View Project" size="medium" />
          </a>
        </div>
      </div>

      <div className={projectCardStylesBorder}></div>
      <div className={projectCardStylesBG}></div>
    </div>
  );
}

export default Project;
