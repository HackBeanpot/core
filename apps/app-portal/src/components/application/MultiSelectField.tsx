"use client";

import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Question } from "@/lib/application/types";

interface MultiSelectFieldProps {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function MultiSelectField({
  question,
  value,
  onChange,
  disabled,
}: MultiSelectFieldProps) {
  const selected = value ?? [];

  const toggle = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, optionValue]);
      return;
    }
    onChange(selected.filter((v) => v !== optionValue));
  };

  return (
    <div
      className="space-y-3"
      role="group"
      aria-labelledby={`${question.id}-label`}
    >
      {question.options?.map((option) => {
        const checked = selected.includes(option.value);
        const optionId = `${question.id}-${option.value}`;

        return (
          <div key={option.value} className="flex items-center gap-3">
            <Checkbox
              id={optionId}
              checked={checked}
              onCheckedChange={(state) => toggle(option.value, state === true)}
              disabled={disabled}
            />
            <Label htmlFor={optionId} className="cursor-pointer font-normal">
              {option.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
