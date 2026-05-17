import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, SlidersHorizontal, 
  ShoppingBag, Star, 
  TrendingUp, Grid2X2, LayoutList, Plus, Search
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

export default function Shop() {
  const { inventory, cartFeedback, addToCart } = useStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Shirts', 'Pants', 'Hoodies', 'Polo Shirts', 'Leather Jackets', 'Bags', 'Shoes', 'Accessories', 'Women', 'Children'];

  const filteredItems = inventory.filter(p => 
    (activeFilter === 'All' || p.category === activeFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || 
     p.category.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col pb-64">
      <PageHeader 
        title="Boutique" 
        subtitle="Curated Selection" 
        showBack 
        rightElement={
          <button 
            onClick={() => navigate('/customer/cart')}
            className="px-4 py-2 bg-brand-primary text-black rounded-full font-mono text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-brand-primary/20"
          >
            Done Shopping
          </button>
        }
      />
      
      <div className="px-6 space-y-8 pt-4">
        {/* Tool Bar */}
      <div className="space-y-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, category, fabric..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-card border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-brand-text focus:border-brand-primary outline-none transition-all font-mono text-sm shadow-inner"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Categories</span>
            <button onClick={() => setActiveFilter('All')} className="text-[10px] font-mono text-brand-primary uppercase tracking-widest hover:underline">Clear</button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-1">
            {categories.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-[10px] h-10 whitespace-nowrap font-mono uppercase tracking-widest transition-all ${
                  activeFilter === f ? 'bg-brand-primary text-black font-bold shadow-lg shadow-brand-primary/20' : 'bg-brand-card text-brand-muted border border-white/5 hover:border-brand-primary/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between bg-brand-card/40 p-2 rounded-2xl border border-white/5">
          <span className="text-[10px] font-mono text-brand-muted px-2">{filteredItems.length} styles found</span>
          <div className="flex gap-1 bg-brand-bg/50 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-brand-card text-brand-primary shadow-sm' : 'text-brand-muted'}`}
            >
              <Grid2X2 size={16} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-brand-card text-brand-primary shadow-sm' : 'text-brand-muted'}`}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map((product) => {
            const isAdded = cartFeedback === product.id;
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                onClick={() => navigate(`/customer/product/${product.id}`)}
                className={`group cursor-pointer ${view === 'list' ? 'flex gap-4 bg-brand-card p-4 rounded-3xl border border-white/5' : ''}`}
              >
                <div className={`relative rounded-2xl overflow-hidden bg-brand-card shrink-0 ${view === 'grid' ? 'aspect-[3/4] mb-3' : 'w-24 h-24'}`}>
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.name}
                  />
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md flex items-center gap-1">
                    <Star size={8} className="text-brand-secondary fill-brand-secondary" />
                    <span className="text-[8px] font-mono text-white">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-sm font-medium text-brand-text truncate mb-1">{product.name}</h4>
                  <p className="text-brand-muted text-[10px] font-mono uppercase truncate mb-2">{product.category}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-brand-primary font-bold font-mono tracking-tighter">${product.price}</span>
                    <div className="flex items-center gap-2">
                      {view === 'grid' && (
                        <div className="p-2 bg-brand-card rounded-lg border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ShoppingBag size={14} className="text-brand-muted" />
                        </div>
                      )}
                      <motion.button 
                        animate={isAdded ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className={`p-2 rounded-xl active:scale-90 transition-all shadow-lg ${
                          isAdded 
                            ? 'bg-white text-brand-primary shadow-brand-primary/40 ring-4 ring-brand-primary/20' 
                            : 'bg-brand-primary text-black hover:shadow-brand-primary/20'
                        }`}
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center gap-4">
          <TrendingUp className="text-brand-muted/20" size={48} />
          <p className="text-brand-muted font-serif italic text-lg px-8">No pieces found matching your search. Try something else or browse categories.</p>
        </div>
      )}
      </div>
    </div>
  );
}
