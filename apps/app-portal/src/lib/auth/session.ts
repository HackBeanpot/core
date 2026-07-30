//server-side getSession() helper for RSCs
import { getServerSession } from "next-auth";
import { authOptions } from "./config";

export function getSession() {
  return getServerSession(authOptions);
}
