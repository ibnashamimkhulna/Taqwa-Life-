import React from 'react';
import { ISLAMIC_EVENTS } from '../../data/eventsData';
import { Language } from '../../types';
import { ArrowLeft, Calendar as CalendarIcon, Star, Moon, Sparkles } from 'lucide-react';

interface HijriCalendarViewProps {
  onBack: () => void;
  language: Language;
}

export const HijriCalendarView: React.FC<HijriCalendarViewProps> = ({ onBack, language }) => {
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
      <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-6 rounded-2xl text-center card-shadow relative overflow-hidden border border-forest/20">
        <Moon className="w-10 h-10 text-mint mx-auto mb-2 opacity-90" />
        <span className="text-[10px] uppercase font-bold tracking-widest bg-softgold text-charcoal px-3 py-0.5 rounded-full">
          আজকের হিজরি তারিখ
        </span>
        <h2 className="text-2xl font-bold text-white mt-2">১৭ রমজান ১৪৪৭ হিজরি</h2>
        <p className="text-xs text-mint/80 mt-1">৭ মার্চ ২০২৬ খ্রিস্টাব্দ (শনিবার)</p>
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
