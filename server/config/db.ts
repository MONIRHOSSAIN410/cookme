import { IProduct, IOrder, IUser, IReview } from '../types.js';

// Initial Seed Data accurately modeled from the screenshots
const initialProducts: IProduct[] = [
  {
    _id: 'prod-1',
    name: 'Kids Graphic T-Shirt Pack',
    category: 'kids',
    price: 990,
    oldPrice: 1200,
    discountPercentage: 18,
    rating: 4.0,
    reviewCount: 2,
    ordersCount: 3,
    stock: 20,
    badge: 'OFFER',
    isFlashSale: true,
    isBestDeal: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519725392-d7738dd473dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fun printed tees for everyday school wear. Breathable 100% organic combed cotton with double-stitched hems for lasting durability.',
    features: [
      '100% Premium Combed Cotton',
      'High-definition silk screen print',
      'Tagless neck label for zero irritation',
      'Machine washable with anti-fade dyes'
    ],
    tags: ['kids', 't-shirt', 'streetwear', 'cotton'],
    inStock: true,
    createdAt: new Date('2026-01-15').toISOString()
  },
  {
    _id: 'prod-2',
    name: 'Kids Hoodie',
    category: 'kids',
    price: 1290,
    rating: 4.7,
    reviewCount: 5,
    ordersCount: 14,
    stock: 15,
    isTrending: true,
    isNewArrival: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1519725392-d7738dd473dc?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519725392-d7738dd473dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cozy fleece-lined urban hoodie designed for chilly mornings and active play outdoors.',
    features: ['Brushed fleece interior', 'Kangaroo pocket with reinforced seams', 'Ribbed cuffs & hem'],
    tags: ['kids', 'hoodie', 'winter', 'warm'],
    inStock: true,
    createdAt: new Date('2026-01-20').toISOString()
  },
  {
    _id: 'prod-3',
    name: 'Classic White Sneakers',
    category: 'footwear',
    price: 2490,
    oldPrice: 3000,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 12,
    ordersCount: 45,
    stock: 18,
    badge: 'HOT',
    isFlashSale: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clean silhouette sneakers with cushioned EVA insoles, flexible rubber outsole, and premium contrast tan accents.',
    features: ['High-resilience foam insole', 'Water-resistant coated leather upper', 'Anti-slip waffle tread outsole'],
    tags: ['footwear', 'shoes', 'sneakers', 'streetwear'],
    inStock: true,
    createdAt: new Date('2026-01-10').toISOString()
  },
  {
    _id: 'prod-4',
    name: 'Leather Crossbody Bag',
    category: 'accessories',
    price: 1890,
    rating: 4.8,
    reviewCount: 9,
    ordersCount: 22,
    stock: 12,
    isTrending: true,
    isBestSeller: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Quilted chevron leather handbag with gilded hardware, chain-link strap, and magnetic flap closure.',
    features: ['Genuine textured vegan leather', 'Dual interior zip compartments', 'Adjustable gold-tone crossbody chain'],
    tags: ['accessories', 'bag', 'luxury', 'women'],
    inStock: true,
    createdAt: new Date('2026-01-08').toISOString()
  },
  {
    _id: 'prod-5',
    name: 'Premium Sunglasses',
    category: 'accessories',
    price: 1290,
    oldPrice: 1600,
    discountPercentage: 19,
    rating: 4.7,
    reviewCount: 8,
    ordersCount: 19,
    stock: 25,
    badge: 'OFFER',
    isFlashSale: true,
    isBestDeal: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Iconic round frame metal sunglasses featuring polarized UV400 lenses and lightweight slim arms.',
    features: ['100% UV400 Protection', 'Scratch-resistant polarized tint', 'Adjustable hypoallergenic nose pads'],
    tags: ['accessories', 'sunglasses', 'summer', 'eyewear'],
    inStock: true,
    createdAt: new Date('2026-01-18').toISOString()
  },
  {
    _id: 'prod-6',
    name: 'Slim Fit Denim Jeans',
    category: 'men',
    price: 1890,
    oldPrice: 2200,
    discountPercentage: 14,
    rating: 4.6,
    reviewCount: 16,
    ordersCount: 38,
    stock: 14,
    badge: 'OFFER',
    isFlashSale: true,
    isBestDeal: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Classic dark wash denim trousers crafted from 98% cotton with 2% elastane for flexible movement all day.',
    features: ['Stretch-comfort denim weave', 'Reinforced 5-pocket styling', 'YKK zip fly and branded brass button'],
    tags: ['men', 'jeans', 'denim', 'pants'],
    inStock: true,
    createdAt: new Date('2026-01-12').toISOString()
  },
  {
    _id: 'prod-7',
    name: 'Classic Cotton T-Shirt',
    category: 'men',
    price: 890,
    oldPrice: 1100,
    discountPercentage: 19,
    rating: 4.9,
    reviewCount: 24,
    ordersCount: 82,
    stock: 40,
    badge: 'HOT',
    isBestDeal: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Essential crewneck t-shirt in crisp optic white. Soft, breathable, and tailored for a modern relaxed fit.',
    features: ['180 GSM Ring-spun cotton', 'Pre-shrunk against washing deformation', 'Seamless sides'],
    tags: ['men', 't-shirt', 'casual', 'basics'],
    inStock: true,
    createdAt: new Date('2026-01-05').toISOString()
  },
  {
    _id: 'prod-8',
    name: 'Formal Polo Shirt',
    category: 'men',
    price: 1150,
    rating: 4.7,
    reviewCount: 7,
    ordersCount: 21,
    stock: 19,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Premium pique polo shirts featuring crisp ribbed collars, two-button placket, and subtle split hems.',
    features: ['100% Egyptian Cotton Pique', 'Mother-of-pearl buttons', 'Ribbed no-curl collar'],
    tags: ['men', 'polo', 'formal', 'smart-casual'],
    inStock: true,
    createdAt: new Date('2026-01-22').toISOString()
  },
  {
    _id: 'prod-9',
    name: "Men's Leather Jacket",
    category: 'men',
    price: 5490,
    oldPrice: 6200,
    discountPercentage: 11,
    rating: 4.9,
    reviewCount: 11,
    ordersCount: 16,
    stock: 8,
    badge: 'NEW',
    isNewArrival: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted black biker jacket with asymmetric silver zippers, snap lapels, and quilted satin lining.',
    features: ['Top-grain nappa leather', 'Heavy-duty chrome YKK zippers', 'Interior security wallet pocket'],
    tags: ['men', 'jacket', 'leather', 'outerwear'],
    inStock: true,
    createdAt: new Date('2026-02-01').toISOString()
  },
  {
    _id: 'prod-10',
    name: 'Floral Summer Dress',
    category: 'women',
    price: 2450,
    rating: 4.9,
    reviewCount: 14,
    ordersCount: 30,
    stock: 12,
    badge: 'NEW',
    isNewArrival: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dramatic flowing red maxi dress tailored with a sweetheart neckline and tiered fluttering hemline.',
    features: ['Lightweight chiffon blend', 'Smocked elastic back bodice', 'Fully lined skirt'],
    tags: ['women', 'dress', 'summer', 'floral'],
    inStock: true,
    createdAt: new Date('2026-02-05').toISOString()
  },
  {
    _id: 'prod-11',
    name: 'Elegant Saree Collection',
    category: 'women',
    price: 3200,
    oldPrice: 3800,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 18,
    ordersCount: 42,
    stock: 9,
    badge: 'HOT',
    isFlashSale: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Traditional royal purple and maroon silk saree woven with intricate golden zari borders and matching blouse piece.',
    features: ['Art silk with golden zari weave', 'Includes 0.8m unstitched blouse piece', 'Grand festive pallu'],
    tags: ['women', 'saree', 'traditional', 'festive'],
    inStock: true,
    createdAt: new Date('2026-01-14').toISOString()
  },
  {
    _id: 'prod-12',
    name: "Women's Casual Blazer",
    category: 'women',
    price: 2890,
    rating: 4.8,
    reviewCount: 6,
    ordersCount: 18,
    stock: 14,
    isTrending: true,
    isNewArrival: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Chic tailored denim silhouette dress / blazer with mother-of-pearl buttons and flattering waistline.',
    features: ['Soft washed denim tencel', 'Front button closure', 'Side slit pockets'],
    tags: ['women', 'blazer', 'casual', 'denim'],
    inStock: true,
    createdAt: new Date('2026-01-25').toISOString()
  }
];

const initialUser: IUser = {
  _id: 'user-1',
  name: 'Shakib Adnan',
  email: 'shakib@example.com',
  phone: '01871234567',
  role: 'customer',
  loyaltyPoints: 120,
  totalOrders: 3,
  totalSpent: 4770,
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Home',
      address: 'House #42, Road #11, Banani, Dhaka-1213',
      phone: '01871234567',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Office',
      address: 'Gulshan Center Point, Level 8, Gulshan-2, Dhaka',
      phone: '01871234567',
      isDefault: false
    }
  ],
  createdAt: new Date('2026-01-01').toISOString()
};

const initialOrders: IOrder[] = [
  {
    _id: 'ord-1001',
    orderNumber: 'CKM-84920',
    userId: 'user-1',
    customerName: 'Shakib Adnan',
    phone: '01871234567',
    email: 'shakib@example.com',
    address: 'House #42, Road #11, Banani',
    city: 'Dhaka',
    deliveryType: 'Inside Dhaka',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 'prod-1',
        name: 'Kids Graphic T-Shirt Pack',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
        price: 990,
        quantity: 1
      },
      {
        productId: 'prod-5',
        name: 'Premium Sunglasses',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
        price: 1290,
        quantity: 1
      }
    ],
    subtotal: 2280,
    shippingFee: 60,
    discount: 50,
    total: 2290,
    status: 'Delivered',
    createdAt: new Date('2026-02-10T14:20:00Z').toISOString()
  },
  {
    _id: 'ord-1002',
    orderNumber: 'CKM-91340',
    userId: 'user-1',
    customerName: 'Shakib Adnan',
    phone: '01871234567',
    email: 'shakib@example.com',
    address: 'House #42, Road #11, Banani',
    city: 'Dhaka',
    deliveryType: 'Inside Dhaka',
    paymentMethod: 'bKash',
    items: [
      {
        productId: 'prod-3',
        name: 'Classic White Sneakers',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        price: 2490,
        quantity: 1
      }
    ],
    subtotal: 2490,
    shippingFee: 60,
    discount: 70,
    total: 2480,
    status: 'Processing',
    createdAt: new Date('2026-02-25T09:15:00Z').toISOString()
  }
];

const initialReviews: IReview[] = [
  {
    _id: 'rev-1',
    productId: 'prod-1',
    userId: 'user-1',
    userName: 'Shakib A.',
    rating: 5,
    comment: 'Great quality fabric! My kid loves the graphic print, washed 3 times and color stayed bright.',
    date: '2026-02-12'
  },
  {
    _id: 'rev-2',
    productId: 'prod-1',
    userId: 'user-2',
    userName: 'Tanvir Hasan',
    rating: 4,
    comment: 'Good fit and soft material. Delivery was prompt inside Dhaka.',
    date: '2026-02-18'
  },
  {
    _id: 'rev-3',
    productId: 'prod-3',
    userId: 'user-3',
    userName: 'Farhan Kabir',
    rating: 5,
    comment: 'Super comfortable sneakers, the tan accents look very premium in person!',
    date: '2026-02-20'
  }
];

// In-Memory Database engine with full MongoDB-like interface
class Database {
  private products: IProduct[] = [...initialProducts];
  private orders: IOrder[] = [...initialOrders];
  private users: IUser[] = [initialUser];
  private reviews: IReview[] = [...initialReviews];

  // Products
  async getProducts(filter?: { category?: string; search?: string; minPrice?: number; maxPrice?: number; minRating?: number; sort?: string }) {
    let list = [...this.products];
    if (filter?.category && filter.category !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === filter.category!.toLowerCase());
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    if (filter?.minPrice !== undefined) {
      list = list.filter(p => p.price >= filter.minPrice!);
    }
    if (filter?.maxPrice !== undefined) {
      list = list.filter(p => p.price <= filter.maxPrice!);
    }
    if (filter?.minRating !== undefined) {
      list = list.filter(p => p.rating >= filter.minRating!);
    }

    if (filter?.sort) {
      if (filter.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
      else if (filter.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
      else if (filter.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
      else if (filter.sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
      else if (filter.sort === 'newest') list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }

  async getProductById(id: string) {
    return this.products.find(p => p._id === id) || null;
  }

  async createProduct(data: Omit<IProduct, '_id' | 'createdAt'>) {
    const newProd: IProduct = {
      ...data,
      _id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProd);
    return newProd;
  }

  async updateProduct(id: string, updates: Partial<IProduct>) {
    const idx = this.products.findIndex(p => p._id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates };
    return this.products[idx];
  }

  async deleteProduct(id: string) {
    const idx = this.products.findIndex(p => p._id === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }

  // Orders
  async getOrders(userId?: string) {
    if (userId) {
      return this.orders.filter(o => o.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return [...this.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getOrderById(id: string) {
    return this.orders.find(o => o._id === id || o.orderNumber === id) || null;
  }

  async createOrder(orderData: Omit<IOrder, '_id' | 'orderNumber' | 'createdAt'>) {
    const newOrder: IOrder = {
      ...orderData,
      _id: 'ord-' + Date.now(),
      orderNumber: 'CKM-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString()
    };
    this.orders.unshift(newOrder);

    // Update user stats
    const user = this.users.find(u => u._id === orderData.userId);
    if (user) {
      user.totalOrders += 1;
      user.totalSpent += orderData.total;
      user.loyaltyPoints += Math.floor(orderData.total / 100);
    }
    return newOrder;
  }

  async updateOrderStatus(id: string, status: IOrder['status']) {
    const order = this.orders.find(o => o._id === id || o.orderNumber === id);
    if (!order) return null;
    order.status = status;
    return order;
  }

  async deleteOrder(id: string) {
    const idx = this.orders.findIndex(o => o._id === id || o.orderNumber === id);
    if (idx === -1) return false;
    this.orders.splice(idx, 1);
    return true;
  }

  // Users & Auth
  async getUserById(id: string) {
    return this.users.find(u => u._id === id) || null;
  }

  async getUserByEmailOrPhone(identifier: string) {
    return this.users.find(u => u.email.toLowerCase() === identifier.toLowerCase() || u.phone === identifier) || null;
  }

  async registerUser(name: string, email: string, phone: string) {
    const existing = await this.getUserByEmailOrPhone(email) || await this.getUserByEmailOrPhone(phone);
    if (existing) return existing;
    const newUser: IUser = {
      _id: 'user-' + Date.now(),
      name,
      email,
      phone,
      role: 'customer',
      loyaltyPoints: 50, // Welcome bonus
      totalOrders: 0,
      totalSpent: 0,
      savedAddresses: [
        {
          id: 'addr-' + Date.now(),
          title: 'Primary',
          address: 'Banani / Gulshan, Dhaka',
          phone,
          isDefault: true
        }
      ],
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Reviews
  async getReviewsByProduct(productId: string) {
    return this.reviews.filter(r => r.productId === productId);
  }

  async addReview(productId: string, userId: string, userName: string, rating: number, comment: string) {
    const review: IReview = {
      _id: 'rev-' + Date.now(),
      productId,
      userId,
      userName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    this.reviews.unshift(review);

    // Update product rating average
    const prod = this.products.find(p => p._id === productId);
    if (prod) {
      const prodReviews = this.reviews.filter(r => r.productId === productId);
      const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      prod.rating = parseFloat(avg.toFixed(1));
      prod.reviewCount = prodReviews.length;
    }

    return review;
  }
}

export const db = new Database();
