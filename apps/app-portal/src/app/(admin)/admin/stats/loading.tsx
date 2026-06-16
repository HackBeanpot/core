import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// fallback while server component fetches stats
export default function StatsLoading(): JSX.Element {
  return (
    <div className="flex flex-col gap-8 p-6">
      <header className="flex items-baseline justify-between gap-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-9 w-40" />
      </header>

      <section className="grid grid-cols-4 gap-4 tablet:grid-cols-2 mobile-xl:grid-cols-2 mobile:grid-cols-2">
        {["a", "b", "c", "d"].map((key) => (
          <Card key={key}>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="mt-3 h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-4 mobile:grid-cols-1 mobile-xl:grid-cols-1">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
        <div className="col-span-2">
          <ChartCardSkeleton />
        </div>
      </section>
    </div>
  );
}

function ChartCardSkeleton(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-48 w-full" />
      </CardContent>
    </Card>
  );
}
