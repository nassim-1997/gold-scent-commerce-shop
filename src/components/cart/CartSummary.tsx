
import { Link } from 'react-router-dom';

interface CartSummaryProps {
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary = ({ totalPrice, onCheckout }: CartSummaryProps) => {
  return (
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
        onClick={onCheckout}
        className="w-full bg-gold-500 hover:bg-gold-600 text-black py-3 rounded-md transition-colors font-medium"
      >
        Passer à la commande
      </button>
    </div>
  );
};

export default CartSummary;
