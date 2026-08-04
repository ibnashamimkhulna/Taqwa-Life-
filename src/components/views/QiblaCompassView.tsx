import React, { useState, useEffect } from 'react';
import { ArrowLeft, Compass as CompassIcon, MapPin, Navigation, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

interface QiblaCompassViewProps {
  onBack: () => void;
  language: Language;
}

export const QiblaCompassView: React.FC<QiblaCompassViewProps> = ({ onBack, language }) => {
  const [heading, setHeading] = useState<number>(0);
  const [qiblaAngle, setQiblaAngle] = useState<number>(291); // ~291° for Bangladesh
  const [hasSensor, setHasSensor] = useState<boolean>(false);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setHeading(e.alpha);
        setHasSensor(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const relativeQibla = (qiblaAngle - heading + 360) % 360;

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

        <h3 className="text-sm font-bold text-charcoal">কিবলা কম্পাস</h3>

        <div className="w-8" />
      </div>

      {/* Compass Interactive Dial */}
      <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-6 rounded-3xl card-shadow text-center relative overflow-hidden border border-forest/20">
        <div className="flex justify-between items-center mb-2 text-xs text-mint">
          <span className="flex items-center gap-1 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            বাংলাদেশ (ঢাকা)
          </span>
          <span className="bg-white/10 px-2.5 py-0.5 rounded-full font-bold">
            কিবলা কোন: ২৯১° WNW
          </span>
        </div>

        {/* Compass Dial Canvas Visual */}
        <div className="my-6 flex justify-center items-center">
          <div className="w-56 h-56 rounded-full bg-white/10 border-4 border-mint/30 flex items-center justify-center relative card-shadow shadow-2xl">
            {/* Compass Dial Outer Ring */}
            <div 
              className="w-full h-full rounded-full absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              <span className="absolute top-2 font-bold text-xs text-mint">N</span>
              <span className="absolute right-2 font-bold text-xs text-mint">E</span>
              <span className="absolute bottom-2 font-bold text-xs text-mint">S</span>
              <span className="absolute left-2 font-bold text-xs text-mint">W</span>
            </div>

            {/* Qibla Kaaba Pointer */}
            <div
              className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-300 pointer-events-none"
              style={{ transform: `rotate(${relativeQibla}deg)` }}
            >
              <div className="flex flex-col items-center -mt-20">
                <div className="w-8 h-8 rounded-full bg-softgold text-charcoal flex items-center justify-center text-sm shadow-lg font-bold border-2 border-white animate-bounce">
                  🕋
                </div>
                <div className="w-1 h-12 bg-softgold rounded-full shadow-xs" />
              </div>
            </div>

            {/* Center Axis */}
            <div className="w-8 h-8 rounded-full bg-white text-forest flex items-center justify-center text-xs font-bold shadow-md z-10">
              <CompassIcon className="w-5 h-5 text-forest" />
            </div>
          </div>
        </div>

        <p className="text-xs text-mint/90 font-medium">
          ক্বাবা শরীফের অবস্থান: ৫,১৫০ কিমি দূরে (মক্কা মুকাররমা)
        </p>

        {/* Manual adjustment slider */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
          <span className="text-mint text-[11px]">কম্পাস ফাইন টিউন:</span>
          <input
            type="range"
            min="0"
            max="360"
            value={heading}
            onChange={(e) => setHeading(Number(e.target.value))}
            className="w-full accent-mint cursor-pointer"
          />
          <span className="font-bold text-white min-w-[32px] text-right">{heading}°</span>
        </div>
      </div>

      {/* Usage Instruction */}
      <div className="bg-softbg p-4 rounded-2xl border border-gray-100 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-forest shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>পরামর্শ:</strong> সঠিক দিক নির্ণয়ের জন্য মোবাইলটি অনুভূমিকভাবে সমতল জায়গায় রাখুন এবং যেকোনো চৌম্বকীয় ক্ষেত্র বা মেটাল কভার থেকে দূরে রাখুন।
        </p>
      </div>
    </div>
  );
};
