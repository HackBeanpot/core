import React from "react";

const TextBackground: React.FC = () => {
  return (
    <svg
      width="605"
      height="354"
      viewBox="0 0 605 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_707_13929)">
        <path d="M0 0H595V329.597L0 344V0Z" fill="#F7DFBC" />
        <path
          d="M585 10V319.835L10 333.755V10H585Z"
          stroke="white"
          strokeWidth="20"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_707_13929"
          x="0"
          y="0"
          width="605"
          height="354"
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
          <feOffset dx="10" dy="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_707_13929"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_707_13929"
            result="shape"
          />
        </filter>
      </defs>
      <text
        x="40" // left margin
        y="100" // first line position
        fill="black"
        fontSize="19"
        fontFamily="DMSans-Regular"
      >
        <tspan x="65" dy="0">
          We&apos;re a non-profit organization in the Boston area
        </tspan>
        <tspan x="65" dy="24">
          that organizes an annual undergraduate hackathon.
        </tspan>
        <tspan x="65" dy="24">
          Our goal is to expand and nurture the hacker
        </tspan>
        <tspan x="65" dy="24">
          culture that exists in Boston and the surrounding
        </tspan>
        <tspan x="65" dy="24">
          areas. We connect students and other aspiring nerds
        </tspan>
        <tspan x="65" dy="24">
          to their colleagues so that they can meet new people,
        </tspan>
        <tspan x="65" dy="24">
          learn new things, and have a great time.
        </tspan>
      </text>
    </svg>
  );
};
export default TextBackground;
