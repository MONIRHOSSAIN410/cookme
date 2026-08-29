export interface Product {
  _id: string;
  name: string;
  category: 'men' | 'women' | 'kids' | 'footwear' | 'accessories' | 'culinary' | 'sale';
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  ordersCount: number;
  stock: number;
  badge?: 'HOT' | 'OFFER' | 'NEW';
  isFlashSale?: boolean;
  isBestDeal?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  tags: string[];
  inStock: boolean;
  reviews?: Review[];
  createdAt: string;
}

export interface Review {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  deliveryType: 'Inside Dhaka' | 'Outside Dhaka';
  paymentMethod: 'Cash on Delivery' | 'bKash' | 'Nagad' | 'Card';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
  savedAddresses: Array<{
    id: string;
    title: string;
    address: string;
    phone: string;
    isDefault: boolean;
  }>;
  createdAt: string;
}

export type ViewTab = 'home' | 'shop' | 'men' | 'women' | 'kids' | 'footwear' | 'sale' | 'offers' | 'dashboard' | 'checkout';
export type DashboardTab = 'overview' | 'orders' | 'returns' | 'addresses' | 'wishlist' | 'loyalty' | 'reviews' | 'settings' | 'track';
