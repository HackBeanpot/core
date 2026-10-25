"use client";

import React, { useEffect, useRef, useState } from "react";
import { about } from "../../../lib/content/about";
import { u } from "../../../lib/scroll/units";
import { SceneFrame } from "../SceneFrame";
import { Fog, Candle } from "../../../lib/Components/Decor";
import PictureFrame from "../../../lib/Components/museum/PictureFrame";
import { Typography } from "../../../lib/Components/museum/Typography";
import { positions } from "../../../../../public/about/positions";

type ScreenSize = "lg" | "md";

const BACKGROUND: Record<ScreenSize, string> = {
  lg: "linear-gradient(180deg, #15173b 0%, #060825 100%)",
  md: "linear-gradient(180deg, #15173b 0%, #060825 100%)",
};


function bottomFogStyle(box: {
  x: number;
  y: number;
  w: number;
  h: number;
}): React.CSSProperties {
  return {
    position: "absolute",
    left: u(box.x),
    top: `calc(${u(box.y)} + ${u(360)})`,
    width: u(box.w),
    height: u(box.h),
  };
}

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
  const [ss, setSs] = useState<ScreenSize>("lg");

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const observer = new ResizeObserver(([entry]) => {
      setSs(entry.contentRect.width >= 1000 ? "lg" : "md");
    });

    observer.observe(scene);

    return () => observer.disconnect();
  }, []);

  const upperFog = positions[ss]["cloud-top-1"];
  const upperFog2 = positions[ss]["cloud-top-2"];

  const candle1 = positions[ss]["candle-1"];
  const candle2 = positions[ss]["candle-2"];

  const bottomFog1 = positions.lg["cloud-bottom-1"];
  const bottomFog2 = positions.lg["cloud-bottom-2"];

  return (
    <SceneFrame
      sceneId="about"
      background={
        <div className="h-full w-full" style={{ background: BACKGROUND[ss] }} />
      }
      content={
        <div ref={sceneRef} className="relative h-full w-full">
          {/* Upper fogs  */}
          <div
            data-anim="about-fog-tl"
            className="pointer-events-none absolute z-0"
            style={{
              left: u(upperFog.x),
              top: u(upperFog.y),
              width: u(upperFog.w),
              height: u(upperFog.h),
            }}
          >
            <Fog variant="cornerTopRight" />
          </div>

          <div
            data-anim="about-fog-tl-2"
            className="pointer-events-none absolute z-0"
            style={{
              left: u(upperFog2.x),
              top: u(upperFog2.y),
              width: u(upperFog2.w),
              height: u(upperFog2.h),
            }}
          >
            <Fog variant="cornerTopRight" />
          </div>

          {/* Lower fogs - should only show on lg */}
          {ss === "lg" && (
            <>
              {/* Bottom fog on the left side */}
              <div
                data-anim="about-fog-br"
                className="pointer-events-none absolute z-0"
                style={bottomFogStyle(bottomFog1)}
              >
                <Fog variant="cornerBottomRight" />
              </div>

              {/* Bottom fog on the right side */}
              <div
                data-anim="about-fog-br-2"
                className="pointer-events-none absolute z-0"
                style={bottomFogStyle(bottomFog2)}
              >
                <Fog variant="cornerBottomRight" />
              </div>
            </>
          )}

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

          {/* Picture frame */}
          <div
            data-anim="about-frame"
            className="absolute z-15"
            style={{
              left: u(ss === "lg" ? 785.76 : 321),
              top: u(ss === "lg" ? 222 : 101),
              width: u(504.0000305175786),
              height: u(646.4348754882818),
            }}
          >
            <PictureFrame
              variant="copperRect"
              width="504.0000305175786px"
              src={about.photo.src}
              alt={about.photo.alt}
            />
          </div>
        </div>
      }
    />
  );
}
