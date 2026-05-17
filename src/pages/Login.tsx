import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { Smartphone, Mail, Globe, User, Lock, ArrowRight, ChevronLeft } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  const navigate = useNavigate();
  const { setUser, mode, addNotification } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth
    setTimeout(() => {
      setUser({
        id: '1',
        username: formData.username || 'Saeed',
        name: mode === 'admin' ? 'Admin Master' : 'Saeed GarKS',
        email: formData.email || 'garKS.official@luxury.com',
        phone: formData.phone || '+92 321 4567890',
        isAdmin: mode === 'admin',
        photo: mode === 'admin' ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
      });
      
      addNotification({
        title: mode === 'admin' ? "Admin Access Granted" : "Welcome to the Boutique",
        message: mode === 'admin' ? "Gargi AI is initializing your dashboard." : "Your exclusive shopping session has started.",
        type: 'info'
      });

      if (mode === 'customer') {
        addNotification({
          title: "Season Premiere: 25% OFF",
          message: "Check the new Men's Leather Collection. Use code GARKS-PRUM.",
          type: 'sale'
        });
      }

      navigate(mode === 'admin' ? '/admin' : '/customer');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-brand-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[100px] -ml-40 -mb-40 animate-pulse" />

      <div className="flex-1 flex flex-col px-8 pt-16 relative z-10">
        <header className="mb-12">
          <button 
            onClick={() => navigate('/')} 
            className="mb-8 p-3 bg-brand-card rounded-2xl text-brand-muted hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl font-serif text-brand-text mb-2 italic">Exclusive<br />{mode === 'admin' ? 'Management' : 'Access'}</h1>
            <p className="text-brand-muted text-[10px] font-mono uppercase tracking-[0.4em]">Identify yourself to proceed</p>
          </motion.div>
        </header>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Username */}
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-primary transition-colors" size={18} />
              <input 
                required
                type="text" 
                placeholder="Username" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full bg-brand-card/50 backdrop-blur-xl border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-brand-text outline-none focus:border-brand-primary/50 transition-all font-mono text-xs"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-primary transition-colors" size={18} />
              <input 
                required
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-brand-card/50 backdrop-blur-xl border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-brand-text outline-none focus:border-brand-primary/50 transition-all font-mono text-xs"
              />
            </div>

            {/* Phone */}
            <div className="relative group">
              <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-primary transition-colors" size={18} />
              <input 
                required
                type="tel" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-brand-card/50 backdrop-blur-xl border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-brand-text outline-none focus:border-brand-primary/50 transition-all font-mono text-xs"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-primary transition-colors" size={18} />
              <input 
                required
                type="password" 
                placeholder="Secure Password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-brand-card/50 backdrop-blur-xl border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-brand-text outline-none focus:border-brand-primary/50 transition-all font-mono text-xs"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-primary text-black font-bold py-6 rounded-3xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(63,185,80,0.2)] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span className="font-mono text-xs uppercase tracking-widest">Authorize Session</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </motion.div>
        </form>

        <div className="mt-12 space-y-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-[8px]"><span className="bg-brand-bg px-4 text-brand-muted font-mono uppercase tracking-[0.4em]">Alternative Gateways</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-4 bg-brand-card/30 p-8 rounded-[2rem] border border-white/5 hover:border-brand-primary/30 transition-all group">
              <Globe className="text-brand-muted group-hover:text-brand-primary transition-colors" size={24} />
              <span className="text-[8px] font-mono text-brand-muted uppercase tracking-widest">Google Sign In</span>
            </button>
            <button className="flex flex-col items-center gap-4 bg-brand-card/30 p-8 rounded-[2rem] border border-white/5 hover:border-brand-primary/30 transition-all group">
              <Smartphone className="text-brand-muted group-hover:text-brand-primary transition-colors" size={24} />
              <span className="text-[8px] font-mono text-brand-muted uppercase tracking-widest">Phone SMS</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="p-12 text-center relative z-10">
        <p className="text-[8px] font-mono uppercase tracking-[0.4em] text-brand-muted leading-relaxed italic opacity-40">
          GarKS Secure Verification System<br />
          <span className="text-brand-primary">Neural Safeguard Active</span>
        </p>
      </footer>
    </div>
  );
}
