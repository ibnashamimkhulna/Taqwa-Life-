import React, { useState, useEffect, useRef } from 'react';
import { Surah, Verse, Language } from '../../types';
import { SURAH_LIST, getSurahVerses, SURAH_PAGES } from '../../data/quranData';
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
  RotateCw,
  Sparkles,
  Loader2
} from 'lucide-react';

interface QuranTabProps {
  language: Language;
  onOpenPdfViewer?: () => void;
}

export const QuranTab: React.FC<QuranTabProps> = ({ language, onOpenPdfViewer }) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'translation' | 'hafezi'>('translation');

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAudioSurah, setActiveAudioSurah] = useState<Surah | null>(null);
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
    setSelectedSurah(surah);
  };

  const togglePlayAudio = (surah: Surah) => {
    const targetUrl = surah.audioUrl || `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${surah.number}.mp3`;

    // If clicking on same active Surah
    if (activeAudioSurah?.number === surah.number && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          const fallbackUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surah.number}.mp3`;
          startNewAudio(fallbackUrl, surah);
        });
      }
      return;
    }

    // Starting audio for a new Surah
    startNewAudio(targetUrl, surah);
  };

  const startNewAudio = (url: string, surah: Surah) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const newAudio = new Audio(url);
    newAudio.playbackRate = playbackSpeed;
    audioRef.current = newAudio;
    setCurrentAudioUrl(url);
    setActiveAudioSurah(surah);

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
      // Retry with alternative reliable CDN
      const altUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surah.number}.mp3`;
      const altAudio = new Audio(altUrl);
      altAudio.playbackRate = playbackSpeed;
      audioRef.current = altAudio;
      setCurrentAudioUrl(altUrl);
      altAudio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    };

    newAudio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn('Audio play error:', err);
        setIsPlaying(false);
      });
  };

  const handleSkipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(0, audioRef.current.currentTime + seconds),
        audioDuration || 9999
      );
      setCurrentTime(audioRef.current.currentTime);
      if (audioDuration) {
        setAudioProgress((audioRef.current.currentTime / audioDuration) * 100);
      }
    }
  };

  const handleSpeedChange = () => {
    const nextSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.5 ? 2 : 1;
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = parseFloat(e.target.value);
    setAudioProgress(newPercent);
    if (audioRef.current && audioDuration > 0) {
      const targetTime = (newPercent / 100) * audioDuration;
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
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
        <div className="bg-emerald-950 text-white p-3.5 rounded-2xl border border-amber-300/40 shadow-xl flex items-center justify-between sticky top-14 z-20 backdrop-blur-md">
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              setIsPlaying(false);
              setSelectedSurah(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-white/10 px-3 py-1.5 rounded-xl hover:bg-white/20 smooth-press cursor-pointer border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সূরা তালিকা</span>
          </button>

          <div className="text-center">
            <h3 className="text-sm font-bold text-amber-300 flex items-center justify-center gap-1.5">
              <span>{selectedSurah.nameBn}</span>
              <span className="font-arabic text-amber-200">({selectedSurah.nameArabic})</span>
            </h3>
            <p className="text-[10px] text-emerald-200/90 font-medium">
              সূরা নং {selectedSurah.number} • {selectedSurah.versesCount}টি আয়াত • {selectedSurah.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}
            </p>
          </div>

          <button
            onClick={() => togglePlayAudio(selectedSurah)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all shadow-md cursor-pointer ${
              isPlaying ? 'bg-amber-500 animate-pulse text-charcoal' : 'bg-emerald-800 hover:bg-emerald-700 border border-amber-300/40'
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
            className={`p-4 sm:p-6 rounded-3xl border-4 transition-all duration-300 space-y-4 ${
              paperTheme === 'cream'
                ? 'bg-[#FFFDF3] text-[#2C1D11] border-amber-950/40 shadow-lg'
                : paperTheme === 'dark'
                ? 'bg-slate-950 text-amber-100 border-amber-500/50 shadow-2xl'
                : 'bg-white text-gray-900 border-emerald-950/40 shadow-lg'
            }`}
          >
            {/* Page Header (Margin Banner) */}
            <div className={`border-b-2 pb-2 flex justify-between items-center text-xs font-serif ${
              paperTheme === 'dark' ? 'border-amber-500/40 text-amber-300' : 'border-amber-900/40 text-amber-900'
            }`}>
              <span className="font-bold">
                {selectedSurah.number <= 2 ? 'المنجل ১ • الجزء ১' : `سورة ${selectedSurah.nameArabic}`}
              </span>
              <span className={`font-black text-sm px-2.5 py-0.5 rounded-md font-mono ${
                paperTheme === 'dark' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' : 'bg-amber-900/10 text-amber-950'
              }`}>
                সূরা {selectedSurah.number} (পৃষ্ঠা {SURAH_PAGES[selectedSurah.number] || selectedSurah.number})
              </span>
              <span className="font-bold">
                {selectedSurah.revelationType === 'Meccan' ? 'مَكِّيَّةٌ' : 'مَدَنِيَّةٌ'}
              </span>
            </div>

            {/* Traditional Hafezi Quran Ornamental Header Arch Box */}
            <div className={`border-2 p-2 text-center rounded-xl space-y-1 my-2 ${
              paperTheme === 'dark'
                ? 'border-amber-400 bg-amber-950/60 text-amber-300'
                : 'border-amber-950 bg-amber-100/50 text-amber-950'
            }`}>
              <div className="flex justify-between items-center text-[11px] font-bold px-3">
                <span>آيَاتُهَا {toArabicNumber(selectedSurah.versesCount)}</span>
                <h2 className="text-xl sm:text-2xl font-arabic font-black">
                  سُورَةُ {selectedSurah.nameArabic}
                </h2>
                <span>رُكُوعُهَا {toArabicNumber(Math.ceil(selectedSurah.versesCount / 10))}</span>
              </div>
              <div className={`text-[11px] font-sans font-extrabold ${paperTheme === 'dark' ? 'text-amber-200' : 'text-amber-800'}`}>
                {selectedSurah.nameBn} ({selectedSurah.meaningBn})
              </div>
            </div>

            {/* Bismillah Banner Box (Except Surah At-Tawbah #9) */}
            {selectedSurah.number !== 9 && (
              <div className={`border py-2 px-4 text-center rounded-lg shadow-xs my-2 ${
                paperTheme === 'dark'
                  ? 'border-amber-400/80 bg-slate-900 text-amber-300'
                  : 'border-amber-900/60 bg-amber-50/80 text-amber-950'
              }`}>
                <p
                  className="font-arabic font-black tracking-wide"
                  style={{ fontSize: `${fontSize + 2}px` }}
                >
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>
              </div>
            )}

            {/* 15-Line Ruled Bangladeshi Hafezi Quran Grid */}
            <div
              className={`border rounded-xl divide-y text-right font-arabic font-bold leading-relaxed shadow-inner ${
                paperTheme === 'dark'
                  ? 'border-amber-500/60 divide-amber-500/30 bg-slate-900/90 text-amber-100'
                  : 'border-amber-950/70 divide-amber-950/25 bg-[#FFFDF5] text-amber-950'
              }`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {verses.map((v) => (
                <div
                  key={v.number}
                  className={`p-2.5 flex items-center justify-between gap-3 transition-colors ${
                    paperTheme === 'dark' ? 'hover:bg-amber-950/40' : 'hover:bg-amber-100/30'
                  }`}
                >
                  <p className="flex-1 text-right leading-loose font-arabic">
                    {v.arabic}
                  </p>
                  <span className={`text-xs font-sans font-extrabold border rounded-full w-6 h-6 flex items-center justify-center shrink-0 shadow-xs ${
                    paperTheme === 'dark'
                      ? 'text-amber-300 border-amber-400 bg-amber-950/80'
                      : 'text-amber-900 border-amber-900/80 bg-amber-100'
                  }`}>
                    {toArabicNumber(v.number)}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Footer Notice */}
            <div className={`border-t pt-2 flex justify-between items-center text-[10px] font-sans font-medium ${
              paperTheme === 'dark' ? 'border-amber-500/30 text-amber-300/80' : 'border-amber-900/20 text-amber-900/80'
            }`}>
              <span>এমদাদিয়া লাইব্রেরী ঢাকা • নূরানী ১৫-লাইন প্রিন্ট</span>
              <span className="font-bold">তাকওয়া হাফেজী কোরআন শরীফ</span>
              <span>মনজিল ১</span>
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
      {/* Prominent "দেখে কুরআন পড়ুন" Mode Entry Banner */}
      {onOpenPdfViewer && (
        <div
          onClick={onOpenPdfViewer}
          className="bg-emerald-950/60 hover:bg-emerald-950/70 backdrop-blur-xl text-white p-4.5 rounded-3xl border border-white/40 shadow-xl flex items-center justify-between cursor-pointer smooth-press transition-all group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 shrink-0 border border-white/30">
              <FileText className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>📖 দেখে কুরআন পড়ুন (হাফেজী ও পিডিএফ মোড)</span>
                <span className="text-[9px] bg-amber-400 text-charcoal font-black px-1.5 py-0.2 rounded-md shadow-xs">
                  NEW
                </span>
              </h4>
              <p className="text-[11px] text-emerald-100/90 mt-0.5 font-medium">
                পারা, সূরা, পৃষ্ঠা ও আয়াত দিয়ে সরাসরি হাফেজী ও নিজস্ব PDF কুরআনে পাঠ করুন
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-charcoal bg-amber-300 hover:bg-white px-3.5 py-2 rounded-2xl shrink-0 shadow-md transition-all border border-white/40">
            ওপেন করুন →
          </span>
        </div>
      )}

      {/* Search Input Box */}
      <div className="bg-white/45 backdrop-blur-xl p-3.5 rounded-3xl border border-white/70 shadow-lg shadow-emerald-950/5 flex items-center gap-2">
        <Search className="w-4.5 h-4.5 text-forest shrink-0 ml-1" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            language === 'BN'
              ? 'সূরা খুঁজুন (যেমন: ইয়াসীন, রহমান, ১, ১১৪...)'
              : 'Search Surah name or number...'
          }
          className="w-full text-xs text-charcoal font-bold outline-none bg-transparent placeholder:text-gray-400 font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-black text-gray-500 hover:text-charcoal px-2"
          >
            মুছুন
          </button>
        )}
      </div>

      {/* Surah List Header Banner */}
      <div className="bg-emerald-900/50 backdrop-blur-xl text-white p-4 rounded-3xl border border-white/30 shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-200" />
            <span>পবিত্র আল-কুরআনের সূরাসমূহ (১১৪টি)</span>
          </h3>
          <p className="text-[10px] text-emerald-100/80 mt-0.5">
            প্রতিটি সূরার অডিও তেলাওয়াত, প্লেয়ার প্রোগ্রেস বার ও হাফেজী মোড
          </p>
        </div>

        <span className="text-xs font-black bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-2xl border border-white/30 shadow-xs">
          ১১৪টি সূরা
        </span>
      </div>

      {/* Surah List Items */}
      <div className="space-y-3">
        {filteredSurahs.length === 0 ? (
          <div className="bg-white/45 backdrop-blur-xl p-6 rounded-3xl text-center text-xs text-gray-600 font-bold border border-white/70 shadow-lg">
            কোনো সূরা খুঁজে পাওয়া যায়নি। অনুসন্ধানের বানান পরীক্ষা করুন।
          </div>
        ) : (
          filteredSurahs.map((surah) => {
            const isActiveAudio = activeAudioSurah?.number === surah.number;
            const isThisPlaying = isActiveAudio && isPlaying;

            return (
              <div
                key={surah.number}
                className={`bg-white/45 hover:bg-white/65 backdrop-blur-xl rounded-3xl border transition-all duration-300 shadow-lg shadow-emerald-950/5 overflow-hidden ${
                  isActiveAudio
                    ? 'border-emerald-500 ring-2 ring-emerald-400/30 bg-white/75'
                    : 'border-white/70 hover:border-emerald-500/40'
                }`}
              >
                {/* Fixed Uniform Alignment Row across all Surah slots */}
                <div
                  onClick={() => handleSelectSurah(surah)}
                  className="p-3.5 flex items-center justify-between gap-2 sm:gap-3 cursor-pointer group"
                >
                  {/* Col 1: Number Badge */}
                  <span className="w-9 h-9 bg-forest/20 backdrop-blur-md text-forest font-black rounded-2xl flex items-center justify-center text-xs border border-forest/30 shadow-xs group-hover:bg-forest group-hover:text-white transition-colors shrink-0">
                    {surah.number}
                  </span>

                  {/* Col 2: Bengali / English Name & Details */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-black text-charcoal group-hover:text-forest transition-colors truncate">
                        {language === 'BN' ? surah.nameBn : surah.nameEn}
                      </h4>
                      <span className="text-[9px] bg-white/50 text-emerald-950 px-2 py-0.2 rounded-full font-bold border border-white/80 shrink-0">
                        {surah.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-950/80 font-medium mt-0.5 truncate">
                      অর্থ: {surah.meaningBn} • {surah.versesCount}টি আয়াত
                    </p>
                  </div>

                  {/* Col 3: Arabic Name (Fixed Column Width for Perfect Vertical Alignment) */}
                  <div className="w-24 sm:w-28 text-right shrink-0">
                    <span className="font-arabic text-lg font-bold text-forest block truncate">
                      {surah.nameArabic}
                    </span>
                  </div>

                  {/* Col 4: Audio Play/Pause Button (Fixed Column Width on Far Right) */}
                  <div className="w-10 flex justify-end shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayAudio(surah);
                      }}
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                        isThisPlaying
                          ? 'bg-amber-500 text-white shadow-md animate-pulse border border-white/30'
                          : isActiveAudio
                          ? 'bg-forest text-white shadow-xs'
                          : 'bg-forest/15 text-forest hover:bg-forest hover:text-white border border-forest/20 shadow-xs'
                      }`}
                      title={isThisPlaying ? 'পজ করুন' : 'অডিও শুনুন'}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Inline Persistent Audio Player Bar (Stays visible on Pause) */}
                {isActiveAudio && (
                  <div className="bg-gradient-to-r from-emerald-950 via-forest-dark to-emerald-900 text-white p-3.5 border-t border-emerald-800/80 space-y-2.5 animate-fade-in">
                    {/* Header info */}
                    <div className="flex items-center justify-between text-xs font-bold text-mint">
                      <span className="flex items-center gap-1.5 truncate">
                        <Volume2 className="w-4 h-4 text-softgold shrink-0" />
                        <span>তেলাওয়াত: {surah.nameBn} (সূরা {surah.number})</span>
                      </span>
                      <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-md text-amber-300 font-mono">
                        {isPlaying ? '▶ প্লে হচ্ছে' : '⏸ পজ করা আছে'}
                      </span>
                    </div>

                    {/* Progress Slider (Scrubber Bar) */}
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={audioProgress}
                        onChange={handleSeek}
                        className="w-full h-2 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-softgold"
                      />
                      <div className="flex justify-between items-center text-[10px] text-emerald-200 font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(audioDuration)}</span>
                      </div>
                    </div>

                    {/* Rich Player Controls Bar (Rewind 10s, Play/Pause, Forward 10s, Speed) */}
                    <div className="flex items-center justify-between pt-1 gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* Speed Button */}
                        <button
                          onClick={handleSpeedChange}
                          className="px-2.5 py-1 bg-emerald-800/90 hover:bg-emerald-700 text-softgold rounded-lg text-[10px] font-black cursor-pointer transition-colors"
                          title="তেলাওয়াতের গতি পরিবর্তন করুন"
                        >
                          {playbackSpeed}x
                        </button>
                      </div>

                      {/* Main Audio Transport Controls Centered */}
                      <div className="flex items-center gap-2">
                        {/* -10 Sec Rewind */}
                        <button
                          onClick={() => handleSkipTime(-10)}
                          className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1"
                          title="১০ সেকেন্ড পেছনে যান"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                          <span>-১০ সে.</span>
                        </button>

                        {/* Play/Pause Toggle */}
                        <button
                          onClick={() => togglePlayAudio(surah)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                            isPlaying
                              ? 'bg-amber-500 text-white hover:bg-amber-600'
                              : 'bg-softgold text-charcoal hover:bg-white'
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>পজ ⏸</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>পুনরায় চালান ▶</span>
                            </>
                          )}
                        </button>

                        {/* +10 Sec Forward */}
                        <button
                          onClick={() => handleSkipTime(10)}
                          className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1"
                          title="১০ সেকেন্ড সামনে যান"
                        >
                          <span>+১০ সে.</span>
                          <RotateCw className="w-3.5 h-3.5 text-amber-300" />
                        </button>
                      </div>

                      {/* Right indicator */}
                      <span className="text-[10px] text-emerald-300 hidden sm:inline">
                        মেশারী আল-আফাসী
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
