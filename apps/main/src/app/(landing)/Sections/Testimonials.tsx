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
    id: 1,
    passportNumber: "AA000000",
    firstName: "Jane",
    lastName: "Doe",
    major: "Computer Science & Design",
    year: "3",
    quote: "1",
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
    quote: "2",
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
    quote: "3",
    image: "/jane_doe.png",
    isSponsor: false,
  },
  {
    id: 4,
    passportNumber: "AA000000",
    firstName: "Jenny",
    lastName: "Doe",
    major: "Computer Science & Econ",
    year: "4",
    quote: "4",
    image: "/jane_doe.png",
    isSponsor: false,
  },
  {
    id: 5,
    passportNumber: "AA000000",
    firstName: "Jenny",
    lastName: "Doe",
    major: "Computer Science & Econ",
    year: "4",
    quote: "5",
    image: "/jane_doe.png",
    isSponsor: false,
  },
];

const Testimonials: React.FC<{ people: person[] }> = ({ people }) => {
  const [page, setPage] = useState(1);

  function onClickLeftArrow() {
    setPage((prevPage) => {
      const newPage = prevPage > 1 ? prevPage - 1 : 1;
      return newPage;
    });
  }

  function onClickRightArrow() {
    setPage((prevPage) => {
      const newPage = prevPage < people.length ? prevPage + 1 : people.length;
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
        className="absolute left-5 top-1/2 transform -translate-y-1/2 z-2"
      />
      <ArrowButton
        direction="right"
        arrowButtonColor="greenButton"
        onClick={onClickRightArrow}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 z-2"
      />
      <Carousel items={people} page={page} />
      <div className="absolute bottom-7 w-full">
        <PaginationDots
          currentPage={page}
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
      height={80}
    />
  );
}
