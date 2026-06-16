"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FormSection as FormSectionType } from "@/lib/application/types";
import type { Control, FieldValues } from "react-hook-form";

import { QuestionField } from "./QuestionField";

interface FormSectionProps<T extends FieldValues> {
  section: FormSectionType;
  control: Control<T>;
  disabled?: boolean;
  sectionIndex: number;
  totalSections: number;
}

export function FormSection<T extends FieldValues>({
  section,
  control,
  disabled,
  sectionIndex,
  totalSections,
}: FormSectionProps<T>) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{section.title}</CardTitle>
          <span className="mt-0.5 shrink-0 text-xs text-charcoalFogLight">
            {sectionIndex + 1} of {totalSections}
          </span>
        </div>
        {section.description ? (
          <CardDescription>{section.description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-6">
        {section.questions.map((question) => (
          <QuestionField
            key={question.id}
            question={question}
            control={control}
            disabled={disabled}
          />
        ))}
      </CardContent>
    </Card>
  );
}
