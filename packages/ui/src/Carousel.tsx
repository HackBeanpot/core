/* components/Carousel.tsx */
"use client";

import React, { useState } from "react";
import PassportCard, { PassportCardProps } from "./PassportCard";

interface CarouselProps {
  items: PassportCardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [active, setActive] = useState(0);
  const len = items.length;

  /* ── helpers ────────────────────────────────────────── */
  const prevIndex = (i: number) => (i === 0 ? len - 1 : i - 1);
  const nextIndex = (i: number) => (i === len - 1 ? 0 : i + 1);

  const goPrev = () => setActive(prevIndex);
  const goNext = () => setActive(nextIndex);

  /* build array [prev, active, next] so active is center  */
  const visibleIdx = [prevIndex(active), active, nextIndex(active)];

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* ── CARD STRIP (prev | active | next) ──────────── */}
      <div className="flex justify-center items-center space-x-80">
        {visibleIdx.map((idx, pos) => {
          const card = items[idx];
          const isActive = idx === active;
          const opacity = isActive ? "opacity-100 z-10" : "opacity-70 z-0";

          return (
            <div
              key={card.id}
              className={`transition-opacity duration-300 ${opacity}`}
            >
              <PassportCard {...card} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* ── ARROW BUTTONS ── hidden on < 768 px ───────── */}
      <button
        aria-label="Previous testimonial"
        onClick={goPrev}
        className="hidden md:flex items-center justify-center
                   absolute left-4 top-1/2 -translate-y-1/2
                   w-12 h-12 rounded-xl bg-[#008773] shadow-lg
                   text-white text-2xl z-20"
      >
        ←
      </button>

      <button
        aria-label="Next testimonial"
        onClick={goNext}
        className="hidden md:flex items-center justify-center
                   absolute right-4 top-1/2 -translate-y-1/2
                   w-12 h-12 rounded-xl bg-[#008773] shadow-lg
                   text-white text-2xl z-20"
      >
        →
      </button>

      {/* ── PAGINATION DOTS (always visible) ──────────── */}
      <div className="flex justify-center gap-2 absolute bottom-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-3 w-3 rounded-full transition-colors
                        ${i === active ? "bg-[#008773]" : "bg-[#C4C4C4]"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
