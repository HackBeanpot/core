import React, { forwardRef } from "react";

type CarouselArrowProps = {
  direction: "left" | "right";
  size?: "sm" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label": string;
  className?: string;
};

const GOLD_GRADIENT =
  "linear-gradient(0deg, var(--Gold-Primary, #E9AC1D) 0%, var(--Gold-Light, #FFD268) 100%), linear-gradient(0deg, var(--Yellow-Dark, #FFB647) 0%, var(--Yellow-Primary, #FFD391) 100%), var(--Yellow-Dark, #FFB647)";
const ARROW_BROWN = "#833711"; // terracotta/dark

const SIZE_CLASSES = {
  sm: "w-[48px] h-[48px]",
  lg: "w-[48px] h-[48px]",
};

const ICON_SIZE_CLASSES = {
  sm: "w-[32px] h-[32px]",
  lg: "w-[32px] h-[32px]",
};

const CarouselArrow = forwardRef<HTMLButtonElement, CarouselArrowProps>(
  (
    {
      direction,
      size = "lg",
      disabled = false,
      onClick,
      "aria-label": ariaLabel,
      className = "",
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={onClick}
        className={[
          "inline-flex items-center justify-center rounded-full shrink-0",
          "transition-[transform,filter,opacity] duration-150 ease-out",
          // hover / pressed
          "hover:brightness-110 hover:scale-105",
          "active:scale-95 active:brightness-95",
          // keyboard focus only (not on mouse click)
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#833711]",
          // disabled overrides hover/active
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100 disabled:active:scale-100",
          // reduced motion: no scaling
          "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
          SIZE_CLASSES[size],
          className,
        ].join(" ")}
        style={{
          background: GOLD_GRADIENT,
          color: ARROW_BROWN,
          boxShadow:
            " 0 0 12.986px 0 rgba(255, 255, 255, 0.10) inset, 0 0 12.986px 0 rgba(0, 0, 0, 0.10)",
        }}
      >
        <svg
          className={`${ICON_SIZE_CLASSES[size]} ${direction === "left" ? "rotate-180" : ""}`}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          focusable="false"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.33244 16.0001H26.6658M18.6658 8.00012L26.6658 16.0001L18.6658 24.0001"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  },
);

CarouselArrow.displayName = "CarouselArrow";

export default CarouselArrow;
