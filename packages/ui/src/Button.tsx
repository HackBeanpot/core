// Button.client.tsx
import React from "react";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  color?: string;
  textColor?: string;
  size?: string;
}

const bgColorMap: Record<string, string> = {
  mossGreen: "bg-mossGreen hover:bg-mossGreenDark",
  firecrackerRedLight: "bg-firecrackerRedLight hover:bg-firecrackerRed",
  marigoldYellow: "bg-marigoldYellow hover:bg-marigoldYellowDark",
  cottonCandyCoral: "bg-cottonCandyCoral hover:bg-cottonCandyCoralDark",
};

const sizeMap: Record<string, string> = {
  small: "text-xs",
  medium: "text-md",
  large: "text-xl",
};

const textColorMap: Record<string, string> = {
  charcoalFog: "text-[#353131]",
  white: "text-white",
};
const Button: React.FC<ButtonProps> = ({
  text,
  textColor = "charcoalFog",
  color = "mossyGreen",
  onClick,
  icon,
  size = "small",
}) => {
  const bgClass = bgColorMap[color] || bgColorMap["mossGreen"];
  const textColorClass = textColorMap[textColor];
  const sizeClass = sizeMap[size] || sizeMap["small"];

  const buttonClasses = `font-DMSans-Bold flex items-center justify-center gap-1 rounded-full w-auto h-auto ${text ? "px-4" : "px-2"} py-2 ${bgClass} shadow-[inset_2px_3px_0_rgba(0,0,0,0.10)] ${textColorClass} ${sizeClass} text-base whitespace-nowrap transition-transform duration-200 ease-in-out hover:scale-105`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {icon && <span className="p-2">{icon}</span>}
      {text && text}
    </button>
  );
};

export default Button;
