import { Cabin } from "../../(landing)/CabinRace/CabinTypes.tsx";
import * as React from "react";
import { CabinRaceTent, CabinRaceYellowAirBalloon } from "../../lib/Assets/SVG";
import { ProjectStarIcon } from "main/src/app/lib/Assets/SVG";
import ProgressBar from "./ProgressBar.tsx";
import { CabinRaceHotAirBalloonTheme } from "../../lib/Assets/SVG/CabinRace/MiniHotAirBalloons/CabinRaceHotAirBalloonColors.tsx";
import useDevice from "@util/hooks/useDevice.ts";
import CabinRaceBush from "../../lib/Assets/SVG/CabinRace/CabinRaceBush.tsx";

type CabinSummary = Pick<Cabin, "name" | "points">;

const BALLOON_THEMES: CabinRaceHotAirBalloonTheme[] = [
  "blue",
  "green",
  "yellow",
  "purple",
  "white",
  "red",
];

interface CabinRaceScoreTentProps {
  cabinInfo: CabinSummary[];
}

const CabinRaceScoreTent: React.FC<CabinRaceScoreTentProps> = ({
  cabinInfo,
}) => {
  const maxPoints = 350;
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <div
      className={`relative flex w-full ${isMobile ? "h-[195vw]" : "h-[100vw]"} items-center justify-center`}
    >
      <CabinRaceTent
        className={`absolute left-1/2 top-1/2 ${isMobile ? "w-[160vw]" : isTablet ? "w-[80vw]" : "w-[70vw]"} h-auto -translate-x-1/2 -translate-y-1/2`}
      />
      {!isMobile && (
        <CabinRaceYellowAirBalloon
          className={`absolute w-[16vw] h-auto`}
          style={{ transform: "translate(35vw, -20vw)" }}
        />
      )}
      <CabinRaceBush
        className={`absolute ${isMobile ? "w-[30vw]" : "w-[20vw]"} h-auto`}
        style={{
          transform: isDesktop
            ? "translate(-33vw, 36vw)"
            : isTablet
              ? "translate(-35vw, 40vw)"
              : "translate(-35vw, 80vw)",
        }}
      />
      <div className="relative flex flex-col gap-[1.5vw]">
        {cabinInfo.map((cabin, index) => (
          <div key={cabin.name} className={`flex items-start gap-[1vw]`}>
            <ProjectStarIcon className="self-start" />
            <div
              className={`flex flex-col ${isMobile ? "w-[30vw]" : "w-[12vw]"}`}
            >
              <p
                className={`font-NeulisNeue-Bold text-white ${isMobile ? "text-[3vw]" : "text-[1.5vw]"}`}
              >
                {cabin.name}
              </p>
              <p
                className={`font-DMSans-Regular text-white ${isMobile ? "text-[2.5vw]" : "text-[1vw]"}`}
              >
                {cabin.points}
              </p>
            </div>
            <ProgressBar
              current={cabin.points}
              max={maxPoints}
              color={BALLOON_THEMES[index % BALLOON_THEMES.length]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CabinRaceScoreTent;
