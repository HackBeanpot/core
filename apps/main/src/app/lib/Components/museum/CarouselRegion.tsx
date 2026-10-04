"use client";

import React, { type KeyboardEvent, type ReactNode } from "react";

type CarouselRegionProps = {
  label: string;
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
  children: ReactNode;
};

const CarouselRegion = ({
  label,
  onPrev,
  onNext,
  className = "",
  children,
}: CarouselRegionProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Don't hijack arrow keys while someone is typing.
    const target = e.target as HTMLElement;
    if (target.closest("input, textarea, select, [contenteditable='true']"))
      return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev?.();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext?.();
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-[#833711] ${className}`}
    >
      {children}
    </div>
  );
};

export default CarouselRegion;
