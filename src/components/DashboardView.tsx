import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setDashboardTab,
  setCurrentTab,
  showToast
} from '../store/slices/uiSlice';
import { logout } from '../store/slices/authSlice';
import { fetchOrders, deleteOrder, trackOrder } from '../store/slices/ordersSlice';
import { addToCart } from '../store/slices/cartSlice';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { DashboardTab } from '../types';
import {
  LayoutDashboard,
  ShoppingBag,
  RotateCcw,
  MapPin,
  Heart,
  Award,
  Star,
  Settings,
  Truck,
  LogOut,
  ArrowRight,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Eye,
  Plus
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { dashboardTab } = useAppSelector(state => state.ui);
  const { orders, searchedOrder } = useAppSelector(state => state.orders);
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);

  const [orderQuery, setOrderQuery] = useState('CKM-84920');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const userOrders = orders.filter(o => !user || o.userId === user._id || o.userId === 'user-1' || !o.userId);
  const totalSpent = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    dispatch(trackOrder(orderQuery.trim()));
  };

  const handleCancelOrder = (id: string, orderNum: string) => {
    if (window.confirm(`Are you sure you want to cancel order #${orderNum}?`)) {
      dispatch(deleteOrder(id));
      dispatch(showToast(`Order #${orderNum} deleted successfully`));
    }
  };

  const navMenuItems: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'track', label: 'Track an Order', icon: <Truck className="w-4 h-4" /> },
    { id: 'returns', label: 'Returns', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
    { id: 'loyalty', label: 'Loyalty Points', icon: <Award className="w-4 h-4" /> },
    { id: 'reviews', label: 'My Reviews', icon: <Star className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Profile Sidebar (Screenshot Match - 4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          {/* User Header Profile */}
          <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                {user?.name || 'shakib'}
              </h2>
              <p className="text-xs text-slate-400 truncate">
                {user?.phone || '01871234567'}
              </p>
              <span className="inline-block bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">
                Verified Member
              </span>
            </div>
          </div>

          {/* "Visit Website" Button (Screenshot Match) */}
          <button
            id="visit-website-btn"
            onClick={() => dispatch(setCurrentTab('home'))}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Sidebar Navigation Items (Screenshot Match) */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => (
              <button
                key={item.id}
                id={`dash-nav-${item.id}`}
                onClick={() => dispatch(setDashboardTab(item.id))}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  dashboardTab === item.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={dashboardTab === item.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.id === 'orders' && (
                  <span className="bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 px-2 py-0.5 rounded-full font-bold">
                    {userOrders.length}
                  </span>
                )}
                {item.id === 'wishlist' && (
                  <span className="bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 px-2 py-0.5 rounded-full font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            ))}

            {/* Logout Button */}
            <button
              id="dash-logout-btn"
              onClick={() => {
                dispatch(logout());
                dispatch(setCurrentTab('home'));
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer mt-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>

        </div>

        {/* Right Dashboard Content (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {dashboardTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Top Metric Cards (Screenshot Match) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {userOrders.length}
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Total Spent</span>
                    <Award className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    ৳{totalSpent.toLocaleString()}
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Loyalty Points</span>
                    <Award className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {user?.loyaltyPoints || 120} pts
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Wishlist</span>
                    <Heart className="w-4 h-4 text-rose-500" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {wishlistItems.length} items
                  </span>
                </div>
              </div>

              {/* Loyalty Points Banner (Screenshot Match) */}
              <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white p-5 rounded-2xl shadow-md flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                    LOYALTY REWARDS
                  </span>
                  <h3 className="text-base font-bold text-white">
                    You have {user?.loyaltyPoints || 120} Loyalty Points
                  </h3>
                  <p className="text-xs text-emerald-100">
                    Redeem 100 points for ৳50 discount at checkout on any order!
                  </p>
                </div>
                <button
                  onClick={() => dispatch(setCurrentTab('shop'))}
                  className="bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  Redeem Points
                </button>
              </div>

              {/* Recent Orders List (Screenshot Match) */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>Recent Orders</span>
                  </h3>
                  <button
                    onClick={() => dispatch(setDashboardTab('orders'))}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-3.5">
                  {userOrders.slice(0, 3).map((order) => (
                    <div
                      key={order._id}
                      className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                            #{order.orderNumber}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            • {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : order.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            ৳{(order.total || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Item Preview */}
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2 overflow-hidden">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <img
                              key={idx}
                              src={item.image}
                              alt={item.name}
                              className="inline-block h-9 w-9 rounded-lg ring-2 ring-white dark:ring-slate-800 object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                        <button
                          onClick={() => {
                            setOrderQuery(order.orderNumber);
                            dispatch(trackOrder(order.orderNumber));
                            dispatch(setDashboardTab('track'));
                          }}
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                        >
                          Track Order
                        </button>
                        <button
                          onClick={() => handleCancelOrder(order._id, order.orderNumber)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          Cancel / Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MY ORDERS */}
          {dashboardTab === 'orders' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                All Orders ({userOrders.length})
              </h3>
              {userOrders.map((order) => (
                <div key={order._id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">Order #{order.orderNumber}</span>
                      <span className="text-xs text-slate-400 block">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <span className="font-black text-emerald-600 text-sm">৳{(order.total || 0).toLocaleString()}</span>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                        <span>{i.quantity}x {i.name}</span>
                        <span>৳{((i.price || 0) * i.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => {
                        setOrderQuery(order.orderNumber);
                        dispatch(trackOrder(order.orderNumber));
                        dispatch(setDashboardTab('track'));
                      }}
                      className="text-xs font-bold text-emerald-600 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      Track Order
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order._id, order.orderNumber)}
                      className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TRACK AN ORDER */}
          {dashboardTab === 'track' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Track Your Order</h3>
                <p className="text-xs text-slate-400 mt-1">Enter your CookMe order number to view real-time delivery status.</p>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. CKM-84920 or CKM-91340"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Track Status
                </button>
              </form>

              {/* Searched Order Progress Display */}
              {searchedOrder && (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                    <div>
                      <span className="text-sm font-black text-slate-900 dark:text-white">Order #{searchedOrder.orderNumber}</span>
                      <span className="text-xs text-slate-400 block">{searchedOrder.address}</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold text-xs px-3 py-1 rounded-full">
                      {searchedOrder.status}
                    </span>
                  </div>

                  {/* Step Progress Line */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 text-center text-xs font-bold">
                      <span className="text-emerald-600">1. Placed</span>
                      <span className="text-emerald-600">2. Confirmed</span>
                      <span className={['Shipped', 'Delivered', 'Out for Delivery'].includes(searchedOrder.status) ? 'text-emerald-600' : 'text-slate-400'}>3. Shipped</span>
                      <span className={searchedOrder.status === 'Delivered' ? 'text-emerald-600' : 'text-slate-400'}>4. Delivered</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{
                          width:
                            searchedOrder.status === 'Delivered'
                              ? '100%'
                              : searchedOrder.status === 'Out for Delivery'
                              ? '85%'
                              : searchedOrder.status === 'Shipped'
                              ? '65%'
                              : searchedOrder.status === 'Processing'
                              ? '40%'
                              : '20%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {dashboardTab === 'wishlist' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                My Wishlist ({wishlistItems.length})
              </h3>
              {wishlistItems.length === 0 ? (
                <p className="text-xs text-slate-400">Your wishlist is currently empty.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map((p) => (
                    <div key={p._id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{p.name}</h4>
                        <span className="text-xs font-extrabold text-emerald-600">৳{p.price.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => {
                          dispatch(addToCart({ product: p, quantity: 1 }));
                          dispatch(removeFromWishlist(p._id));
                          dispatch(showToast(`Moved ${p.name} to cart!`));
                        }}
                        className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                        title="Move to Cart"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ADDRESSES & SETTINGS */}
          {['addresses', 'loyalty', 'returns', 'reviews', 'settings'].includes(dashboardTab) && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white capitalize">
                {dashboardTab}
              </h3>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <p><strong>Account Name:</strong> {user?.name || 'Shakib Adnan'}</p>
                <p><strong>Primary Contact:</strong> {user?.phone || '01871234567'} / {user?.email || 'shakib@example.com'}</p>
                <p><strong>Saved Delivery Address:</strong> House #42, Road #11, Banani, Dhaka-1213</p>
                <p><strong>Loyalty Tier:</strong> Silver Member (120 Points Active)</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
