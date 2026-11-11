"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { projectsAssets } from "../../../../public/projects/positions";
import {
  projects as defaultProjects,
  projectsSection,
} from "../../lib/content";
import type { Project } from "../../lib/content/types";
import {
  CarouselArrow,
  CarouselRegion,
  CarouselSwap,
  useCarousel,
  useSwipe,
} from "../../lib/Components/museum";
import PictureFrame from "../../lib/Components/museum/PictureFrame";
import { Typography } from "../../lib/Components/museum/Typography";
import { ProjectMediaView } from "../scenes/projects/ProjectMedia";

const { background, externalLink } = projectsAssets.sm;

/** The wood frame's box in Figma (`main frame`, 358x201). */
const FRAME_ASPECT = 358 / 201;

/**
 * SM Past Projects (`5615:26385`), fully static: a swipe + arrow carousel
 * with the project's media in the wood frame, then its title (linking out),
 * members and description.
 *
 * Normal vertical flow, fluid from 320 to 639px: the column is 358px wide at
 * the 402px frame and narrows with 22px side margins. The background art
 * (the clipboard sketch) is pinned to the bottom-right corner.
 */
export function MobileProjects({
  items = defaultProjects,
}: {
  /** Defaults to `lib/content/projects.ts`. */
  items?: Project[];
}) {
  const swipeRef = useRef<HTMLDivElement>(null);
  const { index, item, next, prev, canPrev, canNext, direction } =
    useCarousel(items);
  useSwipe(swipeRef, { onLeft: next, onRight: prev });

  return (
    // `data-sm-scene`, not `id="projects"`: the LG/MD SceneFrame owns that id and both
    // are in the DOM. Header links and `/#projects` find this via `fallbackScrollToScene`.
    <section
      data-sm-scene="projects"
      aria-labelledby="projects-title-sm"
      className="scroll-mt-20 relative overflow-hidden bg-[#5a4c86]"
    >
      <Image
        src={background.src}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-right-bottom"
      />

      <div className="relative mx-auto flex w-[min(358px,calc(100%-44px))] flex-col pb-[182px] pt-[20px]">
        <Typography variant="sectionTitle" as="h2">
          <span id="projects-title-sm">{projectsSection.title}</span>
        </Typography>

        {item && (
          <CarouselRegion
            label="Past projects"
            onPrev={prev}
            onNext={next}
            className="mt-[22px] flex flex-col gap-[32px]"
          >
            <div ref={swipeRef}>
              <CarouselSwap
                swapKey={index}
                direction={direction}
                animated={false}
              >
                <ProjectSlide project={item} />
              </CarouselSwap>
            </div>
            <div className="flex gap-[9px]">
              <CarouselArrow
                direction="left"
                disabled={!canPrev}
                onClick={prev}
                aria-label="Previous project"
              />
              <CarouselArrow
                direction="right"
                disabled={!canNext}
                onClick={next}
                aria-label="Next project"
              />
            </div>
          </CarouselRegion>
        )}
      </div>
    </section>
  );
}

function ProjectSlide({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-[32px]">
      <PictureFrame
        variant="wood"
        width="100%"
        aspect={FRAME_ASPECT}
        // Logos sit on white; video and embeds on black while they load.
        innerClassName={
          project.media.type === "image" ? "bg-museum-ivory-light" : "bg-black"
        }
      >
        <ProjectMediaView
          media={project.media}
          sizes="(max-width: 639px) 100vw, 358px"
          autoplay={false}
        />
      </PictureFrame>

      <div className="flex flex-col gap-[12px] text-white">
        <div className="flex flex-col gap-[6px]">
          <Typography variant="cardTitle" as="h3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
            >
              {project.title}
              <span className="sr-only"> (opens in a new tab)</span>
              {/* Inline, so a wrapped title keeps the icon after its last word. */}
              <Image
                src={externalLink.src}
                alt=""
                width={externalLink.w}
                height={externalLink.h}
                unoptimized
                className="ml-[8px] inline-block align-middle"
              />
            </a>
          </Typography>
          <div className="[&>p]:leading-[1.25]">
            <Typography variant="label">
              {project.members.join(", ")}
            </Typography>
          </div>
        </div>
        <Typography variant="body">{project.description}</Typography>
      </div>
    </div>
  );
}
