import React, { useState, useEffect } from 'react';
import { Search, Command, Layout, Users, Building, Briefcase, FileText, Zap, Settings, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandMenu: React.FC<{ onSelect: (page: string) => void, onClose: () => void }> = ({ onSelect, onClose }) => {
  const [query, setQuery] = useState('');

  const items = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: Layout },
    { id: 'leads', label: 'Search Leads', icon: Target },
    { id: 'companies', label: 'Manage Companies', icon: Building },
    { id: 'contacts', label: 'View Contacts', icon: Users },
    { id: 'deals', label: 'Open Pipeline', icon: Briefcase },
    { id: 'invoices', label: 'Create Invoice', icon: FileText },
    { id: 'reports', label: 'View Analytics', icon: Zap },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const filtered = items.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
      >
        <div className="p-5 border-b border-slate-100 flex items-center gap-4">
           <Command className="text-slate-400" size={20} />
           <input 
             autoFocus
             value={query}
             onChange={e => setQuery(e.target.value)}
             placeholder="Search HossamElwardany Command Menu..." 
             className="w-full text-base font-medium outline-none placeholder-slate-400"
           />
           <div className="text-[10px] font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded shadow-sm">ESC</div>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
           {filtered.length === 0 && (
             <div className="p-10 text-center">
                <Search size={32} className="mx-auto text-slate-200 mb-3" />
                <p className="text-slate-500 font-medium">No commands found for "{query}"</p>
             </div>
           )}
           {filtered.map((item, idx) => (
             <button
               key={item.id}
               onClick={() => { onSelect(item.id); onClose(); }}
               className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
             >
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <item.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 tracking-tight">{item.label}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Command • Navigation</p>
                </div>
                <div className="text-[10px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">Select</div>
             </button>
           ))}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <Globe size={14} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Smart Search</span>
           </div>
           <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">↑↓</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">to navigate</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

const Target = ({ size }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
