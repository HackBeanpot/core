import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

function Heading({ children, className = "" }: TypographyProps) {
  return (
    <h1 className={`text-heading font-bold font-Wilden ${className}`}>
      {children}
    </h1>
  );
}

function Body({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-body font-GT-Walsheim-Regular ${className}`}>
      {children}
    </p>
  );
}

function ButtonText({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-button font-GT-Walsheim-Regular ${className}`}>
      {children}
    </span>
  );
}

function SignLarge({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={`text-signLarge font-Big-Shoulders-Display uppercase ${className}`}
    >
      {children}
    </h1>
  );
}

function SignSmall({ children, className = "" }: TypographyProps) {
  return (
    <h2
      className={`text-signSmall font-Big-Shoulders-Display uppercase ${className}`}
    >
      {children}
    </h2>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { Body, Heading, ButtonText, SignLarge, SignSmall };
