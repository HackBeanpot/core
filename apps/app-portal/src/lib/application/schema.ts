import { z } from "zod";

import { APPLICATION_SECTIONS } from "./questions";
import type { Question, QuestionType } from "./types";

function fieldSchema(question: Question): z.ZodTypeAny {
  const { type, required, options } = question;

  switch (type as QuestionType) {
    case "short_text":
    case "long_text": {
      let schema = z.string();
      if (required) {
        schema = schema.min(1, `${question.label} is required`);
      }
      return required ? schema : schema.optional().or(z.literal(""));
    }
    case "select": {
      const values = options?.map((o) => o.value) ?? [];
      const enumSchema = z.enum(values as [string, ...string[]], {
        message: `${question.label} is required`,
      });
      if (required) {
        return enumSchema;
      }
      return z.union([enumSchema, z.literal("")]);
    }
    case "multi_select": {
      let schema = z.array(z.string());
      if (required) {
        schema = schema.min(
          1,
          `Select at least one option for ${question.label}`,
        );
      }
      return required ? schema : schema.optional().default([]);
    }
    case "file_upload":
      return z
        .union([z.instanceof(File), z.null(), z.undefined()])
        .refine((file) => !required || file instanceof File, {
          message: `${question.label} is required`,
        });
    default:
      return z.unknown();
  }
}

function buildShape(): Record<string, z.ZodTypeAny> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const section of APPLICATION_SECTIONS) {
    for (const question of section.questions) {
      shape[question.id] = fieldSchema(question);
    }
  }
  return shape;
}

export const applicationSchema = z.object(buildShape());

export type ApplicationSchemaValues = z.infer<typeof applicationSchema>;

export function createDefaultValues(): ApplicationSchemaValues {
  const values: Record<string, string | string[] | null> = {};
  for (const section of APPLICATION_SECTIONS) {
    for (const question of section.questions) {
      values[question.id] = question.type === "multi_select" ? [] : "";
    }
  }
  return values as ApplicationSchemaValues;
}
