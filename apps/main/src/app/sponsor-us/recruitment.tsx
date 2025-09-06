"use client";

import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";
import React from "react";

type RecruitmentProps = {
  className?: string;
}

const RecruitmentBenefits: React.FC<RecruitmentProps> = ({ className }) => {
  const { isDesktop, isTablet, isMobile } = useDevice();

  const innerContainerStyles = clsx(
    "bg-teal rounded-2xl p-6 text-white w-[766px] h-auto",
    isTablet && "w-[600px] p-8",
    isMobile && "w-[65vw] rounded-xl",
  );

  const gridStyling = clsx(
    "grid gap-8",
    isMobile ? "" : "grid-cols-2",
  );

  const recruitmentPhotoStyles = clsx(
    "relative",
    isTablet && "top-20",
    isDesktop && "top-6",
  );  

  const h2Styles = clsx(
    "text-left font-GT-Walsheim-Trial font-medium ",
    isDesktop && "text-3xl mb-8",
    isMobile && "mb-2"
  );

  const h3Styles = clsx(
    "font-GT-Walsheim-Trial font-bold",
    isDesktop && "text-xl mb-2",
    isMobile && "text-xs mb-1"
  );

  const pStyles = clsx(
    "font-GT-Walsheim-Trial ",
    isDesktop && "text-md mb-6",
    isMobile && "text-xs"
  );

  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className={innerContainerStyles}>
        <h2 className={h2Styles}>
          How can sponsoring HackBeanpot help your company?
        </h2>
        <div className={gridStyling}>
          <div>
            <h3 className={h3Styles}>
              Recruitment
            </h3>
            <p className={pStyles}>
              Scout the next generation of talent here. Sponsoring HackBeanpot
              is a great way to expand and diversify your company&apos;s
              full-time, internship, co-op program&apos;s applicant pool!
            </p>
            {
              isMobile ? null :
                (<div className={recruitmentPhotoStyles}>
              <img
                src="/image.png"
                className="rounded-2xl"
                alt="Recruitment Photo"
              />
            </div>)
            }
            
          </div>
          <div>
            <h3 className={h3Styles}>
              Market your company & product
            </h3>
            <p className={pStyles}>
              Market your product and receive feedback by sponsoring a
              company-specific prize, hosting a workshop, giving a product demo,
              or mentoring hackers that are eager to hear your advice and
              implement your technologies for their projects.
            </p>
            {isMobile ? null : (<div className="relative">
              <img
                src="/image2.png"
                className="rounded-2xl mt-4"
                alt="HackBeanpot Hackers"
              />
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentBenefits;
