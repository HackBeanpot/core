import type { FormSection, Question } from "@/lib/application/types";

import { responseField, type CsvColumn } from "./csv";
import { getApplicantName } from "./service";
import type { ApplicantDoc } from "./types";

function formatTimestamp(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";
  const date = new Date(value as string | Date);
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

/**
 * One column per question on the live form. A choice answer is exported as the option
 * label the applicant saw, not the stored slug. A file answer is exported as a link,
 * which opens for any admin who is signed in.
 */
function questionColumn(
  question: Question,
  origin: string,
): CsvColumn<ApplicantDoc> {
  if (question.type === "file_upload") {
    return {
      header: question.label,
      value: (doc) => {
        const id = responseField(doc.applicationResponses, question.id);
        return id ? `${origin}/api/v1/uploads/${id}?redirect=1` : "";
      },
    };
  }

  const labels = new Map(question.options?.map((o) => [o.value, o.label]));
  return {
    header: question.label,
    value: (doc) => {
      const raw = doc.applicationResponses?.[question.id];
      const values = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
      return values.map((v) => labels.get(String(v)) ?? String(v)).join("; ");
    },
  };
}

export function applicationExportColumns(
  sections: FormSection[],
  origin: string,
): CsvColumn<ApplicantDoc>[] {
  return [
    { header: "Email", value: (d) => d.email },
    {
      header: "Name",
      value: (d) => getApplicantName(d.applicationResponses) ?? "",
    },
    { header: "Status", value: (d) => d.applicationStatus },
    { header: "Decision", value: (d) => d.decisionStatus ?? "" },
    { header: "RSVP", value: (d) => d.rsvpStatus },
    {
      header: "Submitted At",
      value: (d) => formatTimestamp(d.appSubmissionTime),
    },
    { header: "Last Saved At", value: (d) => formatTimestamp(d.lastSavedAt) },
    ...sections.flatMap((section) =>
      section.questions.map((q) => questionColumn(q, origin)),
    ),
  ];
}
