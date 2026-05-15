import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, Filter, MoreHorizontal, Building2, Globe, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const dummyCompanies = [
  { id: '1', name: 'TechFlow Solutions', industry: 'Software', website: 'techflow.io', location: 'London, UK', phone: '+44 20 1234 5678', status: 'Active' },
  { id: '2', name: 'Al-Majd Group', industry: 'Construction', website: 'almajd.sa', location: 'Riyadh, KSA', phone: '+966 11 987 6543', status: 'Pending' },
  { id: '3', name: 'GreenEnergy Co', industry: 'Renewable Energy', website: 'greenenergy.com', location: 'Berlin, DE', phone: '+49 30 555 0123', status: 'Active' },
  { id: '4', name: 'Modern Retailers', industry: 'Retail', website: 'modern.ae', location: 'Dubai, UAE', phone: '+971 4 333 4444', status: 'Inactive' },
];

export const Companies: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('companies')}</h1>
          <p className="text-gray-500 mt-1">Manage your corporate clients and partners</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus size={18} />
          {t('add_company')}
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/30">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 rtl:left-auto" size={16} />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-slate-200 rounded-lg hover:bg-white transition-colors bg-white shadow-sm">
            <Filter size={14} />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Industry</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyCompanies.map((company, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={company.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{company.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          <Globe size={10} />
                          {company.website}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-xs font-medium text-slate-600">{company.industry}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <MapPin size={12} className="text-slate-300" />
                      {company.location}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Phone size={12} className="text-slate-300" />
                      {company.phone}
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                      company.status === 'Active' ? "bg-emerald-50 text-emerald-600" :
                      company.status === 'Pending' ? "bg-amber-50 text-amber-600" :
                      "bg-slate-100 text-slate-500"
                    )}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-300 hover:text-slate-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
