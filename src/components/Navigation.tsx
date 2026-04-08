import React from 'react';
import { Home, Shield, FileText, BookOpen, Phone, User, XCircle, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'support', icon: Shield, label: 'Support' },
    { id: 'report', icon: FileText, label: 'Report' },
    { id: 'contacts', icon: Phone, label: 'Contacts' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-lg border-t border-gray-100 px-4 py-2 flex justify-around items-center z-50 pb-safe shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative flex flex-col items-center p-2 rounded-2xl transition-all duration-300 outline-none"
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-blue-50 rounded-2xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <motion.div
              animate={{ 
                scale: isActive ? 1.1 : 1,
                y: isActive ? -2 : 0
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={isActive ? 'text-blue-600' : 'text-gray-400'}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </motion.div>
            <span className={`text-[10px] mt-1 font-bold transition-colors duration-300 ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export const QuickExit: React.FC = () => {
  const handleExit = () => {
    window.location.href = 'https://www.google.com/search?q=weather';
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-[60] pointer-events-none">
      <div className="p-4 flex justify-end">
        <button
          onClick={handleExit}
          className="pointer-events-auto bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-transform"
        >
          <XCircle size={20} />
          <span>QUICK EXIT</span>
        </button>
      </div>
    </div>
  );
};

import { Logo } from './Logo';

export const Header: React.FC<{ title: string; onBack?: () => void }> = ({ title, onBack }) => (
  <header className="pt-16 pb-4 px-6 bg-white sticky top-0 z-40 flex items-center justify-between border-b border-gray-50">
    <div className="flex items-center gap-2">
      {onBack ? (
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-gray-600 active:scale-90 transition-transform rounded-full hover:bg-gray-50"
        >
          <ChevronLeft size={24} />
        </button>
      ) : (
        <Logo size={32} variant="icon" />
      )}
      <h1 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h1>
    </div>
    {!onBack && (
      <Logo size={24} variant="full" className="opacity-100" />
    )}
  </header>
);
