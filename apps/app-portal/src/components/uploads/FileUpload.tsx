"use client";
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  sanitizeFileName,
} from "@/lib/uploads/validation";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AlertCircle, UploadCloud } from "lucide-react";
import UploadProgress from "./UploadProgress";
import FilePreview from "./FilePreview";
import { formatBytes } from "@/lib/uploads/utils";

/**
 * @param description - Custom dropzone prompt text. Defaults to "Drag or drop files".
 * @param onUploadComplete - Called with (uploadId, fileName) after a successful upload.
 * @param onUploadRemoved - Called when the user removes an uploaded file.
 */
interface FileUploadProps {
  description?: string;
  onUploadComplete?: (uploadId: string, fileName: string) => void;
  onUploadRemoved?: () => void;
}

export default function FileUpload({
  description,
  onUploadComplete,
  onUploadRemoved,
}: FileUploadProps): JSX.Element {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [transferredBytes, setTransferredBytes] = useState<number>(0);
  const [totalBytes, setTotalBytes] = useState<number>(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setTransferredBytes(0);
      setTotalBytes(0);
      if (acceptedFiles.length === 0) return;
      const firstFile = acceptedFiles[0];

      const res = await fetch("/api/v1/uploads/sign", {
        method: "POST",
        body: JSON.stringify({
          filename: sanitizeFileName(firstFile.name),
          mime: firstFile.type,
          size: firstFile.size,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const { uploadId, uploadUrl } = await res.json();
      if (isMockUrl(uploadUrl)) {
        // fake response
        const INTERVAL_MS = 200;
        const CHUNKS = 20;
        const chunkSize = Math.ceil(firstFile.size / CHUNKS);

        const interval = setInterval(() => {
          setTransferredBytes((prev) => {
            const next = Math.min(prev + chunkSize, firstFile.size);
            if (next >= firstFile.size) {
              clearInterval(interval);
              setIsUploading(false);
              setUploadedFile(firstFile);
              onUploadComplete?.(uploadId, firstFile.name);
            }
            return next;
          });
        }, INTERVAL_MS);

        setIsUploading(true);
        setTotalBytes(firstFile.size);
      } else {
        setIsUploading(true);
        setTotalBytes(firstFile.size);

        try {
          await new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", uploadUrl);
            xhr.setRequestHeader("Content-Type", firstFile.type);

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) setTransferredBytes(e.loaded);
            };

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve();
              } else {
                reject(new Error(`Upload failed with status ${xhr.status}`));
              }
            };

            xhr.onerror = () => reject(new Error("Upload failed"));

            xhr.send(firstFile);
          });

          setTransferredBytes(firstFile.size);
          setIsUploading(false);
          setUploadedFile(firstFile);
          onUploadComplete?.(uploadId, firstFile.name);
        } catch {
          setIsUploading(false);
          // error to user here
          return;
        }
      }
    },
    [onUploadComplete],
  );

  function isMockUrl(url: string): boolean {
    return !!url && !url.startsWith("https://storage.googleapis.com");
  }

  const accept = Object.fromEntries(
    ALLOWED_MIME_TYPES.map((mime) => [mime, []]),
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections, open } =
    useDropzone({
      onDrop,
      accept,
      maxSize: MAX_FILE_SIZE_BYTES,
      multiple: false,
      disabled: isUploading,
    });

  const errorMessages = fileRejections.flatMap(({ errors }) =>
    errors.map((e) => {
      if (e.code === "file-too-large") return "File exceeds 5 MB limit.";
      if (e.code === "file-invalid-type")
        return "Only PDF, PNG, and JPEG files are accepted.";
      return e.message;
    }),
  );

  return (
    <div className="p-8">
      {uploadedFile === null && !isUploading && (
        <div
          {...getRootProps()}
          className={cn(
            "w-full max-w-md border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
            "flex flex-col items-center justify-center text-center",
            "hover:border-lightBrown",
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : fileRejections.length > 0
                ? "border-firecrackerRed bg-firecrackerRed/10"
                : "border-heather",
          )}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : fileRejections.length > 0 ? (
            <p>
              There has been an error in uploading your file. Please try again.
            </p>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud className="h-10 w-10 mb-3 text-gray-400" />
              <p className="text-sm text-gray-600">
                {description ?? "Drag or drop files"}
                {", or "}
                <span className="text-startLightBlue cursor-pointer font-bold">
                  Click to browse
                </span>
              </p>
            </div>
          )}
          {errorMessages.length > 0 && (
            <ul className="text-red-600 text-sm mt-2">
              {errorMessages.map((msg, i) => (
                <li key={i} className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {msg}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-gray-400 mt-2">
            PDF, PNG, JPEG up to {formatBytes(MAX_FILE_SIZE_BYTES)}
          </p>
        </div>
      )}
      {isUploading && (
        <UploadProgress
          transferredBytes={transferredBytes}
          totalBytes={totalBytes}
        />
      )}
      {!isUploading && uploadedFile !== null && (
        <FilePreview
          fileName={uploadedFile.name}
          fileSize={uploadedFile.size}
          mimeType={uploadedFile.type}
          onRemove={() => {
            setUploadedFile(null);
            setTransferredBytes(0);
            setTotalBytes(0);
            onUploadRemoved?.();
          }}
          onReplace={() => {
            setUploadedFile(null);
            setTransferredBytes(0);
            setTotalBytes(0);
            open();
          }}
        />
      )}
    </div>
  );
}
