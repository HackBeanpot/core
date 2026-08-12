import { z } from "zod";

import { APPLICATION_SECTIONS } from "./questions";
import type { FormSection, Question, QuestionType } from "./types";

type SchemaTarget = "client" | "server";

function countWords(value: string): number {
  return value.trim().length === 0 ? 0 : value.trim().split(/\s+/).length;
}

function fieldSchema(
  question: Question,
  target: SchemaTarget = "client",
): z.ZodTypeAny {
  const { type, required, options, maxLength, maxWords } = question;

  switch (type as QuestionType) {
    case "short_text":
    case "long_text": {
      const requiredMessage = `${question.label} is required`;
      let schema = required
        ? z.string({ message: requiredMessage })
        : z.string();
      if (maxLength) {
        schema = schema.max(
          maxLength,
          `${question.label} must be ${maxLength} characters or fewer`,
        );
      }
      if (type === "long_text" && maxWords) {
        schema = schema.refine(
          (value) => countWords(value) <= maxWords,
          `${question.label} must be ${maxWords} words or fewer`,
        );
      }
      if (required) {
        return schema.min(1, requiredMessage);
      }
      if (target === "server") {
        return z
          .union([schema, z.literal(""), z.null(), z.undefined()])
          .optional();
      }
      return schema.optional().or(z.literal(""));
    }
    case "select": {
      const values = options?.map((o) => o.value) ?? [];
      const enumSchema = z.enum(values as [string, ...string[]], {
        message: `${question.label} is required`,
      });
      if (required) {
        return enumSchema;
      }
      if (target === "server") {
        return z
          .union([enumSchema, z.literal(""), z.null(), z.undefined()])
          .optional();
      }
      return z.union([enumSchema, z.literal("")]);
    }
    case "multi_select": {
      const values = options?.map((o) => o.value) ?? [];
      const enumSchema = z.enum(values as [string, ...string[]], {
        message: `${question.label} contains an option that is not allowed`,
      });
      const requiredMessage = `Select at least one option for ${question.label}`;
      const schema = required
        ? z.array(enumSchema, { message: requiredMessage })
        : z.array(enumSchema);
      if (required) {
        return schema.min(1, requiredMessage);
      }
      if (target === "server") {
        return z
          .union([schema, z.null(), z.undefined()])
          .optional()
          .default([]);
      }
      return schema.optional().default([]);
    }
    case "file_upload": {
      // Both client and server hold the same value here: the upload ID returned by
      // /api/v1/uploads/sign once the file has actually finished uploading to GCS (see
      // FileUploadField / FileUpload). There's no separate "browser File object" stage in
      // the schema — the upload happens before the field's value is ever set.
      const requiredMessage = `${question.label} is required`;
      const uploadIdSchema = z.string().min(1, requiredMessage);
      if (required) return uploadIdSchema;
      return z.union([z.string(), z.literal(""), z.null(), z.undefined()]).optional();
    }
    default:
      return z.unknown();
  }
}

function buildShape(
  sections: readonly FormSection[],
  target: SchemaTarget,
): Record<string, z.ZodTypeAny> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const section of sections) {
    for (const question of section.questions) {
      shape[question.id] = fieldSchema(question, target);
    }
  }
  return shape;
}

// Builds a zod schema for a given (possibly admin-edited, possibly live-fetched) section list.
// Used both for the client-facing resolver and the server-facing submission validator, so a
// form-config change is enforced consistently on both sides.
export function buildApplicationSchema(
  sections: readonly FormSection[],
  target: SchemaTarget,
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const schema = z.object(buildShape(sections, target));
  return target === "server" ? (schema.strict() as typeof schema) : schema;
}

export function buildDefaultValues(
  sections: readonly FormSection[],
): Record<string, string | string[] | null> {
  const values: Record<string, string | string[] | null> = {};
  for (const section of sections) {
    for (const question of section.questions) {
      if (question.type === "multi_select") {
        values[question.id] = [];
      } else if (question.type === "file_upload") {
        values[question.id] = null;
      } else {
        values[question.id] = "";
      }
    }
  }
  return values;
}

// Client-facing schema: used by the form's zodResolver against the static default question set.
// Call buildApplicationSchema(sections, "client") directly wherever the live (possibly
// admin-edited) section list is available instead.
export const applicationSchema = buildApplicationSchema(
  APPLICATION_SECTIONS,
  "client",
);

export type ApplicationSchemaValues = z.infer<typeof applicationSchema>;

// Server-facing schema against the static default question set — see submit() in
// lib/application/service.ts, which validates against the *live* config instead.
export const applicationSubmissionSchema = buildApplicationSchema(
  APPLICATION_SECTIONS,
  "server",
);

export type ApplicationSubmissionValues = z.infer<
  typeof applicationSubmissionSchema
>;

export function createDefaultValues(): ApplicationSchemaValues {
  return buildDefaultValues(APPLICATION_SECTIONS) as ApplicationSchemaValues;
}
