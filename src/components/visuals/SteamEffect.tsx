import React from 'react';

interface SteamProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SteamEffect: React.FC<SteamProps> = ({ className = '', size = 'md' }) => {
  const height = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-20' : 'h-14';

  return (
    <div className={`relative flex items-center justify-center pointer-events-none ${height} ${className}`}>
      {/* Three delicate steam vapor lines */}
      <svg
        viewBox="0 0 60 80"
        className="w-12 h-full overflow-visible text-[#B96F4A]/35"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <path
          d="M 20 70 Q 15 50, 24 35 T 20 5"
          className="animate-steam-1"
          strokeDasharray="4 2"
        />
        <path
          d="M 30 75 Q 36 55, 27 40 T 32 10"
          className="animate-steam-2"
        />
        <path
          d="M 40 70 Q 45 48, 36 32 T 42 8"
          className="animate-steam-3"
          strokeDasharray="5 3"
        />
      </svg>
    </div>
  );
};
