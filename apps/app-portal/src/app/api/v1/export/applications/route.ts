import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/guards";
import { getFormConfig } from "@/lib/admin/form-config-service";
import { toCsv } from "@/lib/applicants/csv";
import { applicationExportColumns } from "@/lib/applicants/export";
import { parseApplicantQuery } from "@/lib/applicants/params";
import { CURRENT_SEASON } from "@/lib/applicants/season";
import { getApplicantCursor } from "@/lib/applicants/service";

export const dynamic = "force-dynamic"; // per-request stream — never statically rendered or cached

/**
 * Exports the applicants that match the admin list's filters (season defaults to the
 * current one), with one column per question on the live form.
 *
 *   ?format=csv  (default) streams a CSV download.
 *   ?format=json returns { headers, rows } so the admin page can copy it as a table
 *                that pastes straight into Google Sheets.
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    // Stopgap 403 mapping until the (separate, in-flight) auth ticket lands
    // typed errors distinguishing unauthenticated (401) from non-admin (403).
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const parsed = parseApplicantQuery(url.searchParams);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { filters } = parsed.value;

  const formConfig = await getFormConfig();
  const columns = applicationExportColumns(formConfig.sections, url.origin);
  const cursor = await getApplicantCursor(filters);

  if (url.searchParams.get("format") === "json") {
    const rows: string[][] = [];
    for await (const doc of cursor) {
      rows.push(columns.map((c) => c.value(doc)));
    }
    return NextResponse.json({ headers: columns.map((c) => c.header), rows });
  }

  const stream = toCsv(cursor, columns);
  const date = new Date().toISOString().slice(0, 10);
  const season =
    (filters.season ?? "current") === "current"
      ? CURRENT_SEASON
      : filters.season;
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="applications-${season}-${date}.csv"`,
    },
  });
}
