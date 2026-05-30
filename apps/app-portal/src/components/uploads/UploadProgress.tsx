import { formatBytes } from "@/lib/uploads/utils";
import React from "react";

/**
 * @param transferredBytes - Number of bytes transferred so far.
 * @param totalBytes - Total file size in bytes. Progress is calculated as transferredBytes / totalBytes.
 */
interface UploadProgressProps {
  transferredBytes: number;
  totalBytes: number;
}

export default function UploadProgress({
  transferredBytes,
  totalBytes,
}: UploadProgressProps): JSX.Element {
  const progress =
    totalBytes !== 0 ? Math.round((transferredBytes / totalBytes) * 100) : 0;

  return (
    <div className="flex flex-col p-4 justify-center">
      <div className="w-full bg-heather rounded-full h-2">
        <div
          className="bg-starlightBlue h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p>{progress}%</p>
      <p>
        {formatBytes(transferredBytes)} / {formatBytes(totalBytes)}
      </p>
    </div>
  );
}
