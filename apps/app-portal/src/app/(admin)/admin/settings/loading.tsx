import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading(): JSX.Element {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-8 w-64" />

      <section>
        <Skeleton className="mb-4 h-6 w-24" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </section>

      <section>
        <Skeleton className="mb-4 h-6 w-24" />
        <Skeleton className="h-16 w-full" />
      </section>

      <section>
        <Skeleton className="mb-4 h-6 w-48" />
        <Skeleton className="h-48 w-full" />
      </section>
    </div>
  );
}
