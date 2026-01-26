"use client";

import clsx from "clsx";
import React from "react";

export type CarouselCardProps = {
  testimonial: string;
  sponsorRep: string;
  sponsorRepPosition: string;
  sponsor: string;
};

export default function SponsorUsTestimonialCart({
  testimonial,
  sponsorRep,
  sponsorRepPosition,
  sponsor,
}: CarouselCardProps): React.ReactNode {
  const outerDivStyles = clsx(
    "relative flex justify-center items-center size-full text-carouselCreamLight font-DMSans-Regular mobile:text-[8px] mobile-xl:text-[10px] tablet:text-[14px] desktop:text-[18px] desktop-md:text-[20px] desktop-xl:text-[25px]",
  );

  const scaleFactor = clsx(
    "mobile:scale-[60%] mobile-xl:scale-[60%] tablet:scale-[80%] desktop:scale-[110%] desktop-sm:scale-[115%] desktop-md:scale-[125%] desktop-xl:scale-[140%]",
  );

  const outerTextStyles = clsx(
    "absolute z-20 flex flex-col text-left space-y-5 mobile:p-32 mobile-xl:p-36 mobile-xl:top-[6%] tablet:p-36 desktop:p-8 desktop:top-[6%] desktop-xl:p-0 desktop-xl:top-[6%]",
  );

  return (
    <div className={outerDivStyles}>
      <div className="relative flex size-full">
        <img
          src="/sponsor-testimonials/cart.svg"
          className={`size-full ${scaleFactor}`}
          alt="Ferris Wheel Cart"
        />
      </div>
      <div className={outerTextStyles}>
        <p>{testimonial}</p>
        <div>
          <p className="font-DMSans-Bold">{sponsorRep}</p>
          <p>
            {sponsorRepPosition} at {sponsor}
          </p>
        </div>
      </div>
    </div>
  );
}