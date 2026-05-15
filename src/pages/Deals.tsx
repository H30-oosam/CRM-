import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, MoreVertical, DollarSign, Calendar, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const stages = [
  { id: 'new', name: 'New Lead', color: 'bg-blue-500' },
  { id: 'contacted', name: 'Contacted', color: 'bg-indigo-500' },
  { id: 'proposal', name: 'Proposal Sent', color: 'bg-yellow-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-purple-500' },
  { id: 'won', name: 'Won', color: 'bg-green-500' },
  { id: 'lost', name: 'Lost', color: 'bg-red-500' }
];

const dummyDeals = [
  { id: '1', title: 'Enterprise Software License', company: 'TechFlow', value: 25000, stage: 'new', priority: 'High' },
  { id: '2', title: 'Office Building Renovation', company: 'Al-Majd', value: 150000, stage: 'proposal', priority: 'Medium' },
  { id: '3', title: 'Cloud Migration Project', company: 'Future Corp', value: 45000, stage: 'contacted', priority: 'Low' },
  { id: '4', title: 'Web Development Bundle', company: 'Retail Hub', value: 8000, stage: 'negotiation', priority: 'High' },
];

export const Deals: React.FC = () => {
  const { t } = useTranslation();
  const [deals, setDeals] = useState(dummyDeals);

  const getDealsByStage = (stageId: string) => deals.filter(d => d.stage === stageId);

  const openWhatsApp = (number: string = '1234567890') => {
    window.open(`https://wa.me/${number}`, '_blank');
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{t('deals')}</h1>
          <p className="text-slate-500 text-sm">Pipeline visualizer & sales tracking</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Configure Stages
          </button>
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
            <Plus size={18} />
            {t('new_deal')}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-6 scrollbar-hide">
        <div className="flex gap-4 inline-flex min-h-full">
          {stages.map(stage => (
            <div key={stage.id} className="w-[280px] flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                  <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-500">{stage.name}</h3>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    {getDealsByStage(stage.id).length}
                  </span>
                </div>
                <button className="p-1 hover:bg-slate-100 rounded text-slate-300">
                  <Plus size={14} />
                </button>
              </div>

              <div className="flex-1 bg-slate-100/50 rounded-2xl p-2 min-h-[500px] border border-slate-200">
                <div className="space-y-3">
                  {getDealsByStage(stage.id).map(deal => (
                    <motion.div
                      layoutId={deal.id}
                      key={deal.id}
                      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-indigo-600 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                          deal.priority === 'High' ? 'bg-red-50 text-red-600' : 
                          deal.priority === 'Medium' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-500'
                        }`}>
                          {deal.priority}
                        </span>
                        <button className="text-slate-300 hover:text-slate-900 transition-colors">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                      
                      <h4 className="text-xs font-bold mb-1 text-slate-800 group-hover:text-indigo-600 transition-colors">{deal.title}</h4>
                      <p className="text-[10px] font-medium text-slate-400 mb-4">{deal.company}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                          <DollarSign size={12} className="text-slate-400" />
                          {deal.value.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                          <Calendar size={12} />
                          Oct 24
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">HW</div>
                          <div className="w-6 h-6 rounded-full bg-slate-200 border border-white flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">JD</div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openWhatsApp()}
                            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors shadow-sm"
                            title="WhatsApp"
                          >
                            <MessageSquare size={14} />
                          </button>
                          <button className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors shadow-sm">
                            <Phone size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
