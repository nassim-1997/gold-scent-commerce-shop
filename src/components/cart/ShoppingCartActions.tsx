
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ShoppingCartActions = () => {
  return (
    <Link 
      to="/products" 
      className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors mb-4 md:mb-0"
    >
      <ArrowLeft size={18} /> Continuer vos achats
    </Link>
  );
};

export default ShoppingCartActions;
