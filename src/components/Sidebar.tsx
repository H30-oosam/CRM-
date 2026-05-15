import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Briefcase, 
  Calendar, 
  Activity, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'dashboard' },
  { id: 'leads', icon: Users, label: 'leads' },
  { id: 'companies', icon: Building2, label: 'companies' },
  { id: 'contacts', icon: Users, label: 'contacts' },
  { id: 'deals', icon: Briefcase, label: 'deals' },
  { id: 'calendar', icon: Calendar, label: 'calendar' },
  { id: 'tasks', icon: Activity, label: 'tasks' },
  { id: 'invoices', icon: BarChart3, label: 'invoices' },
  { id: 'reports', icon: BarChart3, label: 'reports' },
  { id: 'settings', icon: Settings, label: 'settings' }
];

export const Sidebar: React.FC<{ activePage: string, onSelectPage: (page: string) => void }> = ({ activePage, onSelectPage }) => {
  const { t } = useTranslation();

  return (
    <aside className="w-60 bg-white border-e border-slate-200 hidden md:flex flex-col h-full z-20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">HossamElwardany CRM</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-sm font-medium",
                activePage === item.id 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                {t(item.label)}
              </div>
              {activePage === item.id && <ChevronRight size={14} className="opacity-50 rtl:rotate-180" />}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg mb-4">
          <div className="w-9 h-9 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-700 font-bold text-xs">
            HW
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">Hossam Wardany</p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Admin</p>
          </div>
        </div>
        <button className="flex w-full items-center gap-3 px-3 py-2 text-xs font-bold text-slate-400 hover:text-red-600 transition-colors">
          <LogOut size={16} />
          {t('logout')}
        </button>
      </div>
    </aside>
  );
};
