import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { TrendingUp, Sparkles } from 'lucide-react';

interface BestSellersAndNewArrivalsProps {
  products: Product[];
}

export const BestSellersAndNewArrivals: React.FC<BestSellersAndNewArrivalsProps> = ({ products }) => {
  const bestSellers = products.filter(p => p.isBestSeller || p.badge === 'HOT').slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival || p.badge === 'NEW').slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Best Sellers Section */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Our most popular products right now
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              New Arrivals
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fresh products just added to our collection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
          {newArrivals.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
