import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ size = 40, className = "", variant = 'full' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Modern Organic Shape (Speech Bubble / Heart Hybrid) */}
        <path
          d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 61.0457 14.4772 71.0457 21.7157 78.2843L15 90L30 86.5C36.0457 88.7157 42.8284 90 50 90Z"
          fill="url(#logo-gradient)"
        />
        
        {/* Inner Heart Symbol */}
        <path
          d="M50 68C50 68 32 56 32 41C32 34 37 29 43 29C46.5 29 49 31 50 32.5C51 31 53.5 29 57 29C63 29 68 34 68 41C68 56 50 68 50 68Z"
          fill="white"
        />

        <defs>
          <linearGradient id="logo-gradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      
      {variant === 'full' && (
        <span className="font-black text-2xl italic tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TELP
        </span>
      )}
    </div>
  );
};
