import type { D1Database } from 'wrangler';
import type { Product, Order, OrderItem, ProductRepository, OrderRepository } from './interfaces';

export class D1ProductRepository implements ProductRepository {
  constructor(private db: D1Database) {}

  async getAll(): Promise<Product[]> {
    const result = await this.db
      .prepare('SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC')
      .all();
    return result.results as Product[];
  }

  async getById(id: number): Promise<Product | null> {
    const result = await this.db
      .prepare('SELECT * FROM products WHERE id = ? AND is_active = 1')
      .bind(id)
      .first();
    return result as Product | null;
  }

  async getByCategory(category: string): Promise<Product[]> {
    const result = await this.db
      .prepare('SELECT * FROM products WHERE category = ? AND is_active = 1 ORDER BY created_at DESC')
      .bind(category)
      .all();
    return result.results as Product[];
  }
}

export class D1OrderRepository implements OrderRepository {
  constructor(private db: D1Database) {}

  async create(data: {
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    shipping_address?: string;
    total: number;
    status?: string;
    payment_provider?: string;
    payment_id?: string;
  }): Promise<Order> {
    const status = data.status ?? 'pending';
    const result = await this.db
      .prepare(
        `INSERT INTO orders (customer_name, customer_email, customer_phone, shipping_address, total, status, payment_provider, payment_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         RETURNING *`
      )
      .bind(
        data.customer_name,
        data.customer_email,
        data.customer_phone ?? null,
        data.shipping_address ?? null,
        data.total,
        status,
        data.payment_provider ?? null,
        data.payment_id ?? null
      )
      .first();
    return result as Order;
  }

  async getItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    const result = await this.db
      .prepare('SELECT * FROM order_items WHERE order_id = ?')
      .bind(orderId)
      .all();
    return result.results as OrderItem[];
  }
}