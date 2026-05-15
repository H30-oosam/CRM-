import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogIn, Mail, Lock, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
      <div className="absolute top-6 right-6">
        <button 
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 text-sm font-medium hover:text-black transition-colors"
        >
          <Globe size={18} />
          {i18n.language.toUpperCase()}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gray-50 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gray-50 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-2xl font-bold tracking-tighter text-slate-800">HossamElwardany CRM</span>
          </div>

          <h2 className="text-3xl font-extrabold mb-2 text-slate-800 tracking-tight">Welcome back</h2>
          <p className="text-slate-500 mb-8 font-medium">Log in to manage your sales pipeline.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  defaultValue="Hossm@crm.com"
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
                <button className="text-[10px] uppercase font-bold text-slate-400 hover:text-indigo-600 transition-colors">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  defaultValue="Hossm@crm.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 text-sm font-medium"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-600/20"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Log in to CRM</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
            <ShieldCheck size={14} />
            Secure enterprise-grade access.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
