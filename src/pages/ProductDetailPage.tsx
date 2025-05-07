
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
        <p className="text-muted-foreground mb-6">
          Le produit que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <button 
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-md transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Retour aux produits
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Ajouté au panier",
      description: `${quantity} ${product.name} ${quantity > 1 ? 'ont été ajoutés' : 'a été ajouté'} à votre panier.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-8 text-gold-500 hover:text-gold-400 transition-colors"
      >
        <ArrowLeft size={18} /> Retour
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">{product.name}</h1>
            <p className="gold-text text-xl font-medium">{product.brand}</p>
          </div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <div>
            <p className="text-2xl font-bold gold-text">{product.price.toLocaleString()} DZD</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border border-muted rounded-md">
              <button 
                className="px-4 py-2 text-gold-500 hover:text-gold-400 transition-colors"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                className="px-4 py-2 text-gold-500 hover:text-gold-400 transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-md transition-colors font-medium"
            >
              <ShoppingCart size={18} /> Ajouter au panier
            </button>
          </div>
          
          <div className="pt-6 border-t border-muted">
            <h3 className="font-semibold mb-2">Détails du produit</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="font-medium">Catégorie:</span> {product.category === 'homme' ? 'Parfum pour homme' : 'Parfum pour femme'}</li>
              <li><span className="font-medium">Marque:</span> {product.brand}</li>
              <li><span className="font-medium">Disponibilité:</span> {product.inStock ? 'En stock' : 'Rupture de stock'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
