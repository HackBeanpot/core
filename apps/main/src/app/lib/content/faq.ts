import { site } from "./site";
import type {
  FaqCategory,
  FaqItem,
  Labeled,
  SectionHeading,
  SocialPlatform,
} from "./types";

const APPLICATION_URL = "https://apply.hackbeanpot.com";
const MENTOR_JUDGE_APPLICATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSev7gbxgC0wiEUj-6T-K5mqc2pqPgNupVtEyvBq-WwIQ2q9oQ/viewform?usp=header";

const socialUrl = (platform: SocialPlatform) =>
  site.socials.find((s) => s.platform === platform)!.url;

export const faqSection: SectionHeading = {
  title: "FAQs",
};

export const faqCategories: Labeled<FaqCategory>[] = [
  { id: "general", label: "General" },
  { id: "application", label: "Application" },
  { id: "logistics", label: "Event Logistics" },
];

export const faq: FaqItem[] = [
  {
    category: "general",
    question: "Am I eligible to attend the hackathon?",
    answer: [
      "Yes! As long as you're an undergraduate student at an accredited college or university, you're eligible to attend! HackBeanpot is committed to creating a beginner-friendly and inclusive environment for all participants.",
    ],
  },
  {
    category: "general",
    question: "When is the hackathon?",
    answer: [
      "HackBeanpot is a three day long event, beginning on Friday, February 19th and ending on Sunday, February 21st.",
    ],
  },
  {
    category: "general",
    question: "Where is the hackathon?",
    answer: [
      "HackBeanpot 2027 will be held in-person at Klaviyo, 125 Summer Street, Boston, MA 02111.",
    ],
  },
  {
    category: "general",
    question: "Is this an in-person or virtual hackathon?",
    answer: [
      "HackBeanpot 2027 will be held in-person at Klaviyo, 125 Summer Street, Boston, MA 02111.",
    ],
  },
  {
    category: "general",
    question: "How long is the hackathon?",
    answer: [
      "The hackathon runs over a weekend in February 2027, beginning on Friday evening and wrapping up by early Sunday afternoon. A detailed schedule will be shared as the event approaches.",
    ],
  },
  {
    category: "general",
    question: "Does my project have to be ‘Night at the Museum’ themed?",
    answer: [
      "Not at all! While we encourage teams to get creative and incorporate this year’s theme, it’s entirely optional. Projects will still be fully eligible for judging regardless of theme.",
    ],
  },

  {
    category: "application",
    question: "How do I apply to the hackathon?",
    answer: [
      "Applications for HackBeanpot 2027 are not yet available, but you can find it ",
      { text: "here", href: APPLICATION_URL },
      " once it is released. You can also follow us on ",
      { text: "LinkedIn", href: socialUrl("linkedin") },
      " or ",
      { text: "Instagram", href: socialUrl("instagram") },
      " for the application opening announcement!",
    ],
  },
  {
    category: "application",
    question: "How can I be a mentor or a judge?",
    answer: [
      "For more information about becoming a mentor or a judge, please refer to our ",
      { text: "judge flyer", href: "/flyers/HackBeanpot_Judge_Flyer_2027.pdf" },
      " and ",
      {
        text: "mentor flyer",
        href: "/flyers/HackBeanpot_Mentor_Flyer_2027.pdf",
      },
      ". If you are interested, please check out the ",
      {
        text: "Mentor & Judge Application",
        href: MENTOR_JUDGE_APPLICATION_URL,
      },
      "!",
    ],
  },

  {
    category: "logistics",
    question: "Will my travel be reimbursed?",
    answer: [
      "Unfortunately, we’re not able to offer travel reimbursement for HackBeanpot 2027.",
    ],
  },
  {
    category: "logistics",
    question: "How do I find a team?",
    answer: [
      "Teams can be formed in three ways: either before the event through the application process, at our pre-event hacker meetup, or during the first day of the hackathon. If you don’t have a team when you arrive, we’ll host a team formation workshop to help you find collaborators!",
    ],
  },
  {
    category: "logistics",
    question: "What are the prizes this year?",
    answer: [
      "Prizes will be awarded to teams that win in specific prize categories. While we’re keeping the exact prizes under wraps, they’ll be fun and aligned with the associated prize category.",
    ],
  },
  {
    category: "logistics",
    question: "Will there be overnight accommodations?",
    answer: ["Yes! This year, HackBeanpot will be overnight at our venue."],
  },
  {
    category: "logistics",
    question: "Will food be provided?",
    answer: [
      "Yes! Lunch and dinner meals will be provided for the duration of the hackathon. Light breakfast options may also be available on Saturday and Sunday.",
    ],
  },
];
