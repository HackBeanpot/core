import type { SectionHeading, Testimonial } from "./types";

export const testimonialsSection: SectionHeading = {
  title: "HACKER TESTIMONIALS",
};

// From the 2026 site (2026.hackbeanpot.com).
export const testimonials: Testimonial[] = [
  {
    quote:
      "I joined the astronaut bootcamp event in 2021, and I wanted to highlight my great experience there. I was able to connect with friendly people, learn about web development through workshops, and have free pizza for lunch!",
    name: "Jimin Kim",
    school: "Northeastern",
    classYear: 2022,
    photo: { src: "/testimonials/photos/jimin-kim.webp", alt: "Jimin Kim" },
  },
  {
    quote:
      "I enjoyed working with my teammates and trying to debug our mistakes. Debugging is a lot more fun when you have people doing it with you.",
    name: "Raisa Bhuiyan",
    school: "Northeastern",
    classYear: 2025,
    photo: {
      src: "/testimonials/photos/raisa-bhuiyan.webp",
      alt: "Raisa Bhuiyan with teammates at HackBeanpot",
    },
  },
  {
    quote:
      "I loved the collaboration between me, my teammates, and the amazing mentors! Prior to this hackathon I had never touched any kind of React or front-end web development but I came out of it feeling accomplished, having achieved a working website!",
    name: "Spencer Shao",
    school: "Northeastern",
    classYear: 2024,
    photo: {
      src: "/testimonials/photos/spencer-shao.webp",
      alt: "Spencer Shao",
    },
  },
  {
    quote:
      "I had a ton of fun at HackBeanpot! We made a Chrome extension that censored inappropriate language on the internet. My favorite part was when one of my teammates got an animated duck to quack when clicking on the extension icon!",
    name: "Karyna Yen",
    school: "Northeastern",
    classYear: 2025,
    photo: { src: "/testimonials/photos/karyna-yen.webp", alt: "Karyna Yen" },
  },
];
