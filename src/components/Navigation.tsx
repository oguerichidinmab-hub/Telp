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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-1 flex justify-around items-center z-50 pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 w-1 h-1 bg-blue-600 rounded-full"
              />
            )}
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
    <button
      onClick={handleExit}
      className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg z-[60] flex items-center gap-2 active:scale-95 transition-transform"
    >
      <XCircle size={20} />
      <span>QUICK EXIT</span>
    </button>
  );
};

export const Header: React.FC<{ title: string; onBack?: () => void }> = ({ title, onBack }) => (
  <header className="pt-16 pb-4 px-6 bg-white sticky top-0 z-40 flex items-center gap-2">
    {onBack && (
      <button 
        onClick={onBack}
        className="p-2 -ml-2 text-gray-600 active:scale-90 transition-transform rounded-full hover:bg-gray-50"
      >
        <ChevronLeft size={24} />
      </button>
    )}
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
  </header>
);
