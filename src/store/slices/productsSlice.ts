import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, Review } from '../../types';

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  minRating: number;
  sortBy: string;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'all',
  priceRange: [0, 6000],
  minRating: 0,
  sortBy: 'default'
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params?: { category?: string; search?: string; minPrice?: number; maxPrice?: number; minRating?: number; sort?: string } | void) => {
    const query = new URLSearchParams();
    if (params && params.category && params.category !== 'all') query.append('category', params.category);
    if (params && params.search) query.append('search', params.search);
    if (params && params.minPrice !== undefined) query.append('minPrice', params.minPrice.toString());
    if (params && params.maxPrice !== undefined) query.append('maxPrice', params.maxPrice.toString());
    if (params && params.minRating !== undefined) query.append('minRating', params.minRating.toString());
    if (params && params.sort) query.append('sort', params.sort);

    const res = await fetch(`/api/products?${query.toString()}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch products');
    return data.data as Product[];
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string) => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Product not found');
    return data.data as Product;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to delete');
    return id;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData: Partial<Product>) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to add product');
    return data.data as Product;
  }
);

export const addReview = createAsyncThunk(
  'products/addReview',
  async ({ productId, rating, comment, userName, userId }: { productId: string; rating: number; comment: string; userName: string; userId: string }) => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment, userName, userId })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to add review');
    return { productId, review: data.data as Review };
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setMinRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.priceRange = [0, 6000];
      state.minRating = 0;
      state.sortBy = 'default';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading products';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload);
        if (state.selectedProduct?._id === action.payload) {
          state.selectedProduct = null;
        }
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addReview.fulfilled, (state, action) => {
        if (state.selectedProduct && state.selectedProduct._id === action.payload.productId) {
          state.selectedProduct.reviews = [action.payload.review, ...(state.selectedProduct.reviews || [])];
        }
      });
  }
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  setSelectedProduct,
  resetFilters
} = productsSlice.actions;

export default productsSlice.reducer;
