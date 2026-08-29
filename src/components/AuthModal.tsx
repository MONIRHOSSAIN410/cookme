import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  closeAuthModal,
  setAuthMode,
  loginUser,
  registerUser
} from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';
import {
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authModalOpen, authMode, loading, error } = useAppSelector(state => state.auth);

  const [identifier, setIdentifier] = useState('shakib@example.com');
  const [password, setPassword] = useState('123456');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signin') {
      const res = await dispatch(loginUser({ identifier, password }));
      if (loginUser.fulfilled.match(res)) {
        dispatch(showToast(`Welcome back, ${res.payload.name}!`));
      }
    } else {
      if (!fullName.trim() || !phoneNumber.trim()) {
        dispatch(showToast('Please fill all fields'));
        return;
      }
      const res = await dispatch(registerUser({
        name: fullName,
        email: identifier,
        phone: phoneNumber,
        password
      }));
      if (registerUser.fulfilled.match(res)) {
        dispatch(showToast(`Account created successfully! Welcome, ${res.payload.name}`));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          id="close-auth-modal-btn"
          onClick={() => dispatch(closeAuthModal())}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Green Banner (5 Cols - Screenshot Match) */}
        <div className="md:col-span-5 bg-emerald-700 p-6 sm:p-7 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-black text-xl shadow-md">
              C
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 block">
                WELCOME TO
              </span>
              <h2 className="text-2xl font-black text-white leading-tight">
                cookme
              </h2>
              <p className="text-xs text-emerald-100 mt-1">
                Your premier destination for curated fashion, streetwear & essentials.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>100% Authentic Products</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Fast Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>Earn Loyalty Points</span>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10 text-[11px] text-emerald-200 border-t border-emerald-600/60 mt-4">
            <span>Trusted by thousands of happy customers</span>
          </div>
        </div>

        {/* Right Form (7 Cols - Screenshot Match) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
          
          {/* Sign In / Sign Up Mode Switcher */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-5">
            <button
              id="auth-tab-signin"
              onClick={() => dispatch(setAuthMode('signin'))}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              id="auth-tab-signup"
              onClick={() => dispatch(setAuthMode('signup'))}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs p-2.5 rounded-lg border border-rose-200 dark:border-rose-900 font-medium">
                {error}
              </div>
            )}

            {/* Full Name if Register */}
            {authMode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Shakib Adnan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Email or Phone Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="yourname@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Phone Number if Register */}
            {authMode === 'signup' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="01871234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => dispatch(showToast('Password reset link sent to your email.'))}
                    className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Please wait...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Credentials */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 mb-1.5">
              Testing account: <strong className="text-slate-700 dark:text-slate-300">shakib@example.com</strong> (Pass: 123456)
            </p>
            <button
              onClick={() => {
                setIdentifier('shakib@example.com');
                setPassword('123456');
              }}
              className="text-[11px] text-emerald-600 font-bold hover:underline cursor-pointer"
            >
              Auto-fill Demo Credentials
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
