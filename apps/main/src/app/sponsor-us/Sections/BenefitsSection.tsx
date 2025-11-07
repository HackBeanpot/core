import React from "react";
import SponsorUsBenefitCardComp from "../components/SponsorUsBenefitCardComp";
import RibbonTitle from "@repo/ui/RibbonTitle";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";
import TopGrassWave from "../../lib/Assets/SVG/SponsorUsAssets/TopGrassWave";
import FluffyBush from "../../lib/Assets/SVG/FluffyBush";
import RightBush from "../../lib/Assets/SVG/RightBush";

const BenefitsSection = () => {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const [isSmallScreen, setIsSmallScreen] = React.useState(true);

  const ribbonStyles = clsx(
    "w-1/2",
    isMobile && "mt-30 mb-10",
    isTablet && "mt-36 mb-8",
    isDesktop && "mt-30 mb-12",
  );

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
    <>
      <div className="relative inset-0 z-20 flex flex-col">
        <TopGrassWave
          className="absolute z-0 -top-28 left-0 right-0 w-[100vw] h-full justify-self-center"
          preserveAspectRatio="none"
        />
        <div>
          <FluffyBush className="relative z-0 top-14 left-8 w-[50vw]" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className={ribbonStyles}>
            <RibbonTitle text={"BENEFITS"} />
          </div>
          <div>
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

        <div className="relative justify-items-center mt-24 mb-16 text-center px-4">
          <h2 className="text-xl font-NeulisNeue-Bold text-charcoalFog">
            Additionally, we provide the flexibility to create your own perk or
            package.
          </h2>
          <p className="mt-4 text-charcoalFog font-NeulisNeue-Regular max-w-2xl">
            Let us know your ideas and package choice at
            sponsorship@hackbeanpot.com. Our team will work with you to answer
            any questions and guide you through the next steps in becoming a
            HackBeanpot 2026 sponsor!
          </p>
          <RightBush className="relative bottom-0 left-96" />
        </div>
      </div>
    </>
  );
};

export default BenefitsSection;
