"use client";

import React, { useSyncExternalStore } from "react";
import { Header } from "../lib/Components";
import { heroNav } from "./scenes/hero/hero.animation";
import { useActiveScene } from "./scenes/ScrollStage";

const WIDE = "(min-width: 640px)";
const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(WIDE);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

/**
 * The header, driven by the scroll stage: the active scene is underlined.
 * During the hero on LG/MD it follows the hero (`heroNav`): it fades in with
 * the MLH badge at the end of the intro and hides once the camera starts
 * moving toward the door, until About is on screen.
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
  const heroShown = useSyncExternalStore(
    heroNav.subscribe,
    heroNav.shown,
    () => false,
  );
  return (
    <Header
      activeSection={activeScene}
      visible={!wide || activeScene !== "hero" || heroShown}
      smLogo={false}
    />
  );
}
