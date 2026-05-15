import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Shield, User, Bell, Globe, CreditCard, Building, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Settings: React.FC = () => {
  const { t } = useTranslation();

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
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{t('settings')}</h1>
        <p className="text-slate-500 text-sm">Configure HossamElwardany CRM for your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all">
               <svg size={12} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </motion.div>
        ))}
      </div>

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
