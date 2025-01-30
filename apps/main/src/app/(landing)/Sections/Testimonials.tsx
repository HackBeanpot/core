import React from "react";
import Image from "next/image";
import { Section, Carousel, StreetSign } from "@repo/ui";

const background = (
  <div>
    <Image
      alt="TestimonialBackground"
      src="/testimonial_background.svg"
      fill
      className="object-cover"
    />
  </div>
);

// const people = [
//   {
//     id: 1,
//     author: "Jane Doe",
//     quote: "I AM SUPER COOL",
//     image: "/jane_doe.png",
//     isSponsor: false,
//   },
//   {
//     id: 2,
//     author: "John Doe",
//     quote: "I AM EVEN COOLER",
//     image: "/john_doe.png",
//     isSponsor: true,
//   },
//   {
//     id: 3,
//     author: "Alice Smith",
//     quote: "I AM THE COOLEST",
//     image: "/alice_smith.png",
//     isSponsor: false,
//   },
// ];
const people = [
  {
    id: 1,
    passportNumber: "AA000000",
    firstName: "Jane",
    lastName: "Doe",
    major: "Computer Science & Design",
    year: "3",
    quote: "I AM SUPER COOL",
    image: "/jane_doe.png",
    isSponsor: false,
  },
  {
    id: 2,
    passportNumber: "AA000000",
    firstName: "Carole",
    lastName: "Doe",
    major: "Computer Science & Business",
    year: "4",
    quote: "I really like soup a lot... i think soup is great!",
    image: "/jane_doe.png",
    isSponsor: false,
  },
  {
    id: 3,
    passportNumber: "AA000000",
    firstName: "Jenny",
    lastName: "Doe",
    major: "Computer Science & Econ",
    year: "4",
    quote: "I am an avid soup hater!",
    image: "/jane_doe.png",
    isSponsor: false,
  },
];

const content = (
  <div className="mt-8">
    <StreetSign streetName="Testimonials" suffix="ST" />
    <Carousel items={people} />
  </div>
);

export default function TestimonialSection(): React.ReactNode {
  return (
    <Section
      name={"testimonials"}
      background={background}
      content={content}
      height={100}
    />
  );
}
