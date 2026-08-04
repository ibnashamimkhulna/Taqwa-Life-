import { PrayerTime } from '../types';

// District time offsets (in minutes relative to Dhaka)
const DISTRICT_OFFSETS: Record<string, number> = {
  'ঢাকা (Dhaka)': 0,
  'চট্টগ্রাম (Chittagong)': -5,
  'সিলেট (Sylhet)': -6,
  'রাজশাহী (Rajshahi)': 7,
  'খুলনা (Khulna)': 5,
  'বরিশাল (Barisal)': 2,
  'রংপুর (Rangpur)': 6,
  'ময়মনসিংহ (Mymensingh)': 1,
  'কুমিল্লা (Comilla)': -3,
  'নোয়াখালী (Noakhali)': -2,
  'বগুড়া (Bogra)': 4,
  'ফেনী (Feni)': -3
};

// Standard base prayer times for Dhaka (in 24-hour format)
const BASE_TIMES = {
  fajr: { hour: 4, minute: 22 },
  sunrise: { hour: 5, minute: 40 },
  ishraq: { hour: 6, minute: 0 },
  duha: { hour: 9, minute: 30 },
  dhuhr: { hour: 12, minute: 15 },
  asr: { hour: 16, minute: 30 },
  maghrib: { hour: 18, minute: 35 },
  isha: { hour: 20, minute: 0 },
  tahajjud: { hour: 2, minute: 30 }
};

// Convert English numbers to Bangla digits
export function toBanglaNumber(num: number | string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((char) => (char >= '0' && char <= '9' ? banglaDigits[parseInt(char, 10)] : char))
    .join('');
}

// Format time as 12-hour AM/PM string
export function format12Hour(hour: number, minute: number, lang: 'BN' | 'EN' = 'BN'): string {
  const period = hour >= 12 ? (lang === 'BN' ? 'PM' : 'PM') : (lang === 'BN' ? 'AM' : 'AM');
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const hourStr = formattedHour < 10 ? `0${formattedHour}` : `${formattedHour}`;
  const minStr = minute < 10 ? `0${minute}` : `${minute}`;

  if (lang === 'BN') {
    return `${toBanglaNumber(hourStr)}:${toBanglaNumber(minStr)} ${period}`;
  }
  return `${hourStr}:${minStr} ${period}`;
}

// Format date to Bangla Hijri Date
export function getBanglaHijriDate(date: Date = new Date()): string {
  // Approximate Hijri conversion algorithm for Bangladesh region
  const day = date.getDate();
  const month = date.getMonth(); // 0 - 11
  const year = date.getFullYear();

  // Simple Islamic month calendar mapping approximation
  const hijriMonthsBn = [
    'মহররম', 'সফর', 'রবীউল আউয়াল', 'রবীউস সানী',
    'জমাদিউল আউয়াল', 'জমাদিউস সানী', 'রজব', 'শা’বান',
    'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ্জ'
  ];

  // Calculated approximate day in Hijri year 1448 / 1447
  // Reference: August 2026 ~ Rabi' al-Awwal / Rabi' al-Thani 1448 AH
  let hijriDay = ((day + 18) % 30) || 1;
  let hijriMonthIndex = (month + 1) % 12; // Approx mapping
  let hijriYear = year - 578;

  return `${toBanglaNumber(hijriDay)} ${hijriMonthsBn[hijriMonthIndex]} ${toBanglaNumber(hijriYear)} হিজরি`;
}

export interface DynamicPrayerState {
  currentWaqt: PrayerTime;
  nextWaqt: PrayerTime;
  currentTimeFormatted: string;
  remainingTimeFormatted: string;
  remainingSeconds: number;
  hijriDateBn: string;
  prayersList: PrayerTime[];
}

export function calculatePrayerTimes(
  district: string = 'ঢাকা (Dhaka)',
  now: Date = new Date()
): DynamicPrayerState {
  const offset = DISTRICT_OFFSETS[district] || 0;

  // Helper to construct a Date object for today with given base time + offset
  const createPrayerDate = (base: { hour: number; minute: number }, addDays = 0): Date => {
    const d = new Date(now);
    d.setDate(d.getDate() + addDays);
    d.setHours(base.hour, base.minute + offset, 0, 0);
    return d;
  };

  const fajrDate = createPrayerDate(BASE_TIMES.fajr);
  const sunriseDate = createPrayerDate(BASE_TIMES.sunrise);
  const ishraqDate = createPrayerDate(BASE_TIMES.ishraq);
  const duhaDate = createPrayerDate(BASE_TIMES.duha);
  const dhuhrDate = createPrayerDate(BASE_TIMES.dhuhr);
  const asrDate = createPrayerDate(BASE_TIMES.asr);
  const maghribDate = createPrayerDate(BASE_TIMES.maghrib);
  const ishaDate = createPrayerDate(BASE_TIMES.isha);
  const tahajjudDate = createPrayerDate(BASE_TIMES.tahajjud);

  // Next Day Fajr for midnight/isha calculations
  const nextFajrDate = createPrayerDate(BASE_TIMES.fajr, 1);

  // Array of prayers with their target Date objects
  const prayerConfig = [
    {
      id: 'tahajjud',
      nameBn: 'তাহাজ্জুদ',
      nameEn: 'Tahajjud',
      date: tahajjudDate,
      isNafl: true,
      descriptionBn: 'রাতের শেষ তৃতীয়াংশে বিশেষ নফল সালাত (২-১২ রাকাত)',
      descriptionEn: 'Late night voluntary prayer (2-12 Rakat)'
    },
    {
      id: 'fajr',
      nameBn: 'ফজর',
      nameEn: 'Fajr',
      date: fajrDate,
      descriptionBn: 'ফজরের সালাত ২ রাকাত সুন্নাত ও ২ রাকাত ফরজ',
      descriptionEn: 'Fajr prayer 2 Sunnah & 2 Farz'
    },
    {
      id: 'sunrise',
      nameBn: 'সূর্যোদয়',
      nameEn: 'Sunrise',
      date: sunriseDate,
      isNafl: true,
      descriptionBn: 'সূর্যোদয়ের সময় সালাত নিষিদ্ধ',
      descriptionEn: 'Sunrise time (Prayer forbidden)'
    },
    {
      id: 'ishraq',
      nameBn: 'ইশরাক',
      nameEn: 'Ishraq',
      date: ishraqDate,
      isNafl: true,
      descriptionBn: 'সূর্যোদয়ের ১৫-২০ মিনিট পর। ২ থেকে ৪ রাকাত সালাত',
      descriptionEn: '15-20 mins after sunrise. 2 to 4 Rakat'
    },
    {
      id: 'duha',
      nameBn: 'দুহা (চাশত)',
      nameEn: 'Duha (Chasht)',
      date: duhaDate,
      isNafl: true,
      descriptionBn: 'পূর্বাহ্নের বিশেষ নফল ইবাদত। ২, ৪, ৮ বা ১২ রাকাত',
      descriptionEn: 'Mid-morning voluntary prayer. 2 to 12 Rakat'
    },
    {
      id: 'dhuhr',
      nameBn: 'জোহর',
      nameEn: 'Dhuhr',
      date: dhuhrDate,
      descriptionBn: '৪ সুন্নাত, ৪ ফরজ, ২ সুন্নাত, ২ নফল',
      descriptionEn: '4 Sunnah, 4 Farz, 2 Sunnah, 2 Nafl'
    },
    {
      id: 'asr',
      nameBn: 'আসর',
      nameEn: 'Asr',
      date: asrDate,
      descriptionBn: '৪ রাকাত ফরজ (পূর্বের ৪ রাকাত সুন্নাত গায়রে মুয়াক্কাদা)',
      descriptionEn: '4 Farz prayer'
    },
    {
      id: 'maghrib',
      nameBn: 'মাগরিব',
      nameEn: 'Maghrib',
      date: maghribDate,
      descriptionBn: '৩ ফরজ, ২ সুন্নাত, ২ নফল (ইফতারের পর)',
      descriptionEn: '3 Farz, 2 Sunnah, 2 Nafl'
    },
    {
      id: 'isha',
      nameBn: 'ইশা',
      nameEn: 'Isha',
      date: ishaDate,
      descriptionBn: '৪ ফরজ, ২ সুন্নাত, ৩ বিতর সালাত',
      descriptionEn: '4 Farz, 2 Sunnah, 3 Witr'
    }
  ];

  // Determine current active prayer and next prayer based on current time
  const nowMs = now.getTime();

  let activeIndex = 0;
  let nextIndex = 1;

  if (nowMs >= ishaDate.getTime() || nowMs < fajrDate.getTime()) {
    // Night time (Isha / Tahajjud / Pre-Fajr)
    if (nowMs >= tahajjudDate.getTime() && nowMs < fajrDate.getTime()) {
      activeIndex = 0; // Tahajjud
      nextIndex = 1;   // Fajr
    } else {
      activeIndex = 8; // Isha
      nextIndex = 1;   // Fajr
    }
  } else if (nowMs >= fajrDate.getTime() && nowMs < sunriseDate.getTime()) {
    activeIndex = 1; // Fajr
    nextIndex = 2;   // Sunrise
  } else if (nowMs >= sunriseDate.getTime() && nowMs < dhuhrDate.getTime()) {
    if (nowMs >= ishraqDate.getTime() && nowMs < duhaDate.getTime()) {
      activeIndex = 3; // Ishraq
    } else if (nowMs >= duhaDate.getTime()) {
      activeIndex = 4; // Duha
    } else {
      activeIndex = 2; // Sunrise
    }
    nextIndex = 5; // Dhuhr
  } else if (nowMs >= dhuhrDate.getTime() && nowMs < asrDate.getTime()) {
    activeIndex = 5; // Dhuhr
    nextIndex = 6;   // Asr
  } else if (nowMs >= asrDate.getTime() && nowMs < maghribDate.getTime()) {
    activeIndex = 6; // Asr
    nextIndex = 7;   // Maghrib
  } else if (nowMs >= maghribDate.getTime() && nowMs < ishaDate.getTime()) {
    activeIndex = 7; // Maghrib
    nextIndex = 8;   // Isha
  }

  // Calculate target date for next prayer
  let nextTargetDate = prayerConfig[nextIndex].date;
  if (nextIndex === 1 && nowMs >= ishaDate.getTime()) {
    // Next Fajr is tomorrow
    nextTargetDate = nextFajrDate;
  }

  // Calculate remaining seconds to next prayer
  const diffMs = Math.max(0, nextTargetDate.getTime() - nowMs);
  const diffSec = Math.floor(diffMs / 1000);

  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const remainingTimeFormatted = `${toBanglaNumber(pad(hours))}:${toBanglaNumber(pad(minutes))}:${toBanglaNumber(pad(seconds))}`;

  // Current clock time string
  const currHour = now.getHours();
  const currMin = now.getMinutes();
  const currentTimeFormatted = format12Hour(currHour, currMin, 'BN');

  // Build list of all prayers with dynamically calculated statuses
  const prayersList: PrayerTime[] = prayerConfig.map((item, idx) => {
    let status: 'past' | 'current' | 'next' | 'upcoming' = 'upcoming';

    if (idx === activeIndex) {
      status = 'current';
    } else if (idx === nextIndex) {
      status = 'next';
    } else if (item.date.getTime() < nowMs) {
      status = 'past';
    } else {
      status = 'upcoming';
    }

    return {
      id: item.id,
      nameBn: item.nameBn,
      nameEn: item.nameEn,
      time: format12Hour(item.date.getHours(), item.date.getMinutes(), 'BN'),
      status,
      isNafl: item.isNafl,
      descriptionBn: item.descriptionBn,
      descriptionEn: item.descriptionEn
    };
  });

  const activeItem = prayerConfig[activeIndex];
  const nextItem = prayerConfig[nextIndex];

  const currentWaqt: PrayerTime = {
    id: activeItem.id,
    nameBn: activeItem.nameBn,
    nameEn: activeItem.nameEn,
    time: format12Hour(activeItem.date.getHours(), activeItem.date.getMinutes(), 'BN'),
    status: 'current',
    isNafl: activeItem.isNafl,
    descriptionBn: activeItem.descriptionBn,
    descriptionEn: activeItem.descriptionEn
  };

  const nextWaqt: PrayerTime = {
    id: nextItem.id,
    nameBn: nextItem.nameBn,
    nameEn: nextItem.nameEn,
    time: format12Hour(nextTargetDate.getHours(), nextTargetDate.getMinutes(), 'BN'),
    status: 'next',
    isNafl: nextItem.isNafl,
    descriptionBn: nextItem.descriptionBn,
    descriptionEn: nextItem.descriptionEn
  };

  return {
    currentWaqt,
    nextWaqt,
    currentTimeFormatted,
    remainingTimeFormatted,
    remainingSeconds: diffSec,
    hijriDateBn: getBanglaHijriDate(now),
    prayersList
  };
}
