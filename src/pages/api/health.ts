import { env } from 'cloudflare:workers';
import { D1ProductRepository } from '../../lib/db/d1';
import { R2ImageStorage } from '../../lib/storage/r2';

export async function GET() {
  try {
    const db = new D1ProductRepository(env.DB);
    const products = await db.getAll();

    const storage = new R2ImageStorage(env.IMAGES_BUCKET);
    const r2Objects = await storage.listObjects();

    return new Response(
      JSON.stringify({
        status: 'ok',
        productsCount: products.length,
        r2ObjectsCount: r2Objects.objects.length,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}