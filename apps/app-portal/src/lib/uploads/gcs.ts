// GCS client singleton; bucket config
import "server-only";
import { Storage, Bucket } from "@google-cloud/storage";

class GCSClient {
  private static instance: GCSClient;
  private storage: Storage;

  private constructor() {

    const credentials = {
      client_email: process.env.GOOGLE_CLOUD_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }

    if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
      throw new Error("Missing GCS env vars");
    }

    this.storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials
    });
  }

  public static getInstance(): GCSClient {
    if (!GCSClient.instance) {
      GCSClient.instance = new GCSClient();
    }
    return GCSClient.instance;
  }

  public getBucket(): Bucket {
    if (process.env.NODE_ENV === 'production') {
      return this.storage.bucket(
        process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET!
      )
    }
    return this.storage.bucket(
      process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET_TEST!
    );
  }
}

export const gcsBucket = () => GCSClient.getInstance().getBucket();
