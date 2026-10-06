import type { SectionHeading, Testimonial } from "./types";

export const testimonialsSection: SectionHeading = {
  title: "HACKER TESTIMONIALS",
};

export const testimonials: Testimonial[] = [
  // TODO(content): placeholder testimonial
  {
    quote:
      "I joined the astronaut bootcamp event in 2021, and I wanted to highlight my great experience there. I was able to connect with friendly people, learn about web development through workshops, and have free pizza for lunch!",
    name: "Jimin Kim",
    school: "Northeastern",
    classYear: 2022,
    photo: {
      src: "/testimonials/photos/placeholder.webp",
      alt: "Jimin Kim",
    },
  },
];
