
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the order to your backend
    toast({
      title: "Commande confirmée",
      description: "Votre commande a été envoyée avec succès. Vous recevrez un email de confirmation.",
    });
    
    // Clear cart and redirect
    clearCart();
    navigate('/');
  };
  
  if (cartItems.length === 0) {
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
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-serif text-4xl font-bold mb-8 text-center">Votre Panier</h1>
      
      {!isCheckingOut ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-muted">
                <tr>
                  <th className="text-left py-4">Produit</th>
                  <th className="text-center py-4">Prix Unitaire</th>
                  <th className="text-center py-4">Quantité</th>
                  <th className="text-center py-4">Total</th>
                  <th className="text-right py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted">
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td className="py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4">
                      <span className="gold-text">{item.price.toLocaleString()} DZD</span>
                    </td>
                    <td className="text-center py-4">
                      <div className="inline-flex items-center border border-muted rounded-md">
                        <button 
                          className="px-3 py-1 text-gold-500 hover:text-gold-400 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 text-gold-500 hover:text-gold-400 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center py-4">
                      <span className="font-semibold gold-text">
                        {(item.price * item.quantity).toLocaleString()} DZD
                      </span>
                    </td>
                    <td className="text-right py-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row justify-between">
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 transition-colors mb-4 md:mb-0"
            >
              <ArrowLeft size={18} /> Continuer vos achats
            </Link>
            
            <div className="bg-secondary rounded-lg p-6 md:w-1/3">
              <h3 className="font-bold text-xl mb-4">Résumé de la commande</h3>
              <div className="flex justify-between mb-2">
                <span>Sous-total</span>
                <span>{totalPrice.toLocaleString()} DZD</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="border-t border-muted my-4 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span className="gold-text">{totalPrice.toLocaleString()} DZD</span>
              </div>
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-gold-500 hover:bg-gold-600 text-black py-3 rounded-md transition-colors font-medium"
              >
                Passer à la commande
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-4">Informations de livraison</h2>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-secondary border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-secondary border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-1">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-secondary border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block mb-1">Adresse de livraison</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-secondary border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-black py-3 rounded-md transition-colors font-medium"
                >
                  Confirmer la commande
                </button>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-full mt-4 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black py-3 rounded-md transition-colors font-medium"
                >
                  Retour au panier
                </button>
              </div>
            </form>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Résumé de votre commande</h2>
            <div className="bg-secondary rounded-lg p-6">
              <ul className="divide-y divide-muted">
                {cartItems.map(item => (
                  <li key={item.id} className="py-4 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                    </div>
                    <span className="gold-text">{(item.price * item.quantity).toLocaleString()} DZD</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-muted mt-4 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span className="gold-text">{totalPrice.toLocaleString()} DZD</span>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Mode de paiement: Paiement à la livraison</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
