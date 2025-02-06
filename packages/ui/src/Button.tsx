// Button.client.tsx
import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  onHover: () => void;
  color: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, onHover, color }) => {
  const buttonClasses = `relative rounded-full w-112 h-30 bg-[${color}] border-[${color}]-700 text-[10px]`;
  return (
    <button className={buttonClasses} onClick={onClick} onMouseEnter={onHover}>
      {text}
    </button>
  );
};

export default Button;
