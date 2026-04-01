import React, { useState } from 'react';
import { Shield, ChevronRight, ArrowLeft, AlertTriangle, UserX, Heart, Info } from 'lucide-react';
import { GUIDANCE_STEPS } from '../constants';
import { motion } from 'motion/react';

export const SupportView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    { id: 'bullying', title: 'Bullying', icon: UserX, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'abuse', title: 'Abuse', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'violence', title: 'Violence', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'harassment', title: 'Harassment', icon: Info, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  if (selectedTopic) {
    const steps = GUIDANCE_STEPS[selectedTopic as keyof typeof GUIDANCE_STEPS] || [
      "Reach out to someone you trust.",
      "Document what is happening.",
      "Stay in safe, public areas.",
      "Know that you are not alone."
    ];

    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedTopic(null)}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-4"
        >
          <ArrowLeft size={20} />
          Back to Support
        </button>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{selectedTopic}</h2>
          <p className="text-gray-500 text-sm mb-6">Follow these steps to protect yourself and get help.</p>

          <div className="space-y-4">
            {steps.map((step, index) => (
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

        <div className="bg-blue-600 rounded-3xl p-6 text-white text-center">
          <Heart className="mx-auto mb-3" size={32} />
          <h3 className="font-bold mb-2">Need to talk to someone now?</h3>
          <p className="text-blue-100 text-sm mb-4">Our assistant and helplines are available 24/7.</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold w-full">
            Contact Helpline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-500 px-1">Choose a topic to get confidential guidance on what to do next.</p>
      
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
                <span className="font-bold text-lg text-gray-800">{topic.title}</span>
              </div>
              <ChevronRight size={24} className="text-gray-300 group-hover:text-gray-400" />
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-3xl border border-dashed border-gray-300">
        <h3 className="font-bold text-gray-800 mb-2">Private & Confidential</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Your interactions here are private. We do not share your data unless you choose to report an incident or request emergency help.
        </p>
      </div>
    </div>
  );
};
