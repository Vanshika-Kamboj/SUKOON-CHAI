export type TeaMood = 'Calm' | 'Energy' | 'Comfort' | 'Refresh';

export type TeaCategory = 
  | 'Masala Chai' 
  | 'Adrak Chai' 
  | 'Green Tea' 
  | 'Floral Tea' 
  | 'Herbal Tea' 
  | 'Gift Collections';

export interface TeaProfileMetrics {
  strength: number; // 0-10
  aroma: number;   // 0-10
  spice: number;   // 0-10
  comfort: number; // 0-10
  floral: number;  // 0-10
  freshness: number; // 0-10
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: TeaCategory;
  mood: TeaMood;
  price: number;
  originalPrice?: number;
  weightOptions: string[]; // e.g. ['50g', '100g', '250g', '500g']
  defaultWeight: string;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  description: string;
  tastingNotes: string[];
  ingredients: string[];
  brewingInstructions: {
    waterTemp: string;
    steepTime: string;
    milkRatio: string;
    servings: string;
    steps: string[];
  };
  teaProfile: TeaProfileMetrics;
  benefits: string[];
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  quantity: number;
  unitPrice: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  excerpt: string;
  image: string;
  content: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
}

export interface OrderAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  status: 'Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  address: OrderAddress;
  estimatedDelivery: string;
  trackingNumber: string;
}
