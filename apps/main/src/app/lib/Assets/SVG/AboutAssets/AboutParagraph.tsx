"use client";
import React from "react";

const AboutParagraph = () => {
  return (
    <div className="px-4 pl-0 tablet:px-0">
      <p
        className="
    font-GT-Walsheim-Regular 
    mobile:mt-4 tablet:mt-12 desktop:mt-12
    text-left 
    w-[70vw]
    mobile:text-[11px]
    mobilelg:text-[13px]
    tablet:text-[11px]
    desktop:text-[11px]
    tablet:text-3xl           
    tablet:max-w-full
    mobile:-ml-10
    mobilelg:-ml-3
    tablet:ml-0
    desktop:ml-0
  "
      >
        We&apos;re a non-profit organization in the Boston area that organizes
        an annual undergraduate hackathon. Our goal is to expand and nurture the
        hacker culture that exists in Boston and the surrounding areas. We
        connect students and other aspiring nerds to their colleagues so that
        they can meet new people, learn new things, and have a great time.
      </p>
    </div>
  );
};

export default AboutParagraph;
