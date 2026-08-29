import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/ordersSlice';
import { setCurrentTab, setDashboardTab, showToast } from '../store/slices/uiSlice';
import { OrderItem } from '../types';
import {
  X,
  CheckCircle2,
  Truck,
  CreditCard,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { items, deliveryType, discountPercentage } = useAppSelector(state => state.cart);
  const { user } = useAppSelector(state => state.auth);

  const [fullName, setFullName] = useState(user?.name || 'Shakib Adnan');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '01871234567');
  const [shippingAddress, setShippingAddress] = useState('House #42, Road #11, Banani, Dhaka-1213');
  const [deliveryArea, setDeliveryArea] = useState<'Inside Dhaka' | 'Outside Dhaka'>(deliveryType);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bKash' | 'Nagad' | 'Card'>('COD');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{ orderNumber: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const deliveryFee = deliveryArea === 'Inside Dhaka' ? 60 : 120;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim() || !shippingAddress.trim()) {
      dispatch(showToast('Please fill all required shipping fields'));
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems: OrderItem[] = items.map(i => ({
        productId: i.product._id,
        name: i.product.name,
        image: i.product.image,
        price: i.product.price,
        quantity: i.quantity
      }));

      const res = await dispatch(createOrder({
        userId: user?._id || 'user-1',
        customerName: fullName,
        phone: phoneNumber,
        email: user?.email || 'customer@example.com',
        address: shippingAddress,
        city: deliveryArea === 'Inside Dhaka' ? 'Dhaka' : 'Outside Dhaka',
        deliveryType: deliveryArea,
        paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod,
        items: orderItems,
        subtotal,
        discount: discountAmount,
        shippingFee: deliveryFee,
        total: totalAmount,
        status: 'Processing'
      }));

      if (createOrder.fulfilled.match(res)) {
        setOrderComplete({ orderNumber: res.payload.orderNumber });
        dispatch(clearCart());
        dispatch(showToast(`Order placed successfully! #${res.payload.orderNumber}`));
      }
    } catch {
      dispatch(showToast('Failed to place order. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative text-slate-800 dark:text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {orderComplete ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Thank you for your order!
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your order <strong className="text-emerald-600 font-extrabold">#{orderComplete.orderNumber}</strong> has been successfully placed. We're getting it ready for delivery!
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  dispatch(setDashboardTab('track'));
                  dispatch(setCurrentTab('dashboard'));
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer transition-colors"
              >
                Track Order
              </button>
              <button
                onClick={() => {
                  onClose();
                  dispatch(setCurrentTab('shop'));
                }}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <span>Checkout & Order Placement</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Complete your details for fast nationwide delivery</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recipient Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Detailed Delivery Address *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Delivery Area Selection */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Delivery Region</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('Inside Dhaka')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer ${
                      deliveryArea === 'Inside Dhaka'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>Inside Dhaka</span>
                    <span>৳60</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('Outside Dhaka')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer ${
                      deliveryArea === 'Outside Dhaka'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>Outside Dhaka</span>
                    <span>৳120</span>
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Payment Method</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'COD', label: 'Cash On Delivery' },
                    { id: 'bKash', label: 'bKash' },
                    { id: 'Nagad', label: 'Nagad' },
                    { id: 'Card', label: 'Card' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer ${
                        paymentMethod === p.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Breakdown */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Delivery Fee ({deliveryArea})</span>
                <span>৳{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Grand Total</span>
                <span className="text-emerald-600 dark:text-emerald-400">৳{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Confirming Order...' : `Confirm & Place Order (৳${totalAmount.toLocaleString()})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
