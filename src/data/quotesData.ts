export interface QuoteItem {
  id: string;
  quoteBn: string;
  quoteEn: string;
  sourceBn: string;
  sourceEn: string;
  category: 'hadith' | 'quran' | 'sunnah';
}

export const DAILY_QUOTES: QuoteItem[] = [
  {
    id: 'q1',
    quoteBn: '“তোমাদের মধ্যে সেই ব্যক্তি উত্তম যে নিজে কুরআন শেখে এবং অন্যকে শেখায়।”',
    quoteEn: '“The best among you are those who learn the Qur\'an and teach it.”',
    sourceBn: 'সহীহ বুখারী, হাদিস নং ৫০২৭',
    sourceEn: 'Sahih al-Bukhari 5027',
    category: 'hadith'
  },
  {
    id: 'q2',
    quoteBn: '“নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি।”',
    quoteEn: '“Indeed, with hardship will be ease.”',
    sourceBn: 'সূরা আল-ইনশিরাহ (৯৪:৬)',
    sourceEn: 'Surah Ash-Sharh (94:6)',
    category: 'quran'
  },
  {
    id: 'q3',
    quoteBn: '“যে ব্যক্তি একমাত্র আল্লাহর সন্তুষ্টির জন্য বিনীত হয়, আল্লাহ তার মর্যাদা বাড়িয়ে দেন।”',
    quoteEn: '“Whoever humbles himself for the sake of Allah, Allah will elevate his status.”',
    sourceBn: 'সহীহ মুসলিম, হাদিস নং ২৫৮৮',
    sourceEn: 'Sahih Muslim 2588',
    category: 'hadith'
  },
  {
    id: 'q4',
    quoteBn: '“জেনে রেখো, একমাত্র আল্লাহর জিকির ও স্মরণের মাধ্যমেই অন্তরসমূহ শান্তি লাভ করে।”',
    quoteEn: '“Unquestionably, by the remembrance of Allah do hearts find rest.”',
    sourceBn: 'সূরা আর-রা\'দ (১৩:২৮)',
    sourceEn: 'Surah Ar-Ra\'d (13:28)',
    category: 'quran'
  },
  {
    id: 'q5',
    quoteBn: '“মুমিনদের মধ্যে ঈমানে সবচেয়ে পূর্ণাঙ্গ ব্যক্তি সে, যার চরিত্র সবচেয়ে সুন্দর।”',
    quoteEn: '“The most complete believer in faith is the one who has the best character.”',
    sourceBn: 'জামে আত-তিরমিজী, হাদিস নং ১১৬২',
    sourceEn: 'Jami at-Tirmidhi 1162',
    category: 'hadith'
  }
];
