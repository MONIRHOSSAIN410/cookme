import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { deleteProduct } from '../store/slices/productsSlice';
import { setQuickViewProduct, showToast } from '../store/slices/uiSlice';
import { Product } from '../types';
import { Plus, Check, Heart, Eye, Trash2, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showDeleteButton?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showDeleteButton = false }) => {
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  const { items: cartItems } = useAppSelector(state => state.cart);

  const [addedAnimation, setAddedAnimation] = useState(false);
  const isWishlisted = wishlistItems.some(p => p._id === product._id);
  const cartItem = cartItems.find(item => item.product._id === product._id);
  const inCart = !!cartItem;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    setAddedAnimation(true);
    dispatch(showToast(`Added ${product.name} to cart!`));
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    dispatch(showToast(isWishlisted ? `Removed from wishlist` : `Added to wishlist!`));
  };

  const handleDeleteProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      dispatch(deleteProduct(product._id));
      dispatch(showToast(`Product deleted successfully`));
    }
  };

  const handleCardClick = () => {
    dispatch(setQuickViewProduct(product));
  };

  return (
    <div
      id={`product-card-${product._id}`}
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-slate-850 rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3">
        {/* Product Badge (Screenshot Match) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs ${
                product.badge === 'HOT'
                  ? 'bg-amber-500 text-white'
                  : product.badge === 'OFFER'
                  ? 'bg-rose-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            id={`wishlist-btn-${product._id}`}
            onClick={handleToggleWishlist}
            aria-label="Add to wishlist"
            className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md shadow-xs transition-colors cursor-pointer ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-200 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            id={`quick-view-btn-${product._id}`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setQuickViewProduct(product));
            }}
            aria-label="Quick view product"
            className="w-7 h-7 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-200 hover:text-emerald-600 flex items-center justify-center backdrop-blur-md shadow-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Image with Hover Zoom */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Stock Alert if Low */}
        {product.stock <= 10 && (
          <div className="absolute bottom-2 left-2 bg-slate-900/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              {product.rating}
            </span>
            <span className="text-[10px] text-slate-400">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Price & Action Buttons (Screenshot Match) */}
        <div className="flex items-end justify-between mt-2.5 pt-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                ৳{product.price.toLocaleString()}
              </span>
            </div>
            {product.oldPrice && (
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span className="line-through">৳{product.oldPrice.toLocaleString()}</span>
                {product.discountPercentage && (
                  <span className="text-rose-600 dark:text-rose-400 font-bold">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Delete button (Admin / Developer feature requested by prompt) */}
            {showDeleteButton && (
              <button
                id={`delete-product-btn-${product._id}`}
                onClick={handleDeleteProduct}
                title="Delete product"
                aria-label="Delete product"
                className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/60 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Quick Add To Cart Button (Screenshot Match: green rounded button with + icon) */}
            <button
              id={`quick-add-btn-${product._id}`}
              onClick={handleAddToCart}
              aria-label="Add to cart"
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-all transform active:scale-90 cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-700 scale-110'
                  : inCart
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {addedAnimation ? (
                <Check className="w-4 h-4 text-white animate-bounce" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
