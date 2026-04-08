import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BottomNav, 
  QuickExit, 
  Header 
} from './components/Navigation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { HomeView } from './views/HomeView';
import { SupportResourcesView } from './views/SupportResourcesView';
import { ReportView } from './views/ReportView';
import { ContactsView } from './views/ContactsView';
import { ProfileView } from './views/ProfileView';
import { OnboardingView } from './views/OnboardingView';
import { AssistantView } from './views/AssistantView';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAssistant, setShowAssistant] = useState(false);
  const { 
    profile, setProfile, 
    contacts, setContacts, 
    reports, setReports, 
    moods, setMoods,
    safetyPlan, setSafetyPlan
  } = useLocalStorage();

  if (!profile.onboarded) {
    return <OnboardingView onComplete={(p) => setProfile({ ...p, onboarded: true })} />;
  }

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} moods={moods} setMoods={setMoods} profile={profile} safetyPlan={safetyPlan} />;
      case 'support': return <SupportResourcesView />;
      case 'report': return <ReportView reports={reports} setReports={setReports} />;
      case 'contacts': return <ContactsView contacts={contacts} setContacts={setContacts} />;
      case 'profile': return <ProfileView profile={profile} setProfile={setProfile} safetyPlan={safetyPlan} setSafetyPlan={setSafetyPlan} />;
      default: return <HomeView setActiveTab={setActiveTab} moods={moods} setMoods={setMoods} profile={profile} />;
    }
  };

  const getTitle = () => {
    const displayName = profile.privacyMode ? 'User' : (profile.name || 'Friend');
    switch (activeTab) {
      case 'home': return 'Hello, ' + displayName;
      case 'support': return 'Support & Resources';
      case 'report': return 'Report Incident';
      case 'contacts': return 'Help & Contacts';
      case 'profile': return 'Your Profile';
      default: return 'TELP';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 pb-24 font-sans ${profile.disguisedMode ? 'grayscale contrast-125' : ''}`}>
      <QuickExit />
      <Header title={getTitle()} />
      
      <main className="px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Floating Assistant Button */}
      <button
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-20 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl z-40 active:scale-90 transition-transform"
      >
        <MessageCircle size={28} />
      </button>

      {/* Assistant Modal */}
      <AnimatePresence>
        {showAssistant && (
          <AssistantView onClose={() => setShowAssistant(false)} />
        )}
      </AnimatePresence>

      {/* Global Disclaimer */}
      <div className="px-6 py-4 text-[10px] text-gray-400 text-center leading-tight">
        TELP provides guidance and connection to help. We are not a replacement for emergency services. If you are in immediate danger, call 911 or your local emergency number.
      </div>
    </div>
  );
}
