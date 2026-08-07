import React, { useState, useEffect } from 'react';
import { PrayerTime, Language } from '../../types';
import { DISTRICTS_BD } from '../../data/prayersData';
import { Clock, MapPin, Bell, BellOff, Info, Moon, Sun, ShieldCheck } from 'lucide-react';
import { calculatePrayerTimes } from '../../utils/prayerCalculator';

interface SalahTabProps {
  prayers: PrayerTime[];
  language: Language;
  district: string;
  onDistrictChange: (district: string) => void;
  onOpenFeature: (title: string, desc: string) => void;
  onOpenLocationModal?: () => void;
}

export const SalahTab: React.FC<SalahTabProps> = ({
  language,
  district,
  onDistrictChange,
  onOpenFeature,
  onOpenLocationModal
}) => {
  const [madhhab, setMadhhab] = useState<'Hanafi' | 'Shafi'>('Hanafi');
  const [alerts, setAlerts] = useState<Record<string, boolean>>({
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true
  });

  // Dynamic Real-time prayer state
  const [prayerState, setPrayerState] = useState(() => calculatePrayerTimes(district));

  useEffect(() => {
    setPrayerState(calculatePrayerTimes(district));
    const interval = setInterval(() => {
      setPrayerState(calculatePrayerTimes(district));
    }, 1000);
    return () => clearInterval(interval);
  }, [district]);

  const toggleAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { nextWaqt, remainingTimeFormatted, prayersList, hijriDateBn } = prayerState;

  return (
    <div className="space-y-4 animate-fade-in pb-4">
      {/* Top Banner with Countdown */}
      <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-5 rounded-2xl card-shadow relative overflow-hidden border border-forest/20">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-1.5 text-mint text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full w-fit">
              <Clock className="w-3.5 h-3.5 text-mint animate-pulse" />
              <span>{language === 'BN' ? 'পরবর্তী সালাত' : 'Next Prayer'}</span>
            </div>
            <h2 className="text-2xl font-bold mt-2">
              {language === 'BN' ? `${nextWaqt.nameBn} (${nextWaqt.nameEn})` : nextWaqt.nameEn}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-mint">সময় বাকি</p>
            <p className="text-xl font-extrabold text-softgold tracking-wider font-mono">
              {remainingTimeFormatted}
            </p>
          </div>
        </div>

        <p className="text-xs text-mint/80 pt-2 border-t border-white/10 flex items-center justify-between">
          <span>ওয়াক্ত শুরু: {nextWaqt.time}</span>
          <span className="text-[11px] font-semibold bg-softgold/20 text-softgold px-2.5 py-0.5 rounded-full border border-softgold/30">
            {hijriDateBn}
          </span>
        </p>
      </div>

      {/* Settings Row: District & Madhhab Selection */}
      <div className="bg-white p-3.5 rounded-xl border border-gray-100 card-shadow flex items-center justify-between gap-2">
        {/* District Selector */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {onOpenLocationModal ? (
            <button
              onClick={onOpenLocationModal}
              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-forest rounded-lg border border-emerald-200 transition-colors cursor-pointer shrink-0"
              title="GPS দিয়ে লোকেশন ট্র্যাক বা জেলা সিলেক্ট করুন"
            >
              <MapPin className="w-4 h-4 text-forest" />
            </button>
          ) : (
            <MapPin className="w-4 h-4 text-forest shrink-0" />
          )}
          <select
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="text-xs font-bold text-charcoal bg-mint/30 px-2 py-1.5 rounded-lg outline-none cursor-pointer border border-forest/10 w-full truncate"
          >
            {DISTRICTS_BD.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Madhhab Selector */}
        <div className="flex items-center gap-1 bg-softbg p-1 rounded-lg border border-gray-200 shrink-0">
          <button
            onClick={() => setMadhhab('Hanafi')}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              madhhab === 'Hanafi' ? 'bg-forest text-white shadow-xs' : 'text-gray-500'
            }`}
          >
            হানাফী
          </button>
          <button
            onClick={() => setMadhhab('Shafi')}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              madhhab === 'Shafi' ? 'bg-forest text-white shadow-xs' : 'text-gray-500'
            }`}
          >
            শাফেয়ী/অন্যান্য
          </button>
        </div>
      </div>

      {/* Prayer Schedule List */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
            {language === 'BN' ? 'সালাতের পূর্ণাঙ্গ সময়সূচী' : 'PRAYER SCHEDULE'}
          </h3>
          <span className="text-[11px] text-gray-500">আজকের ওয়াক্ত</span>
        </div>

        <div className="space-y-2">
          {prayersList.map((prayer) => {
            const isCurrent = prayer.status === 'current';
            const isNext = prayer.status === 'next';
            const isNafl = prayer.isNafl;

            return (
              <div
                key={prayer.id}
                onClick={() =>
                  onOpenFeature(
                    prayer.nameBn,
                    prayer.descriptionBn || 'সালাতের ওয়াক্ত ও বিবরণ।'
                  )
                }
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  isCurrent
                    ? 'bg-mint/80 border-forest shadow-sm ring-1 ring-forest/30'
                    : isNext
                    ? 'bg-softgold/10 border-softgold/50'
                    : 'bg-white border-gray-100 hover:border-mint'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isCurrent
                        ? 'bg-forest text-white'
                        : isNext
                        ? 'bg-softgold text-charcoal'
                        : isNafl
                        ? 'bg-mint/40 text-forest'
                        : 'bg-softbg text-gray-600'
                    }`}
                  >
                    {isNafl ? <Sun className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-charcoal">
                        {language === 'BN' ? prayer.nameBn : prayer.nameEn}
                      </h4>
                      {isCurrent && (
                        <span className="text-[9px] bg-forest text-white px-2 py-0.5 rounded-full font-bold">
                          চলমান ওয়াক্ত
                        </span>
                      )}
                      {isNext && (
                        <span className="text-[9px] bg-softgold text-charcoal px-2 py-0.5 rounded-full font-bold">
                          পরবর্তী
                        </span>
                      )}
                      {isNafl && (
                        <span className="text-[9px] bg-mint text-forest px-2 py-0.5 rounded-full font-semibold">
                          নফল সালাত
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                      {prayer.descriptionBn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-forest tracking-wide">
                    {prayer.time}
                  </span>

                  {!isNafl && (
                    <button
                      onClick={(e) => toggleAlert(prayer.id, e)}
                      title="Toggle Alert"
                      className="text-gray-400 hover:text-forest p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                      {alerts[prayer.id] ? (
                        <Bell className="w-4 h-4 text-forest fill-forest/20" />
                      ) : (
                        <BellOff className="w-4 h-4 text-gray-300" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Islamic Info Note */}
      <div className="bg-softbg p-3.5 rounded-xl border border-gray-100 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-600 leading-relaxed">
          <strong>বিশেষ দ্রষ্টব্য:</strong> ইসলামিক ফাউন্ডেশন বাংলাদেশ অনুযায়ী সময়সূচী হালনাগাদ করা হয়েছে।
        </p>
      </div>
    </div>
  );
};
