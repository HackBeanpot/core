import * as React from "react";

const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={19.75}
      cy={19.75}
      r={17.7518}
      fill="#F2E06F"
      stroke="#FDA829"
      strokeWidth={3.9964}
    />
    <mask
      id="mask0_786_2636"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={40}
      height={40}
    >
      <circle
        cx={19.75}
        cy={19.75}
        r={17.4663}
        fill="#F2E06F"
        stroke="#FDA829"
        strokeWidth={4.56731}
      />
    </mask>
    <g mask="url(#mask0_786_2636)">
      <path
        d="M19.0878 29.1118V16.5368C18.1933 17.2525 16.9664 17.687 15.714 17.687V13.9554C17.5032 13.9554 19.19 13.0353 20.238 11.4762H23.0494V29.1118H19.0878Z"
        fill="#C2811E"
      />
      <path
        d="M-11.6072 0.561661C-10.3039 -9.14585 -4.2316 5.89511 17.9368 18.694C38.6944 30.6785 49.4047 24.381 48.1015 34.0885C46.7982 43.796 31.1653 49.7086 13.1843 47.2946C-4.79665 44.8806 -12.9105 10.2692 -11.6072 0.561661Z"
        fill="#E66700"
        fillOpacity={0.21}
      />
    </g>
  </svg>
);

export default SVGComponent;
