import React, { useState } from 'react';
import { Search, X, BookOpen, Sparkles, Clock, Compass } from 'lucide-react';
import { Language, TabType } from '../types';
import { SURAH_LIST } from '../data/quranData';
import { INITIAL_ADHKAR } from '../data/adhkarData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectTab: (tab: TabType) => void;
  onOpenFeature: (title: string, desc: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectTab,
  onOpenFeature
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredSurahs = SURAH_LIST.filter(
    (s) =>
      s.nameBn.toLowerCase().includes(query.toLowerCase()) ||
      s.nameEn.toLowerCase().includes(query.toLowerCase()) ||
      s.meaningBn.toLowerCase().includes(query.toLowerCase()) ||
      s.number.toString() === query
  );

  const filteredAdhkar = INITIAL_ADHKAR.filter(
    (a) =>
      a.titleBn.toLowerCase().includes(query.toLowerCase()) ||
      a.titleEn.toLowerCase().includes(query.toLowerCase()) ||
      a.transliteration.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-12 px-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-gray-100">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-forest shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'BN'
                ? 'কুরআনের সূরা, আযকার বা ফিচার অনুসন্ধান করুন...'
                : 'Search Surah, Adhkar, or Features...'
            }
            className="w-full text-sm text-charcoal outline-none bg-transparent placeholder:text-gray-400 font-sans"
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions / Results */}
        <div className="p-4 overflow-y-auto space-y-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                {language === 'BN' ? 'জনপ্রিয় অনুসন্ধান' : 'POPULAR SEARCHES'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['সূরা ইয়াসীন', 'সূরা আল-মুলক', 'আয়াতুল কুরসী', 'ফজরের সময়', 'তাসবীহ কাউন্টার', 'কিবলা কম্পাস'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="bg-mint/40 text-forest text-xs px-3 py-1.5 rounded-full font-medium hover:bg-mint smooth-press cursor-pointer border border-forest/10"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Surahs result */}
              {filteredSurahs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-forest" />
                    <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                      {language === 'BN' ? 'আল-কুরআনের সূরাসমূহ' : 'Surahs'} ({filteredSurahs.length})
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {filteredSurahs.map((surah) => (
                      <div
                        key={surah.number}
                        onClick={() => {
                          onClose();
                          onSelectTab('quran');
                        }}
                        className="p-2.5 rounded-xl bg-softbg hover:bg-mint/30 flex items-center justify-between cursor-pointer border border-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 bg-forest text-white text-xs font-bold rounded-lg flex items-center justify-center">
                            {surah.number}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-charcoal">
                              {language === 'BN' ? surah.nameBn : surah.nameEn}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {surah.meaningBn} • {surah.versesCount} আয়াত
                            </p>
                          </div>
                        </div>
                        <span className="font-arabic text-base text-forest font-bold">
                          {surah.nameArabic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Adhkar result */}
              {filteredAdhkar.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-forest" />
                    <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
                      {language === 'BN' ? 'আযকার ও জিকির' : 'Adhkar'} ({filteredAdhkar.length})
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {filteredAdhkar.map((adhkar) => (
                      <div
                        key={adhkar.id}
                        onClick={() => {
                          onClose();
                          onSelectTab('dhikr');
                        }}
                        className="p-2.5 rounded-xl bg-softbg hover:bg-mint/30 flex items-center justify-between cursor-pointer border border-gray-100 transition-colors"
                      >
                        <div>
                          <p className="text-xs font-bold text-charcoal">
                            {language === 'BN' ? adhkar.titleBn : adhkar.titleEn}
                          </p>
                          <p className="text-[10px] text-gray-500">{adhkar.meaningBn}</p>
                        </div>
                        <span className="text-xs text-forest font-bold bg-mint px-2 py-0.5 rounded-full">
                          লক্ষ্য: {adhkar.target}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredSurahs.length === 0 && filteredAdhkar.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-xs">কোনো ফলাফল পাওয়া যায়নি "{query}" এর জন্য</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400">
            {language === 'BN' ? 'দ্রুত নেভিগেশনের জন্য ফলাফলে ক্লিক করুন' : 'Click result to jump directly'}
          </p>
        </div>

      </div>
    </div>
  );
};
