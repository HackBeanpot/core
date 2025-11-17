"use client";

import React from "react";
import SponsorUsStatsComp from "./Sections/SponsorUsStatsComp.tsx";
import SponsorTop from "./Sections/SponsorTop.tsx";
import BenefitsSection from "./Sections/BenefitsSection.tsx";
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
