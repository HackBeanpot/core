import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

function Heading({ children, className = "" }: TypographyProps) {
  return (
    <h1 className={`text-heading font-bold font-Wilden ${className}`}>
      {children}
    </h1>
  );
}

function Body({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-body font-GT-Walsheim-Regular ${className}`}>
      {children}
    </p>
  );
}

function ButtonText({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-button font-GT-Walsheim-Regular ${className}`}>
      {children}
    </span>
  );
}

function SignLarge({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={`text-signLarge font-Big-Shoulders-Display uppercase ${className}`}
    >
      {children}
    </h1>
  );
}

function RibbonTitle({ children, className = "" }: TypographyProps) {
  return (
    <div
      className={`relative inline-block w-auto h-[48px] ${className}`} // matches ~button height
    >
      {/* Ribbon shape */}
      <svg
        viewBox="0 0 371 69"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-w-[200px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M2.32279 30.5383C1.21987 27.9201 3.14235 25.0242 5.98343 25.0242H65.5407C67.7345 25.0242 69.5129 26.8026 69.5129 28.9963V63.9514C69.5129 66.1451 67.7345 67.9235 65.5407 67.9235H6.14953C3.26551 67.9235 1.34281 64.9469 2.52875 62.318L8.63258 48.7874C9.0868 47.7806 9.10124 46.63 8.67243 45.612L2.32279 30.5383Z"
          fill="#94181A"
        />
        <path
          d="M64.8418 67.264L35.7636 58.9171C31.6642 57.7404 32.048 51.8102 36.2649 51.1717L65.3431 46.769C67.7464 46.4051 69.9099 48.2657 69.9099 50.6964V63.4461C69.9099 66.0871 67.3804 67.9927 64.8418 67.264Z"
          fill="#68090B"
        />
        <path
          d="M368.65 30.9486C369.764 28.3288 367.842 25.4222 364.995 25.4222H305.459C303.266 25.4222 301.487 27.2006 301.487 29.3944V63.9522C301.487 66.146 303.266 67.9244 305.459 67.9244H364.827C367.717 67.9244 369.639 64.9364 368.442 62.3062L362.38 48.9923C361.918 47.9784 361.903 46.8173 362.339 45.7921L368.65 30.9486Z"
          fill="#94181A"
        />
        <path
          d="M306.555 67.264L335.634 58.9171C339.733 57.7404 339.349 51.8102 335.132 51.1717L306.054 46.769C303.651 46.4051 301.487 48.2657 301.487 50.6964V63.4461C301.487 66.0871 304.017 67.9927 306.555 67.264Z"
          fill="#68090B"
        />
        <path
          d="M32.9689 10.8363C32.9689 8.76093 34.524 7.03952 36.5937 6.88656C54.2676 5.58045 132.683 0.0127763 185.301 0C238.212 -0.0128475 317.078 5.57865 334.804 6.88698C336.874 7.03975 338.428 8.76113 338.428 10.8367V55.5551C338.428 57.8344 336.521 59.6475 334.244 59.5281C315.465 58.5431 237.597 54.6318 185.301 54.638C133.295 54.6442 55.8684 58.5434 37.1513 59.5277C34.8749 59.6474 32.9689 57.834 32.9689 55.5545V10.8363Z"
          fill="#CC322D"
        />
      </svg>

      {/* Text overlay */}
      <span className="absolute inset-0 flex items-center justify-center px-3 text-xs text-marigoldYellowDark font-bold uppercase transform -translate-y-[3px]">
        {children}
      </span>
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { Body, Heading, ButtonText, SignLarge, RibbonTitle };
