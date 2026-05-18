// GCS client singleton; bucket config

import { Storage, Bucket } from "@google-cloud/storage";

class GCSClient {
  private static instance: GCSClient;
  private storage: Storage;
  private bucket: Bucket;

  private constructor() {
    this.storage = new Storage();
    this.bucket = this.storage.bucket("");
  }

  public static getInstance(): GCSClient {
    if (!GCSClient.instance) {
      GCSClient.instance = new GCSClient();
    }
    return GCSClient.instance;
  }

  public getBucket(): Bucket {
    return this.bucket;
  }
}

export const gcsBucket = GCSClient.getInstance().getBucket();
