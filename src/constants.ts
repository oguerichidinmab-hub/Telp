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
  bullying: {
    steps: [
      "Stay calm and try not to react emotionally in the moment. Bullies often look for a reaction.",
      "Walk away if it is safe to do so. Removing yourself from the situation is a sign of strength, not weakness.",
      "Save evidence of the bullying. Take screenshots of messages, save emails, or write down dates and times of verbal incidents.",
      "Tell a trusted adult. This could be a teacher, parent, school counselor, or an older sibling. You don't have to carry this alone.",
      "Remember: It is not your fault. No one deserves to be treated this way, regardless of the circumstances.",
      "Join groups or activities where you feel valued and supported to rebuild your confidence.",
      "Use the 'Report' feature in this app to keep a private log of incidents for future reference.",
      "Consider blocking the person on social media or changing your privacy settings to prevent further contact.",
      "If the bullying involves threats of violence or illegal acts, contact the school administration or local authorities immediately."
    ],
    signs: [
      "Unexplained physical injuries or damaged belongings.",
      "Sudden loss of friends or avoidance of social situations.",
      "Changes in eating or sleeping habits.",
      "Declining grades or loss of interest in schoolwork.",
      "Feelings of helplessness or decreased self-esteem.",
      "Self-destructive behaviors such as running away from home or harming oneself."
    ]
  },
  abuse: {
    steps: [
      "Find a safe place immediately. If you are at home and feel unsafe, try to go to a friend's house, a library, or a public space.",
      "Contact an emergency service (911) or a trusted adult if you are in immediate danger.",
      "You do not have to handle this alone. Abuse is a serious matter that requires professional intervention.",
      "There are people who can help you stay safe. Child protection services and specialized helplines are available 24/7.",
      "Create a safety plan. Identify safe people you can call and safe places you can go at any time of day or night.",
      "Trust your instincts. If something feels wrong, it probably is. Your feelings are valid.",
      "Keep a 'go-bag' with essential items like clothes, some money, and important documents in a hidden but accessible place.",
      "Remember that abuse is never your fault, and you have the right to live in a safe and supportive environment.",
      "Seek medical attention if you have been physically harmed. Doctors can provide care and document injuries confidentially."
    ],
    signs: [
      "Frequent physical injuries that are poorly explained.",
      "Being overly compliant, passive, or withdrawn.",
      "Fear of a certain person or place.",
      "Changes in behavior, such as sudden aggression or extreme shyness.",
      "Inappropriate knowledge of sexual behavior for their age.",
      "Poor hygiene or lack of appropriate clothing for the weather."
    ]
  },
  violence: {
    steps: [
      "Your safety is the absolute priority. If violence is occurring or about to occur, get away as fast as you can.",
      "Get to a safe location as soon as possible. A police station, hospital, or any busy public place can offer protection.",
      "Contact emergency services (911) or a specialized hotline immediately. Do not wait.",
      "Seek medical attention if needed. Even if injuries seem minor, it's important to be checked by a professional.",
      "Do not wash or change clothes if sexual violence has occurred, as this can preserve important evidence for authorities.",
      "Reach out to a specialized support center. They can provide counseling and legal guidance tailored to your situation.",
      "If you are in a violent relationship, consider reaching out to a domestic violence advocate who can help you create a safe exit strategy.",
      "Tell someone you trust what happened. Having a support system is crucial for your emotional and physical recovery.",
      "Know your rights. You have the right to protection and justice under the law."
    ],
    signs: [
      "Physical signs of trauma, such as bruising, cuts, or broken bones.",
      "Extreme anxiety, panic attacks, or post-traumatic stress symptoms.",
      "Avoidance of certain people, places, or activities that remind them of the violence.",
      "Difficulty concentrating or sleeping.",
      "Sudden outbursts of anger or irritability.",
      "Feelings of intense guilt, shame, or self-blame."
    ]
  },
  harassment: {
    steps: [
      "Clearly state that the behavior is unwelcome, if you feel safe doing so. Sometimes people don't realize their actions are harmful.",
      "Keep a detailed log of every incident. Note the date, time, location, what was said or done, and any witnesses.",
      "Report the harassment to the appropriate authorities. If it's at school, talk to the administration. If it's online, use the platform's reporting tools.",
      "Set strict privacy settings on all your social media accounts. Block individuals who are harassing you.",
      "Seek support from friends and family. Harassment can be isolating, so stay connected with people who care about you.",
      "Consult with a counselor or a legal advocate to understand your rights and the steps you can take to stop the harassment.",
      "If the harassment is happening in a workplace or school, check their specific policies on harassment and follow the formal complaint process.",
      "Do not engage with the harasser. Responding can sometimes escalate the behavior.",
      "Remember that you deserve respect and a environment free from unwanted and harmful behavior."
    ],
    signs: [
      "Receiving unwanted and persistent messages, calls, or emails.",
      "Being followed or watched in a way that feels threatening.",
      "Unwanted physical contact or comments of a sexual nature.",
      "Feeling uncomfortable or unsafe in a particular environment due to someone's behavior.",
      "Changes in social media usage or avoidance of certain online platforms.",
      "Increased stress, anxiety, or feelings of being targeted."
    ]
  }
};
