import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, X, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function TopBanner() {
  const { notifications } = useStore();
  const [show, setShow] = useState(false);
  const latestSale = notifications.find(n => n.type === 'sale' && !n.read);

  useEffect(() => {
    if (latestSale) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [latestSale]);

  return (
    <AnimatePresence>
      {show && latestSale && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-12 left-6 right-6 z-[100]"
        >
          <div className="bg-brand-primary text-black p-4 rounded-2xl shadow-[0_10px_30px_rgba(63,185,80,0.3)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/10 rounded-xl">
                <Zap size={20} className="fill-current" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase font-mono tracking-widest leading-none mb-1">Live Update</h4>
                <p className="text-xs font-bold leading-tight">{latestSale.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShow(false)}
                className="p-2 hover:bg-black/10 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
