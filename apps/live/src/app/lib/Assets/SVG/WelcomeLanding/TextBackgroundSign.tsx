import React from "react";

interface TextBackgroundSignProps {
  style?: React.CSSProperties;
}

export default function TextBackgroundSign({ style }: TextBackgroundSignProps) {
  return (
    <svg
      width="615"
      height="477"
      viewBox="0 0 615 477"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={style}
    >
      <path
        d="M614.999 477H13.9993V35.3022L614.999 16V477Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        d="M10.9912 450.009V29.9473L590.009 11.3516V450.009H10.9912Z"
        fill="#F7DFBC"
        stroke="white"
        strokeWidth="21.9832"
      />
    </svg>
  );
}