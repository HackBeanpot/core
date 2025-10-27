import React from "react";
import LongRibbon from "./RibbonTitleAssets/LongRibbon";
import useIsMobile from "@repo/util/hooks/useIsMobile";

export type RibbonTitleProps = {
  text: string;
};

export default function RibbonTitle({
  text,
}: RibbonTitleProps): React.ReactNode {
  const isMobile = useIsMobile();
  const ribbonSize = isMobile ? "w-[90vw]" : "w-[70vw]";
  const ribbonTextSize = isMobile ? "text-[8vw]" : "text-[5vw]";
  return (
    <div
      className={`relative inline-block w-full transform scale-75 text-marigoldYellow ${ribbonSize} ${ribbonTextSize}`}
    >
      <div>
        <span className="absolute inset-0 flex items-center justify-center z-10 font-NeulisNeue-Bold  tracking-wide">
          {text}
        </span>
        <LongRibbon className="w-full transform" />
      </div>
    </div>
  );
}
