import React from "react";
import "./styles.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  onHover: () => void;
}

// had to comment for linting error because onClick and onHover aren't being used
// const Button: React.FC<ButtonProps> = ({ text, onClick, onHover }) => {
const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="button" onClick={undefined}>
      {text}
    </button>
  );
};
export default Button;
