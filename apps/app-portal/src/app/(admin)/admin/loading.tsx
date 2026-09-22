import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-2 h-4 w-40" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {["a", "b", "c"].map((key) => (
          <Card key={key}>
            <CardContent className="p-8">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-3/4" />
              <Skeleton className="mt-4 h-8 w-20 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
