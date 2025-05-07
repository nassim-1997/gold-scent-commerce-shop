
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { productsApi, ordersApi } from '../../lib/supabase';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  
  const { data: products = [] } = useQuery({
    queryKey: ['admin-products'],
    queryFn: productsApi.getAll
  });
  
  const { data: orders = [] } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: ordersApi.getAllOrders
  });
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAdminEmail(user?.email || null);
    };
    
    getUser();
  }, []);
  
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès.",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-bold">Tableau de bord</h1>
        <div className="flex items-center gap-4">
          {adminEmail && <span className="text-muted-foreground">{adminEmail}</span>}
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-secondary rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gold-500/20 p-3 rounded-lg">
              <Package className="h-8 w-8 text-gold-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{products.length}</h2>
              <p className="text-muted-foreground">Produits</p>
            </div>
          </div>
          <Link 
            to="/admin/products" 
            className="text-gold-500 hover:text-gold-400 transition-colors text-sm"
          >
            Gérer les produits →
          </Link>
        </div>
        
        <div className="bg-secondary rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gold-500/20 p-3 rounded-lg">
              <ShoppingBag className="h-8 w-8 text-gold-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{orders.length}</h2>
              <p className="text-muted-foreground">Commandes</p>
            </div>
          </div>
          <Link 
            to="/admin/orders" 
            className="text-gold-500 hover:text-gold-400 transition-colors text-sm"
          >
            Gérer les commandes →
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-4">Derniers produits</h2>
          <div className="bg-secondary rounded-lg overflow-hidden">
            {products.length > 0 ? (
              <ul className="divide-y divide-muted">
                {products.slice(0, 5).map(product => (
                  <li key={product.id} className="flex items-center gap-4 p-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden">
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="gold-text">{product.price.toLocaleString()} DZD</p>
                      <p className="text-xs text-muted-foreground">
                        {product.inStock ? 'En stock' : 'Rupture de stock'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center text-muted-foreground">Aucun produit disponible</p>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Dernières commandes</h2>
          <div className="bg-secondary rounded-lg overflow-hidden">
            {orders.length > 0 ? (
              <ul className="divide-y divide-muted">
                {orders.slice(0, 5).map(order => (
                  <li key={order.id} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{order.customer_name}</h3>
                      <span className="gold-text">{order.total_price.toLocaleString()} DZD</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.created_at || '').toLocaleDateString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'pending' 
                          ? 'bg-yellow-500/20 text-yellow-500' 
                          : order.status === 'processing'
                          ? 'bg-blue-500/20 text-blue-500'
                          : order.status === 'shipped'
                          ? 'bg-purple-500/20 text-purple-500'
                          : order.status === 'delivered'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center text-muted-foreground">Aucune commande disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
