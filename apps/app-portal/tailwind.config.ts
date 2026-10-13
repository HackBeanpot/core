// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import defaultColors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import sharedConfig from "@repo/tailwind-config";
import { colors as projectColors } from "@repo/tailwind-config/tokens";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/app/**/*.tsx", "./src/components/**/*.tsx"],
  presets: [sharedConfig],
  theme: {
    // Tailwind's mobile-first breakpoints instead of the shared max-width ones.
    screens: defaultTheme.screens,
    colors: {
      ...defaultColors,
      ...projectColors,
    },
  },
};

export default config;
