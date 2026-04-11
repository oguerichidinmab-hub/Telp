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
        width={variant === 'full' ? size * 2.5 : size}
        height={size}
        viewBox="0 0 250 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="250" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Overlapping Letters T, E, L, P */}
        <g filter="url(#shadow)">
          {/* T */}
          <text
            x="10"
            y="75"
            fill="url(#logo-gradient)"
            style={{ font: 'bold 85px sans-serif', letterSpacing: '-5px' }}
          >
            T
          </text>
          {/* E */}
          <text
            x="55"
            y="75"
            fill="url(#logo-gradient)"
            style={{ font: 'bold 85px sans-serif', letterSpacing: '-5px' }}
          >
            E
          </text>
          {/* L */}
          <text
            x="105"
            y="75"
            fill="url(#logo-gradient)"
            style={{ font: 'bold 85px sans-serif', letterSpacing: '-5px' }}
          >
            L
          </text>
          {/* P */}
          <text
            x="145"
            y="75"
            fill="url(#logo-gradient)"
            style={{ font: 'bold 85px sans-serif', letterSpacing: '-5px' }}
          >
            P
          </text>
        </g>
      </svg>
    </div>
  );
};
