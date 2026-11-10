import React from "react";
import { values, valuesSection } from "../../lib/content/values";
import { Typography } from "../../lib/Components/museum/Typography";

import pillar from "../../../../public/values/sm/pillar.svg";
import stoneCommunity from "../../../../public/values/sm/stone-community.svg";
import stoneExploration from "../../../../public/values/sm/stone-exploration.svg";
import stoneGrowth from "../../../../public/values/sm/stone-growth.svg";

import { positions } from "../../../../public/values/positions";

const BACKGROUND = "linear-gradient(180deg, #37A9C9 0%, #024354 100%)";

export function MobileValues() {
  const sm = positions.sm;

  return (
    // The section fills the screen's width; the 402-wide Figma frame is
    // centered inside it.
    <section className="relative w-full" style={{ background: BACKGROUND }}>
      <div className="relative mx-auto aspect-[402/1244] w-full max-w-[402px] overflow-hidden">
        <div className="absolute top-[98px] left-0 z-20 w-full">
          <Typography variant="sectionTitle" as="h2">
            {valuesSection.title}
          </Typography>
        </div>

        <img
          src={stoneExploration.src}
          alt=""
          aria-hidden="true"
          className="absolute z-10"
          style={{
            left: sm["stone-exploration"].x,
            top: sm["stone-exploration"].y,
            width: sm["stone-exploration"].w,
            height: sm["stone-exploration"].h,
          }}
        />

        <div className="absolute top-[270px] left-0 z-20 w-full px-6 text-center">
          <Typography variant="cardTitle" as="h3">
            {values[0].title}
          </Typography>

          <div className="mt-4">
            <Typography variant="body" as="p">
              {values[0].body}
            </Typography>
          </div>
        </div>

        <img
          src={stoneGrowth.src}
          alt=""
          aria-hidden="true"
          className="absolute z-10"
          style={{
            left: sm["stone-growth"].x,
            top: sm["stone-growth"].y,
            width: sm["stone-growth"].w,
            height: sm["stone-growth"].h,
          }}
        />

        <div className="absolute top-[590px] left-0 z-20 w-full px-6 text-center">
          <Typography variant="cardTitle" as="h3">
            {values[1].title}
          </Typography>

          <div className="mt-4">
            <Typography variant="body" as="p">
              {values[1].body}
            </Typography>
          </div>
        </div>

        <img
          src={stoneCommunity.src}
          alt=""
          aria-hidden="true"
          className="absolute z-10"
          style={{
            left: sm["stone-community"].x,
            top: sm["stone-community"].y,
            width: sm["stone-community"].w,
            height: sm["stone-community"].h,
          }}
        />

        <div className="absolute top-[882px] left-0 z-20 w-full px-6 text-center">
          <Typography variant="cardTitle" as="h3">
            {values[2].title}
          </Typography>

          <div className="mt-4">
            <Typography variant="body" as="p">
              {values[2].body}
            </Typography>
          </div>
        </div>

        <img
          src={pillar.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-auto w-[224px] -translate-x-1/2"
        />
      </div>
    </section>
  );
}
