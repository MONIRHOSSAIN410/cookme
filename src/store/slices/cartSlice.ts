import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types';

interface CartState {
  items: CartItem[];
  deliveryType: 'Inside Dhaka' | 'Outside Dhaka';
  appliedCoupon: string | null;
  discountPercentage: number;
}

const loadInitialCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cookme_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: loadInitialCart(),
  deliveryType: 'Inside Dhaka',
  appliedCoupon: null,
  discountPercentage: 0
};

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem('cookme_cart', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number; selectedColor?: string; selectedSize?: string }>) => {
      const { product, quantity = 1, selectedColor, selectedSize } = action.payload;
      const existing = state.items.find(item => item.product._id === product._id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedColor,
          selectedSize
        });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product._id !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.product._id !== productId);
      } else {
        const item = state.items.find(i => i.product._id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
      saveCart(state.items);
    },
    setDeliveryType: (state, action: PayloadAction<'Inside Dhaka' | 'Outside Dhaka'>) => {
      state.deliveryType = action.payload;
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      if (code === 'COOKME10' || code === 'ADNAN10') {
        state.appliedCoupon = code;
        state.discountPercentage = 10;
      } else if (code === 'FLASH20') {
        state.appliedCoupon = code;
        state.discountPercentage = 20;
      } else {
        state.appliedCoupon = null;
        state.discountPercentage = 0;
      }
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountPercentage = 0;
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.discountPercentage = 0;
      saveCart([]);
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setDeliveryType,
  applyCoupon,
  removeCoupon,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
