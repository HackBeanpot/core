"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { gsap, useGSAP } from "../../(landing)/scenes/gsap";
import { MOTION_SPEC } from "../../(landing)/scenes/motionSpec";
import { placeholder } from "../../(landing)/scenes/placeholder/placeholders";
import { SceneSlot } from "../../(landing)/scenes/SceneSlot";
import {
  TRANSITIONS,
  type TransitionName,
} from "../../(landing)/scenes/transitions";

const WIDTHS = [1512, 1000] as const;
const PREV = placeholder("about");
const NEXT = placeholder("values");
/** Options that make a demo visible; a curtain in `fromColor` would vanish over PREV. */
const DEMO_OPTS: Partial<Record<TransitionName, Record<string, unknown>>> = {
  curtain: { color: "#8f1d1a" },
};

const isTransition = (name: string | null): name is TransitionName =>
  !!name && name in TRANSITIONS;

/**
 * `/dev/scenes?transition=<name>&progress=0..1[&w=1000]`
 * Plays one `transitions.ts` helper between two placeholders (about -> values),
 * paused at `progress`, with its default options (plus `DEMO_OPTS`).
 */
export function TransitionHarness() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const box = useRef<HTMLDivElement>(null);
  const prevRoot = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  const requested = params.get("transition");
  const name: TransitionName = isTransition(requested) ? requested : "fogWipe";
  const progress = Math.min(
    1,
    Math.max(0, Number(params.get("progress")) || 0),
  );
  const forced = params.get("w");
  const width = Number(forced) === 1000 ? 1000 : 1512;

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) => next.set(k, v));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  useGSAP(
    () => {
      if (!root.current) return;
      const tl = gsap.timeline({ paused: true });
      TRANSITIONS[name](tl, prevRoot.current, root.current, {
        fromColor: MOTION_SPEC[PREV.id].exitColor,
        ...DEMO_OPTS[name],
      });
      tl.progress(progress);
    },
    {
      scope: box,
      dependencies: [name, progress, forced],
      revertOnUpdate: true,
    },
  );

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-4 bg-black/80 p-3 text-sm">
        <label className="flex items-center gap-2">
          transition
          <select
            className="rounded bg-white p-1 text-black"
            value={name}
            onChange={(e) => update({ transition: e.target.value })}
          >
            {Object.keys(TRANSITIONS).map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 items-center gap-2">
          progress {progress.toFixed(2)}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={(e) => update({ progress: e.target.value })}
            className="min-w-40 flex-1"
          />
        </label>
        <div className="flex gap-1">
          {WIDTHS.map((w) => (
            <button
              key={w}
              onClick={() => update({ w: String(w) })}
              className={`rounded px-2 py-1 ${forced && w === width ? "bg-[#fbbf24] text-black" : "bg-[#404040]"}`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={box}
        className="relative mx-auto h-[100svh] overflow-hidden"
        style={
          forced
            ? ({
                width,
                "--vw": `${width / 100}px`,
                "--ab-w": width,
              } as React.CSSProperties)
            : undefined
        }
      >
        <SceneSlot slotRef={prevRoot} className="absolute inset-0">
          <PREV.Component />
        </SceneSlot>
        <SceneSlot slotRef={root} className="absolute inset-0">
          <NEXT.Component />
        </SceneSlot>
      </div>
    </div>
  );
}
