import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewTab, DashboardTab, Product } from '../../types';

interface UIState {
  darkMode: boolean;
  currentTab: ViewTab;
  dashboardTab: DashboardTab;
  cartDrawerOpen: boolean;
  quickViewProduct: Product | null;
  aiChatOpen: boolean;
  toastMessage: string | null;
}

const getInitialDarkMode = (): boolean => {
  try {
    const saved = localStorage.getItem('cookme_darkmode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};

const initialState: UIState = {
  darkMode: getInitialDarkMode(),
  currentTab: 'home',
  dashboardTab: 'overview',
  cartDrawerOpen: false,
  quickViewProduct: null,
  aiChatOpen: false,
  toastMessage: null
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('cookme_darkmode', JSON.stringify(state.darkMode));
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem('cookme_darkmode', JSON.stringify(state.darkMode));
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setCurrentTab: (state, action: PayloadAction<ViewTab>) => {
      state.currentTab = action.payload;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    setDashboardTab: (state, action: PayloadAction<DashboardTab>) => {
      state.dashboardTab = action.payload;
    },
    setCartDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.cartDrawerOpen = action.payload;
    },
    setQuickViewProduct: (state, action: PayloadAction<Product | null>) => {
      state.quickViewProduct = action.payload;
    },
    setAiChatOpen: (state, action: PayloadAction<boolean>) => {
      state.aiChatOpen = action.payload;
    },
    showToast: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    clearToast: (state) => {
      state.toastMessage = null;
    }
  }
});

export const {
  toggleDarkMode,
  setDarkMode,
  setCurrentTab,
  setDashboardTab,
  setCartDrawerOpen,
  setQuickViewProduct,
  setAiChatOpen,
  showToast,
  clearToast
} = uiSlice.actions;

export default uiSlice.reducer;
