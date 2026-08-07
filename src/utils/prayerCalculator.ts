import { PrayerTime } from '../types';

export interface DistrictInfo {
  nameBn: string;
  nameEn: string;
  fullName: string;
  lat: number;
  lon: number;
  offset: number; // minutes relative to Dhaka
}

export const ALL_BANGLADESH_DISTRICTS: DistrictInfo[] = [
  { nameBn: 'ঢাকা', nameEn: 'Dhaka', fullName: 'ঢাকা (Dhaka)', lat: 23.8103, lon: 90.4125, offset: 0 },
  { nameBn: 'চট্টগ্রাম', nameEn: 'Chittagong', fullName: 'চট্টগ্রাম (Chittagong)', lat: 22.3569, lon: 91.7832, offset: -5 },
  { nameBn: 'সিলেট', nameEn: 'Sylhet', fullName: 'সিলেট (Sylhet)', lat: 24.8949, lon: 91.8687, offset: -6 },
  { nameBn: 'রাজশাহী', nameEn: 'Rajshahi', fullName: 'রাজশাহী (Rajshahi)', lat: 24.3745, lon: 88.6042, offset: 7 },
  { nameBn: 'খুলনা', nameEn: 'Khulna', fullName: 'খুলনা (Khulna)', lat: 22.8456, lon: 89.5403, offset: 5 },
  { nameBn: 'বরিশাল', nameEn: 'Barisal', fullName: 'বরিশাল (Barisal)', lat: 22.7010, lon: 90.3535, offset: 2 },
  { nameBn: 'রংপুর', nameEn: 'Rangpur', fullName: 'রংপুর (Rangpur)', lat: 25.7439, lon: 89.2752, offset: 6 },
  { nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', fullName: 'ময়মনসিংহ (Mymensingh)', lat: 24.7471, lon: 90.4203, offset: 1 },
  { nameBn: 'কুমিল্লা', nameEn: 'Cumilla', fullName: 'কুমিল্লা (Cumilla)', lat: 23.4607, lon: 91.1809, offset: -3 },
  { nameBn: 'নোয়াখালী', nameEn: 'Noakhali', fullName: 'নোয়াখালী (Noakhali)', lat: 22.8696, lon: 91.0991, offset: -2 },
  { nameBn: 'বগুড়া', nameEn: 'Bogra', fullName: 'বগুড়া (Bogra)', lat: 24.8481, lon: 89.3730, offset: 4 },
  { nameBn: 'ফেনী', nameEn: 'Feni', fullName: 'ফেনী (Feni)', lat: 23.0159, lon: 91.3976, offset: -3 },
  { nameBn: 'কুড়িগ্রাম', nameEn: 'Kurigram', fullName: 'কুড়িগ্রাম (Kurigram)', lat: 25.8054, lon: 89.6361, offset: 7 },
  { nameBn: 'দিনাজপুর', nameEn: 'Dinajpur', fullName: 'দিনাজপুর (Dinajpur)', lat: 25.6217, lon: 88.6354, offset: 8 },
  { nameBn: 'কক্সবাজার', nameEn: 'Cox\'s Bazar', fullName: 'কক্সবাজার (Cox\'s Bazar)', lat: 21.4272, lon: 92.0058, offset: -6 },
  { nameBn: 'যশোর', nameEn: 'Jashore', fullName: 'যশোর (Jashore)', lat: 23.1664, lon: 89.2081, offset: 6 },
  { nameBn: 'কুষ্টিয়া', nameEn: 'Kushtia', fullName: 'কুষ্টিয়া (Kushtia)', lat: 23.9013, lon: 88.9560, offset: 6 },
  { nameBn: 'টাঙ্গাইল', nameEn: 'Tangail', fullName: 'টাঙ্গাইল (Tangail)', lat: 24.2513, lon: 89.9167, offset: 2 },
  { nameBn: 'পাবনা', nameEn: 'Pabna', fullName: 'পাবনা (Pabna)', lat: 24.0108, lon: 89.2330, offset: 5 },
  { nameBn: 'ফরিদপুর', nameEn: 'Faridpur', fullName: 'ফরিদপুর (Faridpur)', lat: 23.6070, lon: 89.8429, offset: 2 },
  { nameBn: 'গাজীপুর', nameEn: 'Gazipur', fullName: 'গাজীপুর (Gazipur)', lat: 23.9999, lon: 90.4203, offset: 0 },
  { nameBn: 'নারায়ণগঞ্জ', nameEn: 'Narayanganj', fullName: 'নারায়ণগঞ্জ (Narayanganj)', lat: 23.6238, lon: 90.5000, offset: -1 },
  { nameBn: 'ভোলা', nameEn: 'Bhola', fullName: 'ভোলা (Bhola)', lat: 22.6859, lon: 90.6482, offset: -1 },
  { nameBn: 'পটুয়াখালী', nameEn: 'Patuakhali', fullName: 'পটুয়াখালী (Patuakhali)', lat: 22.3596, lon: 90.3298, offset: 1 },
  { nameBn: 'চাঁদপুর', nameEn: 'Chandpur', fullName: 'চাঁদপুর (Chandpur)', lat: 23.2333, lon: 90.6667, offset: -2 },
  { nameBn: 'ব্রাহ্মণবাড়িয়া', nameEn: 'Brahmanbaria', fullName: 'ব্রাহ্মণবাড়িয়া (Brahmanbaria)', lat: 23.9571, lon: 91.1119, offset: -3 },
  { nameBn: 'বাগেরহাট', nameEn: 'Bagerhat', fullName: 'বাগেরহাট (Bagerhat)', lat: 22.6516, lon: 89.7859, offset: 4 },
  { nameBn: 'বান্দরবান', nameEn: 'Bandarban', fullName: 'বান্দরবান (Bandarban)', lat: 21.8311, lon: 92.3686, offset: -7 },
  { nameBn: 'বরগুনা', nameEn: 'Barguna', fullName: 'বরগুনা (Barguna)', lat: 22.1570, lon: 90.1223, offset: 2 },
  { nameBn: 'চুয়াডাঙ্গা', nameEn: 'Chuadanga', fullName: 'চুয়াডাঙ্গা (Chuadanga)', lat: 23.6401, lon: 88.8418, offset: 7 },
  { nameBn: 'গাইবান্ধা', nameEn: 'Gaibandha', fullName: 'গাইবান্ধা (Gaibandha)', lat: 25.3288, lon: 89.5403, offset: 5 },
  { nameBn: 'গোপালগঞ্জ', nameEn: 'Gopalganj', fullName: 'গোপালগঞ্জ (Gopalganj)', lat: 23.0050, lon: 89.8266, offset: 3 },
  { nameBn: 'হবিগঞ্জ', nameEn: 'Habiganj', fullName: 'হবিগঞ্জ (Habiganj)', lat: 24.3749, lon: 91.4155, offset: -5 },
  { nameBn: 'জামালপুর', nameEn: 'Jamalpur', fullName: 'জামালপুর (Jamalpur)', lat: 24.9375, lon: 89.9377, offset: 2 },
  { nameBn: 'ঝিনাইদহ', nameEn: 'Jhenaidah', fullName: 'ঝিনাইদহ (Jhenaidah)', lat: 23.5448, lon: 89.1539, offset: 6 },
  { nameBn: 'জয়পুরহাট', nameEn: 'Joypurhat', fullName: 'জয়পুরহাট (Joypurhat)', lat: 25.1017, lon: 89.0270, offset: 6 },
  { nameBn: 'খাগড়াছড়ি', nameEn: 'Khagrachhari', fullName: 'খাগড়াছড়ি (Khagrachhari)', lat: 23.1193, lon: 91.9847, offset: -5 },
  { nameBn: 'কিশোরগঞ্জ', nameEn: 'Kishorganj', fullName: 'কিশোরগঞ্জ (Kishorganj)', lat: 24.4449, lon: 90.7765, offset: -1 },
  { nameBn: 'লক্ষ্মীপুর', nameEn: 'Lakshmipur', fullName: 'লক্ষ্মীপুর (Lakshmipur)', lat: 22.9425, lon: 90.8412, offset: -2 },
  { nameBn: 'লালমনিরহাট', nameEn: 'Lalmonirhat', fullName: 'লালমনিরহাট (Lalmonirhat)', lat: 25.9923, lon: 89.2847, offset: 6 },
  { nameBn: 'মাদারীপুর', nameEn: 'Madaripur', fullName: 'মাদারীপুর (Madaripur)', lat: 23.1641, lon: 90.1897, offset: 1 },
  { nameBn: 'মাগুরা', nameEn: 'Magura', fullName: 'মাগুরা (Magura)', lat: 23.4873, lon: 89.4199, offset: 5 },
  { nameBn: 'মানিকগঞ্জ', nameEn: 'Manikganj', fullName: 'মানিকগঞ্জ (Manikganj)', lat: 23.8644, lon: 90.0047, offset: 1 },
  { nameBn: 'মেহেরপুর', nameEn: 'Meherpur', fullName: 'মেহেরপুর (Meherpur)', lat: 23.7622, lon: 88.6318, offset: 7 },
  { nameBn: 'মৌলভীবাজার', nameEn: 'Moulvibazar', fullName: 'মৌলভীবাজার (Moulvibazar)', lat: 24.4829, lon: 91.7774, offset: -5 },
  { nameBn: 'মুন্সীগঞ্জ', nameEn: 'Munshiganj', fullName: 'মুন্সীগঞ্জ (Munshiganj)', lat: 23.5422, lon: 90.5305, offset: -1 },
  { nameBn: 'নওগাঁ', nameEn: 'Naogaon', fullName: 'নওগাঁ (Naogaon)', lat: 24.7936, lon: 88.9318, offset: 6 },
  { nameBn: 'নড়াইল', nameEn: 'Narail', fullName: 'নড়াইল (Narail)', lat: 23.1725, lon: 89.5126, offset: 5 },
  { nameBn: 'নরসিংদী', nameEn: 'Narsingdi', fullName: 'নরসিংদী (Narsingdi)', lat: 23.9193, lon: 90.7201, offset: -1 },
  { nameBn: 'নাটোর', nameEn: 'Natore', fullName: 'নাটোর (Natore)', lat: 24.4102, lon: 88.9834, offset: 6 },
  { nameBn: 'চাঁপাইনবাবগঞ্জ', nameEn: 'Chapainawabganj', fullName: 'চাঁপাইনবাবগঞ্জ (Chapainawabganj)', lat: 24.5965, lon: 88.2775, offset: 8 },
  { nameBn: 'নেত্রকোণা', nameEn: 'Netrokona', fullName: 'নেত্রকোণা (Netrokona)', lat: 24.8700, lon: 90.7270, offset: -1 },
  { nameBn: 'নীলফামারী', nameEn: 'Nilphamari', fullName: 'নীলফামারী (Nilphamari)', lat: 25.9318, lon: 88.8560, offset: 7 },
  { nameBn: 'পঞ্চগড়', nameEn: 'Panchagarh', fullName: 'পঞ্চগড় (Panchagarh)', lat: 26.3411, lon: 88.5541, offset: 9 },
  { nameBn: 'পিরোজপুর', nameEn: 'Pirojpur', fullName: 'পিরোজপুর (Pirojpur)', lat: 22.5841, lon: 89.9720, offset: 3 },
  { nameBn: 'রাজবাড়ী', nameEn: 'Rajbari', fullName: 'রাজবাড়ী (Rajbari)', lat: 23.7574, lon: 89.6444, offset: 3 },
  { nameBn: 'রাঙ্গামাটি', nameEn: 'Rangamati', fullName: 'রাঙ্গামাটি (Rangamati)', lat: 22.6533, lon: 92.1753, offset: -6 },
  { nameBn: 'সাতক্ষীরা', nameEn: 'Satkhira', fullName: 'সাতক্ষীরা (Satkhira)', lat: 22.7185, lon: 89.0705, offset: 6 },
  { nameBn: 'শরীয়তপুর', nameEn: 'Shariatpur', fullName: 'শরীয়তপুর (Shariatpur)', lat: 23.2423, lon: 90.4348, offset: 0 },
  { nameBn: 'শেরপুর', nameEn: 'Sherpur', fullName: 'শেরপুর (Sherpur)', lat: 25.0201, lon: 90.0153, offset: 2 },
  { nameBn: 'সিরাজগঞ্জ', nameEn: 'Sirajganj', fullName: 'সিরাজগঞ্জ (Sirajganj)', lat: 24.4534, lon: 89.7008, offset: 3 },
  { nameBn: 'সুনামগঞ্জ', nameEn: 'Sunamganj', fullName: 'সুনামগঞ্জ (Sunamganj)', lat: 25.0658, lon: 91.3950, offset: -5 },
  { nameBn: 'ঠাকুরগাঁও', nameEn: 'Thakurgaon', fullName: 'ঠাকুরগাঁও (Thakurgaon)', lat: 26.0337, lon: 88.4617, offset: 8 }
];

// Build map for quick offset lookup
export const DISTRICT_OFFSETS: Record<string, number> = ALL_BANGLADESH_DISTRICTS.reduce((acc, dist) => {
  acc[dist.fullName] = dist.offset;
  acc[dist.nameBn] = dist.offset;
  acc[dist.nameEn] = dist.offset;
  return acc;
}, {} as Record<string, number>);

// Find nearest district from GPS latitude & longitude
export function findNearestDistrict(lat: number, lon: number): DistrictInfo {
  let minDistance = Infinity;
  let closest = ALL_BANGLADESH_DISTRICTS[0];

  for (const dist of ALL_BANGLADESH_DISTRICTS) {
    const dLat = (dist.lat - lat) * (Math.PI / 180);
    const dLon = (dist.lon - lon) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat * (Math.PI / 180)) *
        Math.cos(dist.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c; // Earth radius in km

    if (distance < minDistance) {
      minDistance = distance;
      closest = dist;
    }
  }

  return closest;
}

// Standard base prayer times for Dhaka (in 24-hour format)
const BASE_TIMES = {
  fajr: { hour: 4, minute: 22 },
  sunrise: { hour: 5, minute: 38 },
  ishraq: { hour: 6, minute: 0 },
  duha: { hour: 9, minute: 30 },
  dhuhr: { hour: 12, minute: 15 },
  asr: { hour: 16, minute: 30 },
  sunset: { hour: 18, minute: 38 },
  maghrib: { hour: 18, minute: 38 },
  isha: { hour: 19, minute: 55 },
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
    return `${toBanglaNumber(hourStr)}:${toBanglaNumber(minStr)}`;
  }
  return `${hourStr}:${minStr} ${period}`;
}

// Get day name in Bangla
export function getBanglaDayName(date: Date = new Date()): string {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  return days[date.getDay()];
}

// Get full Gregorian date in Bangla
export function getBanglaGregorianDate(date: Date = new Date()): string {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const dayName = getBanglaDayName(date);
  const day = toBanglaNumber(date.getDate() < 10 ? `০${date.getDate()}` : date.getDate());
  const monthName = months[date.getMonth()];
  const year = toBanglaNumber(date.getFullYear());

  return `${dayName} ${day} ${monthName}, ${year}`;
}

// Get Bengali San Calendar date (Official Bangladesh standard revised calendar)
export function getBanglaCalendarDate(date: Date = new Date()): string {
  const dayNames = ['ইয়াওমুল আহাদ', 'ইয়াওমুল ইছনাইন', 'ইয়াওমুল ছুলাছা', 'ইয়াওমুল আরবাআ', 'ইয়াওমুল খামীস', 'ইয়াওমুল জুমআ', 'ইয়াওমুস সাবত'];
  const dayName = dayNames[date.getDay()];
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 - 11
  const day = date.getDate();

  const banglaMonths = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];

  let bYear = year - 593; // Default for Apr 14 - Dec 31
  if (month < 3 || (month === 3 && day < 14)) {
    bYear = year - 594; // Before Pahela Baishakh
  }

  let bMonthIndex = 0;
  let bDay = 1;

  if (month === 0) {
    if (day >= 15) { bMonthIndex = 9; bDay = day - 14; }
    else { bMonthIndex = 8; bDay = day + 16; }
  } else if (month === 1) {
    if (day >= 14) { bMonthIndex = 10; bDay = day - 13; }
    else { bMonthIndex = 9; bDay = day + 17; }
  } else if (month === 2) {
    if (day >= 16) { bMonthIndex = 11; bDay = day - 15; }
    else { bMonthIndex = 10; bDay = day + 15; }
  } else if (month === 3) {
    if (day >= 14) { bMonthIndex = 0; bDay = day - 13; }
    else { bMonthIndex = 11; bDay = day + 16; }
  } else if (month === 4) {
    if (day >= 15) { bMonthIndex = 1; bDay = day - 14; }
    else { bMonthIndex = 0; bDay = day + 17; }
  } else if (month === 5) {
    if (day >= 15) { bMonthIndex = 2; bDay = day - 14; }
    else { bMonthIndex = 1; bDay = day + 17; }
  } else if (month === 6) {
    if (day >= 16) { bMonthIndex = 3; bDay = day - 15; }
    else { bMonthIndex = 2; bDay = day + 16; }
  } else if (month === 7) {
    if (day >= 16) { bMonthIndex = 4; bDay = day - 15; }
    else { bMonthIndex = 3; bDay = day + 16; }
  } else if (month === 8) {
    if (day >= 16) { bMonthIndex = 5; bDay = day - 15; }
    else { bMonthIndex = 4; bDay = day + 16; }
  } else if (month === 9) {
    if (day >= 17) { bMonthIndex = 6; bDay = day - 16; }
    else { bMonthIndex = 5; bDay = day + 15; }
  } else if (month === 10) {
    if (day >= 16) { bMonthIndex = 7; bDay = day - 15; }
    else { bMonthIndex = 6; bDay = day + 15; }
  } else if (month === 11) {
    if (day >= 16) { bMonthIndex = 8; bDay = day - 15; }
    else { bMonthIndex = 7; bDay = day + 15; }
  }

  return `${dayName}, ${toBanglaNumber(bDay)} ${banglaMonths[bMonthIndex]} ${toBanglaNumber(bYear)}`;
}

// Format date to Bangla Hijri Date using accurate Astronomical & Intl Islamic Calendar
export function getBanglaHijriDate(date: Date = new Date()): string {
  const hijriMonthsBn = [
    'মহররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানী',
    'জমাদিউল আউয়াল', 'জমাদিউস সানী', 'রজব', 'শাবান',
    'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ্জ'
  ];

  try {
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });

    const isIslamic = formatter.resolvedOptions().calendar?.includes('islamic');

    if (isIslamic) {
      const parts = formatter.formatToParts(date);
      let hDay = 1;
      let hMonth = 1;
      let hYear = 1448;

      for (const part of parts) {
        if (part.type === 'day') hDay = parseInt(part.value, 10);
        if (part.type === 'month') hMonth = parseInt(part.value, 10);
        if (part.type === 'year') hYear = parseInt(part.value, 10);
      }

      const monthName = hijriMonthsBn[hMonth - 1] || 'সফর';
      return `${toBanglaNumber(hDay)} ${monthName} ${toBanglaNumber(hYear)} হি.`;
    }
  } catch (e) {
    // Ignore and use astronomical math
  }

  // Reliable Kuwaiti Astronomical Algorithm Fallback
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;

  const epoch = 1948439.5;
  const daysSinceEpoch = jd - epoch;

  const cycles = Math.floor((daysSinceEpoch - 1) / 10631);
  const daysInCycle = daysSinceEpoch - 1 - cycles * 10631;

  const yearInCycle = Math.floor((daysInCycle - 0.5) / 354.36667);
  const dayInYear = Math.floor(daysInCycle - Math.floor(yearInCycle * 354.36667 + 0.5));

  const hYear = cycles * 30 + yearInCycle + 1;
  let hMonth = Math.floor((dayInYear + 29.5) / 29.5);
  if (hMonth > 12) hMonth = 12;
  if (hMonth < 1) hMonth = 1;

  const hDay = Math.floor(dayInYear - Math.floor((hMonth - 1) * 29.5) + 1);

  const monthName = hijriMonthsBn[hMonth - 1] || 'সফর';
  return `${toBanglaNumber(hDay)} ${monthName} ${toBanglaNumber(hYear)} হি.`;
}

export interface DynamicPrayerState {
  currentWaqt: PrayerTime;
  nextWaqt: PrayerTime;
  currentTimeFormatted: string;
  remainingTimeFormatted: string;
  remainingSeconds: number;
  hijriDateBn: string;
  bengaliDateBn: string;
  gregorianDateBn: string;
  sunriseTimeFormatted: string;
  sunsetTimeFormatted: string;
  waqtRangeFormatted: string;
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

  const sunriseTimeFormatted = format12Hour(sunriseDate.getHours(), sunriseDate.getMinutes(), 'BN');
  const sunsetTimeFormatted = format12Hour(maghribDate.getHours(), maghribDate.getMinutes(), 'BN');
  const waqtRangeFormatted = `${activeItem.nameBn} ${format12Hour(activeItem.date.getHours(), activeItem.date.getMinutes(), 'BN')} - ${format12Hour(nextTargetDate.getHours(), nextTargetDate.getMinutes(), 'BN')}`;

  return {
    currentWaqt,
    nextWaqt,
    currentTimeFormatted,
    remainingTimeFormatted,
    remainingSeconds: diffSec,
    hijriDateBn: getBanglaHijriDate(now),
    bengaliDateBn: getBanglaCalendarDate(now),
    gregorianDateBn: getBanglaGregorianDate(now),
    sunriseTimeFormatted,
    sunsetTimeFormatted,
    waqtRangeFormatted,
    prayersList
  };
}
