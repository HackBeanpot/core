import { APPLICATION_SECTIONS } from "./questions";
import {
  buildApplicationSchema,
  buildDefaultValues,
} from "./schema";
import type { FormSection } from "./types";

describe("buildApplicationSchema", () => {
  it("builds a schema from the live 2026 question set with no required fields missing", () => {
    const schema = buildApplicationSchema(APPLICATION_SECTIONS, "server");
    // Every required question needs *some* answer for the whole thing to parse; fill in a
    // representative valid value for every question (not just defaults, since selects/multi
    // selects/file_uploads can't default to "" and still satisfy a required check).
    const values: Record<string, string | string[]> = {};
    for (const section of APPLICATION_SECTIONS) {
      for (const question of section.questions) {
        if (question.type === "select") {
          values[question.id] = question.options?.[0]?.value ?? "";
        } else if (question.type === "multi_select") {
          values[question.id] = question.options?.[0]
            ? [question.options[0].value]
            : [];
        } else if (question.type === "file_upload") {
          values[question.id] = "upload-id-123";
        } else {
          values[question.id] = "answer";
        }
      }
    }

    const result = schema.safeParse(values);
    expect(result.success).toBe(true);
  });

  it("rejects a submission missing a required field", () => {
    const sections: FormSection[] = [
      {
        id: "s",
        title: "S",
        questions: [
          { id: "first_name", label: "First name", type: "short_text", required: true },
        ],
      },
    ];
    const schema = buildApplicationSchema(sections, "server");
    expect(schema.safeParse({ first_name: "" }).success).toBe(false);
    expect(schema.safeParse({ first_name: "Ada" }).success).toBe(true);
  });

  it("enforces maxWords on long_text questions", () => {
    const sections: FormSection[] = [
      {
        id: "s",
        title: "S",
        questions: [
          {
            id: "goals_long_answer",
            label: "Goals",
            type: "long_text",
            required: true,
            maxWords: 5,
          },
        ],
      },
    ];
    const schema = buildApplicationSchema(sections, "client");
    expect(
      schema.safeParse({ goals_long_answer: "one two three four five" })
        .success,
    ).toBe(true);
    expect(
      schema.safeParse({
        goals_long_answer: "one two three four five six",
      }).success,
    ).toBe(false);
  });

  it("requires file_upload questions to hold a non-empty upload ID string when required", () => {
    const sections: FormSection[] = [
      {
        id: "s",
        title: "S",
        questions: [
          {
            id: "vaccination_card",
            label: "Vaccination card",
            type: "file_upload",
            required: true,
          },
        ],
      },
    ];
    const schema = buildApplicationSchema(sections, "server");
    expect(schema.safeParse({ vaccination_card: null }).success).toBe(false);
    expect(schema.safeParse({ vaccination_card: "" }).success).toBe(false);
    expect(
      schema.safeParse({ vaccination_card: "upload-id-123" }).success,
    ).toBe(true);
  });

  it("rejects unknown keys on the server (strict mode) but not on the client", () => {
    const sections: FormSection[] = [
      {
        id: "s",
        title: "S",
        questions: [
          { id: "first_name", label: "First name", type: "short_text", required: false },
        ],
      },
    ];
    const serverSchema = buildApplicationSchema(sections, "server");
    const clientSchema = buildApplicationSchema(sections, "client");
    expect(
      serverSchema.safeParse({ first_name: "Ada", unexpected: "x" }).success,
    ).toBe(false);
    expect(
      clientSchema.safeParse({ first_name: "Ada", unexpected: "x" }).success,
    ).toBe(true);
  });
});

describe("buildDefaultValues", () => {
  it("gives every question in the live 2026 question set a default value", () => {
    const defaults = buildDefaultValues(APPLICATION_SECTIONS);
    for (const section of APPLICATION_SECTIONS) {
      for (const question of section.questions) {
        expect(Object.prototype.hasOwnProperty.call(defaults, question.id)).toBe(
          true,
        );
      }
    }
  });

  it("defaults multi_select to [] and file_upload to null", () => {
    const sections: FormSection[] = [
      {
        id: "s",
        title: "S",
        questions: [
          { id: "a", label: "A", type: "multi_select", required: false },
          { id: "b", label: "B", type: "file_upload", required: false },
          { id: "c", label: "C", type: "short_text", required: false },
        ],
      },
    ];
    expect(buildDefaultValues(sections)).toEqual({ a: [], b: null, c: "" });
  });
});

describe("APPLICATION_SECTIONS (2026 content)", () => {
  it("has no duplicate question IDs across sections", () => {
    const ids = APPLICATION_SECTIONS.flatMap((s) => s.questions.map((q) => q.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every select/multi_select question at least one option", () => {
    for (const section of APPLICATION_SECTIONS) {
      for (const question of section.questions) {
        if (question.type === "select" || question.type === "multi_select") {
          expect(question.options?.length ?? 0).toBeGreaterThan(0);
        }
      }
    }
  });
});
