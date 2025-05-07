
import { Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi, adminApi } from '../../lib/supabase';
import { Order } from '../../types/product';

const AdminOrders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: ordersApi.getAllOrders
  });
  
  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: Order['status'] }) => 
      adminApi.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut de la commande a été mis à jour avec succès.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut.",
        variant: "destructive",
      });
    }
  });
  
  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateStatusMutation.mutate({ orderId, status });
  };
  
  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'processing':
        return 'bg-blue-500/20 text-blue-500';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-500';
      case 'delivered':
        return 'bg-green-500/20 text-green-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <Link 
        to="/admin" 
        className="inline-flex items-center gap-2 mb-8 text-gold-500 hover:text-gold-400 transition-colors"
      >
        <ArrowLeft size={18} /> Retour au tableau de bord
      </Link>
      
      <h1 className="font-serif text-3xl font-bold mb-8">Gestion des commandes</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-secondary rounded-lg overflow-hidden">
              <div className="bg-background p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">Commande #{order.id?.substring(0, 8)}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at || '').toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-right">Total</p>
                      <p className="font-bold gold-text text-lg">{order.total_price.toLocaleString()} DZD</p>
                    </div>
                    
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id || '', e.target.value as Order['status'])}
                      className="p-2 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
                    >
                      <option value="pending">En attente</option>
                      <option value="processing">En traitement</option>
                      <option value="shipped">Expédié</option>
                      <option value="delivered">Livré</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-medium mb-4">Informations client</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Nom</p>
                    <p>{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{order.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p>{order.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p>{order.customer_address}</p>
                  </div>
                </div>
                
                <h4 className="font-medium mb-4">Produits commandés</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-muted">
                      <tr>
                        <th className="text-left py-2">Produit</th>
                        <th className="text-center py-2">Quantité</th>
                        <th className="text-right py-2">Prix</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted">
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Package size={18} className="text-muted-foreground" />
                              <span>Produit #{item.product_id.substring(0, 8)}</span>
                            </div>
                          </td>
                          <td className="text-center py-3">{item.quantity}</td>
                          <td className="text-right py-3 gold-text">
                            {(item.price * item.quantity).toLocaleString()} DZD
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-muted">
                      <tr>
                        <td colSpan={2} className="text-right py-3 font-bold">Total</td>
                        <td className="text-right py-3 font-bold gold-text">
                          {order.total_price.toLocaleString()} DZD
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            Aucune commande disponible.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
