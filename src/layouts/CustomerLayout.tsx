import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Grid, ShoppingCart, User, MessageSquare } from 'lucide-react';
import CustomerHome from '../pages/customer/Home';
import Shop from '../pages/customer/Shop';
import Categories from '../pages/customer/Categories';
import Cart from '../pages/customer/Cart';
import Profile from '../pages/Profile';
import ProductDetail from '../pages/customer/ProductDetail';
import Notifications from '../pages/customer/Notifications';
import GargiAssistant from '../components/GargiAssistant';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/customer' },
    { label: 'Shop', icon: ShoppingBag, path: '/customer/shop' },
    { label: 'Categories', icon: Grid, path: '/customer/categories' },
    { label: 'Cart', icon: ShoppingCart, path: '/customer/cart' },
    { label: 'Profile', icon: User, path: '/customer/profile' },
  ];

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-brand-bg">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<CustomerHome />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Gargi Floating Button */}
      <div className="absolute bottom-28 right-6 z-40">
        <GargiAssistant />
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 h-20 bg-brand-bg/80 backdrop-blur-xl border-t border-brand-muted/10 px-6 flex items-center justify-between z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/customer' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 group relative outline-none"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'text-brand-primary bg-brand-primary/10' : 'text-brand-muted hover:text-brand-text'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] uppercase tracking-tighter font-mono transition-all ${isActive ? 'text-brand-primary font-bold' : 'text-brand-muted opacity-0 group-hover:opacity-100'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-4 w-1 h-1 bg-brand-primary rounded-full shadow-[0_0_8px_#3fb950]"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
