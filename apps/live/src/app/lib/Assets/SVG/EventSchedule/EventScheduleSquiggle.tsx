import React from "react";
import type { SVGProps } from "react";

const EventScheduleSquiggle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 1200 454"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M-162.891 76.3132C-328.269 100.317 -355.801 75.3138 -400 60.9724V428H1600V27.9679C1443 -5.03649 1325.88 10.4887 1065.47 70.9739C793.5 134.143 572.5 -18.8577 273.573 1.96427C117.668 12.8239 43.8306 46.3091 -162.891 76.3132Z"
        fill="#53832E"
      />
      <path
        d="M-163.5 130.495C-328.878 154.499 -400 98.9676 -400 98.9676V453.995H1600V53.9975C1443 20.9931 1357.42 61.0149 1097 121.5C825.031 184.669 570.927 10.1748 272 30.9968C116.095 41.8564 43.2219 100.491 -163.5 130.495Z"
        fill="#709941"
      />
    </svg>
  );
};

export default EventScheduleSquiggle;
