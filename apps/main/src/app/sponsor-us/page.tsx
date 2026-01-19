"use client";

import React from "react";
import SponsorUsStatsComp from "./Sections/SponsorUsStatsComp";
import SponsorUsHero from "./Sections/SponsorHero";
import BenefitsSection from "./Sections/BenefitsSection";
import { Footer, NavBar } from "../lib/Components";
import SponsorUsTestimonials from "./components/SponsorUsTestimonials.tsx";

const SponsorUsPage = () => {
  return (
    <div className="relative z-10 w-full overflow-hidden">
      <NavBar />
      <SponsorUsHero />
      <SponsorUsStatsComp />
      <BenefitsSection />
      {/* TODO: Past Sponsors Section  */}
      <SponsorUsTestimonials />
      <Footer />
    </div>
  );
};

export default SponsorUsPage;
