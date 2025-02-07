import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function Heading({ children, className = "" }: TypographyProps) {
  return <h1 className={`text-heading font-bold font-Wilden ${className}`}>{children}</h1>;
}

export function Body({ children, className = "" }: TypographyProps) {
  return <p className={`text-body font-GT-Walsheim-Regular ${className}`}>{children}</p>;
}

export function ButtonText({ children, className = "" }: TypographyProps) {
  return <span className={`text-button font-GT-Walsheim-Regular ${className}`}>{children}</span>;
}

export function SignLarge({ children, className = "" }: TypographyProps) {
  return <h1 className={`text-signLarge font-Big-Shoulders-Display uppercase ${className}`}>{children}</h1>;
}

export function SignSmall({ children, className = "" }: TypographyProps) {
  return <h2 className={`text-signSmall font-Big-Shoulders-Display uppercase ${className}`}>{children}</h2>;
}