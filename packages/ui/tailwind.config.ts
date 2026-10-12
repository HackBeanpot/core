import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import { screens } from "@repo/tailwind-config/tokens";

const config: Pick<Config, "presets" | "content" | "theme"> = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
  theme: { screens },
};

export default config;
