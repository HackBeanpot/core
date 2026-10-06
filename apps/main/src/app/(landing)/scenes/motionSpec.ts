import { SCENE_IDS, type SceneId, type SceneSpec } from "./types";

/**
 * Confirmed motion spec (§3.5), one constant per scene.
 *
 * Source: the 2026-10-05 scroll recordings of the prototype (desktop, tablet
 * and mobile menu). `scrollLength` and `exitColor` are read off those
 * recordings and are STILL TO BE CONFIRMED with Cole and Lucy (ticket step 1).
 * Update the numbers here when the Slack thread settles, and link it in the PR.
 *
 * Mobile (<640px) is static: none of this runs there.
 */

/**
 * Hero.
 * enter: none, it is the first scene.
 * build: sky shifts day to night (sun becomes moon, stars appear), camera
 * pushes into the museum, title and MLH badge appear, spotlights sweep in.
 */
export const HERO: SceneSpec = {
  scrollLength: 500,
  exitColor: "#0b0b22",
  pinned: true,
};

/**
 * About.
 * enter: fades up from the hero's night navy; wavy silhouettes slide in.
 * build: plaque rises into place, then the framed photo; candles flicker on.
 */
export const ABOUT: SceneSpec = {
  scrollLength: 250,
  exitColor: "#14124a",
  pinned: true,
};

/**
 * Values.
 * enter: navy cross-fades through to a flat blue, then the title appears.
 * build: three columns rise with their values; a spotlight sweeps across
 * them left to right, one value highlighted at a time.
 */
export const VALUES: SceneSpec = {
  scrollLength: 250,
  exitColor: "#1f6f96",
  pinned: true,
};

/**
 * Speakers.
 * enter: blue cross-fades through to flat orange; curtain slides in at right.
 * build: arch and portrait rise from the balcony, title, name and bio fade in.
 * OPEN: two-frame question (final layout vs. animation pair). The recording
 * shows a single layout whose portrait and text swap per speaker.
 */
export const SPEAKERS: SceneSpec = {
  scrollLength: 300,
  exitColor: "#c2602c",
  pinned: true,
};

/**
 * Testimonials.
 * enter: orange cross-fades to purple; the hall corridor is pushed through.
 * build: camera travels down the hall, the portrait medallion and quote
 * fade in, ribbons sweep across, stars twinkle.
 */
export const TESTIMONIALS: SceneSpec = {
  scrollLength: 300,
  exitColor: "#3c1a5e",
  pinned: true,
};

/**
 * Projects.
 * enter: purple cross-fades to lavender; the arch with the skeleton rises.
 * build: title, project frame and description fade in beside the arch.
 */
export const PROJECTS: SceneSpec = {
  scrollLength: 250,
  exitColor: "#6f5f9c",
  pinned: true,
};

/**
 * Sponsors.
 * enter: lavender cross-fades to dark navy; gallery wall is dimmed.
 * build: lights come up, the six sponsor frames and the CTA fade in.
 */
export const SPONSORS: SceneSpec = {
  scrollLength: 250,
  exitColor: "#2a2d6a",
  pinned: true,
};

/**
 * Team.
 * enter: navy cross-fades to teal; title appears.
 * build: the two portrait rails slide in; benches rise from the floor.
 */
export const TEAM: SceneSpec = {
  scrollLength: 250,
  exitColor: "#1f5f6f",
  pinned: true,
};

/**
 * FAQ.
 * enter: teal cross-fades to near-black.
 * build: none. Content scrolls normally, so the scene is not pinned.
 */
export const FAQ: SceneSpec = {
  scrollLength: 150,
  exitColor: "#06060f",
  pinned: false,
};

export const MOTION_SPEC: Record<SceneId, SceneSpec> = {
  hero: HERO,
  about: ABOUT,
  values: VALUES,
  speakers: SPEAKERS,
  testimonials: TESTIMONIALS,
  projects: PROJECTS,
  sponsors: SPONSORS,
  team: TEAM,
  faq: FAQ,
};

/** The scene before `id` in page order, or `undefined` for the first one. */
export function previousScene(id: SceneId): SceneId | undefined {
  const i = SCENE_IDS.indexOf(id);
  return i > 0 ? SCENE_IDS[i - 1] : undefined;
}
