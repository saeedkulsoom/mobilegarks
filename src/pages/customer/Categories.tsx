import { motion } from 'motion/react';
import { 
  ChevronRight, Shirt, ShoppingBag, 
  User, Footprints, Briefcase, 
  Watch, Gem
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

const CATS = [
  { name: "Men's Collection", items: "124 Items", icon: User, color: "#3fb950" },
  { name: "Women's Fashion", items: "286 Items", icon: ShoppingBag, color: "#d4a373" },
  { name: "Premium Shirts", items: "54 Items", icon: Shirt, color: "#60a5fa" },
  { name: "Leather Goods", items: "32 Items", icon: Footprints, color: "#f87171" },
  { name: "Bags & Accessories", items: "48 Items", icon: Briefcase, color: "#a855f7" },
  { name: "Luxury Watches", items: "12 Items", icon: Watch, color: "#fbbf24" },
  { name: "Fine Jewelry", items: "9 Items", icon: Gem, color: "#ec4899" },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-32">
      <PageHeader title="Collections" subtitle="Discover GarKS DNA" showBack />

      <div className="px-6 space-y-8 pt-4">
        <div className="grid grid-cols-1 gap-4">
        {CATS.map((cat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={i}
            onClick={() => navigate('/customer/shop')}
            className="group relative bg-brand-card p-6 rounded-[2rem] border border-white/5 flex items-center justify-between overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
          >
            {/* Visual Flare */}
            <div 
              className="absolute -right-4 -bottom-4 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity"
              style={{ backgroundColor: cat.color }}
            />
            
            <div className="flex items-center gap-5">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${cat.color}20`, border: `1px solid ${cat.color}30` }}
              >
                <cat.icon size={24} style={{ color: cat.color }} />
              </div>
              <div>
                <h4 className="text-lg font-serif text-brand-text mb-1">{cat.name}</h4>
                <p className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">{cat.items}</p>
              </div>
            </div>

            <div className="p-2 bg-brand-bg rounded-xl border border-white/5 group-hover:bg-brand-primary group-hover:text-black transition-all">
              <ChevronRight size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-brand-primary/5 p-8 rounded-[3rem] border border-brand-primary/20 text-center gap-4 flex flex-col items-center">
        <h3 className="text-2xl font-serif text-brand-text">Not sure where to start?</h3>
        <p className="text-brand-muted text-xs leading-relaxed max-w-[200px]">Let Gargi help you find the perfect style based on your unique personality.</p>
        <button className="bg-brand-primary text-black font-bold px-6 py-3 rounded-full text-xs uppercase tracking-widest font-mono">Talk to AI</button>
      </section>
      </div>
    </div>
  );
}
