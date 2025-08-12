import React, { useContext, useState } from 'react';
import { X, Star, Heart, Plus, Minus, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
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

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Product Details</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Image */}
          <div className="relative">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
            />
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-300 ${
                isWishlisted 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-red-500 hover:border-red-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl font-bold text-white mt-2 leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-3 mt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`}
                    />
                  ))}
                </div>
                <span className="text-slate-300 font-medium">({product.rating})</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400">127 reviews</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-amber-400 font-bold text-4xl">${product.price}</span>
              {product.originalPrice && (
                <span className="text-slate-500 line-through text-2xl">${product.originalPrice}</span>
              )}
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 text-lg">Description</h3>
              <p className="text-slate-300 leading-relaxed">
                {product.description || "This beautiful handcrafted piece is made with attention to detail and high-quality materials. Each item is unique and brings a touch of artisan craftsmanship to your space. Perfect for adding character and warmth to any room."}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-700/50 rounded-xl">
                <Truck className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Free Shipping</p>
                <p className="text-slate-400 text-xs">Orders over $50</p>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-xl">
                <Shield className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Authentic</p>
                <p className="text-slate-400 text-xs">Handcrafted</p>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-xl">
                <RotateCcw className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">30-Day</p>
                <p className="text-slate-400 text-xs">Returns</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-3">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-slate-700 rounded-xl">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-white hover:bg-slate-600 rounded-l-xl transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center text-white font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-white hover:bg-slate-600 rounded-r-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-slate-400">
                    Total: <span className="text-amber-400 font-bold">${(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center">
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;