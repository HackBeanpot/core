# Auth — how the whole thing works

Disclaimer: this document was written with assistance from AI

Plain-language walkthrough of the passwordless (magic-link) auth flow in this
app. If the NextAuth docs are confusing, read this instead.

## The core idea

This app has **no passwords**. You prove you own an email by clicking a link
sent to it. Everything below is just the plumbing that makes
"click a link → you're logged in" work safely.

There are only **three moments** that matter:

1. **Asking to log in** — you give your email
2. **Clicking the link** — you prove it's your email
3. **Staying logged in** — the app remembers you on later pages

---

## Walkthrough: Jordan signs in

### Moment 1 — Jordan asks to log in

Jordan types `jordan@email.com` into the sign-in form and submits.

The request goes to **one URL**: `/auth/...`, handled by
[`app/auth/[...nextauth]/route.ts`](../../app/auth). This is the front
door — _every_ auth action (sign in, click-callback, sign out, "who am I") comes
through here. NextAuth reads the URL and figures out which action it is.

NextAuth then:

- **Makes a secret code** — a random string, e.g. `abc123`.
- **Writes it to MongoDB** via the **adapter** (`adapter.ts`), noting
  "`abc123` belongs to jordan@email.com, expires in 24h."

Now it needs to email Jordan the link, but it doesn't know _how_ to send email —
so it calls **your code** in `email-transport.ts`. NextAuth hands you a
ready-made link:

```
https://yourapp.com/auth/callback/email?token=abc123
```

Your job (`sendVerificationRequest` → `customRequest`) is only: **take that link,
put it in a nice email, send it via Mailgun.** You read `email-template.html`
and drop the link into the button. You do **not** invent the link — NextAuth
generates it.

Jordan gets a "Sign in to HackBeanpot" email.

### Moment 2 — Jordan clicks the link

The button points back to `/auth/callback/email?token=abc123` — same front
door (`route.ts`), different action.

NextAuth pulls `abc123` from the link and **checks the database** (via the
adapter):

- Does `abc123` exist? ✅
- Not expired? ✅

If yes → **the email is proven** (only someone with Jordan's inbox could have the
code). NextAuth **deletes the code** (so the link can't be reused) and
**creates/finds Jordan's user record** in Mongo.

### Moment 3 — Jordan is now logged in

NextAuth **creates a session record in MongoDB** (the `sessions` collection) and
hands Jordan's browser a **cookie** holding just that session's ID — a random
handle, not the data itself.

From now on the browser sends that cookie automatically on every request, and the
server looks the ID up in Mongo to find the live session. Because the session
lives in the DB, it's **revocable**: delete the row and Jordan is logged out on
the next request.

---

## Later: browsing while logged in

### Visiting a protected page

`middleware.ts` runs before the page loads, but right now it's a **pass-through**
(`NextResponse.next()`) — it doesn't block anyone yet. Real enforcement happens
server-side (below). Edge middleware couldn't validate these sessions anyway:
`next-auth/middleware` only supports the JWT strategy, and we're on database
sessions.

### Your code asking "who is this?"

In a page or API route, call `getSession()` (`session.ts`) or `requireUser()`
(`guards.ts`). They read the session cookie, **look up the session row in Mongo**,
and return `{ user: { email, id, ... } }`.

This is where the **`session` callback** runs — it copies fields off the user's
Mongo record into the object your app sees (`session.user.id = user.id`, and
`isAdmin` computed from the email).

---

## What each file does (one job each)

| File                              | Its one job                                                |
| --------------------------------- | ---------------------------------------------------------- |
| `app/auth/[...nextauth]/route.ts` | The front door — all auth requests land here               |
| `config.ts`                       | The rulebook — bundles everything and hands it to NextAuth |
| `email-transport.ts`              | _How_ to send the login email (EmailProvider)              |
| `email-template.html`             | The branded HTML body for that email                       |
| `adapter.ts`                      | _Where_ to store users, sessions & login codes (MongoDB)   |
| `session` callback (in config)    | Enrich the session (add id/isAdmin) for app code           |
| `middleware.ts`                   | Bouncer at the door of protected pages                     |
| `session.ts` / `guards.ts`        | "Who is this?" helpers for your own code                   |

## Mental model

```
GIVE EMAIL ─► NextAuth makes a code, stores it (adapter),
              hands you a link ─► YOU email it (email-transport)

CLICK LINK ─► NextAuth checks the code (adapter), deletes it,
              stores a session row in Mongo, sets a session-id cookie

EVERY PAGE ─► your code reads the cookie, looks the session up in Mongo
              via getSession (+ session callback). revoke = delete the row.
```

**NextAuth does all the hard/dangerous parts** (generating codes, creating and
looking up session records, routing URLs). **You supply three answers:**

1. _how_ to email — `email-transport.ts`
2. _where_ to store — `adapter.ts`
3. _what_ info to carry — the callbacks in `config.ts`

`config.ts` ties the three together; `route.ts` exposes it to the web.

---

## Key design decisions

- **Auth lives at `/auth/*`, not the default `/api/auth/*`.** The handler is at
  `app/auth/[...nextauth]/route.ts`. NextAuth builds every URL (sign-in, callback,
  the magic link) from the **pathname of `NEXTAUTH_URL`** — so this only works
  because `.env` sets `NEXTAUTH_URL=http://localhost:3000/auth` (note the `/auth`).
  If you move the folder, you must keep `NEXTAUTH_URL`'s path in sync, or the
  emailed link won't match the handler. (In production, set it to the real
  domain + `/auth`.) The email logo URL strips this path via `new URL(...).origin`
  so it still points at `/email_logo.png` at the site root.
- **Database sessions.** We set `session: { strategy: "database" }` in
  `config.ts`, so each login is a row in Mongo's `sessions` collection and the
  cookie holds only a session ID. Upside: sessions are **individually revocable**
  — delete the row to force a logout. Tradeoff: `next-auth/middleware` can't
  validate DB sessions at the edge (it's JWT-only), so protected-route
  enforcement lives in the server guards (`getServerSession`), not middleware.
- **No `jwt` callback.** With database sessions the `jwt` callback never runs;
  session enrichment (adding `id` / `isAdmin`) happens entirely in the `session`
  callback, which receives the Mongo user record.
- **`signIn` vs `session` callbacks.** `signIn` decides _whether_ a login is
  allowed (return `false` to reject); `session` decides _what data_ your app sees
  on the session. They are complementary, not alternatives.

## Reference (NextAuth **v4** — not Auth.js v5)

- Email provider: https://next-auth.js.org/providers/email
- Options (session/secret/pages): https://next-auth.js.org/configuration/options
- Callbacks (jwt/session): https://next-auth.js.org/configuration/callbacks
- Middleware: https://next-auth.js.org/configuration/nextjs

> Note: much of what's indexed online is Auth.js **v5** (`@auth/*` packages, the
> `auth()` helper). We are on **v4** (`@next-auth/mongodb-adapter`,
> `getServerSession`, `authOptions`). Follow v4 docs to avoid API mismatches.
