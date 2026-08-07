import React from 'react';
import { FeatureKey, Language } from '../types';

interface FeatureCardProps {
  featureKey: FeatureKey;
  titleBn: string;
  titleEn: string;
  language: Language;
  onClick: () => void;
}

// Custom 3D Glassmorphic Islamic SVG Icons with bright vibrant colors
export const CustomFeatureIcons: Record<FeatureKey, React.ReactNode> = {
  'Prayer Times': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Mosque Dome & Minaret */}
      <path d="M18 5C13.5 9.5 13.5 14 18 18C22.5 14 22.5 9.5 18 5Z" fill="#059669" />
      <path d="M18 3V5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="2.5" r="1" fill="#F59E0B" />
      <rect x="10" y="18" width="16" height="12" rx="2" fill="#047857" />
      <path d="M15 30V22C15 20.3 16.3 19 18 19C19.7 19 21 20.3 21 22V30" fill="#F59E0B" />
      {/* Side Minarets */}
      <rect x="6" y="12" width="3.5" height="18" rx="1" fill="#065F46" />
      <path d="M6 12L7.75 8L9.5 12H6Z" fill="#F59E0B" />
      <rect x="26.5" y="12" width="3.5" height="18" rx="1" fill="#065F46" />
      <path d="M26.5 12L28.25 8L30 12H26.5Z" fill="#F59E0B" />
    </svg>
  ),
  'Qaza Salah': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Golden Alarm Clock */}
      <circle cx="18" cy="19" r="11" fill="#FBF3D5" stroke="#D97706" strokeWidth="2" />
      <circle cx="18" cy="19" r="8.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1" />
      <path d="M18 13V19L22 21" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bells */}
      <path d="M8 10C6.5 8.5 7.5 6 10 7L12 9" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 10C29.5 8.5 28.5 6 26 7L24 9" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      {/* Checkmark overlay */}
      <circle cx="26" cy="26" r="5" fill="#10B981" />
      <path d="M23.5 26L25 27.5L28.5 24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Hijri Calendar': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* 3D Calendar Pad */}
      <rect x="6" y="10" width="24" height="20" rx="3" fill="#FFFFFF" stroke="#059669" strokeWidth="1.5" />
      <rect x="6" y="8" width="24" height="7" rx="2" fill="#10B981" />
      {/* Spiral Binder Rings */}
      <rect x="11" y="5" width="2" height="5" rx="1" fill="#F59E0B" />
      <rect x="17" y="5" width="2" height="5" rx="1" fill="#F59E0B" />
      <rect x="23" y="5" width="2" height="5" rx="1" fill="#F59E0B" />
      {/* Calendar Grid & Crescent */}
      <path d="M11 20H15M21 20H25M11 25H15" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 21C20.5 21 19 22.5 19 24.5C19 26.5 20.5 28 22.5 28C23.5 28 24.5 27.5 25 26.5C23.8 26.5 23 25.5 23 24.2C23 22.9 24 21.8 25 21.5C24.2 21.1 23.1 21 22 21Z" fill="#F59E0B" />
    </svg>
  ),
  'Tahajjud': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Night Sky & Crescent Moon */}
      <path d="M22 7C16.5 7 12 11.5 12 17C12 22.5 16.5 27 22 27C24.5 27 26.8 26 28.5 24.4C25.5 24.2 23 21.8 23 18.8C23 15.8 25.5 13.3 28.5 13.1C27 9.4 24.7 7 22 7Z" fill="#1E1B4B" />
      <path d="M22 7C16.5 7 12 11.5 12 17C12 22.5 16.5 27 22 27C24.5 27 26.8 26 28.5 24.4C25.5 24.2 23 21.8 23 18.8C23 15.8 25.5 13.3 28.5 13.1C27 9.4 24.7 7 22 7Z" fill="url(#tahajjud_moon)" />
      {/* Praying Silhouette & Mosque Dome in Distance */}
      <path d="M6 28C6 24 9 23 11 23C13 23 16 24 16 28H6Z" fill="#047857" />
      <circle cx="11" cy="20" r="2.5" fill="#34D399" />
      {/* Sparkling Stars */}
      <path d="M27 6L28 8L30 9L28 10L27 12L26 10L24 9L26 8L27 6Z" fill="#F59E0B" />
      <circle cx="9" cy="10" r="1" fill="#FBBF24" />
      <defs>
        <linearGradient id="tahajjud_moon" x1="12" y1="7" x2="28" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  ),
  'Ishraq': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Morning Sunrise over Horizon */}
      <path d="M5 26H31" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="26" r="8" fill="#F59E0B" />
      {/* Golden Sun Rays */}
      <path d="M18 11V14M9 17L11.5 19M27 17L24.5 19M7 26H9.5M26.5 26H29" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  'Duha': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Midday Bright Sun */}
      <circle cx="18" cy="18" r="7.5" fill="#F59E0B" stroke="#FDE047" strokeWidth="1.5" />
      <path d="M18 4V7M18 29V32M4 18H7M29 18H32M8 8L10.5 10.5M25.5 25.5L28 28M8 28L10.5 25.5M25.5 10.5L28 8" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  'Holy Quran': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Wooden Rehal Stand */}
      <path d="M8 28L28 12M8 12L28 28" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      {/* Open Quran Book */}
      <path d="M7 16C11 14 15 15 18 17C21 15 25 14 29 16V9C25 7 21 8 18 10C15 8 11 7 7 9V16Z" fill="#047857" stroke="#F59E0B" strokeWidth="1.2" />
      {/* Quran Pages Detail */}
      <path d="M18 10V17" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M10 12C12 11.5 14 12 16 13M20 13C22 12 24 11.5 26 12" stroke="#A7F3D0" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  'Daily Adhkar': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* 3D Tasbih Prayer Beads Loop */}
      <circle cx="18" cy="14" r="9" stroke="#059669" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="18" cy="5" r="2.2" fill="#F59E0B" />
      <circle cx="24" cy="7" r="2" fill="#10B981" />
      <circle cx="27" cy="13" r="2" fill="#10B981" />
      <circle cx="24" cy="19" r="2" fill="#10B981" />
      <circle cx="18" cy="22" r="2.2" fill="#F59E0B" />
      <circle cx="12" cy="19" r="2" fill="#10B981" />
      <circle cx="9" cy="13" r="2" fill="#10B981" />
      <circle cx="12" cy="7" r="2" fill="#10B981" />
      {/* Tassel */}
      <path d="M18 24V29M16 29H20" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'Qibla Compass': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Brass Outer Rim */}
      <circle cx="18" cy="18" r="13" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
      <circle cx="18" cy="18" r="10.5" fill="#047857" stroke="#059669" strokeWidth="1" />
      {/* Cardinal Points */}
      <circle cx="18" cy="10" r="1" fill="#F59E0B" />
      {/* Needle pointing to Kaaba */}
      <path d="M18 10L21 18L18 16L15 18L18 10Z" fill="#EF4444" />
      <path d="M18 26L21 18L18 20L15 18L18 26Z" fill="#CBD5E1" />
      <circle cx="18" cy="18" r="2" fill="#F59E0B" />
    </svg>
  ),
  'Progress': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Donut Chart Ring */}
      <circle cx="18" cy="18" r="11" stroke="#E2E8F0" strokeWidth="3.5" />
      <path d="M18 7C24.0751 7 29 11.9249 29 18C29 24.0751 24.0751 29 18 29" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M18 7C14 7 10.5 9.1 8.5 12.3" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
      {/* Center Check */}
      <path d="M15 18L17.5 20.5L22 15" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Goals': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Target Board */}
      <circle cx="18" cy="18" r="12" fill="#F0FDF4" stroke="#059669" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="8" stroke="#F59E0B" strokeWidth="2" fill="#FFFBEB" />
      <circle cx="18" cy="18" r="4" fill="#EF4444" />
      {/* Arrow hitting bullseye */}
      <path d="M26 10L19 17M26 10H22M26 10V14" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Settings': (
    <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 drop-shadow-sm">
      {/* Gear Cog */}
      <path d="M18 12C14.7 12 12 14.7 12 18C12 21.3 14.7 24 18 24C21.3 24 24 21.3 24 18C24 14.7 21.3 12 18 12Z" fill="#F8FAFC" stroke="#059669" strokeWidth="2" />
      <path d="M18 6V9M18 27V30M6 18H9M27 18H30M9.5 9.5L11.6 11.6M24.4 24.4L26.5 26.5M9.5 26.5L11.6 24.4M24.4 11.6L26.5 9.5" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="18" r="2.5" fill="#F59E0B" />
    </svg>
  )
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  featureKey,
  titleBn,
  titleEn,
  language,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white/50 hover:bg-white/75 backdrop-blur-xl border border-white/80 hover:border-emerald-500/50 p-3 sm:p-3.5 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg shadow-emerald-950/5 cursor-pointer h-28 sm:h-32 transition-all duration-300 group active:scale-95 relative overflow-hidden"
    >
      {/* Specular Light Reflection */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent pointer-events-none rounded-t-3xl" />
      
      {/* Soft Frosted Glass Badge for Icon */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-forest/15 backdrop-blur-md border border-forest/25 shadow-xs flex items-center justify-center mb-1.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-forest/25 group-hover:shadow-md group-hover:border-emerald-400/60 relative z-10">
        {CustomFeatureIcons[featureKey]}
      </div>

      {/* Feature Title - Clean Dark Legible Bengali / English Text */}
      <span className="text-[11px] sm:text-xs font-black text-charcoal group-hover:text-forest tracking-tight text-center leading-tight transition-colors relative z-10">
        {language === 'BN' ? titleBn : titleEn}
      </span>
    </div>
  );
};


