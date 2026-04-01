import React, { useState } from 'react';
import { MOCK_RESOURCES } from '../constants';
import { Search, BookOpen, Shield, Heart, Globe, UserCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import { Resource } from '../types';
import { motion } from 'motion/react';

export const ResourcesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = MOCK_RESOURCES.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield size={24} />;
      case 'Heart': return <Heart size={24} />;
      case 'Globe': return <Globe size={24} />;
      case 'UserCheck': return <UserCheck size={24} />;
      default: return <BookOpen size={24} />;
    }
  };

  if (selectedResource) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedResource(null)}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-4"
        >
          <ArrowLeft size={20} />
          Back to Resources
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            {getIcon(selectedResource.icon)}
          </div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{selectedResource.category}</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-6">{selectedResource.title}</h2>
          <div className="prose prose-sm text-gray-600 leading-relaxed">
            {selectedResource.content}
            <p className="mt-4">
              Understanding your rights and boundaries is the first step toward staying safe. If you have more questions, you can ask our Support Assistant or talk to a trusted adult.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-4 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search resources..."
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
                {getIcon(resource.icon)}
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

      <section className="mt-8">
        <h3 className="font-bold text-gray-800 mb-4 px-1">Safety Topics</h3>
        <div className="grid grid-cols-2 gap-3">
          {['Consent', 'Boundaries', 'Online Safety', 'Self-Care'].map((topic) => (
            <div key={topic} className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
              <span className="text-sm font-semibold text-gray-700">{topic}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
