import React, { useState } from 'react';
import { User, Shield, Eye, EyeOff, Moon, Sun, ChevronRight, LogOut, Save, Plus, Trash2 } from 'lucide-react';
import { UserProfile, SafetyPlan } from '../types';
import { ConfirmModal } from '../components/Modal';

interface ProfileViewProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  safetyPlan: SafetyPlan;
  setSafetyPlan: React.Dispatch<React.SetStateAction<SafetyPlan>>;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, setProfile, safetyPlan, setSafetyPlan }) => {
  const [activeSection, setActiveSection] = useState<'settings' | 'safetyPlan'>('settings');
  const [newPlanItem, setNewPlanItem] = useState('');
  const [planCategory, setPlanCategory] = useState<keyof SafetyPlan>('trustedPeople');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleDisguise = () => {
    setProfile(prev => ({ ...prev, disguisedMode: !prev.disguisedMode }));
  };

  const addPlanItem = () => {
    if (!newPlanItem) return;
    setSafetyPlan(prev => ({
      ...prev,
      [planCategory]: [...prev[planCategory], newPlanItem]
    }));
    setNewPlanItem('');
  };

  const removePlanItem = (category: keyof SafetyPlan, index: number) => {
    setSafetyPlan(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleLogout = () => {
    setProfile(prev => ({ ...prev, onboarded: false }));
  };

  const handleResetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const togglePrivacy = () => {
    setProfile(prev => ({ ...prev, privacyMode: !prev.privacyMode }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
          <User size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {profile.privacyMode ? 'User' : (profile.name || 'Friend')}
          </h3>
          <p className="text-sm text-gray-500">{profile.ageRange} • {profile.language}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-200 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveSection('settings')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeSection === 'settings' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          Settings
        </button>
        <button 
          onClick={() => setActiveSection('safetyPlan')}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeSection === 'safetyPlan' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          Safety Plan
        </button>
      </div>

      {activeSection === 'settings' ? (
        <div className="space-y-4">
          <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                  <EyeOff size={18} />
                </div>
                <span className="font-bold text-gray-700">Disguised Mode</span>
              </div>
              <button 
                onClick={toggleDisguise}
                className={`w-12 h-6 rounded-full transition-colors relative ${profile.disguisedMode ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${profile.disguisedMode ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-50 text-amber-600 p-2 rounded-lg">
                  <Shield size={18} />
                </div>
                <span className="font-bold text-gray-700">Privacy Mode</span>
              </div>
              <button 
                onClick={togglePrivacy}
                className={`w-12 h-6 rounded-full transition-colors relative ${profile.privacyMode ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${profile.privacyMode ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </section>

          <div className="space-y-3">
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                  <LogOut size={18} />
                </div>
                <span className="font-bold text-gray-700">Log Out</span>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </button>

            <button 
              onClick={() => setShowResetConfirm(true)}
              className="w-full bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                  <Trash2 size={18} />
                </div>
                <span className="font-bold text-gray-700">Reset App Data</span>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h4 className="font-bold text-gray-800">Build Your Safety Plan</h4>
            <div className="space-y-3">
              <select 
                value={planCategory}
                onChange={e => setPlanCategory(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none text-sm"
              >
                <option value="trustedPeople">Trusted People</option>
                <option value="safePlaces">Safe Places</option>
                <option value="emergencySteps">Emergency Steps</option>
                <option value="reminders">Reminders</option>
              </select>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Add item..."
                  value={newPlanItem}
                  onChange={e => setNewPlanItem(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none text-sm"
                />
                <button 
                  onClick={addPlanItem}
                  className="bg-blue-600 text-white p-3 rounded-xl active:scale-90 transition-transform"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {(Object.keys(safetyPlan) as Array<keyof SafetyPlan>).map((category) => (
              <div key={category} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
                  {category.replace(/([A-Z])/g, ' $1')}
                </h5>
                {safetyPlan[category].length === 0 ? (
                  <p className="text-xs text-gray-300 italic">No items added yet.</p>
                ) : (
                  <div className="space-y-2">
                    {safetyPlan[category].map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                        <span className="text-sm text-gray-700">{item}</span>
                        <button onClick={() => removePlanItem(category, index)} className="text-gray-300 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Log Out"
      >
        Are you sure you want to log out? This will reset your current session and take you back to onboarding.
      </ConfirmModal>

      <ConfirmModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleResetData}
        title="Reset All Data"
        type="danger"
        confirmText="Reset Everything"
      >
        This will permanently delete all your saved reports, contacts, and safety plans. This action cannot be undone.
      </ConfirmModal>
    </div>
  );
};
