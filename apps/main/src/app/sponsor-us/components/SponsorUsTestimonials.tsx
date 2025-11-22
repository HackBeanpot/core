"use client";

import React, { useState } from "react";
import SponsorUsTestimonialsBackground from "../../lib/Assets/SVG/SponsorUsPageAssets/SponsorUsTestimonialsBackground";
import RibbonTitle from "@repo/ui/RibbonTitle";
import clsx from "clsx";
import SponsorUsCarousel from "./SponsorUsCarousel";
import TestimonialsFerrisWheel from "../../lib/Assets/SVG/SponsorUsPageAssets/TestimonialsFerrisWheel";
// import Button from "@repo/ui/Button";
// import { IoIosArrowUp } from "react-icons/io";

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
  const [testimonials, ] = useState(defaultOrder); // add setTestimonials back in
  // const [currentPage, setCurrentPage] = useState(0);

  const outerDivStyles = clsx(
    "relative flex flex-col items-center justify-center overflow-hidden",
  );

  const outerRibbonStyles = clsx("absolute z-10 top-[25%] w-full");

  const ribbonScaling = clsx("scale-100");

  const backgroundStyles = clsx(
    "relative z-0 w-[165vw] h-full bg-tomato -ml-10",
  );

  // function onClickLeftArrow() {
  //   setTestimonials((prevBlurb) => {
  //     const newBlurb = [...prevBlurb];
  //     const lastBlurb = newBlurb.pop();
  //     newBlurb.unshift(lastBlurb!);
  //     return newBlurb;
  //   });

  //   setCurrentPage((prevPage) => {
  //     const newPage = prevPage > 0 ? prevPage - 1 : testimonials.length - 1;
  //     return newPage;
  //   });
  // }

  // function onClickRightArrow() {
  //   setTestimonials((prevBlurb) => {
  //     const newBlurb = [...prevBlurb];
  //     const firstPerson = newBlurb.shift();
  //     newBlurb.push(firstPerson!);
  //     return newBlurb;
  //   });

  //   setCurrentPage((prevPage) => {
  //     const newPage = prevPage < testimonials.length - 1 ? prevPage + 1 : 0;
  //     return newPage;
  //   });
  // }

  // function handleClick(index: number) {
  //   setTestimonials((prevBlurb) => {
  //     const newBlurb = [...prevBlurb];
  //     const toMoveToFront = newBlurb.splice(index - currentPage);
  //     return [...toMoveToFront, ...newBlurb];
  //   });

  //   setCurrentPage(index);
  // }

  return (
    <div className={outerDivStyles}>
      <div className={outerRibbonStyles}>
        <div className={ribbonScaling}>
          <RibbonTitle text={"TESTIMONIALS"} />
        </div>
      </div>
      <div className="absolute top-[40%]">
        <SponsorUsCarousel items={testimonials.slice(0)} />
      </div>
      <TestimonialsFerrisWheel className="absolute top-[100%] size-full z-10 scale-[175%]" />
      {/* <Button color="bg-starlightBlue" icon={<IoIosArrowUp />} /> */}
      <SponsorUsTestimonialsBackground className={backgroundStyles} />
    </div>
  );
}
