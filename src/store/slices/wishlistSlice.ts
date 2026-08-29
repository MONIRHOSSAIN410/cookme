import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface WishlistState {
  items: Product[];
}

const loadInitialWishlist = (): Product[] => {
  try {
    const saved = localStorage.getItem('cookme_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: WishlistState = {
  items: loadInitialWishlist()
};

const saveWishlist = (items: Product[]) => {
  try {
    localStorage.setItem('cookme_wishlist', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save wishlist', e);
  }
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(p => p._id === action.payload._id);
      if (exists) {
        state.items = state.items.filter(p => p._id !== action.payload._id);
      } else {
        state.items.push(action.payload);
      }
      saveWishlist(state.items);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(p => p._id !== action.payload);
      saveWishlist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlist([]);
    }
  }
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
