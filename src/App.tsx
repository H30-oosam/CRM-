import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from './Layout';
import { Dashboard } from './pages/Dashboard';
import { Companies } from './pages/Companies';
import { Contacts } from './pages/Contacts';
import { Deals } from './pages/Deals';
import { CalendarView } from './pages/Calendar';
import { Reports } from './pages/Reports';
import { Tasks } from './pages/Tasks';
import { Leads } from './pages/Leads';
import { Invoices } from './pages/Invoices';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { AuthProvider, useAuth } from './lib/AuthContext';
import './lib/i18n';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
  
  // Basic routing logic
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'leads': return <Leads />;
      case 'companies': return <Companies />;
      case 'contacts': return <Contacts />;
      case 'deals': return <Deals />;
      case 'calendar': return <CalendarView />;
      case 'tasks': return <Tasks />;
      case 'invoices': return <Invoices />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onSelectPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
