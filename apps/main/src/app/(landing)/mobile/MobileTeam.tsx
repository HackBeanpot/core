"use client";

import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { teamAssets } from "../../../../public/team/positions";
import { departments, team, teamSection } from "../../lib/content/team";
import type { Department, TeamMember } from "../../lib/content/types";
import {
  CarouselArrow,
  galleryItemClassName,
  galleryTrackClassName,
  useHorizontalGallery,
} from "../../lib/Components/museum";
import ExternalLink from "../../lib/Components/ExternalLink";
import PictureFrame from "../../lib/Components/museum/PictureFrame";
import { typographyVariants } from "../../lib/Components/museum/Typography";
import { FRAME_WIDTH } from "../scenes/team/TeamScene";

/** Department order in the SM frames (not the content file's order). */
const ORDER: Department[] = [
  "directors",
  "tech",
  "design",
  "marketing",
  "sponsorship",
  "operations",
];

/** SM frames are 160 tall; LG's are 220, so widths scale by the same ratio. */
const FRAME_HEIGHT = 160;
const FRAME_SCALE = FRAME_HEIGHT / 220;

const labelOf = (id: Department) => departments.find((d) => d.id === id)!.label;

function MemberCard({ member }: { member: TeamMember }) {
  const width = FRAME_WIDTH[member.frame] * FRAME_SCALE;
  return (
    // Cards are 194 wide in Figma and overlap by 12, so each one advances 182.
    <li
      className={clsx(
        galleryItemClassName,
        "flex w-[182px] flex-col items-center gap-3 text-center",
      )}
    >
      <PictureFrame
        variant={member.frame}
        width={`${width}px`}
        // Every SM frame is 160 tall (rect frames would otherwise take the
        // art's own ratio; shaped ones ignore this).
        aspect={width / FRAME_HEIGHT}
        src={member.photo.src}
        alt={member.photo.alt}
        sizes="160px"
      />
      <div className="flex flex-col items-center gap-0.5">
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap font-gothic text-[22px] leading-[normal] text-white">
            {member.name}
          </p>
          {member.linkedinUrl && (
            <ExternalLink
              href={member.linkedinUrl}
              aria-label={`${member.name} on LinkedIn`}
              className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Image
                src="/team/sm/linkedin.svg"
                alt=""
                width={16}
                height={16}
              />
            </ExternalLink>
          )}
        </div>
        <p className="font-merriweather text-[16px] font-light leading-[1.4] text-white/80">
          {member.role}
        </p>
      </div>
    </li>
  );
}

/** One department's members: a snapping row you swipe, plus arrows when it overflows. */
function MemberRow({
  id,
  label,
  members,
  hidden,
}: {
  id: string;
  label: string;
  members: TeamMember[];
  hidden: boolean;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const { canPrev, canNext, prev, next } = useHorizontalGallery(trackRef);

  return (
    <div
      id={id}
      role="region"
      aria-label={`${label} team members`}
      hidden={hidden}
      className="mb-2 w-full"
    >
      <ul
        ref={trackRef}
        className={clsx(
          galleryTrackClassName,
          "w-full scroll-pl-[6px] overscroll-x-contain pl-[6px] pr-[6px]",
        )}
      >
        {members.map((member) => (
          <MemberCard key={member.photo.src} member={member} />
        ))}
      </ul>
      {(canPrev || canNext) && (
        <div className="mt-4 flex justify-center gap-4">
          <CarouselArrow
            direction="left"
            size="sm"
            aria-label={`Previous ${label} members`}
            disabled={!canPrev}
            onClick={prev}
          />
          <CarouselArrow
            direction="right"
            size="sm"
            aria-label={`Next ${label} members`}
            disabled={!canNext}
            onClick={next}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Meet the Team on SM (MS-407): Figma `5681:1281` (Directors open) and
 * `5685:18775` (Tech open) are two states of one department switcher. Each
 * department is a button; the open one shows its members in a row that
 * swipes natively with snap points (vertical page scroll is untouched), with
 * arrows once the row overflows. One department is open at a time. Static:
 * nothing animates.
 */
export function MobileTeam() {
  const baseId = useId();
  const [open, setOpen] = useState<Department | null>("directors");
  const floor = teamAssets.sm.floor;

  return (
    // No `id="team"`: the LG/MD SceneFrame owns that anchor and both are in the DOM.
    <section
      className="relative flex min-h-[874px] w-full flex-col items-center overflow-hidden pb-[124px]"
      style={{
        background: "linear-gradient(180deg, #37a9c9 0%, #024354 90.793%)",
      }}
    >
      <h2
        className={clsx(typographyVariants.sectionTitle, "mt-[55px] uppercase")}
        style={{ lineHeight: "normal" }}
      >
        {teamSection.title}
      </h2>

      {/* Figma: the list starts 130 from the top, 24 between rows. */}
      <ul className="mt-[31px] flex w-full flex-col items-center gap-6">
        {ORDER.map((id) => {
          const label = labelOf(id);
          const isOpen = open === id;
          const panelId = `${baseId}-${id}`;
          return (
            <li key={id} className="flex w-full flex-col items-center gap-6">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : id)}
                className="flex w-[calc(100%-40px)] max-w-[362px] items-center justify-between text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="font-merriweather text-[18px] font-normal leading-[normal] text-white">
                  {label}
                </span>
                <Image
                  src="/team/sm/chevron.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={clsx("shrink-0", !isOpen && "-rotate-90")}
                />
              </button>
              <MemberRow
                id={panelId}
                label={label}
                members={team.filter((m) => m.department === id)}
                hidden={!isOpen}
              />
            </li>
          );
        })}
      </ul>

      {/* Baseboard + floor + bench, one flattened export. Past 402px the
          strip and floor color carry on to the edges; below it, it scales. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0">
        {/* The baseboard is the top 35 of the export's 104. */}
        <div className="absolute inset-x-0 top-0 h-[33.65%] bg-[#017b9d]" />
        <div className="absolute inset-x-0 bottom-0 top-[33.65%] bg-[#421c07]" />
        <Image
          src={floor.src}
          alt=""
          width={floor.w}
          height={floor.h}
          className="relative mx-auto block h-auto w-full max-w-[402px]"
        />
      </div>
    </section>
  );
}
