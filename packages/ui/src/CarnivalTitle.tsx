import React from "react";
import classNames from "clsx";
type CarnivalTitleProps = {
  text: string;
  className?: string;
};
const CarnivalTitle: React.FC<CarnivalTitleProps> = ({ text, className }) => {
  return (
    <svg
      className={classNames(
        "inset-x-0 -translate-y-1/2 w-full pointer-events-none",
        className,
      )}
      viewBox="0 0 1200 160"
      preserveAspectRatio="xMaxYMin slice"
      aria-hidden
    >
      <defs>
        <filter
          id="titleShadow"
          x="0"
          y="0"
          width="1200"
          height="160"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="0" dy="4" stdDeviation="0" floodOpacity="0.6" />
        </filter>
      </defs>
      <g
        stroke="#F2E06F"
        strokeWidth="6"
        strokeLinejoin="round"
        paintOrder="stroke fill"
        vectorEffect="non-scaling-stroke"
        filter="url(#titleShadow)"
      >
        <text
          x="50%"
          y="57%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-Sancreek-Regular"
          fontSize="80"
          fill="#CC322D"
        >
          {text}
        </text>
      </g>
    </svg>
  );
};
export default CarnivalTitle;
