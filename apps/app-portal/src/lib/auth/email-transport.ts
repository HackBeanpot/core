import EmailProvider from "next-auth/providers/email";
import type { SendVerificationRequestParams } from "next-auth/providers/email";

import { createTransport } from "nodemailer"
import {Theme} from "next-auth";
import { readFileSync } from "fs";
import { join } from "path";
import { authLog, mask } from "./log";

const TEMPLATE_PATH = join(process.cwd(), "src/lib/auth/email-template.html");

async function customRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)
  const token = new URL(url).searchParams.get("token")

  authLog("email", `sending magic link → ${identifier}`, {
    host,
    from: provider.from,
    token: mask(token),
  })
  // DEV AID: the full clickable link. Since email delivery is flaky, you can
  // copy this straight from the terminal and paste it in the browser to sign in.
  authLog("email", `magic link URL (dev): ${url}`)

  const transport = createTransport(provider.server)
  try {
    const result = await transport.sendMail({
      to: identifier,
      from: provider.from,
      subject: `Verify your identity for HackBeanpot`,
      text: text({ url, host }),
      html: html({ url, host, theme }),
    })
    authLog("email", `SMTP responded for ${identifier}`, {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response,
    })
    const failed = result.rejected.concat(result.pending).filter(Boolean)
    if (failed.length) {
      authLog("email", `✗ SMTP rejected recipient(s): ${failed.join(", ")}`)
      throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
    }
    authLog("email", `✓ accepted by SMTP for ${identifier}`)
  } catch (err) {
    authLog("email", `✗ sendMail threw: ${(err as Error).message}`)
    throw err
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string, host: string, theme: Theme }) {
  const { url, theme } = params

  const brandColor = theme.brandColor || "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }

  // Logo is served from /public; use an absolute URL so email clients can load it.
  // Derive the origin (NEXTAUTH_URL may carry an /auth path we must strip).
  const origin = new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000").origin
  const logoUrl = `${origin}/email_logo.png`

  const replacements: Record<string, string> = {
    url,
    logoUrl,
    background: color.background,
    mainBackground: color.mainBackground,
    textColor: color.text,
    buttonBackground: color.buttonBackground,
    buttonBorder: color.buttonBorder,
    buttonText: color.buttonText,
  }

  let template = readFileSync(TEMPLATE_PATH, "utf8")
  for (const [key, value] of Object.entries(replacements)) {
    template = template.replaceAll(`{{${key}}}`, value)
  }
  return template
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string, host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}

const config = EmailProvider({
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
  sendVerificationRequest(params) {
    return customRequest(params)
  },
});

export default config;
