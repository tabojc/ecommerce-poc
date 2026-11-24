import { env } from 'cloudflare:workers';
import { D1ProductRepository } from '../../../lib/db/d1';

export async function GET() {
  try {
    const repo = new D1ProductRepository(env.DB);
    const products = await repo.getAll();

    return new Response(
      JSON.stringify({ products }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to fetch products',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}