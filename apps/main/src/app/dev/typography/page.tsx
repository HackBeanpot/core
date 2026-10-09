import React from "react";
import { Typography } from "../../lib/Components/museum/Typography";

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
] as const;

export default function TypographyDevPage() {
  return (
    <main className="min-h-screen p-8">
      <Typography variant="heroTitle" as="h1">
        Typography
      </Typography>

      <div className="mt-12 space-y-12">
        {variants.map(({ name, text }) => (
          <section key={name} className="border-b border-gray-300 pb-8">
            <p className="mb-3 text-sm text-gray-500">{name}</p>

            <Typography variant={name} as="p">
              {text}
            </Typography>
          </section>
        ))}
      </div>
    </main>
  );
}
