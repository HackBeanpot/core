import React from "react";

interface ButtonProps {
  backgroundColor: string;
  textColor: string;
  text: string;
  borderColor?: string;
  hoverBGColor?: string;
  hoverText?: string;
  hoverBorderColor?: string;
  onClick?: () => void;
}

const bgColorMap: Record<string, string> = {
  canopyGreenLight: "bg-canopyGreenLight",
  canopyGreen:"bg-canopyGreen",
  mossGreen: "bg-mossGreen",
  mossGreenDark: "bg-mossGreenDark",
  firecrackerRedLight: "bg-firecrackerRedLight",
  firecrackerRed: "bg-firecrackerRed",
};

const textColorMap: Record<string, string> = {
  charcoalFog: "text-[#353131]",
  white: "text-white",
  canopyGreenLight: "text-canopyGreenLight",
};

const borderColorMap: Record<string, string> = {
  canopyGreenLight: "border-canopyGreenLight",
  canopyGreen:"bg-canopyGreen",
  mossGreen: "border-mossGreen",
  mossGreenDark: "border-mossGreenDark",
  firecrackerRed: "border-firecrackerRed",
  firecrackerRedLight: "border-firecrackerRedLight",
};

const hoverBgColorMap: Record<string, string> = {
  canopyGreenLight: "hover:bg-canopyGreenLight",
  canopyGreen: "hover:bg-canopyGreen",
  mossGreen: "hover:bg-mossGreen",
  mossGreenDark: "hover:bg-mossGreenDark",
  firecrackerRed: "hover:bg-firecrackerRed",
};

const hoverTextColorMap: Record<string, string> = {
  white: "hover:text-white",
  charcoalFog: "hover:text-[#353131]",
  canopyGreenLight: "hover:text-canopyGreenLight",
};

const hoverBorderColorMap: Record<string, string> = {
  white: "hover:border-white",
  canopyGreenLight: "hover:border-canopyGreenLight",
  canopyGreen:"bg-canopyGreen",
  mossGreen: "hover:border-mossGreen",
  mossGreenDark: "hover:border-mossGreenDark",
  firecrackerRed: "hover:border-firecrackerRed",
};

const FilterButton: React.FC<ButtonProps> = ({
  backgroundColor,
  textColor,
  text,
  borderColor,
  hoverBGColor,
  hoverText,
  hoverBorderColor,
  onClick,
}) => {
  const bgClass = bgColorMap[backgroundColor] ?? bgColorMap.mossGreen;
  const textClass = textColorMap[textColor] ?? textColorMap.charcoalFog;
  const borderClass = borderColor
    ? borderColorMap[borderColor]
    : "border-transparent";
  const hoverBgClass = hoverBGColor
    ? hoverBgColorMap[hoverBGColor]
    : "hover:bg-transparent";
  const hoverTextClass = hoverText
    ? hoverTextColorMap[hoverText]
    : "hover:text-white";
  const hoverBorderClass = hoverBorderColor
    ? hoverBorderColorMap[hoverBorderColor]
    : "hover:border-white";

    const baseStyle = `font-NeulisNeue-Bold flex items-center justify-center gap-1 rounded-lg w-auto h-auto py-1 whitespace-nowrap border border-solid transition-transform duration-200 ease-in-out hover:scale-105 hover:border-[1.5px] active:brightness-90
    ${bgClass}
    ${textClass}
    ${borderClass}
    ${hoverBgClass}
    ${hoverTextClass}
    ${hoverBorderClass}
    ${text ? "px-4" : "px-2"}
    `;
 
  return (
    <button
      className={baseStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default FilterButton;