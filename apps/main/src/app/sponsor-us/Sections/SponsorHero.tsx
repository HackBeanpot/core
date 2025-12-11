"use client";

import React from "react";
import Button from "@repo/ui/Button";
import CarnivalTitle from "@repo/ui/CarnivalTitle";
import { HeroBackground } from "../../lib/Assets/SVG/index";
import LandingCard from "../components/LandingCard";

const SponsorUsHero = () => {
  return (
    <div className="relative flex flex-col items-center mobile:pt-20 desktop:pt-40 mb-4">
      <div className="absolute w-screen inset-0 -z-10">
        <HeroBackground />
      </div>
      <CarnivalTitle text="SPONSOR US" />

      <div className="flex justify-center mobile:mt-10 desktop:-mt-20 desktop-xl:-mt-20 desktop-2xl:-mt-20">
        <LandingCard />
      </div>

      <div className="mobile:mt-5 desktop:mt-5 flex justify-center">
        <Button
          text="View Sponsorship Packet"
          textColor="white"
          color="firecrackerRed"
          size="medium"
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/1MNIE0Tgme3mkMVg26E9VZPQQ8i37-VqL/view?usp=sharing",
              "_blank",
            )
          }
        />
      </div>
    </div>
  );
};

export default SponsorUsHero;
