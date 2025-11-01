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
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "Am I eligible to attend the hackathon?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "Where is the hackathon?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "Is this an in-person or virtual hackathon?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "How long is the hackathon?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
];

const appQuestions = [
  {
    question: "How do I apply to HackBeanpot?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "How can I be a mentor or judge?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "I applied! When will I hear back?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
];

const logisticsQuestions = [
  {
    question: "Will my travel be reimbursed?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "How do I find a team?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "How do teams work?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "What are the prizes this year?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "Will there be overnight acccommodations?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "Will food be provided?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "Does my project have to be carnival themed?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
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
    isTablet && "h-[35vh] pt-10 mobile-xl:h-[30vh] mobile-xl:pt-40 mobile-xl:mb-20",
    isMobile && "h-[20vh] pt-10"
  );

  const fireworkStyles = clsx(
    "w-full z-0 scale-125",
    isTablet && "pl-6",
    isDesktop && "pl-16",
    isMobile && "pl-8"
  );

  const ribbonStyles = clsx("w-3/4", 
    isDesktop && "w-1/2",
  );

  const accordionStyles = clsx(
    "relative z-10 size-full mb-32",
  );

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
