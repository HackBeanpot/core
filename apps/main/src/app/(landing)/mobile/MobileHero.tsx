import Image from "next/image";
import React, { type CSSProperties } from "react";
import { site } from "../../lib/content/site";
import { HERO_SM } from "../scenes/hero/manifest";

const { artboard } = HERO_SM;

/** One SM artboard px (402x874 frame), covering the viewport like `object-cover`. */
const sm = (n: number) => `calc(${n} * var(--smu))`;
const box = (r: { x: number; y: number; w: number; h: number }) => ({
  left: sm(r.x),
  top: sm(r.y),
  width: sm(r.w),
  height: sm(r.h),
});

/**
 * SM hero (`5615:22626`), fully static: no GSAP, Lenis or idle motion.
 * The flattened export fills a 100svh section, and the title, tagline,
 * sponsor logos and MLH badge stay live on top. The top-right corner is
 * left clear for the SM header's menu button.
 *
 * The frame scales to cover the viewport (`--smu`), so its contents stay
 * aligned with the art from 320 to 639px.
 */
export function MobileHero() {
  return (
    // No `id="hero"`: the LG/MD SceneFrame owns that anchor and both are in the DOM.
    <section
      aria-labelledby="hero-title-sm"
      className="relative h-[100svh] w-full overflow-hidden bg-[#0B0D21]"
      style={
        {
          "--smu": `max(calc(100vw / ${artboard.w}), calc(100svh / ${artboard.h}))`,
        } as CSSProperties
      }
    >
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ width: sm(artboard.w), height: sm(artboard.h) }}
      >
        <Image
          src={HERO_SM.background}
          alt=""
          fill
          priority
          // Full width on SM; hidden (and smallest) from 640px up.
          sizes="(max-width: 639px) 100vw, 402px"
          className="object-cover"
        />
        <a
          href={site.mlhBadgeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute block"
          style={box(HERO_SM.badge.rect)}
        >
          <Image
            src={HERO_SM.badge.src}
            alt="Major League Hacking 2025 Season official member event"
            fill
            unoptimized
            className="object-cover"
          />
        </a>
        <h1
          id="hero-title-sm"
          className="absolute m-0 whitespace-nowrap font-amarante font-normal text-white"
          style={{
            ...box(HERO_SM.title.rect),
            fontSize: sm(HERO_SM.title.size),
            lineHeight: sm(HERO_SM.title.rect.h),
          }}
        >
          {HERO_SM.title.text}
        </h1>
        <p
          className="absolute m-0 whitespace-nowrap font-gothic text-white"
          style={{
            ...box(HERO_SM.tagline.rect),
            fontSize: sm(HERO_SM.tagline.size),
            lineHeight: sm(HERO_SM.tagline.rect.h),
          }}
        >
          {HERO_SM.tagline.text}
        </p>
        {(
          [
            [HERO_SM.amazonLogo, "amazon"],
            [HERO_SM.mavenLogo, "Maven AGI"],
          ] as const
        ).map(([logo, alt]) => (
          <div key={alt} className="absolute" style={box(logo.rect)}>
            <Image
              src={logo.src}
              alt={alt}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
