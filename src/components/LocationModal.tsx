import React, { useState } from 'react';
import { X, Navigation, Search, Check, MapPin, Compass } from 'lucide-react';
import { ALL_BANGLADESH_DISTRICTS, findNearestDistrict, DistrictInfo, toBanglaNumber } from '../utils/prayerCalculator';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistrict: string;
  onSelectDistrict: (districtName: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentDistrict,
  onSelectDistrict
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredDistricts = ALL_BANGLADESH_DISTRICTS.filter(
    (d) =>
      d.nameBn.includes(searchQuery) ||
      d.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper for IP Geolocation fallback
  const fetchIpLocation = async (): Promise<{ lat: number; lon: number; cityName?: string } | null> => {
    try {
      const res = await fetch('https://ipwho.is/');
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.latitude && data.longitude) {
          return { lat: data.latitude, lon: data.longitude, cityName: data.city };
        }
      }
    } catch (e) {
      console.warn('ipwho.is failed');
    }

    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        if (data && data.latitude && data.longitude) {
          return { lat: data.latitude, lon: data.longitude, cityName: data.city };
        }
      }
    } catch (e) {
      console.warn('ipapi.co failed');
    }

    return null;
  };

  const handleGpsDetect = () => {
    setIsGpsLoading(true);
    setStatusMessage('অবস্থান ও লোকেশন খোঁজা হচ্ছে...');

    const applyLocation = (lat: number, lon: number, method: string) => {
      setIsGpsLoading(false);
      const nearest = findNearestDistrict(lat, lon);
      onSelectDistrict(nearest.fullName);
      setStatusMessage(`${method} সফল! আপনার জেলা '${nearest.fullName}' সনাক্ত করা হয়েছে।`);
      setTimeout(() => {
        onClose();
      }, 1200);
    };

    const tryIpFallback = async () => {
      setStatusMessage('নেটওয়ার্ক (IP) দিয়ে লোকেশন সনাক্ত করা হচ্ছে...');
      const ipLoc = await fetchIpLocation();
      if (ipLoc) {
        applyLocation(ipLoc.lat, ipLoc.lon, 'অটো নেটওয়ার্ক (IP)');
      } else {
        setIsGpsLoading(false);
        setStatusMessage('GPS বা নেটওয়ার্ক থেকে লোকেশন পাওয়া যায়নি। ম্যানুয়ালি নিচ থেকে জেলা সিলেক্ট করুন।');
      }
    };

    if (!('geolocation' in navigator)) {
      tryIpFallback();
      return;
    }

    // Attempt 1: Low Accuracy GPS (Fastest and works best in Mobile WebViews/APKs)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        applyLocation(pos.coords.latitude, pos.coords.longitude, 'GPS');
      },
      (err1) => {
        console.warn('GPS low-accuracy failed/timed out:', err1);
        // Attempt 2: High Accuracy GPS
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            applyLocation(pos.coords.latitude, pos.coords.longitude, 'GPS');
          },
          (err2) => {
            console.warn('GPS high-accuracy failed:', err2);
            // Attempt 3: IP Geolocation Fallback
            tryIpFallback();
          },
          { enableHighAccuracy: true, timeout: 6000, maximumAge: 60000 }
        );
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-emerald-100">
        
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-900 via-forest to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-amber-200">অবস্থান ও জেলা নির্বাচন</h3>
              <p className="text-[11px] text-emerald-200">সঠিক সালাতের সময়সূচীর জন্য লোকেশন সিলেক্ট করুন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3.5 overflow-y-auto flex-1">
          
          {/* GPS Auto Detect Button */}
          <button
            onClick={handleGpsDetect}
            disabled={isGpsLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-black p-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-98 border border-amber-300 cursor-pointer disabled:opacity-75"
          >
            <Navigation className={`w-5 h-5 text-slate-950 ${isGpsLoading ? 'animate-spin' : 'animate-bounce'}`} />
            <span className="text-sm tracking-wide">
              {isGpsLoading ? 'ডিভাইসের অবস্থান সনাক্ত করা হচ্ছে...' : 'GPS দিয়ে অটো লোকেশন ট্র্যাক করুন'}
            </span>
          </button>

          {/* Status Message */}
          {statusMessage && (
            <div className={`p-3 rounded-xl text-xs font-bold text-center border ${
              statusMessage.includes('সফল') 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}>
              {statusMessage}
            </div>
          )}

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বাংলাদেশের ৬৪টি জেলার নাম খুঁজুন (যেমন: সিলেট, Rangpur)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* District List Header */}
          <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex justify-between px-1">
            <span>সকল জেলা ({filteredDistricts.length})</span>
            <span>ঢাকার সাথে সময়ের পার্থক্য</span>
          </div>

          {/* District Grid/List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
            {filteredDistricts.map((dist) => {
              const isSelected = currentDistrict === dist.fullName || currentDistrict === dist.nameBn;
              const offsetDisplay =
                dist.offset === 0
                  ? 'একই সময়'
                  : dist.offset > 0
                  ? `+${toBanglaNumber(dist.offset)} মিনিট`
                  : `${toBanglaNumber(dist.offset)} মিনিট`;

              return (
                <button
                  key={dist.fullName}
                  onClick={() => {
                    onSelectDistrict(dist.fullName);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-amber-300 shadow-md'
                      : 'bg-white hover:bg-emerald-50/80 text-slate-800 border-slate-200/80'
                  }`}
                >
                  <div>
                    <div className="font-extrabold text-xs flex items-center gap-1.5">
                      <span>{dist.nameBn}</span>
                      <span className={`text-[10px] font-normal opacity-70 ${isSelected ? 'text-amber-200' : 'text-slate-500'}`}>
                        ({dist.nameEn})
                      </span>
                    </div>
                    <div className={`text-[10px] font-bold mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {offsetDisplay}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 font-bold">
          আপনার জেলা নির্বাচন করার পর পুরো অ্যাপের নামাজের সময়সূচী অনুযায়ী আপডেট হয়ে যাবে।
        </div>

      </div>
    </div>
  );
};
