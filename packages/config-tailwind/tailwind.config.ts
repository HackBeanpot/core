import type { Config } from "tailwindcss";
import { colors, screens } from "./theme-tokens";
import { wiggle, popAndShrink } from "./animations";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      fontSize: {
        heading: "clamp(2.81rem, 10vw, 5.64rem)", // 45px → 90.3px
        body: "clamp(0.875rem, 2vw, 1.625rem)", // 14px → 26px
        button: "clamp(0.875rem, 1.8vw, 1.5rem)", // 14px → 24px
        signLarge: "clamp(2.12rem, 10vw, 4.45rem)", // 33.94px → 71.27px
        signSmall: "clamp(0.90rem, 15vw, 2rem)", // 14.44px → 30.33px
      },
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
        "Big-Shoulders-Display": ['"Big-Shoulders-Display"'],
        Wilden: ['"Wilden"'],
        "Wilden-Regular": ["'Wilden-Regular'"],
        "DMSans-Regular": ["'DMSans-Regular'"],
        "DMSans-Medium": ["'DMSans-Medium'"],
      },
      transitionProperty: {
        "max-height": "max-height",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      borderRadius: {
        arrow: "31.5px",
      },
      borderWidth: {
        6: "6px",
      },
    },
    colors,
    screens,
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
