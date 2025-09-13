"use client";

import Image from "next/image";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
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

  const descRef = useRef<HTMLDivElement>(null);

  const [collapsedHeightPx, setCollapsedHeightPx] = useState<number>(0);

  useLayoutEffect(() => {
    const el = descRef.current;
    if (el) {
      const style = window.getComputedStyle(el);
      let lineHeight = parseFloat(style.lineHeight);
      if (isNaN(lineHeight)) {
        const fontSize = parseFloat(style.fontSize);
        lineHeight = fontSize * 1.2;
      }
      const linesToShow = 3;
      const collapseHeight = lineHeight * linesToShow;
      setCollapsedHeightPx(collapseHeight);

      const prevMax = el.style.maxHeight;
      el.style.maxHeight = "";
      const fullHeight = el.scrollHeight;

      el.style.maxHeight = prevMax;
      if (fullHeight > collapseHeight + 1) {
        setNeedsTruncation(true);
      } else {
        setNeedsTruncation(false);
      }
    }
  }, [description, isDesktop, isTablet, isMobile]);

  useEffect(() => {
    const handler = () => {
      const el = descRef.current;
      if (el) {
        const style = window.getComputedStyle(el);
        let lineHeight = parseFloat(style.lineHeight);
        if (isNaN(lineHeight)) {
          const fontSize = parseFloat(style.fontSize);
          lineHeight = fontSize * 1.2;
        }
        const collapseHeight = lineHeight * 3;
        setCollapsedHeightPx(collapseHeight);

        const prevMax = el.style.maxHeight;
        el.style.maxHeight = "";
        const fullHeight = el.scrollHeight;
        el.style.maxHeight = prevMax;
        if (fullHeight > collapseHeight + 1) {
          setNeedsTruncation(true);
        } else {
          setNeedsTruncation(false);
        }
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [description, isDesktop, isTablet, isMobile]);

  const baseSize = isDesktop
    ? "h-[50vh] w-[50vw]"
    : isTablet
      ? "h-[50vh] w-[60vw]"
      : "h-full w-[70vw]";

  const expandedSize = isDescExpanded
    ? isDesktop
      ? "h-[60vh] w-[50vw]"
      : isTablet
        ? "h-[95vh] w-[70vw]"
        : "h-[105%] w-[70vw]"
    : baseSize;



  const projectCardStylesBG = clsx(
    "absolute bg-starlightBlue rounded-xl shadow-[inset_-15px_15px_0_rgba(0,0,0,0.25)]",
    expandedSize,
  );
  const projectCardStylesBorder = clsx(
    "absolute outline outline-[15px] outline-firecrackerRedLight outline-solid rounded-xl drop-shadow-[8px_8px_0_#CC322D]",
    expandedSize,
  );

  const cardStyles = clsx(
    "relative flex items-center justify-center z-0 p-4",
    isDescExpanded && "z-20",
  );

  const cardContentStyles = clsx(
    "relative z-10 p-4 overflow-hidden",
    isDesktop &&
      clsx(
        "flex flex-row gap-[2.5vw]",
        isDescExpanded
          ? "h-auto w-[55vw] pr-24 overflow-hidden"
          : "h-[50vh] w-[50vw]",
      ),
    isTablet &&
      clsx(
        "flex flex-row gap-6 overflow-hidden",
        isDescExpanded
          ? "h-auto w-[60vw] "
          : "h-[50vh] w-[60vw]",
      ),
    isMobile &&
      clsx(
        "flex flex-col h-full overflow-hidden",
        isDescExpanded ? "h-auto w-[70vw]" : "h-[60vh] w-[70vw]",
      ),
  );

  return (
    <div className={cardStyles}>
      <div className={cardContentStyles}>
        <Image
          src={projectImage}
          height={400}
          width={400}
          alt={projectName}
          className={clsx(
            `z-10 rounded-xl object-cover aspect-square `,
            isDesktop &&
              `m-[2.5vh] ${isDescExpanded && "desktop-xl:w-[10vw] ml-[4vw] w-[20vw] self-start"}`,
            isTablet &&
              `my-[10vh] w-[30vw] ${isDescExpanded && "w-[30vw] aspect-square"}`,
            isMobile && `w-[50vw] place-self-center`,
          )}
        />
        <div
          className="flex flex-col place-self-center
            desktop-2xl:gap-6 desktopxl:gap-4 desktop:gap-2 tablet:gap-0 mobile-xl:gap-0
            desktop:pr-4 tablet:px-0 mobile-xl:px-2 mobile-xl:pt-2"
        >
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

          <div className="h-full mt-2 overflow-hidden">
            <div
              ref={descRef}
              className="font-DMSans-Regular text-white leading-relaxed desktop-2xl:text-2xl desktop-xl:text-xl mobile-xl:text-xs overflow-hidden transition-[max-height] duration-300 ease-in-out"
              style={{
                maxHeight: isDescExpanded
                  ? `${descRef.current?.scrollHeight}px`
                  : `${collapsedHeightPx}px`,
              }}
            >
              {description}
            </div>

            {needsTruncation && (
              <button
                onClick={() => setIsDescExpanded((prev) => !prev)}
            className="my-2 text-marigoldYellow font-bold flex items-center hover:underline"
                aria-expanded={isDescExpanded}
              >
                <span>{isDescExpanded ? "Read less -" : "Read more +"}</span>
              </button>
            )}

            <a href={url} className="mt-2">
              <Button
                color="marigoldYellow"
                text="View Project"
                size="medium"
              />
            </a>
          </div>
        </div>
      </div>

      <div className={projectCardStylesBorder}></div>
      <div className={projectCardStylesBG}></div>
    </div>
  );
}

export default Project;
