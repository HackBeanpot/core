import { gsap } from "../gsap";
import { FLY_IN, flyIn } from "../transitions";
import type { SceneAnimation } from "../types";
import { artboardOf, wallBackdrop } from "./ProjectsScene";

/**
 * Past Projects motion. Hooks are the `data-anim` names on
 * `ProjectsScene`; positions are fractions of a 0..1 timeline.
 *
 * - `enter`: Testimonials' content fades off its purple, the purple fades to
 *   the gallery wall's lavender, then the camera flies left onto the doorway.
 *   The scene's layers travel by depth (parallax): the wall and arches cover
 *   the most ground, the exhibit seen through the doorway the least. The
 *   ceiling strip fades in as the dinosaur comes into view. The title and
 *   card stay hidden.
 * - `build`: after a beat, the title and card fade in together. It plays by
 *   itself (`buildSeconds`) once the fly-in ends.
 */

const EASE = "power1.inOut";

/**
 * How far each layer travels during the fly-in, relative to the wall and
 * arches (1). Every offset is a fraction of the scene's own, so the gaps a
 * deep layer leaves behind it stay off screen.
 */
const DEPTH: Record<string, number> = {
  "projects-ropes": 0.85,
  "projects-fog": 0.75,
  "projects-sparkle": 0.75,
  "projects-dino": 0.75,
  "projects-eye-glow": 0.75,
  "projects-plinth": 0.75,
};

/** When the dinosaur starts to show in the doorway, the ceiling strip fades in. */
const CEILING_FADE = { start: 0.7, duration: 0.2 };

const FOREGROUND = '[data-anim="projects-title"], [data-anim="projects-card"]';
/** The foreground's fade in `build`, in seconds. */
const REVEAL = { delay: 0.4, duration: 0.8 };

export const projectsAnimation: SceneAnimation = {
  id: "projects",
  // Plays in full as soon as the fly-in ends; no extra scrolling.
  buildSeconds: REVEAL.delay + REVEAL.duration,

  enter: (root, tl, ctx) => {
    const q = gsap.utils.selector(root);
    flyIn(tl, ctx.prevRoot, root, {
      fromColor: ctx.fromColor,
      backdrop: wallBackdrop(artboardOf(root)),
      ease: EASE,
    });
    // `flyIn` brings the scene in from one width to the left; each layer
    // starts `depth` widths out instead.
    Object.entries(DEPTH).forEach(([hook, depth]) => {
      tl.fromTo(
        q(`[data-anim="${hook}"]`),
        { x: () => (1 - depth) * root.clientWidth },
        { x: 0, ease: EASE, duration: FLY_IN.pan.duration },
        FLY_IN.pan.start,
      );
    });
    tl.fromTo(
      q('[data-anim="projects-ceiling"]'),
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: "none", duration: CEILING_FADE.duration },
      CEILING_FADE.start,
    );
    tl.set(q(FOREGROUND), { autoAlpha: 0 }, 0);
  },

  build: (root, tl) => {
    const q = gsap.utils.selector(root);
    tl.fromTo(
      q(FOREGROUND),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: REVEAL.duration, ease: "none" },
      REVEAL.delay,
    );
  },
};
