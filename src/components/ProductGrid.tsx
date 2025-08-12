import React, { useContext } from 'react';
import { Star, Heart, ShoppingCart, Search } from 'lucide-react';
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

interface ProductGridProps {
  onProductClick: (product: Product) => void;
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick, searchQuery = '' }) => {
  const { addItem } = useContext(CartContext);

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
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
  });

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <section id="products" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Handcrafted Products</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Each piece is carefully crafted by skilled artisans using traditional techniques and premium materials
          </p>
          {searchQuery && (
            <div className="mt-6">
              <p className="text-amber-400 text-lg">
                {filteredProducts.length > 0 
                  ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`
                  : `No products found for "${searchQuery}"`
                }
              </p>
            </div>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => onProductClick(product)}
                className="bg-slate-800 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-700/50 hover:border-amber-500/30"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay buttons */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-amber-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm hover:bg-red-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Sale badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      SALE
                    </div>
                  )}

                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">{product.category}</span>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-400 font-bold text-xl">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-slate-500 line-through text-sm">${product.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16">
            <Search className="w-20 h-20 text-slate-600 mx-auto mb-6" />
            <h3 className="text-white text-2xl font-semibold mb-3">No products found</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              We couldn't find any products matching "{searchQuery}". Try searching with different keywords.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
            <div 
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-slate-800 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-slate-700/50 hover:border-amber-500/30"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-amber-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-red-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Sale badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    SALE
                  </div>
                )}

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">{product.category}</span>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-400 font-bold text-xl">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-slate-500 line-through text-sm">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Load More Button - only show if not searching */}
        {!searchQuery && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;