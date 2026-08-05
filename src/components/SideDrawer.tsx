import React from 'react';
import { 
  X, 
  User, 
  Compass, 
  BookOpen, 
  Sparkles, 
  ListCheck, 
  Calendar, 
  Settings, 
  Share2, 
  Info, 
  Heart,
  Globe,
  Trophy,
  Crown
} from 'lucide-react';
import { TasbihIcon } from './icons/TasbihIcon';
import { Language, TabType } from '../types';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onToggleLang: () => void;
  onSelectTab: (tab: TabType) => void;
  onOpenFeature: (title: string, desc: string) => void;
  onOpenSubView?: (view: 'qaza' | 'hijri' | 'qibla' | 'settings' | 'gamified' | 'premium') => void;
  district: string;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  language,
  onToggleLang,
  onSelectTab,
  onOpenFeature,
  onOpenSubView,
  district
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto transform transition-transform animate-slide-right border-r border-gray-100">
        
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-br from-forest to-forest-dark text-white relative">
          <button
            onClick={onClose}
            aria-label="Close Drawer"
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-mint font-bold text-xl mb-3 border border-white/20">
            <User className="w-6 h-6 text-mint" />
          </div>

          <h2 className="text-lg font-bold">TAQWA LIFE</h2>
          <p className="text-xs text-mint/80">স্থান: {district}</p>
          <span className="inline-block text-[10px] bg-softgold text-charcoal px-2 py-0.5 rounded-full font-bold mt-2">
            প্রিমিয়াম ভার্সন 2.5
          </span>
        </div>

        {/* Drawer Menu List */}
        <div className="p-4 flex-1 space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            {language === 'BN' ? 'প্রধান মেনু' : 'MAIN MENU'}
          </p>

          <button
            onClick={() => {
              onSelectTab('home');
              onClose();
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <Compass className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'হোম ড্যাশবোর্ড' : 'Home Dashboard'}</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('salah');
              onClose();
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <Compass className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'সালাতের সময়সূচী' : 'Prayer Times'}</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('quran');
              onClose();
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'পবিত্র আল-কুরআন' : 'Holy Quran'}</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('dhikr');
              onClose();
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <TasbihIcon className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'দৈনিক আযকার ও ডিজিটাল তাসবীহ' : 'Daily Adhkar & Tasbeeh'}</span>
          </button>

          <div className="my-3 border-t border-gray-100" />

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            {language === 'BN' ? 'গেমিফিকেশন ও প্রিমিয়াম' : 'GAMIFICATION & PREMIUM'}
          </p>

          <button
            onClick={() => {
              onClose();
              if (onOpenSubView) onOpenSubView('gamified');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 text-charcoal font-bold text-xs smooth-press text-left cursor-pointer shadow-xs"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>{language === 'BN' ? 'দ্বীন লার্নিং (Duolingo Style)' : 'Deen Learning (Gamified)'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onOpenSubView) onOpenSubView('premium');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 text-charcoal font-bold text-xs smooth-press text-left cursor-pointer shadow-xs"
          >
            <Crown className="w-4 h-4 text-softgold" />
            <span>{language === 'BN' ? 'তাকওয়া প্রিমিয়াম ফিচারসমূহ' : 'Taqwa Premium Features'}</span>
          </button>

          <div className="my-3 border-t border-gray-100" />

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            {language === 'BN' ? 'ইসলামিক ফিচারস' : 'ISLAMIC FEATURES'}
          </p>

          <button
            onClick={() => {
              onClose();
              onOpenFeature('কাজাহ সালাত হিসাব', 'আপনার পূর্বের কাজাহ হওয়া সালাতের হিসাব রাখুন এবং প্রতিওয়াক্তে রিকভার করুন।');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <ListCheck className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'কাজাহ সালাত ট্র্যাকার' : 'Qaza Tracker'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenFeature('হিজরি ক্যালেন্ডার', 'হিজরি ও ইংরেজি ক্যালেন্ডারের তারিখ এবং বিশেষ ইসলামিক দিবসসমূহ দেখুন।');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'হিজরি ক্যালেন্ডার' : 'Hijri Calendar'}</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('profile');
              onClose();
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <User className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'আমল অগ্রগতি ও প্রোফাইল' : 'Spiritual Progress'}</span>
          </button>

          <div className="my-3 border-t border-gray-100" />

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
            {language === 'BN' ? 'সেটিংস ও অ্যাপস' : 'SETTINGS & OPTIONS'}
          </p>

          <button
            onClick={() => {
              onToggleLang();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <Globe className="w-4 h-4 text-forest" />
              <span>{language === 'BN' ? 'ভাষা (Language)' : 'Language'}</span>
            </div>
            <span className="text-[11px] font-bold text-forest bg-mint px-2 py-0.5 rounded-full">
              {language === 'BN' ? 'বাংলা (BN)' : 'English (EN)'}
            </span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenFeature('অ্যাপ সেটিংস', 'সালাতের সময়সূচীর মাযহাব, ক্যালকুলেশন মেথড ও নোটিফিকেশন কাস্টমাইজ করুন।');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <Settings className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'সেটিংস' : 'Settings'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenFeature('শেয়ার অ্যাপ', 'তাকওয়া লাইফ অ্যাপটি আপনার পরিবার ও বন্ধুদের সাথে শেয়ার করে সদকাহ জারিয়াহর সওয়াব হাসিল করুন।');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'অ্যাপ শেয়ার করুন' : 'Share App'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenFeature('তাকওয়া লাইফ সম্পর্কে', 'তাকওয়া লাইফ একটি সম্পূর্ণ বিজ্ঞাপনমুক্ত বিশুদ্ধ ইসলামিক লাইফস্টাইল অ্যাপ।');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-mint/40 text-charcoal font-medium text-xs smooth-press text-left cursor-pointer"
          >
            <Info className="w-4 h-4 text-forest" />
            <span>{language === 'BN' ? 'অ্যাপ সম্পর্কে' : 'About App'}</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-softbg border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1 font-medium">
            <span>কুরআন ও সুন্নাহর আলোকে নির্মিত</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">© TAQWA LIFE - All Rights Reserved</p>
        </div>

      </div>
    </div>
  );
};
