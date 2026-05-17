import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Megaphone, BrainCircuit, Bell, User, Truck } from 'lucide-react';
import AdminDashboard from '../pages/admin/Dashboard';
import Inventory from '../pages/admin/Inventory';
import Suppliers from '../pages/admin/Suppliers';
import Marketing from '../pages/admin/Marketing';
import AIIntelligence from '../pages/admin/AIIntelligence';
import Alerts from '../pages/admin/Alerts';
import Profile from '../pages/Profile';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dash', icon: LayoutDashboard, path: '/admin' },
    { label: 'Stock', icon: Package, path: '/admin/inventory' },
    { label: 'Suppliers', icon: Truck, path: '/admin/suppliers' },
    { label: 'Ads', icon: Megaphone, path: '/admin/marketing' },
    { label: 'AI', icon: BrainCircuit, path: '/admin/ai' },
    { label: 'User', icon: User, path: '/admin/profile' },
  ];

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-brand-bg">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/ai" element={<AIIntelligence />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Admin Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 h-20 bg-brand-bg/80 backdrop-blur-xl border-t border-brand-primary/20 px-6 flex items-center justify-between z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 group relative"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'text-brand-secondary bg-brand-secondary/10' : 'text-brand-muted hover:text-brand-text'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] uppercase tracking-tighter font-mono transition-all ${isActive ? 'text-brand-secondary font-bold' : 'text-brand-muted opacity-0 group-hover:opacity-100'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="adminActiveTab"
                  className="absolute -bottom-4 w-1 h-1 bg-brand-secondary rounded-full shadow-[0_0_8px_#d4a373]"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
