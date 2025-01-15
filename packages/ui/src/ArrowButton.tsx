"use client";

import React from "react";

type ArrowButtonStyleKey = "purpleButton" | "greenButton" | "beigeButton";
type ArrowType = "left" | "right";

const ArrowButtonType = {
  purpleButton: {
    arrowColor: "beige",
    bgColor: "bg-grapePurple",
    topBorder: "border-t-darkPurple",
  },
  greenButton: {
    arrowColor: "beige",
    bgColor: "bg-leafGreen",
    topBorder: "border-t-darkGreen",
  },
  beigeButton: {
    arrowColor: "black",
    bgColor: "bg-beige",
    topBorder: "border-t-darkBeige",
  },
};

interface ArrowButtonProps {
  direction: ArrowType;
  arrowButtonColor: ArrowButtonStyleKey;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function ArrowButton({
  direction,
  arrowButtonColor,
  onClick,
}: ArrowButtonProps) {
  const { arrowColor, bgColor, topBorder } = ArrowButtonType[arrowButtonColor];
  return (
    <>
      <button
        onClick={onClick}
        className={`relative rounded-arrow w-24 h-24 ${bgColor} ${topBorder} border-t-4`}
      >
        {direction === "left" ? (
          <LeftArrow arrowColor={arrowColor} />
        ) : (
          <RightArrow arrowColor={arrowColor} />
        )}
      </button>
    </>
  );
}

const LeftArrow = ({ arrowColor }: { arrowColor: string }) => (
  <svg
    width="44"
    height="35"
    viewBox="0 0 45 35"
    fill={`${arrowColor}`}
    xmlns="http://www.w3.org/2000/svg"
    className={`translate-x-6`}
  >
    <path
      d="M19.5247 1.39548C18.9399 0.810847 18.1468 0.482422 17.3199 0.482422C16.493 0.482422 15.6999 0.810847 15.1151 1.39548L1.08186 15.4287C0.497234 16.0135 0.168808 16.8066 0.168808 17.6335C0.168808 18.4604 0.497234 19.2535 1.08186 19.8383L15.1151 33.8715C15.7033 34.4396 16.491 34.7539 17.3087 34.7468C18.1263 34.7397 18.9085 34.4117 19.4867 33.8335C20.0649 33.2553 20.3929 32.4732 20.4 31.6555C20.4071 30.8379 20.0927 30.0501 19.5247 29.462L11.0829 20.752H40.7086C41.5357 20.752 42.3289 20.4234 42.9138 19.8386C43.4986 19.2538 43.8271 18.4606 43.8271 17.6335C43.8271 16.8064 43.4986 16.0132 42.9138 15.4284C42.3289 14.8436 41.5357 14.515 40.7086 14.515H11.0829L19.5247 5.80503C20.1093 5.22023 20.4377 4.42717 20.4377 3.60025C20.4377 2.77334 20.1093 1.98028 19.5247 1.39548Z"
      fill={`${arrowColor}`}
    />
  </svg>
);

const RightArrow = ({ arrowColor }: { arrowColor: string }) => (
  <svg
    width="45"
    height="35"
    viewBox="0 0 45 35"
    fill={`${arrowColor}`}
    xmlns="http://www.w3.org/2000/svg"
    className={`translate-x-6`}
  >
    <path
      d="M24.8249 1.39548C25.4097 0.810847 26.2028 0.482422 27.0297 0.482422C27.8566 0.482422 28.6497 0.810847 29.2345 1.39548L43.2677 15.4287C43.8524 16.0135 44.1808 16.8066 44.1808 17.6335C44.1808 18.4604 43.8524 19.2535 43.2677 19.8383L29.2345 33.8715C28.6463 34.4396 27.8586 34.7539 27.0409 34.7468C26.2233 34.7397 25.4411 34.4117 24.8629 33.8335C24.2847 33.2553 23.9568 32.4732 23.9497 31.6555C23.9425 30.8379 24.2569 30.0501 24.8249 29.462L33.2667 20.752H3.64096C2.81388 20.752 2.02068 20.4234 1.43585 19.8386C0.851016 19.2538 0.522461 18.4606 0.522461 17.6335C0.522461 16.8064 0.851016 16.0132 1.43585 15.4284C2.02068 14.8436 2.81388 14.515 3.64096 14.515H33.2667L24.8249 5.80503C24.2403 5.22023 23.9119 4.42717 23.9119 3.60025C23.9119 2.77334 24.2403 1.98028 24.8249 1.39548Z"
      fill={`${arrowColor}`}
    />
  </svg>
);
