
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ArrowLeft, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi, adminApi } from '../../lib/supabase';
import { Product, ProductDB, ProductCategory } from '../../types/product';

const AdminProducts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductDB>({
    name: '',
    brand: '',
    description: '',
    price: 0,
    category: 'homme',
    imageUrl: '',
    inStock: true,
    quantity: 0
  });
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: productsApi.getAll
  });
  
  const createProductMutation = useMutation({
    mutationFn: adminApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({
        title: "Produit ajouté",
        description: "Le produit a été créé avec succès.",
      });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création du produit.",
        variant: "destructive",
      });
    }
  });
  
  const updateProductMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<ProductDB> }) => 
      adminApi.updateProduct(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({
        title: "Produit mis à jour",
        description: "Le produit a été mis à jour avec succès.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du produit.",
        variant: "destructive",
      });
    }
  });
  
  const deleteProductMutation = useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du produit.",
        variant: "destructive",
      });
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price' || name === 'quantity') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      description: '',
      price: 0,
      category: 'homme',
      imageUrl: '',
      inStock: true,
      quantity: 0
    });
    setIsAdding(false);
    setIsEditing(false);
    setCurrentProduct(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentProduct) {
      updateProductMutation.mutate({
        id: currentProduct.id,
        updates: formData
      });
    } else {
      createProductMutation.mutate(formData);
    }
  };
  
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      inStock: product.inStock,
      quantity: product.quantity || 0
    });
    setIsEditing(true);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      deleteProductMutation.mutate(id);
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
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-bold">Gestion des produits</h1>
        {!isAdding && !isEditing && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-md transition-colors font-medium"
          >
            <Plus size={18} /> Ajouter un produit
          </button>
        )}
      </div>
      
      {(isAdding || isEditing) && (
        <div className="bg-secondary rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {isEditing ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
            </h2>
            <button
              onClick={resetForm}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-1">Nom du produit</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
              
              <div>
                <label htmlFor="brand" className="block mb-1">Marque</label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block mb-1">Prix (DZD)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block mb-1">Catégorie</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="imageUrl" className="block mb-1">URL de l'image</label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block mb-1">Quantité en stock</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="inStock"
                name="inStock"
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="inStock">Disponible en stock</label>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-muted rounded-md transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-600 text-black px-6 py-2 rounded-md transition-colors font-medium"
              >
                {isEditing ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-muted">
              <tr>
                <th className="text-left py-4 px-6">Produit</th>
                <th className="text-center py-4">Catégorie</th>
                <th className="text-center py-4">Prix</th>
                <th className="text-center py-4">Stock</th>
                <th className="text-right py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.category === 'homme'
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'bg-pink-500/20 text-pink-500'
                    }`}>
                      {product.category === 'homme' ? 'Homme' : 'Femme'}
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <span className="gold-text">{product.price.toLocaleString()} DZD</span>
                  </td>
                  <td className="text-center py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.inStock
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {product.inStock ? 'En stock' : 'Rupture'}
                    </span>
                  </td>
                  <td className="text-right py-4 px-6">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-500 hover:text-blue-400 transition-colors"
                        aria-label="Modifier"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            Aucun produit disponible. Ajoutez votre premier produit !
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
