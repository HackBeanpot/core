import React from "react";
import type { SVGProps } from "react";

const DarkGreenSquiggle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="2000"
      height="454"
      viewBox="0 0 2000 454"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      preserveAspectRatio="none"
    >
      <path
        d="M237.109 76.3132C71.7311 100.317 44.1989 75.3138 0 60.9724V428H2000V27.9679C1843 -5.03649 1725.88 10.4887 1465.47 70.9739C1193.5 134.143 972.5 -18.8577 673.573 1.96427C517.668 12.8239 443.831 46.3091 237.109 76.3132Z"
        fill="#53832E"
      />
      <path
        d="M236.5 130.495C71.1225 154.499 0 98.9676 0 98.9676V453.995H2000V53.9975C1843 20.9931 1757.42 61.0149 1497 121.5C1225.03 184.669 970.927 10.1748 672 30.9968C516.095 41.8564 443.222 100.491 236.5 130.495Z"
        fill="#4B642E"
      />
    </svg>
  );
};

export default DarkGreenSquiggle;
