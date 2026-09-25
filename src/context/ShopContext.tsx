import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderAddress } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedWeight?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedWeight: string) => void;
  updateQuantity: (productId: string, selectedWeight: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shipping: number;
  discount: number;
  cartTotal: number;
  freeShippingThreshold: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  toast: { message: string; type?: 'info' | 'success' | 'warn' } | null;
  showToast: (message: string, type?: 'info' | 'success' | 'warn') => void;

  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (address: OrderAddress, paymentMethod: 'UPI' | 'Card' | 'COD') => Order;
  lookupOrder: (trackingOrId: string) => Order | undefined;

  // Navigation
  currentPage: string;
  selectedProductId: string | null;
  navigateTo: (page: string, productId?: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'sukoon_cart_v2';
const WISHLIST_STORAGE_KEY = 'sukoon_wishlist_v2';
const ORDERS_STORAGE_KEY = 'sukoon_orders_v2';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state (synced with window hash)
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['premium-masala-chai'];
    } catch {
      return ['premium-masala-chai'];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Demo order for realistic tracking
      return [
        {
          id: 'SKN-90284',
          date: 'Yesterday at 5:30 PM',
          items: [
            {
              product: PRODUCTS[0],
              selectedWeight: '100g',
              quantity: 1,
              unitPrice: 299,
            }
          ],
          subtotal: 299,
          discount: 0,
          shipping: 0,
          total: 299,
          paymentMethod: 'UPI',
          status: 'Shipped',
          address: {
            fullName: 'Ananya Sharma',
            phone: '+91 98765 43210',
            email: 'ananya@sukoonchai.com',
            addressLine1: 'B-402, Nilgiri Heights, Koregaon Park',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411001',
          },
          estimatedDelivery: 'Tomorrow, by 6:00 PM',
          trackingNumber: 'DELHIVERY-SKN-90284'
        }
      ];
    } catch {
      return [];
    }
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'warn' } | null>(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash || hash === '') {
        setCurrentPage('home');
        setSelectedProductId(null);
      } else if (hash.startsWith('product/')) {
        const pId = hash.replace('product/', '');
        setCurrentPage('product-details');
        setSelectedProductId(pId);
      } else {
        setCurrentPage(hash);
        setSelectedProductId(null);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, productId?: string) => {
    if (page === 'product-details' && productId) {
      window.location.hash = `#/product/${productId}`;
    } else {
      window.location.hash = `#/${page}`;
    }
  };

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (message: string, type: 'info' | 'success' | 'warn' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product: Product, selectedWeight?: string, quantity: number = 1) => {
    const weight = selectedWeight || product.defaultWeight;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            selectedWeight: weight,
            quantity,
            unitPrice: product.price,
          }
        ];
      }
    });
    showToast(`Added ${product.name} (${weight}) to your Sukoon bag.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, selectedWeight: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedWeight === selectedWeight)
      )
    );
    showToast('Removed item from your cart.', 'info');
  };

  const updateQuantity = (productId: string, selectedWeight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedWeight);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedWeight === selectedWeight) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your Sukoon wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your Sukoon wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 499;
  const shipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 49;

  let discount = 0;
  if (appliedCoupon === 'SUKOON10') {
    discount = Math.round(cartSubtotal * 0.1);
  } else if (appliedCoupon === 'EKCUP') {
    discount = 50;
  }

  const cartTotal = Math.max(0, cartSubtotal - discount + (cartSubtotal > 0 ? shipping : 0));

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'SUKOON10') {
      setAppliedCoupon('SUKOON10');
      showToast('10% Sukoon discount applied!', 'success');
      return { success: true, message: '10% discount applied to your order!' };
    } else if (formatted === 'EKCUP') {
      setAppliedCoupon('EKCUP');
      showToast('₹50 introductory voucher applied!', 'success');
      return { success: true, message: '₹50 discount applied!' };
    } else {
      showToast('Invalid coupon code. Try SUKOON10', 'warn');
      return { success: false, message: 'Invalid coupon code. Try SUKOON10 or EKCUP' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  const placeOrder = (address: OrderAddress, paymentMethod: 'UPI' | 'Card' | 'COD'): Order => {
    const orderId = `SKN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: orderId,
      date: 'Just now',
      items: [...cart],
      subtotal: cartSubtotal,
      discount,
      shipping,
      total: cartTotal,
      paymentMethod,
      status: 'Placed',
      address,
      estimatedDelivery: '3–4 business days via Bluedart Express',
      trackingNumber: `TRACK-${orderId}-${Math.floor(100 + Math.random() * 899)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    navigateTo('order-confirmation');
    return newOrder;
  };

  const lookupOrder = (trackingOrId: string): Order | undefined => {
    const clean = trackingOrId.trim().toUpperCase();
    return orders.find(
      (o) => o.id.toUpperCase() === clean || o.trackingNumber.toUpperCase() === clean
    );
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shipping,
        discount,
        cartTotal,
        freeShippingThreshold,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        openQuickView: (product) => setQuickViewProduct(product),
        closeQuickView: () => setQuickViewProduct(null),
        toast,
        showToast,
        orders,
        currentOrder,
        placeOrder,
        lookupOrder,
        currentPage,
        selectedProductId,
        navigateTo,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
