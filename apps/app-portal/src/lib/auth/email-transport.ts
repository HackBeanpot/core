import EmailProvider from "next-auth/providers/email";
import type { SendVerificationRequestParams } from "next-auth/providers/email";

import { createTransport } from "nodemailer"
import {Theme} from "next-auth";
import { readFileSync } from "fs";
import { join } from "path";

const TEMPLATE_PATH = join(process.cwd(), "src/lib/auth/email-template.html");

async function customRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
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
  const logoUrl = `${process.env.NEXTAUTH_URL ?? ""}/email_logo.png`

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
