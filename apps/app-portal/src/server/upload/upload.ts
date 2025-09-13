import { Storage, SaveOptions } from '@google-cloud/storage';

/**
 * Uploads some content to a google cloud storage bucket
 * @param bucketName name of google cloud storage bucket to upload to
 * @param content content to upload
 * @param destinationFileName id for file in google cloud storage
 * @param deployed true is deployed, false if in local development. For setting google credentials
 */
async function uploadFile(
  bucketName: string,
  content: Buffer,
  fileOptions: SaveOptions,
  destinationFileName: string,
  deployed: boolean
): Promise<void> {
  let storage = new Storage();
  if (deployed) {
    storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_EMAIL,
        private_key: (process.env.GOOGLE_CLOUD_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
      },
    });
  }
  await storage
    .bucket(bucketName)
    .file(destinationFileName)
    .save(content, fileOptions)
    .catch((e) => console.error('Error while uploading to google cloud storage:', e));
}

/**
 * Uploads PDFs to the google cloud bucket assigned to resumes
 * @param content pdf data in a buffer
 * @param destinationFileName id for file in google cloud storage
 * @returns a URL to the uploaded pdf, if upload was successful
 */
export function uploadApplicantResume(
  content: Buffer,
  destinationFileName: string
): string | undefined {
  const deployed = process.env.NODE_ENV === 'production';
  let bucketName = process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET_TEST;
  if (deployed) {
    bucketName = process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET;
  }
  if (!bucketName) {
    console.log('env variable for resume upload to google cloud storage undefined!');
    return undefined;
  } else {
    const fileOptions: SaveOptions = {
      contentType: 'application/pdf',
      metadata: {
        cacheControl: 'no-store',
      },
      public: true,
    };
    uploadFile(bucketName, content, fileOptions, destinationFileName, deployed);
    return `http://${bucketName}.storage.googleapis.com/${destinationFileName}`;
  }
}
