import React from "react";
import { MobileAboutUS } from "./MobileAbout";
import { MobileFaq } from "./MobileFaq";
import { MobileHero } from "./MobileHero";
import { MobileProjects } from "./MobileProjects";
import { MobileSpeakers } from "./MobileSpeakers";
import { MobileSponsors } from "./MobileSponsors";
import { MobileTeam } from "./MobileTeam";
import { MobileTestimonials } from "./MobileTestimonials";
import { MobileValues } from "./MobileValues";

/**
 * The SM (< 640px) landing page: every section in page order (matching
 * `headerTabs`), in plain document flow with native scrolling. It's fully
 * static: no GSAP, no Lenis, no animations. `MobileFaq` renders the footer
 * over its sock art, so the page ends there.
 *
 * Hidden at 640px and up with CSS, and `ScrollStage` hides itself below 640px,
 * so both trees are server-rendered and nothing swaps on hydration.
 *
 * It must stay a child of `ScrollStage`: the header and mobile menu read
 * `useActiveScene()` / `useScrollToScene()` from it. Each section is tagged
 * `data-sm-scene="<id>"` (the LG/MD scenes own the `id`s), and
 * `fallbackScrollToScene` scrolls to whichever of the two is rendered.
 */
export function MobileLanding() {
  return (
    <div className="sm:hidden">
      <MobileHero />
      <MobileAboutUS />
      <MobileValues />
      <MobileSpeakers />
      <MobileTestimonials />
      <MobileProjects />
      <MobileSponsors />
      <MobileTeam />
      <MobileFaq />
    </div>
  );
}
