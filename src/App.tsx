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
  const [backAction, setBackAction] = useState<(() => void) | null>(null);
  const [customTitle, setCustomTitle] = useState<string | null>(null);
  const { 
    profile, setProfile, 
    contacts, setContacts, 
    reports, setReports, 
    moods, setMoods,
    safetyPlan, setSafetyPlan
  } = useLocalStorage();

  // Reset back action and custom title when tab changes
  React.useEffect(() => {
    setBackAction(null);
    setCustomTitle(null);
  }, [activeTab]);

  if (!profile.onboarded) {
    return <OnboardingView onComplete={(p) => setProfile({ ...p, onboarded: true })} />;
  }

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} moods={moods} setMoods={setMoods} profile={profile} safetyPlan={safetyPlan} />;
      case 'support': return <SupportResourcesView setBackAction={setBackAction} setCustomTitle={setCustomTitle} />;
      case 'report': return <ReportView reports={reports} setReports={setReports} moods={moods} setBackAction={setBackAction} setCustomTitle={setCustomTitle} />;
      case 'contacts': return <ContactsView contacts={contacts} setContacts={setContacts} setBackAction={setBackAction} setCustomTitle={setCustomTitle} />;
      case 'profile': return <ProfileView profile={profile} setProfile={setProfile} safetyPlan={safetyPlan} setSafetyPlan={setSafetyPlan} setBackAction={setBackAction} setCustomTitle={setCustomTitle} />;
      default: return <HomeView setActiveTab={setActiveTab} moods={moods} setMoods={setMoods} profile={profile} />;
    }
  };

  const getTitle = () => {
    if (customTitle) return customTitle;
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
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className={`w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl overflow-x-hidden flex flex-col ${profile.disguisedMode ? 'grayscale contrast-125' : ''}`}>
        <QuickExit />
        <Header title={getTitle()} onBack={backAction || undefined} />
        
        <main className="px-6 pb-4 flex-1">
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
          className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl z-40 active:scale-90 transition-transform"
          style={{ left: 'calc(50% + 120px)', transform: 'translateX(-50%)' }}
        >
          <MessageCircle size={28} />
        </button>

        {/* Assistant Modal */}
        <AnimatePresence>
          {showAssistant && (
            <div className="fixed inset-0 z-[100] flex justify-center pointer-events-none">
              <div className="w-full max-w-md h-full pointer-events-auto">
                <AssistantView onClose={() => setShowAssistant(false)} />
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Global Disclaimer */}
        <div className="px-6 py-4 text-[10px] text-gray-400 text-center leading-tight mb-20">
          TELP provides guidance and connection to help. We are not a replacement for emergency services. If you are in immediate danger, call 112 or your local emergency number.
        </div>
      </div>
    </div>
  );
}
