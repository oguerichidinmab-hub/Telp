import React, { useState } from 'react';
import { 
  Shield, 
  ChevronRight, 
  ArrowLeft, 
  AlertTriangle, 
  UserX, 
  Heart, 
  Info, 
  Search, 
  BookOpen, 
  Globe, 
  UserCheck 
} from 'lucide-react';
import { GUIDANCE_STEPS, MOCK_RESOURCES } from '../constants';
import { Resource } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const SupportResourcesView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'guidance' | 'education'>('guidance');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    { id: 'bullying', title: 'Bullying', description: 'Guidance on physical, verbal, and cyberbullying.', icon: UserX, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'abuse', title: 'Abuse', description: 'Steps to take if you are facing harm at home or elsewhere.', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'violence', title: 'Violence', description: 'Emergency actions and safety measures for violent situations.', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'harassment', title: 'Harassment', description: 'How to handle unwanted attention or behavior.', icon: Info, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const filteredResources = MOCK_RESOURCES.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getResourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield size={24} />;
      case 'Heart': return <Heart size={24} />;
      case 'Globe': return <Globe size={24} />;
      case 'UserCheck': return <UserCheck size={24} />;
      default: return <BookOpen size={24} />;
    }
  };

  // Render Topic Detail
  if (selectedTopic) {
    const topicData = GUIDANCE_STEPS[selectedTopic as keyof typeof GUIDANCE_STEPS] || {
      steps: ["Reach out to someone you trust."],
      signs: []
    };

    return (
      <div className="space-y-6 pb-12">
        <button 
          onClick={() => setSelectedTopic(null)}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-4"
        >
          <ArrowLeft size={20} />
          Back to Guidance
        </button>

        <div className="space-y-6">
          {topicData.signs && topicData.signs.length > 0 && (
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} />
                Common Signs
              </h3>
              <ul className="space-y-2">
                {topicData.signs.map((sign, index) => (
                  <li key={index} className="text-sm text-amber-800 flex gap-2">
                    <span className="text-amber-400">•</span>
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{selectedTopic}</h2>
            <p className="text-gray-500 text-sm mb-6">Follow these steps to protect yourself and get help.</p>

            <div className="space-y-4">
              {topicData.steps.map((step, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index} 
                  className="flex gap-4"
                >
                  <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Resource Detail
  if (selectedResource) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedResource(null)}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-4"
        >
          <ArrowLeft size={20} />
          Back to Education
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            {getResourceIcon(selectedResource.icon)}
          </div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{selectedResource.category}</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-6">{selectedResource.title}</h2>
          <div className="prose prose-sm text-gray-600 leading-relaxed">
            {selectedResource.content}
            <p className="mt-4">
              Understanding your rights and boundaries is the first step toward staying safe.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sub-Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveSubTab('guidance')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeSubTab === 'guidance' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          <Shield size={18} />
          Direct Guidance
        </button>
        <button 
          onClick={() => setActiveSubTab('education')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeSubTab === 'education' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          <BookOpen size={18} />
          Education
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'guidance' ? (
          <motion.div
            key="guidance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <p className="text-sm text-gray-500 px-1">Immediate steps and guidance for specific situations.</p>
            <div className="grid grid-cols-1 gap-3">
              {topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${topic.bg} ${topic.color} p-4 rounded-2xl`}>
                        <Icon size={28} />
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-lg text-gray-800 block">{topic.title}</span>
                        <span className="text-xs text-gray-500">{topic.description}</span>
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-gray-300 group-hover:text-gray-400" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search educational materials..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl p-4 pl-12 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredResources.map((resource) => (
                <button
                  key={resource.id}
                  onClick={() => setSelectedResource(resource)}
                  className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 text-blue-600 p-3 rounded-xl">
                      {getResourceIcon(resource.icon)}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-800">{resource.title}</p>
                      <p className="text-xs text-gray-500">{resource.category}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-400" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-2">Private & Confidential</h3>
        <p className="text-xs text-blue-700 leading-relaxed">
          Whether you're seeking direct guidance or learning about your rights, your activity here remains private.
        </p>
      </div>
    </div>
  );
};
