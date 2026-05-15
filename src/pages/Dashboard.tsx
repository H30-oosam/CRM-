import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Briefcase,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', sales: 4000, deals: 24 },
  { name: 'Feb', sales: 3000, deals: 18 },
  { name: 'Mar', sales: 2000, deals: 15 },
  { name: 'Apr', sales: 2780, deals: 20 },
  { name: 'May', sales: 1890, deals: 12 },
  { name: 'Jun', sales: 2390, deals: 17 },
  { name: 'Jul', sales: 3490, deals: 22 },
];

const StatCard = ({ title, value, icon: Icon, change, isPositive, extra }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-indigo-200"
  >
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <span className={`text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-slate-400'}`}>
        {isPositive ? '+' : ''}{change}{isPositive ? '%' : ''} {extra}
      </span>
    </div>
  </motion.div>
);

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{t('dashboard')}</h1>
          <p className="text-slate-500 text-sm">{t('welcome_back', { name: 'Hossam' })}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-bold bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            Last 30 Days
          </button>
          <button className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('total_revenue')} value="$128,430" change={12} isPositive={true} />
        <StatCard title={t('total_deals')} value="45" extra="Target: 60" isPositive={false} change={""} />
        <StatCard title={t('companies')} value="12" change={2} isPositive={true} />
        <StatCard title={t('conversion_rate')} value="18.5%" change={3.2} isPositive={true} extra="Optimal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-bold text-slate-800 text-sm">Sales Pipeline Performance</h4>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Historical Flow</div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B', fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h4 className="font-bold text-slate-800 text-sm mb-4">Recent Activities</h4>
          <div className="space-y-5 overflow-y-auto pr-2">
            {[
              { title: 'Email sent to Tesla Motors', time: '12 mins ago', icon: <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><TrendingUp size={14}/></div> },
              { title: 'WhatsApp Follow-up', time: '1 hour ago', icon: <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600"><TrendingUp size={14}/></div> },
              { title: 'Meeting w/ Apple Corp', time: '3 hours ago', icon: <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><TrendingUp size={14}/></div> },
            ].map((activity, i) => (
              <div key={i} className="flex gap-3 items-start group cursor-pointer">
                {activity.icon}
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{activity.title}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-auto w-full py-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 rounded-lg transition-all border border-indigo-50">
            View All Activity
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h4 className="font-bold text-slate-800 text-sm">Active Deal Pipeline</h4>
          <div className="flex gap-2">
             <button className="text-[10px] font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-slate-200 text-slate-500 hover:text-black transition-colors">Filter</button>
             <button className="text-[10px] font-bold uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-slate-200 text-slate-500 hover:text-black transition-colors">Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right">
            <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Company / Deal</th>
                <th className="px-6 py-3">Owner</th>
                <th className="px-6 py-3">Stage</th>
                <th className="px-6 py-3">Value</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { company: 'Tesla Motors', deal: 'Fleet Expansion', owner: 'Sarah J.', stage: 'Proposal', value: '$45,000', color: 'bg-blue-100 text-blue-700' },
                { company: 'Apple Corp', deal: 'Supply Chain SW', owner: 'Mike L.', stage: 'Negotiation', value: '$82,000', color: 'bg-amber-100 text-amber-700' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-[10px]">
                        {row.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{row.company}</p>
                         <p className="text-[10px] font-medium text-slate-400">{row.deal}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-xs font-semibold text-slate-600">{row.owner}</td>
                  <td className="px-6 py-3">
                    <span className={`${row.color} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter`}>{row.stage}</span>
                  </td>
                  <td className="px-6 py-3 text-xs font-bold text-slate-900">{row.value}</td>
                  <td className="px-6 py-3">
                    <div className="w-24 bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full" style={{ width: '65%' }}></div>
                    </div>
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
