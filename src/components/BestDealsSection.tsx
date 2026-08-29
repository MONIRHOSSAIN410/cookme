import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentTab } from '../store/slices/uiSlice';
import { setSelectedCategory } from '../store/slices/productsSlice';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

interface BestDealsSectionProps {
  products: Product[];
}

export const BestDealsSection: React.FC<BestDealsSectionProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const dealProducts = products.filter(p => p.isBestDeal || (p.discountPercentage && p.discountPercentage >= 14));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header (Screenshot Match) */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Best Deals
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Maximum savings, minimum price
            </p>
          </div>
        </div>

        <button
          id="best-deals-see-all-btn"
          onClick={() => dispatch(setCurrentTab('offers'))}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors group"
        >
          <span>See All Deals</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid with Left Vertical Banner & Right Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        
        {/* Left Side Vertical Banner (Screenshot Match) */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-amber-950 via-slate-900 to-black p-6 sm:p-7 flex flex-col justify-between text-white border border-amber-900/30 min-h-[340px] lg:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
            alt="Grocery and fresh organic lifestyle"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full backdrop-blur-xs">
              <Sparkles className="w-3 h-3" />
              LIMITED TIME
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
              Up to <span className="text-amber-400">19% OFF</span>
            </h3>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              On selected items. Featuring our top trending fashion, footwear & essentials. Don't miss out!
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              id="banner-deals-shop-now-btn"
              onClick={() => {
                dispatch(setSelectedCategory('all'));
                dispatch(setCurrentTab('offers'));
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side 3-Column Product Cards (2x3 or 2x4 on desktop) */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {dealProducts.slice(0, 6).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
