import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setSelectedCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  resetFilters
} from '../store/slices/productsSlice';
import { setCurrentTab } from '../store/slices/uiSlice';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import {
  ShoppingBag,
  SlidersHorizontal,
  Star,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ShopViewProps {
  categoryTitle?: string;
  categoryKey?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({ categoryTitle, categoryKey }) => {
  const dispatch = useAppDispatch();
  const { items: allProducts, selectedCategory, priceRange, minRating, sortBy } = useAppSelector(state => state.products);

  const currentCat = categoryKey || selectedCategory || 'all';

  // Category counts
  const categoryCounts: Record<string, number> = {
    all: allProducts.length,
    men: allProducts.filter(p => p.category === 'men').length,
    women: allProducts.filter(p => p.category === 'women').length,
    kids: allProducts.filter(p => p.category === 'kids').length,
    footwear: allProducts.filter(p => p.category === 'footwear').length,
    accessories: allProducts.filter(p => p.category === 'accessories').length
  };

  // Filter products
  let filteredProducts = allProducts.filter(p => {
    if (currentCat !== 'all' && p.category !== currentCat) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (minRating > 0 && p.rating < minRating) return false;
    return true;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'offers') {
    filteredProducts.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
  }

  // Recommendations from other categories
  const otherCategoryProducts = allProducts.filter(p => currentCat !== 'all' ? p.category !== currentCat : true).slice(0, 10);

  const displayTitle = categoryTitle || (currentCat === 'all' ? 'Explore Our Collection' : currentCat.charAt(0).toUpperCase() + currentCat.slice(1));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner (Screenshot Match: Solid Green Banner with Breadcrumbs & Title) */}
      <div className="bg-emerald-700 dark:bg-emerald-800 text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-emerald-100 font-semibold mb-1">
              Home / Shop {currentCat !== 'all' && `/ ${displayTitle}`}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {displayTitle}
              </h1>
            </div>
          </div>

          {/* Quick Category Buttons in Header (Screenshot Match) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['men', 'women', 'kids', 'footwear'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  dispatch(setSelectedCategory(cat));
                  dispatch(setCurrentTab(cat as any));
                }}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentCat === cat
                    ? 'bg-white text-emerald-800 shadow-md font-extrabold'
                    : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-600 border border-emerald-500/40'
                }`}
              >
                <ShoppingBag className="w-3 h-3" />
                <span className="capitalize">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left Sidebar Filter (Screenshot Match) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>Filters</span>
              </div>
              <button
                onClick={() => dispatch(resetFilters())}
                className="text-[11px] font-semibold text-slate-400 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Price Range Filter (Screenshot Match) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Price Range
              </label>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-bold text-slate-700 dark:text-slate-200">
                  ৳{priceRange[0]}
                </span>
                <span className="text-slate-400">-</span>
                <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-bold text-slate-700 dark:text-slate-200">
                  ৳{priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="6000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => dispatch(setPriceRange([priceRange[0], Number(e.target.value)]))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Sort By Filter (Screenshot Match) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Sort By
              </label>
              <div className="space-y-1">
                {[
                  { id: 'default', label: 'Default' },
                  { id: 'offers', label: 'Offers First' },
                  { id: 'price-low', label: 'Price: Low → High' },
                  { id: 'price-high', label: 'Price: High → Low' },
                  { id: 'rating', label: 'Highest Rated' },
                  { id: 'name', label: 'Name: A–Z' }
                ].map((sortOption) => (
                  <button
                    key={sortOption.id}
                    onClick={() => dispatch(setSortBy(sortOption.id))}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      sortBy === sortOption.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {sortOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Selection with Count (Screenshot Match) */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Categories
              </label>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'men', label: 'Men' },
                  { id: 'women', label: 'Women' },
                  { id: 'kids', label: 'Kids' },
                  { id: 'footwear', label: 'Footwear' },
                  { id: 'accessories', label: 'Accessories' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      dispatch(setSelectedCategory(cat.id));
                      if (cat.id === 'all') dispatch(setCurrentTab('shop'));
                      else if (['men', 'women', 'kids', 'footwear'].includes(cat.id)) dispatch(setCurrentTab(cat.id as any));
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      currentCat === cat.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      currentCat === cat.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}>
                      {categoryCounts[cat.id] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Rating (Screenshot Match) */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Min. Rating
              </label>
              <div className="space-y-1">
                {[4, 3, 2].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => dispatch(setMinRating(minRating === stars ? 0 : stars))}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      minRating === stars
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < stars ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">& above</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Header info */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                <strong>{filteredProducts.length}</strong> products found
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Showing results for <strong>{displayTitle}</strong></span>
              </div>
            </div>

            {/* Product Cards */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 dark:text-white">No products found</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">Try adjusting your filters or price range to find what you're looking for.</p>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-full hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} showDeleteButton={true} />
                ))}
              </div>
            )}

            {/* "You Might Also Like" Recommendation Section (Screenshot Match) */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    You Might Also Like
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Products from other categories
                  </p>
                </div>
                <button
                  onClick={() => {
                    dispatch(setSelectedCategory('all'));
                    dispatch(setCurrentTab('shop'));
                  }}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 cursor-pointer"
                >
                  <span>View all</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
                {otherCategoryProducts.map((product) => (
                  <ProductCard key={`rec-${product._id}`} product={product} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
