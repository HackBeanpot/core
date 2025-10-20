"use client";

import React from "react";
import Accordion from "./../../lib/Components/Accordian";
import RibbonTitle from "@repo/ui/RibbonTitle";
// import FAQCarousel from "../../lib/Components/FAQComponents/FAQCarousel";
// import FAQFireworks from "../../lib/Components/FAQComponents/FAQFireworks";

const generalQuestions = [
  {
    question: "When is the hackathon?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "When is the hackathon?",
    answer:
      "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th.",
  },
  {
    question: "When is the hackathon?",
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
    content: generalQuestions,
  },
  {
    title: "Event Logistics",
    content: generalQuestions,
  },
];

export default function FAQ() {
  return (
    <div className="flex flex-col items-center text-white text-[20px] px-[48px] py-[24px]">
      {/* <FAQFireworks /> */}
      <RibbonTitle text={"FAQ"} />
      <Accordion items={faqData} />
      {/* <FAQCarousel /> */}
    </div>
  );
}
