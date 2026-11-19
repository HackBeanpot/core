"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

// Exports take the list's filters but not its paging/sorting.
const EXPORT_FILTER_KEYS = ["season", "status", "decision", "rsvp", "search"];

function exportQuery(searchParams: URLSearchParams, extra?: string): string {
  const params = new URLSearchParams();
  for (const key of EXPORT_FILTER_KEYS) {
    const value = searchParams.get(key);
    if (value) params.set(key, value);
  }
  if (extra) params.set("format", extra);
  const query = params.toString();
  return query ? `?${query}` : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\r?\n/g, "<br>");
}

interface ExportData {
  headers: string[];
  rows: string[][];
}

/**
 * An HTML table is what Google Sheets reads best from the clipboard: each answer stays
 * in one cell, even a long answer with line breaks. The plain-text TSV is a fallback
 * for apps that only read text.
 */
function toHtml({ headers, rows }: ExportData): Blob {
  const html =
    "<table>" +
    [headers, ...rows]
      .map(
        (row) =>
          "<tr>" +
          row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("") +
          "</tr>",
      )
      .join("") +
    "</table>";
  return new Blob([html], { type: "text/html" });
}

function toTsv({ headers, rows }: ExportData): Blob {
  const tsv = [headers, ...rows]
    .map((row) => row.map((cell) => cell.replace(/[\t\r\n]+/g, " ")).join("\t"))
    .join("\n");
  return new Blob([tsv], { type: "text/plain" });
}

export function ExportButtons() {
  const searchParams = useSearchParams();
  const [isCopying, setIsCopying] = React.useState(false);

  async function copyForSheets() {
    setIsCopying(true);
    const data = fetch(
      `/api/v1/export/applications${exportQuery(searchParams, "json")}`,
    ).then(async (res) => {
      if (!res.ok) throw new Error("Request failed");
      return (await res.json()) as ExportData;
    });
    try {
      // The ClipboardItem is built from promises before any await. Safari only allows
      // a clipboard write that starts in the click handler.
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": data.then(toHtml),
          "text/plain": data.then(toTsv),
        }),
      ]);
      const { rows } = await data;
      toast.success(
        `Copied ${rows.length} applicants. Paste into cell A1 of a Google Sheet.`,
      );
    } catch {
      toast.error("Could not copy. Use Download CSV instead.");
    } finally {
      setIsCopying(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={copyForSheets} disabled={isCopying}>
        {isCopying ? "Copying…" : "Copy for Google Sheets"}
      </Button>
      <Button variant="outline" asChild>
        <a
          download
          href={`/api/v1/export/applications${exportQuery(searchParams)}`}
        >
          Download applications CSV
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a
          download
          href={`/api/v1/export/post-acceptance${exportQuery(searchParams)}`}
        >
          Download RSVPs CSV
        </a>
      </Button>
    </div>
  );
}
