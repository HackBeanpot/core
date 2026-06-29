import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApplicantDetail as ApplicantDetailType } from "@/lib/applicants/types";

interface ApplicantDetailProps {
  applicant: ApplicantDetailType;
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

function Resume({ resume }: { resume?: ApplicantDetailType["resume"] }) {
  return (
    <div className="flex flex-col justify-between border-b border-neutral-100 py-2">
      <div>
        <dt className="text-xs font-medium uppercase text-neutral-500">
          Resume
        </dt>
        <dd className="text-sm">{resume?.filename ?? "—"}</dd>
      </div>
      {resume ? (
        <a
          href={`/api/v1/uploads/${resume.id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Download
        </a>
      ) : null}
    </div>
  );
}

export function ApplicantDetail({ applicant }: ApplicantDetailProps) {
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
        <CardContent className="flex flex-col gap-2">
          <ResponseList responses={applicant.applicationResponses} />
          <Resume resume={applicant.resume} />
        </CardContent>
      </Card>

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
