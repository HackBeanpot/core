import React, { type ComponentType } from "react";
import { MobileProjects } from "../../(landing)/mobile/MobileProjects";
import { MobileSponsors } from "../../(landing)/mobile/MobileSponsors";
import { sponsors } from "../../lib/content";
import type { Sponsor, SponsorTier } from "../../lib/content/types";

/**
 * SM sections for `/dev/mobile`. Each SM ticket (MS-404 to MS-408) adds one
 * line here. Components get the URL's search params, for test data.
 */
export const MOBILE_SECTIONS: Record<
  string,
  ComponentType<{ params: URLSearchParams }>
> = {
  projects: () => <MobileProjects />,
  sponsors: ({ params }) => <MobileSponsors items={testSponsors(params)} />,
};

/**
 * `gold` / `silver` set that many sponsors per tier, cycling the real ones
 * (to check the tiers wrap with 3 to 9). Unset uses `sponsors.ts` as is.
 */
function testSponsors(params: URLSearchParams): Sponsor[] {
  const pick = (tier: SponsorTier) => {
    const n = params.get(tier);
    const real = sponsors.filter((s) => s.tier === tier);
    if (n === null || !real.length) return real;
    return Array.from({ length: Number(n) }, (_, i) => {
      const s = real[i % real.length]!;
      return { ...s, name: `${s.name} ${i + 1}` };
    });
  };
  return [...pick("gold"), ...pick("silver")];
}
