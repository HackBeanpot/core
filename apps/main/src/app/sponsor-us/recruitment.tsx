"use client";

import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";
import React from "react";

const RecruitmentBenefits = () => {
  const { isDesktop, isTablet, isMobile } = useDevice();

  const innerContainerStyles = clsx(
    "bg-teal rounded-2xl p-6 text-white w-[866px] h-auto",
    isTablet && "w-[600px] p-8",
    isMobile && "min-w-[300px] max-w-[350px]",
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

  return (
    <div className="z-10 w-full flex items-center justify-center">
      <div className={innerContainerStyles}>
        <h2 className="text-left text-3xl font-GT-Walsheim-Trial font-medium mb-8">
          How can sponsoring HackBeanpot help your company?
        </h2>
        <div className={gridStyling}>
          <div>
            <h3 className="text-xl font-GT-Walsheim-Trial mb-2 font-bold">
              Recruitment
            </h3>
            <p className="font-GT-Walsheim-Trial text-md mb-6">
              Scout the next generation of talent here. Sponsoring HackBeanpot
              is a great way to expand and diversify your company&apos;s
              full-time, internship, co-op program&apos;s applicant pool!
            </p>
            <div className={recruitmentPhotoStyles}>
              <img
                src="/image.png"
                className="rounded-2xl"
                alt="Recruitment Photo"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-GT-Walsheim-Trial mb-2 font-bold">
              Market your company & product
            </h3>
            <p className="font-GT-Walsheim-Trial text-md mb-6">
              Market your product and receive feedback by sponsoring a
              company-specific prize, hosting a workshop, giving a product demo,
              or mentoring hackers that are eager to hear your advice and
              implement your technologies for their projects.
            </p>
            <div className="relative">
              <img
                src="/image2.png"
                className="rounded-2xl"
                alt="HackBeanpot Hackers"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentBenefits;
