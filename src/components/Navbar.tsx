import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Globe, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-10 glass sticky top-0 shadow-sm">
      <div className="flex items-center bg-slate-100 rounded-full px-4 py-1.5 w-96 border border-slate-200">
        <Search className="text-slate-400 mr-2 rtl:ml-2 rtl:mr-0" size={16} />
        <input
          type="text"
          placeholder={t('search')}
          className="bg-transparent text-sm w-full outline-none text-slate-600 focus:placeholder-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
          AI Assistant Active
        </div>

        <button 
          onClick={toggleLanguage}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold text-slate-500"
        >
          <Globe size={16} />
          <span>{i18n.language.toUpperCase()}</span>
        </button>
        
        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white" />
        </button>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-all active:scale-95">
          + {t('new_deal')}
        </button>
      </div>
    </header>
  );
};
