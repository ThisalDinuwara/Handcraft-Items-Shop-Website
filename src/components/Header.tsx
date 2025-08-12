import React, { useContext, useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
  onOrdersClick: () => void;
  onCustomOrderClick: () => void;
  onSearchClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  onAuthClick, 
  onOrdersClick, 
  onCustomOrderClick, 
  onSearchClick,
  searchQuery,
  onSearchChange 
}) => {
  const { items } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const popularSearches = ["pottery", "jewelry", "textiles", "wooden", "handmade", "ceramic"];
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]').slice(0, 5);

  const handleSearchSelect = (query: string) => {
    onSearchChange(query);
    setShowSearchDropdown(false);
    
    // Add to recent searches
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (!recent.includes(query)) {
      const updated = [query, ...recent.slice(0, 4)];
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              CraftStyle
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-white hover:text-amber-400 transition-colors duration-200 font-medium">Home</a>
              <a href="#products" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium">Products</a>
              <a href="#collections" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium">Collections</a>
              <button 
                onClick={onCustomOrderClick}
                className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium"
              >
                Custom Orders
              </button>
              <a href="#contact" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium">Contact</a>
            </div>
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                className="p-2 text-slate-300 hover:text-white transition-colors duration-200 hover:bg-slate-800 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {showSearchDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 z-50">
                  <div className="p-4">
                    <div className="relative mb-4">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search handcrafted items..."
                        className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        autoFocus
                      />
                    </div>
                    
                    {searchQuery.trim() ? (
                      <div>
                        <button
                          onClick={() => handleSearchSelect(searchQuery)}
                          className="w-full text-left px-3 py-2 text-white hover:bg-slate-700 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Search className="w-4 h-4 text-amber-400" />
                          <span>Search for "{searchQuery}"</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentSearches.length > 0 && (
                          <div>
                            <h4 className="text-slate-400 text-sm font-medium mb-2">Recent Searches</h4>
                            <div className="space-y-1">
                              {recentSearches.map((search: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => handleSearchSelect(search)}
                                  className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors text-sm"
                                >
                                  {search}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="text-slate-400 text-sm font-medium mb-2">Popular Searches</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {popularSearches.map((search, index) => (
                              <button
                                key={index}
                                onClick={() => handleSearchSelect(search)}
                                className="text-left px-3 py-2 text-slate-300 hover:text-amber-400 hover:bg-slate-700/50 rounded-lg transition-colors text-sm border border-slate-600/50 hover:border-amber-500/30"
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
              )}
            </div>
            
            {/* Mobile search button */}
            <button 
              onClick={onSearchClick}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors duration-200 hover:bg-slate-800 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onCartClick}
              className="p-2 text-slate-300 hover:text-white transition-colors duration-200 relative hover:bg-slate-800 rounded-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="relative group">
                <button className="p-2 text-slate-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 hover:bg-slate-800 rounded-lg">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-700">
                  <button 
                    onClick={onOrdersClick}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    My Orders
                  </button>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="p-2 text-slate-300 hover:text-white transition-colors duration-200 hover:bg-slate-800 rounded-lg"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors duration-200 hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-white hover:text-amber-400 transition-colors duration-200 font-medium py-2">Home</a>
              <a href="#products" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium py-2">Products</a>
              <a href="#collections" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium py-2">Collections</a>
              <button 
                onClick={() => {
                  onCustomOrderClick();
                  setMobileMenuOpen(false);
                }}
                className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium py-2 text-left"
              >
                Custom Orders
              </button>
              <a href="#contact" className="text-slate-300 hover:text-amber-400 transition-colors duration-200 font-medium py-2">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;