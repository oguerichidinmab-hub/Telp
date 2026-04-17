import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, AlertCircle, Phone, FileText, MessageCircle, Heart, ChevronRight, BookOpen } from 'lucide-react';
import { Mood, MoodEntry, UserProfile, SafetyPlan } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  moods: MoodEntry[];
  setMoods: React.Dispatch<React.SetStateAction<MoodEntry[]>>;
  profile: UserProfile;
  safetyPlan: SafetyPlan;
  onOpenAssistant?: () => void;
}

import { Logo } from '../components/Logo';

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, moods, setMoods, profile, safetyPlan, onOpenAssistant }) => {
  const [showMoodPicker, setShowMoodPicker] = useState(true);
  const [justLogged, setJustLogged] = useState(false);

  const hasSafetyPlan = safetyPlan.trustedPeople.length > 0 || 
                        safetyPlan.safePlaces.length > 0 || 
                        safetyPlan.emergencySteps.length > 0;

  const today = new Date().toISOString().split('T')[0];
  const currentMood = moods.find(m => m.date === today);

  const handleMoodSelect = (mood: Mood) => {
    const newEntry: MoodEntry = { date: today, mood };
    setMoods(prev => [newEntry, ...prev.filter(m => m.date !== today)]);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 4000);
  };

  const moodEmojis: Record<Mood, string> = {
    happy: '😊',
    calm: '😌',
    sad: '😔',
    anxious: '😟',
    angry: '😠',
    scared: '😨'
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <section className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 opacity-10 rotate-12">
          <Logo size={160} variant="icon" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-80">Dashboard</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">You are safe here.</h2>
          <p className="text-blue-100 text-sm mb-6">How can we help you today?</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setActiveTab('contacts')}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl flex flex-col items-center gap-2 transition-all active:scale-95 backdrop-blur-sm"
            >
              <Phone size={20} />
              <span className="text-xs font-semibold">Emergency</span>
            </button>
            <button 
              onClick={() => setActiveTab('report')}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl flex flex-col items-center gap-2 transition-all active:scale-95 backdrop-blur-sm"
            >
              <FileText size={20} />
              <span className="text-xs font-semibold">Report</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mood Check-in */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Heart size={18} className={`${currentMood ? 'text-red-500' : 'text-pink-500'}`} />
            {currentMood ? "Today's Mood" : "How are you feeling?"}
          </h3>
          {currentMood && (
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase">
              Updated
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(Object.keys(moodEmojis) as Mood[]).map((mood) => {
            const isSelected = currentMood?.mood === mood;
            return (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all active:scale-90 ${
                  isSelected ? 'bg-blue-50 ring-2 ring-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <span className={`text-3xl transition-transform ${isSelected ? 'scale-110' : ''}`}>
                  {moodEmojis[mood]}
                </span>
                <span className={`text-[10px] capitalize font-bold ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                  {mood}
                </span>
              </button>
            );
          })}
        </div>

        {justLogged && currentMood && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-purple-50 text-purple-800 rounded-2xl text-sm text-center border border-purple-100"
          >
            {['sad', 'anxious', 'scared', 'angry'].includes(currentMood.mood) ? (
              <div className="space-y-3">
                <p>I hear you. It's okay to feel {currentMood.mood}. Would you like to talk about it?</p>
                <button 
                  onClick={onOpenAssistant}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold active:scale-95 transition-transform text-xs"
                >
                  Chat with Support Assistant
                </button>
              </div>
            ) : (
              <p>Glad you're feeling {currentMood.mood} today! Keep taking care of yourself.</p>
            )}
          </motion.div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 px-1">Quick Access</h3>
        <div className="grid grid-cols-1 gap-3">
          {hasSafetyPlan && (
            <button 
              onClick={() => setActiveTab('profile')}
              className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between group active:bg-blue-100"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-xl text-white">
                  <Shield size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-900">Your Safety Plan</p>
                  <p className="text-xs text-blue-700">Quickly view your safe steps</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-blue-400" />
            </button>
          )}

          <button 
            onClick={() => setActiveTab('support')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <Shield size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">Support & Resources</p>
                <p className="text-xs text-gray-500">Guidance & education</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-400" />
          </button>
        </div>
      </section>

      {/* Safety Alert (Mock) */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
        <AlertCircle className="text-amber-500 shrink-0" size={20} />
        <div>
          <p className="text-sm font-bold text-amber-800">Safety Tip</p>
          <p className="text-xs text-amber-700">Remember to update your trusted contacts if you move or change schools.</p>
        </div>
      </div>
    </div>
  );
};
