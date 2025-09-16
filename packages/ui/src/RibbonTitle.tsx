import React from "react";
import LongRibbon from "./RibbonTitleAssets/LongRibbon";
import ShortRibbon from "./RibbonTitleAssets/ShortRibbon";

export type RibbonTitleProps = {
  size?: "short" | "long";
  text: string;
};

export default function RibbonTitle({
  text,
  size = "short",
}: RibbonTitleProps): React.ReactNode {
  const isShort = size === "short";
  return (
    <div className="relative inline-block w-full transform scale-75 text-marigoldYellow">
      {isShort && (
        <div>
          <span className="absolute inset-0 flex items-center justify-center text-7xl z-10 font-NeulisNeue-Bold">
            {text}
          </span>
          <ShortRibbon className="w-full transform scale-[1.1]" />
        </div>
      )}

      {!isShort && (
        <div>
          <span className="absolute inset-0 flex items-center justify-center text-7xl z-10 font-NeulisNeue-Bold">
            {text}
          </span>
          <LongRibbon className="w-full transform scale-[1.5]" />
        </div>
      )}
    </div>
  );
}
