import * as React from "react";
import { SVGProps } from "react";

const JudgingRoad = (props: SVGProps<SVGSVGElement>) => (
  <svg
    // width={403}
    // height={295}
    viewBox="0 0 403 295"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...props}
  >
    <g filter="url(#filter0_g_883_521)">
      <path d="M141.851 2H256.137L401 293H2L141.851 2Z" fill="#FDA829" />
    </g>
    <defs>
      <filter
        id="filter0_g_883_521"
        x={0}
        y={0}
        width={403}
        height={295}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.10000000149011612 0.10000000149011612"
          numOctaves={3}
          seed={5259}
        />
        <feDisplacementMap
          in="shape"
          scale={4}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect1_texture_883_521">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);
export default JudgingRoad;
