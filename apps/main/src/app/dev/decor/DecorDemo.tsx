"use client";

import React, { useState } from "react";
import {
  Candle,
  Fog,
  FogVariant,
  Sparkle,
  SparkleCluster,
  Spotlight,
  Starfield,
} from "../../lib/Components/Decor";

// Each fog at its full Figma frame size (shrinks on narrow screens), pinned to the
// side it hugs. The panel grows to fit, so nothing is cut off.
const FOG_PLACEMENT: Record<FogVariant, string> = {
  cornerTopLeft: "mr-auto max-w-[667px]",
  cornerTopRight: "ml-auto max-w-[574px]",
  cornerBottomLeft: "mr-auto max-w-[574px]",
  cornerBottomRight: "ml-auto max-w-[1039px]",
  sideLeft: "mr-auto max-w-[622px]",
  sideRight: "ml-auto max-w-[622px]",
  ribbon: "ml-auto max-w-[915px]",
};
const FOG_VARIANTS = Object.keys(FOG_PLACEMENT) as FogVariant[];

// The fog is translucent, so it picks up the section color behind it. Use the Figma
// section backgrounds: About is deep navy, Testimonials / FAQ are dark purple.
const FOG_BACKGROUND: Partial<Record<FogVariant, string>> = {
  cornerBottomRight: "bg-[#110E30]",
};

const Panel = ({
  title,
  children,
  dark = true,
  wide = false,
}: {
  title: string;
  children: React.ReactNode;
  dark?: boolean;
  /** Span both columns. */
  wide?: boolean;
}) => (
  <section className={`flex flex-col gap-3 ${wide ? "md:col-span-2" : ""}`}>
    <h2 className="font-DMSans-Medium text-lg text-carouselCream">{title}</h2>
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 ${
        dark ? "bg-starlightBlueDark" : "bg-starlightBlue"
      }`}
    >
      {children}
    </div>
  </section>
);

export default function DecorDemo() {
  const [animate, setAnimate] = useState(true);
  const [density, setDensity] = useState(0.6);
  const [seed, setSeed] = useState(1);
  // -46° is the lamp's aim in the Figma hero.
  const [angle, setAngle] = useState(-46);

  return (
    <main className="min-h-screen bg-charcoalFogDark px-6 py-10 text-carouselCream">
      <header className="mb-8 flex flex-wrap items-center gap-6">
        <h1 className="font-DMSans-Bold text-3xl">Decor primitives</h1>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
          />
          animate
        </label>
        <p className="text-sm opacity-70">
          Toggle OS “reduce motion” to check that everything goes static.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        <Panel title="Starfield" wide>
          {/* Figma hero night sky: 1512×982, #0B0D21. */}
          <div className="aspect-[1512/982] bg-[#0B0D21]">
            <Starfield density={density} seed={seed} animate={animate} />
          </div>
          <div className="flex flex-wrap gap-4 p-3 text-sm">
            <label className="flex items-center gap-2">
              density {density.toFixed(2)}
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
              />
            </label>
            <label className="flex items-center gap-2">
              seed
              <input
                type="number"
                className="w-16 rounded bg-white/10 px-1"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value) || 0)}
              />
            </label>
          </div>
        </Panel>

        <Panel title="Sparkle / SparkleCluster">
          {/* Background matches the Testimonials frame, for side-by-side comparison. */}
          <div className="flex h-72 items-center justify-around bg-[#1F0833]">
            <Sparkle size={14} animate={animate} />
            <Sparkle size={22} delay={0.6} animate={animate} />
            <Sparkle size={36} delay={1.2} animate={animate} />
            <SparkleCluster size={96} animate={animate} />
            <SparkleCluster size={96} flip delay={0.4} animate={animate} />
          </div>
        </Panel>

        <Panel title="Candle">
          {/* Background + pair match the About frame, for side-by-side comparison. */}
          <div className="flex h-[640px] items-end justify-around bg-[#110E30] pb-4">
            <div className="flex items-end gap-4">
              <Candle animate={animate} />
              <Candle height={115} holderHeight={280} animate={animate} />
            </div>
            <Candle height={90} holderHeight={262} animate={animate} />
            <Candle animate={animate} />
          </div>
        </Panel>

        <Panel title="Spotlight">
          <div className="relative h-[420px]">
            <Spotlight
              className="absolute bottom-0 left-[20%] -translate-x-1/2"
              angle={angle}
              length={240}
              fixture
              animate={animate}
            />
            <Spotlight
              className="absolute bottom-0 left-[50%] -translate-x-1/2"
              angle={0}
              length={240}
              animate={animate}
            />
            <Spotlight
              className="absolute right-[20%] top-0 translate-x-1/2"
              angle={-angle}
              length={240}
              origin="top"
              fixture
              animate={animate}
            />
          </div>
          <label className="flex items-center gap-2 p-3 text-sm">
            angle {angle}°
            <input
              type="range"
              min={-80}
              max={80}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
            />
          </label>
        </Panel>

        {FOG_VARIANTS.map((v) => (
          <Panel key={v} title={`Fog · ${v}`} wide>
            <div className={FOG_BACKGROUND[v] ?? "bg-[#1F0833]"}>
              <Fog variant={v} animate={animate} className={FOG_PLACEMENT[v]} />
            </div>
          </Panel>
        ))}
      </div>
    </main>
  );
}
