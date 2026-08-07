import { PrayerTime, QazaRecord } from '../types';
import { ALL_BANGLADESH_DISTRICTS } from '../utils/prayerCalculator';

export const DISTRICTS_BD = ALL_BANGLADESH_DISTRICTS.map((d) => d.fullName);

export const INITIAL_PRAYER_TIMES: PrayerTime[] = [
  {
    id: 'fajr',
    nameBn: 'ফজর',
    nameEn: 'Fajr',
    time: '04:22 AM',
    status: 'past',
    descriptionBn: 'ফজরের সালাত ২ রাকাত সুন্নাত ও ২ রাকাত ফরজ',
    descriptionEn: 'Fajr prayer 2 Sunnah & 2 Farz'
  },
  {
    id: 'sunrise',
    nameBn: 'সূর্যোদয়',
    nameEn: 'Sunrise',
    time: '05:40 AM',
    status: 'past',
    isNafl: true,
    descriptionBn: 'সূর্যোদয়ের সময় সালাত নিষিদ্ধ',
    descriptionEn: 'Sunrise time (Prayer forbidden)'
  },
  {
    id: 'ishraq',
    nameBn: 'ইশরাক',
    nameEn: 'Ishraq',
    time: '06:00 AM',
    isNafl: true,
    status: 'past',
    descriptionBn: 'সূর্যোদয়ের ১৫-২০ মিনিট পর। ২ থেকে ৪ রাকাত সালাত',
    descriptionEn: '15-20 mins after sunrise. 2 to 4 Rakat'
  },
  {
    id: 'duha',
    nameBn: 'দুহা (চাশত)',
    nameEn: 'Duha (Chasht)',
    time: '09:30 AM',
    isNafl: true,
    status: 'past',
    descriptionBn: 'পূর্বাহ্নের বিশেষ নফল ইবাদত। ২, ৪, ৮ বা ১২ রাকাত',
    descriptionEn: 'Mid-morning voluntary prayer. 2 to 12 Rakat'
  },
  {
    id: 'dhuhr',
    nameBn: 'জোহর',
    nameEn: 'Dhuhr',
    time: '12:15 PM',
    status: 'past',
    descriptionBn: '৪ সুন্নাত, ৪ ফরজ, ২ সুন্নাত, ২ নফল',
    descriptionEn: '4 Sunnah, 4 Farz, 2 Sunnah, 2 Nafl'
  },
  {
    id: 'asr',
    nameBn: 'আসর',
    nameEn: 'Asr',
    time: '04:30 PM',
    status: 'current',
    descriptionBn: '৪ রাকাত ফরজ (পূর্বের ৪ রাকাত সুন্নাত গায়রে মুয়াক্কাদা)',
    descriptionEn: '4 Farz prayer'
  },
  {
    id: 'maghrib',
    nameBn: 'মাগরিব',
    nameEn: 'Maghrib',
    time: '06:35 PM',
    status: 'next',
    descriptionBn: '৩ ফরজ, ২ সুন্নাত, ২ নফল (ইফতারের পর)',
    descriptionEn: '3 Farz, 2 Sunnah, 2 Nafl'
  },
  {
    id: 'isha',
    nameBn: 'ইশা',
    nameEn: 'Isha',
    time: '08:00 PM',
    status: 'upcoming',
    descriptionBn: '৪ ফরজ, ২ সুন্নাত, ৩ বিতর সালাত',
    descriptionEn: '4 Farz, 2 Sunnah, 3 Witr'
  },
  {
    id: 'tahajjud',
    nameBn: 'তাহাজ্জুদ',
    nameEn: 'Tahajjud',
    time: '02:30 AM',
    isNafl: true,
    status: 'upcoming',
    descriptionBn: 'রাতের শেষ তৃতীয়াংশে বিশেষ নফল সালাত (২-১২ রাকাত)',
    descriptionEn: 'Late night voluntary prayer (2-12 Rakat)'
  }
];

export const INITIAL_QAZA_RECORD: QazaRecord = {
  fajr: 14,
  dhuhr: 8,
  asr: 12,
  maghrib: 5,
  isha: 18,
  witr: 10
};
