import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { addReview } from '../store/slices/productsSlice';
import { setQuickViewProduct, setCartDrawerOpen, setCurrentTab, showToast } from '../store/slices/uiSlice';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import {
  X,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Heart,
  Share2,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { items: allProducts } = useAppSelector(state => state.products);
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState<'Inside Dhaka' | 'Outside Dhaka'>('Inside Dhaka');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  
  // Review form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newUserName, setNewUserName] = useState(user?.name || '');

  // Interactive Zoom Lens
  const [zoomStyle, setZoomStyle] = useState<{ display: string; backgroundPosition: string; backgroundSize: string }>({
    display: 'none',
    backgroundPosition: '0% 0%',
    backgroundSize: '200%'
  });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const isWishlisted = wishlistItems.some(p => p._id === product._id);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const activeImage = gallery[selectedImageIndex] || product.image;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '220%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle(prev => ({ ...prev, display: 'none' }));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    dispatch(showToast(`Added ${quantity} x ${product.name} to cart!`));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity }));
    dispatch(setQuickViewProduct(null));
    dispatch(setCartDrawerOpen(true));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    dispatch(addReview({
      productId: product._id,
      rating: newRating,
      comment: newComment,
      userName: newUserName || 'Guest Customer',
      userId: user?._id || 'guest-' + Date.now()
    }));
    setNewComment('');
    dispatch(showToast('Review submitted successfully!'));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    dispatch(showToast('Product link copied to clipboard!'));
  };

  const relatedProducts = allProducts.filter(p => p.category === product.category && p._id !== product._id).slice(0, 4);

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative text-slate-800 dark:text-slate-100">
        
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={() => dispatch(setQuickViewProduct(null))}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Breadcrumb (Screenshot Match) */}
          <div className="text-xs text-slate-400 font-medium">
            <span>Home</span> / <span className="capitalize">{product.category}</span> / <span className="text-emerald-600 font-bold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Image Gallery & Zoom (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 group select-none cursor-crosshair shadow-inner"
              >
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs">
                    {product.badge}
                  </span>
                )}

                {/* Normal Image */}
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Zoom Magnifier Lens */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                  style={{
                    display: zoomStyle.display,
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: zoomStyle.backgroundPosition,
                    backgroundSize: zoomStyle.backgroundSize,
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                {/* Wishlist & Share floating triggers */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
                  <button
                    onClick={handleShare}
                    aria-label="Share product"
                    className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-emerald-600 flex items-center justify-center backdrop-blur-md shadow-md cursor-pointer transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    aria-label="Add to wishlist"
                    className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md cursor-pointer transition-colors ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: Details, Price & Actions (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  #{product.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5 leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({product.reviewCount || 0} reviews)</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-400">{product.ordersCount || 0} orders</span>
                  <span className="ml-auto text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                    {product.stock} in stock
                  </span>
                </div>
              </div>

              {/* Price Calculation (Screenshot Match) */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm line-through text-slate-400">
                      ৳{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    You save ৳{savings.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Quantity Selector & Total Box (Screenshot Match) */}
              <div className="flex items-center justify-between bg-white dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">QTY</span>
                  <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="px-2.5 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-800 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      aria-label="Increase quantity"
                      className="px-2.5 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">TOTAL</span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    ৳{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons (Screenshot Match) */}
              <div className="space-y-2.5 pt-2">
                <button
                  id="buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now</span>
                </button>

                <button
                  id="add-to-cart-modal-btn"
                  onClick={handleAddToCart}
                  className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-98 text-slate-800 dark:text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            {/* Column 3: Delivery Options & Warranty (3 Cols - Screenshot Match) */}
            <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Delivery Options
              </h3>

              {/* Inside / Outside Dhaka Toggle (Screenshot Match) */}
              <div className="space-y-2">
                <div className="flex rounded-xl bg-slate-200 dark:bg-slate-700 p-1">
                  <button
                    onClick={() => setDeliveryArea('Inside Dhaka')}
                    className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all cursor-pointer ${
                      deliveryArea === 'Inside Dhaka'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Inside Dhaka
                  </button>
                  <button
                    onClick={() => setDeliveryArea('Outside Dhaka')}
                    className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all cursor-pointer ${
                      deliveryArea === 'Outside Dhaka'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Outside Dhaka
                  </button>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white flex items-center justify-between">
                        <span>Standard Delivery</span>
                        <span className="text-emerald-600 font-extrabold">
                          {deliveryArea === 'Inside Dhaka' ? '৳60' : '৳120'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {deliveryArea === 'Inside Dhaka' ? 'Guaranteed in 24–48 hours' : 'Delivered in 3–5 working days'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-[11px]">Cash on Delivery Available</span>
                  </div>
                </div>
              </div>

              {/* Warranty & Returns */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Warranty & Returns
                </h3>
                <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <RotateCcw className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white block">7 Days Return</span>
                    <span className="text-[11px] text-slate-400">Easy return & exchange if size doesn't fit</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white block">100% Authentic</span>
                    <span className="text-[11px] text-slate-400">Verified CookMe quality guarantee</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Tabs: Description, Reviews, Shipping (Screenshot Match) */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
            <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('description')}
                className={`text-xs font-bold pb-2 transition-colors relative cursor-pointer ${
                  activeTab === 'description'
                    ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Description
                {activeTab === 'description' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs font-bold pb-2 transition-colors relative cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Reviews ({product.reviews?.length || product.reviewCount || 0})
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('shipping')}
                className={`text-xs font-bold pb-2 transition-colors relative cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Shipping & Returns
                {activeTab === 'shipping' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            </div>

            {/* Tab 1: Description */}
            {activeTab === 'description' && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-slate-400 mb-1">About this product</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-extrabold uppercase text-slate-400 mb-2">Key Highlights</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-2">
                    {product.tags.map((t, idx) => (
                      <span key={idx} className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Submit review */}
                <form onSubmit={handleReviewSubmit} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Write a Customer Review</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Your Rating:</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${star <= newRating ? 'fill-current' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="bg-white dark:bg-slate-800 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <input
                      type="text"
                      placeholder="Your review comments..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-white dark:bg-slate-800 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>

                {/* Review List */}
                <div className="space-y-3">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div key={rev._id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-slate-300'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-2">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Shipping */}
            {activeTab === 'shipping' && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <p><strong>Inside Dhaka:</strong> Delivery within 24 to 48 hours for a flat fee of ৳60.</p>
                <p><strong>Outside Dhaka:</strong> Nationwide courier delivery via Steadfast / RedX / Paperfly within 3 to 5 business days for ৳120.</p>
                <p><strong>Returns:</strong> Items can be returned within 7 days in original unworn condition with tags intact.</p>
              </div>
            )}

          </div>

          {/* Related Products Carousel / Shelf (Screenshot Match) */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">
                Related Products
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {relatedProducts.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
