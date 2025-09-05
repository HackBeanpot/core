"use client"

import React from "react";
import RecruitmentBenefits from "./recruitment";
import SponsorUsBackground from "../lib/Assets/SVG/SponsorAssets/SponsorUsBackground";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";

const SponsorUsContent = () => {
  const { isDesktop } = useDevice();

  const bgStyles = clsx(
    "w-full",
    isDesktop && "h-full",
  );

  return (
    <>
      <div className="bg-eggshell w-full drop-shadow-[0_8px_0px_rgba(0,0,0,.1)]">
        <div className="mx-auto px-7 mobile:max-w-1xl tablet:max-w-6xl desktop:max-w-6xl mobile:py-6 tablet:py-12 desktop:py-12">
          <h1
            className="mobile:text-5xl tablet:text-7xl desktop:text-7xl mt-[1rem]
       text-teal font-Wilden-Regular
       mobile:mb-3 tablet:mb-8 desktop:mb-8"
          >
            SPONSOR US
          </h1>
          <p className="font-GT-Walsheim-Regular mobile:text-[16px] tablet:text-[26px] desktop:text-[26px] text-left leading-snug">
            Sponsors empower HackBeanpot in celebrating innovation, diversity,
            and inclusion in the tech community. HackBeanpot is a selective
            hackathon, drawing candidates from schools throughout Boston to
            propel passionate, committed, and motivated technologists to grow
            their skillset. We provide sponsors the ability to provide
            mentorship that will shape the lives of emerging individuals, as
            well as the opportunity to network and bond early on with our
            hackers to hone their aptitude and potential into professional
            careers in the long run.
          </p>
          <button
            className="p-3 px-8 bg-teal text-white font-GT-Walsheim-Regular rounded-full
       mobile:text-[14px] tablet:text-[22px] desktop:text-[22px]
       mobile:mt-5 tablet: mt-8 desktop:mt-8"
          >
            View Sponsorship Packet
          </button>
        </div>
      </div>

      <div className={bgStyles}>
        <SponsorUsBackground className="z-0" />
        <RecruitmentBenefits />
      </div>

      {/* <SponsorTestimonials /> */}
    </>
  );
};

export default SponsorUsContent;
