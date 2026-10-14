"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { gsap, useGSAP } from "../../(landing)/scenes/gsap";
import { MOTION_SPEC, previousScene } from "../../(landing)/scenes/motionSpec";
import {
  SCENE_IDS,
  type DevSceneId,
  type SceneId,
} from "../../(landing)/scenes/types";
import { SCENE_MAP } from "./sceneMap";

const WIDTHS = [1512, 1000] as const;

const isRealScene = (id: string): id is SceneId =>
  (SCENE_IDS as readonly string[]).includes(id);

/**
 * `/dev/scenes?scene=<id>&progress=0..1[&enter=1][&w=1000]`
 * Renders one scene with its timeline paused at `progress`.
 */
export function SceneHarness() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const stage = useRef<HTMLDivElement>(null);

  const sceneId = (params.get("scene") ??
    Object.keys(SCENE_MAP)[0]) as DevSceneId;
  const progress = Math.min(
    1,
    Math.max(0, Number(params.get("progress")) || 0),
  );
  const enter = params.get("enter") === "1";
  const forced = params.get("w");
  const width = Number(forced) === 1000 ? 1000 : 1512;
  const entry = SCENE_MAP[sceneId];
  const sceneIds = Object.keys(SCENE_MAP);
  const animation = entry?.animation;

  const prevId = isRealScene(sceneId) ? previousScene(sceneId) : undefined;
  const prevColor = prevId ? MOTION_SPEC[prevId].exitColor : "#000";

  /** `null` removes the param. */
  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) =>
      v === null ? next.delete(k) : next.set(k, v),
    );
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  useGSAP(
    () => {
      const root = stage.current;
      if (!animation || !root) return;
      const tl = gsap.timeline({ paused: true });
      if (enter) animation.enter?.(root, tl);
      else animation.build(root, tl);
      tl.progress(progress);
    },
    {
      scope: stage,
      dependencies: [sceneId, progress, enter, forced],
      revertOnUpdate: true,
    },
  );

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* fixed, not sticky: overlays the scene's empty navbar strip instead
          of adding its height to the page, so the page doesn't scroll */}
      <div className="fixed inset-x-0 top-0 z-50 flex flex-wrap items-center gap-4 bg-black/80 p-3 text-sm">
        {/* Only worth showing once there's more than one scene */}
        {sceneIds.length > 1 && (
          <label className="flex items-center gap-2">
            scene
            <select
              className="rounded bg-white p-1 text-black"
              value={sceneId}
              onChange={(e) => update({ scene: e.target.value })}
            >
              {sceneIds.map((id) => (
                <option key={id}>{id}</option>
              ))}
            </select>
          </label>
        )}
        {/* Nothing to scrub until the scene has an animation */}
        {animation && (
          <>
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
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enter}
                onChange={(e) =>
                  update({ enter: e.target.checked ? "1" : "0" })
                }
              />
              enter
            </label>
          </>
        )}
        <div className="ml-auto flex gap-1">
          {/* Real window size, like the live page */}
          <button
            onClick={() => update({ w: null })}
            className={`rounded px-2 py-1 ${!forced ? "bg-[#fbbf24] text-black" : "bg-[#404040]"}`}
          >
            fit
          </button>
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

      {entry ? (
        <div
          ref={stage}
          className="mx-auto"
          style={
            {
              ...(forced && {
                width,
                "--vw": `${width / 100}px`,
                "--ab-w": width,
              }),
              background: enter ? prevColor : undefined,
            } as React.CSSProperties
          }
        >
          <entry.Component />
        </div>
      ) : (
        <p className="p-6 pt-20">
          No scene &quot;{sceneId}&quot; in <code>sceneMap.ts</code>.
        </p>
      )}
    </div>
  );
}
