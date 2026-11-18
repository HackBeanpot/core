import type { CSSProperties } from "react";
import { colors } from "@repo/tailwind-config/tokens";

/** Props every decor primitive accepts. */
export type DecorBaseProps = {
  className?: string;
  style?: CSSProperties;
  /** Idle motion on/off. Reduced-motion users never get motion regardless. */
  animate?: boolean;
};

export const animAttr = (animate: boolean) =>
  animate ? ("idle" as const) : ("static" as const);

/** CSS custom properties are not in CSSProperties' type, so cast through here. */
export const cssVars = (vars: Record<string, string | number | undefined>) =>
  vars as CSSProperties;

export const decorColors = {
  // Fog fills from the Figma exports.
  fogCream: "#FFE3B2", // used at 0.9 opacity
  fogRibbon: "#FFDCA1",
  lavender: "#CEDCFC", // --Light-Indigo-Light
  // Exact fills from the Figma flame + wax exports.
  wax: "#FFD391", // --Yellow-Primary
  wick: "#090912",
  flame: "#FDEBCC",
  flameInner: "#FFD391",
  flameHighlight: "#FDFBFB",
  flameCore: "#FFF8EC", // innermost glow ring
  candleGlow: "#C9B8F0",
  // Figma beam gradient: Yellow/Light (#FDEBCC) solid → #FDEBCC at 0%.
  beam: "#FDEBCC", // Yellow/Light, solid at the lamp
  beamEnd: "#FDEBCC", // fades to 0% at the far end
  fixture: colors.charcoalFogDark,
  star: "#FFEDC3", // Figma hero stars
  nightSky: "#0B0D21", // Figma hero night background
  sparkle: "#FFD391", // --Yellow-Primary, from the Figma sparkle export
} as const;

/**
 * Four-point sparkle from the Figma export (36.6×35.8, mirrored with scaleX(-1)),
 * scaled and centered into a 24×24 box. The second subpath is Figma's tiny tip patch.
 */
export const SPARKLE_PATH =
  "M0.104 11.659C1.215 11.017 2.469 10.523 3.604 9.886C5.057 9.071 6.699 8.373 7.776 7.04C8.49 6.099 9.056 5.043 9.628 4.009C10.023 3.294 10.339 2.423 10.736 1.692C10.998 1.211 11.42 -0.451 12.275 0.116C12.209 0.174 12.183 0.176 12.163 0.249C12.245 0.425 12.274 0.433 12.448 0.532C12.518 0.523 12.529 0.511 12.588 0.47C12.793 0.85 12.934 1.24 13.119 1.629C13.244 1.892 13.406 2.159 13.527 2.419C14.036 3.512 14.623 4.573 15.236 5.611C15.362 5.833 15.572 6.064 15.694 6.283C16.561 7.837 18.177 8.609 19.681 9.431C20.473 9.864 21.372 10.286 22.199 10.687C22.75 10.954 23.428 11.208 23.933 11.568C24.165 12.595 23.338 12.645 22.613 13.018C22.367 13.144 22.113 13.264 21.865 13.385C20.855 13.87 19.866 14.396 18.899 14.962C18.19 15.375 17.853 15.554 17.194 16.061C16.866 16.311 16.566 16.597 16.299 16.912C16.038 17.227 15.803 17.6 15.584 17.946C14.843 19.113 14.193 20.374 13.624 21.635C13.505 21.899 13.337 22.179 13.206 22.449C12.975 22.924 12.843 23.485 12.453 23.86C12.198 24.106 11.756 24.004 11.557 23.738C11.199 23.299 11.086 22.704 10.817 22.234C10.443 21.58 10.159 20.884 9.813 20.223C9.449 19.531 9.054 18.855 8.63 18.197C8.286 17.655 7.937 17.08 7.475 16.631C6.773 15.95 5.852 15.436 5.006 14.965C4.029 14.423 3.037 13.91 2.03 13.424C1.325 13.088 0.53 12.881 0.05 12.307C0.013 12.008 0.015 11.946 0.104 11.659ZM12.275 0.121C12.336 0.187 12.554 0.412 12.587 0.474C12.529 0.515 12.517 0.527 12.447 0.537C12.274 0.437 12.245 0.43 12.163 0.254C12.183 0.181 12.209 0.179 12.275 0.121Z";
