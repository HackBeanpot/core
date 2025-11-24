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
  const scaleFactor = clsx(
    "mobile:scale-[40%] tablet:scale-[55%] desktop:scale-[120%] desktop-md:scale-[125%]"
  );

  return (
    <div className="relative flex justify-center items-center size-full text-carouselCreamLight font-DMSans-Regular text-[18px]">
      <div className="relative flex size-full">
        <img
          src="/sponsor-testimonials/cart.svg"
          className={`size-full ${scaleFactor}`}
          alt="Ferris Wheel Cart"
        />
      </div>
      <div className="absolute z-20 p-8 top-[6%]">
        <p className="pb-8">{testimonial}</p>
        <p className="font-DMSans-Bold">{sponsorRep}</p>
        <p>
          {sponsorRepPosition} at {sponsor}
        </p>
      </div>
    </div>
  );
}
