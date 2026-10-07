import type { FaqCategory, FaqItem, Labeled, SectionHeading } from "./types";

export const faqSection: SectionHeading = {
  title: "FAQs",
};

export const faqCategories: Labeled<FaqCategory>[] = [
  { id: "general", label: "General" },
  { id: "application", label: "Application" },
  { id: "logistics", label: "Event Logistics" },
];

// TODO(content): every empty answer still needs writing
export const faq: FaqItem[] = [
  {
    category: "general",
    question: "When is the hackathon?",
    answer: "",
  },
  {
    category: "general",
    question: "Am I eligible to attend the hackathon?",
    answer: "",
  },
  { category: "general", question: "Where is the hackathon?", answer: "" },
  {
    category: "general",
    question: "Is this an in-person or virtual hackathon?",
    answer: "",
  },
  { category: "general", question: "How long is the hackathon?", answer: "" },

  {
    category: "application",
    question: "How do I apply to HackBeanpot?",
    answer: "",
  },
  {
    category: "application",
    question: "How can I be a mentor or judge?",
    answer: "",
  },
  {
    category: "application",
    question: "I applied! When will I hear back?",
    answer: "",
  },

  {
    category: "logistics",
    question: "Will my travel be reimbursed?",
    answer: "",
  },
  { category: "logistics", question: "How do I find a team?", answer: "" },
  { category: "logistics", question: "How do teams work?", answer: "" },
  {
    category: "logistics",
    question: "What are the prizes this year?",
    answer: "",
  },
  {
    category: "logistics",
    question: "Will there be overnight accommodations?",
    answer: "",
  },
  { category: "logistics", question: "Will food be provided?", answer: "" },
];
