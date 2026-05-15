import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Filter, Phone, Mail, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const dummyContacts = [
  { id: '1', name: 'John Doe', email: 'john@techflow.io', phone: '+44 77 1234 5678', job: 'CTO', company: 'TechFlow', tags: ['Decision Maker', 'High Priority'] },
  { id: '2', name: 'Ahmed Ali', email: 'ahmed@almajd.sa', phone: '+966 50 111 2222', job: 'Procurement', company: 'Al-Majd', tags: ['Follow-up'] },
  { id: '3', name: 'Sarah Schmidt', email: 'sarah@green.de', phone: '+49 17 999 8888', job: 'Lead Engineer', company: 'GreenEnergy', tags: ['Technical'] },
  { id: '4', name: 'Elena Rossi', email: 'elena@modern.ae', phone: '+971 58 555 6666', job: 'Marketing Director', company: 'Modern Retailers', tags: ['Influencer'] },
];

export const Contacts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{t('contacts')}</h1>
          <p className="text-slate-500 text-sm">Nurture relationships with your client stakeholders</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus size={18} />
          {t('add_contact')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dummyContacts.map((contact, index) => (
          <motion.div 
            key={contact.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-600 transition-all group flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <span className="text-xs font-bold">{contact.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-slate-100 rounded-lg"><Linkedin size={14} className="text-[#0A66C2]" /></button>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-green-600"><MessageCircle size={14} /></button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-sm text-slate-800 mb-0.5">{contact.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{contact.job} @ {contact.company}</p>
            </div>

            <div className="space-y-2 mb-4 flex-1">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
                <Mail size={12} className="text-slate-300" />
                {contact.email}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
                <Phone size={12} className="text-slate-300" />
                {contact.phone}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 pt-4 border-t border-slate-50">
              {contact.tags.map(tag => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-slate-50 text-slate-400 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
