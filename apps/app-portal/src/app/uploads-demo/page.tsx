"use client";
// internal demo page that mounts <FileUpload /> so this ticket can be tested in isolation
import FileUpload from "@/components/uploads/FileUpload";
import React, { useState } from "react";

export default function Page(): JSX.Element {
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
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
        <div>
          <p>Upload ID: {uploadId}</p>
          <p>File Name: {fileName}</p>
          <button
            onClick={async () => {
              // TODO: handle download URL response
            }}
          >
            Download file
          </button>
        </div>
      )}
    </div>
  );
}
