import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAiChatOpen, setQuickViewProduct, showToast } from '../store/slices/uiSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShoppingBag,
  ArrowRight,
  Zap,
  Minimize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProducts?: Product[];
  timestamp: string;
}

export const AiChatAssistant: React.FC = () => {
  const dispatch = useAppDispatch();
  const { aiChatOpen } = useAppSelector(state => state.ui);
  const { items: allProducts } = useAppSelector(state => state.products);
  const { user } = useAppSelector(state => state.auth);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${user?.name || 'there'}! 👋 I am CookMe's intelligent AI Shopping Assistant. How can I help you today? Ask me about trending clothing, discounts, sizing, or delivery in Dhaka!`,
      recommendedProducts: allProducts.slice(0, 2),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aiChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, aiChatOpen]);

  const quickPrompts = [
    '🔥 What are the best flash deals today?',
    '👟 Recommend sneakers and footwear',
    '👗 Show trending women sarees & dresses',
    '🚚 What are the delivery charges for Dhaka?'
  ];

  const handleSend = async (messageText: string) => {
    const query = messageText.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          products: allProducts
        })
      });
      const data = await res.json();
      if (data.success) {
        const aiMsg: ChatMessage = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: data.reply,
          recommendedProducts: data.recommendedProducts || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error(data.message);
      }
    } catch {
      // Fallback
      let fallbackText = `I found some top matching products in our collection for "${query}"!`;
      let recs: Product[] = allProducts.slice(0, 2);

      if (query.toLowerCase().includes('dhaka') || query.toLowerCase().includes('delivery')) {
        fallbackText = `Delivery inside Dhaka is ৳60 (guaranteed within 24-48 hours). Delivery outside Dhaka across Bangladesh is ৳120. Free shipping applies on orders over ৳2,000!`;
        recs = [];
      } else if (query.toLowerCase().includes('sneaker') || query.toLowerCase().includes('shoe') || query.toLowerCase().includes('footwear')) {
        fallbackText = `Check out our best-selling Classic White Sneakers and athletic footwear!`;
        recs = allProducts.filter(p => p.category === 'footwear');
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: fallbackText,
          recommendedProducts: recs,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!aiChatOpen) {
    return (
      <button
        id="ai-assistant-floating-btn"
        onClick={() => dispatch(setAiChatOpen(true))}
        aria-label="Open AI Shopping Assistant"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-600/50 flex items-center gap-2 group cursor-pointer transition-all transform hover:scale-105 active:scale-95 border-2 border-white/20"
      >
        <div className="relative">
          <Bot className="w-6 h-6 animate-bounce" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-emerald-600" />
        </div>
        <span className="text-xs font-black tracking-wide pr-1 hidden sm:inline">
          CookMe AI
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100 animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Chat Header */}
      <div className="bg-emerald-700 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold flex items-center gap-1.5">
              CookMe AI Shopping Assistant
            </h3>
            <span className="text-[10px] text-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Connected & Online
            </span>
          </div>
        </div>

        <button
          id="close-ai-chat-btn"
          onClick={() => dispatch(setAiChatOpen(false))}
          aria-label="Close AI Chat"
          className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[85%]">
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-xs border border-slate-200 dark:border-slate-700/80 leading-relaxed font-normal'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`text-[9px] block mt-1 ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>

            {/* AI Product Recommendations Attachment */}
            {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
              <div className="mt-2.5 w-full space-y-2 pl-8">
                {msg.recommendedProducts.map((prod) => (
                  <div
                    key={prod._id}
                    onClick={() => dispatch(setQuickViewProduct(prod))}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 shadow-xs hover:border-emerald-500 cursor-pointer transition-colors"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-11 h-11 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-bold truncate text-slate-900 dark:text-white">
                        {prod.name}
                      </h4>
                      <span className="text-emerald-600 font-extrabold text-[11px]">
                        ৳{prod.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addToCart({ product: prod, quantity: 1 }));
                        dispatch(showToast(`Added ${prod.name} to cart!`));
                      }}
                      className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 pl-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px]">CookMe AI is typing...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-2 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex gap-1.5">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-[10px] bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 font-medium px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-600 whitespace-nowrap cursor-pointer transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask for advice, prices, delivery..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send message"
          className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
