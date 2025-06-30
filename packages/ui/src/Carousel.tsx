"use client";

import React, { useState } from "react";
import PassportCard, { PassportCardProps } from "./PassportCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: PassportCardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  // ── active slide index ────────────────────────────────────────────
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setActive((i) => (i === items.length - 1 ? 0 : i + 1));
  const goTo = (i: number) => setActive(i);

  // ── layout ────────────────────────────────────────────────────────
  return (
    <div className="relative w-full flex items-center justify-center">
      {/* ── CARD STACK ─────────────────────────────────────────────── */}
      <div className="flex justify-center items-center space-x-80">
        {items.map((cardInfo, i) => {
          const isActive = i === active;
          const activeClass = isActive ? "opacity-100 z-10" : "opacity-70 z-0";
          return (
            <div
              key={cardInfo.id}
              className={`transition-opacity duration-300 ${activeClass}`}
            >
              <PassportCard {...cardInfo} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* ── LEFT ARROW (desktop / tablet only) ────────────────────── */}
      <button
        aria-label="Previous testimonial"
        onClick={prev}
        className="hidden sm:flex items-center justify-center
                   absolute left-4 top-1/2 -translate-y-1/2
                   w-12 h-12 rounded-xl bg-[#008773] shadow-lg z-20"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>

      {/* ── RIGHT ARROW (desktop / tablet only) ───────────────────── */}
      <button
        aria-label="Next testimonial"
        onClick={next}
        className="hidden sm:flex items-center justify-center
                   absolute right-4 top-1/2 -translate-y-1/2
                   w-12 h-12 rounded-xl bg-[#008773] shadow-lg z-20"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      {/* ── PAGINATION DOTS (always visible) ─────────────────────── */}
      <div className="flex justify-center gap-2 absolute bottom-6">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-3 w-3 rounded-full transition-colors
                        ${i === active ? "bg-[#008773]" : "bg-[#C4C4C4]"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
