"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import type { Question } from "@/lib/application/types";

interface ShortTextFieldProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
}

export function ShortTextField({
  question,
  value,
  onChange,
  onBlur,
  disabled,
}: ShortTextFieldProps) {
  return (
    <Input
      id={question.id}
      type={question.id === "email" ? "email" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={question.label}
      aria-required={question.required}
    />
  );
}
