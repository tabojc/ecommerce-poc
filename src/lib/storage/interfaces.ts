export interface R2ListResult {
  objects: Array<{
    key: string;
    size: number;
  }>;
  truncated: boolean;
}

export interface ImageStorage {
  upload(key: string, body: ReadableStream | ArrayBuffer | Blob): Promise<void>;
  get(key: string): Promise<ArrayBuffer | null>;
  delete(key: string): Promise<void>;
  listObjects(prefix?: string, limit = 100): Promise<R2ListResult>;
}