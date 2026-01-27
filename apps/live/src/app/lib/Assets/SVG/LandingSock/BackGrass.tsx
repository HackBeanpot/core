import * as React from "react";
import { SVGProps } from "react";

const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    // width={1200}
    // height={820}
    viewBox="0 0 1200 820"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M234.5 0C17 -0.000538947 -54 95.7108 -54 95.7108V189H1216V65.6695C1216 65.6695 929.4 129.062 740.5 116.55C544.024 103.536 452 0.000538952 234.5 0Z"
      fill="#4B642E"
    />
    <path
      d="M-7 115.371C-7 115.371 161 -49.714 596.5 115.371C1032 280.456 1200 115.371 1200 115.371V2273H-7V115.371Z"
      fill="#334A1F"
    />
  </svg>
);
export default SVGComponent;
