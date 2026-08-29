import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  authModalOpen: boolean;
  authMode: 'signin' | 'signup';
}

const loadSavedUser = (): User | null => {
  try {
    const saved = localStorage.getItem('cookme_user');
    return saved ? JSON.parse(saved) : {
      _id: 'user-1',
      name: 'Shakib Adnan',
      email: 'shakib@example.com',
      phone: '01871234567',
      role: 'customer',
      loyaltyPoints: 120,
      totalOrders: 2,
      totalSpent: 4770,
      savedAddresses: [
        {
          id: 'addr-1',
          title: 'Home',
          address: 'House #42, Road #11, Banani, Dhaka-1213',
          phone: '01871234567',
          isDefault: true
        }
      ],
      createdAt: '2026-01-01T00:00:00.000Z'
    };
  } catch {
    return null;
  }
};

const savedUser = loadSavedUser();

const initialState: AuthState = {
  user: savedUser,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null,
  authModalOpen: false,
  authMode: 'signin'
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ identifier, password }: { identifier: string; password?: string }) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Login failed');
    localStorage.setItem('cookme_user', JSON.stringify(data.data));
    return data.data as User;
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, phone, password }: { name: string; email: string; phone: string; password?: string }) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Registration failed');
    localStorage.setItem('cookme_user', JSON.stringify(data.data));
    return data.data as User;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('cookme_user');
    },
    openAuthModal: (state, action: PayloadAction<'signin' | 'signup' | undefined>) => {
      state.authModalOpen = true;
      if (action.payload) {
        state.authMode = action.payload;
      }
    },
    closeAuthModal: (state) => {
      state.authModalOpen = false;
    },
    setAuthMode: (state, action: PayloadAction<'signin' | 'signup'>) => {
      state.authMode = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('cookme_user', JSON.stringify(state.user));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authModalOpen = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authModalOpen = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  }
});

export const { logout, openAuthModal, closeAuthModal, setAuthMode, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
