"use client";

import React from "react";
import SponsorUsBenefitLegs from "../../lib/Assets/SVG/SponsorUsAssets/SponsorUsBenefitLegs";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";

export type SponsorUsBenefitCardProps = {
  title: string;
  content: React.ReactNode;
};

export default function SponsorUsBenefitCardComp({
  title,
  content,
}: SponsorUsBenefitCardProps) {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const cardStylesBG = clsx(
    "absolute bg-starlightBlue rounded-xl shadow-[inset_-15px_15px_0_rgba(0,0,0,0.25)]",
    isDesktop && "w-[35vw] h-[18vw]",
    isTablet && "w-[50vw] h-[30vw]",
    isMobile && "w-[85vw] h-[60vw]",
  );
  const cardStylesBorder = clsx(
    "absolute outline outline-[15px] outline-firecrackerRedLight outline-solid rounded-xl drop-shadow-[8px_8px_0_#CC322D]",
    isDesktop && "w-[35vw] h-[18vw]",
    isTablet && "w-[50vw] h-[30vw]",
    isMobile && "w-[85vw] h-[60vw]",
  );

  const contentStyles = clsx(
    "relative z-10 text-white",
    isDesktop && "p-12",
    isTablet && "p-8",
    isMobile && "p-5",
  );

  const legStyles = clsx(
    "absolute z-0",
    isDesktop && "top-[18vw] -left-[9vw] desktop-xl:-left-[5vw]",
    isTablet && "top-[30vw] -left-[6.5vw]",
    isMobile && "top-[60vw] -left-[10vw]",
  );

  return (
    <div className="relative flex flex-col">
      <div className="relative">
        <div className={legStyles}>
          <SponsorUsBenefitLegs className="mobile:w-[90vw] mobile:h-[8vh] tablet:w-[55vw] w-[40vw]" />
        </div>

        <div className={cardStylesBG}>
          <div className={cardStylesBorder}></div>
          <div className={contentStyles}>
            <h3 className="font-NeulisNeue-Bold text-lg desktop-xl:text-2xl">
              {title}
            </h3>
            <div className="font-NeulisNeue-Regular text-sm desktop-xl:text-lg">
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
