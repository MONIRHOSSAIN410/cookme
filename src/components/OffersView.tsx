import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { ProductCard } from './ProductCard';
import { Zap, Flame, Tag, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const OffersView: React.FC = () => {
  const { items: products } = useAppSelector(state => state.products);
  const [activeFilter, setActiveFilter] = useState<'flash' | 'deals' | 'sellers' | 'arrivals'>('flash');

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 53, seconds: 16 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter(p => p.isFlashSale || p.discountPercentage && p.discountPercentage >= 15);
  const bestDealsProducts = products.filter(p => p.isBestDeal || p.badge === 'OFFER');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Banner (Screenshot Match) */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 max-w-xl z-10">
          <div className="text-[11px] text-slate-400 font-semibold tracking-wider">
            Home / Offers & Deals
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Offers, Deals & <span className="text-amber-400">Flash Sales</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Save big on your favourite products — limited items only!
          </p>
        </div>

        {/* Live Flash Timer Box (Screenshot Match) */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 sm:p-5 flex items-center gap-4 z-10 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap className="w-5 h-5 fill-current animate-pulse" />
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-wider block text-amber-400">FLASH SALES</span>
              <span className="text-xs font-bold text-slate-200">Ends In</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-center font-mono">
            <div className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 min-w-[42px]">
              <span className="text-lg font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[8px] text-slate-400 block uppercase">Hours</span>
            </div>
            <span className="text-amber-400 font-bold">:</span>
            <div className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 min-w-[42px]">
              <span className="text-lg font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[8px] text-slate-400 block uppercase">Mins</span>
            </div>
            <span className="text-amber-400 font-bold">:</span>
            <div className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 min-w-[42px]">
              <span className="text-lg font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[8px] text-slate-400 block uppercase">Secs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips (Screenshot Match) */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveFilter('flash')}
          className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'flash'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Flash Sale</span>
        </button>

        <button
          onClick={() => setActiveFilter('deals')}
          className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'deals'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Best Deals</span>
        </button>

        <button
          onClick={() => setActiveFilter('sellers')}
          className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'sellers'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Best Sellers</span>
        </button>

        <button
          onClick={() => setActiveFilter('arrivals')}
          className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'arrivals'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>New Arrivals</span>
        </button>
      </div>

      {/* Flash Sale Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Flash Sale
                </h2>
                <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-rose-500/30">
                  HOT
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Grab these deals before they're gone
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Deals Section */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Best Deals
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Products with the biggest price drops
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {bestDealsProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
