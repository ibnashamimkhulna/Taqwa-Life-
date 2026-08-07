import React from 'react';
import { 
  Building2, 
  ListCheck, 
  CalendarDays, 
  Moon, 
  Sun, 
  SunMedium, 
  BookOpen, 
  Compass, 
  PieChart, 
  Target, 
  Settings 
} from 'lucide-react';
import { TasbihIcon } from './icons/TasbihIcon';
import { FeatureKey, Language } from '../types';

interface FeatureCardProps {
  featureKey: FeatureKey;
  titleBn: string;
  titleEn: string;
  language: Language;
  onClick: () => void;
}

export const FEATURE_ICONS: Record<FeatureKey, React.ReactNode> = {
  'Prayer Times': <Building2 className="w-5 h-5 text-emerald-200" />,
  'Qaza Salah': <ListCheck className="w-5 h-5 text-amber-200" />,
  'Hijri Calendar': <CalendarDays className="w-5 h-5 text-indigo-200" />,
  'Tahajjud': <Moon className="w-5 h-5 text-cyan-200" />,
  'Ishraq': <Sun className="w-5 h-5 text-yellow-200" />,
  'Duha': <SunMedium className="w-5 h-5 text-orange-200" />,
  'Holy Quran': <BookOpen className="w-5 h-5 text-emerald-200" />,
  'Daily Adhkar': <TasbihIcon className="w-5 h-5 text-teal-200" />,
  'Qibla Compass': <Compass className="w-5 h-5 text-amber-300" />,
  'Progress': <PieChart className="w-5 h-5 text-purple-200" />,
  'Goals': <Target className="w-5 h-5 text-rose-200" />,
  'Settings': <Settings className="w-5 h-5 text-slate-200" />
};

const FEATURE_STYLES: Record<FeatureKey, { bg: string; border: string; iconBg: string }> = {
  'Prayer Times': {
    bg: 'bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white',
    border: 'border-emerald-500/40',
    iconBg: 'bg-emerald-700/60'
  },
  'Qaza Salah': {
    bg: 'bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 text-white',
    border: 'border-amber-400/40',
    iconBg: 'bg-amber-600/60'
  },
  'Hijri Calendar': {
    bg: 'bg-gradient-to-br from-indigo-800 via-indigo-900 to-slate-950 text-white',
    border: 'border-indigo-400/40',
    iconBg: 'bg-indigo-700/60'
  },
  'Tahajjud': {
    bg: 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white',
    border: 'border-blue-400/40',
    iconBg: 'bg-blue-900/60'
  },
  'Ishraq': {
    bg: 'bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-900 text-white',
    border: 'border-yellow-300/40',
    iconBg: 'bg-amber-500/60'
  },
  'Duha': {
    bg: 'bg-gradient-to-br from-orange-600 via-amber-700 to-orange-950 text-white',
    border: 'border-orange-400/40',
    iconBg: 'bg-orange-500/60'
  },
  'Holy Quran': {
    bg: 'bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white',
    border: 'border-emerald-400/50',
    iconBg: 'bg-emerald-800/80'
  },
  'Daily Adhkar': {
    bg: 'bg-gradient-to-br from-teal-800 via-teal-900 to-emerald-950 text-white',
    border: 'border-teal-400/40',
    iconBg: 'bg-teal-700/60'
  },
  'Qibla Compass': {
    bg: 'bg-gradient-to-br from-forest-dark via-emerald-950 to-slate-950 text-white',
    border: 'border-amber-400/50',
    iconBg: 'bg-amber-500/30'
  },
  'Progress': {
    bg: 'bg-gradient-to-br from-purple-800 via-purple-900 to-slate-950 text-white',
    border: 'border-purple-400/40',
    iconBg: 'bg-purple-700/60'
  },
  'Goals': {
    bg: 'bg-gradient-to-br from-rose-800 via-rose-900 to-slate-950 text-white',
    border: 'border-rose-400/40',
    iconBg: 'bg-rose-700/60'
  },
  'Settings': {
    bg: 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white',
    border: 'border-slate-500/40',
    iconBg: 'bg-slate-700/60'
  }
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  featureKey,
  titleBn,
  titleEn,
  language,
  onClick
}) => {
  const style = FEATURE_STYLES[featureKey] || FEATURE_STYLES['Prayer Times'];

  return (
    <div
      onClick={onClick}
      className={`${style.bg} border ${style.border} p-3.5 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl cursor-pointer h-28 transition-all duration-200 group active:scale-95 relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-full pointer-events-none" />
      <div className={`w-11 h-11 ${style.iconBg} backdrop-blur-md rounded-2xl flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform border border-white/20`}>
        {FEATURE_ICONS[featureKey]}
      </div>
      <span className="text-xs font-black leading-tight tracking-wide drop-shadow-md">
        {language === 'BN' ? titleBn : titleEn}
      </span>
    </div>
  );
};
