# Scenes: how this foundation is used for the animations

This folder (MS-102) is the groundwork every scroll animation on the LG/MD landing page builds on. Nothing on the real landing page animates yet. The pieces here are the contract that the section tickets (S2), the orchestrator (MS-201), and the animation tickets (S3/S4) all plug into.

SM (<640px) is **static**: none of this runs there.

## The pieces

| File                                                 | What it is                                                                                                                | Who uses it later                                                             |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `types.ts`                                           | `SceneId` and the `SceneAnimation` contract (`{ id, enter?, build }`)                                                     | every `<name>.animation.ts`, the orchestrator, the harness                    |
| `motionSpec.ts`                                      | per-scene `scrollLength` (vh), `exitColor`, `pinned`, plus enter/build notes                                              | animation tickets (colors), the orchestrator (scroll ranges)                  |
| `SceneFrame.tsx`                                     | full-viewport scene root: a `background` slot that bleeds to the edges and a centred `content` slot sized to the artboard | every `<Name>Scene.tsx`                                                       |
| `gsap.ts`                                            | GSAP + ScrollTrigger + `useGSAP`, registered once, client-only                                                            | anything that animates; always import gsap from here                          |
| `placeholder/`                                       | a test scene (grid + box) that proves the stack works                                                                     | the harness and the proof of concept; MS-201 copies it for its 9 placeholders |
| `../../lib/scroll/units.ts` + `--u` in `globals.css` | artboard units: `u(163)` means "163 Figma px, scaled to this viewport"                                                    | every scene's layout                                                          |
| `../../lib/scroll/SmoothScroll.tsx`                  | Lenis smooth scroll on the GSAP ticker, plus `useLenis()`                                                                 | the orchestrator, the footer's Back to top, `scrollToScene`                   |
| `../../dev/scenes/`                                  | dev harness (`/dev/scenes`), `sceneMap.ts`, proof of concept (`/dev/scenes/poc`). Returns 404 in production               | every scene and animation ticket, for building and PR screenshots             |

## How a scene goes from static to animated

Each scene is split across two tickets so two people never edit the same file (roadmap §3.4).

### 1. Static ticket (S2): `<name>/<Name>Scene.tsx`

Build the final resting state, with no animation, inside a `SceneFrame`. Size and position everything with `u(n)` so it scales from the Figma artboard (1512×982 on LG, 1000×982 on MD). Put a `data-anim` hook on every layer that will move later:

```tsx
// Illustrative: positions come from Figma Dev Mode for the real scene.
export function AboutScene() {
  return (
    <SceneFrame
      sceneId="about"
      background={
        <div data-anim="about-bg" className="h-full w-full bg-[#15173b]" />
      }
      content={
        <>
          <div
            data-anim="about-plaque"
            style={{ left: u(144), top: u(189), width: u(348) }}
            className="absolute"
          >
            …
          </div>
          <div
            data-anim="about-frame"
            style={{ left: u(532), top: u(150), width: u(438) }}
            className="absolute"
          >
            …
          </div>
        </>
      }
    />
  );
}
```

`SceneFrame` gives the section `id="about"`, so header links and deep links (`/#about`) work. Add the scene to `dev/scenes/sceneMap.ts` (one line) and check it in the harness at 1512 and 1000.

### 2. Animation ticket (S3/S4): `<name>/<name>.animation.ts`

Export a `SceneAnimation`. You get the scene root and a **paused timeline that you don't own**: add tweens to it and return nothing.

```ts
import { MOTION_SPEC } from "../motionSpec";
import type { SceneAnimation } from "../types";

export const aboutAnimation: SceneAnimation = {
  id: "about",
  // Transition in, starting from the previous scene's exitColor
  // (MOTION_SPEC.hero.exitColor), which is already behind this scene.
  enter: (root, tl) => {
    tl.from(root.querySelector('[data-anim="about-bg"]'), {
      autoAlpha: 0,
      duration: 1,
    });
  },
  // In-scene animation, scrubbed while the scene is pinned.
  build: (root, tl) => {
    tl.from(root.querySelector('[data-anim="about-plaque"]'), {
      y: -200,
      rotate: -8,
      duration: 0.5,
    }).from(
      root.querySelector('[data-anim="about-frame"]'),
      { xPercent: 120, duration: 0.5 },
      0.3,
    );
  },
};
```

Rules (also in the JSDoc on `SceneAnimation`):

- **Select only by `data-anim`**, never by class or tag.
- **Animate only `transform` and `opacity`** (`x`, `y`, `scale`, `rotate`, `autoAlpha`). Anything else drops frames while scrubbing.
- **Treat the timeline as length 1.** Position tweens as fractions of 1 and use `ease: "none"` for anything tied to scroll. The orchestrator stretches the timeline over `scrollLength`, so you never deal in pixels or vh.
- **Don't create timelines or ScrollTriggers, and don't call `play()`.** The caller owns them.
- **Read colors and lengths from `motionSpec.ts`.** Don't hard-code them.
- **Import gsap from `scenes/gsap.ts`**, so ScrollTrigger is always registered.

Then wire `animation: aboutAnimation` into the scene's `sceneMap.ts` entry (and into `registry.ts` once MS-201 adds it).

### 3. Checking it in the harness

Run `yarn dev` and open:

| URL                                            | Shows                                                                                         |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `/dev/scenes?scene=about&progress=0.5`         | `build` paused at 50%. Drag the slider to scrub.                                              |
| `/dev/scenes?scene=about&enter=1&progress=0.3` | `enter` paused at 30%, over the previous scene's `exitColor`                                  |
| `&w=1000`                                      | the MD artboard (1000 wide), even on a wide screen                                            |
| `/dev/scenes/poc`                              | the placeholder pinned with ScrollTrigger on Lenis. A sanity check that real scrolling works. |

The harness calls your functions exactly the way the orchestrator will: it creates `gsap.timeline({ paused: true })`, passes it to `enter` or `build`, and seeks it with `tl.progress(n)`. If it looks right at every progress value here, it will look right when scrolled.

## What the orchestrator (MS-201) adds on top

MS-201 doesn't change anything in this folder; it consumes it.

- **`registry.ts`:** an ordered list of `{ id, Component, animation }`. Static tickets add the component and animation tickets add `animation`, one line each.
- **`ScrollStage.tsx`:**
  - Stacks every scene in one fixed stage, with one master ScrollTrigger over a tall spacer.
  - Gives each scene a scroll range from `MOTION_SPEC[id].scrollLength`, then calls that scene's `enter` and `build` on slices of the master timeline. That's why scenes only add tweens and never make their own.
  - Overlaps each `enter` with the tail of the previous scene.
  - FAQ is `pinned: false`, so normal page scrolling takes over after it.
- **`transitions.ts`:** shared `enter` helpers (`fogWipe`, `crossfade`, `zoomThrough`, `curtain`, `pan`) that an `enter` can call instead of writing its own.
- **Smooth scroll:** wraps the page in `SmoothScroll`. `useLenis()` then backs `scrollToScene()`, deep links, and the footer's Back to top (which currently uses `window.scrollTo`).
- **Active scene:** `useActiveScene()` drives the header's `activeSection` and `visible` (wired in MS-301).

## Things to know

- **Artboard units.** `--u` is one Figma pixel: `min(viewport width / artboard width, viewport height / artboard height)`. The artboard therefore always fits inside the viewport, with backgrounds bleeding to the edges. `--u` is redeclared on every `[data-scene]` root, so overriding `--ab-w` or `--vw` on an ancestor (as the harness does for `&w=1000`) rescales the scene. Below 640px nothing uses it.
- **Lenis vs. native scroll.** Lenis only runs at ≥640px and without `prefers-reduced-motion`. Otherwise `useLenis()` returns `null`, so anything that scrolls must fall back to `window.scrollTo`. The global `scroll-behavior: smooth` from `packages/ui` is turned off while Lenis is active, because the two fight each other.
- **Reduced motion (MS-503)** will skip pinning and scrubbing, and render scenes in their final state. That's another reason the static scene has to look finished on its own.
- **The motion spec isn't confirmed yet.** The values in `motionSpec.ts` (scroll lengths, exit colors, the Speakers two-frame question) still need sign-off from Cole and Lucy. Because everything reads from that one file, changing a number there updates every scene.
