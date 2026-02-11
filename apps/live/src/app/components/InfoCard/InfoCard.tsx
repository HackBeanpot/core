// packages/ui/src/InfoCard.tsx
import React from "react";
import { ProjectStarIcon } from "main/src/app/lib/Assets/SVG";
import { itemIconMap, ItemName } from "./icons.tsx";

type InfoCardProps = {
  heading: string;
  text: string[];
  icon: ItemName;
  size?: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  heading,
  text,
  icon,
  size = "[40vw]",
}) => {
  return (
    <div
      className={`relative w-${size} rounded-2xl bg-carouselCreamLight shadow-md overflow-hidden`}
    >
      <div className="relative" style={{ paddingTop: `${(157 / 277) * 100}%` }}>
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-6">
          {/* Header */}
          <div className="flex flex-row items-center gap-2 ml-2 sm:ml-4 mb-2">
            <ProjectStarIcon className="w-[clamp(16px,5vw,32px)] flex-shrink-0" />
            <p className="text-[clamp(14px,2vw,22px)] font-NeulisNeue-Bold text-charcoalFog leading-tight break-words">
              {heading}
            </p>
          </div>

          {/* Text */}
          <div className="ml-2 sm:ml-4 w-1/2 max-w-full">
            <ul className="list-disc pl-4 space-y-1">
              {text.map((item, i) => (
                <li
                  key={i}
                  className="text-[clamp(12px,1.2vw,16px)] font-NeulisNeue text-charcoalFog leading-snug break-words"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom-right icon */}
          <div className="absolute w-[12vw] h-auto bottom-0 right-0 flex justify-end">
            {itemIconMap[icon]}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoCard;

{
  /* Content */
}
//  <div className="absolute inset-0 flex flex-col p-6 justify-center">
//  {/* Header */}
//  <div
//    className="flex flex-row gap-1 items-center"
//    style={{ transform: "translate(2vw, -1vw)" }}
//  >
//    <ProjectStarIcon className="mobile-xl:w-[7vw]" />
//    <div className="flex items-center">
//      <p className="text-[2vw] font-NeulisNeue-Bold text-charcoalFog">
//        {heading}
//      </p>
//    </div>
//  </div>

//  {/* Text */}
//  <div
//    className="text-[1.2vw] font-NeulisNeue text-charcoalFog mt-2 w-1/2"
//    style={{ transform: "translate(2vw, -1vw)" }}
//  >
//    {/* {text.split("\n").map((line, i) => (
//      <div key={i} className="break-words whitespace-normal">
//        {line}
//      </div>
//    ))} */}
//    <ul className="list-disc pl-4">
//      {text.map((item, i) => (
//        <li
//          key={i}
//          className="text-[1.2vw] font-NeulisNeue text-charcoalFog"
//        >
//          {item}
//        </li>
//      ))}
//    </ul>
//  </div>
