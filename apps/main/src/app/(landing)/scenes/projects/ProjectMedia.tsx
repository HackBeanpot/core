"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import type { ProjectMedia } from "../../../lib/content/types";

/*
 * A project's media (image, video or embed) for the opening of a frame.
 * Shared by the LG/MD `ProjectsScene` and SM `MobileProjects`.
 */

/** Pauses under reduced motion and shows controls instead. */
function ProjectVideo({
  media,
  autoplay,
}: {
  media: Extract<ProjectMedia, { type: "video" }>;
  autoplay: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [controls, setControls] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (
      !autoplay ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setControls(true);
      return;
    }
    // Rejects when the browser blocks autoplay; the poster stays up.
    video.play().catch(() => setControls(true));
  }, [autoplay]);

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
export function ProjectMediaView({
  media,
  sizes = "(max-width: 1279px) 400px, 600px",
  autoplay = true,
}: {
  media: ProjectMedia;
  /** `next/image` sizes for image media. */
  sizes?: string;
  /** Videos only. `false` (SM) shows the controls instead of playing. */
  autoplay?: boolean;
}) {
  switch (media.type) {
    case "image":
      return (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          className="object-contain"
        />
      );
    case "video":
      return <ProjectVideo media={media} autoplay={autoplay} />;
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
