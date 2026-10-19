import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApplicantDetail as ApplicantDetailType } from "@/lib/applicants/types";
import type { FormSection, Question } from "@/lib/application/types";

interface ApplicantDetailProps {
  applicant: ApplicantDetailType;
  /** The live form config, which decides which questions are shown. */
  sections: FormSection[];
}

function ResponseList({ responses }: { responses?: Record<string, unknown> }) {
  if (!responses || Object.keys(responses).length === 0) {
    return <p className="text-sm text-neutral-500">No responses recorded.</p>;
  }
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
      {Object.entries(responses).map(([k, v]) => (
        <div key={k} className="border-b border-neutral-100 py-2">
          <dt className="text-xs font-medium uppercase text-neutral-500">
            {k}
          </dt>
          <dd className="text-sm">
            {Array.isArray(v) ? v.join(", ") : String(v ?? "—")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function formatAnswer(value: unknown, question?: Question): string {
  if (value === null || value === undefined || value === "") return "—";
  const labelFor = (v: unknown) =>
    question?.options?.find((o) => o.value === v)?.label ?? String(v);
  if (Array.isArray(value)) {
    return value.length > 0 ? value.map(labelFor).join(", ") : "—";
  }
  return labelFor(value);
}

function FileAnswer({
  value,
  resume,
}: {
  value: unknown;
  resume?: ApplicantDetailType["resume"];
}) {
  if (typeof value !== "string" || value.length === 0) return <>—</>;
  // Only the resume has its upload record resolved (for the original filename).
  const filename = resume?.id === value ? resume.filename : value;
  return (
    <a
      href={`/api/v1/uploads/${value}`}
      className="font-medium text-blue-600 hover:underline"
    >
      {filename}
    </a>
  );
}

// Driven by the live form config (not the stored keys) so questions added since an
// applicant saved still show up, and answers to deleted questions don't mix in.
function CurrentResponses({
  sections,
  responses,
  resume,
}: {
  sections: FormSection[];
  responses: Record<string, unknown>;
  resume?: ApplicantDetailType["resume"];
}) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">{section.title}</h3>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {section.questions.map((question) => (
              <div
                key={question.id}
                className="border-b border-neutral-100 py-2"
              >
                <dt className="text-xs font-medium text-neutral-500">
                  {question.label}
                </dt>
                <dd className="whitespace-pre-wrap text-sm">
                  {question.type === "file_upload" ? (
                    <FileAnswer
                      value={responses[question.id]}
                      resume={resume}
                    />
                  ) : (
                    formatAnswer(responses[question.id], question)
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

export function ApplicantDetail({ applicant, sections }: ApplicantDetailProps) {
  const responses = applicant.applicationResponses ?? {};
  const currentIds = new Set(
    sections.flatMap((section) => section.questions.map((q) => q.id)),
  );
  const removedResponses = Object.fromEntries(
    Object.entries(responses).filter(([id]) => !currentIds.has(id)),
  );
  const hasRemoved = Object.keys(removedResponses).length > 0;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{applicant.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-xs text-neutral-500">Application</dt>
              <dd>{applicant.applicationStatus}</dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-500">Decision</dt>
              <dd>{applicant.decisionStatus ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-500">RSVP</dt>
              <dd>{applicant.rsvpStatus}</dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-500">Submitted</dt>
              <dd>
                {applicant.appSubmissionTime
                  ? new Date(applicant.appSubmissionTime).toLocaleString()
                  : "—"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Application responses</CardTitle>
        </CardHeader>
        <CardContent>
          <CurrentResponses
            sections={sections}
            responses={responses}
            resume={applicant.resume}
          />
        </CardContent>
      </Card>

      {hasRemoved && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Answers to removed questions
            </CardTitle>
            <p className="text-sm text-neutral-500">
              Saved against questions that are no longer on the form.
            </p>
          </CardHeader>
          <CardContent>
            <ResponseList responses={removedResponses} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Post-acceptance responses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponseList responses={applicant.postAcceptanceResponses} />
        </CardContent>
      </Card>
    </div>
  );
}
