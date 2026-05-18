"use client";

import React from "react";

import { Textarea } from "@/components/ui/textarea";
import type { Question } from "@/lib/application/types";

interface LongTextFieldProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
}

export function LongTextField({
  question,
  value,
  onChange,
  onBlur,
  disabled,
}: LongTextFieldProps) {
  return (
    <Textarea
      id={question.id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={question.label}
      rows={5}
      aria-required={question.required}
    />
  );
}
