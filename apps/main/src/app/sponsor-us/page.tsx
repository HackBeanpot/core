"use client";

import React from "react";
import SponsorUsStatsComp from "./Sections/SponsorUsStatsComp.tsx";
import SponsorTop from "./Sections/SponsorTop.tsx";
import BenefitsSection from "./Sections/BenefitsSection.tsx";
import { Footer, NavBar } from "../lib/Components";
import SponsorUsTestimonials from "./components/SponsorUsTestimonials.tsx";

const SponsorUsPage = () => {
  return (
    <div className="relative z-10 w-full">
      <NavBar />
      <SponsorTop />
      <SponsorUsStatsComp />
      <BenefitsSection />
      {/* TODO: Past Sponsors Section  */}
      <SponsorUsTestimonials />
      <Footer />
    </div>
  );
};

export default SponsorUsPage;
