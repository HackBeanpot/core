"use client";

import Image from "next/image";
import React, { useRef, type CSSProperties } from "react";
import { faqAssets } from "../../../../../public/faq/positions";
import { faq, faqCategories, faqSection } from "../../../lib/content";
import type { FaqCategory } from "../../../lib/content/types";
import { Footer } from "../../../lib/Components";
import { Fog } from "../../../lib/Components/Decor";
import { Typography } from "../../../lib/Components/museum/Typography";
import { u } from "../../../lib/scroll/units";
import {
  useArtboardBreakpoint,
  type ArtboardBreakpoint,
} from "../../../lib/scroll/useArtboardBreakpoint";
import { FaqAccordion } from "./FaqAccordion";

type Box = { x: number; y: number; w: number; h: number };

/** Positions in artboard px, measured from the top of the Figma frame. */
const LAYOUT = {
  lg: {
    frameH: 2029,
    artTop: 1050,
    content: { top: 120, width: 1062, titleGap: 48 },
    columns: [["general", "application"], ["logistics"]],
    columnWidth: 500,
      // bg: { h: 2194, bottom: -165 },
    bg: { h: 2194, bottom: -865 },
    ribbon: { x: 597, y: 1463, w: 915 },
    tint: {
      warm: { x: -18, y: -392, w: 2007, h: 2468 },
      shade: { x: -1, y: -392, w: 1920, h: 2614 },
      shadeAngle: 181.13,
    },
  },
  md: {
    frameH: 2050,
    artTop: 1250,
    content: { top: 85, width: 936, titleGap: 32 },
    columns: [["general", "logistics", "application"]],
    columnWidth: 936,
    bg: { h: 2050, bottom: 0 },
    ribbon: { x: 399, y: 1586, w: 655 },
    tint: {
      warm: { x: -41, y: -77, w: 1435, h: 2101 },
      shade: { x: -29, y: -11, w: 1373, h: 2061 },
      shadeAngle: 181.24,
    },
  },
} satisfies Record<
  ArtboardBreakpoint,
  {
    frameH: number;
    artTop: number;
    content: { top: number; width: number; titleGap: number };
    columns: FaqCategory[][];
    columnWidth: number;
    bg: { h: number; bottom: number };
    ribbon: { x: number; y: number; w: number };
    tint: { warm: Box; shade: Box; shadeAngle: number };
  }
>;

const box = ({ x, y, w, h }: Box): CSSProperties => ({
  left: u(x),
  top: u(y),
  width: u(w),
  height: u(h),
});

const CATEGORY_GAP = 60;
const BOTTOM_FADE_H = 322;

const WARM_TINT = "linear-gradient(180deg, #f08854, #070f68)";

/** Figma exported layer */
function Layer({
  asset,
  anim,
  blend = "",
  tint,
}: {
  asset: Box & { src: string };
  anim?: string;
  blend?: string;
  tint?: Box;
}) {
  return (
    <div data-anim={anim} className={`absolute ${blend}`} style={box(asset)}>
      <Image src={asset.src} alt="" fill unoptimized />
      {tint && (
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: WARM_TINT,
            backgroundPosition: `${u(tint.x - asset.x)} ${u(tint.y - asset.y)}`,
            backgroundSize: `${u(tint.w)} ${u(tint.h)}`,
            backgroundRepeat: "no-repeat",
            maskImage: `url("${asset.src}")`,
            maskSize: "100% 100%",
          }}
        />
      )}
    </div>
  );
}

function SockArt({ bp }: { bp: ArtboardBreakpoint }) {
  const a = faqAssets[bp];
  const { ribbon, tint } = LAYOUT[bp];

  return (
    <>
      <div data-anim="faq-skeleton-ptero">
        <Layer asset={a.pterodactyl} tint={tint.warm} />
        <Layer asset={a.pterodactylBack} tint={tint.warm} />
      </div>
      <Layer asset={a.dinoSkeleton} anim="faq-skeleton-dino" tint={tint.warm} />
      <div
        className="absolute opacity-70 mix-blend-hard-light"
        style={{
          ...box(tint.shade),
          background: `linear-gradient(${tint.shadeAngle}deg, rgb(154 173 216 / 0) 28.015%, rgb(49 13 70 / 0.75) 99.287%)`,
        }}
      />
      <Layer asset={a.eyeGlow} blend="mix-blend-overlay" />
      {[a.beam1, a.beam2, a.beam3].map((beam, i) => (
        <Layer
          key={beam.src}
          asset={beam}
          anim={`faq-beam-${i}`}
          blend="mix-blend-hard-light"
        />
      ))}
      <div
        data-anim="faq-ribbon"
        className="absolute"
        style={{ left: u(ribbon.x), top: u(ribbon.y), width: u(ribbon.w) }}
      >
        <Fog variant="ribbon" />
      </div>
      <Layer asset={a.sparkles} />
    </>
  );
}

function CategoryList({ category }: { category: FaqCategory }) {
  const label = faqCategories.find((c) => c.id === category)!.label;
  return (
    <div className="flex flex-col" style={{ gap: u(16) }}>
      <h3
        className="font-gothic uppercase leading-[1.4] text-[#FDFBFB]"
        style={{ fontSize: u(28) }}
      >
        {label}
      </h3>
      <FaqAccordion items={faq.filter((f) => f.category === category)} />
    </div>
  );
}

/**
 * Scene rebuilt as built in Figma combining the main FAQ section and sock
 * while having all the background textures and misc. elements as well
 */
export function FaqScene() {
  const ref = useRef<HTMLDivElement>(null);
  const bp = useArtboardBreakpoint(ref);
  const layout = LAYOUT[bp];

  return (
    <section
      id="faq"
      data-scene="faq"
      className="relative w-full overflow-hidden bg-[#090912]"
      style={
        {
          // Width-only: the default `--u` also fits the artboard to the
          // viewport height, which a scene taller than the viewport mustn't.
          "--u": "calc(100 * var(--vw, 1vw) / var(--ab-w))",
          minHeight: u(layout.frameH),
        } as CSSProperties
      }
    >
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-x-0"
          style={{
            height: u(layout.bg.h),
            bottom: u(layout.bg.bottom),
            background:
              "linear-gradient(180deg, #090912 0%, #3842b1 90.626%, #37a9c9 137.59%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: u(layout.frameH) }}
        >
          <SockArt bp={bp} />
        </div>
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: u(BOTTOM_FADE_H),
            background:
              "linear-gradient(180deg, rgb(6 8 37 / 0), #060825 85.559%)",
          }}
        />
      </div>

      <div
        className="relative mx-auto flex flex-col items-center"
        style={{
          width: u(layout.content.width),
          paddingTop: u(layout.content.top),
          paddingBottom: u(layout.frameH - layout.artTop),
          gap: u(layout.content.titleGap),
        }}
      >
        <div data-anim="faq-title" className="w-full">
          <Typography variant="sectionTitle" as="h2">
            {faqSection.title}
          </Typography>
        </div>
        <div className="flex w-full" style={{ gap: u(CATEGORY_GAP) }}>
          {layout.columns.map((categories, i) => (
            <div
              key={i}
              data-anim={`faq-col-${i}`}
              className="flex flex-col"
              style={{ width: u(layout.columnWidth), gap: u(CATEGORY_GAP) }}
            >
              {categories.map((category) => (
                <CategoryList key={category} category={category} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <Footer />
      </div>
    </section>
  );
}
