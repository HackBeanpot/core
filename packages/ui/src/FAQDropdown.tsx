"use client";

import React, { useState } from "react";

interface FAQDropdownProps {
  dropdownQuestion: string;
  dropdownAnswer: string;
}

export default function FAQDropdown({
  dropdownQuestion,
  dropdownAnswer,
}: FAQDropdownProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const minusSign = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  );

  const plusSign = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );

  const toggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div
      onClick={toggleAccordion}
      className={`transition-transform duration-300 transform scale-100 hover:scale-[102%] relative cursor-pointer justify-center rounded-lg w-3/5 bg-[#FBFBFB] text-[#3F3F3F] grid grid-cols-[95%_5%] place-content-around py-5 px-5 font-GT-Walsheim-Regular ${isOpen ? "max-h-screen" : "max-h-80"}`}
    >
      <div className="w-5/6">
        <p className="text-lg">{dropdownQuestion}</p>
      </div>

      <div
        className={`w-6 h-6 self-center place-self-end transition-transform duration-500 transform ${isOpen ? "rotate-180" : "rotate-0"} `}
      >
        {isOpen ? minusSign : plusSign}
      </div>
      {isOpen && (
        <>
          <div
            className={`${isOpen ? "" : "hidden"} w-auto col-span-2 border-t border-[#CFCFCF] flex items-center justify-center m-2`}
          ></div>
          <p
            className={`${isOpen ? "" : "hidden"} text-lg col-span-2 break-all`}
          >
            {dropdownAnswer}
          </p>
        </>
      )}
    </div>
  );
}
