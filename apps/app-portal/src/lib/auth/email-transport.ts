//Nodemailer transport stub for magic-link emails

import EmailProvider from "next-auth/providers/email";

const config = EmailProvider({
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  },
  from: process.env.EMAIL_FROM,
})

export default config;