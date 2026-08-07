import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onToggleLang: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onOpenMenu,
  onOpenSearch,
  onToggleLang,
  onOpenNotifications
}) => {
  return (
    <header className="flex items-center justify-between px-5 py-3.5 bg-white/40 backdrop-blur-xl border-b border-white/50 z-20 sticky top-0 shadow-xs">
      <button
        onClick={onOpenMenu}
        aria-label="Open Menu"
        className="text-charcoal w-10 h-10 flex items-center justify-center rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-md smooth-press cursor-pointer border border-white/60 shadow-xs"
      >
        <Menu className="w-5 h-5 text-forest" />
      </button>

      <div className="text-center">
        <h1 className="text-lg font-extrabold tracking-widest text-forest leading-tight font-sans drop-shadow-2xs">
          TAQWA LIFE
        </h1>
        <p className="text-[10px] text-emerald-900/80 font-bold tracking-widest uppercase">
          {language === 'BN' ? 'তাকওয়া লাইফ' : 'PREMIUM ISLAMIC APP'}
        </p>
      </div>

      <div className="flex items-center space-x-1.5 sm:space-x-2">
        <button
          onClick={onOpenSearch}
          aria-label="Search"
          className="text-charcoal w-9 h-9 flex items-center justify-center rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-md smooth-press cursor-pointer border border-white/60 shadow-xs"
        >
          <Search className="w-4 h-4 text-forest" />
        </button>

        <button
          onClick={onToggleLang}
          title="Toggle Language"
          className="text-forest bg-forest/15 hover:bg-forest/25 backdrop-blur-md px-3 py-1 rounded-full smooth-press text-xs font-black border border-white/60 cursor-pointer min-w-[38px] text-center shadow-xs"
        >
          {language}
        </button>

        <button
          onClick={onOpenNotifications}
          aria-label="Notifications"
          className="text-charcoal w-9 h-9 flex items-center justify-center rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-md smooth-press cursor-pointer border border-white/60 shadow-xs relative"
        >
          <Bell className="w-4 h-4 text-forest" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};
