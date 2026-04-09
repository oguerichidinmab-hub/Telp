export type Mood = 'happy' | 'calm' | 'sad' | 'anxious' | 'angry' | 'scared';

export interface UserProfile {
  name: string;
  ageRange: string;
  language: string;
  location: string;
  onboarded: boolean;
  privacyMode: boolean;
  disguisedMode: boolean;
  isLoggedIn: boolean;
  email?: string;
  username?: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relation: 'parent' | 'relative' | 'teacher' | 'counselor' | 'friend' | 'other';
  phone: string;
  email?: string;
}

export interface IncidentReport {
  id: string;
  type: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'private' | 'prepared';
  timestamp: number;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  content: string;
  icon: string;
}

export interface MoodEntry {
  date: string;
  mood: Mood;
  note?: string;
}

export interface SafetyPlan {
  trustedPeople: string[];
  safePlaces: string[];
  emergencySteps: string[];
  reminders: string[];
}
