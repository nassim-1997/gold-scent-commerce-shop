
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

// Import the new components
import EmptyCart from '../components/cart/EmptyCart';
import CartTable from '../components/cart/CartTable';
import CartSummary from '../components/cart/CartSummary';
import CheckoutForm, { CustomerInfo } from '../components/cart/CheckoutForm';
import OrderSummary from '../components/cart/OrderSummary';
import ShoppingCartActions from '../components/cart/ShoppingCartActions';

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
    return <EmptyCart />;
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-serif text-4xl font-bold mb-8 text-center">Votre Panier</h1>
      
      {!isCheckingOut ? (
        <>
          <CartTable 
            cartItems={cartItems} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart} 
          />
          
          <div className="mt-8 flex flex-col md:flex-row justify-between">
            <ShoppingCartActions />
            
            <CartSummary 
              totalPrice={totalPrice} 
              onCheckout={() => setIsCheckingOut(true)} 
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <CheckoutForm 
            onSubmit={handleSubmitOrder}
            customerInfo={customerInfo}
            onInputChange={handleInputChange}
            onCancel={() => setIsCheckingOut(false)}
          />
          
          <OrderSummary 
            cartItems={cartItems}
            totalPrice={totalPrice}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
