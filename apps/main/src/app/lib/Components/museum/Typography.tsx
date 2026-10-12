import React, { type CSSProperties } from "react";
import { u } from "../../scroll/units";

// Set by next/font in app/layout.tsx.
const AMARANTE = "var(--font-amarante)";
const GOTHIC = "var(--font-gothic)";
const MERRIWEATHER = "var(--font-merriweather)";

export const typographyVariants = {
  heroTitle: {
    // Figma node: Hero Title
    lg: {
      fontFamily: AMARANTE,
      fontWeight: 400,
      fontSize: u(64),
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    md: {
      fontFamily: AMARANTE,
      fontWeight: 400,
      fontSize: u(64),
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    sm: {
      fontFamily: AMARANTE,
      fontWeight: 400,
      fontSize: "56.91px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
  },

  sectionTitle: {
    // Figma node: Section Title
    lg: {
      fontFamily: AMARANTE,
      fontWeight: 400,
      fontSize: u(50),
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    md: {
      fontFamily: AMARANTE,
      fontWeight: 400,
      fontSize: u(50),
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    sm: {
      fontFamily: AMARANTE,
      fontWeight: 400,
      fontSize: "32px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
  },

  displayName: {
    // Figma node: Display Name
    lg: {
      fontFamily: GOTHIC,
      fontWeight: 400,
      fontSize: u(20.34),
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    md: {
      fontFamily: GOTHIC,
      fontWeight: 400,
      fontSize: u(20.34),
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    sm: {
      fontFamily: GOTHIC,
      fontWeight: 400,
      fontSize: "22px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
  },

  cardTitle: {
    // Figma node: Card Title
    lg: {
      fontFamily: GOTHIC,
      fontWeight: 400,
      fontSize: u(30),
      lineHeight: "100%",
      letterSpacing: "0%",
      textTransform: "uppercase",
    },
    md: {
      fontFamily: GOTHIC,
      fontWeight: 400,
      fontSize: u(30),
      lineHeight: "100%",
      letterSpacing: "0%",
      textTransform: "uppercase",
    },
    sm: {
      fontFamily: GOTHIC,
      fontWeight: 400,
      fontSize: "30px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textTransform: "uppercase",
    },
  },

  label: {
    // Figma node: Label
    lg: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: u(16),
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    md: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: u(16),
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    sm: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
  },

  body: {
    // Figma node: Body
    lg: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: u(18),
      lineHeight: "140%",
      letterSpacing: "0%",
    },
    md: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: u(18),
      lineHeight: "140%",
      letterSpacing: "0%",
    },
    sm: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: "18px",
      lineHeight: "140%",
      letterSpacing: "0%",
    },
  },

  bodySmall: {
    // Figma node: Body Small
    lg: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: u(16),
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    md: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: u(16),
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    sm: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
  },

  role: {
    // Figma node: Role
    lg: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: u(14.79),
      lineHeight: "140%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    md: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: u(14.79),
      lineHeight: "140%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    sm: {
      fontFamily: MERRIWEATHER,
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "140%",
      letterSpacing: "0%",
      textAlign: "center",
    },
  },

  faqQuestion: {
    // Figma node: FAQ Question
    lg: {
      fontFamily: MERRIWEATHER,
      fontWeight: 600,
      fontSize: u(18),
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    md: {
      fontFamily: MERRIWEATHER,
      fontWeight: 400,
      fontSize: u(18),
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    sm: {
      fontFamily: MERRIWEATHER,
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    open: {
      // Figma node: FAQ opened
      lg: {
        fontFamily: MERRIWEATHER,
        fontWeight: 300,
        fontSize: u(16),
        lineHeight: "140%",
        letterSpacing: "0%",
      },
      md: {
        fontFamily: MERRIWEATHER,
        fontWeight: 300,
        fontSize: u(16),
        lineHeight: "140%",
        letterSpacing: "0%",
      },
      sm: {
        fontFamily: MERRIWEATHER,
        fontWeight: 300,
        fontSize: "16px",
        lineHeight: "140%",
        letterSpacing: "0%",
      },
    },
  },
} as const;

type TypographyVariant = keyof typeof typographyVariants;

type TypographyProps = {
  variant: TypographyVariant;
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
};

const BREAKPOINTS = ["sm", "md", "lg"] as const;

// Each breakpoint's values become custom properties (`--type-font-size-md`);
// `.museum-type` in globals.css picks the current one with media queries.
const breakpointVars = (variant: TypographyVariant): CSSProperties =>
  Object.fromEntries(
    BREAKPOINTS.flatMap((bp) =>
      Object.entries(typographyVariants[variant][bp]).map(([key, value]) => [
        `--type-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}-${bp}`,
        value,
      ]),
    ),
  );

export function Typography({
  variant,
  as: Component = "p",
  children,
}: TypographyProps) {
  return (
    <Component className="museum-type" style={breakpointVars(variant)}>
      {children}
    </Component>
  );
}
