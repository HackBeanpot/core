import React from "react";

import { ApplicantsFilters } from "@/components/admin/applicants/ApplicantsFilters";
import { ApplicantsTable } from "@/components/admin/applicants/ApplicantsTable";
import { ExportButtons } from "@/components/admin/applicants/ExportButtons";
import { listApplicants } from "@/lib/applicants/service";

export default async function ApplicantsPage() {
  const { rows, total } = await listApplicants();

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Applicants</h1>
          <p className="text-sm text-neutral-500">{total} total</p>
        </div>
        <ExportButtons />
      </header>
      <ApplicantsFilters />
      <ApplicantsTable rows={rows} />
    </div>
  );
}
