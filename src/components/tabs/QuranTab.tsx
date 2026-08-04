import React, { useState, useEffect, useRef } from 'react';
import { Surah, Verse, Language } from '../../types';
import { SURAH_LIST, getSurahVerses } from '../../data/quranData';
import { fetchSurahVerses } from '../../utils/quranApi';
import {
  Search,
  BookOpen,
  Play,
  Pause,
  ArrowLeft,
  Volume2,
  Bookmark,
  Check,
  Type,
  FileText,
  Sliders,
  RotateCcw,
  Sparkles,
  Loader2
} from 'lucide-react';

interface QuranTabProps {
  language: Language;
}

export const QuranTab: React.FC<QuranTabProps> = ({ language }) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'translation' | 'hafezi'>('translation');

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Styling / Customization States
  const [fontSize, setFontSize] = useState<number>(26);
  const [paperTheme, setPaperTheme] = useState<'cream' | 'white' | 'dark'>('cream');
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);

  // Async load authentic Uthmani & Bengali translation verses for selected surah
  useEffect(() => {
    if (selectedSurah) {
      setIsLoadingVerses(true);
      fetchSurahVerses(selectedSurah.number)
        .then((data) => {
          setVerses(data);
        })
        .catch(() => {
          setVerses(getSurahVerses(selectedSurah.number));
        })
        .finally(() => {
          setIsLoadingVerses(false);
        });
    } else {
      setVerses([]);
    }
  }, [selectedSurah]);

  // Filter 114 Surahs
  const filteredSurahs = SURAH_LIST.filter(
    (s) =>
      s.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.meaningBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString() === searchQuery.trim()
  );

  // Audio setup and cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleSelectSurah = (surah: Surah) => {
    // Stop any currently playing audio if switching Surah
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setSelectedSurah(surah);
    setCurrentAudioUrl(null);
    setAudioProgress(0);
    setCurrentTime(0);
  };

  const togglePlayAudio = (surah: Surah) => {
    const targetUrl = surah.audioUrl || `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${surah.number}.mp3`;

    if (isPlaying && currentAudioUrl === targetUrl && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current && currentAudioUrl === targetUrl) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Fallback CDN if main source fails
        const fallbackUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surah.number}.mp3`;
        startNewAudio(fallbackUrl);
      });
      return;
    }

    startNewAudio(targetUrl, surah.number);
  };

  const startNewAudio = (url: string, surahNum?: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const newAudio = new Audio(url);
    newAudio.playbackRate = playbackSpeed;
    audioRef.current = newAudio;
    setCurrentAudioUrl(url);

    newAudio.ontimeupdate = () => {
      if (newAudio.duration) {
        setAudioProgress((newAudio.currentTime / newAudio.duration) * 100);
        setCurrentTime(newAudio.currentTime);
        setAudioDuration(newAudio.duration);
      }
    };

    newAudio.onended = () => {
      setIsPlaying(false);
      setAudioProgress(0);
      setCurrentTime(0);
    };

    newAudio.onerror = () => {
      if (surahNum) {
        // Retry with alternative reliable CDN
        const altUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahNum}.mp3`;
        const altAudio = new Audio(altUrl);
        altAudio.playbackRate = playbackSpeed;
        audioRef.current = altAudio;
        setCurrentAudioUrl(altUrl);
        altAudio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    };

    newAudio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn('Audio play error:', err);
        setIsPlaying(false);
      });
  };

  const handleSpeedChange = () => {
    const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleBookmark = (verseNum: number) => {
    setBookmarkedVerses((prev) =>
      prev.includes(verseNum) ? prev.filter((v) => v !== verseNum) : [...prev, verseNum]
    );
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Convert Arabic number to Eastern Arabic Digits for Hafezi Quran verse ends
  const toArabicNumber = (num: number) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
      .toString()
      .split('')
      .map((d) => arabicDigits[parseInt(d, 10)])
      .join('');
  };

  // Render Single Surah Detail View
  if (selectedSurah) {
    return (
      <div className="space-y-4 animate-fade-in pb-8">
        {/* Navigation Bar */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 card-shadow flex items-center justify-between sticky top-14 z-20">
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              setIsPlaying(false);
              setSelectedSurah(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-forest bg-mint/40 px-3 py-1.5 rounded-xl hover:bg-mint smooth-press cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সূরা তালিকা</span>
          </button>

          <div className="text-center">
            <h3 className="text-sm font-bold text-charcoal flex items-center justify-center gap-1.5">
              <span>{selectedSurah.nameBn}</span>
              <span className="font-arabic text-forest">({selectedSurah.nameArabic})</span>
            </h3>
            <p className="text-[10px] text-gray-500">
              সূরা নং {selectedSurah.number} • {selectedSurah.versesCount}টি আয়াত • {selectedSurah.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}
            </p>
          </div>

          <button
            onClick={() => togglePlayAudio(selectedSurah)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all shadow-md cursor-pointer ${
              isPlaying ? 'bg-amber-600 animate-pulse' : 'bg-forest hover:bg-forest-dark'
            }`}
            title={isPlaying ? 'বিরতি দিন' : 'তেলাওয়াত শুনুন'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </div>

        {/* Audio Recitation Player Bar */}
        <div className="bg-white p-3.5 rounded-2xl border border-forest/20 card-shadow space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-forest animate-bounce' : 'text-gray-400'}`} />
              <div>
                <span className="font-bold text-charcoal">মিশারী রাশিদ আল-আফাসী</span>
                <span className="text-[10px] text-gray-400 block">পূর্ণ সূরা তেলাওয়াত</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeedChange}
                className="text-[10px] font-bold text-forest bg-mint px-2 py-1 rounded-lg hover:bg-mint/80 transition-colors"
              >
                {playbackSpeed}x
              </button>
              <span className="text-[11px] font-mono text-gray-500">
                {formatTime(currentTime)} / {formatTime(audioDuration)}
              </span>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden cursor-pointer">
            <div
              className="bg-forest h-full transition-all duration-300"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        </div>

        {/* View Mode Selector (Translation vs Bangladeshi Hafezi Quran) */}
        <div className="bg-gray-100 p-1 rounded-2xl flex items-center text-xs font-bold text-gray-600">
          <button
            onClick={() => setViewMode('translation')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'translation'
                ? 'bg-white text-forest shadow-xs'
                : 'hover:text-charcoal'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>অর্থ ও অনুবাদসহ</span>
          </button>

          <button
            onClick={() => setViewMode('hafezi')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'hafezi'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'hover:text-charcoal'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>হাফেজী কুরআন (বাংলা)</span>
          </button>
        </div>

        {/* Customization Toolbar */}
        <div className="bg-white p-3 rounded-2xl border border-gray-100 card-shadow flex items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Type className="w-4 h-4 text-forest" />
            <span className="text-[11px] font-medium">ফন্ট সাইজ:</span>
            <input
              type="range"
              min="20"
              max="40"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-20 accent-forest cursor-pointer"
            />
            <span className="font-bold text-forest w-6">{fontSize}px</span>
          </div>

          {viewMode === 'hafezi' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-500 hidden sm:inline">কাগজ:</span>
              <button
                onClick={() => setPaperTheme('cream')}
                className={`w-6 h-6 rounded-full border ${
                  paperTheme === 'cream' ? 'border-amber-600 ring-2 ring-amber-300' : 'border-gray-300'
                } bg-[#FFFDF5]`}
                title="ক্রিম পেপার"
              />
              <button
                onClick={() => setPaperTheme('white')}
                className={`w-6 h-6 rounded-full border ${
                  paperTheme === 'white' ? 'border-forest ring-2 ring-forest/30' : 'border-gray-300'
                } bg-white`}
                title="সাদা"
              />
              <button
                onClick={() => setPaperTheme('dark')}
                className={`w-6 h-6 rounded-full border ${
                  paperTheme === 'dark' ? 'border-gray-500 ring-2 ring-gray-600' : 'border-gray-300'
                } bg-slate-900`}
                title="নাইট মোড"
              />
            </div>
          )}
        </div>

        {/* ----------------- HAFEZI QURAN VIEW ----------------- */}
        {isLoadingVerses ? (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 card-shadow flex flex-col items-center justify-center text-center space-y-3 my-4">
            <Loader2 className="w-8 h-8 text-forest animate-spin" />
            <p className="text-xs font-bold text-charcoal">
              পবিত্র কুরআনের বিশুদ্ধ আরবি পাঠ ও বাংলা অনুবাদ ডাউনলোড হচ্ছে...
            </p>
            <p className="text-[10px] text-gray-400">
              সূরা {selectedSurah.nameBn} ({selectedSurah.versesCount}টি আয়াত)
            </p>
          </div>
        ) : viewMode === 'hafezi' ? (
          <div
            className={`p-4 sm:p-6 rounded-3xl border-4 transition-all duration-300 space-y-6 ${
              paperTheme === 'cream'
                ? 'bg-[#FFFDF3] text-[#2C1D11] border-amber-900/20 shadow-md'
                : paperTheme === 'dark'
                ? 'bg-slate-950 text-slate-100 border-slate-800 shadow-md'
                : 'bg-white text-gray-900 border-emerald-900/20 shadow-md'
            }`}
          >
            {/* Traditional Hafezi Quran Decorative Header */}
            <div className="border-2 border-double border-amber-800/40 p-4 rounded-2xl text-center space-y-2 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5">
              <div className="text-xs font-bold tracking-widest text-amber-800 uppercase">
                {selectedSurah.revelationType === 'Meccan' ? 'سُورَةٌ مَكِّيَّةٌ' : 'سُورَةٌ مَدَنِيَّةٌ'}
              </div>
              <h2
                className="font-arabic font-bold text-amber-900 drop-shadow-xs leading-none"
                style={{ fontSize: `${fontSize + 8}px` }}
              >
                سُورَةُ {selectedSurah.nameArabic}
              </h2>
              <div className="text-[11px] font-sans font-medium text-amber-700/80">
                {selectedSurah.nameBn} • আয়াত সংখ্যা: {selectedSurah.versesCount}
              </div>
            </div>

            {/* Bismillah Header (Except Surah At-Tawbah #9) */}
            {selectedSurah.number !== 9 && (
              <div className="text-center py-2">
                <p
                  className="font-arabic font-bold text-amber-800/90 leading-relaxed"
                  style={{ fontSize: `${fontSize + 4}px` }}
                >
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>
              </div>
            )}

            {/* Continuous Hafezi Text Block with Verse End Symbols ۝ */}
            <div
              className="font-arabic font-bold text-right leading-[2.6] tracking-wide dir-rtl space-y-4 pt-2"
              style={{ fontSize: `${fontSize}px` }}
            >
              <p className="inline text-justify">
                {verses.map((v) => (
                  <React.Fragment key={v.number}>
                    <span>{v.arabic}</span>
                    <span className="inline-flex items-center justify-center mx-1.5 text-amber-700 font-sans text-xs px-1.5 py-0.5 rounded-full border border-amber-700/30 bg-amber-500/10">
                      ۝{toArabicNumber(v.number)}
                    </span>
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Footer Notice */}
            <div className="border-t border-amber-900/10 pt-4 text-center text-[10px] text-amber-800/60 font-medium">
              বাংলাদেশী স্ট্যান্ডার্ড হাফেজী কুরআন মোড • বিশুদ্ধ আরবি পাঠ
            </div>
          </div>
        ) : (
          /* ----------------- TRANSLATION & VERSE VIEW ----------------- */
          <div className="space-y-3">
            {/* Bismillah Banner */}
            {selectedSurah.number !== 9 && (
              <div className="bg-gradient-to-br from-forest to-forest-dark text-white p-5 rounded-2xl text-center card-shadow relative overflow-hidden border border-forest/20">
                <p
                  className="font-arabic font-bold text-mint leading-relaxed"
                  style={{ fontSize: `${fontSize + 2}px` }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-[11px] text-white/80 mt-1">
                  পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি
                </p>
              </div>
            )}

            {/* Verses List */}
            {verses.map((verse) => {
              const isBookmarked = bookmarkedVerses.includes(verse.number);

              return (
                <div
                  key={verse.number}
                  className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3 transition-all hover:border-forest/20"
                >
                  {/* Verse Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 text-xs">
                    <span className="w-7 h-7 bg-mint text-forest font-extrabold rounded-lg flex items-center justify-center text-xs">
                      {verse.number}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmark(verse.number)}
                        className="text-gray-400 hover:text-forest p-1.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                        title="বুকমার্ক করুন"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isBookmarked ? 'text-softgold fill-softgold' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <p
                    className="font-arabic font-bold text-charcoal text-right leading-loose pt-1"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {verse.arabic}
                  </p>

                  {/* Transliteration */}
                  <p className="text-xs text-forest font-medium italic bg-mint/20 p-2.5 rounded-xl border border-forest/10 leading-relaxed">
                    {verse.transliteration}
                  </p>

                  {/* Bangla Translation */}
                  <p className="text-xs text-charcoal font-sans leading-relaxed">
                    {verse.translationBn}
                  </p>

                  {/* English Translation */}
                  <p className="text-[11px] text-gray-500 font-sans italic border-t border-gray-50 pt-2">
                    {verse.translationEn}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Render 114 Surahs Index List
  return (
    <div className="space-y-4 animate-fade-in pb-8">
      {/* Search Input Box */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 card-shadow flex items-center gap-2">
        <Search className="w-4 h-4 text-forest shrink-0 ml-1" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            language === 'BN'
              ? 'সূরা খুঁজুন (যেমন: ইয়াসীন, রহমান, ১, ১১৪...)'
              : 'Search Surah name or number...'
          }
          className="w-full text-xs text-charcoal outline-none bg-transparent placeholder:text-gray-400 font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-gray-400 hover:text-charcoal px-2"
          >
            মুছুন
          </button>
        )}
      </div>

      {/* Surah List Header Banner */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-white p-4 rounded-2xl card-shadow flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-mint" />
            <span>পবিত্র আল-কুরআনের সূরাসমূহ</span>
          </h3>
          <p className="text-[10px] text-white/80 mt-0.5">
            সম্পূর্ণ ১১৪টি সূরা • অডিও তেলাওয়াত ও হাফেজী কুরআন মোড
          </p>
        </div>

        <span className="text-xs font-black bg-mint text-forest px-3 py-1 rounded-xl shadow-xs">
          ১১৪টি সূরা
        </span>
      </div>

      {/* Surah List Items */}
      <div className="space-y-2">
        {filteredSurahs.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl text-center text-xs text-gray-500 border border-gray-100">
            কোনো সূরা খুঁজে পাওয়া যায়নি। অনুসন্ধানের বানান পরীক্ষা করুন।
          </div>
        ) : (
          filteredSurahs.map((surah) => (
            <div
              key={surah.number}
              onClick={() => handleSelectSurah(surah)}
              className="p-3.5 bg-white hover:bg-mint/30 rounded-2xl border border-gray-100 card-shadow flex items-center justify-between cursor-pointer transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-mint text-forest font-black rounded-xl flex items-center justify-center text-xs shadow-xs group-hover:bg-forest group-hover:text-white transition-colors">
                  {surah.number}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-charcoal group-hover:text-forest transition-colors">
                      {language === 'BN' ? surah.nameBn : surah.nameEn}
                    </h4>
                    <span className="text-[9px] bg-softbg text-gray-500 px-2 py-0.5 rounded-full font-medium border border-gray-100">
                      {surah.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    অর্থ: {surah.meaningBn} • {surah.versesCount}টি আয়াত
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayAudio(surah);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isPlaying && currentAudioUrl?.includes(`/${surah.number}.mp3`)
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-mint/60 text-forest hover:bg-forest hover:text-white'
                  }`}
                  title="অডিও প্লে করুন"
                >
                  {isPlaying && currentAudioUrl?.includes(`/${surah.number}.mp3`) ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </button>

                <span className="font-arabic text-lg font-bold text-forest">
                  {surah.nameArabic}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
