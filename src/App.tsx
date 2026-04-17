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
import { AuthView } from './views/AuthView';
import { AssistantView } from './views/AssistantView';
import { SplashView } from './views/SplashView';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAssistant, setShowAssistant] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
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

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashView />;
  }

  if (!profile.onboarded) {
    return <OnboardingView profile={profile} onComplete={(p) => setProfile({ ...profile, ...p, onboarded: true })} />;
  }

  if (!profile.isLoggedIn) {
    return <AuthView onLogin={(p) => setProfile({ ...profile, ...p, isLoggedIn: true })} />;
  }

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} moods={moods} setMoods={setMoods} profile={profile} safetyPlan={safetyPlan} onOpenAssistant={() => setShowAssistant(true)} />;
      case 'support': return <SupportResourcesView setBackAction={setBackAction} setCustomTitle={setCustomTitle} />;
      case 'report': return <ReportView reports={reports} setReports={setReports} moods={moods} contacts={contacts} setBackAction={setBackAction} setCustomTitle={setCustomTitle} />;
      case 'contacts': return <ContactsView contacts={contacts} setContacts={setContacts} setBackAction={setBackAction} setCustomTitle={setCustomTitle} />;
      case 'profile': return <ProfileView profile={profile} setProfile={setProfile} safetyPlan={safetyPlan} setSafetyPlan={setSafetyPlan} setBackAction={setBackAction} setCustomTitle={setCustomTitle} />;
      default: return <HomeView setActiveTab={setActiveTab} moods={moods} setMoods={setMoods} profile={profile} safetyPlan={safetyPlan} onOpenAssistant={() => setShowAssistant(true)} />;
    }
  };

  const getTitle = () => {
    if (customTitle) return customTitle;
    switch (activeTab) {
      case 'home': return 'Dashboard';
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

        {/* Floating Assistant Button (FAB) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAssistant(true)}
          className="fixed bottom-24 right-6 bg-gradient-to-tr from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full shadow-[0_8px_24px_rgba(37,99,235,0.3)] z-40 flex items-center justify-center transition-shadow"
          style={{ left: 'calc(50% + 140px)', transform: 'translateX(-50%)' }}
        >
          <MessageCircle size={20} />
        </motion.button>

        {/* Assistant Modal */}
        <AnimatePresence>
          {showAssistant && (
            <div className="fixed inset-0 z-[100] flex justify-center pointer-events-none">
              <div className="w-full max-w-md h-full pointer-events-auto">
                <AssistantView onClose={() => setShowAssistant(false)} moods={moods} profile={profile} />
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
