import React from "react";
import { Footer } from "../lib/Components";
import { LandingHeader } from "./LandingHeader";
import { MobileHero } from "./mobile/MobileHero";
import { ScrollStage } from "./scenes/ScrollStage";

/**
 * The landing page. LG/MD (>= 640px): every scene in `scenes/registry.ts`,
 * played by `ScrollStage`, with the FAQ and footer scrolling normally after it.
 * SM: static sections (MS-502 adds the rest of the SM page).
 */
export default function Page() {
  return (
    <ScrollStage>
      <LandingHeader />
      <div className="sm:hidden">
        <MobileHero />
      </div>
      <Footer />
    </ScrollStage>
  );
}
