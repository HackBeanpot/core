import React from "react";
import { LandingHeader } from "./LandingHeader";
import { MobileFaq } from "./mobile/MobileFaq";
import { MobileHero } from "./mobile/MobileHero";
import { MobileAboutUS } from "./mobile/MobileAbout";
import { MobileValues } from "./mobile/MobileValues";
import { MobileSpeakers } from "./mobile/MobileSpeakers";
import { MobileTestimonials } from "./mobile/MobileTestimonials";
import { MobileTeam } from "./mobile/MobileTeam";

import { ScrollStage } from "./scenes/ScrollStage";

/**
 * The landing page. LG/MD (>= 640px): every scene in `scenes/registry.ts`,
 * played by `ScrollStage`, with the FAQ (which owns the footer) scrolling normally after it.
 * SM: static sections; `MobileFaq` renders the SM footer over its art.
 */
export default function Page() {
  return (
    <ScrollStage>
      <LandingHeader />
      <div className="sm:hidden">
        <MobileHero />
        <MobileAboutUS />
        <MobileValues />
        <MobileSpeakers />
        <MobileTestimonials />
        <MobileTeam />
        <MobileFaq />
      </div>
    </ScrollStage>
  );
}
