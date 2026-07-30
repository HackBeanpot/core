//requireUser() and requireAdmin() helpers for route handlers
import { getSession } from "./session";

/**
 * Check if current user is signed in and signed in as (basic) user
 * @throws Error if unauthorized
 */
export async function requireUser() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

/**
 * Check if current user is signed in, then checks if user is admin
 * @throws Error if unauthorized or if not an admin
 */
export async function requireAdmin() {
  const user = await requireUser();
  if (!(user as { isAdmin?: boolean }).isAdmin) {
    throw new Error("Forbidden");
  }
  return user;
}
