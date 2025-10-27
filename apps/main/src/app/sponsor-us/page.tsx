"use client";

import React from "react";
import clsx from "clsx";
import RibbonTitle from "@repo/ui/RibbonTitle";
import useDevice from "@repo/util/hooks/useDevice";
import SponsorUsBenefitCardComp from "../lib/Components/SponsorUsComponents/SponsorUsBenefitCardComp";
import SponsorTicketBoothComp from "../lib/Components/SponsorComponents/SponsorTicketBoothComp.tsx";
import SponsorUsStatsComp from "../lib/Components/SponsorUsComponents/SponsorUsStatsComp";
import SponsorTop from "./components/SponsorTop.tsx";

const SponsorUsPage = () => {
  const { isMobile } = useDevice();
  const [isSmallScreen, setIsSmallScreen] = React.useState(true);

  React.useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 1024;
      setIsSmallScreen(isSmall);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const firstCardClasses = clsx("w-full flex", {
    "justify-center px-4": isSmallScreen || isMobile,
    "justify-end pr-96": !(isSmallScreen || isMobile),
  });

  const secondCardClasses = clsx("w-full flex", {
    "justify-center px-4": isSmallScreen || isMobile,
    "justify-start pl-96": !(isSmallScreen || isMobile),
  });

  const cardWrapperClasses = clsx("max-w-xl", {
    "w-full": isSmallScreen || isMobile,
  });

  return (
    <div className="relative z-10 w-full">
      <SponsorTop />
      <SponsorTicketBoothComp />
      <div className="mt-12">
        <RibbonTitle text="Sponsorship Benefits" />
        <div className="mt-7 flex flex-col gap-10">
          <div className={firstCardClasses}>
            <div className={cardWrapperClasses}>
              <SponsorUsBenefitCardComp
                title="Recruitment"
                content={
                  <>
                    <p>
                      Scout the next generation of talent here. Receive perks
                      such as:
                    </p>
                    <ul>
                      <li>• Onsite interviews</li>
                      <li>• A spot in our career fair</li>
                      <li>• Hacker resumes</li>
                      <li>• Sponsoring a company specific prize</li>
                    </ul>
                  </>
                }
              />
            </div>
          </div>
          <div className={secondCardClasses}>
            <div className={cardWrapperClasses}>
              <SponsorUsBenefitCardComp
                title="Market your company"
                content="Market your product and receive feedback by sponsoring a company-specific prize, hosting a workshop, giving a product demo, or mentoring hackers that are eager to hear your advice and implement your technologies for their projects."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="justify-items-center mt-24 mb-16 text-center px-4">
        <h2 className="text-xl font-NeulisNeue-Bold text-charcoalFog">
          Additionally, we provide the flexibility to create your own perk or
          package.
        </h2>
        <p className="mt-4 text-charcoalFog font-NeulisNeue-Regular max-w-2xl">
          Let us know your ideas and package choice at
          sponsorship@hackbeanpot.com. Our team will work with you to answer any
          questions and guide you through the next steps in becoming a
          HackBeanpot 2026 sponsor!
        </p>
      </div>
      <SponsorUsBenefitCardComp
        title="Market your company and product"
        content="Market your product and receive feedback by sponsoring a company-specific prize, hosting a workshop, giving a product demo, or mentoring hackers that are eager to hear your advice and implement your technologies for their projects."
      /> 
      <SponsorUsStatsComp />
    </div>
  );
};

export default SponsorUsPage;
