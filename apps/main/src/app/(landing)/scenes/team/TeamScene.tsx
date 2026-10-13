"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { teamAssets } from "../../../../../public/team/positions";
import { team, teamSection } from "../../../lib/content";
import type { TeamMember } from "../../../lib/content/types";
import {
  CarouselArrow,
  useHorizontalGallery,
} from "../../../lib/Components/museum";
import PictureFrame from "../../../lib/Components/museum/PictureFrame";
import type { PictureFrameVariant } from "../../../lib/Components/museum/PictureFrame";
import { u } from "../../../lib/scroll/units";
import { SceneFrame } from "../SceneFrame";

type Artboard = "lg" | "md";

/**
 * Frame widths in LG artboard px, from the department rows in Figma
 * (`5847:2138`): every frame is 220 tall except the medallion (240).
 * MD draws them at 90% (`frameScale`).
 */
const FRAME_WIDTH: Record<PictureFrameVariant, number> = {
  goldBevel: 200,
  blueMedallion: 198,
  copperRect: 172,
  wood: 317,
  greenArch: 153,
  navyShield: 181,
  // Not used by any department; here so the record is total.
  copper: 509,
  silverBevel: 232,
  goldMedallion: 285,
  placeholderOval: 218,
};

/** Name/role column, from `Frame 911` in LG `5597:20455`. */
const LABEL = { minWidth: 179.37, gap: 11.1, lineGap: 1.85 };

/** Positions in artboard px. LG `5597:20455` (frame y -39), MD `5690:3059`. */
const LAYOUT = {
  lg: {
    titleTop: 103,
    stripTop: 191,
    rowHeight: 304,
    rowGap: 46.4,
    /** Left edge of the first item in each row: the staggered offsets. */
    rowStart: [97, 72],
    /** Space between items in each row. */
    itemGap: [74, 83.2],
    frameScale: 1,
    arrowTop: 493,
  },
  md: {
    titleTop: 97,
    stripTop: 204,
    rowHeight: 280,
    rowGap: 58.4,
    rowStart: [97, 72],
    itemGap: [74, 83.2],
    frameScale: 0.9,
    arrowTop: 506,
  },
} as const;

const AB_WIDTH: Record<Artboard, number> = { lg: 1512, md: 1000 };
const AB_HEIGHT = 982;
const ARROW = { size: 74, inset: 40 };

// The strip and arrows hang off the viewport edges, not the artboard's: on a
// screen wider than the artboard's ratio the artboard is centered with empty
// bands either side, and the strip should still run edge to edge. --vw is
// overridden by the dev harness for `&w=1000`, so this follows it.
const VIEWPORT_W = "calc(100 * var(--vw, 1vw))";
/** Distance from the artboard edge to the viewport edge (<= 0). */
const BLEED = "calc(50% - 50 * var(--vw, 1vw))";
const fromViewportEdge = (n: number) => `calc(${BLEED} + ${n} * var(--u))`;

const shuffle = <T,>(items: readonly T[]): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/**
 * Random order where, as in Figma, neighbors in a row (two apart, since items
 * alternate rows) are from different departments and so get different frames.
 * Picks randomly among the members that fit, falling back to any member when
 * none does (e.g. the last few are all one department).
 */
const shuffleMembers = (members: readonly TeamMember[]): TeamMember[] => {
  const pool = shuffle(members);
  const out: TeamMember[] = [];
  while (pool.length) {
    const neighbor = out[out.length - 2]?.department;
    const fits = pool.findIndex((m) => m.department !== neighbor);
    out.push(...pool.splice(Math.max(fits, 0), 1));
  }
  return out;
};

/**
 * LG or MD, read from `--ab-w` so the harness's forced width (`&w=1000`) picks
 * MD even on a wide screen, which a `tablet:` media query wouldn't.
 */
const useArtboard = (ref: React.RefObject<HTMLElement | null>): Artboard => {
  const [artboard, setArtboard] = useState<Artboard>("lg");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const abW = Number(getComputedStyle(el).getPropertyValue("--ab-w"));
      setArtboard(abW === AB_WIDTH.md ? "md" : "lg");
    };
    read();
    // The artboard box resizes whenever --u or --ab-w changes.
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return artboard;
};

function TeamMemberCard({
  member,
  index,
  scale,
}: {
  member: TeamMember;
  index: number;
  scale: number;
}) {
  const frameWidth = FRAME_WIDTH[member.frame] * scale;

  return (
    <li
      data-anim={`team-member-${index}`}
      className="flex shrink-0 flex-col items-center text-center"
      style={{
        width: u(Math.max(frameWidth, LABEL.minWidth)),
        gap: u(LABEL.gap),
      }}
    >
      <PictureFrame
        variant={member.frame}
        width={u(frameWidth)}
        src={member.photo.src}
        alt={member.photo.alt}
        // next/image is lazy by default, so only the members on (or next to)
        // the first visible page load until the strip scrolls.
        sizes="330px"
      />
      <div className="flex w-full flex-col" style={{ gap: u(LABEL.lineGap) }}>
        <p
          className="font-gothic leading-normal text-white"
          style={{ fontSize: u(20.34) }}
        >
          {member.name}
        </p>
        <p
          className="font-merriweather font-light leading-[1.4] text-white/80"
          style={{ fontSize: u(14.79) }}
        >
          {member.role}
        </p>
      </div>
    </li>
  );
}

function TeamContent({
  artboardRef,
  artboard,
}: {
  artboardRef: React.RefObject<HTMLDivElement>;
  artboard: Artboard;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const layout = LAYOUT[artboard];
  const { canPrev, canNext, prev, next, update } =
    useHorizontalGallery(trackRef);

  // Random order on every visit. The first render keeps the content order so
  // the server and client markup match; the shuffle runs after hydration.
  const [members, setMembers] = useState<TeamMember[]>(team);
  useEffect(() => setMembers(shuffleMembers(team)), []);
  // Row widths change with the shuffle and the artboard, so recheck the ends.
  useEffect(update, [members, artboard, update]);

  // Members alternate rows: 0, 2, 4… on top, 1, 3, 5… below.
  const rows = [0, 1].map((row) =>
    members
      .map((member, index) => ({ member, index }))
      .filter(({ index }) => index % 2 === row),
  );

  return (
    <div ref={artboardRef} className="absolute inset-0">
      <h2
        data-anim="team-title"
        className="absolute inset-x-0 text-center font-amarante leading-normal text-white"
        style={{ top: u(layout.titleTop), fontSize: u(50) }}
      >
        {teamSection.title}
      </h2>

      {/* The animation transforms this wrapper; the track inside it owns
          scrollLeft, so the two never fight. */}
      <div
        data-anim="team-strip"
        className="absolute"
        style={{ top: u(layout.stripTop), left: BLEED, width: VIEWPORT_W }}
      >
        <div
          ref={trackRef}
          role="region"
          aria-label="Team members"
          tabIndex={0}
          className="overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] focus:outline-none [&::-webkit-scrollbar]:hidden"
        >
          <div
            className="flex w-max flex-col"
            style={{ gap: u(layout.rowGap) }}
          >
            {rows.map((items, row) => (
              <ul
                key={row}
                data-anim={`team-row-${row}`}
                className="flex items-center"
                style={{
                  height: u(layout.rowHeight),
                  gap: u(layout.itemGap[row]),
                  paddingLeft: u(layout.rowStart[row]),
                  paddingRight: u(layout.rowStart[row]),
                }}
              >
                {items.map(({ member, index }) => (
                  <TeamMemberCard
                    key={member.photo.src}
                    member={member}
                    index={index}
                    scale={layout.frameScale}
                  />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      {(["left", "right"] as const).map((direction) => (
        <div
          key={direction}
          className="absolute z-10"
          style={{
            top: u(layout.arrowTop),
            [direction]: fromViewportEdge(ARROW.inset),
            width: u(ARROW.size),
            height: u(ARROW.size),
          }}
        >
          <CarouselArrow
            direction={direction}
            size="lg"
            aria-label={
              direction === "left"
                ? "Previous team members"
                : "Next team members"
            }
            disabled={direction === "left" ? !canPrev : !canNext}
            onClick={direction === "left" ? prev : next}
            // The primitive is 48px; Figma's team arrows are 74 with a 49 icon.
            className="!h-full !w-full [&>svg]:!h-[66%] [&>svg]:!w-[66%]"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Floor and benches stay on the viewport's bottom edge (the artboard is
 * centered, so on tall screens it would float). x is still artboard px.
 */
function TeamBackground({ artboard }: { artboard: Artboard }) {
  const { floor, benchLeft, benchRight } = teamAssets[artboard];
  const fromCenter = (x: number) =>
    `calc(50% + ${x - AB_WIDTH[artboard] / 2} * var(--u))`;

  return (
    <div
      className="relative h-full w-full"
      style={{
        background: "linear-gradient(180deg, #37a9c9 0%, #024354 90.8%)",
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 bg-repeat-x"
        style={{
          height: u(floor.h),
          backgroundImage: `url("${floor.src}")`,
          backgroundSize: `${u(floor.w)} 100%`,
          backgroundPosition: "center bottom",
        }}
      />
      <div data-anim="team-benches">
        {[benchLeft, benchRight].map((bench) => (
          <div
            key={bench.x}
            className="absolute"
            style={{
              left: fromCenter(bench.x),
              bottom: u(AB_HEIGHT - bench.y - bench.h),
              width: u(bench.w),
              height: u(bench.h),
            }}
          >
            <Image src={bench.src} alt="" fill unoptimized />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Meet the Team, final resting state (MS-209). LG `5597:20455`, MD `5690:3059`.
 *
 * One continuous strip in random order: members alternate between two rows,
 * and each department keeps its own frame (`departmentFrames` in
 * `lib/content/team.ts`). The arrows page by one viewport; trackpad and touch
 * scroll the strip natively.
 *
 * Hooks: `team-title`, `team-strip` (wrapper around the scroll track),
 * `team-row-{0,1}`, `team-member-{i}`, `team-benches`.
 */
export function TeamScene() {
  const artboardRef = useRef<HTMLDivElement>(null);
  const artboard = useArtboard(artboardRef);

  return (
    <SceneFrame
      sceneId="team"
      background={<TeamBackground artboard={artboard} />}
      content={<TeamContent artboardRef={artboardRef} artboard={artboard} />}
    />
  );
}
