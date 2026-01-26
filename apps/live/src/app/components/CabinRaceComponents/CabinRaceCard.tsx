import * as React from "react";
import { Cabin } from "../../(landing)/CabinRace/CabinTypes.tsx";
import useDevice from "@util/hooks/useDevice.ts";
import { ProjectStarIcon } from "main/src/app/lib/Assets/SVG";
import Icon from "@repo/ui/Icons/MemberIcon";

interface CabinCardProps {
  cabinInfo: Cabin;
}

const CabinCard: React.FC<CabinCardProps> = ({ cabinInfo, ...props }) => {
  const { isDesktop, isTablet, isMobile } = useDevice();
  const cabinLeads = cabinInfo.cabinLeads;

  // Determine SVG dimensions
  const svgDims = isDesktop
    ? { width: 665, height: 476 }
    : isTablet
      ? { width: 405, height: 387 }
      : { width: 293, height: 430 };

  return (
    <div className="relative w-full flex justify-center">
      {/* SVG background */}
      <svg
        width={svgDims.width}
        height={svgDims.height}
        viewBox={`0 0 ${svgDims.width} ${svgDims.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {isDesktop && (
          <g filter="url(#filter0_d_614_829)">
            <path d="M654 476H0V19.9303L654 0V476Z" fill="#F7DFBC" />
            <path
              d="M10.9912 465.009V30.5928L643.009 11.332V465.009H10.9912Z"
              stroke="white"
              strokeWidth={21.9832}
            />
          </g>
        )}
        {isTablet && (
          <path
            d="M398.193 380.193V22.7441L6.80664 7.08594V380.193H398.193Z"
            fill="#F7DFBC"
            stroke="white"
            strokeWidth={13.6134}
          />
        )}
        {isMobile && (
          <g filter="url(#filter0_d_742_898)">
            <path d="M282 419H0V17.5437L282 0V419Z" fill="#F7DFBC" />
            <path
              d="M4.74023 414.26V21.998L277.26 5.04395V414.26H4.74023Z"
              stroke="white"
              strokeWidth={9.48}
            />
          </g>
        )}
      </svg>

      {/* Overlay content absolutely inside SVG bounds */}
      <div
        className={`absolute top-0 flex flex-col gap-3 items-start justify-center pl-10 pr-16`}
        style={{ width: svgDims.width, height: svgDims.height }}
      >
        <div>
          <div className="flex items-center gap-[1vw]">
            <ProjectStarIcon className="w-[2.5vw] h-auto align-middle" />
            <h1 className="font-NeulisNeue-Bold text-[clamp(1.2rem,2vw,3rem)] text-charcoalFogDark">
              {cabinInfo.name}
            </h1>
          </div>

          <h3 className="font-NeulisNeue-Bold text-[clamp(0.5rem,1.2vw,2rem)] text-firecrackerRed">
            {cabinInfo.points} points
          </h3>
          <p className="font-DMSans-Regular text-[clamp(0.7rem,1.2vw,1.2rem)] text-charcoalFogDark">
            {cabinInfo.description}
          </p>
        </div>
        <p className="font-NeulisNeue-Bold text-[clamp(1rem,1.35vw,3rem)] text-charcoalFogDark">
          {" "}
          Cabin Leaders
        </p>
        <div
          className="
              w-1/2 h-auto
              gap-4 flex flex-row"
        >
          {cabinLeads.map((lead) => (
            <Icon
              key={lead.name}
              name={lead.name}
              src={lead.src}
              url={lead.url}
              isLive={false}
              isActive={false}
              size={isDesktop ? 100 : isTablet ? 100 : 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CabinCard;
