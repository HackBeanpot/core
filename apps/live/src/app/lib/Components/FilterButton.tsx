import React, {useState} from 'react';
import useIsMobile from "@repo/util/hooks/useIsMobile";

interface ButtonProps {
  backgroundColor: string;
  textColor: string;
  text: string;
  borderColor?: string;
  hoverBGColor?: string;
  hoverText?: string;
}

const FilterButton: React.FC<ButtonProps> = ({ 
  backgroundColor, 
  textColor, 
  text,
  borderColor,
  hoverBGColor,
  hoverText,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = useIsMobile();

  const baseStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    color: textColor,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  const hoverStyle: React.CSSProperties = {
    ...(hoverBGColor ? { backgroundColor: hoverBGColor } : {}),
    ...(hoverText ? { color: hoverText } : {}),
    ...(hoverBGColor ? { borderColor: hoverBGColor } : {}),
  };

  const finalStyle = {
    ...baseStyle,
    ...(isHovered && !isMobile ? hoverStyle : {}),
  };

  return (
    <button className = "w-[10vw] h-auto"
      style={finalStyle}
      onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
    >
      {text}
    </button>
  );
};

export default FilterButton;