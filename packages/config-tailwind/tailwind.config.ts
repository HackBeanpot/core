import type { Config } from "tailwindcss";
import { colors, screens } from "./theme-tokens";
import { wiggle, popAndShrink } from "./animations";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      keyframes: {
        wiggle: wiggle.keyframes,
        popAndShrink: popAndShrink.keyframes,
      },
      animation: {
        wiggle: wiggle.animation,
        popAndShrink: popAndShrink.animation,
      },
      fontFamily: {
        "GT-Walsheim-Regular": ["'GT-Walsheim-Regular'"],
        "GT-Walsheim-Bold": ["'GT-Walsheim-Bold'"],
        "Big-Shoulders-Display": ["'Big-Shoulders-Display'"],
        "Wilden-Regular": ["'Wilden-Regular'"],
      },
      borderRadius: {
        arrow: "31.5px",
      },
    },
    colors,
    screens,
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
