"use client";

import React from "react";
import RecruitmentBenefits from "./recruitment";
import SponsorUsBackground from "../lib/Assets/SVG/SponsorAssets/SponsorUsBackground";
import SponsorUsBackgroundMobile from "../lib/Assets/SVG/SponsorAssets/SponsorUsBackgroundMobile";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";
import RecruitmentStats from "./RecruitmentStats";
import SponsorTestimonialSection from "./SponsorTestimonials";
import SponsorTile from "./SponsorTile";

const SponsorUsContent = () => {
  const { isDesktop, isMobile } = useDevice();

  const bgStyles = clsx(
    "w-full relative z-0",
    isDesktop && "",
    isMobile && "h-[200%]",
  );
  const sponsorPerksStyles = clsx(
    "",
    isDesktop && "absolute top-[90%] left-[10vw]",
    isMobile && "absolute top-[200vh] scale-50",
  );

  const pastSponsorStyles = clsx(
    "",
    isDesktop && "absolute top-[110%] right-[10vw]",
    isMobile && "scale-50 absolute top-[240vh]",
  );

  return (
    <>
      <div className="bg-eggshell w-full drop-shadow-[0_8px_0px_rgba(0,0,0,.1)] z-10">
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
        {/*  */}
        {isMobile ? (
          <SponsorUsBackgroundMobile className="absolute z-0" />
        ) : (
          <SponsorUsBackground className="absolute z-0" />
        )}
        <div className="flex flex-col space-y-80 items-center justify-center mt-44">
          <RecruitmentStats className="z-10 scale-125" />
          <RecruitmentBenefits
            className={
              isMobile ? "absolute top-[60vh] z-10 scale-125" : "z-10 scale-125"
            }
          />
          <SponsorTestimonialSection
            className={
              isMobile ? "absolute top-[130vh] z-10 scale-125" : "z-10"
            }
          />

          <div className={sponsorPerksStyles}>
            <SponsorTile
              title={"Sponsorship Perks"}
              titleAlign={""}
              content={
                <div>
                  <ul className="list-disc list-inside indent-6">
                    <li>
                      Hacker resumes (filtered by career interests or
                      experience)
                    </li>
                    <li>Sponsoring a company specific prize</li>
                    <li>Onsite interviews</li>
                    <li>A spot in our career fair</li>
                    <li>
                      Promotion on our newsletter & social medias (reach of
                      4,000 students)
                    </li>
                    <li>Product demo</li>
                  </ul>
                  <p className="mt-6">
                    Additionally, we provide the flexibility to create your own
                    perk or package. Let us know your ideas and package choice
                    at sponsorship@hackbeanpot.com. Our team will work with you
                    to answer any questions and guide you through the next steps
                    in becoming a HackBeanpot 2025 sponsor!
                  </p>
                </div>
              }
              className="z-10"
            />
          </div>

          <div className={pastSponsorStyles}>
            <SponsorTile
              title={"Past Sponsors"}
              titleAlign={""}
              content={
                <div>
                  <div className="relative grid grid-cols-3 grid-flow-dense ml-24 mt-10">
                    <div className="scale-150 ml-8 mt-1">
                      <img src="/sponsor-logos/google.svg" alt="Google logo" />
                    </div>
                    <div className="scale-150 ml-7">
                      <img
                        src="/sponsor-logos/datadog.svg"
                        alt="Datadog logo"
                      />
                    </div>
                    <div className="scale-150 mt-2">
                      <img
                        src="/sponsor-logos/simplisafe.svg"
                        alt="Simplisafe logo"
                      />
                    </div>
                    <div className="col-span-2 scale-150 ml-10">
                      <img src="/sponsor-logos/meta.svg" alt="Meta logo" />
                    </div>
                    <div className="scale-150">
                      <img
                        src="/sponsor-logos/woodmack.svg"
                        alt="Wood Mackenzie logo"
                      />
                    </div>
                    <div className="scale-125 mt-2 ml-4">
                      <img
                        src="/sponsor-logos/upstatement.svg"
                        alt="Upstatement logo"
                      />
                    </div>
                    <div className="scale-125 ml-3">
                      <img src="/sponsor-logos/yelp.svg" alt="Yelp logo" />
                    </div>
                    <div className="mt-8 scale-150">
                      <img src="/sponsor-logos/vmware.svg" alt="Vmware logo" />
                    </div>
                    <div>
                      <img
                        src="/sponsor-logos/cargurus.svg"
                        alt="Cargurus logo"
                      />
                    </div>
                    <div className="ml-10 scale-150">
                      <img src="/sponsor-logos/toast.svg" alt="Toast logo" />
                    </div>
                  </div>
                  <p
                    className="mt-10 ml-6 font-medium text-lg"
                    style={{ fontStyle: "italic" }}
                  >
                    Due to HackBeanpot&apos;s status as a 501c3 nonprofit
                    organization, all sponsorship package purchases are
                    considered tax deductible.
                  </p>
                </div>
              }
              className="z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorUsContent;
