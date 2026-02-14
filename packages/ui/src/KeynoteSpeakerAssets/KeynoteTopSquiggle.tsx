import * as React from "react";
import { SVGProps } from "react";
const KeynoteTopSquiggle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    // width={1200}
    // height={141}
    viewBox="0 0 1200 141"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...props}
  >
    <g clipPath="url(#clip0_2719_46940)">
      <path
        d="M272.598 0C116.209 -0.000358803 0 59.3882 0 59.3882V141H1200V22C1200 22 876.083 107 680.5 73.5C497.174 42.0995 428.988 0.000358806 272.598 0Z"
        fill="#B8C952"
      />
      <path
        d="M272.598 30C116.209 29.9996 0 89.3882 0 89.3882V171H1200V77C1200 77 861.083 131.5 665.5 98C482.174 66.5995 428.988 30.0004 272.598 30Z"
        fill="#709941"
      />
    </g>
    <defs>
      <clipPath id="clip0_2719_46940">
        <rect width={1200} height={141} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default KeynoteTopSquiggle;
