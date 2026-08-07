import React from 'react';
import { Home, Compass, BookOpen, User } from 'lucide-react';
import { TasbihIcon } from './icons/TasbihIcon';
import { TabType, Language } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  language: Language;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, language, onTabChange }) => {
  const navItems: { id: TabType; labelBn: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      labelBn: 'হোম',
      labelEn: 'Home',
      icon: <Home className="w-5 h-5 mb-0.5" />
    },
    {
      id: 'salah',
      labelBn: 'সালাত',
      labelEn: 'Salah',
      icon: <Compass className="w-5 h-5 mb-0.5" />
    },
    {
      id: 'dhikr',
      labelBn: 'তাসবিহ/আযকার',
      labelEn: 'Tasbih',
      icon: <TasbihIcon className="w-5 h-5 mb-0.5" />
    },
    {
      id: 'quran',
      labelBn: 'কুরআন',
      labelEn: 'Quran',
      icon: <BookOpen className="w-5 h-5 mb-0.5" />
    },
    {
      id: 'profile',
      labelBn: 'প্রোফাইল',
      labelEn: 'Profile',
      icon: <User className="w-5 h-5 mb-0.5" />
    }
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/50 backdrop-blur-xl border-t border-white/60 flex justify-around items-center h-16 px-2 z-30 shadow-lg shadow-emerald-950/10">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center w-1/5 py-1 transition-all duration-200 cursor-pointer ${
              isActive ? 'text-forest' : 'text-emerald-950/60 hover:text-emerald-950'
            }`}
          >
            <div
              className={`p-1.5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-forest/20 text-forest shadow-xs border border-forest/30 scale-105 backdrop-blur-md'
                  : 'hover:bg-white/40'
              }`}
            >
              {item.icon}
            </div>
            <span
              className={`text-[10px] leading-none mt-1 ${
                isActive ? 'font-black text-forest' : 'font-semibold'
              }`}
            >
              {language === 'BN' ? item.labelBn : item.labelEn}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
