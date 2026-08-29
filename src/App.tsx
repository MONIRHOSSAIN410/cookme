import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchProducts } from './store/slices/productsSlice';
import { setCartDrawerOpen, clearToast } from './store/slices/uiSlice';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { FeaturedCategories } from './components/FeaturedCategories';
import { RecommendedSection } from './components/RecommendedSection';
import { BestDealsSection } from './components/BestDealsSection';
import { TrendingSection } from './components/TrendingSection';
import { BestSellersAndNewArrivals } from './components/BestSellersAndNewArrivals';
import { OffersView } from './components/OffersView';
import { ShopView } from './components/ShopView';
import { DashboardView } from './components/DashboardView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { AiChatAssistant } from './components/AiChatAssistant';
import { NewsletterFooter } from './components/NewsletterFooter';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const dispatch = useAppDispatch();
  const { currentTab, darkMode, quickViewProduct, toastMessage } = useAppSelector(state => state.ui);
  const { items: products, loading: productsLoading } = useAppSelector(state => state.products);

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Initialize data and dark mode
  useEffect(() => {
    dispatch(fetchProducts());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dispatch, darkMode]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 right-4 sm:right-8 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 dark:border-slate-200 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Top Navigation */}
      <Navbar />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <HeroCarousel />
            <FeaturedCategories />
            <RecommendedSection products={products} />
            <BestDealsSection products={products} />
            <TrendingSection products={products} />
            <BestSellersAndNewArrivals products={products} />
          </div>
        )}

        {currentTab === 'shop' && (
          <div className="animate-in fade-in duration-300">
            <ShopView />
          </div>
        )}

        {currentTab === 'men' && (
          <div className="animate-in fade-in duration-300">
            <ShopView categoryTitle="Men's Fashion & Streetwear" categoryKey="men" />
          </div>
        )}

        {currentTab === 'women' && (
          <div className="animate-in fade-in duration-300">
            <ShopView categoryTitle="Women's Sarees, Kurtis & Dresses" categoryKey="women" />
          </div>
        )}

        {currentTab === 'kids' && (
          <div className="animate-in fade-in duration-300">
            <ShopView categoryTitle="Kids Urban Wear & Graphic Tees" categoryKey="kids" />
          </div>
        )}

        {currentTab === 'footwear' && (
          <div className="animate-in fade-in duration-300">
            <ShopView categoryTitle="Footwear, Sneakers & Casuals" categoryKey="footwear" />
          </div>
        )}

        {(currentTab === 'offers' || currentTab === 'sale') && (
          <div className="animate-in fade-in duration-300">
            <OffersView />
          </div>
        )}

        {currentTab === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            <DashboardView />
          </div>
        )}
      </main>

      {/* Footer & Newsletter Ribbon */}
      <NewsletterFooter />

      {/* Floating AI Shopping Assistant */}
      <AiChatAssistant />

      {/* Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => {
          dispatch(setCartDrawerOpen(false));
          setCheckoutModalOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />

      {/* Quick View / Full Product Modal */}
      {quickViewProduct && (
        <ProductDetailModal product={quickViewProduct} />
      )}

      {/* Authentication Modal */}
      <AuthModal />

    </div>
  );
}
