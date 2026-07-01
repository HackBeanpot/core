import React, { Suspense } from "react";

import { ApplicantsFilters } from "@/components/admin/applicants/ApplicantsFilters";
import { ApplicantsTable } from "@/components/admin/applicants/ApplicantsTable";
import { ExportButtons } from "@/components/admin/applicants/ExportButtons";
import { parseApplicantQueryOrDefault } from "@/lib/applicants/params";
import { listApplicants } from "@/lib/applicants/service";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function toURLSearchParams(searchParams: SearchParams): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      if (value[0] !== undefined) params.set(key, value[0]);
    } else if (value !== undefined) {
      params.set(key, value);
    }
  }
  return params;
}

async function ApplicantsData({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = parseApplicantQueryOrDefault(toURLSearchParams(searchParams));
  const result = await listApplicants(params);
  return (
    <>
      <p className="text-sm text-neutral-500">{result.total} total</p>
      <ApplicantsTable
        rows={result.rows}
        total={result.total}
        page={result.page}
        pageSize={result.pageSize}
      />
    </>
  );
}

export default function ApplicantsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
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
      {/* Re-keyed by the query string so each filter/sort/page change re-runs
          the server fetch and shows the table skeleton while it streams. */}
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<ApplicantsTable />}
      >
        <ApplicantsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
