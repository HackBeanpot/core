"use client";

import React from "react";
import SponsorUsStatsComp from "./Sections/SponsorUsStatsComp";
import SponsorTop from "./Sections/SponsorTop";
import BenefitsSection from "./Sections/BenefitsSection";
import { Footer, NavBar } from "../lib/Components";

const SponsorUsPage = () => {
  return (
    <div className="relative z-10 w-full overflow-hidden">
      <NavBar />
      <SponsorTop />
      <SponsorUsStatsComp />
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default SponsorUsPage;
