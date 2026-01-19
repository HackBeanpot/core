"use client";

import React from "react";
import SponsorUsStatsComp from "./Sections/SponsorUsStatsComp";
import SponsorUsHero from "./Sections/SponsorHero";
import BenefitsSection from "./Sections/BenefitsSection";
import { Footer, NavBar } from "../lib/Components";
import PastSponsors from "./Sections/PastSponsors.tsx";

const SponsorUsPage = () => {
  return (
    <div className="relative z-10 w-full overflow-hidden">
      <NavBar />
      <SponsorUsHero />
      <SponsorUsStatsComp />
      <BenefitsSection />
      <PastSponsors />
      {/* this div shouldn't be needed in 2027 lol */}
      <div className="mobile:mb-[50vh] tablet:mb-[90vh] desktop:mb-[50vh]"></div>
      <Footer />
    </div>
  );
};

export default SponsorUsPage;
