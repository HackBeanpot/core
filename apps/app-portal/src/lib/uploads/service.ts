import { sanitizeFileName, validateUploadRequest } from "./validation";
import { gcsBucket } from "./gcs";
import { getDb, resolveCollectionName } from "../db";
import { Collection } from "mongodb";
import { UploadRecord } from "./types";

export class InvalidUploadError extends Error {}
export class UploadNotFoundError extends Error {}

const UPLOAD_COLLECTION = resolveCollectionName("uploads");

async function uploadCollection(): Promise<Collection<UploadRecord>> {
  const db = await getDb();
  return db.collection<UploadRecord>(UPLOAD_COLLECTION);
}

// fetches an upload's metadata (filename, mime, size) by id — used by the admin
// applicant detail view to show a real filename instead of the raw upload id.
export async function getUploadRecord(
  uploadId: string,
): Promise<UploadRecord | null> {
  const col = await uploadCollection();
  return col.findOne({ _id: uploadId });
}

// creates a signed upload url
export async function createSignedUploadUrl({
  userId,
  filename,
  mime,
  size,
}: {
  userId: string;
  filename: string;
  mime: string;
  size: number;
}): Promise<{ uploadUrl: string; uploadId: string; expiresAt: Date }> {
  const result = validateUploadRequest({ mime, size, filename });
  if (!result.ok) {
    throw new InvalidUploadError(result.error);
  }

  const uploadId = crypto.randomUUID();
  const cleanFileName = sanitizeFileName(filename);

  const path = `uploads/${userId}/${uploadId}/${cleanFileName}`;

  const expireDate = Date.now() + 15 * 60 * 1000;

  const [uploadUrl] = await gcsBucket().file(path).getSignedUrl({
    version: "v4",
    action: "write",
    expires: expireDate,
    contentType: mime,
  });

  await recordUpload({ uploadId, userId, filename, mime, size, gcsPath: path });

  return { uploadUrl, uploadId, expiresAt: new Date(expireDate) };
}

// create signed download url
export async function createSignedDownloadUrl({
  uploadId,
  requester,
}: {
  uploadId: string;
  requester: { userId: string; isAdmin: boolean };
}): Promise<{ url: string; expiresAt: Date } | null> {
  const col = await uploadCollection();
  const record = await col.findOne({ _id: uploadId });

  if (!record) {
    throw new UploadNotFoundError(`No upload found for id ${uploadId}`);
  }

  if (requester.userId !== record.userId && !requester.isAdmin) {
    return null;
  }

  const expireDate = Date.now() + 15 * 60 * 1000;

  const [url] = await gcsBucket().file(record.gcsPath).getSignedUrl({
    version: "v4",
    action: "read",
    expires: expireDate,
  });

  return { url, expiresAt: new Date(expireDate) };
}

// inserts a document into the uploads collection
export async function recordUpload({
  uploadId,
  userId,
  filename,
  mime,
  size,
  gcsPath,
}: {
  uploadId: string;
  userId: string;
  filename: string;
  mime: string;
  size: number;
  gcsPath: string;
}): Promise<void> {
  const col = await uploadCollection();

  const doc: UploadRecord = {
    _id: uploadId,
    userId,
    filename,
    mime,
    size,
    gcsPath,
    createdAt: new Date(),
  };

  await col.insertOne(doc);
}
