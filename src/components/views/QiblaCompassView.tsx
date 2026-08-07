import React, { useState, useEffect } from 'react';
import { ArrowLeft, Compass as CompassIcon, MapPin, Navigation, ShieldCheck, RefreshCw } from 'lucide-react';
import { Language } from '../../types';

interface QiblaCompassViewProps {
  onBack: () => void;
  language: Language;
}

// Calculate exact Qibla direction from latitude and longitude
function calculateQiblaBearing(lat: number, lng: number): number {
  const meccaLat = 21.4225 * (Math.PI / 180);
  const meccaLng = 39.8262 * (Math.PI / 180);
  const userLat = lat * (Math.PI / 180);
  const userLng = lng * (Math.PI / 180);

  const dLng = meccaLng - userLng;
  const y = Math.sin(dLng) * Math.cos(meccaLat);
  const x = Math.cos(userLat) * Math.sin(meccaLat) - Math.sin(userLat) * Math.cos(meccaLat) * Math.cos(dLng);

  let bearing = Math.atan2(y, x) * (180 / Math.PI);
  return (bearing + 360) % 360;
}

export const QiblaCompassView: React.FC<QiblaCompassViewProps> = ({ onBack, language }) => {
  const [heading, setHeading] = useState<number>(0);
  const [qiblaAngle, setQiblaAngle] = useState<number>(278); // ~278° for Bangladesh (West-South-West)
  const [locationName, setLocationName] = useState<string>('বাংলাদেশ (ঢাকা)');
  const [distanceKm, setDistanceKm] = useState<number>(5150);
  const [hasSensor, setHasSensor] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  // Auto detect GPS location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const angle = calculateQiblaBearing(lat, lng);
          setQiblaAngle(Math.round(angle));
          setLocationName(`GPS অবস্থান (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`);
        },
        () => {
          // Default Bangladesh Qibla bearing (~278° WSW)
          setQiblaAngle(278);
        }
      );
    }
  }, []);

  // Device orientation sensor listener
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let compassHeading: number | null = null;

      // Webkit iOS Compass Heading
      if ('webkitCompassHeading' in e && typeof (e as any).webkitCompassHeading === 'number') {
        compassHeading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        // Standard alpha (0 to 360)
        compassHeading = 360 - e.alpha;
      }

      if (compassHeading !== null && !isNaN(compassHeading)) {
        setHeading(Math.round(compassHeading));
        setHasSensor(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const handleRefreshLocation = () => {
    if ('geolocation' in navigator) {
      setIsDetecting(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsDetecting(false);
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const angle = calculateQiblaBearing(lat, lng);
          setQiblaAngle(Math.round(angle));
          setLocationName(`GPS অবস্থান (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`);
        },
        () => {
          setIsDetecting(false);
          alert('GPS লোকেশন পাওয়া যায়নি। ডিফল্ট বাংলাদেশ (ঢাকা ২৭৮°) কিবলা কোন ব্যবহৃত হচ্ছে।');
        }
      );
    }
  };

  const relativeQibla = (qiblaAngle - heading + 360) % 360;

  return (
    <div className="space-y-4 animate-fade-in pb-6">
      {/* Back Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-100 card-shadow flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-forest bg-mint/40 px-3 py-1.5 rounded-xl hover:bg-mint smooth-press cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ফিরে যান</span>
        </button>

        <h3 className="text-sm font-bold text-charcoal flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-forest" />
          <span>কিবলা কম্পাস (Qibla Compass)</span>
        </h3>

        <div className="w-8" />
      </div>

      {/* Main Interactive Compass Screen */}
      <div className="bg-gradient-to-br from-emerald-950 via-forest to-emerald-900 text-white p-5 rounded-3xl card-shadow text-center relative overflow-hidden border border-amber-300/30">
        <div className="flex justify-between items-center text-xs text-amber-200">
          <span className="flex items-center gap-1 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>{locationName}</span>
            <button
              onClick={handleRefreshLocation}
              className="ml-1 text-white hover:text-amber-300 cursor-pointer"
              title="GPS আপডেট করুন"
            >
              <RefreshCw className={`w-3 h-3 ${isDetecting ? 'animate-spin' : ''}`} />
            </button>
          </span>

          <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full font-black border border-amber-300/30">
            কিবলা কোন: {qiblaAngle}° WSW
          </span>
        </div>

        {/* Compass Dial Canvas Visual */}
        <div className="my-6 flex justify-center items-center">
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-emerald-900/60 border-4 border-amber-300/40 flex items-center justify-center relative card-shadow shadow-2xl backdrop-blur-md">
            {/* Compass Dial Outer Ring */}
            <div 
              className="w-full h-full rounded-full absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              <span className="absolute top-2 font-black text-sm text-amber-300">N (উত্তর)</span>
              <span className="absolute right-3 font-black text-sm text-amber-200">E (পূর্ব)</span>
              <span className="absolute bottom-2 font-black text-sm text-amber-200">S (দক্ষিণ)</span>
              <span className="absolute left-3 font-black text-sm text-amber-300">W (পশ্চিম)</span>
              
              {/* Dial Marks */}
              <div className="w-full h-[1px] bg-white/20 absolute" />
              <div className="h-full w-[1px] bg-white/20 absolute" />
            </div>

            {/* Qibla Kaaba Pointer */}
            <div
              className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-300 pointer-events-none"
              style={{ transform: `rotate(${relativeQibla}deg)` }}
            >
              <div className="flex flex-col items-center -mt-24">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-charcoal flex items-center justify-center text-lg shadow-xl font-bold border-2 border-white animate-pulse">
                  🕋
                </div>
                <div className="w-1.5 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full shadow-md" />
              </div>
            </div>

            {/* Center Compass Axis */}
            <div className="w-10 h-10 rounded-full bg-white text-forest flex items-center justify-center text-xs font-bold shadow-lg z-10 border-2 border-amber-300">
              <CompassIcon className="w-6 h-6 text-emerald-900 animate-spin-slow" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-amber-200/90 font-bold">
            ক্বাবা শরীফের আনুমানিক দূরত্ব: {distanceKm.toLocaleString('bn-BD')} কিমি (মক্কা মুকাররমা)
          </p>
          <p className="text-[11px] text-emerald-100 font-medium">
            বর্তমান মোবাইলের দিক: <span className="font-bold text-amber-300">{heading}°</span> • কিবলা সমন্বয়: <span className="font-bold text-amber-300">{relativeQibla}°</span>
          </p>
        </div>

        {/* Preset Direction Quick Selector & Slider */}
        <div className="mt-4 pt-3 border-t border-white/15 space-y-2.5">
          <div className="flex justify-between items-center text-[11px] text-emerald-100 font-bold">
            <span>মোবাইলের দিক সমন্বয় slider:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setHeading(0)}
                className="bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md text-[10px] text-amber-200 border border-white/20 cursor-pointer"
              >
                উত্তর (0°)
              </button>
              <button
                onClick={() => setHeading(270)}
                className="bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md text-[10px] text-amber-200 border border-white/20 cursor-pointer"
              >
                পশ্চিম (270°)
              </button>
              <button
                onClick={() => setHeading(qiblaAngle)}
                className="bg-amber-400 text-charcoal px-2 py-0.5 rounded-md text-[10px] font-black border border-amber-300 cursor-pointer shadow-xs"
              >
                সোজা কিবলা ({qiblaAngle}°)
              </button>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="360"
            value={heading}
            onChange={(e) => setHeading(Number(e.target.value))}
            className="w-full accent-amber-300 cursor-pointer"
          />
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-forest shrink-0 mt-0.5" />
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong>পরামর্শ:</strong> সঠিক দিক নির্ণয়ের জন্য মোবাইলটি সমতল জায়গায় রাখুন। বাংলাদেশে ক্বাবা শরীফ পশ্চিম দিক থেকে সামান্য দক্ষিণ-পশ্চিমে (২৭৮° কোণে) অবস্থিত।
        </p>
      </div>
    </div>
  );
};
