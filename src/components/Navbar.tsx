
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background border-b border-gold-500/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 text-gold-500 hover:text-gold-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Left links - visible on desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-gold-500 transition-colors">
              Accueil
            </Link>
            <Link to="/products" className="text-foreground hover:text-gold-500 transition-colors">
              Produits
            </Link>
          </div>
          
          {/* Logo - centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="font-serif font-bold text-2xl gold-text">
              NS-Parfumes
            </Link>
          </div>
          
          {/* Right links - visible on desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/cart" className="relative text-foreground hover:text-gold-500 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
          
          {/* Mobile only - cart icon */}
          <div className="md:hidden">
            <Link to="/cart" className="relative p-2 text-gold-500 hover:text-gold-400 transition-colors">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={cn(
          "md:hidden absolute left-0 w-full bg-secondary border-b border-gold-500/20 py-4 px-4 space-y-4 shadow-lg transition-transform duration-300 ease-in-out",
          isMenuOpen ? "transform translate-y-0" : "transform -translate-y-full"
        )}>
          <Link 
            to="/" 
            className="block text-foreground hover:text-gold-500 py-2"
            onClick={toggleMenu}
          >
            Accueil
          </Link>
          <Link 
            to="/products" 
            className="block text-foreground hover:text-gold-500 py-2"
            onClick={toggleMenu}
          >
            Produits
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
