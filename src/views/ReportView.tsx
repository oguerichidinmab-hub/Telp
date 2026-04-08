import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Calendar, Clock, MapPin, AlertCircle, Save, Send, Trash2, Plus } from 'lucide-react';
import { IncidentReport } from '../types';
import { ConfirmModal } from '../components/Modal';

interface ReportViewProps {
  reports: IncidentReport[];
  setReports: React.Dispatch<React.SetStateAction<IncidentReport[]>>;
}

export const ReportView: React.FC<ReportViewProps> = ({ reports, setReports }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IncidentReport>>({
    type: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    location: '',
    notes: '',
    urgency: 'low',
    status: 'private'
  });

  const handleSave = (status: 'private' | 'prepared') => {
    const newReport: IncidentReport = {
      id: Math.random().toString(36).substr(2, 9),
      type: formData.type || 'General',
      date: formData.date || '',
      time: formData.time || '',
      location: formData.location || '',
      notes: formData.notes || '',
      urgency: formData.urgency || 'low',
      status: status,
      timestamp: Date.now()
    };
    setReports([newReport, ...reports]);
    setIsCreating(false);
    setFormData({
      type: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      location: '',
      notes: '',
      urgency: 'low',
      status: 'private'
    });
  };

  const deleteReport = () => {
    if (reportToDelete) {
      setReports(reports.filter(r => r.id !== reportToDelete));
      setReportToDelete(null);
    }
  };

  if (isCreating) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">New Incident Log</h2>
          <button onClick={() => setIsCreating(false)} className="text-gray-400">Cancel</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Issue Type</label>
            <select 
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Type</option>
              <option value="Bullying">Bullying</option>
              <option value="Abuse">Abuse</option>
              <option value="Harassment">Harassment</option>
              <option value="Cyberbullying">Cyberbullying</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
              <input 
                type="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Time</label>
              <input 
                type="time"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-gray-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Where did it happen?"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-2xl p-4 pl-12 text-gray-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Notes</label>
            <textarea 
              rows={4}
              placeholder="Describe what happened..."
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-gray-800 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Urgency</label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFormData({...formData, urgency: level as any})}
                  className={`flex-1 py-3 rounded-xl font-bold capitalize transition-all ${
                    formData.urgency === level 
                      ? level === 'high' ? 'bg-red-500 text-white' : level === 'medium' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                      : 'bg-white text-gray-400 border border-gray-100'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button 
            onClick={() => handleSave('private')}
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold active:scale-95 transition-transform"
          >
            <Save size={20} />
            Save Private
          </button>
          <button 
            onClick={() => handleSave('prepared')}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform"
          >
            <Send size={20} />
            Prepare Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">Document incidents safely and privately.</p>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-transform"
        >
          <Plus size={24} />
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
          <FileText className="mx-auto text-gray-200 mb-4" size={64} />
          <p className="text-gray-400 font-medium">No incidents logged yet.</p>
          <p className="text-xs text-gray-300 mt-1 px-8">Logging incidents helps you keep a record of what happened.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${
                report.urgency === 'high' ? 'bg-red-500' : report.urgency === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
              }`} />
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{report.status}</span>
                  <h3 className="font-bold text-gray-800 text-lg">{report.type}</h3>
                </div>
                <button onClick={() => setReportToDelete(report.id)} className="text-gray-300 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {report.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  {report.time}
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin size={14} />
                  {report.location || 'No location specified'}
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 italic">"{report.notes}"</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-2xl flex gap-3">
        <AlertCircle className="text-blue-500 shrink-0" size={20} />
        <p className="text-[10px] text-blue-700 leading-tight">
          Reports saved as "Private" are only visible to you. "Prepared" reports are ready to be shared with authorities if you choose to do so.
        </p>
      </div>

      <ConfirmModal
        isOpen={!!reportToDelete}
        onClose={() => setReportToDelete(null)}
        onConfirm={deleteReport}
        title="Delete Report"
        type="danger"
        confirmText="Delete"
      >
        Are you sure you want to delete this incident report? This action cannot be undone.
      </ConfirmModal>
    </div>
  );
};
