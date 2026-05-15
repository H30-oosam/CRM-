import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Shield, User, Bell, Globe, CreditCard, Building, Database, Zap, RefreshCw, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleWhatsAppSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/whatsapp/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'current-user' })
      });
      const data = await res.json();
      alert(`Sync Complete: Found ${data.leadsFound} new leads from WhatsApp!`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const sections = [
    { id: 'profile', label: 'User Profile', icon: User, desc: 'Manage your personal identity' },
    { id: 'security', label: 'Security & 2FA', icon: Shield, desc: 'Two-factor authentication and login history' },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard, desc: 'Manage CRM subscription and enterprise plans' },
    { id: 'company', label: 'Company Info', icon: Building, desc: 'Setup branding, logo, and branches' },
    { id: 'integrations', label: 'Integrations', icon: Zap, desc: 'Connect WhatsApp, Zoom, Gmail, Slack' },
    { id: 'database', label: 'Backup & Storage', icon: Database, desc: 'Daily CSV/JSON exports and storage limits' },
  ];

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{t('settings')}</h1>
          <p className="text-slate-500 text-sm">Configure HossamElwardany CRM for your organization</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
           <button 
             onClick={() => setActiveTab('general')}
             className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'general' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
           >
             General
           </button>
           <button 
             onClick={() => setActiveTab('whatsapp')}
             className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'whatsapp' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
           >
             WhatsApp
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'general' ? (
          <motion.div 
            key="general"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {sections.map((section, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                key={section.id}
                className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-600 transition-all cursor-pointer flex gap-5 items-center"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                  <section.icon size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{section.label}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{section.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-8 flex flex-col items-center text-center max-w-lg mx-auto">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="text-green-600" size={40} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-800 mb-2">Connect WhatsApp Business</h2>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Sync your leads directly from WhatsApp conversations. Automated AI replies and data extraction will be applied to all incoming messages.
              </p>
              
              <div className="w-full space-y-3">
                 <button 
                   onClick={handleWhatsAppSync}
                   disabled={isSyncing}
                   className="w-full flex items-center justify-center gap-3 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-600/20 disabled:opacity-50"
                 >
                   {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <span>Scan QR Code to Connect</span>}
                 </button>
                 <button className="w-full text-[10px] font-extrabold text-slate-400 uppercase tracking-widest py-2 hover:text-slate-600 transition-colors">
                   View Setup Documentation
                 </button>
              </div>
            </div>

            <div className="bg-slate-50 p-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
               <div>
                 <p className="text-lg font-bold text-slate-800">12,403</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Messages Synced</p>
               </div>
               <div>
                 <p className="text-lg font-bold text-slate-800">452</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leads Captured</p>
               </div>
               <div>
                 <p className="text-lg font-bold text-emerald-500">Live</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connection Status</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase shadow-lg shadow-indigo-600/20">Pro</div>
            <div className="flex-1">
               <p className="text-sm font-bold text-indigo-900">CRM Enterprise Subscription</p>
               <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Active • Renews Jun 12, 2026</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-indigo-700 shadow-md">Upgrade Plan</button>
         </div>
      </div>
    </div>
  );
};

