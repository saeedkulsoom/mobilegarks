import { motion } from 'motion/react';
import { Search, Bell, Sparkles, TrendingUp, Star, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const CATEGORIES = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80' },
  { name: 'Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80' },
  { name: 'Leather', image: 'https://images.unsplash.com/photo-1590739225287-bd31519780c3?auto=format&fit=crop&q=80' },
];

export default function CustomerHome() {
  const { user, inventory, addToCart, cartFeedback } = useStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-32">
      <PageHeader 
        title={user?.username || 'Guest'} 
        subtitle="Selection for you" 
        rightElement={
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/customer/notifications')}
              className="p-3 bg-brand-card rounded-2xl text-brand-muted relative hover:text-white transition-colors"
            >
              <Bell size={20} />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-brand-bg shadow-sm" />
            </button>
          </div>
        }
      />

      {/* Hero Banner */}
      <section className="px-6 py-4">
        <motion.div 
          onClick={() => navigate('/customer/shop')}
          whileHover={{ scale: 1.02 }}
          className="relative h-44 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1549037173-e3b717902c57?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-center">
            <span className="text-brand-primary font-mono text-[10px] uppercase tracking-[0.2em] mb-2">New Season</span>
            <h3 className="text-3xl font-serif text-white mb-4 leading-tight">Mastering<br />Minimalism</h3>
            <button className="w-fit bg-brand-primary text-black text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 active:scale-95 transition-all shadow-lg shadow-brand-primary/20">
              Shop Now <Sparkles size={14} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="py-6">
        <div className="px-6 mb-4 flex items-center justify-between">
          <h3 className="text-lg font-serif">Categories</h3>
          <button 
            onClick={() => navigate('/customer/categories')}
            className="text-brand-primary text-[10px] font-mono uppercase tracking-[0.1em] hover:underline"
          >
            View All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/customer/shop')}
              className="flex flex-col items-center gap-3 shrink-0"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-brand-muted/10 shadow-lg bg-brand-card">
                <img src={cat.image} className="w-full h-full object-cover" alt={cat.name} />
              </div>
              <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Products Grid */}
      <section className="px-6 py-6">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp size={18} className="text-brand-secondary" />
          <h3 className="text-lg font-serif">Best Sellers</h3>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {inventory.map((product) => (
            <motion.div
              layoutId={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={product.id}
              onClick={() => navigate(`/customer/product/${product.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-brand-card">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={product.name}
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg">
                  <Star size={10} className="text-brand-secondary fill-brand-secondary" />
                  <span className="text-[10px] font-mono text-white">{product.rating}</span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-brand-text truncate mb-1">{product.name}</h4>
              <p className="text-brand-muted text-xs font-mono mb-2">{product.category}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-brand-primary font-bold font-mono">
                    ${product.price}
                  </span>
                  <span className="text-[10px] text-brand-muted">Premium</span>
                </div>
                <motion.button 
                  animate={cartFeedback === product.id ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className={`p-2.5 rounded-xl active:scale-90 transition-all shadow-lg ${
                    cartFeedback === product.id 
                      ? 'bg-white text-brand-primary shadow-brand-primary/40 ring-4 ring-brand-primary/20' 
                      : 'bg-brand-primary text-black hover:shadow-brand-primary/20'
                  }`}
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
