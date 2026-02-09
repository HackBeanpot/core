"use client";
import React from "react";
import OurTeamGrid from "./OurTeamGrid";
import RibbonTitle from "@repo/ui/RibbonTitle";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";

export default function OurTeam(): React.ReactNode {
  const { isDesktop, isTablet, isMobile } = useDevice();

  const innerStyles = clsx(
    "font-NeulisNeue-Regular flex flex-col gap-10 items-center justify-center",
    isDesktop && "py-16 desktop:px-44 desktop-xl:px-80",
    isTablet && "px-28",
  );

  const ribbonStyles = clsx(
    isDesktop && "scale-100",
    isTablet && "scale-75",
    isMobile && "scale-[60%]",
  );

  const blurbStyles = clsx(
    "flex flex-col bg-carouselCreamLight rounded-3xl gap-2 drop-shadow-[0_6px_0px_rgba(0,0,0,0.25)] p-8",
    isDesktop && "w-3/4",
  );

  return (
    <div className="relative bg-mossGreenDark w-full h-full py-20" id="team">
      <div className={innerStyles}>
        <div className={ribbonStyles}>
          <RibbonTitle text={"OUR TEAM"} />
        </div>
        <div className={blurbStyles}>
          <h1 className="font-NeulisNeue-Bold text-firecrackerRed text-[24px]">
            Need to reach out to a core member?
          </h1>
          <p className="font-DM-Sans-Regular">
            Feel free to reach out to a core member via Discord if you have any
            questions or concerts about event logistics, applying to be part of
            the HBP core team, or more!
          </p>
        </div>
        <OurTeamGrid />
      </div>
    </div>
  );
}
