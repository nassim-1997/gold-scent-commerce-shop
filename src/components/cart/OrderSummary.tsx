
import { CartItem } from '@/types/product';

interface OrderSummaryProps {
  cartItems: CartItem[];
  totalPrice: number;
}

const OrderSummary = ({ cartItems, totalPrice }: OrderSummaryProps) => {
  return (
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
  );
};

export default OrderSummary;
