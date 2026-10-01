"use client";
// internal demo page that mounts <FileUpload /> so this ticket can be tested in isolation
import FileUpload from "@/components/uploads/FileUpload";
import React, { useState } from "react";

export default function UploadsDemoClient(): JSX.Element {
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <FileUpload
        onUploadComplete={(id, fileName) => {
          setUploadId(id);
          setFileName(fileName);
        }}
        onUploadRemoved={() => {
          setUploadId(null);
          setFileName(null);
        }}
      />
      {uploadId !== null && (
        <div className="max-w-md mx-auto mt-4 p-4 border border-heather rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Upload ID:</span> {uploadId}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">File Name:</span> {fileName}
          </p>
          <button
            onClick={async () => {
              // TODO: handle download URL response
            }}
            className="mt-3 px-4 py-2 bg-starlightBlue text-white text-sm rounded-md hover:opacity-80 transition-opacity"
          >
            Download file
          </button>
        </div>
      )}
    </div>
  );
}
