import React from "react";
import type { DevSceneId } from "./types";

/**
 * Full-viewport frame every scene renders into.
 *
 * How to write a scene (full rules on `SceneAnimation` in `types.ts`):
 * - Put animated nodes behind `data-anim="..."` hooks; select by those only.
 * - Animate only transform and opacity.
 * - Read `scrollLength` / `exitColor` from `motionSpec.ts`, never hard-code.
 * - Size with `u(n)` / `var(--u)` and check it in `/dev/scenes?scene=<id>`.
 *
 * `background` bleeds to the viewport edges. `content` is centered and sized
 * to the artboard (--ab-w x --ab-h scaled by --u), so it never crops.
 */
export function SceneFrame({
  sceneId,
  background,
  content,
}: {
  sceneId: DevSceneId;
  background?: React.ReactNode;
  content?: React.ReactNode;
}) {
  return (
    <section
      id={sceneId}
      data-scene={sceneId}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <div data-anim="background" className="absolute inset-0">
        {background}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative shrink-0"
          style={{
            width: "calc(var(--ab-w) * var(--u))",
            height: "calc(var(--ab-h) * var(--u))",
          }}
        >
          {content}
        </div>
      </div>
    </section>
  );
}
