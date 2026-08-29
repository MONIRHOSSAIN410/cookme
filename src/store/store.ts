import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';
import wishlistReducer from './slices/wishlistSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
    ui: uiReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
