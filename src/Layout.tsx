import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { AIAssistant } from './components/AIAssistant';
import { CommandMenu } from './components/CommandMenu';
import { AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode, currentPage: string, onSelectPage: (page: string) => void }> = ({ children, currentPage, onSelectPage }) => {
  const { i18n } = useTranslation();
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommandMenu(prev => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={currentPage} onSelectPage={onSelectPage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <AIAssistant />
      <AnimatePresence>
        {showCommandMenu && (
          <CommandMenu 
            onSelect={onSelectPage} 
            onClose={() => setShowCommandMenu(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
