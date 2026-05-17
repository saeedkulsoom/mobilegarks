import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, 
  CreditCard, ShieldCheck, ShoppingCart, Truck, Smartphone, X 
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [paymentMethod, setPaymentMethod] = useState('card');

  const PAYMENT_METHODS = [
    { id: 'cod', label: 'Cash on Delivery', icon: Truck, description: 'Pay upon delivery' },
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, description: 'Direct secure transfer' },
    { id: 'easypaisa', label: 'EasyPaisa', icon: Smartphone, description: 'Mobile wallet (PK)' },
    { id: 'jazzcash', label: 'JazzCash', icon: Smartphone, description: 'Mobile wallet (PK)' },
    { id: 'paypal', label: 'PayPal', icon: ShieldCheck, description: 'Global digital payment' },
  ];

  const handlePlaceOrder = () => {
    setIsCheckingOut(false);
    setShowThankYou(true);
    clearCart();
    
    // Add order notification
    useStore.getState().addNotification({
      title: "Acquisition Finalized",
      message: `Your executive order ($${total.toFixed(2)}) is being staged.`,
      type: 'order'
    });
  };

  if (showThankYou) {
    return (
      <div className="flex flex-col h-full bg-black relative overflow-hidden">
        {/* Animated Background Confetti Mock */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0, x: Math.random() * 400 }}
              animate={{ 
                y: 800, 
                opacity: [0, 1, 1, 0],
                rotate: 360,
                x: (Math.random() * 400) + (Math.random() * 100 - 50)
              }}
              transition={{ 
                duration: 2 + Math.random() * 3, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-2 h-2 rounded-sm"
              style={{ backgroundColor: i % 2 === 0 ? '#3fb950' : '#d4a373' }}
            />
          ))}
        </div>

        <PageHeader title="Confirmed" subtitle="Acquisition Complete" showBack />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center p-12 text-center gap-12 relative z-10"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-2 border-dashed border-brand-primary/20 rounded-full scale-150" 
            />
            <div className="w-40 h-40 bg-brand-primary/10 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(63,185,80,0.1)] border border-brand-primary/20">
              <ShieldCheck size={80} className="text-brand-primary drop-shadow-[0_0_15px_rgba(63,185,80,0.5)]" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-brand-secondary text-black text-[12px] font-bold px-4 py-2 rounded-2xl uppercase tracking-widest shadow-2xl"
            >
              SUCCESS
            </motion.div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-5xl font-serif text-brand-text leading-tight italic">Excellence Delivered.</h3>
            <p className="text-brand-muted text-sm px-4 leading-relaxed font-mono uppercase tracking-widest opacity-60">
              Gargi is synchronizing your delivery nodes. Check your notifications for live tracking.
            </p>
          </div>

          <div className="w-full space-y-4 pt-8">
            <button 
              onClick={() => navigate('/customer')}
              className="w-full bg-brand-primary text-black font-bold py-6 rounded-3xl shadow-[0_20px_40px_rgba(63,185,80,0.2)] active:scale-95 transition-all font-mono text-xs uppercase tracking-widest"
            >
              Return to Gallery
            </button>
            <p className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.4em]">Order ID: #GK-2026-9A1</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0 && !isCheckingOut) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader title="Your Items" subtitle="Basket" showBack />
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center gap-6">
          <div className="w-24 h-24 bg-brand-card rounded-[2.5rem] flex items-center justify-center text-brand-muted border border-white/5 shadow-inner">
            <ShoppingCart size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-brand-text italic leading-tight">Your gallery is empty</h3>
            <p className="text-brand-muted text-xs px-4 font-mono uppercase tracking-widest opacity-60">Acquire pieces that define your presence.</p>
          </div>
          <button 
            onClick={() => navigate('/customer/shop')}
            className="bg-brand-primary text-black font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-10 py-5 rounded-2xl active:scale-95 transition-all shadow-lg shadow-brand-primary/20"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-32">
      <PageHeader title="Your Cart" subtitle={`${cart.length} Selections`} showBack />

      <div className="px-6 space-y-10 pt-4">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -100 }}
                key={item.id}
                className="bg-brand-card p-5 rounded-[2.5rem] border border-white/5 flex items-center gap-5 group shadow-lg"
              >
                <div className="w-24 h-24 rounded-3xl overflow-hidden bg-brand-bg shrink-0 border border-white/5 p-1">
                  <img src={item.image} className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-md font-serif text-brand-text truncate italic">{item.name}</h4>
                  <p className="text-[10px] font-mono text-brand-muted uppercase tracking-widest truncate mb-3">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-primary font-bold font-mono tracking-tighter text-lg">${item.price}</span>
                    <div className="flex items-center gap-4 bg-brand-bg/80 rounded-2xl px-4 py-2 border border-white/5">
                      <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="text-brand-muted hover:text-brand-primary transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="text-brand-muted hover:text-brand-primary transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-brand-muted hover:text-red-400 transition-all hover:bg-red-400/10 rounded-2xl"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Summary */}
        <section className="bg-brand-card/40 backdrop-blur-md p-8 rounded-[3rem] border border-white/5 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl" />
          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-muted font-mono uppercase tracking-[0.2em]">Item Subtotal</span>
            <span className="font-mono text-brand-text font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-muted font-mono uppercase tracking-[0.2em]">Executive Logistics</span>
            <span className="font-mono text-brand-primary font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-muted font-mono uppercase tracking-[0.2em]">Luxury Assessment</span>
            <span className="font-mono text-brand-text font-bold">${tax.toFixed(2)}</span>
          </div>
          <div className="h-[1px] bg-white/5" />
          <div className="flex justify-between items-center">
            <span className="font-serif text-xl italic text-brand-muted">Total Investment</span>
            <span className="text-3xl font-bold font-mono text-brand-primary drop-shadow-[0_0_10px_rgba(63,185,80,0.3)]">${total.toFixed(2)}</span>
          </div>
        </section>

        <button 
          onClick={() => setIsCheckingOut(true)}
          className="w-full bg-brand-primary text-black font-bold py-6 rounded-3xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-[0_20px_40px_rgba(63,185,80,0.2)] group"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Authorize Payment</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Modern High-End Checkout Overlay */}
      <AnimatePresence>
        {isCheckingOut && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckingOut(false)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 z-[110] bg-brand-bg rounded-t-[4rem] p-10 pb-20 space-y-12 border-t border-brand-primary/20 shadow-[0_-30px_100px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-4xl font-serif text-brand-text italic leading-none">Checkout</h3>
                  <p className="text-brand-muted text-[10px] font-mono uppercase tracking-[0.3em] mt-3">Finalize your neural transfer</p>
                </div>
                <button onClick={() => setIsCheckingOut(false)} className="p-4 bg-brand-card rounded-2xl text-brand-muted hover:text-white transition-colors border border-white/5">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6 overflow-y-auto no-scrollbar max-h-[50vh]">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.2em] px-2">Payment Infrastructure</span>
                  <div className="grid grid-cols-1 gap-4">
                    {PAYMENT_METHODS.map((p) => (
                      <motion.div 
                        key={p.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaymentMethod(p.id)}
                        className={`p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                          paymentMethod === p.id 
                            ? 'border-brand-primary bg-brand-primary/5 shadow-[0_0_30px_rgba(63,185,80,0.1)]' 
                            : 'border-white/5 bg-brand-card/50 hover:border-brand-primary/20'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`p-4 rounded-2xl transition-colors ${
                            paymentMethod === p.id ? 'bg-brand-primary text-black' : 'bg-brand-bg text-brand-muted'
                          }`}>
                            <p.icon size={24} />
                          </div>
                          <div>
                            <p className={`text-md font-bold transition-colors ${
                              paymentMethod === p.id ? 'text-brand-text' : 'text-brand-muted'
                            }`}>{p.label}</p>
                            <p className="text-[10px] text-brand-muted/60 font-mono tracking-widest uppercase">{p.description}</p>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === p.id ? 'border-brand-primary bg-brand-primary' : 'border-white/10'
                        }`}>
                          {paymentMethod === p.id && <ShieldCheck size={16} className="text-black" />}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-brand-primary text-black font-bold py-6 rounded-3xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-[0_20px_50px_rgba(63,185,80,0.3)]"
                >
                  <ShieldCheck size={24} />
                  <span className="font-mono text-xs uppercase tracking-[0.2em]">Authorize — ${total.toFixed(2)}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
