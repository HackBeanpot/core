import React from "react";
import clsx from "clsx";

export type ButtonVariant = "gold" | "ghost";
export type ButtonSize = "md" | "sm" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  // Figma "Primary Button" (5346:6033)
  gold: "bg-gradient-to-t from-[#e9ac1d] to-[#ffd268] text-[#512309] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1),inset_0px_0px_20px_0px_rgba(255,255,255,0.1)]",
  // Figma "Secondary Button" (5346:6034)
  ghost:
    "bg-gradient-to-t from-[rgba(233,172,29,0.2)] to-[rgba(255,210,104,0.2)] text-white backdrop-blur-[4px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1),inset_0px_0px_20px_0px_rgba(255,255,255,0.1)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-xl",
  sm: "px-4 py-2 text-base",
  // Square 46px button around a 20px icon (footer socials)
  icon: "size-[46px] p-[13px]",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type AsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
    /** Opens in a new tab with `rel="noopener noreferrer"`. */
    external?: boolean;
  };

export type ButtonProps = AsButton | AsLink;

/**
 * Museum-theme button.
 *
 * - `variant="gold"`: Apply, Submit, View Sponsorship Packet
 * - `variant="ghost"`: Sponsor Us, Back to top
 *
 * Renders an `<a>` when `href` is passed, otherwise a `<button type="button">`.
 *
 * ```tsx
 * <Button variant="gold" href={site.sponsorshipPacketUrl} external>
 *   View Sponsorship Packet
 * </Button>
 * ```
 */
const Button = ({
  variant = "gold",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = clsx(
    "relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-xl border border-[#ffda82] font-SpecialGothicCondensedOne-Regular uppercase leading-normal transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (rest.href !== undefined) {
    const { external, ...anchorProps } = rest as Omit<AsLink, keyof BaseProps>;
    return (
      <a
        {...anchorProps}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<
    AsButton,
    keyof BaseProps
  >;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
