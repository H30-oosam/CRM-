import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bot, Send, X, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIAssistant: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, context: { page: 'Dashboard' } })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.text || 'I could not process that request.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 rtl:left-6 rtl:right-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-96 bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="p-4 bg-indigo-600 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-300" />
                <span className="font-bold text-sm tracking-tight">HossamElwardany AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Bot size={32} className="text-indigo-600" />
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose">
                    {t('ai_suggest')}
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm animate-pulse">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask your AI Assistant..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-indigo-600/20"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all active:scale-95 group relative"
      >
        {isOpen ? <X size={24} /> : <div className="relative">
          <MessageSquare size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-indigo-600" />
        </div>}
      </button>
    </div>
  );
};
