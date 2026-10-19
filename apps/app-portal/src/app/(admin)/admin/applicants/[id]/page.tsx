import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { ApplicantDetail } from "@/components/admin/applicants/ApplicantDetail";
import { DecisionEditor } from "@/components/admin/applicants/DecisionEditor";
import { RsvpEditor } from "@/components/admin/applicants/RsvpEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormConfig } from "@/lib/admin/form-config-service";
import { getApplicant } from "@/lib/applicants/service";

interface PageProps {
  params: { id: string };
  searchParams: { from?: string };
}

export default async function ApplicantDetailPage({
  params,
  searchParams,
}: PageProps) {
  const [applicant, formConfig] = await Promise.all([
    getApplicant(params.id),
    getFormConfig(),
  ]);
  if (!applicant) notFound();

  const backHref = searchParams.from
    ? `/admin/applicants?${searchParams.from}`
    : "/admin/applicants";

  return (
    <div className="space-y-6 p-6">
      <div>
        <Link href={backHref} className="text-sm text-neutral-500 underline">
          Back to applicants
        </Link>
      </div>

      <ApplicantDetail applicant={applicant} sections={formConfig.sections} />

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Edit decision</CardTitle>
          </CardHeader>
          <CardContent>
            <DecisionEditor
              applicantId={applicant.id}
              value={applicant.decisionStatus}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Edit RSVP</CardTitle>
          </CardHeader>
          <CardContent>
            <RsvpEditor
              applicantId={applicant.id}
              value={applicant.rsvpStatus}
              decisionStatus={applicant.decisionStatus}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
