"use client";
import React from "react";
import PassportCard, { PassportCardProps } from "./PassportCard";

interface CarouselProps {
  items: PassportCardProps[];
  page: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, page }) => {
  return (
    <div className="flex justify-center items-center space-x-80">
      {items.map((cardInfo, i) => {
        if (i < page - 1 || i > page + 1) {
          return null;
        }

        const isActive = i === page;
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
