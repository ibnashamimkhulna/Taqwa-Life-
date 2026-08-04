export type TabType = 'home' | 'salah' | 'dhikr' | 'quran' | 'profile';
export type Language = 'BN' | 'EN';

export type FeatureKey = 
  | 'Prayer Times'
  | 'Qaza Salah'
  | 'Hijri Calendar'
  | 'Tahajjud'
  | 'Ishraq'
  | 'Duha'
  | 'Holy Quran'
  | 'Daily Adhkar'
  | 'Qibla Compass'
  | 'Progress'
  | 'Goals'
  | 'Settings';

export interface PrayerTime {
  id: string;
  nameBn: string;
  nameEn: string;
  time: string; // e.g. "04:30 AM"
  isNafl?: boolean;
  status: 'past' | 'current' | 'next' | 'upcoming';
  descriptionBn?: string;
  descriptionEn?: string;
}

export interface QazaRecord {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  witr: number;
}

export interface Surah {
  number: number;
  nameArabic: string;
  nameBn: string;
  nameEn: string;
  meaningBn: string;
  meaningEn: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  audioUrl?: string;
}

export interface Verse {
  number: number;
  arabic: string;
  transliteration: string;
  translationBn: string;
  translationEn: string;
}

export interface DhikrItem {
  id: string;
  titleBn: string;
  titleEn: string;
  arabic: string;
  transliteration: string;
  meaningBn: string;
  meaningEn: string;
  target: number;
  count: number;
  category: 'morning' | 'evening' | 'post_prayer' | 'tasbeeh' | 'daily';
  virtueBn?: string;
}

export interface IslamicEvent {
  dateHijri: string;
  dateGregorian: string;
  titleBn: string;
  titleEn: string;
  category: 'fasting' | 'festival' | 'night' | 'general';
  descriptionBn: string;
}

export interface HabitGoal {
  id: string;
  titleBn: string;
  titleEn: string;
  completed: boolean;
  streak: number;
  category: 'salah' | 'quran' | 'dhikr' | 'charity';
}

export interface AppSettings {
  language: Language;
  district: string;
  madhhab: 'Hanafi' | 'Shafi';
  calculationMethod: 'Karachi' | 'ISNA' | 'MWL' | 'Makkah';
  audioNotifications: boolean;
  vibration: boolean;
  arabicFontSize: number;
}
