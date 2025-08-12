import React, { useContext } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

interface CartModalProps {
  onClose: () => void;
  onCheckout: () => void;
  onAuthRequired: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose, onCheckout, onAuthRequired }) => {
  const { items, total, updateQuantity, removeItem } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const handleCheckout = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    onCheckout();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (items.length === 0) {
    return (
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-slate-800 rounded-3xl max-w-md w-full p-8 border border-slate-700 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">Your cart is empty</h3>
            <p className="text-slate-400 mb-6">Discover our beautiful handcrafted items and start shopping</p>
            <button 
              onClick={onClose}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
            <span className="bg-amber-500 text-white text-sm px-2 py-1 rounded-full font-semibold">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-96 p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 bg-slate-700/50 rounded-2xl p-4 hover:bg-slate-700 transition-colors">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shadow-md"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{item.name}</h3>
                  <p className="text-amber-400 font-bold text-lg">${item.price}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-slate-600 rounded-xl">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-white hover:bg-slate-500 rounded-l-xl transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-12 text-center text-white font-semibold">{item.quantity}</span>
                    
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-white hover:bg-slate-500 rounded-r-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-xl flex items-center justify-center text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 p-6 bg-slate-800/50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-400">Total Amount</p>
              <p className="text-white text-3xl font-bold">${total.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Free shipping on orders over $50</p>
              <p className="text-green-400 text-sm font-medium">
                {total >= 50 ? '✓ Free shipping applied' : `$${(50 - total).toFixed(2)} away from free shipping`}
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>{user ? 'Proceed to Checkout' : 'Login to Checkout'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onClose}
            className="w-full mt-3 text-slate-400 hover:text-white transition-colors py-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;