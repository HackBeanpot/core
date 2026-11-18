import React from "react";
import { LandingHeader } from "./LandingHeader";
import { MobileLanding } from "./mobile/MobileLanding";
import { ScrollStage } from "./scenes/ScrollStage";

/**
 * The landing page. LG/MD (>= 640px): every scene in `scenes/registry.ts`,
 * played by `ScrollStage`, with the FAQ (which owns the footer) scrolling normally after it.
 * SM: `MobileLanding`, static sections in normal flow, ending in the footer.
 */
export default function Page() {
  return (
    <ScrollStage>
      <LandingHeader />
      <MobileLanding />
    </ScrollStage>
  );
}
