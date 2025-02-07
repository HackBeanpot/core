"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Section, StreetSign, ArrowButton, Carousel } from "@repo/ui";
import { PaginationDots } from "./Calendar/Calendar";

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

type person = {
  id: number;
  passportNumber: string;
  firstName: string;
  lastName: string;
  major: string;
  year: string;
  quote: string;
  image: string;
  isSponsor: boolean;
};

const people: person[] = [
  {
    id: 0,
    passportNumber: "ZT183920",
    firstName: "Karyna",
    lastName: "Yen",
    major: "Computer Science", // Add a placeholder for the major
    year: "Northeastern '25",
    quote:
      '"I had a ton of fun at HackBeanpot! We made a Chrome extension that censored inappropriate language on the internet. My favorite part was when one of my teammates got an animated duck to quack when clicking on the extension icon!"',
    image: "/karyna.png", // Assuming this is a reference to an image path or variable
    isSponsor: false,
  },
  {
    id: 1,
    passportNumber: "MP274861", // Add a placeholder
    firstName: "Ji-min",
    lastName: "Kim",
    major: "Computer Science", // Add a placeholder for the major
    year: "Northeastern '22",
    quote:
      '"I joined the astronaut bootcamp event in 2021, and I wanted to highlight my great experience there. I was able to connect with friendly people, learn about web development through workshops, and have free pizza for lunch! It was a really unique experience I had during the weekend, and this event also gave me motivation for me to join my first hackathon event in bostonhacks!"',
    image: "/jimin.png", // Assuming this is a reference to an image path or variable
    isSponsor: false,
  },
  {
    id: 2,
    passportNumber: "JS428172", // Add a placeholder
    firstName: "Spencer",
    lastName: "Shao",
    major: "Computer Science & Music Tech", // Add a placeholder for the major
    year: "Northeastern '24",
    quote:
      '"I loved the collaboration between me, my teammates, and the amazing mentors! I really felt like it was a very welcoming environment for me to prioritize learning and having fun over 3 days. Prior to this hackathon I had never touched any kind of React or front-end web development but I came out of it feeling accomplished, having achieved a working website!"',
    image: "/spencer2.png", // Assuming this is a reference to an image path or variable
    isSponsor: false,
  },
  {
    id: 3,
    passportNumber: "QW938465",
    firstName: "Raisa",
    lastName: "Bhuiyan",
    major: "Computer Science",
    year: "Northeastern '25",
    quote:
      '"I enjoyed working with my teammates and trying to debug our mistakes. Debugging is a lot more fun when you have people doing it with you."',
    image: "/group.png", // Assuming this is a reference to an image path or variable
    isSponsor: false,
  },
];

// const people: person[] = [
//   {
//     id: 1,
//     passportNumber: "AA000000",
//     firstName: "Jane",
//     lastName: "Doe",
//     major: "Computer Science & Design",
//     year: "3",
//     quote: "1",
//     image: "/jane_doe.png",
//     isSponsor: false,
//   },
//   {
//     id: 2,
//     passportNumber: "AA000000",
//     firstName: "Carole",
//     lastName: "Doe",
//     major: "Computer Science & Business",
//     year: "4",
//     quote: "2",
//     image: "/jane_doe.png",
//     isSponsor: false,
//   },
//   {
//     id: 3,
//     passportNumber: "AA000000",
//     firstName: "Jenny",
//     lastName: "Doe",
//     major: "Computer Science & Econ",
//     year: "4",
//     quote: "3",
//     image: "/jane_doe.png",
//     isSponsor: false,
//   },
//   {
//     id: 4,
//     passportNumber: "AA000000",
//     firstName: "Jenny",
//     lastName: "Doe",
//     major: "Computer Science & Econ",
//     year: "4",
//     quote: "4",
//     image: "/jane_doe.png",
//     isSponsor: false,
//   },
//   {
//     id: 5,
//     passportNumber: "AA000000",
//     firstName: "Jenny",
//     lastName: "Doe",
//     major: "Computer Science & Econ",
//     year: "4",
//     quote: "5",
//     image: "/jane_doe.png",
//     isSponsor: false,
//   },
// ];

const Testimonials: React.FC<{ people: person[] }> = ({ people }) => {
  const [page, setPage] = useState(1);

  function onClickLeftArrow() {
    setPage((prevPage) => {
      const newPage = prevPage >= 1 ? prevPage - 1 : 0;
      return newPage;
    });
  }

  function onClickRightArrow() {
    setPage((prevPage) => {
      const newPage =
        prevPage < people.length - 1 ? prevPage + 1 : people.length - 1;
      return newPage;
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-bold text-center text-[#B2A0C2] p-8 font-Wilden-Regular">
        <StreetSign streetName="Testimonials" suffix="ST" />
      </div>
      <ArrowButton
        direction="left"
        arrowButtonColor="greenButton"
        onClick={onClickLeftArrow}
        className="absolute left-5 top-[54%] transform -translate-y-1/2 z-2"
      />
      <ArrowButton
        direction="right"
        arrowButtonColor="greenButton"
        onClick={onClickRightArrow}
        className="absolute right-10 top-[54%] transform -translate-y-1/2 z-2"
      />
      <div className="top-2">
        <Carousel items={people} page={page} />
      </div>

      <div className="absolute bottom-7 w-full">
        <PaginationDots
          currentPage={page + 1}
          totalPages={people.length}
          color="vineGreenLite"
        />
      </div>
    </div>
  );
};

export default function TestimonialSection(): React.ReactNode {
  return (
    <Section
      name={"testimonials"}
      background={background}
      content={<Testimonials people={people} />}
      height={115}
    />
  );
}
