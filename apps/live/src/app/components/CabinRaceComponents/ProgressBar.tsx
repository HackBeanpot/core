import React from "react";
import {CabinRaceMiniHotAirBalloon} from "../../lib/Assets/SVG";
import {
  CabinRaceHotAirBalloonTheme
} from "../../lib/Assets/SVG/CabinRace/MiniHotAirBalloons/CabinRaceHotAirBalloonColors.tsx";
import useDevice from "@util/hooks/useDevice.ts";

interface ProgressBarProps {
  current: number;
  max: number;
  color: CabinRaceHotAirBalloonTheme;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, color }) => {
  const percent = Math.min((current / max) * 100, 100);
  const {isMobile} = useDevice();
  return (
      <div className={`relative ${isMobile ? "w-[50vw]" : "w-[30vw]"} justify-center`}>
        {/* Bar background */}
        <div className={`${isMobile ? "h-[3vw]" : "h-[1vw]"} bg-charcoalFogLight rounded-full`}>
          {/* Fill */}
          <div
              className={`${isMobile ? "h-[3vw]" : "h-[1vw]"} rounded-full transition-all bg-ribbonBlue`}
              style={{
                width: `${percent}%`,
              }}
          />
        </div>

        {/* Balloon */}
        <CabinRaceMiniHotAirBalloon
            theme={color}
            className="absolute transition-all"
            style={{
              left: `${percent}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
        />

      </div>
  );
};

export default ProgressBar;
