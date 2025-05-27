"use client";

import React, { useState } from "react";
import StreetSign from "@repo/ui/StreetSign";
import ArrowButton from "@repo/ui/ArrowButton";
import Carousel from "@repo/ui/Carousel";
import TestimonialsBackground from "../../lib/Assets/SVG/TestimonialsBackground";
import PaginationDots from "@repo/ui/PaginationDots";

type Person = {
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

const defaultOrder: Person[] = [
  {
    id: 0,
    passportNumber: "ZT183920",
    firstName: "Karyna",
    lastName: "Yen",
    major: "Computer Science",
    year: "Northeastern '25",
    quote:
      '"I had a ton of fun at HackBeanpot! We made a Chrome extension that censored inappropriate language on the internet. My favorite part was when one of my teammates got an animated duck to quack when clicking on the extension icon!"',
    image: "/karyna.png",
    isSponsor: false,
  },
  {
    id: 1,
    passportNumber: "MP274861",
    firstName: "Ji-min",
    lastName: "Kim",
    major: "Computer Science",
    year: "Northeastern '22",
    quote:
      '"I joined the astronaut bootcamp event in 2021, and I wanted to highlight my great experience there. I was able to connect with friendly people, learn about web development through workshops, and have free pizza for lunch! It was a really unique experience I had during the weekend, and this event also gave me motivation for me to join my first hackathon event in bostonhacks!"',
    image: "/jimin.png",
    isSponsor: false,
  },
  {
    id: 2,
    passportNumber: "JS428172",
    firstName: "Spencer",
    lastName: "Shao",
    major: "Computer Science & Music Tech",
    year: "Northeastern '24",
    quote:
      '"I loved the collaboration between me, my teammates, and the amazing mentors! I really felt like it was a very welcoming environment for me to prioritize learning and having fun over 3 days. Prior to this hackathon I had never touched any kind of React or front-end web development but I came out of it feeling accomplished, having achieved a working website!"',
    image: "/spencer2.png",
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
    image: "/group.png",
    isSponsor: false,
  },
];

export default function TestimonialSection(): React.ReactNode {
  const [people, setPeople] = useState(defaultOrder);
  const [currentPage, setCurrentPage] = useState(0);

  function onClickLeftArrow() {
    setPeople((prevPeople) => {
      const newPeople = [...prevPeople];
      const lastPerson = newPeople.pop();
      newPeople.unshift(lastPerson!);
      return newPeople;
    });
    setCurrentPage((prevPage) => {
      const newPage = prevPage > 0 ? prevPage - 1 : people.length - 1;
      return newPage;
    });
  }

  function onClickRightArrow() {
    setPeople((prevPeople) => {
      const newPeople = [...prevPeople];
      const firstPerson = newPeople.shift();
      newPeople.push(firstPerson!);
      return newPeople;
    });
    setCurrentPage((prevPage) => {
      const newPage = prevPage < people.length - 1 ? prevPage + 1 : 0;
      return newPage;
    });
  }

  function handleClick(index: number) {
    setPeople((prevPeople) => {
      const newPeople = [...prevPeople];
      const toMoveToFront = newPeople.splice(index - currentPage);
      return [...toMoveToFront, ...newPeople];
    });
    setCurrentPage(index);
  }
  return (
    <div className="flex flex-col items-center justify-center">
        <TestimonialsBackground
          height={1080}
          width={1920}
          preserveAspectRatio="none"
        />
      <div className="absolute h-full font-bold text-center text-[#B2A0C2] p-8 font-Wilden-Regular">
        <StreetSign streetName="Testimonials" suffix="ST" />
      </div>

      <ArrowButton
        direction="left"
        arrowButtonColor="greenButton"
        onClick={onClickLeftArrow}
        className="absolute left-5 top-[54%] transform -translate-y-1/2 z-20"
      />
      <ArrowButton
        direction="right"
        arrowButtonColor="greenButton"
        onClick={onClickRightArrow}

        className="absolute right-10 top-[54%] transform -translate-y-1/2 z-20"
      />
      <div className="absolute w-full h-full">
        <Carousel items={people.slice(0, 3)} />
      </div>
      <div className="absolute bottom-7 w-full">
        <PaginationDots
          currentPage={currentPage}
          totalPages={people.length}
          color="vineGreenLite"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
