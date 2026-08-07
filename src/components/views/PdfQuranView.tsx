import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Search, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  FileText,
  Sparkles,
  Bookmark,
  Check,
  RotateCcw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Language } from '../../types';
import { SURAH_LIST } from '../../data/quranData';
import * as pdfjsLib from 'pdfjs-dist';

// Set up pdf.js worker URL from a reliable CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface PdfQuranViewProps {
  onBack: () => void;
  language: Language;
}

// 30 Para / Juz mapping to 604-page Emdadia Hafezi Quran layout
const JUZ_LIST = [
  { number: 1, nameBn: 'পারা ১: আলিফ লাম মীম (الم)', startPage: 1 },
  { number: 2, nameBn: 'পারা ২: সাইয়াকূল (سَيَقُولُ)', startPage: 22 },
  { number: 3, nameBn: 'পারা ৩: তিলকার রুসুল (تِلْكَ الرُّسُلُ)', startPage: 42 },
  { number: 4, nameBn: 'পারা ৪: লান তানালু (لَنْ تَنَالُوا)', startPage: 62 },
  { number: 5, nameBn: 'পারা ৫: ওয়াল মুহসানাত (وَالْمُحْصَنَاتُ)', startPage: 82 },
  { number: 6, nameBn: 'পারা ৬: লা ইউহিব্বুল্লাহ (لا يُحِبُّ اللَّهُ)', startPage: 102 },
  { number: 7, nameBn: 'পারা ৭: ওয়াইজা সামিউ (وَإِذَا سَمِعُوا)', startPage: 122 },
  { number: 8, nameBn: 'পারা ৮: ওয়া লাও আন্নানা (وَلَوْ أَنَّنَا)', startPage: 142 },
  { number: 9, nameBn: 'পারা ৯: ক্বালাল মালাউ (قَالَ الْمَلَأُ)', startPage: 162 },
  { number: 10, nameBn: 'পারা ১০: ওয়া’লামূ (وَاعْلَمُوا)', startPage: 182 },
  { number: 11, nameBn: 'পারা ১১: ইয়া’তাজিরূনা (يَعْتَذِرُونَ)', startPage: 202 },
  { number: 12, nameBn: 'পারা ১২: ওয়া মা মিন দাব্বاتিন (وَمَا مِنْ دَابَّةٍ)', startPage: 222 },
  { number: 13, nameBn: 'পারা ১৩: ওয়া মা উবার্রিউ (وَمَا أُبَرِّئُ)', startPage: 242 },
  { number: 14, nameBn: 'পারা ১৪: আলুফ ক্বালা (رُبَمَا)', startPage: 262 },
  { number: 15, nameBn: 'পারা ১৫: সুবহানাল্লাজি (سُبْحَانَ الَّذِي)', startPage: 282 },
  { number: 16, nameBn: 'পারা ১৬: ক্বালা আলাম (قَالَ أَلَمْ)', startPage: 302 },
  { number: 17, nameBn: 'পারা ১৭: ইক্বতারা বা লিন্নাসি (اقْتَرَبَ لِلنَّاسِ)', startPage: 322 },
  { number: 18, nameBn: 'পারা ১৮: ক্বাদ আফলাহা (قَدْ أَفْلَحَ)', startPage: 342 },
  { number: 19, nameBn: 'পারা ১৯: ওয়া ক্বালাল্লাজিনা (وَقَالَ الَّذِينَ)', startPage: 362 },
  { number: 20, nameBn: 'পারা ২০: আম্মান খালাকা (أَمَّنْ خَلَقَ)', startPage: 382 },
  { number: 21, nameBn: 'পারা ২১: উতলু মা ওহিয়া (اتْلُ مَا أُوحِيَ)', startPage: 402 },
  { number: 22, nameBn: 'পারা ২২: ওয়া মান ইয়াক্বনুত (وَمَنْ يَقْنُتْ)', startPage: 422 },
  { number: 23, nameBn: 'পারা ২৩: ওয়া মা লিয়া (وَمَا لِيَ)', startPage: 442 },
  { number: 24, nameBn: 'পারা ২৪: ফামান আজলামু (فَمَنْ أَظْلَمُ)', startPage: 462 },
  { number: 25, nameBn: 'পারা ২৫: ইলাইহি ইউরাদ্দু (إِلَيْهِ يُرَدُّ)', startPage: 482 },
  { number: 26, nameBn: 'পারা ২৬: হা-মীম (حم)', startPage: 502 },
  { number: 27, nameBn: 'পারা ২৭: ক্বালা ফামা খাতবুকুম (قَالَ فَمَا خَطْبُكُمْ)', startPage: 522 },
  { number: 28, nameBn: 'পারা ২৮: ক্বাদ সামিয়াল্লাহু (قَدْ سَمِعَ اللَّهُ)', startPage: 542 },
  { number: 29, nameBn: 'পারা ২৯: তাপারাকাল্লাজি (تَبَارَكَ الَّذِي)', startPage: 562 },
  { number: 30, nameBn: 'পারা ৩০: আম্মা ইয়াতাসায়ালুন (عَمَّ يَتَسَاءَلُونَ)', startPage: 582 },
];

// Surah start page mapping for standard 604-page Emdadia Hafezi Quran
const SURAH_PAGES: Record<number, number> = {
  1: 1, 2: 2, 3: 50, 4: 77, 5: 106, 6: 128, 7: 151, 8: 177, 9: 187, 10: 208,
  11: 221, 12: 235, 13: 249, 14: 255, 15: 262, 16: 267, 17: 282, 18: 293, 19: 305, 20: 312,
  21: 322, 22: 332, 23: 342, 24: 350, 25: 359, 26: 367, 27: 377, 28: 385, 29: 396, 30: 404,
  31: 411, 32: 415, 33: 418, 34: 428, 35: 434, 36: 440, 37: 446, 38: 453, 39: 458, 40: 467,
  41: 477, 42: 483, 43: 489, 44: 496, 45: 499, 46: 502, 47: 507, 48: 511, 49: 515, 50: 518,
  51: 520, 52: 523, 53: 526, 54: 528, 55: 531, 56: 534, 57: 537, 58: 542, 59: 545, 60: 549,
  61: 551, 62: 553, 63: 554, 64: 556, 65: 558, 66: 560, 67: 562, 68: 564, 69: 566, 70: 568,
  71: 570, 72: 572, 73: 574, 74: 575, 75: 577, 76: 578, 77: 580, 78: 582, 79: 583, 80: 585,
  81: 586, 82: 587, 83: 587, 84: 589, 85: 590, 86: 591, 87: 591, 88: 592, 89: 593, 90: 594,
  91: 595, 92: 595, 93: 596, 94: 596, 95: 597, 96: 597, 97: 598, 98: 598, 99: 599, 100: 599,
  101: 600, 102: 600, 103: 601, 104: 601, 105: 601, 106: 602, 107: 602, 108: 602, 109: 603, 110: 603,
  111: 603, 112: 604, 113: 604, 114: 604
};

export const PdfQuranView: React.FC<PdfQuranViewProps> = ({ onBack, language }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(604);
  const [zoomScale, setZoomScale] = useState<number>(1.2);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<'surah' | 'para' | 'page' | 'ayah'>('surah');
  const [searchQuery, setSearchQuery] = useState('');
  const [renderError, setRenderError] = useState<string | null>(null);

  // Jump Modal States
  const [isJumpModalOpen, setIsJumpModalOpen] = useState(false);
  const [selectedSurahNum, setSelectedSurahNum] = useState<number>(1);
  const [inputAyahNum, setInputAyahNum] = useState<string>('1');
  const [inputPageNum, setInputPageNum] = useState<string>('1');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle PDF file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('দয়া করে একটি সঠিক .pdf ফাইল নির্বাচন করুন।');
      return;
    }

    setPdfFile(file);
    setRenderError(null);
    setIsRendering(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setCurrentPage(1);
    } catch (err) {
      console.error('Failed to load PDF:', err);
      setRenderError('পিডিএফ ফাইলটি লোড করতে সমস্যা হয়েছে। অন্য কোনো কুরআন পিডিএফ চেষ্টা করুন।');
    } finally {
      setIsRendering(false);
    }
  };

  // Render the current page onto canvas
  useEffect(() => {
    let isCancelled = false;

    async function renderPage() {
      if (!pdfDoc || !canvasRef.current) return;

      setIsRendering(true);
      setRenderError(null);

      try {
        const page = await pdfDoc.getPage(currentPage);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale: zoomScale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        if (!isCancelled) {
          console.error('Error rendering page:', err);
          setRenderError('পৃষ্ঠাটি রেন্ডার করতে সমস্যা হয়েছে।');
        }
      } finally {
        if (!isCancelled) {
          setIsRendering(false);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, currentPage, zoomScale]);

  const jumpToSurah = (surahNumber: number) => {
    const page = SURAH_PAGES[surahNumber] || 1;
    setCurrentPage(Math.min(page, totalPages));
  };

  const jumpToPara = (startPage: number) => {
    setCurrentPage(Math.min(startPage, totalPages));
  };

  const filteredSurahs = SURAH_LIST.filter(
    (s) =>
      s.nameBn.includes(searchQuery) ||
      s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString() === searchQuery.trim()
  );

  const filteredParas = JUZ_LIST.filter(
    (p) =>
      p.nameBn.includes(searchQuery) ||
      p.number.toString() === searchQuery.trim()
  );

  return (
    <div className="space-y-4 animate-fade-in pb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-gray-100 card-shadow">
        <button
          onClick={onBack}
          className="flex items-center text-xs font-bold text-forest hover:text-forest-dark transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          পেছনে ফিরুন
        </button>

        <span className="text-xs font-black uppercase tracking-wider text-charcoal flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-emerald-600" />
          পিডিএফ কুরআন রিডার (PDF Reader)
        </span>
      </div>

      {/* Quick Instruction Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-forest text-white p-4.5 rounded-2xl card-shadow space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-softgold shrink-0" />
          <h3 className="text-sm font-extrabold text-white">
            এমদাদিয়া নূরানী হাফেজী কুরআন PDF লোডার
          </h3>
        </div>
        <p className="text-xs text-mint/95 leading-relaxed">
          আপনার ডিভাইসে থাকা **এমদাদিয়া লাইব্রেরী নূরানী হাফেজী কুরআন** (.pdf) সিলেক্ট করুন। ক্যানভাস প্রযুক্তিতে প্রতিটি পৃষ্ঠা উচ্চ রেজোলিউশনে রেন্ডার হবে এবং আপনি পৃষ্ঠা, পারা ও সূরা দিয়ে সরাসরি জাম্প করতে পারবেন।
        </p>
      </div>

      {/* Upload Button Section */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 bg-forest text-white rounded-xl text-xs font-bold shadow-md hover:bg-forest-dark transition-all flex items-center gap-2 cursor-pointer smooth-press"
            >
              <Upload className="w-4 h-4 text-softgold" />
              <span>আপনার নিজস্ব হাফেজী কুরআন PDF নির্বাচন করুন</span>
            </button>

            {pdfFile && (
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 truncate max-w-[220px]">
                ✓ {pdfFile.name}
              </span>
            )}
          </div>

          {!pdfDoc && (
            <span className="text-[11px] text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              (নিচে নূরানী হাফেজী কুরআনের ডিজিটাল ডেমো পেজও দেখতে পারেন)
            </span>
          )}
        </div>
      </div>

      {/* Index Navigation Tabs (পারা, সূরা, পৃষ্ঠা, আয়াত) */}
      <div className="bg-white/45 backdrop-blur-xl p-4 rounded-3xl border border-white/70 shadow-lg shadow-emerald-950/5 space-y-3">
        <div className="grid grid-cols-4 gap-1.5 bg-white/40 backdrop-blur-md p-1.5 rounded-2xl text-xs font-black text-emerald-950 border border-white/60">
          <button
            onClick={() => setFilterMode('para')}
            className={`py-2 rounded-xl text-center transition-all cursor-pointer ${
              filterMode === 'para' ? 'bg-forest text-white shadow-md' : 'hover:bg-white/40'
            }`}
          >
            ১. পারা (৩০)
          </button>
          <button
            onClick={() => setFilterMode('surah')}
            className={`py-2 rounded-xl text-center transition-all cursor-pointer ${
              filterMode === 'surah' ? 'bg-forest text-white shadow-md' : 'hover:bg-white/40'
            }`}
          >
            ২. সূরা (১১৪)
          </button>
          <button
            onClick={() => setFilterMode('page')}
            className={`py-2 rounded-xl text-center transition-all cursor-pointer ${
              filterMode === 'page' ? 'bg-forest text-white shadow-md' : 'hover:bg-white/40'
            }`}
          >
            ৩. পৃষ্ঠা
          </button>
          <button
            onClick={() => {
              setFilterMode('ayah');
              setIsJumpModalOpen(true);
            }}
            className={`py-2 rounded-xl text-center transition-all cursor-pointer ${
              filterMode === 'ayah' ? 'bg-forest text-white shadow-md' : 'hover:bg-white/40'
            }`}
          >
            ৪. আয়াত
          </button>
        </div>

        {/* Search Input for Surah/Para */}
        {(filterMode === 'surah' || filterMode === 'para') && (
          <div className="relative">
            <Search className="w-4 h-4 text-forest absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                filterMode === 'surah'
                  ? 'সূরার নাম বা নম্বর দিয়ে খুঁজুন (যেমন: আল-ফাতিহা, ১)...'
                  : 'পারার নাম বা নম্বর খুঁজুন (যেমন: পারা ১৫)...'
              }
              className="w-full pl-10 pr-3 py-2.5 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl text-xs font-bold text-charcoal focus:outline-none focus:border-forest"
            />
          </div>
        )}

        {/* Surah List Quick Index Grid */}
        {filterMode === 'surah' && (
          <div className="max-h-52 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2 p-1">
            {filteredSurahs.map((surah) => {
              const pageNum = SURAH_PAGES[surah.number] || 1;
              const isSelected = currentPage === pageNum;
              return (
                <button
                  key={surah.number}
                  onClick={() => jumpToSurah(surah.number)}
                  className={`p-2.5 rounded-2xl border text-left text-xs transition-all smooth-press cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-forest text-white border-forest font-bold shadow-md'
                      : 'bg-white/50 backdrop-blur-md border-white/80 hover:border-emerald-500/40 text-charcoal'
                  }`}
                >
                  <div className="truncate pr-1">
                    <span className={`text-[10px] block ${isSelected ? 'text-emerald-100' : 'text-gray-500'}`}>
                      {surah.number}. {surah.nameEn}
                    </span>
                    <span className="font-extrabold text-xs">{surah.nameBn}</span>
                  </div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md shrink-0 font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'text-emerald-900 bg-emerald-100/80'
                  }`}>
                    পৃষ্ঠা {pageNum}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Para List Index */}
        {filterMode === 'para' && (
          <div className="max-h-52 overflow-y-auto space-y-1.5 p-1">
            {filteredParas.map((para) => {
              const isSelected = currentPage === para.startPage;
              return (
                <button
                  key={para.number}
                  onClick={() => jumpToPara(para.startPage)}
                  className={`w-full p-2.5 rounded-2xl border text-left text-xs transition-all smooth-press cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-forest text-white border-forest font-bold shadow-md'
                      : 'bg-white/50 backdrop-blur-md border-white/80 hover:border-emerald-500/40 text-charcoal'
                  }`}
                >
                  <span className="font-extrabold">{para.nameBn}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'text-emerald-900 bg-emerald-100/90'
                  }`}>
                    পৃষ্ঠা {para.startPage}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Direct Page Input */}
        {filterMode === 'page' && (
          <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80">
            <span className="text-xs font-black text-emerald-950">কাঙ্ক্ষিত পৃষ্ঠা নম্বর:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (val >= 1 && val <= totalPages) setCurrentPage(val);
                }}
                className="w-20 px-2 py-1 bg-white border border-gray-300 rounded-xl text-xs font-black text-center text-forest"
              />
              <span className="text-xs text-emerald-900 font-bold">/ {totalPages} পৃষ্ঠা</span>
            </div>
          </div>
        )}

        {/* Ayah Jump Launcher Banner */}
        {filterMode === 'ayah' && (
          <div className="p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 text-center space-y-2">
            <p className="text-xs font-black text-forest">
              নির্দিষ্ট সূরা নির্বাচন করে সরাসরি আয়াতে জাম্প করুন
            </p>
            <button
              onClick={() => setIsJumpModalOpen(true)}
              className="px-4 py-2 bg-emerald-700/90 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-md cursor-pointer transition-all border border-white/30"
            >
              উইন্ডো খুলুন (Jump Window) →
            </button>
          </div>
        )}
      </div>

      {/* Controls Toolbar */}
      <div className="bg-emerald-950/80 backdrop-blur-xl text-white p-3.5 rounded-3xl border border-white/30 shadow-lg flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="p-2 bg-white/15 rounded-xl hover:bg-white/25 disabled:opacity-40 cursor-pointer border border-white/20"
            title="পূর্ববর্তী পৃষ্ঠা"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <span className="px-2 font-mono font-black text-amber-300 text-xs">
            পৃষ্ঠা {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-2 bg-white/15 rounded-xl hover:bg-white/25 disabled:opacity-40 cursor-pointer border border-white/20"
            title="পরবর্তী পৃষ্ঠা"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomScale((s) => Math.max(0.6, s - 0.2))}
            className="p-2 bg-white/15 rounded-xl hover:bg-white/25 cursor-pointer border border-white/20"
            title="ছোট করুন"
          >
            <ZoomOut className="w-4 h-4 text-white" />
          </button>

          <span className="text-[10px] font-mono text-gray-300">{Math.round(zoomScale * 100)}%</span>

          <button
            onClick={() => setZoomScale((s) => Math.min(2.5, s + 0.2))}
            className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer"
            title="বড় করুন"
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Canvas Renderer Container */}
      <div className="bg-stone-200 p-2 sm:p-4 rounded-3xl border border-stone-300 min-h-[550px] flex flex-col items-center justify-center relative overflow-x-auto shadow-inner">
        {isRendering && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center gap-2 z-10 rounded-3xl">
            <Loader2 className="w-6 h-6 text-forest animate-spin" />
            <span className="text-xs font-bold text-forest">পৃষ্ঠা রেন্ডার হচ্ছে...</span>
          </div>
        )}

        {renderError && (
          <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-xs font-bold flex items-center gap-2 my-4">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{renderError}</span>
          </div>
        )}

        {pdfDoc ? (
          <div className="bg-white shadow-2xl p-2 rounded-xl border border-stone-300 my-2 overflow-auto max-w-full">
            <canvas ref={canvasRef} className="block mx-auto max-w-full h-auto rounded-lg" />
          </div>
        ) : (
          /* Emdadia Library Authentic Nurani Hafezi Quran Page Replica */
          <div className="w-full max-w-md bg-[#FFFDF3] p-4 sm:p-6 rounded-2xl border-4 border-amber-950/30 card-shadow text-amber-950 relative font-arabic my-2 space-y-3">
            {/* Calligraphic Frame Top Corner Ornaments */}
            <div className="border-b-2 border-amber-900/40 pb-2 flex justify-between items-center text-[11px] font-serif text-amber-900">
              <span className="font-bold">المنجل ۱ • الجزء ১</span>
              <span className="font-black text-sm bg-amber-900/10 px-2 py-0.5 rounded-md font-mono">
                পৃষ্ঠা {currentPage}
              </span>
              <span className="font-bold">সورة الفاتحة</span>
            </div>

            {/* Surah Header Ornamental Arch (Like Emdadia Library Screenshot) */}
            <div className="border-2 border-amber-950 p-2 text-center rounded-xl bg-amber-100/40 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-bold text-amber-900 px-2">
                <span>آيَاتُهَا ٧</span>
                <span className="text-xs font-bold font-arabic">سُورَةُ الْفَاتِحَةِ مَكِّيَّةٌ</span>
                <span>رُكُوعُهَا ١</span>
              </div>
            </div>

            {/* Bismillah Banner Box */}
            <div className="border border-amber-900/50 py-1.5 px-3 text-center rounded-lg bg-amber-50">
              <p className="text-xl font-bold text-amber-950 tracking-wide font-arabic">
                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
              </p>
            </div>

            {/* 15-Line Structured Grid Box (Bangladeshi Hafezi Layout) */}
            <div className="border border-amber-950/60 divide-y divide-amber-950/30 text-right font-arabic font-bold text-lg sm:text-xl leading-relaxed select-none bg-[#FFFDF5]">
              <div className="p-2 flex justify-between items-center">
                <span>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ</span>
                <span className="text-xs font-serif font-black text-amber-950 border-2 border-amber-900 rounded-full w-7 h-7 flex items-center justify-center shrink-0 bg-amber-100 shadow-xs">
                  ۝١
                </span>
              </div>
              <div className="p-2 flex justify-between items-center">
                <span>ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>
                <span className="text-xs font-serif font-black text-amber-950 border-2 border-amber-900 rounded-full w-7 h-7 flex items-center justify-center shrink-0 bg-amber-100 shadow-xs">
                  ۝٢
                </span>
              </div>
              <div className="p-2 flex justify-between items-center">
                <span>مَٰلِكِ يَوْمِ ٱلدِّينِ</span>
                <span className="text-xs font-serif font-black text-amber-950 border-2 border-amber-900 rounded-full w-7 h-7 flex items-center justify-center shrink-0 bg-amber-100 shadow-xs">
                  ۝٣
                </span>
              </div>
              <div className="p-2 flex justify-between items-center">
                <span>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</span>
                <span className="text-xs font-serif font-black text-amber-950 border-2 border-amber-900 rounded-full w-7 h-7 flex items-center justify-center shrink-0 bg-amber-100 shadow-xs">
                  ۝٤
                </span>
              </div>
              <div className="p-2 flex justify-between items-center">
                <span>ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ</span>
                <span className="text-xs font-serif font-black text-amber-950 border-2 border-amber-900 rounded-full w-7 h-7 flex items-center justify-center shrink-0 bg-amber-100 shadow-xs">
                  ۝٥
                </span>
              </div>
              <div className="p-2 flex justify-between items-center">
                <span>صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ</span>
                <span className="text-xs font-serif font-black text-amber-950 border-2 border-amber-900 rounded-full w-7 h-7 flex items-center justify-center shrink-0 bg-amber-100 shadow-xs">
                  ۝٦
                </span>
              </div>
              <div className="p-2 flex justify-between items-center text-emerald-950">
                <span>غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ</span>
                <span className="text-xs font-serif font-black text-amber-950 border-2 border-amber-900 rounded-full w-7 h-7 flex items-center justify-center shrink-0 bg-amber-100 shadow-xs">
                  ۝٧
                </span>
              </div>
            </div>

            {/* Bottom Footer Notice */}
            <div className="border-t border-amber-900/30 pt-2 flex justify-between items-center text-[10px] text-amber-900 font-sans">
              <span>এমদাদিয়া লাইব্রেরী চকবাজার, ঢাকা</span>
              <span className="font-bold">নূরানী হাফেজী কোরআন শরীফ</span>
              <span>মনজিল ১</span>
            </div>
          </div>
        )}
      </div>

      {/* Jump Modal Window ("সুন্দর একটা উইন্ডোজ") */}
      {isJumpModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-emerald-100 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-extrabold text-forest flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-softgold" />
                <span>সূরা, আয়াত ও পৃষ্ঠা জাম্প উইন্ডো</span>
              </h3>
              <button
                onClick={() => setIsJumpModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 font-bold text-xs flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {/* Select Surah */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  ১. সূরা নির্বাচন করুন:
                </label>
                <select
                  value={selectedSurahNum}
                  onChange={(e) => setSelectedSurahNum(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-charcoal focus:outline-none focus:border-forest"
                >
                  {SURAH_LIST.map((s) => (
                    <option key={s.number} value={s.number}>
                      {s.number}. {s.nameBn} ({s.versesCount}টি আয়াত) - পৃষ্ঠা {SURAH_PAGES[s.number] || 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enter Ayah Number */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  ২. আয়াত নম্বর লিখুন:
                </label>
                <input
                  type="number"
                  min={1}
                  max={286}
                  value={inputAyahNum}
                  onChange={(e) => setInputAyahNum(e.target.value)}
                  placeholder="যেমন: ১, ৫০, ২৫৫..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-charcoal focus:outline-none focus:border-forest"
                />
              </div>

              {/* Or Direct Page Number */}
              <div className="pt-1 border-t border-gray-100">
                <label className="block text-xs font-bold text-charcoal mb-1">
                  অথবা পৃষ্ঠা নম্বর দিন (১ - ৬০৪):
                </label>
                <input
                  type="number"
                  min={1}
                  max={604}
                  value={inputPageNum}
                  onChange={(e) => setInputPageNum(e.target.value)}
                  placeholder="যেমন: ১, ৪৪০, ৬০৪..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-charcoal focus:outline-none focus:border-forest"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  let targetPage = 1;
                  if (inputPageNum && parseInt(inputPageNum, 10) > 0) {
                    targetPage = parseInt(inputPageNum, 10);
                  } else {
                    const basePage = SURAH_PAGES[selectedSurahNum] || 1;
                    const ayahNum = parseInt(inputAyahNum, 10) || 1;
                    // Approximate page offset for 15-line Hafezi Quran (~8-10 verses per page)
                    const pageOffset = Math.floor((ayahNum - 1) / 9);
                    targetPage = basePage + pageOffset;
                  }

                  setCurrentPage(Math.min(Math.max(1, targetPage), totalPages));
                  setIsJumpModalOpen(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-forest to-forest-dark text-white rounded-xl text-xs font-bold shadow-md hover:brightness-110 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>নির্দিষ্ট পৃষ্ঠা / আয়াতে চলে যান →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
