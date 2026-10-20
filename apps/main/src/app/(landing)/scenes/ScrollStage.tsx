"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SmoothScroll, useLenis } from "../../lib/scroll/SmoothScroll";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import { MOTION_SPEC } from "./motionSpec";
import { SCENES, type SceneEntry } from "./registry";
import { SceneSlot } from "./SceneSlot";
import type { SceneId } from "./types";

/** Share of a scene's `scrollLength` spent on its `enter`. */
const ENTER_FRACTION = 0.3;
/** Share of a scene's `scrollLength` it rests in its final state at the end. */
const HOLD_FRACTION = 0.15;
/** The unpinned last scene (FAQ) enters over one viewport as it scrolls up. */
const UNPINNED_ENTER = 100;
const RESIZE_DEBOUNCE_MS = 200;
/**
 * Hold, in vh, of a scene whose build plays by itself. It has no build range,
 * so this is all the scroll between arriving and the next scene's enter
 * (which starts halfway through it). It needs to soak up the momentum of the
 * flick that brought the user in, or they slide straight into the next scene.
 */
const PLAYED_BUILD_HOLD = 120;
/** Ease of a `buildSeconds` build as it plays (and plays back). */
const PLAYED_BUILD_EASE = "power1.out";

/** Where one scene sits on the master timeline. All values are in vh. */
interface SceneRange {
  id: SceneId;
  pinned: boolean;
  start: number;
  enterEnd: number;
  /** Where `build` finishes. Equals `enterEnd` when the build plays by itself. */
  buildEnd: number;
  /** `build` plays by itself once scroll passes `enterEnd` (`buildSeconds`). */
  playsBuild: boolean;
  /** Resting point: build finished, nothing else on screen. `scrollToScene` lands here. */
  restAt: number;
  /** `useActiveScene()` switches to this scene halfway through its enter. */
  activeFrom: number;
  /** Hidden once the next scene's enter has covered it (pinned scenes only). */
  hideAt?: number;
}

/**
 * Lays scenes out back to back. Each pinned scene's range is
 * `enter | build | hold`, and the next scene's enter starts halfway through
 * that hold, so it overlaps the tail but never the resting point. The first
 * scene has no enter and rests at the very top. Unpinned scenes follow the
 * stage in normal flow and enter as they scroll into view. A scene whose
 * build plays by itself (`buildSeconds`) skips the build range:
 * `enter | hold`.
 */
function layoutScenes(scenes: SceneEntry[]) {
  const ranges: SceneRange[] = [];
  let cursor = 0;
  let pinnedEnd = 0;
  let seenUnpinned = false;

  scenes.forEach(({ id, animation }, i) => {
    const spec = MOTION_SPEC[id];
    if (!spec.pinned) {
      seenUnpinned = true;
      const start = pinnedEnd;
      ranges.push({
        id,
        pinned: false,
        start,
        enterEnd: start + UNPINNED_ENTER,
        buildEnd: start + UNPINNED_ENTER,
        playsBuild: false,
        restAt: start + UNPINNED_ENTER,
        activeFrom: start + UNPINNED_ENTER / 2,
      });
      return;
    }
    if (seenUnpinned) {
      throw new Error(
        `ScrollStage: pinned scene "${id}" after an unpinned one`,
      );
    }
    const length = spec.scrollLength;
    const enter = i === 0 ? 0 : length * ENTER_FRACTION;
    const playsBuild = i > 0 && !!animation?.buildSeconds;
    const hold = playsBuild ? PLAYED_BUILD_HOLD : length * HOLD_FRACTION;
    const span = playsBuild ? enter + hold : length;
    const start = cursor;
    const prev = ranges[i - 1];
    if (prev) prev.hideAt = start + enter;
    ranges.push({
      id,
      pinned: true,
      start,
      enterEnd: start + enter,
      buildEnd: start + span - hold,
      playsBuild,
      // The first scene rests at the very top (its build plays as you scroll).
      restAt: i === 0 ? 0 : start + span - hold,
      activeFrom: start + enter / 2,
    });
    pinnedEnd = start + span;
    cursor = pinnedEnd - hold / 2;
  });

  const last = ranges[ranges.length - 1];
  const total = last && !last.pinned ? last.restAt : pinnedEnd;
  return { ranges, pinnedEnd, total };
}

export interface ScrollToSceneOptions {
  /** Jump without smooth scrolling (deep links on load). Default `false`. */
  immediate?: boolean;
}

interface StageContextValue {
  activeScene: SceneId;
  scrollToScene: (id: SceneId, opts?: ScrollToSceneOptions) => void;
}

const StageContext = createContext<StageContextValue | null>(null);

/** The scene currently on screen. Outside a `ScrollStage` it's `"hero"`. */
export function useActiveScene(): SceneId {
  return useContext(StageContext)?.activeScene ?? "hero";
}

/**
 * `scrollToScene(id, { immediate })` scrolls to a scene's resting point (its
 * final state) through Lenis. Outside a `ScrollStage`, or below 640px, it
 * scrolls the scene's element into view instead.
 */
export function useScrollToScene(): StageContextValue["scrollToScene"] {
  return useContext(StageContext)?.scrollToScene ?? fallbackScrollToScene;
}

function fallbackScrollToScene(id: SceneId, opts: ScrollToSceneOptions = {}) {
  const behavior = opts.immediate ? "instant" : "smooth";
  // The hero's element is hidden on SM (MobileHero has no id); it's the top.
  if (id === "hero") window.scrollTo({ top: 0, behavior });
  else document.getElementById(id)?.scrollIntoView({ behavior });
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const sync = () => setMatches(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [query]);
  return matches;
}

/** Bumps whenever the viewport width settles on a new value. Height-only resizes (tablet toolbars) are ignored. */
function useWidthKey() {
  const [key, setKey] = useState(0);
  useEffect(() => {
    let width = window.innerWidth;
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.innerWidth === width) return;
        width = window.innerWidth;
        setKey((k) => k + 1);
      }, RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return key;
}

/** Reads `#id` from an in-page link (`#about` or `/#about`), if it names a scene. */
function sceneFromHash(hash: string, ranges: SceneRange[]) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return ranges.find((r) => r.id === id)?.id;
}

/**
 * The LG/MD landing page: every scene in `registry.ts`, played by one master
 * ScrollTrigger over a tall spacer.
 *
 * - Pinned scenes are stacked in a sticky 100svh stage. Each one gets a range
 *   on the master timeline from `MOTION_SPEC[id].scrollLength` and plays
 *   `enter` (overlapping the previous scene's tail), then `build`. Scenes
 *   outside their range are `visibility: hidden`. A `buildSeconds` build
 *   isn't scrubbed: it plays in full as soon as the enter finishes.
 * - The unpinned last scene (FAQ) sits after the stage in normal flow. Its
 *   enter plays as it scrolls up, then the page scrolls normally.
 * - In-page links to a scene (`#about`, `/#about`) and `#hash` deep links go
 *   through `scrollToScene`, since scenes don't sit at their element's offset.
 * - Rebuilds on the 1280px breakpoint and on debounced width changes. Does
 *   nothing below 640px (SM is static and hides the stage).
 *
 * `children` render after the stage, inside the context, so the Header and
 * Footer can call `useActiveScene()` / `useScrollToScene()`.
 */
export function ScrollStage({
  scenes = SCENES,
  children,
}: {
  scenes?: SceneEntry[];
  children?: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <Stage scenes={scenes}>{children}</Stage>
    </SmoothScroll>
  );
}

function Stage({
  scenes,
  children,
}: {
  scenes: SceneEntry[];
  children?: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const trigger = useRef<ScrollTrigger | null>(null);
  const deepLinked = useRef(false);
  /** True while `scrollToScene` jumps, so played builds snap instead of playing. */
  const jumping = useRef(false);

  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const enabled = useMediaQuery("(min-width: 640px)");
  const lg = useMediaQuery("(min-width: 1280px)");
  const widthKey = useWidthKey();
  const [activeScene, setActiveScene] = useState<SceneId>(scenes[0]!.id);

  const layout = useMemo(() => layoutScenes(scenes), [scenes]);

  // One vh unit in px. The stage is 100svh, so this is svh, matching the CSS.
  const vhPx = () => (stage.current?.offsetHeight ?? window.innerHeight) / 100;

  const scrollToScene = useCallback(
    (id: SceneId, { immediate = false }: ScrollToSceneOptions = {}) => {
      const st = trigger.current;
      const range = layout.ranges.find((r) => r.id === id);
      if (!st || !range) return fallbackScrollToScene(id, { immediate });
      // Round up: scroll positions are whole px, and rounding down would stop
      // just short of the resting state. The hold after it absorbs the extra px.
      const top = Math.ceil(st.start + range.restAt * vhPx());
      const smooth = lenisRef.current;
      jumping.current = immediate;
      if (smooth) smooth.scrollTo(top, { immediate, force: true });
      else window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
      if (immediate) ScrollTrigger.update();
      jumping.current = false;
    },
    [layout],
  );

  useGSAP(
    () => {
      if (!enabled) return;
      ScrollTrigger.config({ ignoreMobileResize: true });

      const { ranges, total } = layout;
      const master = gsap.timeline({ defaults: { ease: "none" } });
      // Pin the timeline's length to `total` so time = vh scrolled.
      master.to({}, { duration: total }, 0);

      // `buildSeconds` builds: played (not scrubbed) as scroll crosses enterEnd.
      const played: {
        range: SceneRange;
        tl: gsap.core.Timeline;
        seconds: number;
        arrived: boolean;
        tween?: gsap.core.Tween;
      }[] = [];

      ranges.forEach((range, i) => {
        const root = slots.current[i];
        const animation = scenes[i]!.animation;
        if (!root) return;

        if (range.pinned && i > 0) {
          master.set(root, { visibility: "visible" }, range.start);
        }
        if (range.hideAt !== undefined) {
          master.set(root, { visibility: "hidden" }, range.hideAt);
        }

        const enterLength = range.enterEnd - range.start;
        const prev = ranges[i - 1];
        if (animation?.enter && prev && enterLength > 0) {
          const tl = gsap.timeline();
          animation.enter(root, tl, {
            prevRoot: slots.current[i - 1] ?? null,
            fromColor: MOTION_SPEC[prev.id].exitColor,
          });
          if (tl.duration()) master.add(tl.duration(enterLength), range.start);
        }

        if (animation?.buildSeconds && range.playsBuild) {
          const tl = gsap.timeline({ paused: true });
          animation.build(root, tl);
          played.push({
            range,
            tl,
            seconds: animation.buildSeconds,
            arrived: false,
          });
        }

        const buildLength = range.buildEnd - range.enterEnd;
        if (animation && range.pinned && buildLength > 0) {
          const tl = gsap.timeline();
          animation.build(root, tl);
          if (tl.duration()) {
            master.add(tl.duration(buildLength), range.enterEnd);
          }
        }
      });

      // Plays a build forward once scroll is past its enter, and back once
      // scroll returns halfway into the enter (where the nav switches back),
      // so a nudge up from the resting point doesn't undo it. Jumps (deep
      // links, first sync) and scenes already hidden behind a later one snap
      // instead of playing.
      const syncPlayed = (pos: number, snap: boolean) => {
        played.forEach((p) => {
          const { enterEnd, activeFrom } = p.range;
          const past = pos >= (p.arrived ? activeFrom : enterEnd);
          if (past === p.arrived) return;
          p.arrived = past;
          p.tween?.kill();
          const to = past ? 1 : 0;
          if (snap || pos >= (p.range.hideAt ?? Infinity)) {
            p.tl.progress(to);
            return;
          }
          p.tween = gsap.to(p.tl, {
            progress: to,
            duration: p.seconds * Math.abs(to - p.tl.progress()),
            ease: PLAYED_BUILD_EASE,
          });
        });
      };

      const sync = (progress: number, snap = jumping.current) => {
        const pos = progress * total;
        const current = ranges.filter((r) => r.activeFrom <= pos).pop();
        if (current) setActiveScene(current.id);
        syncPlayed(pos, snap);
      };

      const st = ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: () => `+=${total * vhPx()}`,
        scrub: true,
        animation: master,
        onUpdate: (self) => sync(self.progress),
      });
      trigger.current = st;
      sync(st.progress, true);

      if (!deepLinked.current) {
        deepLinked.current = true;
        const id = sceneFromHash(window.location.hash, ranges);
        if (id)
          requestAnimationFrame(() => scrollToScene(id, { immediate: true }));
      }

      return () => {
        trigger.current = null;
        played.forEach((p) => p.tween?.kill());
      };
    },
    {
      scope: container,
      dependencies: [enabled, lg, widthKey, layout],
      revertOnUpdate: true,
    },
  );

  // Scenes aren't at their element's offset, so route in-page links ourselves.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey)
        return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href");
      if (!href || !trigger.current) return;
      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      // A bare `#` (the header logo) means the top of the page.
      const id =
        href === "#" ? scenes[0]!.id : sceneFromHash(url.hash, layout.ranges);
      if (!id) return;
      e.preventDefault();
      // Replace, not push: Back should leave the page, not step through tabs.
      window.history.replaceState(
        null,
        "",
        href === "#" ? url.pathname + url.search : `#${id}`,
      );
      scrollToScene(id);
    };
    const onHashChange = () => {
      const id = sceneFromHash(window.location.hash, layout.ranges);
      if (id && trigger.current) scrollToScene(id);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [layout, scenes, scrollToScene]);

  // Restoring a mid-page scroll position on reload would land between scene
  // states; reloads start at the top (or at the `#hash` scene, above).
  useEffect(() => {
    const { scrollRestoration } = window.history;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = scrollRestoration;
    };
  }, []);

  const markup = useMemo(() => {
    const slotRef = (i: number) => (el: HTMLDivElement | null) => {
      slots.current[i] = el;
    };
    return (
      <div className="max-sm:hidden">
        <div
          ref={container}
          className="relative"
          style={{ height: `calc(${layout.pinnedEnd}svh + 100svh)` }}
        >
          <div
            ref={stage}
            className="sticky top-0 h-[100svh] w-full overflow-hidden"
          >
            {scenes.map(({ id, Component }, i) =>
              layout.ranges[i]!.pinned ? (
                <SceneSlot
                  key={id}
                  slotRef={slotRef(i)}
                  className="absolute inset-0"
                  style={{ zIndex: i, visibility: i ? "hidden" : undefined }}
                >
                  <Component />
                </SceneSlot>
              ) : null,
            )}
          </div>
        </div>
        {scenes.map(({ id, Component }, i) =>
          layout.ranges[i]!.pinned ? null : (
            <SceneSlot
              key={id}
              slotRef={slotRef(i)}
              className="relative overflow-hidden"
            >
              <Component />
            </SceneSlot>
          ),
        )}
      </div>
    );
  }, [scenes, layout]);

  const value = useMemo(
    () => ({ activeScene, scrollToScene }),
    [activeScene, scrollToScene],
  );

  return (
    <StageContext.Provider value={value}>
      {markup}
      {children}
    </StageContext.Provider>
  );
}
