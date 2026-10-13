"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { site } from "../../../lib/content/site";
import { useGSAP } from "../gsap";
import { MOTION_SPEC } from "../motionSpec";
import { SceneFrame } from "../SceneFrame";
import { NIGHT_BRIGHTNESS, playHeroIntro } from "./hero.animation";
import "./hero.css";

const A = "/hero/scene";

/**
 * A scene layer image. Sizes are design px; `hero.css` positions and sizes it.
 *
 * `dark` adds a twin pre-darkened to the night brightness, which the intro
 * fades in. That's the same image as tweening `filter: brightness()` (a
 * linear multiply), but it animates opacity instead of repainting a filter
 * on every frame, which cost ~40% of frames during the intro.
 */
function Layer({
  className,
  src,
  w,
  h,
  priority = false,
  dark,
}: {
  className: string;
  src: string;
  w: number;
  h: number;
  priority?: boolean;
  dark?: number;
}) {
  const png = src.endsWith(".png");
  const img = (extra = "", style?: React.CSSProperties) => (
    <Image
      className={`layer ${className}${extra}`}
      style={style}
      src={`${A}/${src}`}
      alt=""
      width={Math.round(w)}
      height={Math.round(h)}
      priority={priority}
      // Vectors go out as-is; the museum PNGs get resized and re-encoded.
      unoptimized={!png}
      sizes={png ? "100vw" : undefined}
    />
  );
  return dark === undefined ? (
    img()
  ) : (
    <>
      {img()}
      {img(" layer-dark", { filter: `brightness(${dark})` })}
    </>
  );
}

/**
 * The hero (MS-202), ported from the design prototype linked from the
 * Figma file (`[RECORDING] Hero`, plabbur.github.io/hbp-mainsite-prototype).
 *
 * Two planes inside a cover-fit 1512x982 scene (`hero.css`):
 * - `scene-bg`, fixed: sky, stars, sun, moon + MLH badge, skyline.
 * - `scene-fg`, the camera: hills, museum, bushes, stairs, lights, title.
 *   `scene-fg-intro` carries the load-in push, `hero-fg-scroll` the
 *   scrubbed push through the door (`hero.animation.ts`).
 *
 * The day-to-night intro plays by itself on load; scrolling only moves the
 * camera. SM uses `mobile/MobileHero.tsx` instead.
 */
export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      // The dev harness drives the intro itself (`HERO_PREVIEW`).
      if (!root || root.closest("[data-harness]")) return;
      return playHeroIntro(root);
    },
    { scope: ref },
  );

  return (
    <SceneFrame
      sceneId="hero"
      background={
        <div ref={ref} className="hero-viewport" data-anim="hero-viewport">
          <h1 className="sr-only">HackBeanpot 2027</h1>
          <div className="hero-fit">
            <div className="scene-camera">
              <div className="scene-group" data-anim="hero-bg">
                <div className="sky" data-anim="hero-sky" />
                <Layer
                  className="star-field star-field--far"
                  src="starfield-far.svg"
                  w={2200}
                  h={1600}
                />
                <Layer
                  className="star-field star-field--near"
                  src="starfield-near.svg"
                  w={2200}
                  h={1600}
                />
                <div className="shooting-stars" data-anim="hero-shooting">
                  <div className="shooting-star" />
                  <div className="shooting-star" />
                  <div className="shooting-star" />
                </div>
                <Layer className="sun" src="sun.svg" w={79} h={79} priority />
                <Layer className="moon" src="moon-logo.svg" w={119} h={119} />
                <div className="moon-rig">
                  <div className="mlh-banner-mask">
                    <a
                      className="mlh-banner"
                      data-anim="hero-banner"
                      href={site.mlhBadgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="mlh-banner__strap" />
                      <Image
                        className="mlh-banner__badge"
                        src="/hero/lg/mlhBadge.webp"
                        alt="Major League Hacking 2025 Season official member event"
                        width={81.47}
                        height={143.48}
                        unoptimized
                      />
                    </a>
                  </div>
                </div>
                <div className="sky-shade" data-anim="hero-skyShade" />
                <Layer
                  className="skyline skyline--day"
                  src="skyline-day.svg"
                  w={2328.76}
                  h={585.51}
                  priority
                />
                <Layer
                  className="skyline skyline--twilight"
                  src="skyline-twilight.svg"
                  w={2328.76}
                  h={585.51}
                />
                <Layer
                  className="skyline skyline--night"
                  src="skyline-night.svg"
                  w={2328.76}
                  h={585.51}
                />
              </div>

              <div className="scene-group scene-fg-intro" data-anim="hero-fg">
                <div className="scene-group" data-anim="hero-fg-scroll">
                  {/* Clips the front plane to what can ever be on screen (see .fg-clip). */}
                  <div className="fg-clip" data-anim="hero-fg-clip">
                    <div className="fg-clip__content">
                      <div className="grass-fill" />
                      <Layer
                        className="grass-hills"
                        src="grass-hills.svg"
                        w={5118.4}
                        h={1265.55}
                        priority
                        dark={NIGHT_BRIGHTNESS.grass}
                      />
                      <div className="museum-shadow" />
                      <Layer
                        className="museum museum--day"
                        src="museum-day-alpha.png"
                        w={1433}
                        h={500.452}
                        priority
                      />
                      <Layer
                        className="museum museum--night"
                        src="museum-night-alpha.png"
                        w={1433}
                        h={500.452}
                      />
                      <Layer
                        className="bushes bushes--four"
                        src="bushes-4.svg"
                        w={1432}
                        h={172}
                        priority
                        dark={NIGHT_BRIGHTNESS.bushes}
                      />
                      <Layer
                        className="bushes bushes--three"
                        src="bushes-3.svg"
                        w={500.909}
                        h={74.93}
                        priority
                        dark={NIGHT_BRIGHTNESS.bushes}
                      />
                      <Layer
                        className="staircase staircase--upper"
                        src="staircase-upper.svg"
                        w={459.742}
                        h={190.74}
                        priority
                        dark={NIGHT_BRIGHTNESS.stones}
                      />
                      <Layer
                        className="light-off light-off--left"
                        src="light-left-off.svg"
                        w={80.54}
                        h={94.634}
                      />
                      <Layer
                        className="light-off light-off--right"
                        src="light-right-off.svg"
                        w={80.54}
                        h={94.634}
                      />
                      <Layer
                        className="spotlight spotlight--left"
                        src="spotlight-left.svg"
                        w={602.396}
                        h={648.589}
                      />
                      <Layer
                        className="spotlight spotlight--right"
                        src="spotlight-right.svg"
                        w={602.396}
                        h={648.589}
                      />
                      <Layer
                        className="bushes bushes--two"
                        src="bushes-2.svg"
                        w={1063.825}
                        h={191.692}
                        priority
                        dark={NIGHT_BRIGHTNESS.bushes}
                      />
                      <Layer
                        className="bushes bushes--one"
                        src="bushes-1.svg"
                        w={1915}
                        h={295.587}
                        priority
                        dark={NIGHT_BRIGHTNESS.bushes}
                      />
                      <Layer
                        className="staircase staircase--main"
                        src="staircase-main.svg"
                        w={1098.152}
                        h={455.608}
                        priority
                        dark={NIGHT_BRIGHTNESS.stones}
                      />
                      <Layer
                        className="staircase staircase--front"
                        src="staircase-main.svg"
                        w={2623.05}
                        h={1088.27}
                        priority
                        dark={NIGHT_BRIGHTNESS.stones}
                      />
                      <div className="hud-intro" data-anim="hero-hud">
                        {/* The h1 above carries the name for screen readers. */}
                        <p className="layer event-title" aria-hidden>
                          HACKBEANPOT
                        </p>
                        <p className="layer sponsor-lockup lockup">
                          <span className="lockup__text">
                            Brought to you by
                          </span>
                          <span className="lockup__logos">
                            <Image
                              className="lockup__amazon"
                              src="/hero/lg/amazon.webp"
                              alt="Amazon"
                              width={55}
                              height={17}
                              unoptimized
                              style={{ width: "auto" }}
                            />
                            <Image
                              className="lockup__maven"
                              src="/hero/lg/maven.webp"
                              alt="Maven AGI"
                              width={74}
                              height={12}
                              unoptimized
                              style={{ width: "auto" }}
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* The door dive's solid end color, the handoff to About. */}
          <div
            data-anim="hero-exit"
            aria-hidden
            className="pointer-events-none invisible absolute inset-0 opacity-0"
            style={{ background: MOTION_SPEC.hero.exitColor }}
          />
        </div>
      }
    />
  );
}
