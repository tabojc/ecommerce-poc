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

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name: string;
      description?: string;
      price: number;
      stock?: number;
      image_url?: string;
      image_r2_key?: string;
      category?: string;
    };

    const { name, description, price, stock, image_url, image_r2_key, category } = body;

    if (!name || price === undefined) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'name and price are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await env.DB
      .prepare(
        `INSERT INTO products (name, description, price, stock, image_url, image_r2_key, category)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         RETURNING *`
      )
      .bind(
        name,
        description || null,
        price,
        stock || 0,
        image_url || null,
        image_r2_key || null,
        category || null
      )
      .first();

    return new Response(
      JSON.stringify({ status: 'ok', product: result }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to create product',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}