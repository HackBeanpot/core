"use client";

import React from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Question } from "@/lib/application/types";
import type { Control, FieldValues, Path } from "react-hook-form";

import { FileUploadField } from "./FileUploadField";
import { LongTextField } from "./LongTextField";
import { MultiSelectField } from "./MultiSelectField";
import { SelectField } from "./SelectField";
import { ShortTextField } from "./ShortTextField";

interface QuestionFieldProps<T extends FieldValues> {
  question: Question;
  control: Control<T>;
  disabled?: boolean;
}

export function QuestionField<T extends FieldValues>({
  question,
  control,
  disabled,
}: QuestionFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={question.id as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel id={`${question.id}-label`}>
            {question.label}
            {!question.required && !question.label.includes("optional") && (
              <span className="ml-1 font-normal text-black/70">(optional)</span>
            )}
          </FormLabel>
          {question.description ? (
            <FormDescription>{question.description}</FormDescription>
          ) : null}
          <FormControl>{renderInput(question, field, disabled)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function renderInput(
  question: Question,
  field: {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
  },
  disabled?: boolean,
) {
  switch (question.type) {
    case "short_text":
      return (
        <ShortTextField
          question={question}
          value={(field.value as string) ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          disabled={disabled}
        />
      );
    case "long_text":
      return (
        <LongTextField
          question={question}
          value={(field.value as string) ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          disabled={disabled}
        />
      );
    case "select":
      return (
        <SelectField
          question={question}
          value={(field.value as string) ?? ""}
          onChange={field.onChange}
          disabled={disabled}
        />
      );
    case "multi_select":
      return (
        <MultiSelectField
          question={question}
          value={(field.value as string[]) ?? []}
          onChange={field.onChange}
          disabled={disabled}
        />
      );
    case "file_upload":
      return (
        <FileUploadField
          question={question}
          value={field.value as string | null | undefined}
          onChange={field.onChange}
          disabled={disabled}
        />
      );
    default:
      return null;
  }
}
