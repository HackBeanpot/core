"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ApplicantSummary } from "@/lib/applicants/types";
import { Input } from "@/components/ui/input";

interface ApplicantsTableProps {
  rows: ApplicantSummary[];
}

const columns: ColumnDef<ApplicantSummary>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name ?? "—",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
  },
  { accessorKey: "applicationStatus", header: "Application" },
  {
    accessorKey: "decisionStatus",
    header: "Decision",
    cell: ({ row }) => row.original.decisionStatus ?? "—",
  },
  { accessorKey: "rsvpStatus", header: "RSVP" },
  {
    accessorKey: "appSubmissionTime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Submitted <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) =>
      row.original.appSubmissionTime
        ? new Date(row.original.appSubmissionTime).toLocaleDateString()
        : "—",
  },
];

export function ApplicantsTable({ rows }: ApplicantsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 25 } },
  });

  return (
    <div className="space-y-3">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-neutral-500"
                >
                  No applicants
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => {
                    if (window.getSelection()?.toString()) return;
                    router.push(`/admin/applicants/${row.original.id}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          <Input
            className="w-10 h-auto m-0 p-1 text-center"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") {
                table.setPageIndex(0);
                return;
              }
              if (!/^\d+$/.test(raw)) return;

              const parsed = Number.parseInt(raw, 10);
              const lastIndex = Math.max(0, table.getPageCount() - 1);
              const clamped = Math.min(Math.max(parsed - 1, 0), lastIndex);
              table.setPageIndex(clamped);
            }}
          />
          <div>of {table.getPageCount()}</div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
