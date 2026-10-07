import React from "react";

export const typographyVariants = {
  heroTitle: {
    // Figma node: Hero Title
    lg: {
      fontFamily: "Amarante",
      fontWeight: 400,
      fontSize: "64px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    md: {
      fontFamily: "Amarante",
      fontWeight: 400,
      fontSize: "64px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    sm: {
      fontFamily: "Amarante",
      fontWeight: 400,
      fontSize: "56.91px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
  },

  sectionTitle: {
    // Figma node: Section Title
    lg: {
      fontFamily: "Amarante",
      fontWeight: 400,
      fontSize: "50px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    md: {
      fontFamily: "Amarante",
      fontWeight: 400,
      fontSize: "50px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    sm: {
      fontFamily: "Amarante",
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
      fontFamily: "Special Gothic Condensed One",
      fontWeight: 400,
      fontSize: "20.34px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    md: {
      fontFamily: "Special Gothic Condensed One",
      fontWeight: 400,
      fontSize: "20.34px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    sm: {
      fontFamily: "Special Gothic Condensed One",
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
      fontFamily: "Special Gothic Condensed One",
      fontWeight: 400,
      fontSize: "30px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textTransform: "uppercase",
    },
    md: {
      fontFamily: "Special Gothic Condensed One",
      fontWeight: 400,
      fontSize: "30px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textTransform: "uppercase",
    },
    sm: {
      fontFamily: "Special Gothic Condensed One",
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
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    md: {
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    sm: {
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
  },

  body: {
    // Figma node: Body
    lg: {
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "18px",
      lineHeight: "140%",
      letterSpacing: "0%",
    },
    md: {
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "18px",
      lineHeight: "140%",
      letterSpacing: "0%",
    },
    sm: {
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "18px",
      lineHeight: "140%",
      letterSpacing: "0%",
    },
  },

  bodySmall: {
    // Figma node: Body Small
    lg: {
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    md: {
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    sm: {
      fontFamily: "Merriweather",
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
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "14.79px",
      lineHeight: "140%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    md: {
      fontFamily: "Merriweather",
      fontWeight: 300,
      fontSize: "14.79px",
      lineHeight: "140%",
      letterSpacing: "0%",
      textAlign: "center",
    },
    sm: {
      fontFamily: "Merriweather",
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
      fontFamily: "Merriweather",
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    md: {
      fontFamily: "Merriweather",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    sm: {
      fontFamily: "Merriweather",
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "100%",
      letterSpacing: "0%",
    },
    open: {
      // Figma node: FAQ opened
      lg: {
        fontFamily: "Merriweather",
        fontWeight: 300,
        fontSize: "16px",
        lineHeight: "140%",
        letterSpacing: "0%",
      },
      md: {
        fontFamily: "Merriweather",
        fontWeight: 300,
        fontSize: "16px",
        lineHeight: "140%",
        letterSpacing: "0%",
      },
      sm: {
        fontFamily: "Merriweather",
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

export function Typography({
  variant,
  as: Component = "p",
  children,
}: TypographyProps) {
  const styles = typographyVariants[variant];

  return (
    <Component
      style={{
        fontFamily: styles.lg.fontFamily,
        fontWeight: styles.lg.fontWeight,
        fontSize: styles.lg.fontSize,
        lineHeight: styles.lg.lineHeight,
        letterSpacing: styles.lg.letterSpacing,
        textAlign: "textAlign" in styles.lg ? styles.lg.textAlign : undefined,
        textTransform:
          "textTransform" in styles.lg ? styles.lg.textTransform : undefined,
      }}
    >
      {children}
    </Component>
  );
}
