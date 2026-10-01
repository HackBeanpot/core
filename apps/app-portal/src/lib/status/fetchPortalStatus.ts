import type { PortalStatusResponse } from "./types";
import { getPortalStatus } from "./service";

export async function fetchPortalStatus(): Promise<PortalStatusResponse> {
  return getPortalStatus();
}
