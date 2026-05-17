import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Search, Plus, Filter, 
  ChevronRight, Phone, Mail, MapPin,
  Truck, Package, DollarSign, Star, X
} from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Suppliers() {
  const { suppliers, purchaseOrders, inventory } = useStore();
  const [search, setSearch] = useState('');
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.company.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col px-6 pt-8 gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-brand-text italic">Suppliers</h1>
          <p className="text-brand-muted text-[10px] font-mono uppercase tracking-widest mt-1">Vendor & Logistical Management</p>
        </div>
        <button 
          onClick={() => setShowAddSupplier(true)}
          className="p-3 bg-brand-primary text-black rounded-2xl shadow-lg active:scale-95 transition-all"
        >
          <Plus size={20} />
        </button>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { label: 'Vendors', value: suppliers.length.toString(), icon: Users, color: '#3fb950' },
          { label: 'Active POs', value: purchaseOrders.filter(p => p.status !== 'Completed').length.toString(), icon: Package, color: '#d4a373' },
          { label: 'Liability', value: `$${purchaseOrders.filter(p => p.status !== 'Completed').reduce((acc, p) => acc + p.totalCost, 0).toLocaleString()}`, icon: DollarSign, color: '#60a5fa' },
        ].map((stat, i) => (
          <div key={i} className="bg-brand-card p-4 rounded-3xl border border-brand-muted/10">
            <stat.icon size={16} style={{ color: stat.color }} className="mb-2" />
            <p className="text-[8px] font-mono text-brand-muted uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-lg font-bold font-mono mt-1">{stat.value}</h4>
          </div>
        ))}
      </section>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
        <input 
          type="text" 
          placeholder="Search vendors, company, region..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-brand-card border border-brand-muted/10 rounded-2xl py-4 pl-12 pr-4 text-brand-text focus:border-brand-primary outline-none transition-all font-mono text-sm"
        />
      </div>

      {/* Supplier List */}
      <section className="flex-1 space-y-4 mb-8">
        <h3 className="text-xs font-mono text-brand-muted uppercase tracking-[0.2em] px-2">Primary Vendors</h3>
        {filteredSuppliers.map((supplier) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={supplier.id}
            className="bg-brand-card p-6 rounded-[2rem] border border-brand-muted/10 flex flex-col gap-4 group hover:border-brand-primary/30 transition-all shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-bg flex items-center justify-center border border-white/5">
                  <Truck size={24} className="text-brand-primary/60" />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-brand-text italic leading-tight">{supplier.company}</h4>
                  <p className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">{supplier.name} • {supplier.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-brand-primary/10 px-2 py-1 rounded-lg">
                <Star size={10} className="text-brand-primary fill-brand-primary" />
                <span className="text-[10px] font-mono text-brand-primary font-bold">{supplier.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted">
                <Phone size={12} className="text-brand-primary/40" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted">
                <Mail size={12} className="text-brand-primary/40" />
                <span className="truncate">{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted col-span-2">
                <MapPin size={12} className="text-brand-primary/40" />
                <span className="truncate">{supplier.address}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-2">
              <button className="flex-1 py-3 bg-brand-bg rounded-xl text-[10px] font-mono uppercase tracking-widest text-brand-muted hover:text-white border border-white/5 transition-all">
                Order History
              </button>
              <button className="flex-1 py-3 bg-brand-primary text-black rounded-xl text-[10px] font-mono uppercase tracking-widest font-bold shadow-lg shadow-brand-primary/10 active:scale-95 transition-all">
                New Purchase
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Add Supplier Modal Simulation */}
      <AnimatePresence>
        {showAddSupplier && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-brand-card rounded-[2.5rem] border border-white/10 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl" />
              <button 
                onClick={() => setShowAddSupplier(false)}
                className="absolute top-6 right-6 p-2 bg-brand-bg rounded-xl text-brand-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-3xl font-serif text-brand-text mb-2 italic">New Partner</h3>
              <p className="text-brand-muted text-[10px] font-mono uppercase tracking-widest mb-8">Onboard a new supplier</p>

              <div className="space-y-4">
                <input type="text" placeholder="Company Name" className="w-full bg-brand-bg border border-white/5 rounded-xl py-4 px-6 text-brand-text text-xs font-mono outline-none focus:border-brand-primary/50 transition-all" />
                <input type="text" placeholder="Contact Person" className="w-full bg-brand-bg border border-white/5 rounded-xl py-4 px-6 text-brand-text text-xs font-mono outline-none focus:border-brand-primary/50 transition-all" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Category" className="w-full bg-brand-bg border border-white/5 rounded-xl py-4 px-6 text-brand-text text-xs font-mono outline-none focus:border-brand-primary/50 transition-all" />
                  <input type="text" placeholder="Phone" className="w-full bg-brand-bg border border-white/5 rounded-xl py-4 px-6 text-brand-text text-xs font-mono outline-none focus:border-brand-primary/50 transition-all" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-brand-bg border border-white/5 rounded-xl py-4 px-6 text-brand-text text-xs font-mono outline-none focus:border-brand-primary/50 transition-all" />
              </div>

              <button className="w-full bg-brand-primary text-black font-bold py-5 rounded-2xl mt-8 shadow-xl shadow-brand-primary/10 active:scale-95 transition-all font-mono text-xs uppercase tracking-widest">
                Add Supplier
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
