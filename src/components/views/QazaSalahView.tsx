import React from 'react';
import { QazaRecord, Language } from '../../types';
import { ArrowLeft, Plus, Minus, RotateCcw, CheckCircle, Info } from 'lucide-react';

interface QazaSalahViewProps {
  qazaRecord: QazaRecord;
  onUpdateQaza: (record: QazaRecord) => void;
  onBack: () => void;
  language: Language;
}

export const QazaSalahView: React.FC<QazaSalahViewProps> = ({
  qazaRecord,
  onUpdateQaza,
  onBack,
  language
}) => {
  const increment = (key: keyof QazaRecord) => {
    onUpdateQaza({ ...qazaRecord, [key]: qazaRecord[key] + 1 });
  };

  const decrement = (key: keyof QazaRecord) => {
    if (qazaRecord[key] > 0) {
      onUpdateQaza({ ...qazaRecord, [key]: qazaRecord[key] - 1 });
    }
  };

  const total =
    qazaRecord.fajr +
    qazaRecord.dhuhr +
    qazaRecord.asr +
    qazaRecord.maghrib +
    qazaRecord.isha +
    qazaRecord.witr;

  const prayerNames: { key: keyof QazaRecord; bn: string; en: string; rakats: string }[] = [
    { key: 'fajr', bn: 'ফজর (২ ফরজ)', en: 'Fajr (2 Farz)', rakats: '২ রাকাত' },
    { key: 'dhuhr', bn: 'জোহর (৪ ফরজ)', en: 'Dhuhr (4 Farz)', rakats: '৪ রাকাত' },
    { key: 'asr', bn: 'আসর (৪ ফরজ)', en: 'Asr (4 Farz)', rakats: '৪ রাকাত' },
    { key: 'maghrib', bn: 'মাগরিব (৩ ফরজ)', en: 'Maghrib (3 Farz)', rakats: '৩ রাকাত' },
    { key: 'isha', bn: 'ইশা (৪ ফরজ)', en: 'Isha (4 Farz)', rakats: '৪ রাকাত' },
    { key: 'witr', bn: 'বিতর (৩ ওয়াজিব)', en: 'Witr (3 Wajib)', rakats: '৩ রাকাত' }
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-4">
      {/* Back Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-100 card-shadow flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-forest bg-mint/40 px-3 py-1.5 rounded-xl hover:bg-mint smooth-press cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ফিরে যান</span>
        </button>

        <h3 className="text-sm font-bold text-charcoal">কাজাহ সালাত হিসাব</h3>

        <div className="w-8" />
      </div>

      {/* Summary Banner */}
      <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-5 rounded-2xl card-shadow text-center relative overflow-hidden border border-forest/20">
        <span className="text-[10px] uppercase font-bold tracking-wider bg-softgold text-charcoal px-3 py-1 rounded-full">
          মোট অমীমাত কাজাহ
        </span>
        <h2 className="text-3xl font-extrabold text-mint my-2 font-sans tracking-wide">
          {total} ওয়াক্ত
        </h2>
        <p className="text-xs text-white/80">
          প্রতি ওয়াক্ত ফরজ আদায়ের পর ১ ওয়াক্ত করে কাজাহ আদায় করুন
        </p>
      </div>

      {/* Prayers List */}
      <div className="space-y-2.5">
        {prayerNames.map((item) => {
          const count = qazaRecord[item.key];

          return (
            <div
              key={item.key}
              className="bg-white p-3.5 rounded-2xl border border-gray-100 card-shadow flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-charcoal">{item.bn}</h4>
                <p className="text-[10px] text-gray-500">{item.rakats}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decrement(item.key)}
                  disabled={count === 0}
                  className="w-8 h-8 rounded-xl bg-mint/50 hover:bg-mint text-forest font-bold flex items-center justify-center disabled:opacity-30 smooth-press cursor-pointer border border-forest/10"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="text-sm font-black text-charcoal min-w-[28px] text-center">
                  {count}
                </span>

                <button
                  onClick={() => increment(item.key)}
                  className="w-8 h-8 rounded-xl bg-forest text-white font-bold flex items-center justify-center hover:bg-forest-dark smooth-press cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info card */}
      <div className="bg-softbg p-4 rounded-2xl border border-gray-100 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>মাসআলা:</strong> ফরজ সালাতের পূর্বে বা পরে নফলের পূর্বে কাজাহ সালাত আদায় করে নিলে তা দ্রত আদায় সম্পন্ন হয়।
        </p>
      </div>
    </div>
  );
};
