import * as React from "react";

const Ticket = () => {
  return (
    <svg
      width="1026"
      height="1000"
      viewBox="0 0 292 204"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_893_8756)">
        <path d="M287 199H0V8.3322L287 0V199Z" fill="#F4C974" />
        <path
          d="M4.47852 194.521V12.6826L282.521 4.61035V194.521H4.47852Z"
          stroke="white"
          strokeWidth="8.95735"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_893_8756"
          x="0"
          y="0"
          width="291.479"
          height="203.479"
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
          <feOffset dx="4.47867" dy="4.47867" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_893_8756"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_893_8756"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Ticket;
