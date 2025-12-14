// packages/ui/src/InfoCard.tsx
import React from "react";
import { ProjectStarIcon } from "main/src/app/lib/Assets/SVG";
import { itemIconMap, ItemName } from "./icons.tsx";

type InfoCardProps = {
  heading: string;
  text: string;
  icon: ItemName;
  size?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ heading, text, icon , size = "[40vw]"}) => {

  return (
    <div
      className={`relative w-${size} rounded-2xl bg-white shadow-md overflow-hidden`}
    >
      <div className="relative" style={{ paddingTop: `${(157 / 277) * 100}%` }}>
        {/* Content */}
        <div className="absolute inset-0 flex flex-col p-6 justify-center">
          {/* Header */}
          <div
            className="flex flex-row gap-1 items-center"
            style={{ transform: "translate(2vw, -1vw)" }}
          >
            <ProjectStarIcon className="mobile-xl:w-[7vw]" />
            <div className="flex items-center">
              <p className="text-[3vw] font-NeulisNeue-Bold text-charcoalFog">
                {heading}
              </p>
            </div>
          </div>

          {/* Text */}
          <div
            className="text-[1.5vw] font-NeulisNeue text-charcoalFog mt-2 w-[20vw]"
            style={{ transform: "translate(2vw, -1vw)" }}
          >
            {text.split("\n").map((line, i) => (
              <div key={i} className="break-words whitespace-normal">
                {line}
              </div>
            ))}
          </div>

          {/* Bottom-right icon */}
          <div className="absolute w-[12vw] h-auto bottom-0 right-0">
            {itemIconMap[icon]}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoCard;
