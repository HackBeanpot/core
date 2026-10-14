import Image from "next/image";
import React, { type CSSProperties } from "react";
import { u } from "../../../lib/scroll/units";
import { Skyline } from "./assets/Skyline";
import { SpotlightLeft } from "./assets/SpotlightLeft";
import { SpotlightRight } from "./assets/SpotlightRight";
import { Sun } from "./assets/Sun";
import {
  HERO_CANVAS,
  HERO_LAYERS,
  HERO_SKY,
  affineToCss,
  heroLayerState,
  type HeroLayerId,
  type HeroState,
} from "./manifest";

const COMPONENTS = { Skyline, Sun, SpotlightLeft, SpotlightRight };

const box = (r: {
  x: number;
  y: number;
  w: number;
  h: number;
}): CSSProperties => ({
  left: u(r.x),
  top: u(r.y),
  width: u(r.w),
  height: u(r.h),
});

function LayerArt({ id, state, breakpoint }: Props & { id: HeroLayerId }) {
  const layer = HERO_LAYERS[id];
  const s = heroLayerState(id, state, breakpoint);

  switch (layer.kind) {
    case "svg":
      return <Image src={layer.src} alt="" fill unoptimized priority />;
    case "component": {
      const Art = COMPONENTS[layer.component];
      return (
        <Art
          className="absolute inset-0 h-full w-full"
          style={s.colors as CSSProperties}
        />
      );
    }
    case "image":
      return (
        <div className="absolute" style={box(layer.rect)}>
          {/* Figma "Fill" crops like object-cover. */}
          <Image
            src={layer.src}
            alt={layer.alt}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      );
    case "rect":
      return (
        <div
          className="absolute"
          style={{ ...box(layer.rect), background: s.fill }}
        />
      );
    case "gradient": {
      const at = (y: number) => u(y - layer.rect.y);
      const rgb = layer.color.match(/\w\w/g)!.map((h) => parseInt(h, 16));
      return (
        <div
          className="absolute"
          style={{
            ...box(layer.rect),
            background: `linear-gradient(180deg, rgba(${rgb}, 0) ${at(layer.from)}, rgba(${rgb}, ${s.alpha}) ${at(layer.to)})`,
          }}
        />
      );
    }
    case "text":
      return (
        <p
          className={`absolute whitespace-nowrap text-white ${layer.font === "amarante" ? "font-amarante" : "font-gothic"}`}
          style={{
            ...box(layer.rect),
            fontSize: u(layer.size),
            // Figma's "auto" line height is the box height.
            lineHeight: u(layer.rect.h),
            textAlign: layer.align,
          }}
        >
          {layer.text}
        </p>
      );
  }
}

type Props = { state: HeroState; breakpoint?: "lg" | "md" };

/**
 * Every hero layer stacked at one state, straight from `manifest.ts`. Put it
 * in a SceneFrame's `content`. Each layer is a `HERO_CANVAS`-sized wrapper
 * with `data-anim="hero-<id>"`, so the hero scene can tween the same
 * transforms, opacities and color variables.
 */
export function HeroStack({ state, breakpoint = "lg" }: Props) {
  return (
    <>
      {(Object.keys(HERO_LAYERS) as HeroLayerId[]).map((id) => {
        const s = heroLayerState(id, state, breakpoint);
        return (
          <div
            key={id}
            data-anim={`hero-${id}`}
            className="absolute left-0 top-0"
            style={{
              // Always the LG canvas: on MD the transform maps it onto the
              // 1000-wide artboard.
              width: u(HERO_CANVAS.w),
              height: u(HERO_CANVAS.h),
              transform: affineToCss(s.transform),
              transformOrigin: "0 0",
              opacity: s.opacity,
              visibility: s.visible ? "visible" : "hidden",
            }}
          >
            <LayerArt id={id} state={state} breakpoint={breakpoint} />
          </div>
        );
      })}
    </>
  );
}

/** The sky color, for a SceneFrame's `background` (it bleeds to the viewport). */
export function HeroSky({ state }: { state: HeroState }) {
  return (
    <div className="h-full w-full" style={{ background: HERO_SKY[state] }} />
  );
}
