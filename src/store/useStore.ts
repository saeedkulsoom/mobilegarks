import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  variants: { size: string[]; color: string[]; material?: string[] };
  rating: number;
  stockHistory?: { date: string; amount: number; type: 'in' | 'out' }[];
  sku?: string;
};

export type Supplier = {
  id: string;
  name: string;
  company: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  category: string; // Fabric, Leather, Accessories, etc.
  rating: number; // 1-5 Performance Rating
};

export type PurchaseOrder = {
  id: string;
  supplierId: string;
  productId: string;
  quantity: number;
  status: 'Draft' | 'Sent' | 'Received' | 'Completed';
  createdAt: string;
  totalCost: number;
};

export type CartItem = Product & { quantity: number };

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  photo?: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'sale' | 'info' | 'order' | 'inventory';
  read: boolean;
};

export type AppState = {
  user: User | null;
  mode: 'customer' | 'admin';
  cart: CartItem[];
  inventory: Product[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  orders: any[];
  notifications: Notification[];
  isLoggedIn: boolean;
  toast: { message: string; visible: boolean } | null;
  cartFeedback: string | null; // ID of product added to cart
  
  // Actions
  setUser: (user: User | null) => void;
  setMode: (mode: 'customer' | 'admin') => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  logout: () => void;
  updateInventory: (product: Product) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markNotificationsRead: () => void;
  clearNotifications: () => void;
  setToast: (message: string | null) => void;
  
  // Inventory & Supplier Actions
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (supplier: Supplier) => void;
  addPurchaseOrder: (po: PurchaseOrder) => void;
  updatePurchaseOrder: (po: PurchaseOrder) => void;
};

const DUMMY_SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Marco Rossi', company: 'Milan Fabrics Co.', contactPerson: 'Marco', phone: '+39 02 123456', email: 'marco@milanfabrics.it', address: 'Via Montenapoleone, Milan', category: 'Fabric', rating: 4.8 },
  { id: 's2', name: 'John Smith', company: 'Premium Leather Ltd.', contactPerson: 'John', phone: '+44 20 7946 0000', email: 'john@premiumleather.co.uk', address: 'Leather Lane, London', category: 'Leather', rating: 4.5 },
  { id: 's3', name: 'Li Wei', company: 'Zhejiang Accessories', contactPerson: 'Li', phone: '+86 571 8888 8888', email: 'li.wei@zjacce.com', address: 'Industrial Road, Hangzhou', category: 'Accessories', rating: 4.2 }
];

const DUMMY_POS: PurchaseOrder[] = [
  { id: 'PO-001', supplierId: 's1', productId: 'm1', quantity: 100, status: 'Completed', createdAt: '2024-03-10', totalCost: 4500 },
  { id: 'PO-002', supplierId: 's2', productId: 'm3', quantity: 20, status: 'Sent', createdAt: '2024-03-15', totalCost: 3800 }
];

const DUMMY_PRODUCTS: Product[] = [
  // Men's Collection
  { id: 'm1', sku: 'SH-OX-001', name: 'Premium Oxford Shirt', category: 'Shirts', price: 85, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80', description: 'Handcrafted from fine Egyptian cotton.', stock: 24, variants: { size: ['S', 'M', 'L', 'XL'], color: ['White', 'Light Blue'], material: ['Cotton'] }, rating: 4.8 },
  { id: 'm2', sku: 'PN-CH-002', name: 'Slim Fit Chinos', category: 'Pants', price: 75, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80', description: 'Perfect balance of comfort and style.', stock: 35, variants: { size: ['30', '32', '34'], color: ['Khaki', 'Navy'], material: ['Cotton Twill'] }, rating: 4.6 },
  { id: 'm3', sku: 'JK-LE-003', name: 'Biker Leather Jacket', category: 'Leather Jackets', price: 295, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80', description: 'Grained leather with metallic hardware.', stock: 8, variants: { size: ['M', 'L', 'XL'], color: ['Black'], material: ['Lambskin Leather'] }, rating: 4.9 },
  { id: 'm4', sku: 'HD-FL-004', name: 'Tech Fleece Hoodie', category: 'Hoodies', price: 95, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80', description: 'Advanced warmth without the weight.', stock: 42, variants: { size: ['S', 'M', 'L'], color: ['Grey', 'Black'], material: ['Tech Fleece'] }, rating: 4.7 },
  { id: 'm5', sku: 'PL-PI-005', name: 'Classic Pique Polo', category: 'Polo Shirts', price: 55, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80', description: 'Breathable cotton pique fabric.', stock: 5, variants: { size: ['S', 'M', 'L', 'XL'], color: ['Navy', 'White', 'Black'], material: ['Cotton Pique'] }, rating: 4.5 },
  
  // Women's Collection
  { id: 'w1', sku: 'BL-SI-006', name: 'Silk Blouse', category: 'Women', price: 120, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80', description: 'Smooth silk for an elegant drape.', stock: 15, variants: { size: ['XS', 'S', 'M'], color: ['Ivory', 'Champagne'], material: ['100% Silk'] }, rating: 4.9 },
  { id: 'w2', sku: 'TR-HW-007', name: 'High-Waist Trousers', category: 'Women', price: 90, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80', description: 'Tailored fit for professional presence.', stock: 20, variants: { size: ['2', '4', '6', '8'], color: ['Black', 'Tan'], material: ['Wool Blend'] }, rating: 4.7 },
  { id: 'w3', sku: 'CT-TR-008', name: 'Oversized Trench Coat', category: 'Women', price: 185, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80', description: 'Water-resistant luxury trench.', stock: 12, variants: { size: ['S', 'M', 'L'], color: ['Camel'], material: ['Gabardine'] }, rating: 4.8 },
  { id: 'w4', sku: 'SW-CS-009', name: 'Cashmere Sweater', category: 'Women', price: 210, image: 'https://images.unsplash.com/photo-1574167132742-132ba067ced5?auto=format&fit=crop&q=80', description: '100% pure Himalayan cashmere.', stock: 0, variants: { size: ['S', 'M'], color: ['Soft Grey', 'Dusty Rose'], material: ['Cashmere'] }, rating: 5.0 },
];

export const useStore = create<AppState>((set) => ({
  user: null,
  mode: 'customer',
  cart: [],
  inventory: DUMMY_PRODUCTS,
  suppliers: DUMMY_SUPPLIERS,
  purchaseOrders: DUMMY_POS,
  orders: [],
  notifications: [
    { id: 'initial-1', title: 'Welcome to GarKS', message: 'Experience the future of fashion with Gargi AI.', time: '1h ago', type: 'info', read: false },
    { id: 'initial-2', title: 'Limited Offer', message: 'Get 20% off on your first order using code GARKS20.', time: '2h ago', type: 'sale', read: false }
  ],
  isLoggedIn: false,
  toast: null,
  cartFeedback: null,

  setUser: (user) => set({ user, isLoggedIn: !!user }),
  setMode: (mode) => set({ mode }),
  
  addToCart: (product) => {
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      
      // Feedback mechanism
      setTimeout(() => set({ cartFeedback: null }), 1000);
      
      const newCart = existing 
        ? state.cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.cart, { ...product, quantity: 1 }];

      return { 
        cart: newCart,
        cartFeedback: product.id,
        toast: { message: `Added ${product.name} to cart`, visible: true }
      };
    });
    
    // Auto clear toast
    setTimeout(() => set({ toast: null }), 3000);
  },

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),

  updateCartQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0),
  })),

  clearCart: () => set({ cart: [] }),
  
  logout: () => set({ user: null, isLoggedIn: false, cart: [], mode: 'customer', notifications: [], toast: null, cartFeedback: null }),

  updateInventory: (product) => set((state) => ({
    inventory: state.inventory.map((p) => p.id === product.id ? product : p),
  })),

  addNotification: (notif) => set((state) => ({
    notifications: [
      {
        ...notif,
        id: Math.random().toString(36).substr(2, 9),
        time: 'Just now',
        read: false
      },
      ...state.notifications
    ]
  })),

  markNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  clearNotifications: () => set({ notifications: [] }),
  setToast: (message) => set({ toast: message ? { message, visible: true } : null }),

  addSupplier: (supplier) => set((state) => ({ suppliers: [...state.suppliers, supplier] })),
  updateSupplier: (supplier) => set((state) => ({
    suppliers: state.suppliers.map(s => s.id === supplier.id ? supplier : s)
  })),
  addPurchaseOrder: (po) => set((state) => ({ purchaseOrders: [...state.purchaseOrders, po] })),
  updatePurchaseOrder: (po) => set((state) => ({
    purchaseOrders: state.purchaseOrders.map(p => p.id === po.id ? po : p)
  })),
}));
