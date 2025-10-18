"use client"

import React from "react";
import Accordion from "./../../lib/Components/Accordian";
import RibbonTitle from "@repo/ui/RibbonTitle";

const faqData = [
  {
    title: "When is the hackathon?",
    content: "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th."
  },
  {
    title: "When is the hackathon?",
    content: "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th."
  },
  {
    title: "When is the hackathon?",
    content: "HackBeanpot is a three day long event, beginning on Friday, February 11th and ending on Sunday, February 13th."
  }
];

export default function FAQ() {
  return (
      <div className="flex flex-col items-center text-white text-[20px] px-[48px] py-[24px]">
        <RibbonTitle text={"FAQ"} />
        <Accordion items={faqData} />
      </div>
  );
}
