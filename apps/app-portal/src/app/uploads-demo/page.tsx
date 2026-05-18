// internal demo page that mounts <FileUploaded /> so this ticket can be tested in isolation

import FileUpload from "@/components/uploads/FileUpload";
import React from "react";

export default function Page(): JSX.Element {
    return <FileUpload />;
}