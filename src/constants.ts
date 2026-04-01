import { Resource, TrustedContact } from './types';

export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Recognizing Bullying',
    category: 'Safety',
    content: 'Bullying is repetitive behavior intended to hurt someone. It can be physical, verbal, or online (cyberbullying). You have the right to feel safe.',
    icon: 'Shield'
  },
  {
    id: '2',
    title: 'Healthy Boundaries',
    category: 'Relationships',
    content: 'Boundaries are rules you set for yourself in relationships. It is okay to say no to things that make you feel uncomfortable.',
    icon: 'Heart'
  },
  {
    id: '3',
    title: 'Digital Safety',
    category: 'Online',
    content: 'Keep your passwords private and be careful about what you share online. If someone makes you feel unsafe on social media, you can block and report them.',
    icon: 'Globe'
  },
  {
    id: '4',
    title: 'Consent Education',
    category: 'Safety',
    content: 'Consent means a clear, voluntary "yes". Everyone has the right to control their own body. No means no, and silence does not mean yes.',
    icon: 'UserCheck'
  }
];

export const MOCK_AUTHORITIES = [
  {
    id: 'a1',
    name: 'Child Protection Services',
    type: 'Official',
    phone: '1-800-422-4453',
    description: 'National Child Abuse Hotline',
    distance: '0.5 miles'
  },
  {
    id: 'a2',
    name: 'Local Police Department',
    type: 'Emergency',
    phone: '911',
    description: 'For immediate danger',
    distance: '1.2 miles'
  },
  {
    id: 'a3',
    name: 'Teen Helpline',
    type: 'Support',
    phone: '800-852-8336',
    description: 'Confidential peer support',
    distance: 'Online'
  }
];

export const GUIDANCE_STEPS = {
  bullying: [
    "Stay calm and try not to react emotionally in the moment.",
    "Walk away if it is safe to do so.",
    "Save evidence (screenshots, messages).",
    "Tell a trusted adult (teacher, parent, counselor).",
    "Remember: It is not your fault."
  ],
  abuse: [
    "Find a safe place immediately.",
    "Contact an emergency service or a trusted adult.",
    "You do not have to handle this alone.",
    "There are people who can help you stay safe."
  ],
  violence: [
    "Your safety is the absolute priority.",
    "Get to a safe location as soon as possible.",
    "Contact emergency services (911) or a specialized hotline.",
    "Seek medical attention if needed."
  ]
};
