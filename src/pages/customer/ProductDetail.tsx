import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, ShoppingBag, Star, 
  Share2, Heart, ShieldCheck, 
  Truck, ArrowRight, Bell
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inventory, addToCart, notifications } = useStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const product = inventory.find(p => p.id === id);
  const unreadCount = notifications.filter(n => !n.read).length;

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    useStore.getState().addNotification({
      title: "Selection Secured",
      message: `${product.name} has been added to your executive cart.`,
      type: 'info'
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-brand-bg relative">
      {/* Header Controls */}
      <header className="absolute top-8 left-0 right-0 px-6 flex items-center justify-between z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-black/40 backdrop-blur-xl rounded-2xl text-white shadow-xl hover:bg-black/60 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/customer/notifications')}
            className="p-3 bg-black/40 backdrop-blur-xl rounded-2xl text-white shadow-xl relative"
          >
            {unreadCount > 0 && <div className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full animate-pulse shadow-[0_0_8px_#3fb950]" />}
            <Bell size={20} />
          </button>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="p-3 bg-black/40 backdrop-blur-xl rounded-2xl shadow-xl transition-colors"
          >
            <Heart size={20} className={isLiked ? 'fill-red-500 text-red-500' : 'text-white'} />
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="h-[55vh] relative overflow-hidden">
        <motion.img 
          layoutId={product.id}
          src={product.image} 
          className="w-full h-full object-cover"
          alt={product.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 bg-brand-bg -mt-20 rounded-t-[3rem] p-8 space-y-8 pb-40">
        <header>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={14} className={i <= Math.floor(product.rating) ? 'text-brand-secondary fill-brand-secondary' : 'text-brand-muted'} />
            ))}
            <span className="text-xs text-brand-muted font-mono ml-2">({product.rating})</span>
          </div>
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-serif text-brand-text leading-tight">{product.name}</h1>
            <span className="text-2xl font-bold font-mono text-brand-primary">${product.price}</span>
          </div>
          <p className="text-brand-muted font-mono text-[10px] uppercase tracking-widest mt-2">{product.category}</p>
        </header>

        <p className="text-brand-muted text-sm leading-relaxed">
          {product.description}
        </p>

        {/* Size Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase font-mono tracking-widest">Select Size</h4>
            <button className="text-[10px] text-brand-muted uppercase font-mono tracking-widest underline underline-offset-4">Size Guide</button>
          </div>
          <div className="flex gap-3">
            {product.variants.size.map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-sm transition-all border ${
                  selectedSize === size ? 'bg-brand-primary border-brand-primary text-black font-bold shadow-[0_0_15px_#3fb950]' : 'bg-brand-card border-brand-muted/10 text-brand-muted'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase font-mono tracking-widest">Colorway</h4>
          <div className="flex gap-4">
            {product.variants.color.map(color => (
              <button 
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`flex flex-col items-center gap-2 group`}
              >
                <div className={`w-12 h-12 rounded-full border-2 p-1 transition-all ${
                  selectedColor === color ? 'border-brand-primary' : 'border-transparent'
                }`}>
                  <div 
                    className="w-full h-full rounded-full shadow-inner"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                </div>
                <span className={`text-[8px] uppercase font-mono tracking-widest transition-opacity ${selectedColor === color ? 'opacity-100 text-brand-primary' : 'opacity-40 group-hover:opacity-100'}`}>
                  {color}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="bg-brand-card p-4 rounded-2xl border border-brand-muted/5 flex flex-col gap-2">
            <ShieldCheck size={20} className="text-brand-primary" />
            <h5 className="text-[10px] font-bold uppercase font-mono">Authenticity</h5>
            <p className="text-[10px] text-brand-muted">Guaranteed Premium Quality</p>
          </div>
          <div className="bg-brand-card p-4 rounded-2xl border border-brand-muted/5 flex flex-col gap-2">
            <Truck size={20} className="text-brand-secondary" />
            <h5 className="text-[10px] font-bold uppercase font-mono">Fast Shipping</h5>
            <p className="text-[10px] text-brand-muted">Next-Day Executive Delivery</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-brand-bg/80 backdrop-blur-xl border-t border-brand-muted/10 px-8 flex items-center justify-between z-30">
        <div className="flex flex-col">
          <span className="text-[10px] text-brand-muted font-mono uppercase tracking-widest">Total Price</span>
          <span className="text-2xl font-bold font-mono text-brand-text">${product.price}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="bg-brand-primary text-black font-bold px-10 py-5 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_#3fb95040] active:scale-95 transition-all group"
        >
          <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
