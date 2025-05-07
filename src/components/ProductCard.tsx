
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  return (
    <div className="bg-secondary rounded-lg overflow-hidden card-hover">
      <Link to={`/product/${product.id}`} className="block relative group">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-background to-transparent">
          <h3 className="text-lg font-medium text-white mb-1">{product.name}</h3>
          <p className="text-sm text-gold-500">{product.brand}</p>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold gold-text">{product.price.toLocaleString()} DZD</span>
          <button
            onClick={handleAddToCart}
            className="bg-gold-500 hover:bg-gold-600 text-black p-2 rounded-full transition-colors"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
