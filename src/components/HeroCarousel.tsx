import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentTab } from '../store/slices/uiSlice';
import { setSelectedCategory } from '../store/slices/productsSlice';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badgeText: string;
  image: string;
  category: string;
  buttonText: string;
  highlightPrice: string;
}

const slides: Slide[] = [
  {
    id: 'slide-1',
    title: 'Kids Graphic Streetwear Edition',
    subtitle: '100% Combed Cotton Tees & Warm Hoodies for everyday lifestyle',
    tag: 'Trending Drops',
    badgeText: 'HOT OFFER -18%',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85',
    category: 'kids',
    buttonText: 'Shop Kids Collection',
    highlightPrice: 'From ৳990'
  },
  {
    id: 'slide-2',
    title: 'Urban Footwear & Casuals',
    subtitle: 'Classic silhouette white sneakers with cushioned all-day comfort',
    tag: 'Best Sellers',
    badgeText: 'SAVE 17%',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85',
    category: 'footwear',
    buttonText: 'Explore Footwear',
    highlightPrice: 'Special ৳2,490'
  },
  {
    id: 'slide-3',
    title: 'Traditional & Festive Glamour',
    subtitle: 'Exquisite Silk Sarees with intricate golden zari weave and matching pallu',
    tag: 'New Arrivals',
    badgeText: 'PREMIUM SILK',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85',
    category: 'women',
    buttonText: 'Shop Sarees',
    highlightPrice: 'From ৳3,200'
  }
];

export const HeroCarousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Autoplay timer
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    const { left, top, width, height } = carouselRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomCoords(null);
    setIsHovered(false);
  };

  const slide = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
        
        {/* Main Hero Interactive Carousel (2 Cols) */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-lg bg-slate-950 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[380px] sm:min-h-[440px] flex flex-col justify-end group select-none"
        >
          {/* Background Animated Image with Smooth Zoom */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: 1,
                scale: isHovered && zoomCoords ? 1.12 : 1.0,
                transformOrigin: zoomCoords ? `${zoomCoords.x}% ${zoomCoords.y}%` : 'center center'
              }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.88]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Slide Counter Badge (Screenshot Match: e.g. "3 / 3") */}
          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-xs">
            {currentSlide + 1} / {slides.length}
          </div>

          {/* Left / Right Navigation Arrows */}
          <button
            id="hero-carousel-prev-btn"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/10 opacity-70 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            id="hero-carousel-next-btn"
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/10 opacity-70 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Text Content & Call to Action */}
          <div className="relative z-10 p-6 sm:p-8 max-w-xl text-white">
            <motion.div
              key={`text-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
                  {slide.badgeText}
                </span>
                <span className="text-emerald-300 text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {slide.tag}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 drop-shadow-sm font-normal">
                {slide.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  id={`hero-cta-btn-${slide.category}`}
                  onClick={() => {
                    dispatch(setSelectedCategory(slide.category));
                    dispatch(setCurrentTab(slide.category as any));
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-amber-300 bg-black/40 px-3 py-2 rounded-full backdrop-blur-xs border border-white/10">
                  {slide.highlightPrice}
                </span>
              </div>
            </motion.div>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 pt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Stacked Promo Banners ("AD" match from Screenshot) */}
        <div className="flex flex-col gap-4 lg:gap-6 justify-between">
          
          {/* Top AD Banner: Men's Cotton Basics */}
          <div
            onClick={() => {
              dispatch(setSelectedCategory('men'));
              dispatch(setCurrentTab('men'));
            }}
            className="relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[16/8] sm:aspect-[16/7] lg:aspect-auto flex-1 group cursor-pointer border border-slate-200 dark:border-slate-800"
          >
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
              alt="Classic Cotton T-Shirt"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* AD Tag Badge */}
            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-white/10">
              AD
            </span>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Men's Essentials</span>
              <h2 className="text-sm sm:text-base font-bold text-white leading-tight">Classic Organic Cotton Tees</h2>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-black text-amber-300">Only ৳890</span>
                <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Bottom AD Banner: Floral Red Summer Dress */}
          <div
            onClick={() => {
              dispatch(setSelectedCategory('women'));
              dispatch(setCurrentTab('women'));
            }}
            className="relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[16/8] sm:aspect-[16/7] lg:aspect-auto flex-1 group cursor-pointer border border-slate-200 dark:border-slate-800"
          >
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
              alt="Floral Summer Red Maxi Dress"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* AD Tag Badge */}
            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-white/10">
              AD
            </span>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">Women's Collection</span>
              <h2 className="text-sm sm:text-base font-bold text-white leading-tight">Floral Summer Maxi Dresses</h2>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-black text-amber-300">৳2,450 <span className="text-[10px] line-through text-slate-300 font-normal">৳2,900</span></span>
                <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
