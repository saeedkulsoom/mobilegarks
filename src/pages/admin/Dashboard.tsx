import { motion } from 'motion/react';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  Camera, ArrowUpRight, Activity, Zap,
  BarChart3, RefreshCcw, BrainCircuit, MessageSquare, Volume2
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const SALE_DATA = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 6890 },
  { name: 'Sat', value: 8900 },
  { name: 'Sun', value: 7200 },
];

const KPI_CARDS = [
  { label: 'Revenue', value: '$45,231', change: '+12.5%', icon: DollarSign, color: '#3fb950' },
  { label: 'Orders', value: '1,284', change: '+8.2%', icon: ShoppingBag, color: '#d4a373' },
  { label: 'Customers', value: '10,902', change: '+24.1%', icon: Users, color: '#60a5fa' },
  { label: 'AOV', value: '$124.5', change: '-2.4%', icon: Activity, color: '#f87171' },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col px-6 pt-8 gap-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-brand-text">Dashboard</h1>
          <p className="text-brand-muted text-xs font-mono uppercase tracking-widest mt-1">Real-time performance</p>
        </div>
        <button className="p-3 bg-brand-card rounded-2xl border border-brand-muted/10 text-brand-muted active:rotate-180 transition-all duration-500">
          <RefreshCcw size={20} />
        </button>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-2 gap-4">
        {KPI_CARDS.map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-card p-4 rounded-3xl border border-brand-muted/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-brand-bg/50">
                <kpi.icon size={18} style={{ color: kpi.color }} />
              </div>
              <span className={`text-[10px] font-bold ${kpi.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-brand-muted text-[10px] uppercase font-mono tracking-tighter">{kpi.label}</p>
            <h4 className="text-xl font-bold font-mono mt-1">{kpi.value}</h4>
          </motion.div>
        ))}
      </section>

      {/* Sales Trend Chart */}
      <section className="bg-brand-card p-6 rounded-3xl border border-brand-muted/10 h-64">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg">Sales Trend</h3>
          <BarChart3 size={18} className="text-brand-muted" />
        </div>
        <div className="w-full h-full -ml-4">
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={SALE_DATA}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3fb950" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3fb950" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff0a" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a8b5a2', fontSize: 10, fontFamily: 'IBM Plex Mono' }} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#16221d', border: '1px solid #ffffff1a', borderRadius: '12px' }}
                itemStyle={{ color: '#3fb950', fontFamily: 'IBM Plex Mono' }}
              />
              <Area type="monotone" dataKey="value" stroke="#3fb950" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* CCTV Store Monitoring Simulation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera size={18} className="text-brand-primary" />
            <h3 className="font-serif text-lg">Store Monitoring</h3>
          </div>
          <div className="flex items-center gap-2 bg-brand-primary/10 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-brand-primary font-bold uppercase tracking-widest">Live</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-video rounded-2xl overflow-hidden bg-black group">
              <img 
                src={`https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400&sig=${i}`}
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                alt="CCTV"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-0.5">
                <span className="text-[8px] font-mono text-white/80 bg-black/40 px-1 rounded">CAM_{i.toString().padStart(2, '0')}</span>
                <span className="text-[8px] font-mono text-white/50">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
            </div>
          ))}
        </div>
        
        <div className="bg-brand-card p-4 rounded-2xl border border-brand-muted/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Total Footfall</span>
            <span className="text-2xl font-bold font-mono">1,402</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
        </div>
      </section>

      {/* Gargi Monitoring AI Section */}
      <section className="relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-card/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-brand-primary/20 relative group"
        >
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[3rem]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[radial-gradient(circle,rgba(63,185,80,0.05)_0%,transparent_70%)] animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-primary blur-md opacity-20 animate-pulse rounded-full" />
                  <div className="w-14 h-14 bg-brand-bg rounded-2xl border border-brand-primary/30 flex items-center justify-center shadow-2xl relative z-10">
                    <BrainCircuit size={28} className="text-brand-primary animate-bounce shadow-brand-primary/50" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white italic">Gargi Monitoring AI</h3>
                  <span className="text-[10px] font-mono text-brand-primary uppercase tracking-[0.3em] font-bold">Active Neural Stream</span>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-brand-bg rounded-2xl text-brand-muted hover:text-brand-primary transition-colors border border-white/5"
                >
                  <MessageSquare size={18} />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-brand-primary text-black rounded-2xl border border-brand-primary/20 shadow-lg shadow-brand-primary/20"
                >
                  <Volume2 size={18} />
                </motion.button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-brand-bg/50 rounded-3xl border border-white/5 italic">
                <p className="text-brand-text text-sm leading-relaxed font-serif">
                  "Greeting Admin. I've analyzed today's patterns. <span className="text-brand-primary">Revenue is up 12%</span> through targeted morning promos. However, <span className="text-brand-secondary">Leather Jacket stock</span> is critically low (8 units left). I suggest initiating a restock from Milan Fabrics by tonight."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-brand-card rounded-2xl border border-red-500/10 flex items-center gap-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
                  <span className="text-[10px] font-mono text-red-100 uppercase tracking-widest">3 Stock Alerts</span>
                </div>
                <div className="p-4 bg-brand-card rounded-2xl border border-brand-primary/10 flex items-center gap-4">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-brand-primary uppercase tracking-widest">Efficiency 94%</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-primary/20 overflow-hidden rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="h-full w-20 bg-brand-primary blur-sm" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
