import React from "react";
import { SVGProps } from "react";

const Background: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={1200}
      height={698}
      viewBox="0 0 1200 698"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M927.402 698C1132.91 698 1200 641.789 1200 641.789V587H0V659.432C0 659.432 270.803 622.202 449.291 629.55C634.938 637.193 721.89 698 927.402 698Z"
        fill="#B8C952"
      />
      <rect width={1200} height={587} fill="#B8C952" />
    </svg>
  );
};
export default Background;
