
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary mt-20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-gold-500 font-medium mb-4">NS-Parfumes</h3>
            <p className="text-muted-foreground">
              Découvrez notre collection exclusive de parfums de luxe pour hommes et femmes.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gold-500 mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-gold-500 transition-colors">
                  Panier
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gold-500 mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: contact@ns-parfumes.com</li>
              <li>Téléphone: +213 XX XX XX XX</li>
              <li>Alger, Algérie</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NS-Parfumes. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="gold-text hover:text-gold-400 transition-colors">
              Instagram
            </a>
            <a href="#" className="gold-text hover:text-gold-400 transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
