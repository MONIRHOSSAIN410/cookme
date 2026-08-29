export interface IProduct {
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
  createdAt: string;
}

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrder {
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
  items: IOrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface IUser {
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

export interface IReview {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
