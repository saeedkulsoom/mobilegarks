import { motion } from 'motion/react';
import { 
  User, Shield, Moon, Globe, 
  Bell, FileLock2, Info, LogOut, 
  ChevronRight, Camera, RefreshCw
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../components/PageHeader';

export default function Profile() {
  const { user, mode, setMode, logout } = useStore();
  const navigate = useNavigate();

  const handleModeSwitch = () => {
    const newMode = mode === 'customer' ? 'admin' : 'customer';
    setMode(newMode);
    navigate(newMode === 'admin' ? '/admin' : '/customer');
  };

  const menuItems = [
    { label: 'Notifications', icon: Bell, value: 'Enabled', path: '/customer/notifications' },
    { label: 'Auth Strategy', icon: Shield, value: 'Email + Phone', path: '/login' },
    { label: 'Language', icon: Globe, value: 'English' },
    { label: 'Privacy Policy', icon: FileLock2, path: '/privacy' },
    { label: 'About GarKS', icon: Info, path: '/about' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col pb-12">
      <PageHeader title="Private Profile" subtitle="Account Settings" showBack />
      
      <div className="px-6 space-y-8 pt-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-brand-primary p-1">
            <img 
              src={user?.photo} 
              className="w-full h-full rounded-full object-cover"
              alt="Profile"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-brand-primary text-black rounded-full shadow-xl border-4 border-brand-bg">
            <Camera size={16} />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-serif text-brand-text">{user?.name}</h2>
          <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest mt-1">{user?.phone}</p>
        </div>
      </div>

      {/* Mode Switcher */}
      {user?.isAdmin && (
        <section>
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-primary/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="text-brand-primary" size={20} />
                <div>
                  <h4 className="text-sm font-bold uppercase font-mono tracking-tighter">Switch Mode</h4>
                  <p className="text-[10px] text-brand-muted">Current: {mode.toUpperCase()}</p>
                </div>
              </div>
              <button 
                onClick={handleModeSwitch}
                className="p-3 bg-brand-primary text-black rounded-xl active:rotate-180 transition-all duration-500"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <p className="text-[10px] text-brand-muted leading-relaxed">
              As an authorized administrator, you can switch between the boutique view and the central intelligence dashboard.
            </p>
          </div>
        </section>
      )}

      {/* Menu List */}
      <section className="space-y-4">
        <h3 className="font-serif text-lg ml-2">Preferences</h3>
        <div className="bg-brand-card rounded-3xl border border-brand-muted/10 overflow-hidden">
          {menuItems.map((item, i) => (
            <button 
              key={i}
              onClick={() => item.path && navigate(item.path)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-brand-muted/5 last:border-0 grow"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-brand-bg rounded-xl">
                  <item.icon size={18} className="text-brand-muted" />
                </div>
                <span className="text-brand-text text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && <span className="text-xs text-brand-muted font-mono">{item.value}</span>}
                <ChevronRight size={16} className="text-brand-muted/30" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="w-full bg-red-400/10 text-red-400 font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-red-400/20 transition-all border border-red-400/20"
      >
        <LogOut size={20} />
        <span className="font-mono text-xs uppercase tracking-widest">Terminate Session</span>
      </button>

      <footer className="text-center opacity-40 py-8">
        <h1 className="font-serif text-2xl text-brand-text mb-1 italic">GarKS</h1>
        <p className="text-[8px] font-mono uppercase tracking-[0.4em]">Style. Smart. Simple.</p>
        <p className="text-[8px] font-mono mt-4">Version 2.4.1 Production</p>
      </footer>
      </div>
    </div>
  );
}
