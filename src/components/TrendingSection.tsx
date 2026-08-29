import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentTab } from '../store/slices/uiSlice';
import { setSelectedCategory } from '../store/slices/productsSlice';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface TrendingSectionProps {
  products: Product[];
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const trendingProducts = products.filter(p => p.isTrending || p.rating >= 4.7);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header (Screenshot Match) */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trending Now
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              What everyone's buying right now
            </p>
          </div>
        </div>

        <button
          id="trending-view-all-btn"
          onClick={() => {
            dispatch(setSelectedCategory('all'));
            dispatch(setCurrentTab('shop'));
          }}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid of 5 items on wide screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {trendingProducts.slice(0, 10).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};
