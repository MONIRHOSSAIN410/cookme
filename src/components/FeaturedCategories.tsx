import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentTab } from '../store/slices/uiSlice';
import { setSelectedCategory } from '../store/slices/productsSlice';
import { LayoutGrid, ArrowRight, ShoppingBag } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: number;
  image: string;
  badgeColor: string;
  accentBg: string;
}

const categories: CategoryItem[] = [
  {
    id: 'women',
    name: 'Women',
    count: 3,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
    badgeColor: 'bg-rose-500 text-white',
    accentBg: 'from-rose-950/70'
  },
  {
    id: 'kids',
    name: 'Kids',
    count: 2,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    badgeColor: 'bg-cyan-500 text-white',
    accentBg: 'from-cyan-950/70'
  },
  {
    id: 'footwear',
    name: 'Footwear',
    count: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    badgeColor: 'bg-amber-500 text-white',
    accentBg: 'from-amber-950/70'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    count: 2,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    badgeColor: 'bg-purple-600 text-white',
    accentBg: 'from-purple-950/70'
  },
  {
    id: 'men',
    name: 'Men',
    count: 4,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    badgeColor: 'bg-emerald-600 text-white',
    accentBg: 'from-emerald-950/70'
  }
];

export const FeaturedCategories: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleCategoryClick = (catId: string) => {
    dispatch(setSelectedCategory(catId));
    if (['men', 'women', 'kids', 'footwear'].includes(catId)) {
      dispatch(setCurrentTab(catId as any));
    } else {
      dispatch(setCurrentTab('shop'));
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header (Screenshot Match) */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Categories
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Browse by your favourite category
            </p>
          </div>
        </div>

        <button
          id="categories-view-all-btn"
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

      {/* Categories Grid / Horizontal Scroll */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            id={`category-card-${cat.id}`}
            onClick={() => handleCategoryClick(cat.id)}
            className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-200/80 dark:border-slate-800"
          >
            {/* Background Image with Zoom */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Top Pill with Item Count & Icon */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
              <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                {cat.count} items
              </span>
              <div className={`w-5 h-5 rounded-full ${cat.badgeColor} flex items-center justify-center shadow-xs`}>
                <ShoppingBag className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Bottom Category Info */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                {cat.name}
              </h3>
              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-300 mt-0.5 group-hover:text-white">
                <span>Shop now</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
