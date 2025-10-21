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
  const { isDesktop } = useDevice();

  const outerStyles = clsx(
    "flex flex-col items-center text-white text-[20px] size-full bg-starlightBlueDark overflow-hidden",
  );

  const bannerStyles = clsx("relative w-full pointer-events-none desktop:h-[60vh] tablet:h-[40vh] mobile-xl:h-[30vh] mobile:h-[20vh]");

  const fireworkStyles = clsx("w-full desktop:scale-125 desktop:pl-16 mobile:pl-8 z-0");

  const ribbonOuterStyles = clsx(
    "absolute z-10 inset-0 flex items-center justify-center h-full",
  );
  
  const ribbonStyles = clsx(
    "w-3/4",
    isDesktop && "w-1/2"
  );

  const accordionStyles = clsx(
    "relative size-full mb-32 tablet:-mt-10",
  );

  const carouselStyles = clsx("relative w-[100vw] h-full scale-110");

  return (
    <div className={outerStyles}>
      {/* Banner */}
      <div className={bannerStyles}>
        <div className="w-full h-full">
          <FAQFireworks className={fireworkStyles} />
        </div>
        <div className={ribbonOuterStyles}>
          <div className={ribbonStyles}>
            <RibbonTitle text={"FAQ"} />
          </div>
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
