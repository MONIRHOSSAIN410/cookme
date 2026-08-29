import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  removeFromCart,
  updateQuantity,
  setDeliveryType,
  applyCoupon,
  removeCoupon,
  clearCart
} from '../store/slices/cartSlice';
import { setCartDrawerOpen, setCurrentTab, showToast } from '../store/slices/uiSlice';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Check,
  Truck
} from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const dispatch = useAppDispatch();
  const { cartDrawerOpen } = useAppSelector(state => state.ui);
  const { items, deliveryType, appliedCoupon, discountPercentage } = useAppSelector(state => state.cart);

  const [couponInput, setCouponInput] = useState('');

  if (!cartDrawerOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const shippingFee = items.length > 0 ? (deliveryType === 'Inside Dhaka' ? 60 : 120) : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    dispatch(applyCoupon(couponInput));
    if (couponInput.toUpperCase() === 'COOKME10' || couponInput.toUpperCase() === 'ADNAN10') {
      dispatch(showToast('Coupon COOKME10 applied! 10% Discount'));
    } else if (couponInput.toUpperCase() === 'FLASH20') {
      dispatch(showToast('Coupon FLASH20 applied! 20% Discount'));
    } else {
      dispatch(showToast('Invalid coupon code. Try COOKME10'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 animate-in slide-in-from-right duration-300">
        
        {/* Cart Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Your Shopping Cart
              </h2>
              <p className="text-[11px] text-slate-400">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={() => dispatch(setCartDrawerOpen(false))}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Looks like you haven't added anything to your cart yet. Explore our top products!
              </p>
              <button
                onClick={() => {
                  dispatch(setCartDrawerOpen(false));
                  dispatch(setCurrentTab('shop'));
                }}
                className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md shadow-emerald-600/20"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product._id}
                className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center gap-3.5"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-white shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    ৳{item.product.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800">
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity - 1 }))}
                        aria-label="Decrease quantity"
                        className="px-2 py-0.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity + 1 }))}
                        aria-label="Increase quantity"
                        className="px-2 py-0.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Delete / Remove Button */}
                <button
                  onClick={() => {
                    dispatch(removeFromCart(item.product._id));
                    dispatch(showToast(`Removed from cart`));
                  }}
                  aria-label="Remove item"
                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-4">
            
            {/* Delivery Option Toggle */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Delivery Area</span>
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => dispatch(setDeliveryType('Inside Dhaka'))}
                  className={`py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                    deliveryType === 'Inside Dhaka'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Inside Dhaka (৳60)
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(setDeliveryType('Outside Dhaka'))}
                  className={`py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                    deliveryType === 'Outside Dhaka'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Outside Dhaka (৳120)
                </button>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon code (e.g. COOKME10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none uppercase font-semibold"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Coupon {appliedCoupon} applied (-{discountPercentage}%)
                </span>
                <button
                  onClick={() => dispatch(removeCoupon())}
                  className="text-rose-500 hover:text-rose-700 text-[10px] cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Delivery Charge ({deliveryType})</span>
                <span>৳{shippingFee}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>Total Amount</span>
                <span className="text-emerald-600 dark:text-emerald-400">৳{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="proceed-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
