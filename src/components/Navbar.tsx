import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setCurrentTab,
  setCartDrawerOpen,
  toggleDarkMode,
  setAiChatOpen
} from '../store/slices/uiSlice';
import { setSelectedCategory, setSearchQuery } from '../store/slices/productsSlice';
import { openAuthModal, logout } from '../store/slices/authSlice';
import { ViewTab } from '../types';
import {
  Search,
  ShoppingCart,
  Moon,
  Sun,
  User,
  Tag,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  LogOut,
  ShoppingBag,
  Heart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { darkMode, currentTab } = useAppSelector(state => state.ui);
  const { items: cartItems } = useAppSelector(state => state.cart);
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const { selectedCategory, searchQuery } = useAppSelector(state => state.products);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const navLinks: { id: ViewTab; label: string; category?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop All', category: 'all' },
    { id: 'men', label: 'Men', category: 'men' },
    { id: 'women', label: 'Women', category: 'women' },
    { id: 'kids', label: 'Kids', category: 'kids' },
    { id: 'footwear', label: 'Footwear', category: 'footwear' },
    { id: 'offers', label: 'Offers & Flash Sales' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearch));
    if (currentTab !== 'shop' && currentTab !== 'men' && currentTab !== 'women' && currentTab !== 'kids' && currentTab !== 'footwear') {
      dispatch(setCurrentTab('shop'));
    }
  };

  const handleCategorySelect = (cat: string) => {
    dispatch(setSelectedCategory(cat));
    if (cat === 'all') dispatch(setCurrentTab('shop'));
    else if (['men', 'women', 'kids', 'footwear'].includes(cat)) dispatch(setCurrentTab(cat as ViewTab));
    else dispatch(setCurrentTab('shop'));
  };

  const handleNavClick = (link: { id: ViewTab; category?: string }) => {
    dispatch(setCurrentTab(link.id));
    if (link.category) {
      dispatch(setSelectedCategory(link.category));
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-emerald-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-between sm:justify-center relative">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-600 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">Free Delivery</span>
          <span>Orders over ৳2,000 get free delivery in Dhaka! Use code <strong>COOKME10</strong> for 10% OFF</span>
        </div>
        <button
          onClick={() => dispatch(setAiChatOpen(true))}
          className="hidden sm:flex items-center gap-1.5 text-xs bg-emerald-800/80 hover:bg-emerald-900 px-2.5 py-0.5 rounded-full ml-3 cursor-pointer transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Ask AI Assistant</span>
        </button>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => {
              dispatch(setCurrentTab('home'));
              dispatch(setSelectedCategory('all'));
            }}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-600 group-hover:bg-emerald-700 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-600/20 transition-all transform group-hover:scale-105">
              C
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                cook<span className="text-emerald-600 dark:text-emerald-400">me</span>
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-400 tracking-wider block font-semibold uppercase -mt-1">
                Lifestyle & Mart
              </span>
            </div>
          </button>

          {/* Search Bar with Category Select (Screenshot Match) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-2xl items-center relative rounded-full border border-emerald-500/30 bg-slate-50 dark:bg-slate-800/80 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all overflow-hidden"
          >
            <div className="relative border-r border-slate-200 dark:border-slate-700">
              <select
                aria-label="Filter products by category"
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="appearance-none bg-emerald-600 text-white font-medium text-xs py-2.5 pl-3 pr-7 cursor-pointer hover:bg-emerald-700 transition-colors focus:outline-none"
              >
                <option value="all">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="footwear">Footwear</option>
                <option value="accessories">Accessories</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <input
              type="text"
              placeholder="Search products, categories, shoes, sarees, brands..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />

            <button
              id="header-search-submit-btn"
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Offers Link */}
            <button
              id="nav-offers-btn"
              onClick={() => dispatch(setCurrentTab('offers'))}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'offers'
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Offers</span>
            </button>

            {/* AI Assistant Button */}
            <button
              id="nav-ai-assistant-btn"
              onClick={() => dispatch(setAiChatOpen(true))}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer border border-emerald-200 dark:border-emerald-800/60"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden lg:inline">AI Shopping</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => dispatch(toggleDarkMode())}
              aria-label="Toggle dark mode"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile / Login */}
            <div className="relative">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    id="user-menu-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline text-xs font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                        <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email || user.phone}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                          <span>{user.loyaltyPoints || 0} Loyalty Points</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          dispatch(setCurrentTab('dashboard'));
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>My Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          dispatch(setCurrentTab('dashboard'));
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                        <span>My Orders</span>
                      </button>

                      <button
                        onClick={() => {
                          dispatch(logout());
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 cursor-pointer border-t border-slate-100 dark:border-slate-700/60 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="nav-login-btn"
                  onClick={() => dispatch(openAuthModal('signin'))}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={() => dispatch(setCartDrawerOpen(true))}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 sm:px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer transform hover:scale-102"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                ৳{totalCartAmount.toLocaleString()}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-3 md:hidden flex items-center rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-hidden">
          <input
            type="text"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
          />
          <button type="submit" className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold">
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Subnav Navigation Links (Matches Screenshot) */}
      <nav className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 py-2 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id || (link.category && selectedCategory === link.category && currentTab === 'shop');
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link)}
                  className={`text-xs font-semibold tracking-wide whitespace-nowrap transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                dispatch(setCurrentTab('dashboard'));
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-emerald-600 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>My Account & Orders</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
