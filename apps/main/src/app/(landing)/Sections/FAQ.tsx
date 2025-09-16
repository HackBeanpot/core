import React from "react";
import Accordion from "./../../lib/Components/Accordian";
// import clsx from "clsx";

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
      color: 'white', fontSize: '20px', backgroundColor: '#1F2937', padding: '48px 24px'}}>
        FAQ
        <Accordion items={faqData} />
      </div>
  );
}
