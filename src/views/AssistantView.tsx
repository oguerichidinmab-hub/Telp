import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Send, Mic, User, Bot, Loader2, AlertCircle } from 'lucide-react';
import { getAssistantResponse } from '../services/gemini';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

interface AssistantViewProps {
  onClose: () => void;
}

export const AssistantView: React.FC<AssistantViewProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm the TELP Support Assistant. I'm here to listen and help you find support. How are you feeling today?",
      sender: 'bot',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for Gemini
    const history = messages.map(m => ({
      role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: m.text }]
    }));

    const botResponseText = await getAssistantResponse(input, history);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponseText,
      sender: 'bot',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Mock voice recognition
      setTimeout(() => {
        setIsListening(false);
        setInput('I need help with bullying at school');
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      className="fixed inset-0 bg-white z-[100] flex flex-col"
    >
      {/* Header */}
      <header className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">Support Assistant</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase">Online & Listening</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 p-2 hover:bg-gray-50 rounded-full">
          <X size={24} />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                <Loader2 size={20} className="animate-spin text-gray-400" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Safety Disclaimer */}
      <div className="px-6 py-2 bg-amber-50 flex items-center gap-2">
        <AlertCircle size={14} className="text-amber-600" />
        <p className="text-[10px] text-amber-800">I am an AI assistant, not a professional. If you are in danger, call emergency services.</p>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <div className="flex gap-2">
          <button 
            onClick={toggleVoice}
            className={`p-4 rounded-2xl transition-colors ${
              isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-500'
            }`}
          >
            <Mic size={24} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder={isListening ? "Listening..." : "Type your message..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              className="w-full bg-gray-100 border-none rounded-2xl p-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 p-2 text-blue-600 disabled:text-gray-300"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
