import { z } from "zod";

import { APPLICATION_SECTIONS } from "./questions";
import type { Question, QuestionType } from "./types";

type SchemaTarget = "client" | "server";

function fieldSchema(
  question: Question,
  target: SchemaTarget = "client",
): z.ZodTypeAny {
  const { type, required, options, maxLength } = question;

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
      const requiredMessage = `${question.label} is required`;
      if (target === "server") {
        const uploadIdSchema = z.string().min(1, requiredMessage);
        if (required) return uploadIdSchema;
        return z.union([z.string(), z.null(), z.undefined()]).optional();
      }
      return z
        .union([z.instanceof(File), z.null(), z.undefined()])
        .refine((file) => !required || file instanceof File, {
          message: requiredMessage,
        });
    }
    default:
      return z.unknown();
  }
}

function buildShape(target: SchemaTarget): Record<string, z.ZodTypeAny> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const section of APPLICATION_SECTIONS) {
    for (const question of section.questions) {
      shape[question.id] = fieldSchema(question, target);
    }
  }
  return shape;
}

// Client-facing schema: used by the form's zodResolver, where file_upload
// fields hold a browser File object.
export const applicationSchema = z.object(buildShape("client"));

export type ApplicationSchemaValues = z.infer<typeof applicationSchema>;

// Server-facing schema: used to validate a submission payload, where
// file_upload fields hold an upload ID string instead of a File. Strict so
// unknown keys in the payload are rejected.
export const applicationSubmissionSchema = z
  .object(buildShape("server"))
  .strict();

export type ApplicationSubmissionValues = z.infer<
  typeof applicationSubmissionSchema
>;

export function createDefaultValues(): ApplicationSchemaValues {
  const values: Record<string, string | string[] | null> = {};
  for (const section of APPLICATION_SECTIONS) {
    for (const question of section.questions) {
      if (question.type === "multi_select") {
        values[question.id] = [];
      } else if (question.type === "file_upload") {
        values[question.id] = null; // "" is not in the file_upload union; null is
      } else {
        values[question.id] = "";
      }
    }
  }
  return values as ApplicationSchemaValues;
}
