"use client";

import React from "react";
import SponsorUsCarouselCard, {
  CarouselCardProps,
} from "./SponsorUsCarouselCard";
// import clsx from "clsx";

interface CarouselProps {
  items: CarouselCardProps[];
  className?: string;
}

export default function SponsorUsCarousel({
  items,
  className,
}: CarouselProps): JSX.Element {
  return (
    <div className={`flex -space-x-72 ${className}`}>
      {items.map((cardInfo, i) => {
        const isActive = i === 1;
        const activeClass = isActive ? "opacity-100 z-20" : "opacity-0 z-0";
        const updatedInfo = { ...cardInfo, isActive };

        return (
          <div
            key={cardInfo.id}
            className={`transition-opacity duration-300 ${activeClass}`}
          >
            <SponsorUsCarouselCard {...updatedInfo} />
          </div>
        );
      })}
    </div>
  );
}
