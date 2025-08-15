"use client";
import React from "react";
import PassportCard, { PassportCardProps } from "./PassportCard";
import clsx from "clsx";

interface CarouselProps {
  items: PassportCardProps[];
  isSponsor?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ items, isSponsor }) => {

  const sponsorStyling = clsx(
    "desktop:space-x-80 mobile:space-x-44",
    isSponsor && "desktop:space-x-72 mobile:space-x-32",
  );

  return (
    <div className={`flex justify-center items-center ${sponsorStyling}`}>
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
