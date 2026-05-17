import { motion } from 'motion/react';
import { 
  Megaphone, Plus, Target, Users, 
  BarChart, Zap, Share2, MoreVertical,
  Mail, MessageSquare, Instagram
} from 'lucide-react';

const CAMPAIGNS = [
  { name: 'Summer Solstice', status: 'Active', reach: '12.4k', ctr: '4.2%', icon: Instagram, color: '#ec4899' },
  { name: 'VIP Privilege', status: 'Active', reach: '2.1k', ctr: '12.8%', icon: Mail, color: '#3fb950' },
  { name: 'Flash Friday', status: 'Draft', reach: '0', ctr: '0%', icon: Zap, color: '#fbbf24' },
];

export default function Marketing() {
  return (
    <div className="flex flex-col px-6 pt-8 pb-12 gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-brand-text">Marketing</h1>
          <p className="text-brand-muted text-xs font-mono uppercase tracking-widest mt-1">Growth & Influence</p>
        </div>
        <button className="p-3 bg-brand-primary text-black rounded-2xl shadow-lg active:scale-95 transition-all">
          <Plus size={20} />
        </button>
      </header>

      {/* Target Audience Overview */}
      <section className="bg-brand-card p-6 rounded-[2rem] border border-brand-muted/10 grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-brand-primary" />
            <span className="text-[10px] font-bold font-mono text-brand-primary uppercase tracking-[0.2em]">Target Reach</span>
          </div>
          <h4 className="text-3xl font-bold font-mono">24.8k</h4>
          <p className="text-[8px] text-brand-muted uppercase font-mono tracking-widest">Active Segments</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-brand-secondary" />
            <span className="text-[10px] font-bold font-mono text-brand-secondary uppercase tracking-[0.2em]">Acquisition</span>
          </div>
          <h4 className="text-3xl font-bold font-mono">+12%</h4>
          <p className="text-[8px] text-brand-muted uppercase font-mono tracking-widest">MoM Growth</p>
        </div>
      </section>

      {/* Campaign List */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl px-2">Active Campaigns</h3>
        <div className="space-y-3">
          {CAMPAIGNS.map((camp, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-brand-card p-5 rounded-3xl border border-white/5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${camp.color}15`, border: `1px solid ${camp.color}30` }}
                >
                  <camp.icon size={20} style={{ color: camp.color }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-text mb-1">{camp.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                      camp.status === 'Active' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-brand-muted/10 text-brand-muted'
                    }`}>
                      {camp.status}
                    </span>
                    <span className="text-[10px] font-mono text-brand-muted">{camp.reach} Reach</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right flex flex-col items-end">
                  <span className="text-[8px] font-mono text-brand-muted uppercase">CTR</span>
                  <span className="text-sm font-bold font-mono text-brand-primary">{camp.ctr}</span>
                </div>
                <button className="p-2 text-brand-muted group-hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI AI Marketing Tool */}
      <section className="bg-brand-bg border border-brand-primary/30 p-8 rounded-[3rem] text-center gap-6 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/5 opacity-50 blur-[60px]" />
        <div className="relative space-y-4">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Zap size={32} className="text-brand-primary" />
          </div>
          <h3 className="text-2xl font-serif text-brand-text leading-tight">Create Smart<br />Segments</h3>
          <p className="text-brand-muted text-xs leading-relaxed">
            Let Gargi analyze previous purchase history to identify high-intent VIP customers for your next collection.
          </p>
          <button className="bg-brand-primary text-black font-bold px-10 py-4 rounded-2xl text-xs uppercase tracking-widest font-mono shadow-[0_10px_30px_#3fb95030] active:scale-95 transition-all">
            Open AI Lab
          </button>
        </div>
      </section>
    </div>
  );
}
