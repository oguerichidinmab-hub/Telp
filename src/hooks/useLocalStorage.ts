import React, { useState, useEffect } from 'react';
import { UserProfile, TrustedContact, IncidentReport, MoodEntry, SafetyPlan } from '../types';

export function useLocalStorage() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('telp_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      ageRange: '',
      language: 'English',
      location: '',
      onboarded: false,
      privacyMode: false,
      disguisedMode: false
    };
  });

  const [contacts, setContacts] = useState<TrustedContact[]>(() => {
    const saved = localStorage.getItem('telp_contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [reports, setReports] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem('telp_reports');
    return saved ? JSON.parse(saved) : [];
  });

  const [moods, setMoods] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('telp_moods');
    return saved ? JSON.parse(saved) : [];
  });

  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan>(() => {
    const saved = localStorage.getItem('telp_safety_plan');
    return saved ? JSON.parse(saved) : {
      trustedPeople: [],
      safePlaces: [],
      emergencySteps: [],
      reminders: []
    };
  });

  useEffect(() => {
    localStorage.setItem('telp_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('telp_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('telp_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('telp_moods', JSON.stringify(moods));
  }, [moods]);

  useEffect(() => {
    localStorage.setItem('telp_safety_plan', JSON.stringify(safetyPlan));
  }, [safetyPlan]);

  return {
    profile, setProfile,
    contacts, setContacts,
    reports, setReports,
    moods, setMoods,
    safetyPlan, setSafetyPlan
  };
}
