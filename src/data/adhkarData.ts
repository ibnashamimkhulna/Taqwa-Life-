import { DhikrItem } from '../types';

export const INITIAL_ADHKAR: DhikrItem[] = [
  {
    id: 'dhikr-1',
    titleBn: 'সুবহানাল্লাহ (SubhanAllah)',
    titleEn: 'SubhanAllah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    meaningBn: 'আল্লাহ তায়ালা অতি পবিত্র ও নিখুঁত',
    meaningEn: 'Glory be to Allah',
    target: 33,
    count: 0,
    category: 'tasbeeh',
    virtueBn: 'প্রতিদিন ১০০ বার সুবহানাল্লাহ পাঠে ১০০০ নেকি লেখা হয়।'
  },
  {
    id: 'dhikr-2',
    titleBn: 'আলহামদুলিল্লাহ (Alhamdulillah)',
    titleEn: 'Alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    meaningBn: 'সমস্ত প্রশংসা একমাত্র আল্লাহর জন্য',
    meaningEn: 'Praise be to Allah',
    target: 33,
    count: 0,
    category: 'tasbeeh',
    virtueBn: 'আলহামদুলিল্লাহ মিজানের পাল্লাকে নেকি দিয়ে ভরপুর করে দেয়।'
  },
  {
    id: 'dhikr-3',
    titleBn: 'আল্লাহু আকবার (Allahu Akbar)',
    titleEn: 'Allahu Akbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    meaningBn: 'আল্লাহ তায়ালা সর্বশ্রেষ্ঠ ও মহান',
    meaningEn: 'Allah is the Greatest',
    target: 34,
    count: 0,
    category: 'tasbeeh',
    virtueBn: 'সালাত শেষের অন্যতম শ্রেষ্ঠ আমল।'
  },
  {
    id: 'dhikr-4',
    titleBn: 'লা ইলাহা ইল্লাল্লাহ (Kalimah Tayyibah)',
    titleEn: 'La Ilaha Illallah',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illallah',
    meaningBn: 'আল্লাহ ব্যতীত কোনো উপাস্য নেই',
    meaningEn: 'There is no god but Allah',
    target: 100,
    count: 0,
    category: 'daily',
    virtueBn: 'সর্বশ্রেষ্ঠ জিকির হলো লা ইলাহা ইল্লাল্লাহ।'
  },
  {
    id: 'dhikr-5',
    titleBn: 'আস্তাগফিরুল্লাহ (Astaghfirullah)',
    titleEn: 'Astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha wa atubu ilayh',
    meaningBn: 'আমি আল্লাহর কাছে ক্ষমা চাই এবং তাঁর দিকেই তওবা করি',
    meaningEn: 'I seek forgiveness from Allah and turn to Him',
    target: 100,
    count: 0,
    category: 'daily',
    virtueBn: 'রসূলুল্লাহ (সাঃ) দিনে ১০০ বারের বেশি তওবা করতেন।'
  },
  {
    id: 'dhikr-6',
    titleBn: 'দুরুদ শরীফ (Salawat)',
    titleEn: 'Salawat on Prophet (pbuh)',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammad',
    meaningBn: 'হে আল্লাহ! হযরত মুহাম্মাদ (সাঃ) ও তাঁর পরিবারের ওপর রহমত বর্ষণ করুন',
    meaningEn: 'O Allah, send blessings upon Muhammad and the family of Muhammad',
    target: 10,
    count: 0,
    category: 'daily',
    virtueBn: 'একবার দুরুদ পাঠে ১০টি রহমত নাযিল হয় এবং ১০টি গুনাহ মাফ হয়।'
  },
  {
    id: 'dhikr-7',
    titleBn: 'সকালের আযকার (আয়াতুল কুরসী)',
    titleEn: 'Ayatul Kursi (Morning)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
    transliteration: 'Allahu la ilaha illa huwal hayyul qayyum...',
    meaningBn: 'আল্লাহ ছাড়া অন্য কোনো সত্য উপাস্য নেই, তিনি চিরঞ্জীব ও সার্বভৌম নিয়ন্ত্রক...',
    meaningEn: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence...',
    target: 1,
    count: 0,
    category: 'morning',
    virtueBn: 'সকালে পাঠ করলে সন্ধ্যা পর্যন্ত শয়তান ও বিপদ থেকে নিরাপত্তা লাভ হয়।'
  },
  {
    id: 'dhikr-8',
    titleBn: 'সাইয়্যিদুল ইস্তিগফার (Sayyidul Istighfar)',
    titleEn: 'Sayyidul Istighfar',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
    transliteration: 'Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana abduka...',
    meaningBn: 'হে আল্লাহ! আপনিই আমার রব, আপনি ছাড়া কোনো মাবুদ নেই। আপনি আমাকে সৃষ্টি করেছেন...',
    meaningEn: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me...',
    target: 1,
    count: 0,
    category: 'morning',
    virtueBn: 'দিনে বা রাতে আন্তরিকভাবে এটি পাঠ করে মারা গেলে জান্নাত লাভ হয়।'
  }
];
