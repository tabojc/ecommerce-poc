import type { R2Bucket } from 'wrangler';
import type { ImageStorage, R2ListResult } from './interfaces';

export class R2ImageStorage implements ImageStorage {
  constructor(private bucket: R2Bucket) {}

  async upload(key: string, body: ReadableStream | ArrayBuffer | Blob): Promise<void> {
    await this.bucket.put(key, body);
  }

  async get(key: string): Promise<ArrayBuffer | null> {
    const object = await this.bucket.get(key);
    if (!object) return null;
    return object.arrayBuffer();
  }

  async delete(key: string): Promise<void> {
    await this.bucket.delete(key);
  }

  async listObjects(prefix = '', limit = 100): Promise<R2ListResult> {
    const result = await this.bucket.list({ prefix, limit });
    return {
      objects: result.objects.map((o) => ({ key: o.key, size: o.size })),
      truncated: result.truncated,
    };
  }
}