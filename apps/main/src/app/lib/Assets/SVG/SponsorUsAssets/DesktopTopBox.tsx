import * as React from "react";

const DesktopTopBox = () => {
  return (
    <svg
      width="761"
      height="339"
      viewBox="0 0 761 339"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_707_17797)">
        <rect width="755.304" height="333.516" rx="5.05897" fill="#F16F58" />
      </g>
      <defs>
        <filter
          id="filter0_d_707_17797"
          x="0"
          y="0"
          width="760.363"
          height="338.575"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="5.05897" dy="5.05897" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.8 0 0 0 0 0.196078 0 0 0 0 0.176471 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_707_17797"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_707_17797"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default DesktopTopBox;
