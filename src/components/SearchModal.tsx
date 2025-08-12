import React, { useContext, useState, useEffect } from 'react';
import { X, Search, Star, ShoppingCart, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
  description?: string;
}

interface SearchModalProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ 
  searchQuery, 
  onSearchChange, 
  onClose, 
  onProductClick 
}) => {
  const { addItem } = useContext(CartContext);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Handcrafted Ceramic Vase",
      price: 129,
      originalPrice: 159,
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.8,
      category: "Pottery",
      description: "Beautiful handcrafted ceramic vase with unique glazing"
    },
    {
      id: 2,
      name: "Woven Basket Set",
      price: 45,
      image: "https://images.pexels.com/photos/4992748/pexels-photo-4992748.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.6,
      category: "Textiles",
      description: "Set of 3 handwoven baskets perfect for storage"
    },
    {
      id: 3,
      name: "Wooden Jewelry Box",
      price: 89,
      image: "https://images.pexels.com/photos/6292309/pexels-photo-6292309.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.9,
      category: "Woodwork",
      description: "Elegant wooden jewelry box with velvet interior"
    },
    {
      id: 4,
      name: "Silver Pendant Necklace",
      price: 165,
      originalPrice: 199,
      image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 5.0,
      category: "Jewelry",
      description: "Handcrafted silver pendant with intricate design"
    },
    {
      id: 5,
      name: "Leather Messenger Bag",
      price: 245,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.7,
      category: "Leather",
      description: "Premium leather messenger bag with brass hardware"
    },
    {
      id: 6,
      name: "Hand-painted Ceramic Mug",
      price: 28,
      image: "https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.5,
      category: "Pottery",
      description: "Unique hand-painted ceramic mug, dishwasher safe"
    },
    {
      id: 7,
      name: "Macrame Wall Hanging",
      price: 78,
      image: "https://images.pexels.com/photos/6333409/pexels-photo-6333409.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.8,
      category: "Textiles",
      description: "Bohemian macrame wall hanging in natural cotton"
    },
    {
      id: 8,
      name: "Brass Candle Holders",
      price: 95,
      originalPrice: 120,
      image: "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.6,
      category: "Metal",
      description: "Set of 3 handcrafted brass candle holders"
    }
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    if (!searchQuery.trim()) return false;
    
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });

  const popularSearches = ["pottery", "jewelry", "textiles", "wooden", "handmade", "ceramic"];

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleSearch = (query: string) => {
    onSearchChange(query);
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-slate-700 shadow-2xl">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search handcrafted items..."
                className="w-full bg-slate-700 border border-slate-600 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-lg"
                autoFocus
              />
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-120px)] p-6">
          {searchQuery.trim() ? (
            filteredProducts.length > 0 ? (
              <div>
                <h3 className="text-white font-semibold mb-4">
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </h3>
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => onProductClick(product)}
                      className="flex items-center space-x-4 bg-slate-700/50 rounded-2xl p-4 hover:bg-slate-700 transition-colors cursor-pointer group"
                    >
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold truncate group-hover:text-amber-400 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-slate-400 text-sm truncate">{product.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">
                            {product.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-slate-400 text-xs">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-amber-400 font-bold">${product.price}</div>
                          {product.originalPrice && (
                            <div className="text-slate-500 line-through text-sm">${product.originalPrice}</div>
                          )}
                        </div>
                        
                        <button 
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-10 h-10 bg-amber-500 hover:bg-amber-600 rounded-xl flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">No products found</h3>
                <p className="text-slate-400">
                  Try searching with different keywords or browse our categories
                </p>
              </div>
            )
          ) : (
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-white font-semibold mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-400 hover:text-amber-300 px-4 py-2 rounded-lg text-sm transition-all border border-amber-500/30"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;