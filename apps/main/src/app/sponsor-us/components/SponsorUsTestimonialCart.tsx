"use client";

import React from "react";

export type CarouselCardProps = {
  id: number;
  testimonial: string;
  sponsorRep: string;
  sponsorRepPosition: string;
  sponsor: string;
  isActive?: boolean;
};

export default function SponsorUsTestimonialCart({
  id,
  testimonial,
  sponsorRep,
  sponsorRepPosition,
  sponsor,
  // isActive,
}: CarouselCardProps): React.ReactNode {
  return (
    <div className="relative flex justify-center items-center size-full text-carouselCreamLight font-DMSans-Regular text-[18px]">
      <div className="relative flex size-full">
        <img
          src="/sponsor-testimonials/cart.svg"
          className="size-full scale-[120%]"
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
