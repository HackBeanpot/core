import React from "react";

const GuestPhoto: React.FC = () => {
  return (
    <svg
      width="238"
      height="269"
      viewBox="0 0 238 269"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_707_15439)">
        <path
          d="M226.828 13.8561L0.0157166 0.923828V257.937H226.828V13.8561Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_707_15439"
          x="0.0157166"
          y="0.923828"
          width="237.734"
          height="267.934"
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
          <feOffset dx="10.9215" dy="10.9215" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_707_15439"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_707_15439"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default GuestPhoto;
