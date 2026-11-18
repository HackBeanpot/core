"use client";

import React, { useRef } from "react";
import { about } from "../../../lib/content/about";
import { u } from "../../../lib/scroll/units";
import { SceneFrame } from "../SceneFrame";
import { Candle } from "../../../lib/Components/Decor";
import "../../../lib/Components/Decor/decor.css";
import { useArtboardBreakpoint } from "../../../lib/scroll/useArtboardBreakpoint";
import PictureFrame from "../../../lib/Components/museum/PictureFrame";
import { Typography } from "../../../lib/Components/museum/Typography";
import { positions } from "../../../../../public/about/positions";

/** Also where Values' enter morphs from. */
export const ABOUT_BACKGROUND =
  "linear-gradient(180deg, #15173b 0%, #060825 100%)";

type Box = { x: number; y: number; w: number; h: number };

/**
 * The strips between the artboard and the screen edges. SceneFrame centers
 * the artboard, so when the window's shape differs from it these are half the
 * leftover height / width, else 0. The fogs run off the Figma frame's edges,
 * so they're pushed out by these to keep running off the screen's edges
 * instead of ending (or showing their cut tops) in the letterbox.
 */
const V_STRIP =
  "max(0px, calc((100 * var(--vh, 1svh) - var(--ab-h) * var(--u)) / 2))";
const H_STRIP =
  "max(0px, calc((100 * var(--vw, 1vw) - var(--ab-w) * var(--u)) / 2))";

/**
 * Places a Figma fog export. Top fogs hang off the screen's top-left corner,
 * bottom fogs rise from its bottom-right.
 */
function fogStyle(
  box: Box,
  corner: "top-left" | "bottom-right",
): React.CSSProperties {
  const top = corner === "top-left";
  return {
    position: "absolute",
    left: `calc(${u(box.x)} ${top ? "-" : "+"} ${H_STRIP})`,
    top: `calc(${u(box.y)} ${top ? "-" : "+"} ${V_STRIP})`,
    width: u(box.w),
    height: u(box.h),
  };
}

/** A fog SVG exported from Figma, with the shared slow drift on top. */
function FogImage({
  src,
  drift,
  duration,
}: {
  src: string;
  drift: [string, string];
  duration: string;
}) {
  return (
    <div
      className="decor-fog-drift h-full w-full"
      style={
        {
          "--decor-duration": duration,
          "--decor-drift-x": drift[0],
          "--decor-drift-y": drift[1],
        } as React.CSSProperties
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className="block h-full w-full max-w-none select-none"
      />
    </div>
  );
}

/** Figma `Group 282`: the photo frame is 646×504 on both artboards. */
const FRAME = {
  lg: { x: 785.76, y: 222 },
  md: { x: 321, y: 101 },
  w: 646,
  h: 504,
} as const;

// Plaque component
function Plaque({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative h-full w-full bg-[#B26E00] px-8 py-10 shadow-[14px_14px_0px_rgba(0,0,0,0.35)] ${className}`}
    >
      {/* Top-left screw */}
      <span
        aria-hidden="true"
        className="absolute left-[14px] top-[14px] h-3 w-3 rounded-full bg-[#843D16]"
      />

      {/* Top-right screw */}
      <span
        aria-hidden="true"
        className="absolute right-[14px] top-[14px] h-3 w-3 rounded-full bg-[#843D16]"
      />

      {/* Bottom-left screw */}
      <span
        aria-hidden="true"
        className="absolute bottom-[14px] left-[14px] h-3 w-3 rounded-full bg-[#843D16]"
      />

      {/* Bottom-right screw */}
      <span
        aria-hidden="true"
        className="absolute bottom-[14px] right-[14px] h-3 w-3 rounded-full bg-[#843D16]"
      />

      <div className="flex flex-col gap-4">
        <div data-anim="about-text-line">
          <Typography variant="sectionTitle" as="h2">
            {title}
          </Typography>
        </div>

        <div data-anim="about-text-line">{children}</div>
      </div>
    </div>
  );
}

export function AboutScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const ss = useArtboardBreakpoint(sceneRef);
  const pos = positions[ss];
  const lg = positions.lg;

  const topFogs = [
    {
      key: "cloud-top-1",
      anim: "about-fog-tl",
      drift: ["-1%", "1%"],
      duration: "14s",
    },
    {
      key: "cloud-top-2",
      anim: "about-fog-tl-2",
      drift: ["1.5%", "1%"],
      duration: "18s",
    },
  ] as const;
  // LG only (MD's frame has no bottom fog). Always rendered, so the
  // animation's targets survive an LG ↔ MD switch.
  const bottomFogs = [
    {
      key: "cloud-bottom-1",
      anim: "about-fog-br",
      drift: ["1.5%", "1%"],
      duration: "20s",
    },
    {
      key: "cloud-bottom-2",
      anim: "about-fog-br-2",
      drift: ["-1%", "1%"],
      duration: "16s",
    },
  ] as const;

  const candle1 = pos["candle-1"];
  const candle2 = pos["candle-2"];

  return (
    <SceneFrame
      sceneId="about"
      background={
        <div
          className="h-full w-full"
          style={{ background: ABOUT_BACKGROUND }}
        />
      }
      content={
        <div ref={sceneRef} className="relative h-full w-full">
          {/* Upper fogs, hanging off the screen's top-left corner */}
          {topFogs.map((fog) => (
            <div
              key={fog.key}
              data-anim={fog.anim}
              className="pointer-events-none absolute z-0"
              style={fogStyle(pos[fog.key], "top-left")}
            >
              <FogImage
                src={`/about/${ss}/${fog.key}.svg`}
                drift={[...fog.drift]}
                duration={fog.duration}
              />
            </div>
          ))}

          {/* Lower fogs (LG), rising from the screen's bottom-right corner */}
          {bottomFogs.map((fog) => (
            <div
              key={fog.key}
              data-anim={fog.anim}
              className="pointer-events-none absolute z-0"
              style={{
                ...fogStyle(lg[fog.key], "bottom-right"),
                display: ss === "lg" ? undefined : "none",
              }}
            >
              <FogImage
                src={`/about/lg/${fog.key}.svg`}
                drift={[...fog.drift]}
                duration={fog.duration}
              />
            </div>
          ))}

          {/* First candle */}
          <div
            data-anim="about-candle-left"
            className="pointer-events-none absolute z-10"
            style={{
              left: u(candle1.x),
              top: u(candle1.y),
              width: u(candle1.w),
              height: u(candle1.h),
            }}
          >
            <Candle height={131.273} holderHeight={332} />
          </div>

          {/* Second candle */}
          <div
            data-anim="about-candle-right"
            className="pointer-events-none absolute z-10"
            style={{
              left: u(candle2.x),
              top: u(candle2.y),
              width: u(candle2.w),
              height: u(candle2.h),
            }}
          >
            <Candle height={131.273} holderHeight={332} />
          </div>

          {/* Plaque */}
          <div
            data-anim="about-plaque"
            className="absolute z-10"
            style={{
              left: u(ss === "lg" ? 212 : 32),
              top: u(ss === "lg" ? 279 : 456),
              width: u(514),
              height: u(391),
            }}
          >
            <Plaque title={about.title}>
              <Typography variant="body" as="p">
                {about.body}
              </Typography>
            </Plaque>
          </div>

          {/* Picture frame, sized in artboard units so it scales with the
              scene (a fixed px width ran off the right edge on MD). */}
          <div
            data-anim="about-frame"
            className="absolute z-15"
            style={{
              left: u(FRAME[ss].x),
              top: u(FRAME[ss].y),
              width: u(FRAME.w),
            }}
          >
            <PictureFrame
              variant="copperRect"
              width="100%"
              aspect={FRAME.w / FRAME.h}
              src={about.photo.src}
              alt={about.photo.alt}
            />
          </div>
        </div>
      }
    />
  );
}
