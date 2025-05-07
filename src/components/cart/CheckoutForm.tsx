
import { useState } from 'react';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CheckoutFormProps {
  onSubmit: (e: React.FormEvent) => void;
  customerInfo: CustomerInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}

const CheckoutForm = ({ 
  onSubmit, 
  customerInfo, 
  onInputChange, 
  onCancel 
}: CheckoutFormProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Informations de livraison</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Nom complet</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={customerInfo.name}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onClick={onCancel}
            className="w-full mt-4 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black py-3 rounded-md transition-colors font-medium"
          >
            Retour au panier
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
