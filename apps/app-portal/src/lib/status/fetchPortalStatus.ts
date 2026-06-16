import { headers } from "next/headers";
import type { PortalStatusResponse } from "./types";
import { getApplicantStatus } from "./service";
import { decisionDates } from "./mock-singletons";
import { returnDashboardBranch } from "./machine";

function getBaseUrl(): string {
  const headerList = headers();
  const forwardedProto = headerList.get("x-forwarded-proto");
  const forwardedHost = headerList.get("x-forwarded-host");
  const host = forwardedHost ?? headerList.get("host");

  // If headers are not available (e.g. some dev environments), fall back
  // to localhost so server-side fetches still work during local dev.
  if (!host) {
    return `http://localhost:3000`;
  }

  return `${forwardedProto ?? "http"}://${host}`;
}

export async function fetchPortalStatus(): Promise<PortalStatusResponse> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/v1/status`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to load portal status");
    }

    return (await response.json()) as PortalStatusResponse;
  } catch {
    // Fallback to local in-memory service for dev environments where
    // a network fetch to the same server may fail.
    const status = await getApplicantStatus("mock-user");
    const showDecision = new Date() >= decisionDates.showDecision;
    const branch = returnDashboardBranch(status, decisionDates, showDecision);

    return {
      branch,
      status,
      decisionDates: {
        registrationOpen: decisionDates.registrationOpen.toISOString(),
        showDecision: decisionDates.showDecision.toISOString(),
        confirmBy: decisionDates.confirmBy.toISOString(),
      },
    };
  }
}
