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
  onOpenLocationModal?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  language,
  onOpenFeature,
  onSwitchTab,
  onOpenSubView,
  district,
  onOpenLocationModal
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

  const {
    currentWaqt,
    nextWaqt,
    currentTimeFormatted,
    remainingTimeFormatted,
    hijriDateBn,
    bengaliDateBn,
    gregorianDateBn,
    sunriseTimeFormatted,
    sunsetTimeFormatted,
    waqtRangeFormatted
  } = prayerState;

  // Handle auto GPS location click
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      setIsDetectingGps(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsDetectingGps(false);
          // Auto detected position message
          alert(`GPS অবস্থান পাওয়া গেছে! latitude: ${pos.coords.latitude.toFixed(2)}, longitude: ${pos.coords.longitude.toFixed(2)}. ঢাকা সালাতের সময় ব্যবহৃত হচ্ছে।`);
        },
        () => {
          setIsDetectingGps(false);
          alert('GPS লোকেশন পাওয়া যায়নি। ম্যানুয়াল জেলা পরিবর্তন করুন।');
        }
      );
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Muslim Bangla App Style Top Main Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-forest to-emerald-950 text-white p-4 sm:p-5 rounded-3xl shadow-xl shadow-emerald-950/20 relative overflow-hidden border border-amber-300/30">
        {/* Subtle Arch Ornament Background */}
        <div className="absolute -right-8 -bottom-8 opacity-15 text-9xl pointer-events-none select-none font-serif">
          🕌
        </div>

        {/* Top Header Row: District GPS Selector & Hijri Date */}
        <div className="flex justify-between items-center mb-3 text-xs relative z-10 border-b border-white/15 pb-2.5">
          <div className="flex items-center gap-1.5 font-bold">
            <button
              onClick={onOpenLocationModal}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-amber-200 flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              title="অবস্থান ও জেলা পরিবর্তন করুন"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{district}</span>
              <span className="ml-1 text-xs text-white hover:text-amber-300 transition-transform">🔄</span>
            </button>
          </div>

          <div className="text-right font-bold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/30 text-[11px]">
            {hijriDateBn}
          </div>
        </div>

        {/* Middle Banner Content: Active Waqt & Sunrise/Sunset */}
        <div className="flex justify-between items-end my-3 relative z-10">
          <div>
            <div className="text-[10px] text-emerald-200 uppercase tracking-widest font-black flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>বর্তমান ওয়াক্ত</span>
            </div>
            <h2 className="text-2xl font-black mt-0.5 text-amber-300 font-sans tracking-wide drop-shadow-md">
              {currentWaqt.nameBn}
            </h2>
            <p className="text-xs text-white/90 font-bold mt-0.5 bg-white/10 px-2.5 py-0.5 rounded-lg w-fit border border-white/20">
              {waqtRangeFormatted}
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="text-[11px] font-bold text-emerald-100 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-xl border border-white/10">
              <span>সূর্যোদয় {sunriseTimeFormatted}</span>
              <span className="mx-1 text-amber-300">|</span>
              <span>সূর্যাস্ত {sunsetTimeFormatted}</span>
            </div>
            <div className="text-[10px] bg-amber-400/30 text-amber-200 font-extrabold px-3 py-1 rounded-full border border-amber-300/40 text-center">
              পরবর্তী: {nextWaqt.nameBn} ({remainingTimeFormatted} বাকি)
            </div>
          </div>
        </div>

        {/* Bottom Banner Row: Gregorian and Bengali San Dates */}
        <div className="pt-2.5 border-t border-white/15 flex justify-between items-center text-[11px] font-semibold text-emerald-100/90 relative z-10">
          <span className="text-white font-bold">{gregorianDateBn}</span>
          <span className="text-amber-200/90 font-bold">{bengaliDateBn}</span>
        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="bg-gradient-to-r from-emerald-900 to-forest p-2 rounded-2xl border border-amber-300/30 shadow-md flex justify-around items-center text-white text-[11px] font-bold">
        <button
          onClick={() => onSwitchTab('quran')}
          className="flex flex-col items-center gap-1 p-2 hover:bg-white/15 rounded-xl transition-all cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-amber-300" />
          <span>📖 কুরআন</span>
        </button>

        <button
          onClick={() => onSwitchTab('salah')}
          className="flex flex-col items-center gap-1 p-2 hover:bg-white/15 rounded-xl transition-all cursor-pointer"
        >
          <Clock className="w-5 h-5 text-amber-300" />
          <span>⏰ সালাত</span>
        </button>

        <button
          onClick={() => onSwitchTab('quran')}
          className="flex flex-col items-center gap-1 p-2 hover:bg-white/15 rounded-xl transition-all cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>📖 হাফেজী</span>
        </button>

        <button
          onClick={() => onSwitchTab('dhikr')}
          className="flex flex-col items-center gap-1 p-2 hover:bg-white/15 rounded-xl transition-all cursor-pointer"
        >
          <Quote className="w-5 h-5 text-amber-300" />
          <span>🤲 দোআ</span>
        </button>

        <button
          onClick={() => onOpenSubView('qibla')}
          className="flex flex-col items-center gap-1 p-2 hover:bg-white/15 rounded-xl transition-all cursor-pointer"
        >
          <Compass className="w-5 h-5 text-amber-300" />
          <span>🧭 কিবলা</span>
        </button>
      </div>

      {/* Gamification Duolingo Banner & Premium Quick Entry */}
      <div className="grid grid-cols-2 gap-3">
        {/* Gamified Deen Card */}
        <div
          onClick={() => onOpenSubView('gamified')}
          className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-4 rounded-3xl shadow-md hover:shadow-lg cursor-pointer smooth-press relative overflow-hidden group border border-white/50"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] bg-white/30 backdrop-blur-md px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider text-amber-50 flex items-center gap-1 border border-white/30">
              <Flame className="w-3 h-3 text-yellow-200 fill-yellow-200" />
              ৫ দিনের স্ট্রীক
            </span>
            <Trophy className="w-4 h-4 text-yellow-200" />
          </div>
          <h4 className="text-xs font-black text-white mt-2 drop-shadow-2xs">
            দ্বীন লার্নিং (Duolingo)
          </h4>
          <p className="text-[10px] text-amber-100 font-medium mt-0.5 leading-tight">
            কুইজ খেলে সাওয়াব পয়েন্ট ও র্যাঙ্ক অর্জন করুন
          </p>
          <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-white/20 text-[10px] font-bold text-yellow-100">
            <span>৪৫০ XP</span>
            <span className="flex items-center gap-0.5">শুরু করুন <ChevronRight className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Taqwa Premium Roadmap Card */}
        <div
          onClick={() => onOpenSubView('premium')}
          className="bg-gradient-to-br from-emerald-800 to-forest-dark text-white p-4 rounded-3xl shadow-md hover:shadow-lg cursor-pointer smooth-press relative overflow-hidden group border border-white/50"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] bg-amber-400 text-charcoal px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <Crown className="w-3 h-3" />
              PRO রোডম্যাপ
            </span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <h4 className="text-xs font-black text-white mt-2 drop-shadow-2xs">
            তাকওয়া প্রিমিয়াম
          </h4>
          <p className="text-[10px] text-emerald-100 font-medium mt-0.5 leading-tight">
            এআই ফতোয়া ও অফলাইন কুরআনের প্রস্তাবনা
          </p>
          <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-white/20 text-[10px] font-bold text-emerald-100">
            <span>ফিচারসমূহের প্রস্তাবনা</span>
            <span className="flex items-center gap-0.5">দেখুন <ChevronRight className="w-3 h-3" /></span>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-950/80">
          {language === 'BN' ? 'ফিচারসমূহ' : 'FEATURES'}
        </h3>
        <span className="text-[11px] text-emerald-900 font-extrabold bg-white/40 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/60 shadow-2xs">
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
      <div className="bg-white/45 backdrop-blur-xl border border-white/70 p-4 sm:p-5 rounded-3xl shadow-lg shadow-emerald-950/5 relative overflow-hidden">
        <div className="flex items-center space-x-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-full bg-forest/15 backdrop-blur-md flex items-center justify-center text-forest border border-white/80 shrink-0">
            <Quote className="w-4 h-4 text-forest" />
          </div>
          <h4 className="text-xs font-extrabold text-forest uppercase tracking-wider">
            {language === 'BN' ? 'আজকের সুন্নাহ ও বাণী' : 'Daily Hadith & Wisdom'}
          </h4>
        </div>

        <p className="text-xs text-emerald-950 font-medium italic mb-2 leading-relaxed font-sans">
          {language === 'BN' ? currentQuote.quoteBn : currentQuote.quoteEn}
        </p>

        <div className="flex justify-between items-center text-[10px] text-emerald-900/70 pt-2 border-t border-emerald-900/10">
          <span className="flex items-center gap-1 text-forest font-bold">
            <Sparkles className="w-3 h-3 text-amber-500" />
            সহীহ রেফারেন্স
          </span>
          <span className="font-extrabold text-emerald-950">
            — {language === 'BN' ? currentQuote.sourceBn : currentQuote.sourceEn}
          </span>
        </div>
      </div>
    </div>
  );
};
