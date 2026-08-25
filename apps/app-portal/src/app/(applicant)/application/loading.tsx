import React from "react";

export default function Loading(): JSX.Element {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-10 space-y-3">
        <div className="h-8 w-2/3 animate-pulse rounded-md bg-heather/20" />
        <div className="h-5 w-full animate-pulse rounded-md bg-heather/20" />
      </div>
      <div className="space-y-4">
        <div className="h-8 animate-pulse rounded-md bg-heather/20" />
        <div className="h-64 animate-pulse rounded-lg bg-heather/20" />
      </div>
    </div>
  );
}
