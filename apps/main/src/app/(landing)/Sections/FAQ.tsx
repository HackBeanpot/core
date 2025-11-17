"use client";

import React from "react";
import Accordion from "./../../lib/Components/Accordian";
import RibbonTitle from "@repo/ui/RibbonTitle";
import FAQFireworks from "../../lib/Components/FAQComponents/FAQFireworks";
import FAQCarousel from "../../lib/Components/FAQComponents/FAQCarousel";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";

const generalQuestions = [
  {
    question: "When is the hackathon?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 13th and ending on Sunday, February 15th.",
  },
  {
    question: "Am I eligible to attend the hackathon?",
    answer:
      "Yes! As long as you're an undergraduate student at an accredited college or university, you're eligible to attend! HackBeanpot is committed to creating a beginner-friendly and inclusive environment for all participants.",
  },
  {
    question: "How long is the hackathon?",
    answer:
      "The hackathon runs over a weekend in February 2026, beginning on Friday evening and wrapping up by early Sunday afternoon. A detailed schedule will be shared as the event approaches.",
  },
];

const appQuestions = [
  {
    question: "How can I be a mentor or judge?",
    answer:
      "For more information about becoming a mentor or a judge, please refer to the information found here: … If you are interested, please fill out this form.",
  },
];

const logisticsQuestions = [
  {
    question: "Will my travel be reimbursed?",
    answer:
      "Unfortunately, we’re not able to offer travel reimbursement for HackBeanpot 2026.",
  },
  {
    question: "How do teams work?",
    answer:
      "Teams can be formed in two ways: either before the event through the application process or during the first day of the hackathon. If you don’t have a team when you arrive, we’ll host team formation activities to help you find collaborators!",
  },
  {
    question: "What are the prizes this year?",
    answer:
      "Prizes will be awarded to teams that win in specific prize categories. While we’re keeping the exact prizes under wraps for now, they’ll be fun and aligned with the associated prize category.",
  },
  {
    question: "Will there be overnight acccommodations?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "Will food be provided?",
    answer:
      "Yes! Dinner and Lunch meals will be provided for the duration of the hackathon. Light breakfast options will also be available on Saturday and Sunday.",
  },
  {
    question: "Does my project have to be carnival themed?",
    answer:
      "Not at all! While we encourage teams to get creative and incorporate this year’s carnival theme, it’s entirely optional. Projects will still be fully eligible for judging regardless of theme.",
  },
];

const faqData = [
  {
    title: "General",
    content: generalQuestions,
  },
  {
    title: "Application",
    content: appQuestions,
  },
  {
    title: "Event Logistics",
    content: logisticsQuestions,
  },
];

export default function FAQ() {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const outerStyles = clsx(
    "flex flex-col items-center text-white text-[20px] size-full bg-starlightBlueDark overflow-hidden",
  );

  const bannerStyles = clsx(
    "relative w-full pointer-events-none flex items-center justify-center z-10",
    isDesktop && "h-[45vh] pt-20",
    isTablet &&
      "h-[35vh] pt-10 mobile-xl:h-[30vh] mobile-xl:pt-40 mobile-xl:mb-20",
    isMobile && "h-[20vh] pt-10",
  );

  const fireworkStyles = clsx(
    "w-full z-0 scale-125",
    isTablet && "pl-6",
    isDesktop && "pl-16",
    isMobile && "pl-8",
  );

  const ribbonStyles = clsx("w-3/4", isDesktop && "w-1/2");

  const accordionStyles = clsx("relative z-10 size-full mb-32");

  const carouselStyles = clsx("relative w-[100vw] h-full scale-110 z-0");

  return (
    <div className={outerStyles}>
      {/* Fireworks */}
      <div className="absolute w-full h-full z-0 overflow-hidden">
        <FAQFireworks className={fireworkStyles} />
      </div>

      {/* Banner */}
      <div className={bannerStyles}>
        <div className={ribbonStyles}>
          <RibbonTitle text={"FAQ"} />
        </div>
      </div>

      {/* Accordion */}
      <div className={accordionStyles}>
        <Accordion items={faqData} />
      </div>

      {/* Carousel */}
      <FAQCarousel className={carouselStyles} />
    </div>
  );
}
