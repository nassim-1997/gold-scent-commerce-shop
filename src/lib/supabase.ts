
import { createClient } from '@supabase/supabase-js';
import { ProductDB, Product, Order } from '../types/product';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Products API
export const productsApi = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    return data as Product[];
  },
  
  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      return null;
    }
    
    return data as Product;
  },
  
  async getByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching products with category ${category}:`, error);
      return [];
    }
    
    return data as Product[];
  },
  
  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`);
    
    if (error) {
      console.error(`Error searching products with query ${query}:`, error);
      return [];
    }
    
    return data as Product[];
  }
};

// Orders API
export const ordersApi = {
  async createOrder(order: Order): Promise<{ success: boolean; order?: Order; error?: string }> {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, order: data as Order };
  },
  
  async getOrdersByEmail(email: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching orders for email ${email}:`, error);
      return [];
    }
    
    return data as Order[];
  },

  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all orders:', error);
      return [];
    }
    
    return data as Order[];
  }
};

// Admin API - Protected with RLS policies in Supabase
export const adminApi = {
  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all orders:', error);
      return [];
    }
    
    return data as Order[];
  },
  
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
    
    if (error) {
      console.error(`Error updating order ${orderId} status:`, error);
      return false;
    }
    
    return true;
  },
  
  async createProduct(product: ProductDB): Promise<{ success: boolean; product?: Product; error?: string }> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, product: data as Product };
  },
  
  async updateProduct(id: string, updates: Partial<ProductDB>): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error(`Error updating product ${id}:`, error);
      return false;
    }
    
    return true;
  },
  
  async deleteProduct(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting product ${id}:`, error);
      return false;
    }
    
    return true;
  }
};
