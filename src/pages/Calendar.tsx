import React from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { t, i18n } = useTranslation();

  const events = [
    { title: 'Project Kickoff', date: '2026-05-16', color: '#000' },
    { title: 'Contract Negotiation', start: '2026-05-17T14:00:00', end: '2026-05-17T16:00:00', color: '#3B82F6' },
    { title: 'Weekly Sync', start: '2026-05-18T10:00:00', color: '#10B981' }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('calendar')}</h1>
          <p className="text-gray-500 mt-1">Schedule meetings and follow-ups</p>
        </div>
        <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-100 card-shadow overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          editable={true}
          selectable={true}
          direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          locale={i18n.language === 'ar' ? 'ar' : 'en'}
          height="100%"
        />
      </div>
    </div>
  );
};
