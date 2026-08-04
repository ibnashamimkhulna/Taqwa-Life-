import React from 'react';
import { AppSettings, Language } from '../../types';
import { DISTRICTS_BD } from '../../data/prayersData';
import { ArrowLeft, Sliders, Bell, Volume2, Globe, Type, Shield } from 'lucide-react';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  onBack: () => void;
  language: Language;
  onToggleLang: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onBack,
  language,
  onToggleLang
}) => {
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

        <h3 className="text-sm font-bold text-charcoal">অ্যাপ সেটিংস</h3>

        <div className="w-8" />
      </div>

      {/* Language Option */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-forest" />
            <div>
              <h4 className="text-xs font-bold text-charcoal">ভাষা (Language)</h4>
              <p className="text-[10px] text-gray-500">বাংলা অথবা English বেছে নিন</p>
            </div>
          </div>

          <button
            onClick={onToggleLang}
            className="text-xs font-bold text-forest bg-mint px-3 py-1.5 rounded-xl border border-forest/10 hover:bg-forest hover:text-white transition-colors cursor-pointer"
          >
            {language === 'BN' ? 'বাংলা (BN)' : 'English (EN)'}
          </button>
        </div>
      </div>

      {/* Prayer Settings */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3">
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider border-b border-gray-100 pb-2">
          সালাতের সময়সূচী সেটিংস
        </h4>

        {/* District */}
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-gray-700">জেলা নির্বাচন</span>
          <select
            value={settings.district}
            onChange={(e) => onUpdateSettings({ ...settings, district: e.target.value })}
            className="text-xs font-bold text-charcoal bg-mint/30 px-2.5 py-1.5 rounded-xl outline-none border border-forest/10 cursor-pointer"
          >
            {DISTRICTS_BD.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Madhhab */}
        <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-50">
          <span className="font-medium text-gray-700">মাযহাব (আসর সময়)</span>
          <select
            value={settings.madhhab}
            onChange={(e) =>
              onUpdateSettings({ ...settings, madhhab: e.target.value as 'Hanafi' | 'Shafi' })
            }
            className="text-xs font-bold text-charcoal bg-mint/30 px-2.5 py-1.5 rounded-xl outline-none border border-forest/10 cursor-pointer"
          >
            <option value="Hanafi">হানাফী (Hanafi)</option>
            <option value="Shafi">শাফেয়ী / হাম্বলী / মালেকী</option>
          </select>
        </div>

        {/* Notifications toggle */}
        <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-50">
          <span className="font-medium text-gray-700">আযান অ্যালার্ট শব্দ</span>
          <button
            onClick={() =>
              onUpdateSettings({ ...settings, audioNotifications: !settings.audioNotifications })
            }
            className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
              settings.audioNotifications ? 'bg-forest' : 'bg-gray-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.audioNotifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Font Size Settings */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3">
        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider border-b border-gray-100 pb-2">
          কুরআন ফন্ট সাইজ
        </h4>

        <div className="flex items-center gap-3 text-xs">
          <Type className="w-4 h-4 text-forest shrink-0" />
          <input
            type="range"
            min="20"
            max="36"
            value={settings.arabicFontSize}
            onChange={(e) =>
              onUpdateSettings({ ...settings, arabicFontSize: Number(e.target.value) })
            }
            className="w-full accent-forest cursor-pointer"
          />
          <span className="font-bold text-forest min-w-[32px] text-right">
            {settings.arabicFontSize}px
          </span>
        </div>
      </div>
    </div>
  );
};
