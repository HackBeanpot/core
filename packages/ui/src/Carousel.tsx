"use client";
import React, { useState } from "react";
import { ArrowButton } from "@repo/ui";
import PassportCard, { PassportCardProps } from "./PassportCard";
interface CarouselProps {
  items: PassportCardProps[];
}
const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [activeSlide, setActiveSlide] = useState(Math.floor(items.length / 2));
  const handleNext = () => {
    if (activeSlide < items.length - 1) {
      setActiveSlide((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
    }
  };
  const getStyles = (index: number) => {
    if (activeSlide === index) return "z-10";
    else if (activeSlide - 1 === index)
      return "translate-x[-240px] translate-z[-400px] rotateY[35deg] opacity-50 z-9";
    else if (activeSlide + 1 === index)
      return "translate-x[240px] translate-z[-400px] rotateY[35deg] opacity-50 z-9";
    else return "hidden";
  };
  return (
    <div className="carousel-container grid grid-cols-3 w-full h-screen">
      <div className="flex justify-center mt-60">
        <ArrowButton
          direction="left"
          arrowButtonColor={`${items[activeSlide].isSponsor ? "beigeButton" : "greenButton"}`}
          onClick={handlePrev}
        />
      </div>
      <div>
        {items.map((cardInfo, i) => (
          <React.Fragment key={cardInfo.id}>
            <div className={getStyles(i)}>
              <PassportCard {...cardInfo} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-60">
        <ArrowButton
          direction="right"
          arrowButtonColor={`${items[activeSlide].isSponsor ? "beigeButton" : "greenButton"}`}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};
export default Carousel;
