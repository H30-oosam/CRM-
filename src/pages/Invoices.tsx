import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, Send, CreditCard, Clock, CheckCircle2, AlertCircle, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const invoiceData = [
  { id: '1', number: 'INV-2026-001', company: 'Tesla Motors', amount: 45000, status: 'Paid', date: '2026-05-10' },
  { id: '2', number: 'INV-2026-002', company: 'Apple Corp', amount: 82000, status: 'Pending', date: '2026-05-14' },
  { id: '3', number: 'INV-2026-003', company: 'TechFlow', amount: 12500, status: 'Overdue', date: '2026-04-28' },
  { id: '4', number: 'INV-2026-004', company: 'Al-Majd', amount: 150000, status: 'Pending', date: '2026-05-15' },
];

export const Invoices: React.FC = () => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Overdue': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{t('invoices')}</h1>
          <p className="text-slate-500 text-sm">Billing, Quotations, and QR-enabled receipts</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={18} />
            Export CSV
          </button>
          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
            <Plus size={18} />
            Create Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Billed', value: '$289,500', sub: 'Last 3 months' },
          { label: 'Pending', value: '$232,000', sub: '3 active invoices' },
          { label: 'Overdue', value: '$12,500', sub: 'Action required' },
          { label: 'Paid', value: '$45,000', sub: 'Collected this month' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <h3 className="text-xl font-bold text-slate-800">{stat.value}</h3>
             <p className="text-[10px] font-medium text-slate-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
           <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-64 shadow-sm">
              <Search size={14} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Invoice # or company..." className="text-xs font-medium bg-transparent outline-none flex-1" />
           </div>
           <div className="flex gap-2">
             <button className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:text-black transition-colors">
               Templates
             </button>
             <button className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:text-black transition-colors">
               Tax Settings
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
             <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                   <th className="px-6 py-4">Invoice #</th>
                   <th className="px-6 py-4">Company</th>
                   <th className="px-6 py-4">Amount</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Due Date</th>
                   <th className="px-6 py-4 text-right">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {invoiceData.map((inv, i) => (
                   <motion.tr 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     key={inv.id} 
                     className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                   >
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <FileText size={16} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-800">{inv.number}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-tight">{inv.company}</td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-900">${inv.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tighter border ${getStatusColor(inv.status)}`}>
                            {inv.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{inv.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors" title="Send email"><Send size={14}/></button>
                           <button className="p-1.5 text-slate-400 hover:text-black transition-colors" title="Download PDF"><Download size={14}/></button>
                        </div>
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

const Plus = ({ size }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
