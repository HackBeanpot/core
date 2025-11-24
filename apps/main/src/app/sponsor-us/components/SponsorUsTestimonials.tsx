"use client";

import React, { useState } from "react";
import SponsorUsTestimonialsBackground from "../../lib/Assets/SVG/SponsorUsPageAssets/SponsorUsTestimonialsBackground";
import RibbonTitle from "@repo/ui/RibbonTitle";
import clsx from "clsx";
import TestimonialsFerrisWheel from "../../lib/Assets/SVG/SponsorUsPageAssets/TestimonialsFerrisWheel";
import Button from "@repo/ui/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SponsorUsTestimonialCart from "./SponsorUsTestimonialCart";

const defaultOrder = [
  {
    id: 0,
    testimonial:
      "If I could describe HBP in one word - invigorating. We had a lot of folks who weren’t  sure what the experience would be like, and they left feeling united - really energized and really impressed with the amount of talent that was on display as well as the atmosphere.",
    sponsorRep: "Rob Antczak",
    sponsorRepPosition: "CTO",
    sponsor: "Wood Mackenzie",
  },
  {
    id: 1,
    testimonial:
      "This hackathon is very good for recruitment. We recruited half of our Fall 2023 tech co-ops exclusively through this hackathon. I’ve talked to every single project group that participated in the hackathon, observing their capabilities to explain and communicate their project to an outsider – the very things we look for at WoodMac.",
    sponsorRep: "William Guo",
    sponsorRepPosition: "Senior Software Engineer and Co-op Experiential Lead",
    sponsor: "Wood Mackenzie",
  },
  {
    id: 1,
    testimonial:
      "I love hackathons, I love hackathons, I love hackathons, I love hackathons, I love coding, I want to eat computers I love hackathons, I love hackathons, I love hackathons, I love hackathons, I love coding, I want to eat computers I love hackathons, I love hackathons, I love hackathons, I love hackathons, I love coding",
    sponsorRep: "Khushi Khan",
    sponsorRepPosition:
      "Former Senior Software Engineer and Co-op Experiential Lead",
    sponsor: "Wood Mackenzie",
  },
];

export default function SponsorUsTestimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState("");
  const [animationKey, setAnimationKey] = useState(0);

  const currentItem = defaultOrder[currentIdx];
  const leftBound = currentIdx === 0;
  const rightBound = currentIdx === defaultOrder.length - 1;

  const triggerAnimation = (direction: "left" | "right") => {
    if ((leftBound && direction === "left") || (rightBound && direction === "right")) {
      return;
    }
    
    setCurrentAnimation(direction === "left" ? "animate-fade-left" : "animate-fade-right");
    setAnimationKey(prev => prev + 1);
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

  const outerRibbonStyles = clsx("absolute z-10 top-[25%] w-full");

  const backgroundStyles = clsx(
    "relative z-0 w-[165vw] h-full bg-tomato -ml-10",
  );

  return (
    <div className={outerDivStyles}>
      <div className={outerRibbonStyles}>
          <RibbonTitle text={"TESTIMONIALS"} />
      </div>
      <div className="absolute top-[40%] z-20">
        <div 
          key={animationKey}
          className={`transition-opacity duration-300 animate-ease-out ${currentAnimation}`}>
          <SponsorUsTestimonialCart 
            id={currentItem.id} 
            testimonial={currentItem.testimonial} 
            sponsorRep={currentItem.sponsorRep} 
            sponsorRepPosition={currentItem.sponsorRepPosition} 
            sponsor={currentItem.sponsor}
          />
        </div>
      </div>
      <TestimonialsFerrisWheel className="absolute top-[100%] size-full z-10 scale-[175%]" />
      <div className="absolute w-full z-20 top-[60%]">
        <div
          className={`
              absolute
              flex flex-row items-center justify-center
              ${"gap-[55vw]"}
              w-full
              h-auto`}
        >
          <Button
            color={leftBound ? "starlightBlueLight" : "starlightBlue"}
            icon={<IoIosArrowBack size={60} />}
            size="small"
            textColor="carouselCreamLight"
            removePadding={true}
            onClick={onClickLeftArrow}
          />
          <Button
            color={rightBound ? "starlightBlueLight" : "starlightBlue"}
            icon={<IoIosArrowForward size={60} />}
            size="small"
            textColor="carouselCreamLight"
            removePadding={true}
            onClick={onClickRightArrow}
          />
        </div>
      </div>

      <SponsorUsTestimonialsBackground className={backgroundStyles} />
    </div>
  );
}
