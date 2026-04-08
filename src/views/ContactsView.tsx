import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Plus, Trash2, Shield, Heart, User, Star, AlertCircle } from 'lucide-react';
import { TrustedContact } from '../types';
import { MOCK_AUTHORITIES } from '../constants';
import { ConfirmModal } from '../components/Modal';

interface ContactsViewProps {
  contacts: TrustedContact[];
  setContacts: React.Dispatch<React.SetStateAction<TrustedContact[]>>;
  setBackAction: (action: (() => void) | null) => void;
  setCustomTitle: (title: string | null) => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({ contacts, setContacts, setBackAction, setCustomTitle }) => {
  const [isAdding, setIsAdding] = useState(false);

  React.useEffect(() => {
    if (isAdding) {
      setBackAction(() => () => setIsAdding(false));
      setCustomTitle('Add Contact');
    } else {
      setBackAction(null);
      setCustomTitle(null);
    }
    return () => {
      setBackAction(null);
      setCustomTitle(null);
    };
  }, [isAdding, setBackAction, setCustomTitle]);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [newContact, setNewContact] = useState<Partial<TrustedContact>>({
    name: '',
    relation: 'friend',
    phone: ''
  });

  const handleAdd = () => {
    if (!newContact.name || !newContact.phone) return;
    const contact: TrustedContact = {
      id: Math.random().toString(36).substr(2, 9),
      name: newContact.name,
      relation: newContact.relation as any,
      phone: newContact.phone,
    };
    setContacts([...contacts, contact]);
    setIsAdding(false);
    setNewContact({ name: '', relation: 'friend', phone: '' });
  };

  const deleteContact = () => {
    if (contactToDelete) {
      setContacts(contacts.filter(c => c.id !== contactToDelete));
      setContactToDelete(null);
    }
  };

  const groupedAuthorities = MOCK_AUTHORITIES.reduce((acc, auth) => {
    if (!acc[auth.type]) acc[auth.type] = [];
    acc[auth.type].push(auth);
    return acc;
  }, {} as Record<string, typeof MOCK_AUTHORITIES>);

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'Emergency': return <AlertCircle size={18} className="text-red-500" />;
      case 'Anti-Bullying': return <Shield size={18} className="text-blue-600" />;
      case 'Child Protection': return <Heart size={18} className="text-pink-500" />;
      case 'Mental Health': return <Star size={18} className="text-purple-500" />;
      case 'Police': return <Shield size={18} className="text-gray-600" />;
      default: return <Shield size={18} className="text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Emergency Authorities */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Shield size={18} className="text-blue-600" />
            Official Support Services
          </h3>
        </div>

        {Object.entries(groupedAuthorities).map(([type, auths]) => (
          <div key={type} className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 px-1">
              {getCategoryIcon(type)}
              {type}
            </h4>
            <div className="space-y-3">
              {auths.map((auth) => (
                <div key={auth.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800">{auth.name}</h4>
                      <p className="text-xs text-gray-500">{auth.description}</p>
                    </div>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-lg">
                      {auth.distance}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <a 
                      href={auth.phone.startsWith('*') ? `tel:${auth.phone.replace('#', '%23')}` : `tel:${auth.phone}`}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform"
                    >
                      <Phone size={18} />
                      {auth.phone.startsWith('*') ? 'Dial Code' : 'Call'}
                    </a>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform">
                      <MapPin size={18} />
                      Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Trusted Contacts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Heart size={18} className="text-pink-500" />
            Trusted Contacts
          </h3>
          <button 
            onClick={() => setIsAdding(true)}
            className="text-blue-600 font-bold text-sm flex items-center gap-1"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100 space-y-4 animate-in fade-in slide-in-from-top-4">
            <input 
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={e => setNewContact({...newContact, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none"
            />
            <select 
              value={newContact.relation}
              onChange={e => setNewContact({...newContact, relation: e.target.value as any})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none"
            >
              <option value="parent">Parent/Guardian</option>
              <option value="relative">Relative</option>
              <option value="teacher">Teacher</option>
              <option value="counselor">Counselor</option>
              <option value="friend">Friend</option>
              <option value="other">Other</option>
            </select>
            <input 
              type="tel"
              placeholder="Phone Number"
              value={newContact.phone}
              onChange={e => setNewContact({...newContact, phone: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none"
            />
            <div className="flex gap-2">
              <button onClick={handleAdd} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Save</button>
            </div>
          </div>
        )}

        {contacts.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <User className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-xs text-gray-400">Add trusted people you can reach out to in an emergency.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-pink-50 text-pink-500 p-3 rounded-full">
                    <Star size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{contact.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{contact.relation}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${contact.phone}`} className="p-3 bg-green-50 text-green-600 rounded-xl active:scale-90 transition-transform">
                    <Phone size={20} />
                  </a>
                  <button onClick={() => setContactToDelete(contact.id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <ConfirmModal
        isOpen={!!contactToDelete}
        onClose={() => setContactToDelete(null)}
        onConfirm={deleteContact}
        title="Remove Contact"
        type="danger"
        confirmText="Remove"
      >
        Are you sure you want to remove this trusted contact?
      </ConfirmModal>
    </div>
  );
};
