// createSignedUploadUrl()

import { sanitizeFileName, validateUploadRequest } from "./validation";
import { gcsBucket } from "./gcs";


export class InvalidUploadError extends Error {}

export async function createSignedUploadUrl({ userId, filename, mime, size } : { userId: string; filename: string; mime: string; size: number }): Promise<{ uploadUrl: string, uploadId: string, expiresAt: Date }> {
    const result = validateUploadRequest({mime, size, filename});
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
    })

    return { uploadUrl, uploadId, expiresAt: new Date(expireDate)}
}

// createSignedDownloadUrl()

export function createSignedDownloadUrl(): void {}

// recordUpload()

export function recordUpload(): void {}
