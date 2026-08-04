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
    <header className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-100 z-10 sticky top-0 shadow-xs">
      <button
        onClick={onOpenMenu}
        aria-label="Open Menu"
        className="text-charcoal w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 smooth-press cursor-pointer border border-transparent hover:border-gray-100"
      >
        <Menu className="w-5 h-5 text-charcoal" />
      </button>

      <div className="text-center">
        <h1 className="text-lg font-bold tracking-wider text-forest leading-tight font-sans">
          TAQWA LIFE
        </h1>
        <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
          {language === 'BN' ? 'তাকওয়া লাইফ' : 'PREMIUM ISLAMIC APP'}
        </p>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={onOpenSearch}
          aria-label="Search"
          className="text-charcoal w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 smooth-press cursor-pointer"
        >
          <Search className="w-4 h-4 text-charcoal" />
        </button>

        <button
          onClick={onToggleLang}
          title="Toggle Language"
          className="text-forest bg-mint/50 px-2.5 py-1 rounded-full hover:bg-mint smooth-press text-xs font-bold border border-forest/10 cursor-pointer min-w-[36px] text-center"
        >
          {language}
        </button>

        <button
          onClick={onOpenNotifications}
          aria-label="Notifications"
          className="text-charcoal w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 smooth-press cursor-pointer relative"
        >
          <Bell className="w-4 h-4 text-charcoal" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-softgold rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};
