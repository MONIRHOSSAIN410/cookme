import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentTab } from '../store/slices/uiSlice';
import { setSelectedCategory } from '../store/slices/productsSlice';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { ThumbsUp, ArrowRight } from 'lucide-react';

interface RecommendedSectionProps {
  products: Product[];
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'top' | 'bestseller'>('featured');

  const filterTabs = [
    { id: 'featured', label: 'Featured' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'top', label: 'Top Rated' },
    { id: 'bestseller', label: 'Best Seller' }
  ] as const;

  const filteredProducts = products.filter(p => {
    if (activeTab === 'featured') return p.isFeatured || p.rating >= 4.7;
    if (activeTab === 'new') return p.isNewArrival || p.badge === 'NEW';
    if (activeTab === 'top') return p.rating >= 4.8;
    if (activeTab === 'bestseller') return p.isBestSeller || (p.ordersCount && p.ordersCount > 15);
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header (Screenshot Match) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recommended For You
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Handpicked products just for you
            </p>
          </div>
        </div>

        <button
          id="recommended-view-all-btn"
          onClick={() => {
            dispatch(setSelectedCategory('all'));
            dispatch(setCurrentTab('shop'));
          }}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors group self-start sm:self-auto"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Sub-Filter Tabs (Screenshot Match: Featured, New Arrivals, Top Rated, Best Seller) */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            id={`recommended-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Grid (Screenshot Match: 5 columns on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {filteredProducts.slice(0, 10).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};
