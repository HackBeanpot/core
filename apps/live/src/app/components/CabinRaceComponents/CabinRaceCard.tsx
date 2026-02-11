import * as React from "react";
import { Cabin } from "../../(landing)/CabinRace/CabinTypes.tsx";
import { ProjectStarIcon } from "main/src/app/lib/Assets/SVG";
import Icon from "@repo/ui/Icons/MemberIcon";
import useDevice from "@util/hooks/useDevice.ts";

interface CabinCardProps {
  cabinInfo: Cabin;
}

const CabinCard: React.FC<CabinCardProps> = ({ cabinInfo }) => {
  const cabinLeads = cabinInfo.cabinLeads;
  const { isDesktop, isTablet } = useDevice();

  const widthClass = isDesktop
      ? "w-[60vw]"
      : isTablet
          ? "w-[85vw]"
          : "w-[90vw]";

  return (
      <div className="w-full flex justify-center">
        {/* The Card Itself... */}
        <div className={`relative ${widthClass}`}>
          <div
              className="relative bg-white p-[1.5vw]"
              style={{
                clipPath: "polygon(0% 8%, 100% 0%, 100% 100%, 0% 100%)",
              }}
          >
            <div
                className="bg-carouselCream pt-[calc(4vw+4vw)] px-[4vw] pb-[4vw] flex flex-col gap-[2vw]"
                style={{
                  clipPath: "polygon(0% 8%, 100% 0%, 100% 100%, 0% 100%)",
                }}
            >
              {/* Title Section */}
              <div>
                <div className="flex items-center gap-[1vw]">
                  <ProjectStarIcon className="w-[2.5vw] h-auto" />
                  <h1 className="font-NeulisNeue-Bold text-[clamp(1rem,2vw,3rem)] text-charcoalFogDark">
                    {cabinInfo.name}
                  </h1>
                </div>

                <h3 className="font-NeulisNeue-Bold text-[clamp(0.9rem,1.5vw,2rem)] text-firecrackerRed">
                  {cabinInfo.points} points
                </h3>

                <p className="font-DMSans-Regular text-[clamp(0.9rem,1.3vw,1.6rem)] text-charcoalFogDark">
                  {cabinInfo.description}
                </p>
              </div>

              {/* Leaders Section */}
              <p className="font-NeulisNeue-Bold text-[clamp(1rem,1.4vw,2rem)] text-charcoalFogDark">
                {cabinInfo.cabinLeadTitle}
              </p>

              <div className="flex flex-wrap gap-[1.5vw]">
                {cabinLeads.map((lead) => (
                    <Icon
                        key={lead.name}
                        name={lead.name}
                        src={lead.src}
                        url={lead.url}
                        isLive={false}
                        isActive={false}
                        size={80}
                    />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CabinCard;
