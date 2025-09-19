"use client";
import React, { useState, useEffect } from "react";

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion = ({ items }: { items: AccordionProps[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const wrapperStyle = {
    width: isMobile ? "100%" : "746px",
    margin: isMobile ? "0 8px" : "0 auto",
    backgroundColor: "#535353",
  };

  const buttonStyle = {
    width: "100%",
    padding: isMobile ? "12px 16px" : "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #004687",
  };

  const contentStyle = {
    padding: isMobile ? "16px 16px 16px" : "20px 20px 20px",
    color: "#D1D5DB",
    fontSize: isMobile ? "14px" : "16px",
    lineHeight: isMobile ? "1.4" : "1.5",
    borderBottom: "1px solid #004687",
  };

  return (
    <div style={wrapperStyle}>
      {items.map((item, index) => (
        <div key={index}>
          <button
            style={{
              ...buttonStyle
            }}
            onClick={() => setOpen(open === index ? null : index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              style={{
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "500",
                textAlign: "left",
                flex: 1,
                marginRight: "12px",
                color: hoveredIndex === index ? "#FBBF24" : "white",
              }}
            >
              {item.title}
            </span>
            <span
              style={{
                fontSize: isMobile ? "20px" : "24px",
                color: hoveredIndex === index ? "#FBBF24" : "white",
              }}
            >
              {open === index ? "−" : "+"}
            </span>
          </button>
          {open === index && (
            <div 
              style={{
                ...contentStyle,
                ...(index === items.length - 1 ? { borderBottom: "none" } : {})
              }}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;