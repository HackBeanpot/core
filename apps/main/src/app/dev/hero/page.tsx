import { notFound } from "next/navigation";
import React from "react";
import { HeroSky, HeroStack } from "../../(landing)/scenes/hero/HeroStack";
import {
  HERO_STATES,
  type HeroState,
} from "../../(landing)/scenes/hero/manifest";
import { SceneFrame } from "../../(landing)/scenes/SceneFrame";

/**
 * `/dev/hero?state=day|dusk|night|title|zoom[&bp=md]`: the MS-103 layer stack
 * at one state, for checking the export against the Figma frames.
 */
export default function HeroStackDevPage({
  searchParams,
}: {
  searchParams: { state?: string; bp?: string };
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const state = (HERO_STATES as readonly string[]).includes(
    searchParams.state ?? "",
  )
    ? (searchParams.state as HeroState)
    : "day";
  const md = searchParams.bp === "md";

  return (
    <div
      className="mx-auto"
      style={
        md
          ? ({
              width: 1000,
              "--vw": "10px",
              "--ab-w": 1000,
            } as React.CSSProperties)
          : undefined
      }
    >
      <SceneFrame
        sceneId="hero"
        background={<HeroSky state={state} />}
        content={<HeroStack state={state} breakpoint={md ? "md" : "lg"} />}
      />
    </div>
  );
}
