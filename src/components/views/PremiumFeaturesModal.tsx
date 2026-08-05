import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  Bot, 
  BookOpen, 
  Volume2, 
  Users, 
  ShieldCheck, 
  Calculator,
  Zap,
  Star
} from 'lucide-react';
import { Language } from '../../types';

interface PremiumFeaturesModalProps {
  onBack: () => void;
  language: Language;
}

export const PremiumFeaturesModal: React.FC<PremiumFeaturesModalProps> = ({ onBack, language }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const premiumFeatures = [
    {
      icon: <Bot className="w-5 h-5 text-amber-500" />,
      titleBn: '২৪/৭ এআই দ্বীন ও মাসআলা অ্যাসিস্ট্যান্ট',
      titleEn: '24/7 AI Deen & Mas\'ala Companion',
      descBn: 'কুরআন, সহীহ হাদিস ও হানাফী ফিকহ ভিত্তিক তাৎক্ষণিক এআই উত্তর ও ফতোয়া গাইড।'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      titleBn: 'অফলাইন ১৫-লাইন হাফেজী কুরআন ও অডিও ডাউনলোড',
      titleEn: 'Offline 15-Line Hafezi Quran & Audio Downloader',
      descBn: 'বাংলাদেশের ঐতিহ্যবাহী হাফেজী কুরআন প্রিন্ট লেআউট এবং মিসারী রাশেদ আফাসীর ১১৪টি সূরার এইচডি অফলাইন অডিও।'
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      titleBn: 'গেমিফাইড ফ্যামিলি চ্যালেঞ্জ ও স্ট্রীক শিল্ড',
      titleEn: 'Gamified Family Challenge & Streak Shield',
      descBn: 'পরিবারের সবার সাথে সালাত ট্র্যাকিং প্রতিযোগিতা, সাওয়াব রিওয়ার্ডস এবং একদিন মিস হলেও স্ট্রীক ধরে রাখার সুবিধা।'
    },
    {
      icon: <Volume2 className="w-5 h-5 text-purple-500" />,
      titleBn: 'এইচডি আযান সাউন্ড কাস্টমাইজেশন ও স্মার্ট উইজেট',
      titleEn: 'HD Azan Audio & Smart Home Widgets',
      descBn: 'মক্কা হরমাইনের প্রিয় ক্বারী সাহেবের আযান টিউন এবং মোবাইল হোমস্ক্রিনের জন্য প্রিমিয়াম সালাত টাইম উইজেট।'
    },
    {
      icon: <Calculator className="w-5 h-5 text-rose-500" />,
      titleBn: 'প্রো কাজাহ সালাত ও নিসাব যাকাত ক্যালকুলেটর',
      titleEn: 'Pro Qaza Tracker & Nisab Zakat Calculator',
      descBn: 'জীবনের সকল কাজাহ সালাতের অটোমেটিক রিকভারি শিডিউল এবং বর্তমান সোনা/রুপার দাম অনুযায়ী রিয়েলটাইম যাকাত হিসেব।'
    },
    {
      icon: <Crown className="w-5 h-5 text-softgold" />,
      titleBn: 'বিজ্ঞাপনমুক্ত সম্পূর্ণ অভিজ্ঞতা ও গোল্ডেন থিম',
      titleEn: 'Ad-Free Pure Experience & Gold Theme',
      descBn: 'সম্পূর্ণ ডিস্ট্র্যাকশন-ফ্রি নাইট মোড ও এক্সক্লুসিভ লাক্সারি ইসলামিক ইন্টারফেস।'
    }
  ];

  return (
    <div className="space-y-5 animate-fade-in pb-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-gray-100 card-shadow">
        <button
          onClick={onBack}
          className="flex items-center text-xs font-bold text-forest hover:text-forest-dark transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          পেছনে ফিরুন
        </button>

        <span className="text-xs font-black uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <Crown className="w-4 h-4 text-softgold fill-softgold" />
          তাকওয়া প্রিমিয়াম (Taqwa Plus)
        </span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-charcoal via-forest-dark to-forest text-white p-6 rounded-3xl card-shadow relative overflow-hidden border border-softgold/30 text-center">
        <div className="absolute top-2 right-2 text-6xl opacity-10 pointer-events-none">
          🕌
        </div>

        <span className="inline-flex items-center gap-1.5 bg-softgold text-charcoal text-[10px] font-black uppercase px-3 py-1 rounded-full mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          প্রিমিয়াম প্রস্তাবনা ও ফিচার রোডম্যাপ
        </span>

        <h2 className="text-xl font-black text-white font-sans tracking-wide mb-1">
          তাকওয়া লাইফ প্রিমিয়াম সাবস্ক্রিপশন
        </h2>
        <p className="text-xs text-mint/90 max-w-sm mx-auto leading-relaxed">
          আপনার ইসলামিক অ্যাপটিকে একটি বিশ্বমানের প্রিমিয়াম প্রডাক্টে পরিণত করতে যে চমৎকার ফিচারগুলো যুক্ত করতে পারেন:
        </p>
      </div>

      {/* Feature List Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-charcoal px-1 flex items-center gap-1.5">
          <Star className="w-4 h-4 text-softgold fill-softgold" />
          প্রিমিয়াম ফিচারসমূহের পূর্ণাঙ্গ তালিকা
        </h3>

        <div className="space-y-2.5">
          {premiumFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-2xl border border-gray-100 card-shadow flex items-start gap-3.5 hover:border-forest/20 transition-all"
            >
              <div className="p-2.5 rounded-2xl bg-mint/40 border border-forest/10 shrink-0 mt-0.5">
                {feat.icon}
              </div>

              <div>
                <h4 className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                  <span>{feat.titleBn}</span>
                  <span className="text-[9px] bg-softgold/20 text-amber-800 font-extrabold px-1.5 py-0.2 rounded-md">
                    PRO
                  </span>
                </h4>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                  {feat.descBn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Mock Preview Cards */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3">
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider text-center">
          সাবস্ক্রিপশন মডেল প্ল্যান উদাহরণ
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {/* Monthly Plan */}
          <div
            onClick={() => setSelectedPlan('monthly')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all text-center relative ${
              selectedPlan === 'monthly'
                ? 'bg-mint/30 border-forest'
                : 'bg-gray-50/80 border-gray-100'
            }`}
          >
            <span className="text-[10px] font-bold text-gray-400 block uppercase">মাসিক প্ল্যান</span>
            <p className="text-lg font-black text-forest mt-1">৳ ৯৯ / মাস</p>
            <p className="text-[10px] text-gray-500 mt-0.5">যেকোনো সময় বাতিলযোগ্য</p>
          </div>

          {/* Yearly Plan */}
          <div
            onClick={() => setSelectedPlan('yearly')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all text-center relative ${
              selectedPlan === 'yearly'
                ? 'bg-mint/30 border-forest'
                : 'bg-gray-50/80 border-gray-100'
            }`}
          >
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black bg-softgold text-charcoal px-2 py-0.5 rounded-full uppercase">
              ৫০% ছাড়
            </span>
            <span className="text-[10px] font-bold text-gray-400 block uppercase">বার্ষিক প্ল্যান</span>
            <p className="text-lg font-black text-forest mt-1">৳ ৪৯৯ / বছর</p>
            <p className="text-[10px] text-gray-500 mt-0.5">মাসে মাত্র ৳৪১</p>
          </div>
        </div>

        <button
          onClick={() => alert('প্রিমিয়াম ফিচার সাবস্ক্রিপশন সিস্টেম যুক্ত করা হয়েছে!')}
          className="w-full py-3 bg-gradient-to-r from-forest to-forest-dark text-white font-bold text-xs rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2 smooth-press"
        >
          <Crown className="w-4 h-4 text-softgold fill-softgold" />
          <span>তাকওয়া প্রিমিয়াম আনলক করুন</span>
        </button>
      </div>
    </div>
  );
};
