export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  image_r2_key: string | null;
  category: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string | null;
  total: number;
  status: string;
  payment_provider: string | null;
  payment_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  getByCategory(category: string): Promise<Product[]>;
}

export interface OrderRepository {
  create(data: {
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    shipping_address?: string;
    total: number;
    status?: string;
    payment_provider?: string;
    payment_id?: string;
  }): Promise<Order>;
  getItemsByOrderId(orderId: number): Promise<OrderItem[]>;
}
