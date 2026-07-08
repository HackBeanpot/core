// Lightweight auth-flow logger.
// Every log is prefixed `[auth:<scope>]` and timestamped so you can grep the
// whole magic-link flow across server + client:  grep "\[auth:" in your terminal.
//
// On by default in development. Set AUTH_DEBUG=false to silence in dev, or
// AUTH_DEBUG=true to force it on in production.

type Scope =
  | "email" // sending the magic-link email
  | "adapter" // MongoDB reads/writes (users, sessions, verification tokens)
  | "callback" // signIn / jwt / session callbacks
  | "event" // NextAuth lifecycle events
  | "middleware" // backend edge requests
  | "client"; // frontend navigation

const ENABLED =
  process.env.AUTH_DEBUG === "true" ||
  (process.env.AUTH_DEBUG !== "false" && process.env.NODE_ENV !== "production");

export function authLog(scope: Scope, msg: string, data?: unknown) {
  if (!ENABLED) return;
  const line = `${new Date().toISOString()} [auth:${scope}] ${msg}`;
  if (data !== undefined) {
    // eslint-disable-next-line no-console
    console.log(line, data);
  } else {
    // eslint-disable-next-line no-console
    console.log(line);
  }
}

// Show enough of a token/secret to correlate log lines without dumping the whole thing.
export function mask(value?: string | null): string {
  if (!value) return "(none)";
  if (value.length <= 8) return `${value.slice(0, 1)}***`;
  return `${value.slice(0, 4)}…${value.slice(-4)} (len ${value.length})`;
}

// Shallow-copy an object, masking any token-ish fields, for safe logging.
export function redact<T>(obj: T): T | Record<string, unknown> {
  if (!obj || typeof obj !== "object") return obj;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    out[k] = k === "token" || k === "sessionToken" ? mask(v as string) : v;
  }
  return out;
}
