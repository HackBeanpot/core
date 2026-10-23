"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { u } from "../../../lib/scroll/units";
import { SceneFrame } from "../SceneFrame";
import { site } from "../../../lib/content/site";
import { sponsors, sponsorsSection } from "../../../lib/content/sponsors";
import type { Sponsor, SponsorTier } from "../../../lib/content/types";
import Button from "../../../lib/Components/museum/Button";
import PictureFrame from "../../../lib/Components/museum/PictureFrame";
import { sponsorsAssets } from "../../../../../public/sponsors/positions";

type Breakpoint = "lg" | "md";

function useArtboardBreakpoint(ref: React.RefObject<HTMLElement>): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("lg");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const w = parseFloat(getComputedStyle(el).getPropertyValue("--ab-w"));
      setBp(w > 0 && w <= 1000 ? "md" : "lg");
    };
    read();
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return bp;
}

type TierLayout = {
  /** Outer width of one frame, including the bevel art. */
  w: number;
  /** Gap between frames, both across and between wrapped rows. */
  gap: number;
  /** Frames per row before wrapping (what fits the 994px content column). */
  perRow: number;
};

const LAYOUT: Record<
  Breakpoint,
  {
    titleTop: number;
    tiers: { top: number; height: number; gap: number };
    gold: TierLayout;
    silver: TierLayout;
    ctaTop: number;
  }
> = {
  lg: {
    titleTop: 142,
    tiers: { top: 252.95, height: 407.66, gap: 33.93 },
    gold: { w: 325.24, gap: 21.01, perRow: 3 },
    silver: { w: 231.9, gap: 14.98, perRow: 4 },
    ctaTop: 714.22,
  },
  md: {
    titleTop: 142,
    tiers: { top: 254.38, height: 371.3, gap: 30.9 },
    gold: { w: 296.24, gap: 19.13, perRow: 3 },
    silver: { w: 211.22, gap: 13.65, perRow: 4 },
    ctaTop: 680.21,
  },
};

const GOLD_ASPECT = 325.24 / 218.17;
const SILVER_ASPECT = 232 / 156;
const ASPECT: Record<SponsorTier, number> = {
  gold: GOLD_ASPECT,
  silver: SILVER_ASPECT,
};

const FONT = {
  title: "var(--font-amarante), serif",
  body: "var(--font-merriweather), serif",
};

function rowsOf(count: number, perRow: number) {
  return Math.ceil(count / perRow);
}

function tierHeight(count: number, tier: SponsorTier, t: TierLayout) {
  const rows = rowsOf(count, t.perRow);
  if (rows === 0) return 0;
  return rows * (t.w / ASPECT[tier]) + (rows - 1) * t.gap;
}

function SponsorTierRow({
  tier,
  items,
  layout,
  scale,
}: {
  tier: SponsorTier;
  items: Sponsor[];
  layout: TierLayout;
  scale: number;
}) {
  const w = layout.w * scale;
  const gap = layout.gap * scale;
  return (
    <ul
      className="flex flex-wrap justify-center"
      style={{
        gap: u(gap),
        maxWidth: u(layout.perRow * w + (layout.perRow - 1) * gap),
      }}
    >
      {items.map((sponsor, i) => (
        <li key={sponsor.name} data-anim={`sponsor-${tier}-${i}`}>
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${sponsor.name} (opens in a new tab)`}
            className="block transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <PictureFrame
              variant={tier === "gold" ? "goldBevel" : "silverBevel"}
              width={u(w)}
              aspect={ASPECT[tier]}
              innerClassName={tier === "gold" ? "bg-[#fdfbfb]" : "bg-white"}
            >
              <div className="absolute inset-[18%_14%]">
                <Image
                  src={sponsor.logo.src}
                  alt=""
                  fill
                  sizes="250px"
                  className="object-contain"
                />
              </div>
            </PictureFrame>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SponsorsScene() {
  const artboardRef = useRef<HTMLDivElement>(null);
  const bp = useArtboardBreakpoint(artboardRef);
  const layout = LAYOUT[bp];
  const assets = sponsorsAssets[bp];

  const gold = sponsors.filter((s) => s.tier === "gold");
  const silver = sponsors.filter((s) => s.tier === "silver");

  const needed =
    tierHeight(gold.length, "gold", layout.gold) +
    tierHeight(silver.length, "silver", layout.silver) +
    (gold.length > 0 && silver.length > 0 ? layout.tiers.gap : 0);
  const scale = needed > 0 ? Math.min(1, layout.tiers.height / needed) : 1;

  const layer = ({
    src,
    x,
    y,
    w,
    h,
  }: {
    src: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }) => (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className="pointer-events-none absolute max-w-none select-none"
      style={{ left: u(x), top: u(y), width: u(w), height: u(h) }}
    />
  );

  return (
    <SceneFrame
      sceneId="sponsors"
      background={
        <div
          className="flex h-full w-full items-center"
          style={{
            background: `linear-gradient(180deg, ${assets.edge[0]} 50%, ${assets.edge[assets.edge.length - 1]} 50%)`,
          }}
        >
          <div
            className="w-full shrink-0"
            style={{
              height: "calc(var(--ab-h) * var(--u))",
              background: `linear-gradient(180deg, ${assets.edge
                .map(
                  (c, i) => `${c} ${((i + 0.5) / assets.edge.length) * 100}%`,
                )
                .join(", ")})`,
            }}
          />
        </div>
      }
      content={
        <>
          <div
            ref={artboardRef}
            className="pointer-events-none absolute inset-0"
            aria-hidden
          />

          {layer(assets.background)}

          <h2
            data-anim="sponsors-title"
            className="absolute inset-x-0 text-center text-white"
            style={{
              top: u(layout.titleTop),
              fontFamily: FONT.title,
              fontSize: u(50),
              lineHeight: "normal",
            }}
          >
            {sponsorsSection.title}
          </h2>

          <div
            className="absolute inset-x-0 flex flex-col items-center justify-center"
            style={{
              top: u(layout.tiers.top),
              height: u(layout.tiers.height),
              gap: u(layout.tiers.gap * scale),
            }}
          >
            {gold.length > 0 && (
              <SponsorTierRow
                tier="gold"
                items={gold}
                layout={layout.gold}
                scale={scale}
              />
            )}
            {silver.length > 0 && (
              <SponsorTierRow
                tier="silver"
                items={silver}
                layout={layout.silver}
                scale={scale}
              />
            )}
          </div>

          <div
            data-anim="sponsors-cta"
            className="absolute inset-x-0 flex flex-col items-center text-center font-light"
            style={{ top: u(layout.ctaTop), gap: u(32), fontFamily: FONT.body }}
          >
            <p
              className="text-white"
              style={{ fontSize: u(20), lineHeight: "normal" }}
            >
              {sponsorsSection.cta}
            </p>
            <Button
              variant="gold"
              href={site.sponsorshipPacketUrl}
              external
              style={{
                fontSize: u(20),
                padding: `${u(10)} ${u(20)}`,
                borderRadius: u(12),
              }}
            >
              {sponsorsSection.packetButtonLabel}
            </Button>
            <p
              className="whitespace-nowrap text-white/70"
              style={{ fontSize: u(16), lineHeight: "normal" }}
            >
              {sponsorsSection.inquiry.before}
              <a
                href={`mailto:${site.contactEmail}`}
                className="underline hover:text-white"
              >
                {site.contactEmail}
              </a>
              {sponsorsSection.inquiry.after}
            </p>
          </div>
        </>
      }
    />
  );
}
