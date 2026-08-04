import React from 'react';
import { Bell, X, CheckCircle2, Clock, Volume2 } from 'lucide-react';
import { Language } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      titleBn: 'আসর ওয়াক্তের আযান',
      titleEn: 'Asr Prayer Azan Alert',
      timeBn: '১০ মিনিট আগে',
      timeEn: '10 mins ago',
      descBn: 'আসর সালাতের সময় শুরু হয়েছে (৪:৩০ PM)। জামাতে আদায় করুন।',
      type: 'prayer'
    },
    {
      id: '2',
      titleBn: 'রমজান কাউন্টডাউন',
      titleEn: 'Ramadan Countdown',
      timeBn: 'আজ সকালে',
      timeEn: 'This morning',
      descBn: 'আজ ১৭ রমজান ১৪৪৭ হিজরি। মাগরিবের ইফতারের সময় ৬:১৫ PM।',
      type: 'event'
    },
    {
      id: '3',
      titleBn: 'দৈনিক সুন্নাহ আমল রিমাইন্ডার',
      titleEn: 'Daily Sunnah Practice',
      timeBn: 'গতকাল',
      timeEn: 'Yesterday',
      descBn: 'আজকের সকালে আয়াতুল কুরসী ও ৩ কূল পাঠ করা সম্পন্ন করুন।',
      type: 'dhikr'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-xs rounded-2xl shadow-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-forest" />
            <h3 className="text-sm font-bold text-charcoal">
              {language === 'BN' ? 'নোটিফিকেশন সেন্টার' : 'Notification Center'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-mint/30 rounded-xl border border-forest/10 relative"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-forest">
                  {language === 'BN' ? item.titleBn : item.titleEn}
                </span>
                <span className="text-[10px] text-gray-400">{item.timeBn}</span>
              </div>
              <p className="text-xs text-gray-600 leading-snug">{item.descBn}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-forest text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-forest-dark smooth-press cursor-pointer"
        >
          {language === 'BN' ? 'বন্ধ করুন' : 'Close'}
        </button>
      </div>
    </div>
  );
};
