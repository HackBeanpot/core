// UploadRecord

export interface UploadRecord {
    _id: string;
    userId: string;
    filename: string;
    mime: string;
    size: number;
    gcsPath: string;
    createdAt: Date;
}
