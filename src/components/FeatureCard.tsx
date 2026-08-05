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
  'Prayer Times': <Building2 className="w-5 h-5 text-forest" />,
  'Qaza Salah': <ListCheck className="w-5 h-5 text-forest" />,
  'Hijri Calendar': <CalendarDays className="w-5 h-5 text-forest" />,
  'Tahajjud': <Moon className="w-5 h-5 text-forest" />,
  'Ishraq': <Sun className="w-5 h-5 text-forest" />,
  'Duha': <SunMedium className="w-5 h-5 text-forest" />,
  'Holy Quran': <BookOpen className="w-5 h-5 text-forest" />,
  'Daily Adhkar': <TasbihIcon className="w-5 h-5 text-forest" />,
  'Qibla Compass': <Compass className="w-5 h-5 text-forest" />,
  'Progress': <PieChart className="w-5 h-5 text-forest" />,
  'Goals': <Target className="w-5 h-5 text-forest" />,
  'Settings': <Settings className="w-5 h-5 text-forest" />
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
      className="bg-mint hover:bg-[#b8e8cf] p-3.5 rounded-xl flex flex-col items-center justify-center text-center card-shadow smooth-press cursor-pointer h-28 border border-forest/10 hover:border-forest/20 transition-all duration-200"
    >
      <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-forest mb-2 shadow-xs group-hover:scale-105 transition-transform">
        {FEATURE_ICONS[featureKey]}
      </div>
      <span className="text-xs font-bold text-charcoal leading-tight">
        {language === 'BN' ? titleBn : titleEn}
      </span>
    </div>
  );
};
