import React from 'react';
import { ISLAMIC_EVENTS } from '../../data/eventsData';
import { Language } from '../../types';
import { ArrowLeft, Calendar as CalendarIcon, Star, Moon, Sparkles } from 'lucide-react';
import { getBanglaHijriDate, getBanglaGregorianDate, getBanglaCalendarDate } from '../../utils/prayerCalculator';

interface HijriCalendarViewProps {
  onBack: () => void;
  language: Language;
}

export const HijriCalendarView: React.FC<HijriCalendarViewProps> = ({ onBack, language }) => {
  const todayHijri = getBanglaHijriDate(new Date());
  const todayGregorian = getBanglaGregorianDate(new Date());
  const todayBanglaSan = getBanglaCalendarDate(new Date());

  return (
    <div className="space-y-4 animate-fade-in pb-4">
      {/* Top Header */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-100 card-shadow flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-forest bg-mint/40 px-3 py-1.5 rounded-xl hover:bg-mint smooth-press cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ফিরে যান</span>
        </button>

        <h3 className="text-sm font-bold text-charcoal">হিজরি ক্যালেন্ডার</h3>

        <div className="w-8" />
      </div>

      {/* Hijri Today Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-forest to-emerald-900 text-white p-6 rounded-2xl text-center card-shadow relative overflow-hidden border border-amber-300/30">
        <Moon className="w-10 h-10 text-amber-300 mx-auto mb-2 opacity-95 animate-pulse" />
        <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400 text-charcoal px-3.5 py-1 rounded-full shadow-xs">
          আজকের হিজরি তারিখ
        </span>
        <h2 className="text-2xl font-black text-amber-300 mt-2 tracking-wide drop-shadow-md">
          {todayHijri}
        </h2>
        <p className="text-xs text-emerald-100 font-bold mt-1">
          {todayGregorian} • <span className="text-amber-200">{todayBanglaSan}</span>
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
            গুরুত্বপূর্ণ ইসলামিক দিবসসমূহ
          </h4>
          <span className="text-[11px] text-forest font-semibold">১৪৪৭-১৪৪৮ হিজরি</span>
        </div>

        <div className="space-y-2">
          {ISLAMIC_EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-1.5"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold bg-mint text-forest px-2.5 py-0.5 rounded-full">
                  {event.dateHijri}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {event.dateGregorian}
                </span>
              </div>

              <h4 className="text-xs font-bold text-charcoal pt-0.5">{event.titleBn}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{event.descriptionBn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
