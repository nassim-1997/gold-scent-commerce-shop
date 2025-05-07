
import { Trash2 } from 'lucide-react';
import { CartItem } from '@/types/product';

interface CartTableProps {
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartTable = ({ cartItems, updateQuantity, removeFromCart }: CartTableProps) => {
  return (
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
  );
};

export default CartTable;
