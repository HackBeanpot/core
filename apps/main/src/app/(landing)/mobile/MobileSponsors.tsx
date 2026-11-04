import Image from "next/image";
import React from "react";
import { sponsorsAssets } from "../../../../public/sponsors/positions";
import { site } from "../../lib/content/site";
import {
  sponsors as defaultSponsors,
  sponsorsSection,
} from "../../lib/content";
import type { Sponsor, SponsorTier } from "../../lib/content/types";
import { Button } from "../../lib/Components/museum";
import PictureFrame from "../../lib/Components/museum/PictureFrame";
import { Typography } from "../../lib/Components/museum/Typography";

const { background } = sponsorsAssets.sm;

const TIERS: { tier: SponsorTier; frame: "goldBevel" | "silverBevel" }[] = [
  { tier: "gold", frame: "goldBevel" },
  { tier: "silver", frame: "silverBevel" },
];

/** A tile's outer size in the SM frame (the visible bevel, 162x108). */
const TILE = { w: 162, h: 108 };
/** Gaps between tiles, from the SM frame. */
const GAP = { x: 31, y: 26 };

/**
 * SM Sponsors (`5615:28693`), fully static: gold then silver sponsors in
 * bevel frames, then the sponsorship CTA.
 *
 * Each tier is a wrapping row, two tiles across with any odd one out centered,
 * so 3 to 9 sponsors (or any count) lay out cleanly. Tiles are 162px wide at
 * the 402px frame and shrink to keep two per row down to 320px.
 */
export function MobileSponsors({
  items = defaultSponsors,
}: {
  /** Defaults to `lib/content/sponsors.ts`. */
  items?: Sponsor[];
}) {
  return (
    // No `id="sponsors"`: the LG/MD SceneFrame owns that anchor and both are in the DOM.
    <section
      aria-labelledby="sponsors-title-sm"
      className="relative overflow-hidden bg-[#3a2f52]"
    >
      <Image
        src={background.src}
        alt=""
        fill
        sizes="100vw"
        unoptimized
        className="pointer-events-none select-none object-cover object-top"
      />

      <div className="relative mx-auto flex w-[min(355px,calc(100%-32px))] flex-col items-center pb-[23px] pt-[84px]">
        <Typography variant="sectionTitle" as="h2">
          <span id="sponsors-title-sm">{sponsorsSection.title}</span>
        </Typography>

        <div className="mt-[24px] flex w-full flex-col gap-[40px]">
          {TIERS.map(({ tier, frame }) => {
            const tierSponsors = items.filter((s) => s.tier === tier);
            if (!tierSponsors.length) return null;
            return (
              <ul
                key={tier}
                aria-label={`${tier} sponsors`}
                className="flex flex-wrap justify-center"
                style={{ columnGap: GAP.x, rowGap: GAP.y }}
              >
                {tierSponsors.map((sponsor) => (
                  <li
                    key={sponsor.name}
                    style={{
                      width: `min(${TILE.w}px, calc((100% - ${GAP.x}px) / 2))`,
                    }}
                  >
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
                    >
                      <PictureFrame
                        variant={frame}
                        width="100%"
                        aspect={TILE.w / TILE.h}
                        innerClassName="bg-museum-ivory-light"
                      >
                        <Image
                          src={sponsor.logo.src}
                          alt={sponsor.logo.alt}
                          fill
                          sizes="130px"
                          className="object-contain p-[8%]"
                        />
                      </PictureFrame>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>

        <div
          className="mt-[38px] flex w-[292px] max-w-full flex-col items-center gap-[16px] text-center font-merriweather font-light text-white"
          style={{ textShadow: "0 0 20px rgba(0, 0, 0, 0.25)" }}
        >
          <p className="text-[18px] leading-normal">{sponsorsSection.cta}</p>
          <Button variant="gold" href={site.sponsorshipPacketUrl} external>
            {sponsorsSection.packetButtonLabel}
          </Button>
          <p className="text-[16px] leading-normal text-white/70">
            {sponsorsSection.inquiry.before}
            <a
              href={`mailto:${site.contactEmail}`}
              className="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
            >
              {site.contactEmail}
            </a>
            {sponsorsSection.inquiry.after}
          </p>
        </div>
      </div>
    </section>
  );
}
