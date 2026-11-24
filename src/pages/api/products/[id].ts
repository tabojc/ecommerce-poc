import { env } from 'cloudflare:workers';
import { D1ProductRepository } from '../../../lib/db/d1';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Invalid product id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const repo = new D1ProductRepository(env.DB);
    const product = await repo.getById(id);

    if (!product) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Product not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ product }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to fetch product',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT({ params, request }: { params: { id: string }; request: Request }) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Invalid product id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json() as {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
      image_url?: string;
      image_r2_key?: string;
      category?: string;
      is_active?: number;
    };

    const existing = await env.DB
      .prepare('SELECT * FROM products WHERE id = ?')
      .bind(id)
      .first();

    if (!existing) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Product not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await env.DB
      .prepare(
        `UPDATE products SET
          name = ?,
          description = ?,
          price = ?,
          stock = ?,
          image_url = ?,
          image_r2_key = ?,
          category = ?,
          is_active = ?
        WHERE id = ?`
      )
      .bind(
        body.name ?? existing.name,
        body.description ?? existing.description,
        body.price ?? existing.price,
        body.stock ?? existing.stock,
        body.image_url ?? existing.image_url,
        body.image_r2_key ?? existing.image_r2_key,
        body.category ?? existing.category,
        body.is_active ?? existing.is_active,
        id
      )
      .run();

    const updated = await env.DB
      .prepare('SELECT * FROM products WHERE id = ?')
      .bind(id)
      .first();

    return new Response(
      JSON.stringify({ status: 'ok', product: updated }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to update product',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Invalid product id' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existing = await env.DB
      .prepare('SELECT * FROM products WHERE id = ?')
      .bind(id)
      .first();

    if (!existing) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Product not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Soft delete: keep order history integrity
    await env.DB
      .prepare('UPDATE products SET is_active = 0 WHERE id = ?')
      .bind(id)
      .run();

    return new Response(
      JSON.stringify({ status: 'ok', message: 'Product deactivated' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to delete product',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}