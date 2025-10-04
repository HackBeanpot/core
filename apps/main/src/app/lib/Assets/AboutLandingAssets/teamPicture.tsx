import React from "react";

const TeamPicture: React.FC = () => {
  return (
    <svg
      width="538"
      height="352"
      viewBox="0 0 538 352"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_707_13984)">
        <path d="M527 17.1854L0.96875 0V341.538H527V17.1854Z" fill="white" />
      </g>
      {/* Add your picture here */}
      <image
        href="/team.png" // path to your image
        x="15" // left offset
        y="30" // top offset
        width="500" // image width
        height="300" // image height
        preserveAspectRatio="xMidYMid slice"
      />
      <defs>
        <filter
          id="filter0_d_707_13984"
          x="0.96875"
          y="0"
          width="536.288"
          height="351.794"
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
          <feOffset dx="10.2564" dy="10.2564" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_707_13984"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_707_13984"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default TeamPicture;
