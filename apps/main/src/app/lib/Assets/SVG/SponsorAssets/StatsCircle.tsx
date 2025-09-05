import React from "react";

type OrangeCircleProps = {
  className: string;
};

const OrangeCircle: React.FC<OrangeCircleProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={186}
    height={186}
    fill="none"
    className={className}
  >
    <circle cx={93} cy={93} r={93} fill="#F5AE55" />
  </svg>
);

export default OrangeCircle;