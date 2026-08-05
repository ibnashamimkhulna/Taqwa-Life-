import React, { useState, useEffect } from 'react';
import { FeatureCard } from '../FeatureCard';
import { FeatureKey, Language, TabType, PrayerTime } from '../../types';
import { Quote, Sparkles, Building2, Compass, BookOpen, Clock, Flame, Trophy, Crown, ChevronRight } from 'lucide-react';
import { DAILY_QUOTES } from '../../data/quotesData';
import { calculatePrayerTimes } from '../../utils/prayerCalculator';

interface HomeTabProps {
  language: Language;
  onOpenFeature: (title: string, desc: string) => void;
  onSwitchTab: (tab: TabType) => void;
  onOpenSubView: (view: 'qaza' | 'hijri' | 'qibla' | 'settings' | 'gamified' | 'premium') => void;
  prayers: PrayerTime[];
  district: string;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  language,
  onOpenFeature,
  onSwitchTab,
  onOpenSubView,
  district
}) => {
  const currentQuote = DAILY_QUOTES[0];

  // Dynamic real-time prayer calculation state
  const [prayerState, setPrayerState] = useState(() => calculatePrayerTimes(district));

  useEffect(() => {
    // Initial calculation
    setPrayerState(calculatePrayerTimes(district));

    // Update real-time clock and active prayer time every second
    const interval = setInterval(() => {
      setPrayerState(calculatePrayerTimes(district));
    }, 1000);

    return () => clearInterval(interval);
  }, [district]);

  const handleCardClick = (feature: FeatureKey) => {
    switch (feature) {
      case 'Prayer Times':
        onSwitchTab('salah');
        break;
      case 'Qaza Salah':
        onOpenSubView('qaza');
        break;
      case 'Hijri Calendar':
        onOpenSubView('hijri');
        break;
      case 'Tahajjud':
        onOpenFeature('তাহাজ্জুদ সালাত', 'তাহাজ্জুদ রাতের শেষ তৃতীয়াংশে পড়া সবচেয়ে উত্তম। সর্বনিম্ন ২ রাকাত এবং সর্বোচ্চ ১২ রাকাত পড়া যায়।');
        break;
      case 'Ishraq':
        onOpenFeature('ইশরাক সালাত', 'সূর্যোদয়ের ১৫-২০ মিনিট পর ২ থেকে ৪ রাকাত ইশরাক সালাত পড়া সুন্নাত। এর সওয়াব এক কবুল হজ্জ ও ওমরার সমান।');
        break;
      case 'Duha':
        onOpenFeature('দুহা (চাশত) সালাত', 'পূর্বাহ্নে রোদের প্রখরতা বাড়লে ২, ৪, ৮ বা ১২ রাকাত দুহা সালাত পড়া যায়। এটি মানবদেহের ৩৬০টি জোড়ের সাদাকাহ স্বরূপ।');
        break;
      case 'Holy Quran':
        onSwitchTab('quran');
        break;
      case 'Daily Adhkar':
        onSwitchTab('dhikr');
        break;
      case 'Qibla Compass':
        onOpenSubView('qibla');
        break;
      case 'Progress':
        onSwitchTab('profile');
        break;
      case 'Goals':
        onSwitchTab('profile');
        break;
      case 'Settings':
        onOpenSubView('settings');
        break;
      default:
        break;
    }
  };

  const { currentWaqt, nextWaqt, currentTimeFormatted, remainingTimeFormatted, hijriDateBn } = prayerState;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Welcome & Quick Info Banner */}
      <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-5 rounded-xl card-shadow relative overflow-hidden border border-forest/20">
        <div className="absolute -right-6 -bottom-6 opacity-10 text-9xl pointer-events-none select-none font-serif">
          🕌
        </div>

        <div className="flex justify-between items-start mb-3 relative z-10">
          <div>
            <div className="flex items-center gap-1.5 text-mint text-[10px] uppercase font-bold bg-white/20 px-2.5 py-1 rounded-full border border-white/10 w-fit">
              <Clock className="w-3 h-3 text-mint animate-pulse" />
              <span>{language === 'BN' ? 'বর্তমান ওয়াক্ত' : 'Current Prayer'}</span>
            </div>
            <h2 className="text-xl font-bold mt-2 font-sans tracking-wide flex items-center gap-2">
              <span>{language === 'BN' ? `${currentWaqt.nameBn} ওয়াক্ত` : `${currentWaqt.nameEn} Time`}</span>
            </h2>
            <p className="text-[11px] text-mint/80 mt-0.5">
              স্থান: {district}
            </p>
          </div>

          <div className="text-right relative z-10">
            <span className="text-xs text-mint font-semibold block">
              {hijriDateBn}
            </span>
            <p className="text-lg font-extrabold text-white tracking-wider mt-0.5 font-mono">
              {currentTimeFormatted}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-mint/90 pt-3 border-t border-white/10 relative z-10">
          <span className="font-medium flex items-center gap-1">
            <span>
              {language === 'BN'
                ? `পরবর্তী: ${nextWaqt.nameBn} (${nextWaqt.time})`
                : `Next: ${nextWaqt.nameEn} (${nextWaqt.time})`}
            </span>
            <span className="text-[10px] bg-softgold/20 text-softgold font-bold px-2 py-0.5 rounded-full ml-1 border border-softgold/30">
              বাকি: {remainingTimeFormatted}
            </span>
          </span>
          <button
            onClick={() => onSwitchTab('salah')}
            className="underline cursor-pointer hover:text-white font-bold text-xs shrink-0 ml-2"
          >
            {language === 'BN' ? 'বিস্তারিত দেখুন' : 'View Details'}
          </button>
        </div>
      </div>

      {/* Gamification Duolingo Banner & Premium Quick Entry */}
      <div className="grid grid-cols-2 gap-3">
        {/* Gamified Deen Card */}
        <div
          onClick={() => onOpenSubView('gamified')}
          className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-3.5 rounded-2xl card-shadow cursor-pointer smooth-press relative overflow-hidden group border border-amber-400/30"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1">
              <Flame className="w-3 h-3 text-yellow-200 fill-yellow-200" />
              ৫ দিনের স্ট্রীক
            </span>
            <Trophy className="w-4 h-4 text-yellow-200" />
          </div>
          <h4 className="text-xs font-black text-white mt-1">
            দ্বীন লার্নিং (Duolingo)
          </h4>
          <p className="text-[10px] text-amber-100 mt-0.5 leading-tight">
            কুইজ খেলে সাওয়াব পয়েন্ট ও র্যাঙ্ক অর্জন করুন
          </p>
          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/20 text-[10px] font-bold text-yellow-100">
            <span>৪৫০ XP</span>
            <span className="flex items-center">শুরু করুন <ChevronRight className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Taqwa Premium Roadmap Card */}
        <div
          onClick={() => onOpenSubView('premium')}
          className="bg-gradient-to-br from-emerald-700 via-teal-800 to-forest-dark text-white p-3.5 rounded-2xl card-shadow cursor-pointer smooth-press relative overflow-hidden group border border-emerald-400/30"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] bg-softgold text-charcoal px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-3 h-3" />
              PRO রোডম্যাপ
            </span>
            <Sparkles className="w-4 h-4 text-softgold" />
          </div>
          <h4 className="text-xs font-black text-white mt-1">
            তাকওয়া প্রিমিয়াম
          </h4>
          <p className="text-[10px] text-mint/90 mt-0.5 leading-tight">
            এআই ফতোয়া ও অফলাইন কুরআনের প্রস্তাবনা
          </p>
          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/20 text-[10px] font-bold text-mint">
            <span>ফিচারসমূহের প্রস্তাবনা</span>
            <span className="flex items-center">দেখুন <ChevronRight className="w-3 h-3" /></span>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
          {language === 'BN' ? 'ফিচারসমূহ' : 'FEATURES'}
        </h3>
        <span className="text-xs text-forest font-bold bg-mint/50 px-2.5 py-0.5 rounded-full border border-forest/10">
          ১২টি কার্ড
        </span>
      </div>

      {/* 12 Cards Grid (3 columns x 4 rows) */}
      <div className="grid grid-cols-3 gap-3.5">
        <FeatureCard
          featureKey="Prayer Times"
          titleBn="সালাতের সময়"
          titleEn="Prayer Times"
          language={language}
          onClick={() => handleCardClick('Prayer Times')}
        />
        <FeatureCard
          featureKey="Qaza Salah"
          titleBn="কাজাহ সালাত"
          titleEn="Qaza Salah"
          language={language}
          onClick={() => handleCardClick('Qaza Salah')}
        />
        <FeatureCard
          featureKey="Hijri Calendar"
          titleBn="হিজরি ক্যালেন্ডার"
          titleEn="Hijri Calendar"
          language={language}
          onClick={() => handleCardClick('Hijri Calendar')}
        />
        <FeatureCard
          featureKey="Tahajjud"
          titleBn="তাহাজ্জুদ"
          titleEn="Tahajjud"
          language={language}
          onClick={() => handleCardClick('Tahajjud')}
        />
        <FeatureCard
          featureKey="Ishraq"
          titleBn="ইশরাক"
          titleEn="Ishraq"
          language={language}
          onClick={() => handleCardClick('Ishraq')}
        />
        <FeatureCard
          featureKey="Duha"
          titleBn="দুহা (চাশত)"
          titleEn="Duha (Chasht)"
          language={language}
          onClick={() => handleCardClick('Duha')}
        />
        <FeatureCard
          featureKey="Holy Quran"
          titleBn="আল-কুরআন"
          titleEn="Holy Quran"
          language={language}
          onClick={() => handleCardClick('Holy Quran')}
        />
        <FeatureCard
          featureKey="Daily Adhkar"
          titleBn="দৈনিক আযকার"
          titleEn="Daily Adhkar"
          language={language}
          onClick={() => handleCardClick('Daily Adhkar')}
        />
        <FeatureCard
          featureKey="Qibla Compass"
          titleBn="কিবলা কম্পাস"
          titleEn="Qibla Compass"
          language={language}
          onClick={() => handleCardClick('Qibla Compass')}
        />
        <FeatureCard
          featureKey="Progress"
          titleBn="অগ্রগতি"
          titleEn="Progress"
          language={language}
          onClick={() => handleCardClick('Progress')}
        />
        <FeatureCard
          featureKey="Goals"
          titleBn="লক্ষ্য (Goals)"
          titleEn="Goals"
          language={language}
          onClick={() => handleCardClick('Goals')}
        />
        <FeatureCard
          featureKey="Settings"
          titleBn="সেটিংস"
          titleEn="Settings"
          language={language}
          onClick={() => handleCardClick('Settings')}
        />
      </div>

      {/* Daily Quote Card */}
      <div className="bg-white border border-gray-100 p-4 rounded-xl card-shadow relative overflow-hidden">
        <div className="flex items-center space-x-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-full bg-mint/50 flex items-center justify-center text-forest border border-forest/10 shrink-0">
            <Quote className="w-4 h-4 text-forest" />
          </div>
          <h4 className="text-xs font-bold text-forest uppercase tracking-wider">
            {language === 'BN' ? 'আজকের সুন্নাহ ও বাণী' : 'Daily Hadith & Wisdom'}
          </h4>
        </div>

        <p className="text-xs text-charcoal/90 italic mb-2 leading-relaxed font-sans">
          {language === 'BN' ? currentQuote.quoteBn : currentQuote.quoteEn}
        </p>

        <div className="flex justify-between items-center text-[10px] text-gray-400 pt-2 border-t border-gray-100">
          <span className="flex items-center gap-1 text-forest font-semibold">
            <Sparkles className="w-3 h-3 text-softgold" />
            সহীহ রেফারেন্স
          </span>
          <span className="font-semibold text-charcoal/70">
            — {language === 'BN' ? currentQuote.sourceBn : currentQuote.sourceEn}
          </span>
        </div>
      </div>
    </div>
  );
};
