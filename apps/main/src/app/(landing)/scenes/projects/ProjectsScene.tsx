"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import { projectsAssets } from "../../../../../public/projects/positions";
import { projects, projectsSection } from "../../../lib/content";
import type { Project, ProjectMedia } from "../../../lib/content/types";
import {
  CarouselArrow,
  CarouselRegion,
  CarouselSwap,
  useCarousel,
  useSwipe,
} from "../../../lib/Components/museum";
import PictureFrame from "../../../lib/Components/museum/PictureFrame";
import { Typography } from "../../../lib/Components/museum/Typography";
import { u } from "../../../lib/scroll/units";
import { SceneFrame } from "../SceneFrame";

type Artboard = "lg" | "md";
type Box = { x: number; y: number; w: number; h: number };

/** Positions in artboard px. */
const LAYOUT = {
  lg: {
    title: { x: 79, y: 142 },
    /** Frame, text and arrows. */
    card: { x: 853, y: 238, w: 508.27 },
    /** Title row, members and description. */
    textHeight: 248,
    /** Arrows, from the artboard bottom. */
    arrowsBottom: 98.16,
    /** The art in `wall.svg`. */
    wallBandBottom: 333,
    wallPanel: { x: 687, y: 120, w: 1045, h: 865 },
    /** Doorway lighting. */
    lightWarm: { x: -208.97, y: 309.39, w: 1016.94, h: 683.32 },
    lightCool: { x: -203.38, y: 244.35, w: 1016.94, h: 837.89 },
  },
  md: {
    title: { x: 80, y: 154 },
    card: { x: 567, y: 239, w: 356 },
    textHeight: 343,
    arrowsBottom: 87.79,
    wallBandBottom: 333,
    wallPanel: { x: 474.65, y: 120, w: 1045, h: 865 },
    lightWarm: { x: -421.33, y: 309.39, w: 1016.94, h: 683.32 },
    lightCool: { x: -415.74, y: 244.35, w: 1016.94, h: 837.89 },
  },
} as const;

const ART_BOARD_WIDTH: Record<Artboard, number> = { lg: 1512, md: 1000 };
const ART_BOARD_HEIGHT = 982;
const CARD_GAP = 32;
const ARROW = { size: 48, gap: 9 };
const CEILING_BOTTOM = 113;

/**
 * LG or MD, read from `--ab-w` so the dev harness's forced width (`&w=1000`) picks
 * MD even on a wide screen, which a media query wouldn't.
 */
const useArtboard = (ref: React.RefObject<HTMLElement | null>): Artboard => {
  const [artboard, setArtboard] = useState<Artboard>("lg");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const abW = Number(getComputedStyle(el).getPropertyValue("--ab-w"));
      setArtboard(abW === ART_BOARD_WIDTH.md ? "md" : "lg");
    };
    read();
    // The artboard box resizes whenever --u or --ab-w changes.
    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return artboard;
};

// The exhibit art is clipped at the artboard's left edge, so it hangs off the
// viewport's left and bottom edges instead of the artboard's; on a screen wider
// or taller than the artboard's ratio it would otherwise float mid-wall.
const anchored = ({ x, y, w, h }: Box): CSSProperties => ({
  left: u(x),
  bottom: u(ART_BOARD_HEIGHT - y - h),
  width: u(w),
  height: u(h),
});

function Layer({
  asset,
  anim,
  className = "",
}: {
  asset: Box & { src: string };
  anim?: string;
  className?: string;
}) {
  return (
    <div
      data-anim={anim}
      className={`absolute ${className}`}
      style={anchored(asset)}
    >
      <Image src={asset.src} alt="" fill unoptimized />
    </div>
  );
}

/** Gallery wall, ceiling and the dino exhibit, bottom to top. */
function ProjectsBackground({ artboard }: { artboard: Artboard }) {
  const layout = LAYOUT[artboard];
  const assets = projectsAssets[artboard];
  const panel = layout.wallPanel;

  return (
    <div className="relative h-full w-full">
      {/* The warm doorway light is linear burn at 50%, which CSS lacks
          outside Safari (plus-darker). Linear burn is plus-lighter on inverted
          colors, so the exhibit is drawn inverted, the light is added in its
          inverted colors (#ca6330 → #5f2666), and the outer invert undoes it. */}
      <div className="absolute inset-0 invert">
        <div
          className="absolute inset-0 invert"
          // The design's gradient runs from 4px above the artboard to 872px
          // below it, so the doorway stays near black. Stops are measured from
          // the bottom, where the exhibit is anchored.
          style={{
            background: `linear-gradient(179deg, #060825 calc(100% - ${u(986.3)}), #602a80 calc(100% + ${u(872)}))`,
          }}
        >
          <Layer asset={assets.doorwayPlinth} />
          <Layer asset={assets.dinosaur} anim="projects-dino" />
          <Layer asset={assets.ropeStanchions} anim="projects-ropes" />
        </div>
        <div
          className="absolute opacity-50 mix-blend-plus-lighter"
          style={{
            ...anchored(layout.lightWarm),
            background: "linear-gradient(180deg, #359ccf, #a0d999)",
          }}
        />
      </div>
      {/* The design fades the color toward the transparent stop's blue; CSS
          interpolates premultiplied and would stay cream, so the midpoints
          are spelled out. */}
      <div
        className="absolute mix-blend-hard-light"
        style={{
          ...anchored(layout.lightCool),
          background:
            "linear-gradient(180deg, rgb(253 235 204), rgb(214 207 198 / 0.75), rgb(176 179 191 / 0.5), rgb(138 151 185 / 0.25), rgb(99 123 178 / 0))",
        }}
      />
      <Layer asset={assets.doorwayFog} anim="projects-fog" />
      {/* Its own file: blending inside the fog SVG only reaches the SVG's
          own transparent backdrop, so the glow drew at full strength. */}
      <Layer asset={assets.eyeGlow} className="mix-blend-overlay" />

      {/* `wall.svg` has no viewBox, so it can't scale; it's two rects that
          also need to reach the viewport edges. */}
      <div
        className="absolute inset-x-0 top-0 bg-[#73678d]"
        style={{ bottom: u(ART_BOARD_HEIGHT - layout.wallBandBottom) }}
      />
      <div
        className="absolute"
        style={{
          ...anchored(panel),
          width: `max(${u(panel.w)}, calc(100% - ${u(panel.x)}))`,
          background: "linear-gradient(195deg, #73678d 52.3%, #352f5a 99.7%)",
        }}
      />

      <div data-anim="projects-arches">
        <Layer asset={assets.archLeft} />
        <Layer asset={assets.archRight} />
      </div>
      {/* The strip's art blends with plus-darker, which browsers ignore inside
          an image, so it would lighten the wall. Over this wall, difference
          with the inverted art computes the same thing. */}
      <div
        className="absolute inset-x-0 top-0 bg-repeat-x mix-blend-difference invert"
        style={{
          height: u(assets.ceilingStrip.h),
          backgroundImage: `url("${assets.ceilingStrip.src}")`,
          backgroundSize: `${u(assets.ceilingStrip.w)} 100%`,
        }}
      />
      {/* The art's drop shadow, which the inversion above would turn light.
          Plus-darker subtracts its 4.5% (25% × the strip's 18%) from each
          channel; over this wall, that's black at about 10%. */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: u(CEILING_BOTTOM),
          boxShadow: `0 ${u(2.055)} ${u(2.055)} rgb(0 0 0 / 0.1)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-color-burn"
        style={{ background: "linear-gradient(180deg, #ffe5b2, #32127c)" }}
      />
    </div>
  );
}

/** Pauses under reduced motion and shows controls instead. */
function ProjectVideo({
  media,
}: {
  media: Extract<ProjectMedia, { type: "video" }>;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [controls, setControls] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setControls(true);
      return;
    }
    // Rejects when the browser blocks autoplay; the poster stays up.
    video.play().catch(() => setControls(true));
  }, []);

  return (
    <video
      ref={ref}
      src={media.src}
      poster={media.poster}
      aria-label={media.alt}
      muted
      loop
      playsInline
      controls={controls}
      className="h-full w-full object-cover"
    />
  );
}

/**
 * Fills the frame's opening. Only the current slide stays mounted (the
 * outgoing one unmounts after the swap), so off-screen videos aren't playing.
 */
function ProjectMediaView({ media }: { media: ProjectMedia }) {
  switch (media.type) {
    case "image":
      return (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(max-width: 1279px) 400px, 600px"
          className="object-contain"
        />
      );
    case "video":
      return <ProjectVideo media={media} />;
    case "embed":
      return (
        <iframe
          src={media.url}
          title={media.title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      );
  }
}

function ProjectSlide({
  project,
  artboard,
}: {
  project: Project;
  artboard: Artboard;
}) {
  const layout = LAYOUT[artboard];
  const { externalLink } = projectsAssets[artboard];

  return (
    <div className="flex flex-col" style={{ gap: u(CARD_GAP) }}>
      <PictureFrame
        variant="copper"
        width={u(layout.card.w)}
        // Logos sit on white; video and embeds on black while they load.
        innerClassName={
          project.media.type === "image" ? "bg-museum-ivory-light" : "bg-black"
        }
      >
        <ProjectMediaView media={project.media} />
      </PictureFrame>
      {/* Fixed height, so no amount of text reaches the pinned arrows. */}
      <div
        className="flex flex-col overflow-hidden text-white"
        style={{ height: u(layout.textHeight), gap: u(10) }}
      >
        <div className="flex flex-col" style={{ gap: u(4) }}>
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
                className="inline-block align-middle"
                style={{
                  width: u(externalLink.w),
                  height: u(externalLink.h),
                  marginLeft: u(8),
                }}
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

function ProjectsContent({
  artboardRef,
  artboard,
}: {
  artboardRef: React.RefObject<HTMLDivElement>;
  artboard: Artboard;
}) {
  const layout = LAYOUT[artboard];
  const swipeRef = useRef<HTMLDivElement>(null);
  const { index, item, next, prev, canPrev, canNext, direction } =
    useCarousel(projects);
  useSwipe(swipeRef, { onLeft: next, onRight: prev });

  return (
    <div ref={artboardRef} className="absolute inset-0">
      <div
        data-anim="projects-title"
        className="absolute text-museum-ivory-light"
        style={{ left: u(layout.title.x), top: u(layout.title.y) }}
      >
        <Typography variant="sectionTitle" as="h2">
          {projectsSection.title}
        </Typography>
      </div>

      {item && (
        <div
          data-anim="projects-card"
          className="absolute"
          style={{
            left: u(layout.card.x),
            top: u(layout.card.y),
            bottom: u(layout.arrowsBottom),
            width: u(layout.card.w),
          }}
        >
          {/* The arrows sit on the card's bottom edge, which is pinned, so
              they don't move from slide to slide. */}
          <CarouselRegion
            label="Past projects"
            onPrev={prev}
            onNext={next}
            className="flex h-full flex-col justify-between"
          >
            <div ref={swipeRef}>
              <CarouselSwap swapKey={index} direction={direction}>
                <ProjectSlide project={item} artboard={artboard} />
              </CarouselSwap>
            </div>
            <div className="flex" style={{ gap: u(ARROW.gap) }}>
              {(["left", "right"] as const).map((side) => (
                <div
                  key={side}
                  style={{ width: u(ARROW.size), height: u(ARROW.size) }}
                >
                  <CarouselArrow
                    direction={side}
                    aria-label={
                      side === "left" ? "Previous project" : "Next project"
                    }
                    disabled={side === "left" ? !canPrev : !canNext}
                    onClick={side === "left" ? prev : next}
                    // The primitive is a fixed 48px; scale it with the artboard.
                    className="!h-full !w-full [&>svg]:!h-[66%] [&>svg]:!w-[66%]"
                  />
                </div>
              ))}
            </div>
          </CarouselRegion>
        </div>
      )}
    </div>
  );
}

/**
 * Past Projects, final resting state.
 *
 * Hooks: `projects-title`, `projects-card`, `projects-arches`, `projects-dino`,
 * `projects-ropes`, `projects-fog`.
 */
export function ProjectsScene() {
  const artboardRef = useRef<HTMLDivElement>(null);
  const artboard = useArtboard(artboardRef);

  return (
    <SceneFrame
      sceneId="projects"
      background={<ProjectsBackground artboard={artboard} />}
      content={
        <ProjectsContent artboardRef={artboardRef} artboard={artboard} />
      }
    />
  );
}
