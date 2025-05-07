
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-lg mx-auto">
        <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-6" />
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
        <p className="text-muted-foreground mb-6">
          Vous n'avez pas encore ajouté de produits à votre panier.
        </p>
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-md transition-colors font-medium"
        >
          Découvrir nos parfums
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
