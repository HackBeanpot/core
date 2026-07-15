//admin role check, shared by server (jwt callback, guards) and client (sign-in form)

export const ADMIN_EMAIL_DOMAIN = "@hackbeanpot.com";

export function isAdminEmail(email?: string | null): boolean {
  return !!email?.trim().toLowerCase().endsWith(ADMIN_EMAIL_DOMAIN);
}
