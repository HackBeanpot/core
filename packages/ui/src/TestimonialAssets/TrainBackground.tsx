import React from "react";
import type { SVGProps } from "react";

const TrainBackground = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={2000}
    height={1086}
    fill="none"
    {...props}
  >
    <g fill="#709941" clipPath="url(#a)">
      <path d="M203 60.513c-114.8 2.4-191.167-29.334-215-45.5v261.5l2157 29v-245c-55.17-20-191.1-60-293.5-60-128 0-342 60-668.5 60-198 0-435.5-67-612.5-60s-224 57-367.5 60" />
      <path d="M0 106h2000v843H0zM263 1046c-157 18-238.333-42.83-288-79v-18h2214.5v136.5c-70.33-32.67-238.3-98-347.5-98-229.5 0-263.47 64.64-438 76.5-316.5 21.5-563-79.108-794.5-76.5-177.5 2-205.329 42.31-346.5 58.5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h2000v1086H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default TrainBackground;