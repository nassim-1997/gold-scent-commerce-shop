
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

const HomePage = () => {
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1615634260166-91c71a245005?q=80&w=2070"
            alt="NS Parfumes Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center items-start">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Découvrez l'Art de la <span className="gold-text">Parfumerie</span>
            </h1>
            <p className="text-lg mb-8 text-muted-foreground max-w-lg">
              Des parfums de luxe pour hommes et femmes, soigneusement sélectionnés pour mettre en valeur votre personnalité.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-md transition-colors font-medium"
            >
              Découvrir nos parfums <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Nos Meilleurs Parfums</h2>
          <div className="w-24 h-1 gold-gradient mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black px-6 py-3 rounded-md transition-colors font-medium"
          >
            Voir tous les produits <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Catégories</h2>
            <div className="w-24 h-1 gold-gradient mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-80 overflow-hidden rounded-lg group">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1770"
                alt="Parfums pour Homme"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-4 transform group-hover:-translate-y-2 transition-transform">
                  <h3 className="font-serif text-3xl text-white mb-4">Pour Homme</h3>
                  <Link 
                    to="/products?category=homme" 
                    className="inline-block gold-text hover:text-gold-400 transition-colors"
                  >
                    Découvrir
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 overflow-hidden rounded-lg group">
              <img
                src="https://images.unsplash.com/photo-1616486446570-0c071c3f5d2c?q=80&w=1770"
                alt="Parfums pour Femme"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center p-4 transform group-hover:-translate-y-2 transition-transform">
                  <h3 className="font-serif text-3xl text-white mb-4">Pour Femme</h3>
                  <Link 
                    to="/products?category=femme" 
                    className="inline-block gold-text hover:text-gold-400 transition-colors"
                  >
                    Découvrir
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
