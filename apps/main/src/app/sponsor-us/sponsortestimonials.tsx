"use client";

import React, { useState } from "react";
import ArrowButton from "@repo/ui/ArrowButton";
import Carousel from "@repo/ui/Carousel";
import PaginationDots from "@repo/ui/PaginationDots";

type CompanyTestimonial = {
  id: number;
  passportNumber: "0";
  year: "2025";
  major: "Computer Science";
  firstName: string;
  lastName: string;
  quote: string;
  image: string;
  isSponsor: boolean;
  company?: string, 
  role?: string,
};

const defaultOrder: CompanyTestimonial[] = [
  {
      id: 0,
      firstName: "Khushi",
      lastName: "Khan",
      quote: '"I joined the astronaut bootcamp event in 2021, and I wanted to highlight my great experience there. I was able to connect with friendly company, learn about web development through workshops, and have free pizza for lunch! It was a really unique experience I had during the weekend, and this event also gave me motivation for me to join my first hackathon event in bostonhacks!"',
      image: "/testing-logos/woodmacklogo.svg",
      isSponsor: true,
      company: "Wood Mackenzie",
      role: "CTO",
      passportNumber: "0",
      year: "2025",
      major: "Computer Science"
  },
  {
      id: 1,
      firstName: "Khushi",
      lastName: "Khan",
      quote: '"I joined the astronaut bootcamp event in 2021, and I wanted to highlight my great experience there. I was able to connect with friendly company, learn about web development through workshops, and have free pizza for lunch! It was a really unique experience I had during the weekend, and this event also gave me motivation for me to join my first hackathon event in bostonhacks!"',
      image: "/testing-logos/woodmacklogo.svg",
      isSponsor: true,
      company: "Wood Mackenzie",
      role: "CTO",
      passportNumber: "0",
      year: "2025",
      major: "Computer Science"
  },
  {
      id: 2,
      firstName: "Khushi",
      lastName: "Khan",
      quote: '"I joined the astronaut bootcamp event in 2021, and I wanted to highlight my great experience there. I was able to connect with friendly company, learn about web development through workshops, and have free pizza for lunch! It was a really unique experience I had during the weekend, and this event also gave me motivation for me to join my first hackathon event in bostonhacks!"',
      image: "/testing-logos/woodmacklogo.svg",
      isSponsor: true,
      company: "Wood Mackenzie",
      role: "CTO",
      passportNumber: "0",
      year: "2025",
      major: "Computer Science"
  },
  {
      id: 3,
      firstName: "Khushi",
      lastName: "Khan",
      quote: '"I joined the astronaut bootcamp event in 2021, and I wanted to highlight my great experience there. I was able to connect with friendly company, learn about web development through workshops, and have free pizza for lunch! It was a really unique experience I had during the weekend, and this event also gave me motivation for me to join my first hackathon event in bostonhacks!"',
      image: "/testing-logos/woodmacklogo.svg",
      isSponsor: true,
      company: "Wood Mackenzie",
      role: "CTO",
      passportNumber: "0",
      year: "2025",
      major: "Computer Science"
  },
];

export default function SponsorTestimonialSection(): React.ReactNode {
  const [company, setCompany] = useState(defaultOrder);
  const [currentPage, setCurrentPage] = useState(0);

  function onClickLeftArrow() {
    setCompany((prevCompany) => {
      const newCompany = [...prevCompany];
      const lastCompany = newCompany.pop();
      newCompany.unshift(lastCompany!);
      return newCompany;
    });
    setCurrentPage((prevPage) => {
      const newPage = prevPage > 0 ? prevPage - 1 : company.length - 1;
      return newPage;
    });
  }

  function onClickRightArrow() {
    setCompany((prevCompany) => {
      const newCompany = [...prevCompany];
      const firstCompany = newCompany.shift();
      newCompany.push(firstCompany!);
      return newCompany;
    });
    setCurrentPage((prevPage) => {
      const newPage = prevPage < company.length - 1 ? prevPage + 1 : 0;
      return newPage;
    });
  }

  function handleClick(index: number) {
    setCompany((prevCompany) => {
      const newCompany = [...prevCompany];
      const toMoveToFront = newCompany.splice(index - currentPage);
      return [...toMoveToFront, ...newCompany];
    });
    setCurrentPage(index);
  }
  return (
    <div className="bg-[#F9EFDA] w-full min-h-[400px] tablet:min-h-[700px] mobile:min-h-[800px] flex flex-col items-center justify-center">
        <div className="w-full h-full">
          <div className="relative -top-72 mobile:-top-80">
            <Carousel items={company.slice(0, 3)} isSponsor={true} />
          </div>
    
          <div className="desktop:flex mobile:hidden relative w-full">
            <ArrowButton
                direction="left"
                arrowButtonColor="beigeButton"
                onClick={onClickLeftArrow}
                className="absolute left-28 top-[54%] transform -translate-y-1/2 z-20"
            />
            <ArrowButton
                direction="right"
                arrowButtonColor="beigeButton"
                onClick={onClickRightArrow}
                className="absolute right-28 top-[54%] transform -translate-y-1/2 z-20"
            />
          </div>

          <div className="absolute desktop:bottom-[3%] tablet:bottom-[2.5%] mobile:bottom-[1%] z-10 w-full">
            <PaginationDots
                currentPage={currentPage}
                totalPages={company.length}
                color="vineGreenLite"
                handleClick={handleClick}
            />
          </div>
        </div>

    </div>
  );
}
