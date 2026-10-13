"use client";

import React, { useSyncExternalStore } from "react";
import { Header } from "../lib/Components";
import { useActiveScene } from "./scenes/ScrollStage";

const WIDE = "(min-width: 640px)";
const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(WIDE);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

/**
 * The header, driven by the scroll stage: the active scene is underlined,
 * and the header is hidden during the hero on LG/MD (the hero has no navbar).
 * SM always shows it, minus the logo (the SM hero has its MLH badge there).
 * The server renders the LG/MD state so LG doesn't flash
 * the header over the hero before hydrating.
 */
export function LandingHeader() {
  const activeScene = useActiveScene();
  const wide = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(WIDE).matches,
    () => true,
  );
  return (
    <Header
      activeSection={activeScene}
      visible={!wide || activeScene !== "hero"}
      smLogo={false}
    />
  );
}
