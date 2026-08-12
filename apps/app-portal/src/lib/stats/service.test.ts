import { resolveDemographicsLabels } from "./service";
import type { DemographicsBreakdown } from "./types";
import type { FormSection } from "@/lib/application/types";

const sections: FormSection[] = [
  {
    id: "school",
    title: "School",
    questions: [
      {
        id: "school",
        label: "What school do you attend?",
        type: "select",
        required: true,
        options: [
          { value: "northeastern_university", label: "Northeastern University" },
          { value: "boston_university", label: "Boston University" },
        ],
      },
      {
        id: "major",
        label: "What is your major?",
        type: "short_text",
        required: true,
      },
    ],
  },
];

function demographics(
  overrides: Partial<DemographicsBreakdown>,
): DemographicsBreakdown {
  return {
    school: [],
    education_year: [],
    major: [],
    gender: [],
    race: [],
    tshirt_size: [],
    hackathon_experience: [],
    cs_classes: [],
    ...overrides,
  };
}

describe("resolveDemographicsLabels", () => {
  it("maps raw option values to their display label for select/multi_select dimensions", () => {
    const raw = demographics({
      school: [
        { label: "northeastern_university", count: 3 },
        { label: "boston_university", count: 1 },
      ],
    });

    const resolved = resolveDemographicsLabels(raw, sections);

    expect(resolved.school).toEqual([
      { label: "Northeastern University", count: 3 },
      { label: "Boston University", count: 1 },
    ]);
  });

  it("falls back to the raw value for free-text dimensions with no options at all", () => {
    const raw = demographics({
      major: [{ label: "Computer Science", count: 5 }],
    });

    const resolved = resolveDemographicsLabels(raw, sections);

    expect(resolved.major).toEqual([{ label: "Computer Science", count: 5 }]);
  });

  it("falls back to the raw value when it doesn't match any known option (e.g. a removed option)", () => {
    const raw = demographics({
      school: [{ label: "some_school_removed_from_the_form", count: 2 }],
    });

    const resolved = resolveDemographicsLabels(raw, sections);

    expect(resolved.school).toEqual([
      { label: "some_school_removed_from_the_form", count: 2 },
    ]);
  });

  it("falls back to the raw value for a dimension with no matching question in the given sections", () => {
    const raw = demographics({
      gender: [{ label: "male", count: 4 }],
    });

    const resolved = resolveDemographicsLabels(raw, sections);

    expect(resolved.gender).toEqual([{ label: "male", count: 4 }]);
  });
});
