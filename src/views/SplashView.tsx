import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';

export const SplashView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-blue-600 min-h-screen relative shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <Logo size={120} variant="icon" className="brightness-200 mb-6" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-blue-100 mt-4 text-lg font-medium"
          >
            You are safe here.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
