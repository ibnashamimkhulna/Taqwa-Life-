import React, { useState } from 'react';
import { HabitGoal, Language, QazaRecord } from '../../types';
import { User, Flame, CheckCircle2, Circle, Trophy, Target, Settings, Sliders, Bell, Globe } from 'lucide-react';

interface ProfileTabProps {
  language: Language;
  district: string;
  onDistrictChange: (d: string) => void;
  qazaRecord: QazaRecord;
  onOpenSubView: (view: 'qaza' | 'hijri' | 'qibla' | 'settings') => void;
  onOpenFeature: (title: string, desc: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  language,
  district,
  onDistrictChange,
  qazaRecord,
  onOpenSubView,
  onOpenFeature
}) => {
  const [goals, setGoals] = useState<HabitGoal[]>([
    { id: '1', titleBn: '৫ ওয়াক্ত সালাত জামাতে আদায়', titleEn: '5 Prayers on Time', completed: true, streak: 7, category: 'salah' },
    { id: '2', titleBn: 'দৈনিক ১ পারা / ২ পৃষ্ঠা কুরআন তেলাওয়াত', titleEn: 'Daily Quran Reading', completed: true, streak: 5, category: 'quran' },
    { id: '3', titleBn: 'সকাল ও সন্ধ্যার সুন্নাহ আযকার', titleEn: 'Morning & Evening Adhkar', completed: false, streak: 3, category: 'dhikr' },
    { id: '4', titleBn: 'দৈনিক ১০০ বার ইস্তিগফার ও দরূদ', titleEn: '100x Istighfar & Salawat', completed: true, streak: 12, category: 'dhikr' },
    { id: '5', titleBn: 'সদকাহ ও ভালো কাজ', titleEn: 'Daily Sadaqah & Good Deed', completed: false, streak: 2, category: 'charity' }
  ]);

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextState = !g.completed;
          return {
            ...g,
            completed: nextState,
            streak: nextState ? g.streak + 1 : Math.max(0, g.streak - 1)
          };
        }
        return g;
      })
    );
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const totalQaza =
    qazaRecord.fajr +
    qazaRecord.dhuhr +
    qazaRecord.asr +
    qazaRecord.maghrib +
    qazaRecord.isha +
    qazaRecord.witr;

  return (
    <div className="space-y-5 animate-fade-in pb-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-5 rounded-2xl card-shadow relative overflow-hidden border border-forest/20">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-mint font-bold text-2xl border-2 border-mint/40 shrink-0">
            <User className="w-7 h-7 text-mint" />
          </div>

          <div>
            <span className="text-[10px] bg-softgold text-charcoal px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              তাকওয়া ট্র্যাকার
            </span>
            <h2 className="text-lg font-bold mt-1">আমার ইবাদত ও ফাইল</h2>
            <p className="text-xs text-mint/80">বর্তমান জেলা: {district}</p>
          </div>
        </div>

        {/* Quick Streak Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center relative z-10">
          <div className="bg-white/10 p-2 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-softgold font-bold text-xs">
              <Flame className="w-3.5 h-3.5 fill-softgold" />
              <span>৭ দিন</span>
            </div>
            <p className="text-[10px] text-mint/80 mt-0.5">আমল স্ট্রিক</p>
          </div>

          <div className="bg-white/10 p-2 rounded-xl">
            <span className="font-bold text-xs text-white">
              {completedCount} / {goals.length}
            </span>
            <p className="text-[10px] text-mint/80 mt-0.5">আজকের গোল</p>
          </div>

          <div 
            onClick={() => onOpenSubView('qaza')}
            className="bg-white/10 p-2 rounded-xl cursor-pointer hover:bg-white/20 transition-colors"
          >
            <span className="font-bold text-xs text-softgold">{totalQaza} ওয়াক্ত</span>
            <p className="text-[10px] text-mint/80 mt-0.5">বাকি কাজাহ</p>
          </div>
        </div>
      </div>

      {/* Daily Spiritual Goals */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-forest" />
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">
              {language === 'BN' ? 'আজকের ইবাদতের লক্ষ্য' : 'DAILY SPIRITUAL GOALS'}
            </h3>
          </div>
          <span className="text-[11px] font-bold text-forest bg-mint px-2 py-0.5 rounded-full">
            {completedCount} টি সম্পন্ন
          </span>
        </div>

        <div className="space-y-2">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                goal.completed
                  ? 'bg-mint/30 border-forest/30'
                  : 'bg-softbg border-gray-100 hover:border-mint'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleGoal(goal.id);
                  }}
                  className="text-forest shrink-0 cursor-pointer"
                >
                  {goal.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-forest fill-forest/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </button>

                <span
                  className={`text-xs font-semibold ${
                    goal.completed ? 'line-through text-gray-400' : 'text-charcoal'
                  }`}
                >
                  {language === 'BN' ? goal.titleBn : goal.titleEn}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-softgold font-bold bg-white px-2 py-0.5 rounded-md border border-gray-100">
                <Flame className="w-3 h-3 fill-softgold" />
                <span>{goal.streak} দিন</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onOpenSubView('qaza')}
          className="p-3.5 bg-mint rounded-2xl border border-forest/10 flex items-center gap-3 card-shadow hover:bg-[#b8e8cf] smooth-press cursor-pointer text-left"
        >
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-forest shrink-0 shadow-xs">
            📋
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal">কাজাহ হিসাব</h4>
            <p className="text-[10px] text-gray-600">সালাতের হিসাব আপডেট করুন</p>
          </div>
        </button>

        <button
          onClick={() => onOpenSubView('hijri')}
          className="p-3.5 bg-mint rounded-2xl border border-forest/10 flex items-center gap-3 card-shadow hover:bg-[#b8e8cf] smooth-press cursor-pointer text-left"
        >
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-forest shrink-0 shadow-xs">
            📅
          </div>
          <div>
            <h4 className="text-xs font-bold text-charcoal">হিজরি ক্যালেন্ডার</h4>
            <p className="text-[10px] text-gray-600">গুরুত্বপূর্ণ ইসলামিক দিবস</p>
          </div>
        </button>
      </div>

      {/* Quick App Preferences Card */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <Settings className="w-4 h-4 text-forest" />
          <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider">
            {language === 'BN' ? 'অ্যাপ সেটিংস' : 'APP SETTINGS'}
          </h3>
        </div>

        <button
          onClick={() => onOpenSubView('settings')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-softbg hover:bg-mint/30 text-xs font-semibold text-charcoal cursor-pointer border border-gray-100"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-forest" />
            <span>সালাত কাস্টমাইজেশন ও মাযহাব</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>
      </div>
    </div>
  );
};
