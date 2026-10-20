import { gsap } from "../gsap";
import type { SceneAnimation } from "../types";

/**
 * true only if motionSpec.ts SPEAKERS settles the open question as
 * frames B → A (title starts centered, then moves into the column).
 */
const TITLE_FROM_CENTER = false;

const q = (root: HTMLElement, name: string) =>
  Array.from(root.querySelectorAll<HTMLElement>(`[data-anim="${name}"]`));

/** px per artboard unit, so offsets scale like u(n). */
const unit = (root: HTMLElement) =>
  parseFloat(getComputedStyle(root).getPropertyValue("--u")) || 1;

/** Element box relative to root, with any GSAP x/y taken back out. */
function restingBox(el: HTMLElement, root: HTMLElement) {
  const r = el.getBoundingClientRect();
  const R = root.getBoundingClientRect();
  return {
    left: r.left - R.left - (Number(gsap.getProperty(el, "x")) || 0),
    top: r.top - R.top - (Number(gsap.getProperty(el, "y")) || 0),
    width: r.width,
    height: r.height,
  };
}

export const speakersAnimation: SceneAnimation = {
  id: "speakers",
  // Plays in full as soon as the curtain settles; no extra scrolling.
  buildSeconds: 1.2,

  enter: (root, tl) => {
    const stage = q(root, "speakers-stage");
    const curtain = q(root, "speakers-curtain");
    if (curtain.length === 0 || stage.length === 0) return;

    // Values' blue cross-fades to the orange stage.
    tl.fromTo(
      stage,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: "none", duration: 0.6 },
      0,
    )
      // Curtain slides in from the right while fading up, then settles at rest.
      .fromTo(
        curtain,
        { xPercent: 40, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, ease: "none", duration: 1 },
        0,
      );
  },

  build: (root, tl) => {
    const arch = q(root, "speakers-arch");
    const rails = q(root, "speakers-balustrade"); // both railings
    const [title] = q(root, "speakers-title");
    const text = q(root, "speakers-text"); // name, role, bio, arrows (DOM order)
    const lift = () => 24 * unit(root);

    tl.from(
      arch,
      {
        yPercent: 40,
        scale: 0.9,
        autoAlpha: 0,
        ease: "none",
        duration: 0.35,
      },
      0,
    ).from(rails, { yPercent: 100, ease: "none", duration: 0.3 }, 0.1);

    if (title) {
      if (TITLE_FROM_CENTER) {
        const box = () => restingBox(title, root);
        tl.fromTo(
          title,
          {
            x: () => root.clientWidth / 2 - (box().left + box().width / 2),
            y: () => root.clientHeight / 2 - (box().top + box().height / 2),
            autoAlpha: 0,
          },
          { autoAlpha: 1, ease: "none", duration: 0.1 },
          0.3,
        ).to(title, { x: 0, y: 0, ease: "none", duration: 0.2 }, 0.4);
      } else {
        tl.from(
          title,
          { autoAlpha: 0, y: lift, ease: "none", duration: 0.15 },
          0.4,
        );
      }
    }

    // stagger.amount keeps the run ending at 1 however many items there are.
    tl.from(
      text,
      {
        autoAlpha: 0,
        y: lift,
        ease: "none",
        duration: 0.1,
        stagger: { amount: 0.3 },
      },
      0.6,
    );
  },
};
