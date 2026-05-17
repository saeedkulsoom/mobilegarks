import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileUp, Search, Database, LineChart, 
  CheckCircle2, AlertCircle, Play, 
  ArrowRight, FileText, ImageIcon, 
  Mic, Table, CheckSquare
} from 'lucide-react';

const STEPS = [
  { label: 'Parsing Files', icon: FileText },
  { label: 'Extracting Data', icon: Table },
  { label: 'Pattern Recognition', icon: Search },
  { label: 'Cross-Referencing', icon: Database },
  { label: 'Trend Analysis', icon: LineChart },
  { label: 'Simulating Impact', icon: Activity },
  { label: 'Generating Insights', icon: BrainCircuit }
];

import { Activity, BrainCircuit } from 'lucide-react';

export default function AIIntelligence() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'ready' | 'executed'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [insight, setInsight] = useState<any>(null);

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < STEPS.length - 1) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setStatus('ready'), 500);
          return prev;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleStart = () => {
    setStatus('processing');
    setCurrentStep(0);
    setInsight({
      title: "Stock Optimization Strategy",
      description: "Based on current trends, a 15% discount on 'Summer Polo' series will clear remaining stock before the Fall collection drops. This is projected to increase cash flow by $12k.",
      before: "Stock: 450 units, Conversion: 2.1%",
      after: "Stock: 50 units, Conversion: 8.4%",
      kpis: [
        { label: 'Conversion', value: '+300%' },
        { label: 'Inventory Cost', value: '-82%' }
      ]
    });
  };

  const handleExecute = () => {
    setStatus('executed');
  };

  return (
    <div className="flex flex-col px-6 pt-8 pb-12 gap-8">
      <header>
        <h1 className="text-3xl font-serif text-brand-text">Central Intelligence</h1>
        <p className="text-brand-muted text-xs font-mono uppercase tracking-widest mt-1">Autonomous Store Optimization</p>
      </header>

      {status === 'idle' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center py-12 gap-8"
        >
          <div className="grid grid-cols-3 gap-4 w-full">
            {[
              { icon: FileText, label: 'PDF/Docs' },
              { icon: Table, label: 'Excel/CSV' },
              { icon: ImageIcon, label: 'OCR/Images' },
              { icon: Mic, label: 'Voice' },
              { icon: Database, label: 'SQL/API' },
              { icon: CheckSquare, label: 'Tasks' }
            ].map((item, i) => (
              <div key={i} className="bg-brand-card p-4 rounded-2xl border border-brand-muted/10 flex flex-col items-center gap-2">
                <item.icon size={20} className="text-brand-primary" />
                <span className="text-[10px] font-mono text-brand-muted uppercase whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="w-full aspect-square max-w-[280px] border-2 border-dashed border-brand-muted/20 rounded-3xl flex flex-col items-center justify-center p-8 text-center gap-4 group cursor-pointer hover:border-brand-primary/40 transition-all">
            <div className="p-4 bg-brand-primary/10 rounded-full group-hover:scale-110 transition-transform">
              <FileUp size={32} className="text-brand-primary" />
            </div>
            <div>
              <p className="text-brand-text font-medium">Upload Data Sources</p>
              <p className="text-brand-muted text-[10px] uppercase font-mono mt-2 tracking-tighter">Support max 5 files (PDF, XL, CSV, IMG)</p>
            </div>
          </div>

          <button 
            onClick={handleStart}
            className="w-full bg-brand-primary text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl"
          >
            <Play size={20} />
            <span>Process Intelligence</span>
          </button>
        </motion.div>
      )}

      {status === 'processing' && (
        <div className="flex-1 flex flex-col items-center justify-center py-12">
          <div className="w-64 h-64 relative mb-12">
            {/* Spinning Brain Orbit */}
            <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border-2 border-brand-secondary/20 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit size={80} className="text-brand-primary animate-pulse" />
            </div>
            
            {/* Step Icons Orbing */}
            {STEPS.map((step, i) => {
              const isActive = i === currentStep;
              const angle = (i / STEPS.length) * Math.PI * 2;
              const x = Math.cos(angle) * 128;
              const y = Math.sin(angle) * 128;
              return (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: isActive ? 1.2 : 0.8,
                    opacity: i <= currentStep ? 1 : 0.2
                  }}
                  className={`absolute left-1/2 top-1/2 -ml-4 -mt-4 w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-brand-primary' : 'bg-brand-card'}`}
                  style={{ x, y }}
                >
                  <step.icon size={14} className={isActive ? 'text-black' : 'text-brand-muted'} />
                </motion.div>
              );
            })}
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-serif text-brand-text">{STEPS[currentStep].label}</h3>
            <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">Step {currentStep + 1} of {STEPS.length}</p>
          </div>
        </div>
      )}

      {status === 'ready' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-brand-card p-6 rounded-3xl border border-brand-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary animate-shimmer" />
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="text-brand-primary" size={24} />
              <h3 className="text-xl font-serif">{insight.title}</h3>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              {insight.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {insight.kpis.map((kpi: any, i: number) => (
                <div key={i} className="bg-brand-bg p-3 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-mono text-brand-muted uppercase">{kpi.label}</p>
                  <p className="text-lg font-bold text-brand-primary">{kpi.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-brand-card p-4 rounded-2xl border border-brand-muted/10 opacity-60">
              <span className="text-[10px] font-mono text-brand-muted uppercase block mb-2">Before Optimization</span>
              <p className="text-xs text-brand-text leading-tight">{insight.before}</p>
            </div>
            <div className="bg-brand-card p-4 rounded-2xl border border-brand-primary/20">
              <span className="text-[10px] font-mono text-brand-primary uppercase block mb-2">After (Projected)</span>
              <p className="text-xs text-brand-text leading-tight">{insight.after}</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-900/10 border border-yellow-900/30 rounded-2xl flex gap-3">
            <AlertCircle className="text-yellow-500 shrink-0" size={20} />
            <p className="text-[10px] text-yellow-500/80 uppercase font-mono leading-relaxed">
              Action Required: Approval needed to apply discount and notify 1,200 segmented customers via SMS/Email.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setStatus('idle')}
              className="flex-1 bg-brand-card text-brand-text font-bold py-4 rounded-2xl border border-brand-muted/10 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleExecute}
              className="flex-[2] bg-brand-primary text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl"
            >
              Approve & Execute <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      )}

      {status === 'executed' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-8"
        >
          <div className="relative">
            <div className="w-32 h-32 bg-brand-primary/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={64} className="text-brand-primary" />
            </div>
            <motion.div 
              initial={{ rotate: -15, scale: 0, opacity: 0 }}
              animate={{ rotate: -15, scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-4 -right-4 bg-brand-secondary text-black px-4 py-1 rounded-sm text-xs font-black uppercase tracking-tighter shadow-lg"
            >
              Executed
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-3xl font-serif">Strategy Active</h3>
            <p className="text-brand-muted text-sm">Gargi has successfully applied the optimization strategy. Live monitoring of impact is now active.</p>
          </div>

          <button 
            onClick={() => setStatus('idle')}
            className="w-full bg-brand-card text-brand-primary font-bold py-4 rounded-2xl border border-brand-primary/20"
          >
            Back to Dashboard
          </button>
        </motion.div>
      )}
    </div>
  );
}
