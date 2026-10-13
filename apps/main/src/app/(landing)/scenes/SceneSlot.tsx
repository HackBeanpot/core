import React from "react";

/**
 * The root a scene's `enter` / `build` receive, in `ScrollStage` and in the
 * dev harness. It holds two siblings that `transitions.ts` animates:
 *
 * - `[data-stage-scene]`: the scene itself (its `SceneFrame`).
 * - `[data-transition-layer]`: an empty full-viewport layer above the scene,
 *   invisible until a transition paints the previous scene's `exitColor` on it.
 *
 * Scenes never render this themselves.
 */
export function SceneSlot({
  children,
  className,
  style,
  slotRef,
  ...data
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  slotRef?: React.Ref<HTMLDivElement>;
  /** `data-*` attributes, passed through to the root (the harness marks itself). */
  [data: `data-${string}`]: string | number | boolean | undefined;
}) {
  return (
    <div
      ref={slotRef}
      data-stage-slot
      className={className}
      style={style}
      {...data}
    >
      <div data-stage-scene className="relative h-full w-full">
        {children}
      </div>
      <div
        data-transition-layer
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0"
      />
    </div>
  );
}
