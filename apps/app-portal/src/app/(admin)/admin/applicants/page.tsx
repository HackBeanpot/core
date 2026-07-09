import React, { Suspense } from "react";

import { ApplicantsFilters } from "@/components/admin/applicants/ApplicantsFilters";
import { ApplicantsTable } from "@/components/admin/applicants/ApplicantsTable";
import { ExportButtons } from "@/components/admin/applicants/ExportButtons";
import { listApplicants } from "@/lib/applicants/service";

export const dynamic = "force-dynamic";

async function ApplicantsData() {
  const { rows, total } = await listApplicants();
  return (
    <>
      <p className="text-sm text-neutral-500">{total} total</p>
      <ApplicantsTable rows={rows} />
    </>
  );
}

export default function ApplicantsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Applicants</h1>
        </div>
        <ExportButtons />
      </header>
      <Suspense fallback={<div className="h-10" />}>
        <ApplicantsFilters />
      </Suspense>
      <Suspense fallback={<ApplicantsTable />}>
        <ApplicantsData />
      </Suspense>
    </div>
  );
}
