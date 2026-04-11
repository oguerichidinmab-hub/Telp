import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronRight, User, MapPin, Globe, Lock, Heart } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingViewProps {
  onComplete: (profile: Partial<UserProfile>) => void;
  profile: UserProfile;
}

import { Logo } from '../components/Logo';

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete, profile }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: profile.username || (profile.email ? profile.email.split('@')[0] : ''),
    ageRange: '',
    language: 'English',
    location: '',
    privacyMode: true,
    disguisedMode: false
  });

  const nextStep = () => setStep(s => s + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 text-center"
          >
            <div className="mx-auto flex justify-center">
              <Logo size={96} variant="icon" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Welcome to TELP</h2>
              <p className="text-gray-500 leading-relaxed">
                A safe space for you to get support, report incidents, and stay safe. Your privacy is our priority.
              </p>
            </div>
            <button 
              onClick={nextStep}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              Get Started
            </button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">Tell us about you</h3>
              <p className="text-sm text-gray-500">You can use a nickname if you prefer.</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Nickname"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select 
                value={formData.ageRange}
                onChange={e => setFormData({...formData, ageRange: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-2xl p-4 outline-none"
              >
                <option value="">Select Age Range</option>
                <option value="13-15">13 - 15 years old</option>
                <option value="16-18">16 - 18 years old</option>
                <option value="19+">19+ years old</option>
              </select>

              <div className="relative">
                <Globe className="absolute left-4 top-4 text-gray-400" size={20} />
                <select 
                  value={formData.language}
                  onChange={e => setFormData({...formData, language: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 pl-12 outline-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Location (City/Region)"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 pl-12 outline-none"
                />
              </div>
            </div>

            <button 
              onClick={nextStep}
              disabled={!formData.name || !formData.ageRange}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform disabled:opacity-50"
            >
              Continue
            </button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">Privacy & Safety</h3>
              <p className="text-sm text-gray-500">How would you like to use TELP?</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                  <Lock size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">Privacy Mode</p>
                  <p className="text-[10px] text-gray-500">Encrypted data & auto-lock</p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center gap-4">
                <div className="bg-purple-50 text-purple-600 p-3 rounded-2xl">
                  <Heart size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">Trusted Contacts</p>
                  <p className="text-[10px] text-gray-500">Quick access to help</p>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
              <p className="text-[10px] text-amber-800 leading-relaxed">
                By continuing, you agree to our terms. TELP is a support tool, not a replacement for emergency services.
              </p>
            </div>

            <button 
              onClick={() => onComplete(formData)}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              Finish Setup
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};
