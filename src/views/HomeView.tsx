import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, AlertCircle, Phone, FileText, MessageCircle, Heart, ChevronRight, BookOpen } from 'lucide-react';
import { Mood, MoodEntry, UserProfile } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  moods: MoodEntry[];
  setMoods: React.Dispatch<React.SetStateAction<MoodEntry[]>>;
  profile: UserProfile;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, moods, setMoods, profile }) => {
  const [showMoodPicker, setShowMoodPicker] = useState(true);

  const handleMoodSelect = (mood: Mood) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: MoodEntry = { date: today, mood };
    setMoods(prev => [newEntry, ...prev.filter(m => m.date !== today)]);
    setShowMoodPicker(false);
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
      <section className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl">
        <h2 className="text-xl font-bold mb-2">You are safe here.</h2>
        <p className="text-blue-100 text-sm mb-4">How can we help you today?</p>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setActiveTab('contacts')}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl flex flex-col items-center gap-2 transition-colors"
          >
            <Phone size={20} />
            <span className="text-xs font-semibold">Emergency</span>
          </button>
          <button 
            onClick={() => setActiveTab('report')}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl flex flex-col items-center gap-2 transition-colors"
          >
            <FileText size={20} />
            <span className="text-xs font-semibold">Report</span>
          </button>
        </div>
      </section>

      {/* Mood Check-in */}
      {showMoodPicker && (
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Heart size={18} className="text-pink-500" />
            How are you feeling?
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {(Object.keys(moodEmojis) as Mood[]).map((mood) => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <span className="text-3xl">{moodEmojis[mood]}</span>
                <span className="text-[10px] capitalize text-gray-500">{mood}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 px-1">Quick Access</h3>
        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={() => setActiveTab('support')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <Shield size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">Safety Guidance</p>
                <p className="text-xs text-gray-500">Steps to stay safe</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-400" />
          </button>

          <button 
            onClick={() => setActiveTab('resources')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                <BookOpen size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">Learn More</p>
                <p className="text-xs text-gray-500">Resources & education</p>
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
