/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useStore } from './store/useStore';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Notifications from './pages/customer/Notifications';
import TopBanner from './components/TopBanner';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

function ExitConfirmation() {
  const location = useLocation();
  
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Do you want to stay or leave?";
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return null;
}

export default function App() {
  const { isLoggedIn, mode, toast } = useStore();

  return (
    <Router>
      <ExitConfirmation />
      <TopBanner />
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toast?.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[100] px-6 py-3 bg-brand-primary text-black rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <Sparkles size={16} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
        {/* Mobile Frame Simulation */}
        <div className="relative w-full max-w-[430px] aspect-[9/19.5] bg-brand-bg rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden flex flex-col">
          {/* Status Bar Mock */}
          <div className="h-10 w-full bg-brand-bg flex items-center justify-between px-8 text-xs font-mono text-brand-muted shrink-0 z-50">
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-brand-muted flex items-center justify-center text-[8px]">5G</div>
              <div className="w-6 h-3 border border-brand-muted rounded-sm relative">
                <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1 h-1.5 bg-brand-muted rounded-r-xs" />
                <div className="m-[1px] h-[calc(100%-2px)] w-4 bg-brand-primary rounded-xs" />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about" element={<About />} />
              <Route 
                path="/customer/*" 
                element={isLoggedIn ? <CustomerLayout /> : <Navigate to="/login" />} 
              />
              
              <Route 
                path="/admin/*" 
                element={(isLoggedIn && mode === 'admin') ? <AdminLayout /> : <Navigate to="/customer" />} 
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>

          {/* Home Indicator */}
          <div className="h-8 w-full bg-transparent flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-brand-muted/20 rounded-full" />
          </div>
        </div>
      </div>
    </Router>
  );
}

