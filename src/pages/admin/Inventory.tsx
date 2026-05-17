import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scan, Search, Plus, Filter, 
  ChevronRight, Box, AlertTriangle, X,
  Camera, Zap
} from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Inventory() {
  const { inventory } = useStore();
  const [showScanner, setShowScanner] = useState(false);
  const [search, setSearch] = useState('');

  const filteredItems = inventory.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col px-6 pt-8 gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-brand-text">Inventory</h1>
          <p className="text-brand-muted text-xs font-mono uppercase tracking-widest mt-1">Managed by GarKS Intel</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowScanner(true)}
            className="p-3 bg-brand-primary text-black rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            <Scan size={20} />
          </button>
          <button className="p-3 bg-brand-card rounded-2xl border border-brand-muted/10 text-brand-text active:scale-95 transition-all">
            <Plus size={20} />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
        <input 
          type="text" 
          placeholder="Search products, SKUs, styles..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-brand-card border border-brand-muted/10 rounded-2xl py-4 pl-12 pr-4 text-brand-text focus:border-brand-primary outline-none transition-all font-mono text-sm"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-brand-muted">
          <Filter size={18} />
        </button>
      </div>

      {/* Quick Stats */}
      <section className="flex gap-4 overflow-x-auto no-scrollbar">
        {[
          { label: 'Total Items', value: inventory.reduce((acc, item) => acc + item.stock, 0).toString(), color: 'brand-primary' },
          { label: 'Low Stock', value: inventory.filter(i => i.stock < 10).length.toString(), color: 'red-400' },
          { label: 'Valuation', value: `$${inventory.reduce((acc, item) => acc + (item.price * item.stock), 0).toLocaleString()}`, color: 'brand-secondary' },
        ].map((stat, i) => (
          <div key={i} className="shrink-0 bg-brand-card px-6 py-4 rounded-3xl border border-brand-muted/10 min-w-[140px]">
            <p className="text-[10px] font-mono text-brand-muted uppercase tracking-tighter mb-1">{stat.label}</p>
            <h4 className={`text-xl font-bold font-mono text-${stat.color}`}>{stat.value}</h4>
          </div>
        ))}
      </section>

      {/* Stock List */}
      <section className="flex-1 space-y-4 mb-8">
        {filteredItems.map((item) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={item.id}
            className="bg-brand-card p-4 rounded-3xl border border-brand-muted/10 flex items-center gap-4 group"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-brand-bg shrink-0">
              <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-brand-text truncate">{item.name}</h4>
              <p className="text-[10px] font-mono text-brand-muted uppercase truncate">{item.category}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                  item.stock < 10 ? 'bg-red-500/20 text-red-400' : 'bg-brand-primary/20 text-brand-primary'
                }`}>
                  {item.stock} in stock
                </span>
                <span className="text-[10px] font-mono text-brand-muted">${item.price}</span>
              </div>
            </div>
            <button className="p-2 text-brand-muted group-hover:text-brand-primary transition-colors">
              <ChevronRight size={20} />
            </button>
          </motion.div>
        ))}
      </section>

      {/* Barcode Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            <div className="flex-1 relative flex items-center justify-center">
              {/* Camera Simulation Background */}
              <div className="absolute inset-0 bg-gray-900 overflow-hidden flex items-center justify-center">
                <Camera size={120} className="text-white/5" />
                {/* Abstract scanning patterns */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
              </div>

              {/* Scanner HUD */}
              <div className="relative w-72 h-72">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-primary rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-primary rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-primary rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-primary rounded-br-2xl" />

                {/* Animated Scanner Line */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-brand-primary shadow-[0_0_15px_#3fb950] z-10"
                />
                
                {/* Simulated Target Details */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-center w-full">
                  <p className="text-brand-primary font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Align SKU Barcode</p>
                  <p className="text-white/40 text-[8px] font-mono mt-1 uppercase">Auto-focus active | ISO 800</p>
                </div>
              </div>

              {/* Exit Button */}
              <button 
                onClick={() => setShowScanner(false)}
                className="absolute top-12 right-8 p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="bg-brand-card p-12 text-center space-y-6 rounded-t-[3rem]">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-serif text-brand-text">Smart Scanner</h3>
                <p className="text-brand-muted text-sm px-4">Detects Barcodes, QR Codes and RFID signals automatically using GarKS Vision.</p>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="p-4 bg-brand-bg rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                  <Box size={24} className="text-brand-muted" />
                  <span className="text-[8px] font-mono uppercase text-brand-muted">Hardware ID</span>
                </div>
                <div className="p-4 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 flex flex-col items-center gap-2">
                  <Zap size={24} className="text-brand-primary" />
                  <span className="text-[8px] font-mono uppercase text-brand-primary">Auto-Sync</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


