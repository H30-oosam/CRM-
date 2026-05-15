import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, MoreVertical, Clock, CheckCircle2, AlertCircle, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const taskData = [
  { id: '1', title: 'Prepare Contract for Tesla', status: 'Todo', priority: 'High', deadline: '2026-05-18' },
  { id: '2', title: 'Follow-up w/ Sarah', status: 'In Progress', priority: 'Medium', deadline: '2026-05-17' },
  { id: '3', title: 'Q2 Sales Review', status: 'In Progress', priority: 'Urgent', deadline: '2026-05-15' },
  { id: '4', title: 'Sync w/ Marketing team', status: 'Review', priority: 'Low', deadline: '2026-05-20' },
  { id: '5', title: 'System training session', status: 'Done', priority: 'Medium', deadline: '2026-05-10' },
];

const priorityColors: any = {
  Urgent: 'bg-red-50 text-red-600 border-red-100',
  High: 'bg-orange-50 text-orange-600 border-orange-100',
  Medium: 'bg-blue-50 text-blue-600 border-blue-100',
  Low: 'bg-slate-50 text-slate-500 border-slate-100',
};

export const Tasks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">{t('tasks')}</h1>
          <p className="text-slate-500 text-sm">Assign and track employee productivity</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
          <Plus size={18} />
          Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Todo', 'In Progress', 'Review', 'Done'].map((status) => (
          <div key={status} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">{status}</h3>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {taskData.filter(t => t.status === status).length}
              </span>
            </div>

            <div className="flex-1 bg-slate-100/30 rounded-2xl p-2 min-h-[500px] border border-slate-200">
              <div className="space-y-3">
                {taskData.filter(t => t.status === status).map((task, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={task.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-600 transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                       <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${priorityColors[task.priority]}`}>
                         {task.priority}
                       </span>
                       <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 mb-4 leading-relaxed group-hover:text-indigo-600 transition-colors">
                      {task.title}
                    </h4>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400">{task.deadline}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                        HW
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
  );
};
