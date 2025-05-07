
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { products } from '../data/products';
import { Product, ProductCategory } from '../types/product';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    const category = searchParams.get('category') as ProductCategory | null;
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);
  
  useEffect(() => {
    let result = products;
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);
  
  const handleCategoryChange = (category: ProductCategory | 'all') => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-serif text-4xl font-bold mb-8 text-center">Nos Parfums</h1>
      
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="relative w-full lg:w-1/3">
          <input
            type="text"
            placeholder="Rechercher un parfum..."
            className="w-full pl-10 py-2 pr-4 bg-secondary border border-muted rounded-md focus:outline-none focus:border-gold-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
        
        <div className="flex items-center space-x-2 w-full lg:w-auto">
          <button 
            onClick={toggleFilter}
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-muted rounded-md"
          >
            <Filter size={18} /> Filtres
          </button>
          
          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'all'
                  ? 'bg-gold-500 text-black'
                  : 'bg-secondary text-foreground'
              }`}
              onClick={() => handleCategoryChange('all')}
            >
              Tous
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'homme'
                  ? 'bg-gold-500 text-black'
                  : 'bg-secondary text-foreground'
              }`}
              onClick={() => handleCategoryChange('homme')}
            >
              Homme
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                selectedCategory === 'femme'
                  ? 'bg-gold-500 text-black'
                  : 'bg-secondary text-foreground'
              }`}
              onClick={() => handleCategoryChange('femme')}
            >
              Femme
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters */}
      {isFilterOpen && (
        <div className="lg:hidden flex flex-wrap gap-2 mb-6 p-4 bg-secondary rounded-md">
          <button
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'all'
                ? 'bg-gold-500 text-black'
                : 'bg-muted text-foreground'
            }`}
            onClick={() => handleCategoryChange('all')}
          >
            Tous
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'homme'
                ? 'bg-gold-500 text-black'
                : 'bg-muted text-foreground'
            }`}
            onClick={() => handleCategoryChange('homme')}
          >
            Homme
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              selectedCategory === 'femme'
                ? 'bg-gold-500 text-black'
                : 'bg-muted text-foreground'
            }`}
            onClick={() => handleCategoryChange('femme')}
          >
            Femme
          </button>
        </div>
      )}
      
      {/* Results */}
      {filteredProducts.length > 0 ? (
        <>
          <p className="mb-6 text-muted-foreground">
            {filteredProducts.length} produits trouvés
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            Aucun produit trouvé pour votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
