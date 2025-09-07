"use client";
import React from "react";
import Circle, { CircleProps } from "./Circle";
import clsx from "clsx";

interface StatsCarouselProps {
  items: CircleProps[];
}

const StatsCarousel: React.FC<StatsCarouselProps> = ({ items }) => {
  const bubbleStyling = clsx("desktop:space-x-80 mobile:space-x-8");

  return (
    <div className={`flex justify-center items-center ${bubbleStyling}`}>
      {items.map((cardInfo, i) => {
        const isActive = i === 1;
        const activeClass = isActive
          ? "opacity-100 z-10 drop-shadow-[0_6px_0px_rgba(0,0,0,.1)]"
          : "opacity-80 z-0 scale-75";
        const updatedInfo = { ...cardInfo, isActive };

        return (
          <div
            key={cardInfo.title}
            className={`transition-opacity duration-300 ${activeClass}`}
          >
            <Circle {...updatedInfo} />
          </div>
        );
      })}
    </div>
  );
};

export default StatsCarousel;
