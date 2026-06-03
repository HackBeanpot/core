import { headers } from "next/headers";
import type { PortalStatusResponse } from "./types";

function getBaseUrl(): string {
  const headerList = headers();
  const forwardedProto = headerList.get("x-forwarded-proto");
  const forwardedHost = headerList.get("x-forwarded-host");
  const host = forwardedHost ?? headerList.get("host");

  if (!host) {
    throw new Error("Unable to determine request host");
  }

  return `${forwardedProto ?? "http"}://${host}`;
}

export async function fetchPortalStatus(): Promise<PortalStatusResponse> {
  const response = await fetch(`${getBaseUrl()}/api/v1/status`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load portal status");
  }

  return (await response.json()) as PortalStatusResponse;
}