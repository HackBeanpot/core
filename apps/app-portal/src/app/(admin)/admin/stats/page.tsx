import React from "react";

import { StatsDashboard } from "@/components/admin/stats/StatsDashboard";
import { getStats } from "@/lib/stats/service";

export const dynamic = "force-dynamic"; // render on every request

export default async function StatsPage(): Promise<JSX.Element> {
  const payload = await getStats();
  return (
    <StatsDashboard payload={payload} generatedAt={payload.generatedAt} />
  );
}
