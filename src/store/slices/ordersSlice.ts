import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';

interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  trackOrderQuery: string;
  searchedOrder: Order | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  trackOrderQuery: '',
  searchedOrder: null
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId?: string | void) => {
    const url = userId ? `/api/orders?userId=${userId}` : '/api/orders';
    const res = await fetch(url);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to fetch orders');
    return data.data as Order[];
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Partial<Order>) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to create order');
    return data.data as Order;
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id: string) => {
    const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed to cancel order');
    return id;
  }
);

export const trackOrder = createAsyncThunk(
  'orders/trackOrder',
  async (orderIdOrNumber: string) => {
    const res = await fetch(`/api/orders/${orderIdOrNumber}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Order not found');
    return data.data as Order;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setTrackOrderQuery: (state, action: PayloadAction<string>) => {
      state.trackOrderQuery = action.payload;
    },
    clearSearchedOrder: (state) => {
      state.searchedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load orders';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(o => o._id !== action.payload && o.orderNumber !== action.payload);
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.searchedOrder = action.payload;
      })
      .addCase(trackOrder.rejected, (state) => {
        state.searchedOrder = null;
      });
  }
});

export const { setTrackOrderQuery, clearSearchedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
