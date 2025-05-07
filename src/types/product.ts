
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
}

export interface CartItem extends Product {
  quantity: number;
}
