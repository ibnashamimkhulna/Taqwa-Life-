import { Verse } from '../types';
import { SURAH_VERSES_MAP } from '../data/quranData';

// In-memory cache for fetched surah verses
const surahCache: Record<number, Verse[]> = {};

export async function fetchSurahVerses(surahNumber: number): Promise<Verse[]> {
  // Check local built-in map first
  if (SURAH_VERSES_MAP[surahNumber]) {
    return SURAH_VERSES_MAP[surahNumber];
  }

  // Check in-memory cache
  if (surahCache[surahNumber]) {
    return surahCache[surahNumber];
  }

  try {
    // Fetch Arabic Uthmani, Bengali translation, and English Sahih International in a single API request
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,bn.bengali,en.sahih`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.code === 200 && data.data && data.data.length >= 3) {
      const arabicAyahs = data.data[0].ayahs;
      const bnAyahs = data.data[1].ayahs;
      const enAyahs = data.data[2].ayahs;

      let verses: Verse[] = arabicAyahs.map((ayah: any, index: number) => {
        let arabicText = ayah.text;

        // Strip Bismillah prefix if present at start of Ayah 1 so Bismillah is rendered as a standalone header
        if (surahNumber !== 9 && index === 0) {
          const bismillahPrefixes = [
            "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ"
          ];
          for (const prefix of bismillahPrefixes) {
            if (arabicText.startsWith(prefix)) {
              arabicText = arabicText.replace(prefix, "").trim();
              break;
            }
          }
        }

        return {
          number: ayah.numberInSurah,
          arabic: arabicText,
          transliteration: `সূরা নং ${surahNumber} • আয়াত ${ayah.numberInSurah}`,
          translationBn: bnAyahs[index]?.text || "অনুবাদ প্রস্তুত হচ্ছে...",
          translationEn: enAyahs[index]?.text || ""
        };
      });

      // Filter out empty verse if stripping Bismillah made Ayah 1 empty (e.g. if API had Bismillah as entire Ayah 1)
      if (surahNumber === 1 && verses[0] && (!verses[0].arabic || verses[0].arabic.length < 3)) {
        verses = verses.slice(1).map((v, i) => ({ ...v, number: i + 1 }));
      }

      // Add Emdadia Waqf Sign Mim-Lam (مـ) to Surah Fatihah Ayah 6/7
      if (surahNumber === 1 && verses.length >= 6) {
        verses = verses.map((v) => {
          if (v.number === 6 && !v.arabic.includes('مـ')) {
            return { ...v, arabic: `${v.arabic}  مـ` };
          }
          return v;
        });
      }

      // Store in cache
      surahCache[surahNumber] = verses;
      return verses;
    }
  } catch (error) {
    console.warn(`Failed to fetch verses for surah ${surahNumber} from API:`, error);
  }

  // Fallback if network offline: return clean fallback message rather than misleading repeated surah text
  return [
    {
      number: 1,
      arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      transliteration: "Bismillahir Rahmanir Rahim",
      translationBn: "ইন্টারনেট সংযোগ যাচাই করুন। সূরাটির আয়াতসমূহ ডাউনলোড করা হচ্ছে...",
      translationEn: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
    }
  ];
}
