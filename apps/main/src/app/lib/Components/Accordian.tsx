"use client";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";
import React, { useState } from "react";

type AccordianInfo = {
  question: string;
  answer: string;
};

interface AccordionProps {
  title: string;
  content: AccordianInfo[];
}

const Accordion = ({ items }: { items: AccordionProps[] }) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const { isMobile, isTablet, isDesktop } = useDevice();

  const wrapperStyles = clsx(
    "m-auto p-4",
    isDesktop && "w-[90vw] max-w-[800px]",
    isTablet && "w-[80vw]",
    isMobile && "w-[90vw] my-[8px]",
  );

  const buttonStyles = clsx(
    "flex py-[4px] w-full justify-between items-center",
    isMobile && "px-[12px] py-[16px]",
  );

  const faqTitleStyles = clsx(
    "text-[28px] font-NeulisNeue-Regular font-semibold text-left",
    !isDesktop && "font-NeulisNeue-Bold",
    isTablet && "text-[20px]",
    isMobile && "text-[18px] pl-[10px]",
  );

  const faqQuestionStyles = clsx(
    "text-[20px] font-NeulisNeue-Regular font-medium text-left flex-1 mr-[12px] text-wrap",
    isTablet && "text-[18px]",
    isMobile && "text-[16px]",
  );

  const iconStyles = clsx(isMobile ? "text-[20px]" : "text-[24px]");

  const faqAnswerStyles = clsx(
    "pb-[10px] font-DMSans-Regular text-white text-[18px] leading-[1.5] border-b border-solid border-starlightBlueLight text-wrap",
    isTablet && "text-[16px]",
    isMobile && "p-[16px] text-[14px] leading-[1.4]",
  );

  return (
    <div className={wrapperStyles}>
      {items.map((item, sectionIndex) => (
        <div className="pb-4" key={sectionIndex}>
          <span className={faqTitleStyles}>{item.title}</span>
          {item.content.map((contentItem, idx) => {
            const key = `${sectionIndex}-${idx}`;

            return (
              <div key={key}>
                <button
                  className={buttonStyles}
                  onClick={() => setOpenKey(openKey === key ? null : key)}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  <span
                    className={clsx(
                      faqQuestionStyles,
                      hoveredKey === key ? "text-marigoldYellow" : "text-white",
                    )}
                  >
                    {contentItem.question}
                  </span>
                  <span
                    className={clsx(
                      iconStyles,
                      hoveredKey === key ? "text-marigoldYellow" : "text-white",
                    )}
                  >
                    {openKey === key ? "−" : "+"}
                  </span>
                </button>
                {openKey === key && (
                  <div
                    className={clsx(
                      faqAnswerStyles,
                      idx === item.content.length - 1 && "border-none",
                    )}
                  >
                    {contentItem.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
