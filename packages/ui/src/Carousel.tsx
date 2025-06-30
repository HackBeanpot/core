"use client";

import React, { useState } from "react";
import PassportCard, { PassportCardProps } from "./PassportCard";
import ArrowButton from "./ArrowButton";
interface CarouselProps {
  items: PassportCardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [active, setActive] = useState(0);
  const len = items.length;

  /* helpers */
  const idxPrev = (i: number) => (i === 0 ? len - 1 : i - 1);
  const idxNext = (i: number) => (i === len - 1 ? 0 : i + 1);

  const goPrev = () => setActive(idxPrev);
  const goNext = () => setActive(idxNext);
  const goTo = (i: number) => setActive(i);

  /* order: prev | active | next  so active stays centre */
  const renderOrder = [idxPrev(active), active, idxNext(active)];

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* CARD STRIP */}
      <div className="flex justify-center items-center space-x-80">
        {renderOrder.map((idx) => {
          const c = items[idx];
          const isActive = idx === active;
          const opacity = isActive ? "opacity-100 z-10" : "opacity-70 z-0";
          return (
            <div
              key={c.id}
              className={`transition-opacity duration-300 ${opacity}`}
            >
              <PassportCard {...c} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* ARROWS */}
      <ArrowButton
        direction="left"
        arrowButtonColor="greenButton"
        onClick={goPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20"
      />

      <ArrowButton
        direction="right"
        arrowButtonColor="greenButton"
        onClick={goNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20"
      />

      {/* DOTS  (always visible) */}
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
