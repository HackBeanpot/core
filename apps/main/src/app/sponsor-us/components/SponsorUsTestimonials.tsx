"use client";

import React, { useState } from "react";
import SponsorUsTestimonialsBackground from "../../lib/Assets/SVG/SponsorUsPageAssets/SponsorUsTestimonialsBackground";
import RibbonTitle from "@repo/ui/RibbonTitle";
import clsx from "clsx";
import TestimonialsFerrisWheel from "../../lib/Assets/SVG/SponsorUsPageAssets/TestimonialsFerrisWheel";
import Button from "@repo/ui/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SponsorUsTestimonialCart from "./SponsorUsTestimonialCart";
import useDevice from "@util/hooks/useDevice";

const defaultOrder = [
  {
    testimonial:
      "If I could describe HBP in one word - invigorating. We had a lot of folks who weren’t  sure what the experience would be like, and they left feeling united - really energized and really impressed with the amount of talent that was on display as well as the atmosphere.",
    sponsorRep: "Rob Antczak",
    sponsorRepPosition: "CTO",
    sponsor: "Wood Mackenzie",
  },
  {
    testimonial:
      "This hackathon is very good for recruitment. We recruited half of our Fall 2023 tech co-ops exclusively through this hackathon. I’ve talked to every single project group that participated in the hackathon, observing their capabilities to explain and communicate their project to an outsider – the very things we look for at WoodMac.",
    sponsorRep: "William Guo",
    sponsorRepPosition: "Senior Software Engineer and Co-op Experiential Lead",
    sponsor: "Wood Mackenzie",
  },
];

export default function SponsorUsTestimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState("");
  const [currWheelAngle, setCurrWheelAngle] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const { isMobile, isTablet, isDesktop } = useDevice();

  const currentItem = defaultOrder[currentIdx];
  const leftBound = currentIdx === 0;
  const rightBound = currentIdx === defaultOrder.length - 1;

  const triggerAnimation = (direction: "left" | "right") => {
    if (
      (leftBound && direction === "left") ||
      (rightBound && direction === "right")
    ) {
      return;
    }

    setCurrentAnimation(
      direction === "left" ? "animate-fade-left" : "animate-fade-right",
    );

    setCurrWheelAngle((prev) => (direction === "left" ? prev - 90 : prev + 90));

    setAnimationKey((prev) => prev + 1);
  };

  function onClickLeftArrow() {
    setCurrentIdx((prev) => Math.max(prev - 1, 0));
    triggerAnimation("left");
  }

  function onClickRightArrow() {
    setCurrentIdx((prev) => Math.min(prev + 1, defaultOrder.length - 1));
    triggerAnimation("right");
  }

  const outerDivStyles = clsx(
    "relative flex flex-col items-center justify-center overflow-hidden",
  );

  const outerRibbonStyles = clsx(
    "absolute z-10 w-full top-[20%] desktop:top-[20%] desktop-md:top-[25%]",
    isMobile && "scale-[60%]",
    isTablet && "scale-[65%]"
  );

  const cartOuterStyles = clsx(
    "absolute z-20 top-[15%]",
    isDesktop && "top-[35%] desktop-md:top-[40%]",
  );

  const buttonsOuterStyles = clsx(
    "absolute w-full z-20 mobile:top-[60%] tablet:top-[55%] desktop:top-[50%] desktop-md:top-[55%]"
  );

  const buttonsInnerStyles = clsx(
    "absolute flex flex-row items-center justify-center w-full h-auto gap-[60vw]",
    isTablet && "gap-[70vw]",
  );

  const buttonSizes = clsx(
    isTablet && 40,
    isDesktop && 60
  );

  const ferrisWheelStyles = clsx(
    "absolute size-full z-10 transform transition-transform duration-300 top-[70%]",
    isDesktop && "top-[80%]",
  );

  const ferrisWheelScaling = clsx(
    "scale(1.2)",
    isDesktop && "scale(1.5)",
  );

  const backgroundStyles = clsx(
    "relative z-0 w-[165vw] h-full bg-tomato -ml-10",
  );

  return (
    <div className={outerDivStyles}>
      {/* Testimonials Ribbon */}
      <div className={outerRibbonStyles}>
        <RibbonTitle text={"TESTIMONIALS"} />
      </div>
      {/* Testimonials Cart */}
      <div className={cartOuterStyles}>
        <div
          key={animationKey}
          className={`transition-opacity duration-300 animate-ease-out ${currentAnimation}`}
        >
          <SponsorUsTestimonialCart
            testimonial={currentItem.testimonial}
            sponsorRep={currentItem.sponsorRep}
            sponsorRepPosition={currentItem.sponsorRepPosition}
            sponsor={currentItem.sponsor}
          />
        </div>
      </div>
      {/* Buttons */}
      <div className={buttonsOuterStyles}>
        <div
          className={buttonsInnerStyles}
        >
          {/* Left Button */}
          <Button
            color={leftBound ? "starlightBlueLight" : "starlightBlue"}
            icon={<IoIosArrowBack size={buttonSizes} />}
            size="small"
            textColor="carouselCreamLight"
            removePadding={true}
            onClick={onClickLeftArrow}
          />
          {/* Right Button */}
          <Button
            color={rightBound ? "starlightBlueLight" : "starlightBlue"}
            icon={<IoIosArrowForward size={buttonSizes} />}
            size="small"
            textColor="carouselCreamLight"
            removePadding={true}
            onClick={onClickRightArrow}
          />
        </div>
      </div>

      {/* Ferris Wheel */}
      <TestimonialsFerrisWheel
        className={ferrisWheelStyles}
        style={{ transform: `${ferrisWheelScaling} rotate(${currWheelAngle}deg)` }}
      />

      {/* Testimonials Background */}
      <SponsorUsTestimonialsBackground className={backgroundStyles} />
    </div>
  );
}
