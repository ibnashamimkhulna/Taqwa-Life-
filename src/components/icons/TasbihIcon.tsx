import React from 'react';

interface TasbihIconProps {
  className?: string;
}

export const TasbihIcon: React.FC<TasbihIconProps> = ({ className = 'w-5 h-5 text-forest' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Bead string loop */}
      <path d="M12 4C7.5 4 4 7.5 4 11.5C4 15 6.8 17.8 10 18.3" />
      <path d="M12 4C16.5 4 20 7.5 20 11.5C20 15 17.2 17.8 14 18.3" />
      {/* Beads along loop */}
      <circle cx="12" cy="4" r="1.3" fill="currentColor" />
      <circle cx="8.5" cy="5.2" r="1.2" fill="currentColor" />
      <circle cx="15.5" cy="5.2" r="1.2" fill="currentColor" />
      <circle cx="6" cy="7.8" r="1.2" fill="currentColor" />
      <circle cx="18" cy="7.8" r="1.2" fill="currentColor" />
      <circle cx="4.6" cy="11.2" r="1.2" fill="currentColor" />
      <circle cx="19.4" cy="11.2" r="1.2" fill="currentColor" />
      <circle cx="5.8" cy="14.8" r="1.2" fill="currentColor" />
      <circle cx="18.2" cy="14.8" r="1.2" fill="currentColor" />
      {/* Imam / Head bead & Tassel */}
      <circle cx="12" cy="18.5" r="1.6" fill="currentColor" />
      <path d="M12 20.1V23" strokeWidth="2" />
      <path d="M10 23H14" strokeWidth="1.8" />
    </svg>
  );
};
