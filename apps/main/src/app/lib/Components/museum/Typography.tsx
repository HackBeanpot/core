import React from "react";

/**
 * Museum text styles. SM is the base, MD starts at `sm:` and LG at `xl:`.
 * MD/LG sizes are artboard px (`--u`), so text scales with the scenes; SM is
 * plain px. 100% line height is `leading-none`, 140% is `leading-[1.4]`.
 */
export const typographyVariants = {
  heroTitle:
    "font-amarante font-normal leading-none text-[56.91px] sm:text-[calc(64*var(--u))]",
  sectionTitle:
    "font-amarante font-normal leading-none text-center text-[32px] sm:text-[calc(50*var(--u))]",
  displayName:
    "font-gothic font-normal leading-none text-center text-[22px] sm:text-[calc(20.34*var(--u))]",
  cardTitle:
    "font-gothic font-normal leading-none uppercase text-[30px] sm:text-[calc(30*var(--u))]",
  label:
    "font-merriweather font-light leading-none text-[16px] sm:text-[calc(16*var(--u))]",
  body: "font-merriweather font-light leading-[1.4] text-[18px] sm:text-[calc(18*var(--u))]",
  bodySmall:
    "font-merriweather font-light leading-none text-center text-[16px] sm:text-[calc(16*var(--u))]",
  role: "font-merriweather font-light leading-[1.4] text-center text-[16px] sm:text-[calc(14.79*var(--u))]",
  faqQuestion:
    "font-merriweather font-normal leading-none text-[18px] sm:text-[calc(18*var(--u))] xl:font-semibold",
  faqQuestionOpen:
    "font-merriweather font-light leading-[1.4] text-[16px] sm:text-[calc(16*var(--u))]",
} as const;

export type TypographyVariant = keyof typeof typographyVariants;

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
  return (
    <Component className={typographyVariants[variant]}>{children}</Component>
  );
}
