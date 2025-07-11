"use client";
import React from "react";
import PassportCard, { PassportCardProps } from "./PassportCard";

interface CarouselProps {
  items: PassportCardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <div className="flex justify-center items-center desktop:space-x-80 mobile:space-x-32">
      {items.map((cardInfo, i) => {
        const isActive = i === 1;
        const activeClass = isActive ? "opacity-100 z-10" : "opacity-70 z-0";
        const updatedInfo = { ...cardInfo, isActive };

        return (
          <div
            key={cardInfo.id}
            className={`transition-opacity duration-300 ${activeClass}`}
          >
            <PassportCard {...updatedInfo} />
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
