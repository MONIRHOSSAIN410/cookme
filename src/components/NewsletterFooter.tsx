import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentTab, setDashboardTab, showToast } from '../store/slices/uiSlice';
import { setSelectedCategory } from '../store/slices/productsSlice';
import {
  Mail,
  Send,
  Smartphone,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Heart,
  ChevronRight
} from 'lucide-react';

export const NewsletterFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    dispatch(showToast('Subscribed to CookMe Newsletter! Use coupon COOKME10 for 10% off.'));
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      
      {/* Top Banner Ribbon: Newsletter + Download App (Screenshot Match) */}
      <div className="bg-emerald-800 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-700/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Newsletter Box */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>STAY IN TOUCH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              SUBSCRIBE TO OUR NEWSLETTER
            </h2>
            <p className="text-xs text-emerald-100 font-medium max-w-md">
              Get exclusive promo drops, seasonal sales, and <strong>10% off</strong> your first order with voucher.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md pt-1">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 backdrop-blur-xs text-white placeholder-emerald-200/70 px-4 py-2.5 rounded-xl border border-white/20 text-xs focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-md"
              >
                <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Download App Box */}
          <div className="space-y-3 lg:border-l lg:border-emerald-700/80 lg:pl-8">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <Smartphone className="w-4 h-4" />
              <span>MOBILE EXPERIENCE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              DOWNLOAD OUR NEW APP TODAY!
            </h2>
            <p className="text-xs text-emerald-100 font-medium max-w-md">
              Shop on the go with faster checkouts, instant notifications and app-only discounts.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => dispatch(showToast('CookMe iOS App is coming soon on App Store!'))}
                className="bg-black/70 hover:bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-white/15 cursor-pointer transition-colors text-left"
              >
                <div className="text-lg font-black leading-none"></div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">Download on</span>
                  <span className="text-xs font-bold leading-tight">App Store</span>
                </div>
              </button>

              <button
                onClick={() => dispatch(showToast('CookMe Android App is coming soon on Google Play!'))}
                className="bg-black/70 hover:bg-black text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-white/15 cursor-pointer transition-colors text-left"
              >
                <div className="text-emerald-400 text-base font-black">▶</div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase">GET IT ON</span>
                  <span className="text-xs font-bold leading-tight">Google Play</span>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                C
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                cook<span className="text-emerald-400">me</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              CookMe is Bangladesh's favourite e-commerce lifestyle destination for organic fashion, premium footwear, festive collections & daily essentials.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>📍 Level 4, Banani Super Complex, Dhaka-1213</p>
              <p>📞 +880 1871-234567 • ✉️ support@cookme.com</p>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Shop Collections
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => dispatch(setCurrentTab('men'))}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Men's Fashion
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(setCurrentTab('women'))}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Women's Sarees & Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(setCurrentTab('kids'))}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Kids Streetwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(setCurrentTab('footwear'))}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Footwear & Sneakers
                </button>
              </li>
              <li>
                <button
                  onClick={() => dispatch(setCurrentTab('offers'))}
                  className="hover:text-amber-400 transition-colors font-bold cursor-pointer"
                >
                  Flash Sales & Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Account Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Customer Account
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    dispatch(setDashboardTab('overview'));
                    dispatch(setCurrentTab('dashboard'));
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  My Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(setDashboardTab('orders'));
                    dispatch(setCurrentTab('dashboard'));
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  My Orders & Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(setDashboardTab('track'));
                    dispatch(setCurrentTab('dashboard'));
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Track an Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(setDashboardTab('wishlist'));
                    dispatch(setCurrentTab('dashboard'));
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  My Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    dispatch(setDashboardTab('loyalty'));
                    dispatch(setCurrentTab('dashboard'));
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Loyalty Points (120 pts)
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Help */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Support & Security
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inside Dhaka (৳60) / Nationwide (৳120)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>7 Days Hassle-Free Returns</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Secure Checkout</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 AI Shopping Assistant</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Methods & Bottom Bar (Screenshot Match) */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CookMe Lifestyle Mart. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">We Accept:</span>
            <span className="bg-slate-800 text-pink-400 px-2 py-0.5 rounded font-black text-[10px] border border-slate-700">bKash</span>
            <span className="bg-slate-800 text-orange-400 px-2 py-0.5 rounded font-black text-[10px] border border-slate-700">Nagad</span>
            <span className="bg-slate-800 text-purple-400 px-2 py-0.5 rounded font-black text-[10px] border border-slate-700">Rocket</span>
            <span className="bg-slate-800 text-blue-400 px-2 py-0.5 rounded font-black text-[10px] border border-slate-700">VISA</span>
            <span className="bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-black text-[10px] border border-slate-700">Mastercard</span>
            <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-black text-[10px] border border-slate-700">COD</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
