import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Plus, Target, Zap, TrendingUp, Facebook, Linkedin, Globe, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const leadData = [
  { id: '1', name: 'Al-Amal Co.', source: 'Facebook', score: 85, status: 'Qualified', time: '2h ago' },
  { id: '2', name: 'Global Tech', source: 'LinkedIn', score: 92, status: 'Contacted', time: '5h ago' },
  { id: '3', name: 'Sarah Miller', source: 'Website', score: 45, status: 'New', time: '12h ago' },
  { id: '4', name: 'Dubai Mall', source: 'Referral', score: 78, status: 'Proposal', time: '1d ago' },
  { id: '5', name: 'Z-Store', source: 'WhatsApp', score: 62, status: 'New', time: '2d ago' },
];

const sourceIcons: any = {
  Facebook: <Facebook size={14} className="text-blue-600" />,
  LinkedIn: <Linkedin size={14} className="text-blue-700" />,
  Website: <Globe size={14} className="text-slate-500" />,
  Referral: <TrendingUp size={14} className="text-emerald-500" />,
  WhatsApp: <Phone size={14} className="text-green-500" />,
};

export const Leads: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{t('leads')}</h1>
          <p className="text-slate-500 text-sm">Automated scoring and lead distribution</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus size={18} />
          Add Lead Manually
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Hot Leads', value: 12, icon: <Zap className="text-amber-500" /> },
          { label: 'Avg Lead Score', value: 74, icon: <Target className="text-indigo-500" /> },
          { label: 'Website Traffic', value: '4.2k', icon: <TrendingUp className="text-emerald-500" /> }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
               {stat.icon}
             </div>
             <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
               <p className="text-xl font-bold text-slate-800">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
           <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-64 shadow-sm">
              <Search size={14} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Search leads..." className="text-xs font-medium bg-transparent outline-none flex-1" />
           </div>
           <button className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors">
             <Filter size={14} className="inline mr-1" /> Filters
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
             <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Lead Score</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Received</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {leadData.map((lead, i) => (
                   <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-[10px]">
                              {lead.name[0]}
                           </div>
                           <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight">{lead.name}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          {sourceIcons[lead.source]}
                          {lead.source}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="flex-1 w-24 bg-slate-100 h-1 rounded-full">
                              <div className={`h-full rounded-full ${lead.score > 80 ? 'bg-emerald-500' : lead.score > 50 ? 'bg-amber-500' : 'bg-slate-300'}`} style={{ width: `${lead.score}%` }} />
                           </div>
                           <span className="text-[10px] font-bold text-slate-500">{lead.score}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm border border-indigo-100">
                           {lead.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">{lead.time}</td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                           Convert
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
