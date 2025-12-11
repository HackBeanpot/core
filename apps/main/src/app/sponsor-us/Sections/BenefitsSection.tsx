import React from "react";
import SponsorUsBenefitCardComp from "../components/SponsorUsBenefitCardComp";
import BenefitsBackground from "../../lib/Assets/SVG/SponsorUsAssets/BenefitsBackground";
import RibbonTitle from "@repo/ui/RibbonTitle";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";

const BenefitsSection = () => {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const firstCardClasses = clsx(
    "w-full flex h-[50vh]",
    isMobile && "justify-center",
    isTablet  && "justify-center pr-[55vw]",
    isDesktop && "justify-start pl-[10vw]"
  );

  const secondCardClasses = clsx(
    "w-full flex h-[50vh]",
    isMobile && "justify-center",
    isTablet  && "justify-center pr-[55vw]",
    isDesktop && "justify-center pl-[10vw] "
  );

  const cardWrapperClasses = clsx("max-w-xl", isMobile && "w-full ml-[7vw]");

  const sectionStyles = clsx(
    "relative",
    isDesktop && "-mt-[18vh] pt-[18vh]",
    isTablet  && "-mt-[14vh] pt-[16vh]",
    isMobile && "-mt-[14vh] pt-[14vh]"
  );

  return (
    <div>
      <div className={sectionStyles}>
        <div className="absolute inset-0 z-0 w-full h-full">
          <BenefitsBackground className="" />
        </div>
        <div className="mt-12 relative z-10  inset-0">
          <RibbonTitle text="BENEFITS" />
          <div className="mt-[5vw] flex flex-col">
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
      </div>
      <div className="relative z-10 mt-12 text-center px-4 mx-auto max-w-3xl mb-10">
        <h2 className="text-xl font-NeulisNeue-Bold text-charcoalFog">
          Additionally, we provide the flexibility to create your own perk or
          package.
        </h2>
        <p className="mt-4 text-charcoalFog font-NeulisNeue-Regular">
          Let us know your ideas and package choice at
          sponsorship@hackbeanpot.com. Our team will work with you to answer any
          questions and guide you through the next steps in becoming a
          HackBeanpot 2026 sponsor!
        </p>
      </div>
    </div>
  );
};

export default BenefitsSection;
