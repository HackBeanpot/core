import React from "react";
import { Typography } from "../../../lib/Components/museum/Typography";

const variants = [
  {
    name: "heroTitle",
    text: "HackBeanpot",
  },
  {
    name: "sectionTitle",
    text: "Section Title",
  },
  {
    name: "displayName",
    text: "Jane Doe",
  },
  {
    name: "cardTitle",
    text: "Card Title",
  },
  {
    name: "label",
    text: "Label Text",
  },
  {
    name: "body",
    text: "This is an example of body text so we can see the font size and line height.",
  },
  {
    name: "bodySmall",
    text: "This is smaller body text.",
  },
  {
    name: "role",
    text: "Software Engineer",
  },
  {
    name: "faqQuestion",
    text: "What is HackBeanpot?",
  },
  {
    name: "faqQuestionOpen",
    text: "What is HackBeanpot?",
  },
] as const;

/** Every variant at the current breakpoint; `/dev/typography` frames it at each width. */
export default function TypographySpecimenPage() {
  return (
    <main className="min-h-screen space-y-6 bg-white p-8">
      {variants.map(({ name, text }) => (
        <section key={name} className="border-b border-gray-300 pb-6">
          <p className="mb-2 font-sans text-sm text-gray-500">{name}</p>
          <Typography variant={name}>{text}</Typography>
        </section>
      ))}
    </main>
  );
}
