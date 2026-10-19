/* eslint-disable no-console -- CLI script; console output is intentional. */
/**
 * Set the CORS policy on the resume upload bucket.
 *
 * Resumes are uploaded straight from the browser to GCS with a signed URL (see
 * FileUpload.tsx and createSignedUploadUrl in src/lib/uploads/service.ts). A bucket
 * with no CORS policy makes the browser block that cross-origin PUT, so every upload
 * fails with a CORS error even though the signed URL itself is valid.
 *
 * Usage (from apps/app-portal):
 *   yarn setup-cors --origins=http://localhost:3000
 *   yarn setup-cors --origins=http://localhost:3000 --apply
 *   NODE_ENV=production yarn setup-cors --origins=https://<portal domain> --apply
 *
 * --origins is a comma-separated list of exact origins (scheme + host + port, no
 * trailing slash) the portal is served from; defaults to NEXTAUTH_URL's origin.
 * Without --apply it's a dry run that prints the current and new policy. With --apply
 * it replaces the bucket's CORS policy.
 *
 * Like the other scripts, this targets GOOGLE_CLOUD_STORAGE_RESUME_BUCKET_TEST unless
 * NODE_ENV=production, matching which bucket src/lib/uploads/gcs.ts uploads to.
 */
import { Storage } from "@google-cloud/storage";

function parseArgs(): { origins: string[]; apply: boolean } {
  const args = Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, value] = arg.replace(/^--/, "").split("=");
      return [key, value ?? "true"];
    }),
  );

  const rawOrigins =
    args.origins ??
    (process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).origin : "");
  const origins = rawOrigins
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
  if (origins.length === 0) {
    throw new Error("Pass --origins=<origin>[,<origin>...] or set NEXTAUTH_URL.");
  }

  return { origins, apply: args.apply === "true" };
}

async function main(): Promise<void> {
  const { origins, apply } = parseArgs();

  const bucketName =
    process.env.NODE_ENV === "production"
      ? process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET
      : process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET_TEST;
  if (!bucketName || !process.env.GOOGLE_CLOUD_PROJECT_ID) {
    throw new Error("Missing GCS env vars");
  }

  const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_CLOUD_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
  });
  const bucket = storage.bucket(bucketName);

  const cors = [
    {
      origin: origins,
      // PUT for the signed upload, GET/HEAD for signed download previews.
      method: ["PUT", "GET", "HEAD"],
      // FileUpload sets Content-Type on the PUT, so it has to be allowed in preflight.
      responseHeader: ["Content-Type"],
      maxAgeSeconds: 3600,
    },
  ];

  const [metadata] = await bucket.getMetadata();
  console.log(`Bucket: ${bucketName}`);
  console.log("Current CORS:", JSON.stringify(metadata.cors ?? null, null, 2));
  console.log("New CORS:", JSON.stringify(cors, null, 2));

  if (!apply) {
    console.log("Dry run — re-run with --apply to write this policy.");
    return;
  }

  await bucket.setCorsConfiguration(cors);
  console.log("CORS policy updated.");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
