"use client";

// TODO(MS-301): delete once the Header shows the active scene.
import React, { useState } from "react";
import { SCENES } from "./scenes/registry";
import { useActiveScene, useScrollToScene } from "./scenes/ScrollStage";

/** Dev-only readout for `/?stage=1`: the active scene, plus scrollToScene buttons. */
export function StageDebug() {
  const activeScene = useActiveScene();
  const scrollToScene = useScrollToScene();
  const [immediate, setImmediate] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex max-w-[90vw] flex-wrap items-center gap-2 rounded-lg bg-black/70 p-3 font-mono text-xs text-white mobile-xl:hidden mobile:hidden">
      <span>
        active: <b data-testid="active-scene">{activeScene}</b>
      </span>
      {SCENES.map(({ id }) => (
        <button
          key={id}
          onClick={() => scrollToScene(id, { immediate })}
          className={`rounded px-2 py-1 ${id === activeScene ? "bg-[#fbbf24] text-black" : "bg-white/15"}`}
        >
          {id}
        </button>
      ))}
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={immediate}
          onChange={(e) => setImmediate(e.target.checked)}
        />
        immediate
      </label>
    </div>
  );
}
