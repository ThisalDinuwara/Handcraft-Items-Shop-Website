import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Heart, Star, Mail, Phone, MapPin } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import ProductGrid from './components/ProductGrid';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartModal from './components/CartModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import OrdersModal from './components/OrdersModal';
import CustomOrderModal from './components/CustomOrderModal';
import SearchModal from './components/SearchModal';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showCustomOrder, setShowCustomOrder] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Close modals on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setShowCart(false);
        setShowAuth(false);
        setShowCheckout(false);
        setShowOrders(false);
        setShowCustomOrder(false);
        setShowSearch(false);
      }
    };

    const handleClickOutside = (e) => {
      // Close dropdowns when clicking outside
      if (!e.target.closest('.search-dropdown')) {
        // This will be handled by the Header component
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <Header 
              onCartClick={() => setShowCart(true)}
              onAuthClick={() => setShowAuth(true)}
              onOrdersClick={() => setShowOrders(true)}
              onCustomOrderClick={() => setShowCustomOrder(true)}
              onSearchClick={() => setShowSearch(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <Hero />
            
            <FeaturedCollections />
            
            <ProductGrid 
              onProductClick={setSelectedProduct} 
              searchQuery={searchQuery}
            />
            
            <Newsletter />
            
            <Footer />

            {/* Modals */}
            {showSearch && (
              <SearchModal 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClose={() => setShowSearch(false)}
                onProductClick={(product) => {
                  setSelectedProduct(product);
                  setShowSearch(false);
                }}
              />
            )}
            
            {selectedProduct && (
              <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)}
              />
            )}
            
            {showCart && (
              <CartModal 
                onClose={() => setShowCart(false)}
                onCheckout={() => {
                  setShowCart(false);
                  setShowCheckout(true);
                }}
                onAuthRequired={() => {
                  setShowCart(false);
                  setShowAuth(true);
                  setAuthMode('login');
                }}
              />
            )}
            
            {showAuth && (
              <AuthModal 
                mode={authMode}
                onClose={() => setShowAuth(false)}
                onModeSwitch={(mode) => setAuthMode(mode)}
                onSuccess={() => {
                  setShowAuth(false);
                  if (authMode === 'login') {
                    setShowCheckout(true);
                  }
                }}
              />
            )}
            
            {showCheckout && (
              <CheckoutModal 
                onClose={() => setShowCheckout(false)}
              />
            )}
            
            {showOrders && (
              <OrdersModal 
                onClose={() => setShowOrders(false)}
              />
            )}
            
            {showCustomOrder && (
              <CustomOrderModal 
                onClose={() => setShowCustomOrder(false)}
              />
            )}
          </div>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;