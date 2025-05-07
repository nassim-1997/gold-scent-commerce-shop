export type ProductCategory = 'homme' | 'femme';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  inStock: boolean;
  quantity?: number; // For stock management
}

export interface CartItem extends Product {
  quantity: number;
}

// Supabase Database Types
export type ProductDB = Omit<Product, 'id'> & {
  id?: string; // Optional for new products being created
  created_at?: string;
};

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_price: number;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}
