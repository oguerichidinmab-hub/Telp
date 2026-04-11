import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../components/Logo';
import { Mail, Lock, User, ArrowRight, Loader2, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthViewProps {
  onLogin: (userData: Partial<UserProfile>) => void;
}

type AuthMode = 'login' | 'signup' | 'forgot-password';

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (mode === 'forgot-password') {
        if (!email.includes('@')) {
          setError('Please enter a valid email address.');
        } else {
          setSuccess('Reset link sent to your email!');
        }
        setLoading(false);
        return;
      }

      if (mode === 'login') {
        if (!email || !password) {
          setError('Please fill in all fields.');
          setLoading(false);
          return;
        }
        onLogin({ email, isLoggedIn: true });
      } else {
        if (!email || !username || !password) {
          setError('Please fill in all fields.');
          setLoading(false);
          return;
        }
        onLogin({ email, username, isLoggedIn: true });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo size={80} variant="icon" />
          <div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join TELP' : 'Reset Password'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {mode === 'login' ? 'Your safe space is waiting.' : mode === 'signup' ? 'Start your journey to safety.' : 'We\'ll help you get back in.'}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-5"
          >
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 p-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2">
                {success}
              </div>
            )}

            <div className="space-y-4">
              {(mode === 'login' || mode === 'signup' || mode === 'forgot-password') && (
                <div className="relative">
                  <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              )}

              {mode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              )}

              {(mode === 'login' || mode === 'signup') && (
                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}
            </div>

            {mode === 'login' && (
              <button
                type="button"
                onClick={() => setMode('forgot-password')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {mode !== 'forgot-password' ? (
              <p className="text-center text-xs text-gray-500">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="font-bold text-blue-600"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-gray-500"
              >
                <ChevronLeft size={16} />
                Back to Login
              </button>
            )}
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
};
