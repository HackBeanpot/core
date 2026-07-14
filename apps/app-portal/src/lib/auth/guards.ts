//requireUser() and requireAdmin() helpers for route handlers
import { getSession } from "./session";

export async function requireUser() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!(user as { isAdmin?: boolean }).isAdmin) {
    throw new Error("Forbidden");
  }
  return user;
}
