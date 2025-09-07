"use client";

import React, { useState } from "react";
import ArrowButton from "@repo/ui/ArrowButton";
import Carousel from "@repo/ui/Carousel";
import PaginationDots from "@repo/ui/PaginationDots";

type SponsorTestimonialsProps = {
  className?: string;
};

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
  company?: string;
  role?: string;
};

const defaultOrder: CompanyTestimonial[] = [
  {
    id: 1,
    firstName: "Rob",
    lastName: "Antczak",
    quote:
      '"If I could describe HBP in one word - invigorating. We had a lot of folks who weren’t  sure what the experience would be like, and they left feeling united - really energized and really impressed with the amount of talent that was on display as well as the  atmosphere."',
    image: "/sponsor-logos/woodmacklogo.svg",
    isSponsor: true,
    company: "Wood Mackenzie",
    role: "CTO",
    passportNumber: "0",
    year: "2025",
    major: "Computer Science",
  },
  {
    id: 2,
    firstName: "Rob",
    lastName: "Antczak",
    quote:
      '"If I could describe HBP in one word - invigorating. We had a lot of folks who weren’t  sure what the experience would be like, and they left feeling united - really energized and really impressed with the amount of talent that was on display as well as the  atmosphere."',
    image: "/sponsor-logos/woodmacklogo.svg",
    isSponsor: true,
    company: "Wood Mackenzie",
    role: "CTO",
    passportNumber: "0",
    year: "2025",
    major: "Computer Science",
  },
  {
    id: 3,
    firstName: "Rob",
    lastName: "Antczak",
    quote:
      '"If I could describe HBP in one word - invigorating. We had a lot of folks who weren’t  sure what the experience would be like, and they left feeling united - really energized and really impressed with the amount of talent that was on display as well as the  atmosphere."',
    image: "/sponsor-logos/woodmacklogo.svg",
    isSponsor: true,
    company: "Wood Mackenzie",
    role: "CTO",
    passportNumber: "0",
    year: "2025",
    major: "Computer Science",
  },
];

export default function SponsorTestimonialSection(
  props: SponsorTestimonialsProps,
): React.ReactNode {
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
    <div
      className={`w-full min-h-[400px] tablet:min-h-[700px] mobile:min-h-[800px] flex flex-col items-center justify-center ${props.className} mobile:scale-75 desktop:scale-100`}
    >
      <div className="w-full h-full">
        <div className="relative -top-72 mobile:-top-80">
          <Carousel items={company.slice(0, 3)} isSponsor={true} />
        </div>

        <div className="desktop:flex mobile:hidden relative w-full">
          <ArrowButton
            direction="left"
            arrowButtonColor="beigeButton"
            onClick={onClickLeftArrow}
            className="absolute bottom-[10vh] left-28  z-20"
          />
          <ArrowButton
            direction="right"
            arrowButtonColor="beigeButton"
            onClick={onClickRightArrow}
            className="absolute bottom-[10vh] right-28  z-20"
          />
        </div>

        <div className="absolute desktop:bottom-[30vh] mobile:bottom-[35vh] z-10 w-full">
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
