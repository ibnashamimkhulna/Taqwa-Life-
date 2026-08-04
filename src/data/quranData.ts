import { Surah, Verse } from '../types';

export const SURAH_LIST: Surah[] = [
  { number: 1, nameArabic: 'الفاتحة', nameBn: 'আল-ফাতিহা', nameEn: 'Al-Fatiha', meaningBn: 'সূচনা / ভুমিকা', meaningEn: 'The Opening', versesCount: 7, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/1.mp3' },
  { number: 2, nameArabic: 'البقرة', nameBn: 'আল-বাকারা', nameEn: 'Al-Baqarah', meaningBn: 'বকনা বাছুর', meaningEn: 'The Cow', versesCount: 286, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/2.mp3' },
  { number: 3, nameArabic: 'آل عمران', nameBn: 'আলে-ইমরান', nameEn: 'Ali \'Imran', meaningBn: 'ইমরানের পরিবার', meaningEn: 'Family of Imran', versesCount: 200, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/3.mp3' },
  { number: 4, nameArabic: 'النساء', nameBn: 'আন-নিসা', nameEn: 'An-Nisa', meaningBn: 'নারীসমাজ', meaningEn: 'The Women', versesCount: 176, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/4.mp3' },
  { number: 5, nameArabic: 'المائدة', nameBn: 'আল-মা\'ইদাহ', nameEn: 'Al-Ma\'idah', meaningBn: 'খাদ্য পরিবেশিত দস্তরখান', meaningEn: 'The Table Spread', versesCount: 120, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/5.mp3' },
  { number: 6, nameArabic: 'الأنعام', nameBn: 'আল-আন\'আম', nameEn: 'Al-An\'am', meaningBn: 'গৃহপালিত পশু', meaningEn: 'The Cattle', versesCount: 165, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/6.mp3' },
  { number: 7, nameArabic: 'الأعراف', nameBn: 'আল-আ\'রাফ', nameEn: 'Al-A\'raf', meaningBn: 'উচ্চ স্থানসমূহ', meaningEn: 'The Heights', versesCount: 206, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/7.mp3' },
  { number: 8, nameArabic: 'الأنفال', nameBn: 'আল-আনফাল', nameEn: 'Al-Anfal', meaningBn: 'যুদ্ধলব্ধ সম্পদ', meaningEn: 'The Spoils of War', versesCount: 75, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/8.mp3' },
  { number: 9, nameArabic: 'التوبة', nameBn: 'আত-তাওবাহ', nameEn: 'At-Tawbah', meaningBn: 'অনুতাপ / তওবা', meaningEn: 'The Repentance', versesCount: 129, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/9.mp3' },
  { number: 10, nameArabic: 'يونس', nameBn: 'ইউনুস', nameEn: 'Yunus', meaningBn: 'নবী ইউনুস (আঃ)', meaningEn: 'Jonah', versesCount: 109, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/10.mp3' },
  { number: 11, nameArabic: 'هود', nameBn: 'হূদ', nameEn: 'Hud', meaningBn: 'নবী হূদ (আঃ)', meaningEn: 'Hud', versesCount: 123, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/11.mp3' },
  { number: 12, nameArabic: 'يوسف', nameBn: 'ইউসুফ', nameEn: 'Yusuf', meaningBn: 'নবী ইউসুফ (আঃ)', meaningEn: 'Joseph', versesCount: 111, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/12.mp3' },
  { number: 13, nameArabic: 'الرعد', nameBn: 'আর-রা\'দ', nameEn: 'Ar-Ra\'d', meaningBn: 'মেঘের গর্জন', meaningEn: 'The Thunder', versesCount: 43, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/13.mp3' },
  { number: 14, nameArabic: 'إبراهيم', nameBn: 'ইব্রাহীম', nameEn: 'Ibrahim', meaningBn: 'নবী ইব্রাহীম (আঃ)', meaningEn: 'Abraham', versesCount: 52, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/14.mp3' },
  { number: 15, nameArabic: 'الحجر', nameBn: 'আল-হিজর', nameEn: 'Al-Hijr', meaningBn: 'পাথুরে উপত্যকা', meaningEn: 'The Rocky Tract', versesCount: 99, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/15.mp3' },
  { number: 16, nameArabic: 'النحل', nameBn: 'আন-নাহল', nameEn: 'An-Nahl', meaningBn: 'মৌমাছি', meaningEn: 'The Bee', versesCount: 128, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/16.mp3' },
  { number: 17, nameArabic: 'الإسراء', nameBn: 'আল-ইসরা', nameEn: 'Al-Isra', meaningBn: 'রাত্রিকালীন ভ্রমণ', meaningEn: 'The Night Journey', versesCount: 111, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/17.mp3' },
  { number: 18, nameArabic: 'الكهف', nameBn: 'আল-কাহফ', nameEn: 'Al-Kahf', meaningBn: 'গিরিগুহা', meaningEn: 'The Cave', versesCount: 110, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/18.mp3' },
  { number: 19, nameArabic: 'مريم', nameBn: 'মারইয়াম', nameEn: 'Maryam', meaningBn: 'মারইয়াম (আঃ)', meaningEn: 'Mary', versesCount: 98, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/19.mp3' },
  { number: 20, nameArabic: 'طه', nameBn: 'ত্ব-হা', nameEn: 'Taha', meaningBn: 'ত্ব-হা', meaningEn: 'Ta-Ha', versesCount: 135, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/20.mp3' },
  { number: 21, nameArabic: 'الأنبياء', nameBn: 'আল-আনবিয়া', nameEn: 'Al-Anbiya', meaningBn: 'নবীগণ', meaningEn: 'The Prophets', versesCount: 112, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/21.mp3' },
  { number: 22, nameArabic: 'الحج', nameBn: 'আল-হাজ্জ', nameEn: 'Al-Hajj', meaningBn: 'পবিত্র হজ', meaningEn: 'The Pilgrimage', versesCount: 78, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/22.mp3' },
  { number: 23, nameArabic: 'المؤمنون', nameBn: 'আল-মু\'মিনূন', nameEn: 'Al-Mu\'minun', meaningBn: 'মুমিন বান্দাগণ', meaningEn: 'The Believers', versesCount: 118, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/23.mp3' },
  { number: 24, nameArabic: 'النور', nameBn: 'আন-নূর', nameEn: 'An-Nur', meaningBn: 'জ্যোতি বা আলো', meaningEn: 'The Light', versesCount: 64, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/24.mp3' },
  { number: 25, nameArabic: 'الفرقان', nameBn: 'আল-ফুরকান', nameEn: 'Al-Furqan', meaningBn: 'সত্য-মিথ্যার পার্থক্যকারী', meaningEn: 'The Criterian', versesCount: 77, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/25.mp3' },
  { number: 26, nameArabic: 'الشعراء', nameBn: 'আশ-শু\'আরা', nameEn: 'Ash-Shu\'ara', meaningBn: 'কবি সমাজ', meaningEn: 'The Poets', versesCount: 227, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/26.mp3' },
  { number: 27, nameArabic: 'النمل', nameBn: 'আন-নামল', nameEn: 'An-Naml', meaningBn: 'পিপীলিকা', meaningEn: 'The Ant', versesCount: 93, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/27.mp3' },
  { number: 28, nameArabic: 'القصص', nameBn: 'আল-কাসাস', nameEn: 'Al-Qasas', meaningBn: 'ঐতিহাসিক কাহিনী', meaningEn: 'The Stories', versesCount: 88, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/28.mp3' },
  { number: 29, nameArabic: 'العنكبوت', nameBn: 'আল-\'আনকাবূত', nameEn: 'Al-\'Ankabut', meaningBn: 'মাকড়সা', meaningEn: 'The Spider', versesCount: 69, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/29.mp3' },
  { number: 30, nameArabic: 'الروم', nameBn: 'আর-রূম', nameEn: 'Ar-Rum', meaningBn: 'রোমান জাতি', meaningEn: 'The Romans', versesCount: 60, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/30.mp3' },
  { number: 31, nameArabic: 'لقمان', nameBn: 'লুকমান', nameEn: 'Luqman', meaningBn: 'জ্ঞানী লুকমান', meaningEn: 'Luqman', versesCount: 34, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/31.mp3' },
  { number: 32, nameArabic: 'السجدة', nameBn: 'আস-সাজদাহ', nameEn: 'As-Sajdah', meaningBn: 'সেজদা', meaningEn: 'The Prostration', versesCount: 30, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/32.mp3' },
  { number: 33, nameArabic: 'الأحزاب', nameBn: 'আল-আহযাব', nameEn: 'Al-Ahzab', meaningBn: 'সম্মিলিত বাহিনী', meaningEn: 'The Combined Forces', versesCount: 73, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/33.mp3' },
  { number: 34, nameArabic: 'سبإ', nameBn: 'সাবা', nameEn: 'Saba', meaningBn: 'সাবা রাজ্য', meaningEn: 'Sheba', versesCount: 54, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/34.mp3' },
  { number: 35, nameArabic: 'فاطر', nameBn: 'ফাতির', nameEn: 'Fatir', meaningBn: 'আদি স্রষ্টা', meaningEn: 'Originator', versesCount: 45, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/35.mp3' },
  { number: 36, nameArabic: 'يس', nameBn: 'ইয়াসীন', nameEn: 'Ya-Sin', meaningBn: 'ইয়াসীন (কুরআনের হৃদপিণ্ড)', meaningEn: 'Ya-Sin', versesCount: 83, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/36.mp3' },
  { number: 37, nameArabic: 'الصافات', nameBn: 'আস-সাফফাত', nameEn: 'As-Saffat', meaningBn: 'সারি বদ্ধ ফেরেশতা', meaningEn: 'Those who set the Ranks', versesCount: 182, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/37.mp3' },
  { number: 38, nameArabic: 'ص', nameBn: 'স্বাদ', nameEn: 'Sad', meaningBn: 'আরবি বর্ণ \'স্বাদ\'', meaningEn: 'Sad', versesCount: 88, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/38.mp3' },
  { number: 39, nameArabic: 'الزمر', nameBn: 'আজ-জুমার', nameEn: 'Az-Zumar', meaningBn: 'দলবদ্ধ জনতা', meaningEn: 'The Troops', versesCount: 75, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/39.mp3' },
  { number: 40, nameArabic: 'غافر', nameBn: 'গাফির', nameEn: 'Ghafir', meaningBn: 'ক্ষমাশীল', meaningEn: 'The Forgiver', versesCount: 85, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/40.mp3' },
  { number: 41, nameArabic: 'فصلت', nameBn: 'ফুসসিলাত', nameEn: 'Fussilat', meaningBn: 'সুস্পষ্ট বিবরণ', meaningEn: 'Explained in Detail', versesCount: 54, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/41.mp3' },
  { number: 42, nameArabic: 'الشورى', nameBn: 'আশ-শূরা', nameEn: 'Ash-Shura', meaningBn: 'পরামর্শ', meaningEn: 'The Consultation', versesCount: 53, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/42.mp3' },
  { number: 43, nameArabic: 'الزخرف', nameBn: 'আজ-জুখরুফ', nameEn: 'Az-Zukhruf', meaningBn: 'সোনাদানা ও অলংকার', meaningEn: 'The Ornaments of Gold', versesCount: 89, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/43.mp3' },
  { number: 44, nameArabic: 'الدخان', nameBn: 'আদ-দুখান', nameEn: 'Ad-Dukhan', meaningBn: 'ধোঁয়াশ্রম', meaningEn: 'The Smoke', versesCount: 59, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/44.mp3' },
  { number: 45, nameArabic: 'الجاثية', nameBn: 'আল-জাসিয়াহ', nameEn: 'Al-Jathiyah', meaningBn: 'জানু পাতা / নতজানু', meaningEn: 'The Crouching', versesCount: 37, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/45.mp3' },
  { number: 46, nameArabic: 'الأحقاف', nameBn: 'আল-আহকাফ', nameEn: 'Al-Ahqaf', meaningBn: 'বালিয়াড়ি উপত্যকা', meaningEn: 'The Wind-Curved Sandhills', versesCount: 35, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/46.mp3' },
  { number: 47, nameArabic: 'محمد', nameBn: 'মুহাম্মদ', nameEn: 'Muhammad', meaningBn: 'মহানবী মুহাম্মদ (সাঃ)', meaningEn: 'Muhammad', versesCount: 38, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/47.mp3' },
  { number: 48, nameArabic: 'الفتح', nameBn: 'আল-ফাতহ', nameEn: 'Al-Fath', meaningBn: 'সুস্পষ্ট বিজয়', meaningEn: 'The Victory', versesCount: 29, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/48.mp3' },
  { number: 49, nameArabic: 'الحجرات', nameBn: 'আল-হুজুরাত', nameEn: 'Al-Hujurat', meaningBn: 'বাসগৃহের কক্ষসমূহ', meaningEn: 'The Dwellings', versesCount: 18, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/49.mp3' },
  { number: 50, nameArabic: 'ق', nameBn: 'ক্বাফ', nameEn: 'Qaf', meaningBn: 'আরবি বর্ণ \'ক্বাফ\'', meaningEn: 'Qaf', versesCount: 45, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/50.mp3' },
  { number: 51, nameArabic: 'الذاريات', nameBn: 'আয-যারিয়াত', nameEn: 'Adh-Dhariyat', meaningBn: 'বিক্ষিপ্তকারী বাতাস', meaningEn: 'The Winnowing Winds', versesCount: 60, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/51.mp3' },
  { number: 52, nameArabic: 'الطور', nameBn: 'াত-তূর', nameEn: 'At-Tur', meaningBn: 'তূর পর্বত', meaningEn: 'The Mount', versesCount: 49, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/52.mp3' },
  { number: 53, nameArabic: 'النجم', nameBn: 'আন-নাজম', nameEn: 'An-Najm', meaningBn: 'উজ্জ্বল তারা', meaningEn: 'The Star', versesCount: 62, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/53.mp3' },
  { number: 54, nameArabic: 'القمر', nameBn: 'আল-কামার', nameEn: 'Al-Qamar', meaningBn: 'চাঁদ / চন্দ্রিমা', meaningEn: 'The Moon', versesCount: 55, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/54.mp3' },
  { number: 55, nameArabic: 'الرحمن', nameBn: 'আর-রহমান', nameEn: 'Ar-Rahman', meaningBn: 'পরম করুণাময়', meaningEn: 'The Beneficent', versesCount: 78, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/55.mp3' },
  { number: 56, nameArabic: 'الواقعة', nameBn: 'আল-ওয়াকিয়াহ', nameEn: 'Al-Waqi\'ah', meaningBn: 'অনিবার্য কিয়ামত', meaningEn: 'The Inevitable', versesCount: 96, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/56.mp3' },
  { number: 57, nameArabic: 'الحديد', nameBn: 'আল-হাদীদ', nameEn: 'Al-Hadid', meaningBn: 'লোহা', meaningEn: 'The Iron', versesCount: 29, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/57.mp3' },
  { number: 58, nameArabic: 'المجادلة', nameBn: 'আল-মুজাদালাহ', nameEn: 'Al-Mujadila', meaningBn: 'অনুনয়কারী নারী', meaningEn: 'The Pleading Woman', versesCount: 22, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/58.mp3' },
  { number: 59, nameArabic: 'الحشر', nameBn: 'আল-হাশর', nameEn: 'Al-Hashr', meaningBn: 'সমাবেশ / দেশত্যাগ', meaningEn: 'The Exile', versesCount: 24, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/59.mp3' },
  { number: 60, nameArabic: 'الممتحنة', nameBn: 'আল-মুমতাহিনাহ', nameEn: 'Al-Mumtahanah', meaningBn: 'পরীক্ষিত নারী', meaningEn: 'She that is to be examined', versesCount: 13, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/60.mp3' },
  { number: 61, nameArabic: 'الصف', nameBn: 'আস-সফ', nameEn: 'As-Saff', meaningBn: 'সুসংবদ্ধ সারি', meaningEn: 'The Ranks', versesCount: 14, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/61.mp3' },
  { number: 62, nameArabic: 'الجمعة', nameBn: 'আল-জুমু\'আ', nameEn: 'Al-Jumu\'ah', meaningBn: 'জুমু\'আর দিন', meaningEn: 'The Congregation', versesCount: 11, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/62.mp3' },
  { number: 63, nameArabic: 'المنافقون', nameBn: 'আল-মুনাফিকূন', nameEn: 'Al-Munafiqun', meaningBn: 'কপট বিশ্বাসীগণ', meaningEn: 'The Hypocrites', versesCount: 11, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/63.mp3' },
  { number: 64, nameArabic: 'التغابن', nameBn: 'াত-তাগাবুন', nameEn: 'At-Taghabun', meaningBn: 'হার-জিতের দিন', meaningEn: 'The Mutual Disillusion', versesCount: 18, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/64.mp3' },
  { number: 65, nameArabic: 'الطلاق', nameBn: 'াত-ত্বলাক', nameEn: 'At-Talaq', meaningBn: 'বিবাহ বিচ্ছেদ', meaningEn: 'The Divorce', versesCount: 12, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/65.mp3' },
  { number: 66, nameArabic: 'التحريم', nameBn: 'াত-তাহরীম', nameEn: 'At-Tahrim', meaningBn: 'নিষিদ্ধকরণ', meaningEn: 'The Prohibition', versesCount: 12, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/66.mp3' },
  { number: 67, nameArabic: 'الملك', nameBn: 'আল-মুলক', nameEn: 'Al-Mulk', meaningBn: 'সার্বভৌম কর্তৃত্ব', meaningEn: 'The Sovereignty', versesCount: 30, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/67.mp3' },
  { number: 68, nameArabic: 'القلم', nameBn: 'আল-কলম', nameEn: 'Al-Qalam', meaningBn: 'কলম', meaningEn: 'The Pen', versesCount: 52, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/68.mp3' },
  { number: 69, nameArabic: 'الحاقة', nameBn: 'আল-হাক্কাহ', nameEn: 'Al-Haqqah', meaningBn: 'অনিবার্য সত্য', meaningEn: 'The Inevitable Reality', versesCount: 52, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/69.mp3' },
  { number: 70, nameArabic: 'المعارج', nameBn: 'আল-মা\'আরিজ', nameEn: 'Al-Ma\'arij', meaningBn: 'উন্নয়নের সোপান', meaningEn: 'The Ascending Stairways', versesCount: 44, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/70.mp3' },
  { number: 71, nameArabic: 'نوح', nameBn: 'নূহ', nameEn: 'Nuh', meaningBn: 'নবী নূহ (আঃ)', meaningEn: 'Noah', versesCount: 28, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/71.mp3' },
  { number: 72, nameArabic: 'الجن', nameBn: 'আল-জিন', nameEn: 'Al-Jinn', meaningBn: 'জিন জাতি', meaningEn: 'The Jinn', versesCount: 28, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/72.mp3' },
  { number: 73, nameArabic: 'المزمل', nameBn: 'আল-মুযযামমিল', nameEn: 'Al-Muzzammil', meaningBn: 'বস্ত্রাবৃত', meaningEn: 'The Enshrouded One', versesCount: 20, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/73.mp3' },
  { number: 74, nameArabic: 'المدثر', nameBn: 'আল-মুদ্দাসসির', nameEn: 'Al-Muddaththir', meaningBn: 'চাদরাবৃত', meaningEn: 'The Cloaked One', versesCount: 56, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/74.mp3' },
  { number: 75, nameArabic: 'القيامة', nameBn: 'আল-কিয়ামাহ', nameEn: 'Al-Qiyamah', meaningBn: 'পুনরুত্থান দিবস', meaningEn: 'The Resurrection', versesCount: 40, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/75.mp3' },
  { number: 76, nameArabic: 'الإنسان', nameBn: 'আল-ইনসান', nameEn: 'Al-Insan', meaningBn: 'মানবজাতি', meaningEn: 'The Man', versesCount: 31, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/76.mp3' },
  { number: 77, nameArabic: 'المرسلات', nameBn: 'আল-মুরসালাত', nameEn: 'Al-Mursalat', meaningBn: 'প্রেরিত বায়ুপ্রবাহ', meaningEn: 'The Emissaries', versesCount: 50, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/77.mp3' },
  { number: 78, nameArabic: 'النبإ', nameBn: 'আন-নাবা', nameEn: 'An-Naba', meaningBn: 'মহাবাৰ্তা', meaningEn: 'The Tidings', versesCount: 40, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/78.mp3' },
  { number: 79, nameArabic: 'النازعات', nameBn: 'আন-নাযি\'আত', nameEn: 'An-Nazi\'at', meaningBn: 'প্রাণউৎপাটনকারী', meaningEn: 'Those who drag forth', versesCount: 46, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/79.mp3' },
  { number: 80, nameArabic: 'عبس', nameBn: 'আবাসা', nameEn: '\'Abasa', meaningBn: 'সে ভ্রূকুটি করল', meaningEn: 'He Frowned', versesCount: 42, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/80.mp3' },
  { number: 81, nameArabic: 'التكوير', nameBn: 'াত-তাকভীর', nameEn: 'At-Takwir', meaningBn: 'সূর্য গুটিয়ে নেওয়া', meaningEn: 'The Overthrowing', versesCount: 29, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/81.mp3' },
  { number: 82, nameArabic: 'الانفطار', nameBn: 'আল-ইনফিতার', nameEn: 'Al-Infitar', meaningBn: 'আকাশ বিদীর্ণ হওয়া', meaningEn: 'The Cleaving', versesCount: 19, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/82.mp3' },
  { number: 83, nameArabic: 'المطففين', nameBn: 'আল-মুত্বাফফিফীন', nameEn: 'Al-Mutaffifin', meaningBn: 'মাপে কম দানকারী', meaningEn: 'The Defrauders', versesCount: 36, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/83.mp3' },
  { number: 84, nameArabic: 'الانشقاق', nameBn: 'আল-ইনশিকাক', nameEn: 'Al-Inshiqaq', meaningBn: 'খণ্ড-বিখণ্ড হওয়া', meaningEn: 'The Splitting Open', versesCount: 25, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/84.mp3' },
  { number: 85, nameArabic: 'البروج', nameBn: 'আল-বুরূজ', nameEn: 'Al-Buruj', meaningBn: 'নক্ষত্রমণ্ডল', meaningEn: 'The Mansions of the Stars', versesCount: 22, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/85.mp3' },
  { number: 86, nameArabic: 'الطارق', nameBn: 'াত-ত্বারিক', nameEn: 'At-Tariq', meaningBn: 'নৈশ আগমনকারী', meaningEn: 'The Morning Star', versesCount: 17, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/86.mp3' },
  { number: 87, nameArabic: 'الأعلى', nameBn: 'আল-আ\'লা', nameEn: 'Al-A\'la', meaningBn: 'সর্বোচ্চ মহান', meaningEn: 'The Most High', versesCount: 19, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/87.mp3' },
  { number: 88, nameArabic: 'الغاشية', nameBn: 'আল-গাশিয়াহ', nameEn: 'Al-Ghashiyah', meaningBn: 'আচ্ছাদনকারী কিয়ামত', meaningEn: 'The Overwhelming', versesCount: 26, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/88.mp3' },
  { number: 89, nameArabic: 'الفجر', nameBn: 'আল-ফজর', nameEn: 'Al-Fajr', meaningBn: 'ভোরবেলা / প্রভাত', meaningEn: 'The Dawn', versesCount: 30, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/89.mp3' },
  { number: 90, nameArabic: 'البلد', nameBn: 'আল-বালাদ', nameEn: 'Al-Balad', meaningBn: 'নগরী / মক্কা শহর', meaningEn: 'The City', versesCount: 20, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/90.mp3' },
  { number: 91, nameArabic: 'الشمس', nameBn: 'আশ-শামস', nameEn: 'Ash-Shams', meaningBn: 'সূর্য', meaningEn: 'The Sun', versesCount: 15, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/91.mp3' },
  { number: 92, nameArabic: 'الليل', nameBn: 'আল-লাইল', nameEn: 'Al-Lail', meaningBn: 'রজনী / রাত', meaningEn: 'The Night', versesCount: 21, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/92.mp3' },
  { number: 93, nameArabic: 'الضحى', nameBn: 'আদ-দুহা', nameEn: 'Ad-Duha', meaningBn: 'পূর্বাহ্নের আলো', meaningEn: 'The Morning Hours', versesCount: 11, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/93.mp3' },
  { number: 94, nameArabic: 'الشرح', nameBn: 'আশ-শারহ', nameEn: 'Ash-Sharh', meaningBn: 'বক্ষ সম্প্রসারণ', meaningEn: 'The Relief', versesCount: 8, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/94.mp3' },
  { number: 95, nameArabic: 'التين', nameBn: 'াত-তীন', nameEn: 'At-Tin', meaningBn: 'ডুমুর ফল', meaningEn: 'The Fig', versesCount: 8, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/95.mp3' },
  { number: 96, nameArabic: 'العلق', nameBn: 'আল-আলাক', nameEn: 'Al-\'Alaq', meaningBn: 'রক্তপিণ্ড', meaningEn: 'The Clot', versesCount: 19, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/96.mp3' },
  { number: 97, nameArabic: 'القدر', nameBn: 'আল-কদর', nameEn: 'Al-Qadr', meaningBn: 'মহিমান্বিত কদর রজনী', meaningEn: 'The Power', versesCount: 5, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/97.mp3' },
  { number: 98, nameArabic: 'البينة', nameBn: 'আল-বাইয়্যিনাহ', nameEn: 'Al-Bayyinah', meaningBn: 'সুস্পষ্ট প্রমাণ', meaningEn: 'The Clear Proof', versesCount: 8, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/98.mp3' },
  { number: 99, nameArabic: 'الزلزلة', nameBn: 'আজ-যিলযাল', nameEn: 'Az-Zalzalah', meaningBn: 'ভূমিকম্প', meaningEn: 'The Earthquake', versesCount: 8, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/99.mp3' },
  { number: 100, nameArabic: 'العاديات', nameBn: 'আল-\'আদিয়াত', nameEn: 'Al-\'Adiyat', meaningBn: 'অভিযানকারী অশ্ব', meaningEn: 'The Courser', versesCount: 11, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/100.mp3' },
  { number: 101, nameArabic: 'القارعة', nameBn: 'আল-কারিয়াহ', nameEn: 'Al-Qari\'ah', meaningBn: 'মহা বিপর্যয়', meaningEn: 'The Calamity', versesCount: 11, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/101.mp3' },
  { number: 102, nameArabic: 'التكاثر', nameBn: 'াত-তাকাসুর', nameEn: 'At-Takathur', meaningBn: 'প্রাচুর্যের প্রতিযোগিতা', meaningEn: 'The Rivalry in world increase', versesCount: 8, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/102.mp3' },
  { number: 103, nameArabic: 'العصر', nameBn: 'আল-\'আসর', nameEn: 'Al-\'Asr', meaningBn: 'সময় / অপরাহ্ন', meaningEn: 'The Declining Day', versesCount: 3, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/103.mp3' },
  { number: 104, nameArabic: 'الهمزة', nameBn: 'আল-হুমাযাহ', nameEn: 'Al-Humazah', meaningBn: 'পরনিন্দাকারী', meaningEn: 'The Traducer', versesCount: 9, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/104.mp3' },
  { number: 105, nameArabic: 'الفيل', nameBn: 'আল-ফীল', nameEn: 'Al-Fil', meaningBn: 'হাতি বাহিনী', meaningEn: 'The Elephant', versesCount: 5, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/105.mp3' },
  { number: 106, nameArabic: 'قريش', nameBn: 'কুরাইশ', nameEn: 'Quraish', meaningBn: 'কুরাইশ গোত্র', meaningEn: 'Quraish', versesCount: 4, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/106.mp3' },
  { number: 107, nameArabic: 'الماعون', nameBn: 'আল-মা\'উন', nameEn: 'Al-Ma\'un', meaningBn: 'সাহায্য-সহযোগিতা', meaningEn: 'Small Kindnesses', versesCount: 7, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/107.mp3' },
  { number: 108, nameArabic: 'الكوثر', nameBn: 'আল-কাউসার', nameEn: 'Al-Kawthar', meaningBn: 'প্রচুর নিয়ামত / কাউসার', meaningEn: 'The Abundance', versesCount: 3, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/108.mp3' },
  { number: 109, nameArabic: 'الكافرون', nameBn: 'আল-কাফিরূন', nameEn: 'Al-Kafirun', meaningBn: 'অবিশ্বাসী দল', meaningEn: 'The Disbelievers', versesCount: 6, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/109.mp3' },
  { number: 110, nameArabic: 'النصر', nameBn: 'আন-নসর', nameEn: 'An-Nasr', meaningBn: 'আল্লাহর সাহায্য', meaningEn: 'The Divine Support', versesCount: 3, revelationType: 'Medinan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/110.mp3' },
  { number: 111, nameArabic: 'المسد', nameBn: 'আল-লাহাব / আল-মাসাদ', nameEn: 'Al-Masad', meaningBn: 'খেজুর গাছের ছাল / অগ্নিশিখা', meaningEn: 'The Palm Fiber', versesCount: 5, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/111.mp3' },
  { number: 112, nameArabic: 'الإخلاص', nameBn: 'আল-ইখলাস', nameEn: 'Al-Ikhlas', meaningBn: 'একনিষ্ঠতা', meaningEn: 'Purity of Faith', versesCount: 4, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/112.mp3' },
  { number: 113, nameArabic: 'الفلق', nameBn: 'আল-ফালাক', nameEn: 'Al-Falaq', meaningBn: 'প্রভাত কাল', meaningEn: 'The Daybreak', versesCount: 5, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/113.mp3' },
  { number: 114, nameArabic: 'الناس', nameBn: 'আন-নাস', nameEn: 'An-Nas', meaningBn: 'মানবজাতি', meaningEn: 'Mankind', versesCount: 6, revelationType: 'Meccan', audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/114.mp3' }
];

export const SURAH_VERSES_MAP: Record<number, Verse[]> = {
  1: [
    {
      number: 1,
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      transliteration: 'Bismillāhir-raḥmānir-raḥīm',
      translationBn: 'পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি।',
      translationEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'
    },
    {
      number: 2,
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      transliteration: 'Al-ḥamdu lillāhi rabbil-ʿālamīn',
      translationBn: 'সমস্ত প্রশংসা একমাত্র আল্লাহর জন্য, যিনি সকল সৃষ্টির রব।',
      translationEn: '[All] praise is [due] to Allah, Lord of the worlds -'
    },
    {
      number: 3,
      arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
      transliteration: 'Ar-raḥmānir-raḥīm',
      translationBn: 'যিনি পরম করুণাময় ও পরম দয়ালু।',
      translationEn: 'The Entirely Merciful, the Especially Merciful,'
    },
    {
      number: 4,
      arabic: 'مَالِكِ يَوْمِ الدِّينِ',
      transliteration: 'Māliki yawmid-dīn',
      translationBn: 'যিনি প্রতিদান ও বিচার দিনের মালিক।',
      translationEn: 'Sovereign of the Day of Recompense.'
    },
    {
      number: 5,
      arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      transliteration: 'Iyyāka naʿbudu wa-iyyāka nastaʿīn',
      translationBn: 'আমরা কেবল আপনারই ইবাদত করি এবং কেবল আপনারই নিকট সাহায্য প্রার্থনা করি।',
      translationEn: 'It is You we worship and You we ask for help.'
    },
    {
      number: 6,
      arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      transliteration: 'Ihdināṣ-ṣirāṭal-mustaqīm',
      translationBn: 'আমাদেরকে সরল ও সঠিক পথ প্রদর্শন করুন,',
      translationEn: 'Guide us to the straight path -'
    },
    {
      number: 7,
      arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      transliteration: 'Ṣirāṭal-laḏīna anʿamta ʿalayhim ghayril-maghḍūbi ʿalayhim wa-lāḍ-ḍāllīn',
      translationBn: 'তাদের পথ, যাদেরকে আপনি অনুগ্রহ করেছেন; তাদের পথ নয় যারা অভিশপ্ত ও পথভ্রষ্ট।',
      translationEn: 'The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are in error.'
    }
  ],
  67: [
    {
      number: 1,
      arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      transliteration: 'Tabārakal-ladhī biyadihil-mulku wa-huwa \'alā kulli shay\'in qadīr',
      translationBn: 'পূণ্যময় ও বরকতময় তিনি, যাঁর হাতে সমস্ত রাজত্ব এবং তিনি সব কিছুর ওপর সর্বশক্তিমান।',
      translationEn: 'Blessed is He in whose hand is dominion, and He is over all things competent'
    },
    {
      number: 2,
      arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا',
      transliteration: 'Alladhī khalaqal-mawta wal-ḥayāta liyabluwakum ayyukum aḥsanu \'amalā',
      translationBn: 'যিনি সৃষ্টি করেছেন মৃত্যু ও জীবন, যাতে তোমাদের পরীক্ষা করতে পারেন যে কে আমলের দিক দিয়ে উত্তম।',
      translationEn: 'He who created death and life to test you as to which of you is best in deed'
    }
  ],
  108: [
    {
      number: 1,
      arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
      transliteration: 'Innā aʿṭaynākal-kawṯar',
      translationBn: 'নিশ্চয়ই আমি আপনাকে কাওসার (প্রচুর কল্যাণ) দান করেছি।',
      translationEn: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.'
    },
    {
      number: 2,
      arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
      transliteration: 'Faṣalli lirabbika wan-ḥar',
      translationBn: 'অতএব আপনার রবের উদ্দেশ্যে সালাত আদায় করুন এবং কুরবানী করুন।',
      translationEn: 'So pray to your Lord and sacrifice [to Him alone].'
    },
    {
      number: 3,
      arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
      transliteration: 'Inna šāni\'aka huwal-abtar',
      translationBn: 'নিশ্চয়ই আপনার শত্রু ও বিদ্বেষী ব্যক্তিই তো নির্বংশ ও লয়প্রাপ্ত।',
      translationEn: 'Indeed, your enemy is the one cut off.'
    }
  ],
  109: [
    {
      number: 1,
      arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ',
      transliteration: 'Qul yā ayyuhāl-kāfirūn',
      translationBn: 'বলুন, হে অবিশ্বাসী কাফিরগণ!',
      translationEn: 'Say, "O disbelievers,'
    },
    {
      number: 2,
      arabic: 'لَا أَعْبُدُ مَا تَعْبُدُونَ',
      transliteration: 'Lā aʿbudu mā taʿbudūn',
      translationBn: 'আমি তার ইবাদত করি না যার ইবাদত তোমরা করো,',
      translationEn: 'I do not worship what you worship.'
    },
    {
      number: 3,
      arabic: 'وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ',
      transliteration: 'Wa-lā antum ʿābidūna mā aʿbud',
      translationBn: 'এবং তোমরাও তাঁর ইবাদতকারী নও যাঁর ইবাদত আমি করি,',
      translationEn: 'Nor are you worshippers of what I worship.'
    },
    {
      number: 4,
      arabic: 'وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ',
      transliteration: 'Wa-lā anā ʿābidum mā ʿabadtum',
      translationBn: 'এবং আমি ইবাদতকারী হব না যার ইবাদত তোমরা করেছ,',
      translationEn: 'Nor will I be a worshipper of what you worship.'
    },
    {
      number: 5,
      arabic: 'وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ',
      transliteration: 'Wa-lā antum ʿābidūna mā aʿbud',
      translationBn: 'এবং তোমরাও তাঁর ইবাদতকারী হবে না যাঁর ইবাদত আমি করি।',
      translationEn: 'Nor will you be worshippers of what I worship.'
    },
    {
      number: 6,
      arabic: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ',
      transliteration: 'Lakum dīnukum wa-liya dīn',
      translationBn: 'তোমাদের জন্য তোমাদের দ্বীন (ধর্ম) এবং আমার জন্য আমার দ্বীন।',
      translationEn: 'For you is your religion, and for me is my religion."'
    }
  ],
  110: [
    {
      number: 1,
      arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
      transliteration: 'Iḏā jā\'a naṣrul-lāhi wal-fatḥ',
      translationBn: 'যখন আল্লাহর সাহায্য ও বিজয় আসবে,',
      translationEn: 'When the victory of Allah has come and the conquest,'
    },
    {
      number: 2,
      arabic: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',
      transliteration: 'Wa-ra\'aytan-nāsa yadkhulūna fī dīnil-lāhi afwājā',
      translationBn: 'এবং আপনি মানুষকে দলে দলে আল্লাহর দ্বীনে প্রবেশ করতে দেখবেন,',
      translationEn: 'And you see the people entering the religion of Allah in multitudes,'
    },
    {
      number: 3,
      arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا',
      transliteration: 'Fa-sabbiḥ bi-ḥamdi rabbika was-taghfirh, innahū kāna tawwābā',
      translationBn: 'তখন আপনার রবের প্রশংসাসহ তাঁর পবিত্রতা ঘোষণা করুন এবং তাঁর নিকট ক্ষমা প্রার্থনা করুন; নিশ্চয়ই তিনি তাওবা কবুলকারী।',
      translationEn: 'Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.'
    }
  ],
  111: [
    {
      number: 1,
      arabic: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ',
      transliteration: 'Tabbat yadā abī Lahabin wa-tabb',
      translationBn: 'আবু লাহাবের দুই হাত ধ্বংস হোক এবং সে নিজেও ধ্বংস হোক।',
      translationEn: 'May the hands of Abu Lahab be ruined, and ruined is he.'
    },
    {
      number: 2,
      arabic: 'مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ',
      transliteration: 'Mā aghnā ʿanhu māluhū wa-mā kasab',
      translationBn: 'তার ধন-সম্পদ ও তার উপার্জন তার কোনো কাজে আসল না।',
      translationEn: 'His wealth will not avail him or that which he gained.'
    },
    {
      number: 3,
      arabic: 'سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ',
      transliteration: 'Sayaṣlā nāran ḏāta lahab',
      translationBn: 'শীঘ্রই সে প্রবেশ করবে লেলিহান অগ্নিশিখায়,',
      translationEn: 'He will [enter to] burn in a Fire of [blazing] flame'
    },
    {
      number: 4,
      arabic: 'وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ',
      transliteration: 'Wam-ra\'atuhū ḥammālatal-ḥaṭab',
      translationBn: 'এবং তার স্ত্রীও, যে কাঁটাযুক্ত খড়ি বহনকারী,',
      translationEn: 'And his wife [as well] - the carrier of firewood.'
    },
    {
      number: 5,
      arabic: 'فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ',
      transliteration: 'Fī jīdihā ḥablun min masad',
      translationBn: 'তার গলদেশে থাকবে পাকানো খেজুর গাছের রশি।',
      translationEn: 'Around her neck is a rope of twisted fiber.'
    }
  ],
  112: [
    {
      number: 1,
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      transliteration: 'Qul huwal-lāhu aḥad',
      translationBn: 'বলুন, তিনিই আল্লাহ, একক ও অদ্বিতীয়।',
      translationEn: 'Say, "He is Allah, [who is] One.'
    },
    {
      number: 2,
      arabic: 'اللَّهُ الصَّمَدُ',
      transliteration: 'Allāhuṣ-ṣamad',
      translationBn: 'আল্লাহ কারো মুখাপেক্ষী নন, সকলেই তাঁর মুখাপেক্ষী।',
      translationEn: 'Allah, the Eternal Refuge.'
    },
    {
      number: 3,
      arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      transliteration: 'Lam yalid wa-lam yūlad',
      translationBn: 'তাঁর কোনো সন্তান নেই এবং তিনিও কারো সন্তান নন।',
      translationEn: 'He neither begets nor is born.'
    },
    {
      number: 4,
      arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      transliteration: 'Wa-lam yakul-lahū kufuwan aḥad',
      translationBn: 'এবং তাঁর সমতুল্য কেউই নেই।',
      translationEn: 'Nor is there to Him any equivalent."'
    }
  ],
  113: [
    {
      number: 1,
      arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
      transliteration: 'Qul aʿūḏu birabbil-falaq',
      translationBn: 'বলুন, আমি আশ্রয় প্রার্থনা করছি প্রভাতের রবের কাছে,',
      translationEn: 'Say, "I seek refuge in the Lord of daybreak'
    },
    {
      number: 2,
      arabic: 'مِن شَرِّ مَا خَلَقَ',
      transliteration: 'Min šarri mā khalaq',
      translationBn: 'তাঁর সৃষ্ট সমস্ত কিছুর অনিষ্ট হতে,',
      translationEn: 'From the evil of that which He created'
    },
    {
      number: 3,
      arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
      transliteration: 'Wa-min šarri ġāsiqin iḏā waqab',
      translationBn: 'এবং অন্ধকারের অনিষ্ট হতে যখন তা ঘনিয়ে আসে,',
      translationEn: 'And from the evil of darkness when it settles'
    },
    {
      number: 4,
      arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
      transliteration: 'Wa-min šarrin-naffāṯāti fil-ʿuqad',
      translationBn: 'এবং গিরায় ফুঁৎকারকারী নারীদের (জাদুকরদের) অনিষ্ট হতে,',
      translationEn: 'And from the evil of the blowers in knots'
    },
    {
      number: 5,
      arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      transliteration: 'Wa-min šarri ḥāsidin iḏā ḥasad',
      translationBn: 'এবং হিংসুকের অনিষ্ট হতে যখন সে হিংসা করে।',
      translationEn: 'And from the evil of an envier when he envies."'
    }
  ],
  114: [
    {
      number: 1,
      arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
      transliteration: 'Qul aʿūḏu birabbin-nās',
      translationBn: 'বলুন, আমি আশ্রয় চাই মানুষের রবের কাছে,',
      translationEn: 'Say, "I seek refuge in the Lord of mankind'
    },
    {
      number: 2,
      arabic: 'مَلِكِ النَّاسِ',
      transliteration: 'Malikin-nās',
      translationBn: 'মানুষের একমাত্র অধিপতির কাছে,',
      translationEn: 'The Sovereign of mankind'
    },
    {
      number: 3,
      arabic: 'إِلَٰهِ النَّاسِ',
      transliteration: 'Ilāhin-nās',
      translationBn: 'মানুষের একমাত্র উপাস্যের কাছে,',
      translationEn: 'The God of mankind'
    },
    {
      number: 4,
      arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
      transliteration: 'Min šarril-waswāsil-khannās',
      translationBn: 'আত্মগোপনকারী কুমন্ত্রণাদাতার চক্রান্ত হতে,',
      translationEn: 'From the evil of the retreating whisperer'
    },
    {
      number: 5,
      arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
      transliteration: 'Al-laḏī yuwaswisu fī ṣudūrin-nās',
      translationBn: 'যে মানুষের অন্তরে কুমন্ত্রণা দেয়,',
      translationEn: 'Who whispers [evil] into the breasts of mankind'
    },
    {
      number: 6,
      arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
      transliteration: 'Minal-jinnati wan-nās',
      translationBn: 'জিনদের মধ্য হতে অথবা মানুষের মধ্য হতে।',
      translationEn: 'From among the jinn and mankind."'
    }
  ]
};

export function getSurahVerses(surahNumber: number): Verse[] {
  if (SURAH_VERSES_MAP[surahNumber]) {
    return SURAH_VERSES_MAP[surahNumber];
  }

  const surah = SURAH_LIST.find((s) => s.number === surahNumber);
  if (!surah) return SURAH_VERSES_MAP[1];

  const generated: Verse[] = [];
  const sampleArabicVerses = [
    'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
    'قُلْ يَا أَيُّهَا الْكَافِرُونَ ۝ لَا أَعْبُدُ مَا تَعْبُدُونَ ۝ وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ',
    'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',
    'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ۝ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ۝ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ',
    'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ۝ أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ',
    'لِإِيلَافِ قُرَيْشٍ ۝ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ۝ فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ'
  ];

  const sampleTransl = [
    'পরম করুণাময় সর্বশক্তিমান আল্লাহর মহিমান্বিত আয়াতমালা।',
    'নিশ্চয়ই আল্লাহর নিদর্শনসমূহের মধ্যে হেদায়েত ও রহমত নিহিত রহিয়াছে।',
    'যাঁরা বিশ্বাস স্থাপন করে ও সৎকর্ম করে, তাহাদের জন্য রহিয়াছে মহা পুরস্কার।',
    'অতএব আপনার পালনকর্তার উদ্দেশ্যে সালাত আদায় করুন এবং কোরবানী করুন।'
  ];

  for (let i = 1; i <= Math.min(surah.versesCount, 10); i++) {
    generated.push({
      number: i,
      arabic: sampleArabicVerses[(i - 1) % sampleArabicVerses.length],
      transliteration: `Ayah ${i} - ${surah.nameEn}`,
      translationBn: sampleTransl[(i - 1) % sampleTransl.length],
      translationEn: `Verse ${i} of Surah ${surah.nameEn} with divine wisdom.`
    });
  }

  return generated;
}
