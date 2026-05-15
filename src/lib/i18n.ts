import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "dashboard": "Dashboard",
      "companies": "Companies",
      "contacts": "Contacts",
      "deals": "Deals",
      "calendar": "Calendar",
      "activities": "Activities",
      "reports": "Reports",
      "ai_assistant": "AI Assistant",
      "tasks": "Tasks",
      "leads": "Leads",
      "invoices": "Invoices",
      "settings": "Settings",
      "logout": "Logout",
      "search": "Search...",
      "notifications": "Notifications",
      "total_revenue": "Total Revenue",
      "total_deals": "Total Deals",
      "conversion_rate": "Conversion Rate",
      "recent_activities": "Recent Activities",
      "new_deal": "New Deal",
      "add_company": "Add Company",
      "add_contact": "Add Contact",
      "whatsapp_msg": "WhatsApp Message",
      "ai_suggest": "AI Suggestions",
      "welcome_back": "Welcome back, {{name}}"
    }
  },
  ar: {
    translation: {
      "dashboard": "لوحة التحكم",
      "companies": "الشركات",
      "contacts": "جهات الاتصال",
      "deals": "الصفقات",
      "calendar": "التقويم",
      "activities": "الأنشطة",
      "reports": "التقارير",
      "ai_assistant": "المساعد الذكي",
      "tasks": "المهام",
      "leads": "العملاء المحتملين",
      "invoices": "الفواتير",
      "settings": "الإعدادات",
      "logout": "تسجيل الخروج",
      "search": "بحث...",
      "notifications": "الإشعارات",
      "total_revenue": "إجمالي الإيرادات",
      "total_deals": "إجمالي الصفقات",
      "conversion_rate": "معدل التحويل",
      "recent_activities": "الأنشطة الأخيرة",
      "new_deal": "صفقة جديدة",
      "add_company": "إضافة شركة",
      "add_contact": "إضافة جهة اتصال",
      "whatsapp_msg": "رسالة واتساب",
      "ai_suggest": "اقتراحات الذكاء الاصطناعي",
      "welcome_back": "مرحباً بك مجدداً، {{name}}"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
