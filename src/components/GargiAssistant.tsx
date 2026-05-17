import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Mic, BrainCircuit, Sparkles, MicOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useStore } from '../store/useStore';

function VoiceVisualizer({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center gap-1 h-8 px-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.div
          key={i}
          animate={isActive ? {
            height: [4, 16, 8, 20, 4][Math.floor(Math.random() * 5)],
          } : { height: 4 }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.05
          }}
          className="w-1 bg-brand-primary rounded-full"
        />
      ))}
    </div>
  );
}

export default function GargiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user, mode } = useStore();

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice-to-text
      setTimeout(() => {
        setIsListening(false);
        setMessage("Recommend some premium leather bags.");
      }, 2500);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [history, isOpen]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/gargi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          isAdmin: mode === 'admin',
          context: {
            userName: user?.name,
            currentView: mode,
          }
        })
      });
      const data = await response.json();
      setHistory(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center shadow-2xl relative group"
      >
        <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-20" />
        <BrainCircuit className="text-black" size={28} />
        <span className="absolute -top-10 right-0 bg-brand-secondary text-black text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-widest whitespace-nowrap">
          Ask Gargi
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none p-4"
          >
            <div className="w-full max-w-[400px] h-[60vh] bg-brand-card rounded-3xl shadow-2xl flex flex-col border border-brand-muted/20 pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="p-6 border-bottom border-brand-muted/10 flex items-center justify-between bg-brand-bg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <BrainCircuit className="text-brand-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="text-brand-text font-serif leading-none mb-1">Gargi AI</h4>
                    <span className="text-[10px] text-brand-primary font-mono uppercase tracking-widest">Intelligent Assistant</span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-brand-muted/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-brand-bg/50">
                {history.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
                    <Sparkles className="text-brand-secondary/40" size={40} />
                    <p className="text-brand-muted text-sm italic">
                      "I can help you find products, check your orders, or give you style recommendations. What's on your mind?"
                    </p>
                  </div>
                )}
                {history.map((msg, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-primary text-black font-medium' 
                        : 'bg-brand-card text-brand-text border border-brand-muted/10'
                    }`}>
                      <div className="markdown-body text-inherit">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-brand-card rounded-2xl px-4 py-3 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-brand-card">
                <AnimatePresence>
                  {isListening && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col items-center justify-center py-4 gap-2"
                    >
                      <VoiceVisualizer isActive={isListening} />
                      <span className="text-[10px] font-mono text-brand-primary uppercase tracking-[0.2em] animate-pulse">Listening...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="relative flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                      className="w-full bg-brand-bg border border-brand-muted/10 rounded-xl py-3 pl-4 pr-12 text-sm text-brand-text focus:border-brand-primary outline-none transition-all"
                    />
                    <button 
                      onClick={toggleListening}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors ${isListening ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}
                    >
                      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="p-3 bg-brand-primary text-black rounded-xl active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:grayscale"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
