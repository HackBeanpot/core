"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
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
  rows?: ApplicantSummary[];
  total?: number;
  page?: number;
  pageSize?: number;
}

const SKELETON_ROW_COUNT = 8;

const columns: ColumnDef<ApplicantSummary>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
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
  {
    accessorKey: "applicationStatus",
    header: "Application",
  },
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

const PAGE_SIZE = 25;
const DEFAULT_SORT: SortingState = [{ id: "appSubmissionTime", desc: true }];

export function ApplicantsTable({
  rows,
  total = 0,
  page = 1,
  pageSize = PAGE_SIZE,
}: ApplicantsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLoading = rows === undefined;

  // Sorting is the URL's source of truth (filtering/pagination are server-side).
  const sorting: SortingState = useMemo(() => {
    const sortBy = searchParams.get("sortBy");
    const sortDir = searchParams.get("sortDir");
    if (!sortBy) return DEFAULT_SORT;
    return [{ id: sortBy, desc: sortDir !== "asc" }];
  }, [searchParams]);

  const pagination: PaginationState = useMemo(
    () => ({ pageIndex: Math.max(0, page - 1), pageSize }),
    [page, pageSize],
  );

  const pageCount = pageSize > 0 ? Math.ceil(total / pageSize) : 0;

  const writeParams = (mutate: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams.toString());
    mutate(next);
    const query = next.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    // Navigate so the server component refetches the filtered/sorted page.
    router.replace(url, { scroll: false });
  };

  const onSortingChange: OnChangeFn<SortingState> = (updater) => {
    const nextSorting =
      typeof updater === "function" ? updater(sorting) : updater;
    writeParams((p) => {
      const s = nextSorting[0];
      if (!s) {
        p.delete("sortBy");
        p.delete("sortDir");
      } else {
        p.set("sortBy", s.id);
        p.set("sortDir", s.desc ? "desc" : "asc");
      }
      p.delete("page");
    });
  };

  const onPaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const nextPagination =
      typeof updater === "function" ? updater(pagination) : updater;
    writeParams((p) => {
      if (nextPagination.pageIndex <= 0) {
        p.delete("page");
      } else {
        p.set("page", String(nextPagination.pageIndex + 1));
      }
    });
  };

  const table = useReactTable({
    data: rows ?? [],
    columns,
    state: { sorting, pagination },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount,
    onSortingChange,
    onPaginationChange,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
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
            {isLoading ? (
              Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_col, j) => (
                    <TableCell key={j}>
                      <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
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
                    const qs = searchParams.toString();
                    const href = qs
                      ? `/admin/applicants/${row.original.id}?from=${encodeURIComponent(qs)}`
                      : `/admin/applicants/${row.original.id}`;
                    router.push(href);
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
          disabled={isLoading || !table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          <Input
            className="w-10 h-auto m-0 p-1 text-center"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            disabled={isLoading}
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
          <div>of {isLoading ? "—" : table.getPageCount()}</div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={isLoading || !table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
