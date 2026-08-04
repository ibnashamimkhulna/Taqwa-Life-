import React, { useState } from 'react';
import { DhikrItem, Language } from '../../types';
import { INITIAL_ADHKAR } from '../../data/adhkarData';
import { RotateCcw, Volume2, VolumeX, Sparkles, Plus, CheckCircle, Heart } from 'lucide-react';

interface DhikrTabProps {
  language: Language;
  onOpenFeature: (title: string, desc: string) => void;
}

export const DhikrTab: React.FC<DhikrTabProps> = ({ language, onOpenFeature }) => {
  const [adhkarList, setAdhkarList] = useState<DhikrItem[]>(INITIAL_ADHKAR);
  const [selectedDhikrId, setSelectedDhikrId] = useState<string>('dhikr-1');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const selectedDhikr = adhkarList.find((d) => d.id === selectedDhikrId) || adhkarList[0];

  const handleTap = () => {
    // Play gentle click audio if enabled
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 600;
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } catch (e) {
        // audio context fallback
      }
    }

    setAdhkarList((prev) =>
      prev.map((item) => {
        if (item.id === selectedDhikrId) {
          const nextCount = item.count + 1;
          return { ...item, count: nextCount };
        }
        return item;
      })
    );
  };

  const handleReset = () => {
    setAdhkarList((prev) =>
      prev.map((item) => (item.id === selectedDhikrId ? { ...item, count: 0 } : item))
    );
  };

  const setTarget = (newTarget: number) => {
    setAdhkarList((prev) =>
      prev.map((item) => (item.id === selectedDhikrId ? { ...item, target: newTarget } : item))
    );
  };

  const progressPercent = Math.min(100, Math.round((selectedDhikr.count / selectedDhikr.target) * 100));

  return (
    <div className="space-y-5 animate-fade-in pb-4">
      {/* Top Selector Bar */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 card-shadow">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
          {language === 'BN' ? 'জিকির নির্বাচন করুন' : 'SELECT DHIKR'}
        </label>
        <select
          value={selectedDhikrId}
          onChange={(e) => setSelectedDhikrId(e.target.value)}
          className="w-full text-xs font-bold text-charcoal bg-mint/40 p-2.5 rounded-xl border border-forest/10 outline-none cursor-pointer"
        >
          {adhkarList.map((item) => (
            <option key={item.id} value={item.id}>
              {language === 'BN' ? item.titleBn : item.titleEn}
            </option>
          ))}
        </select>
      </div>

      {/* Main Digital Tasbeeh Card */}
      <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-6 rounded-3xl card-shadow text-center relative overflow-hidden border border-forest/20">
        
        {/* Controls top bar */}
        <div className="flex justify-between items-center mb-4 relative z-10">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-mint hover:bg-white/20 smooth-press cursor-pointer border border-white/10"
            title="Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>

          <span className="text-[10px] uppercase font-bold tracking-widest bg-softgold text-charcoal px-3 py-1 rounded-full shadow-xs">
            ডিজিটাল তাসবীহ
          </span>

          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-mint hover:bg-white/20 smooth-press cursor-pointer border border-white/10"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Arabic Display */}
        <div className="my-3 relative z-10">
          <h2 className="font-arabic text-3xl font-bold text-mint leading-relaxed">
            {selectedDhikr.arabic}
          </h2>
          <p className="text-xs text-white/90 italic mt-1 font-sans">
            {selectedDhikr.transliteration}
          </p>
          <p className="text-[11px] text-mint/80 mt-1 font-medium">
            "{selectedDhikr.meaningBn}"
          </p>
        </div>

        {/* Circular Interactive Counter Button */}
        <div className="my-6 relative z-10 flex flex-col items-center justify-center">
          <button
            onClick={handleTap}
            className="w-36 h-36 rounded-full bg-gradient-to-tr from-white/10 to-white/30 border-4 border-mint/40 flex flex-col items-center justify-center card-shadow smooth-press active:scale-95 cursor-pointer hover:border-mint transition-all shadow-2xl relative group"
          >
            <span className="text-4xl font-black text-white tracking-wider font-sans">
              {selectedDhikr.count}
            </span>
            <span className="text-[10px] text-mint uppercase tracking-widest font-semibold mt-1">
              লক্ষ্য: {selectedDhikr.target}
            </span>

            {/* Ripple ring on hover */}
            <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 pointer-events-none" />
          </button>

          <p className="text-[10px] text-mint/80 mt-3 font-medium">
            ট্যাপ করে সংখ্যা গণনা করুন
          </p>
        </div>

        {/* Target Buttons */}
        <div className="flex justify-center items-center gap-2 pt-3 border-t border-white/10 relative z-10">
          <span className="text-[10px] text-mint font-bold">টার্গেট:</span>
          {[33, 100, 1000].map((t) => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className={`text-xs px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                selectedDhikr.target === t
                  ? 'bg-softgold text-charcoal shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Virtue Card */}
      {selectedDhikr.virtueBn && (
        <div className="bg-mint/40 p-4 rounded-2xl border border-forest/10 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-forest shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-0.5">
              ফজিলত ও বরকত
            </h4>
            <p className="text-xs text-charcoal/90 leading-relaxed">
              {selectedDhikr.virtueBn}
            </p>
          </div>
        </div>
      )}

      {/* Daily Adhkar List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal px-1">
          {language === 'BN' ? 'অন্যান্য দৈনন্দিন আযকার' : 'DAILY ADHKAR LIST'}
        </h3>

        <div className="space-y-2">
          {adhkarList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDhikrId(item.id)}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                item.id === selectedDhikrId
                  ? 'bg-mint/50 border-forest'
                  : 'bg-white border-gray-100 hover:border-mint'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-charcoal">
                  {language === 'BN' ? item.titleBn : item.titleEn}
                </p>
                <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                  {item.meaningBn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-forest bg-white px-2.5 py-1 rounded-lg border border-forest/10">
                  {item.count} / {item.target}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
