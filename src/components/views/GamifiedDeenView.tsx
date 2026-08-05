import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Flame, 
  Trophy, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw,
  Zap,
  Star,
  Crown
} from 'lucide-react';
import { Language } from '../../types';

interface GamifiedDeenViewProps {
  onBack: () => void;
  language: Language;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LessonModule {
  id: string;
  titleBn: string;
  subtitleBn: string;
  xpReward: number;
  completed: boolean;
  icon: string;
  questions: QuizQuestion[];
}

export const GamifiedDeenView: React.FC<GamifiedDeenViewProps> = ({ onBack, language }) => {
  const [userXp, setUserXp] = useState<number>(450);
  const [streakDays, setStreakDays] = useState<number>(5);
  const [activeLesson, setActiveLesson] = useState<LessonModule | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const [lessons, setLessons] = useState<LessonModule[]>([
    {
      id: 'lesson-1',
      titleBn: 'নামাজের প্রথম পদক্ষেপ ও ওযুর নিয়ম',
      subtitleBn: 'নতুনদের জন্য নামাজ ও ওযুর ফরযসমূহ শিখুন',
      xpReward: 50,
      completed: true,
      icon: '🌊',
      questions: [
        {
          id: 1,
          question: 'ওযুর ফরয কতটি?',
          options: ['৩ টি', '৪ টি', '৬ টি', '৭ টি'],
          correctIndex: 1,
          explanation: 'ওযুর ফরয ৪টি: মুখ ধোয়া, কনুইসহ হাত ধোয়া, মাথার ৪ ভাগের ১ ভাগ মাসেহ করা, এবং টাকনুসহ পা ধোয়া।'
        },
        {
          id: 2,
          question: 'দৈনিক কত ওয়াক্ত ফরজ নামাজ আদায় করতে হয়?',
          options: ['৩ ওয়াক্ত', '৪ ওয়াক্ত', '৫ ওয়াক্ত', '৬ ওয়াক্ত'],
          correctIndex: 2,
          explanation: 'দৈনিক ৫ ওয়াক্ত ফরজ নামাজ: ফজর, যোহর, আসর, মাগরিব ও এশা।'
        }
      ]
    },
    {
      id: 'lesson-2',
      titleBn: 'সূরা ফাতিহা ও তার বাংলা অনুবাদ',
      subtitleBn: 'প্রতি রাকাতে পড়া আবশ্যিক সূরার সহজ অর্থ',
      xpReward: 100,
      completed: false,
      icon: '📖',
      questions: [
        {
          id: 1,
          question: 'সূরা ফাতিহার আয়াত সংখ্যা কতটি?',
          options: ['৫ টি', '৬ টি', '৭ টি', '৮ টি'],
          correctIndex: 2,
          explanation: 'সূরা আল-ফাতিহায় সর্বমোট ৭টি আয়াত রয়েছে।'
        },
        {
          id: 2,
          question: '"Ihdinas-siratal-mustaqim" এর বাংলা অর্থ কী?',
          options: [
            'আমাদের ক্ষমা করুন',
            'আমাদের সরল ও সঠিক পথ প্রদর্শন করুন',
            'আপনিই একমাত্র উপাস্য',
            'সমস্ত প্রশংসা আল্লাহর'
          ],
          correctIndex: 1,
          explanation: 'এর বাংলা অর্থ: "আমাদেরকে সহজ-সরল ও সঠিক পথ প্রদর্শন করুন।"'
        }
      ]
    },
    {
      id: 'lesson-3',
      titleBn: 'রুকু ও সেজদার সহজ তাসবিহ',
      subtitleBn: 'নামাজে রুকু ও সেজদায় সঠিক উচ্চারণ শিখুন',
      xpReward: 50,
      completed: false,
      icon: '🕌',
      questions: [
        {
          id: 1,
          question: 'রুকুতে কোন তাসবিহ সর্বনিম্ন ৩ বার পড়তে হয়?',
          options: [
            'সুবহানা রাব্বিয়াল আ‘লা',
            'সুভাষাল্লাহ',
            'সুবহানা রাব্বিয়াল আজীম',
            'আলহামদুলিল্লাহ'
          ],
          correctIndex: 2,
          explanation: 'রুকুতে পড়তে হয়: "সুবহানা রাব্বিয়াল আজীম" (আমার মহান রব পবিত্র)।'
        },
        {
          id: 2,
          question: 'সেজদায় কোন তাসবিহ পড়তে হয়?',
          options: [
            'সুবহানা রাব্বিয়াল আজীম',
            'সুবহানা রাব্বিয়াল আ‘লা',
            'আল্লাহু আকবার',
            'আস্তাগফিরুল্লাহ'
          ],
          correctIndex: 1,
          explanation: 'সেজদায় পড়তে হয়: "সুবহানা রাব্বিয়াল আ‘লা" (আমার সর্বোচ্চ মহান রব পবিত্র)।'
        }
      ]
    },
    {
      id: 'lesson-4',
      titleBn: 'তাহাজ্জুদ ও দুআ কবুলের সময়',
      subtitleBn: 'রাতের শেষ তৃতীয়াংশের নফল সালাত ও মর্যাদা',
      xpReward: 75,
      completed: false,
      icon: '🌙',
      questions: [
        {
          id: 1,
          question: 'তাহাজ্জুদ সালাত পড়ার সবচেয়ে উত্তম সময় কোনটি?',
          options: ['এশার পরপরই', 'রাতের শেষ তৃতীয়াংশে', 'সূর্যোদয়ের সময়', 'যোহরের আগে'],
          correctIndex: 1,
          explanation: 'রাতের শেষ তৃতীয়াংশ বা সেহরির সময় আল্লাহ ১ম আসমানে নেমে আসেন এবং দুআ কবুল করেন।'
        }
      ]
    }
  ]);

  const playSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      // Audio Context Fallback
    }
  };

  const startLesson = (lesson: LessonModule) => {
    setActiveLesson(lesson);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !activeLesson) return;

    setIsAnswerSubmitted(true);
    const q = activeLesson.questions[currentQuestionIndex];
    if (selectedAnswer === q.correctIndex) {
      setQuizScore((prev) => prev + 1);
      playSuccessSound();
    }
  };

  const handleNextQuestion = () => {
    if (!activeLesson) return;

    if (currentQuestionIndex + 1 < activeLesson.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz Finished!
      setIsQuizCompleted(true);
      const newXp = userXp + activeLesson.xpReward;
      setUserXp(newXp);
      playSuccessSound();

      // Mark lesson as completed
      setLessons((prev) =>
        prev.map((m) => (m.id === activeLesson.id ? { ...m, completed: true } : m))
      );
    }
  };

  const closeQuizModal = () => {
    setActiveLesson(null);
    setIsQuizCompleted(false);
  };

  // Leaderboard static preview
  const leaderboardUsers = [
    { rank: 1, name: 'আবদুল্লাহ আল মাহফুজ', xp: 920, badge: '👑 গোল্ডেন মুত্তাকী' },
    { rank: 2, name: 'তানভীর আহমেদ', xp: 780, badge: '🥈 সিলভার সালাহ স্টার' },
    { rank: 3, name: 'আপনি (ইউজার)', xp: userXp, badge: '🥉 ব্রোঞ্জ নবিস' },
    { rank: 4, name: 'রাশেদুল ইসলাম', xp: 410, badge: '🌟 দ্বীন লার্নার' },
    { rank: 5, name: 'সাদিয়া রহমান', xp: 380, badge: '🌟 দ্বীন লার্নার' },
  ];

  return (
    <div className="space-y-5 animate-fade-in pb-6">
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
          <Trophy className="w-4 h-4 text-softgold" />
          দ্বীন লার্নিং (Duolingo Style)
        </span>
      </div>

      {/* Stats Cards Row (Streak, Sawab Points, Level) */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-3 rounded-2xl card-shadow flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 mb-0.5">
            <Flame className="w-4 h-4 text-yellow-200 fill-yellow-200 animate-pulse" />
            <span className="text-lg font-black">{streakDays} দিন</span>
          </div>
          <span className="text-[10px] text-amber-100 font-medium">ধারাবাহিকতা স্ট্রীক</span>
        </div>

        <div className="bg-gradient-to-br from-forest to-emerald-700 text-white p-3 rounded-2xl card-shadow flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 mb-0.5">
            <Star className="w-4 h-4 text-softgold fill-softgold" />
            <span className="text-lg font-black">{userXp} XP</span>
          </div>
          <span className="text-[10px] text-mint/90 font-medium">সাওয়াব পয়েন্ট</span>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-3 rounded-2xl card-shadow flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 mb-0.5">
            <Crown className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-sm font-black">লেভেল ৩</span>
          </div>
          <span className="text-[10px] text-purple-200 font-medium">উদ্বুদ্ধ মুত্তাকী</span>
        </div>
      </div>

      {/* Concept Banner */}
      <div className="bg-mint/40 p-4 rounded-2xl border border-forest/15 space-y-1.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-forest shrink-0" />
          <h4 className="text-xs font-bold text-forest uppercase tracking-wider">
            নতুন ও বেনামাজীদের জন্য আনন্দদায়ক শেখার অভিজ্ঞতা
          </h4>
        </div>
        <p className="text-xs text-charcoal/90 leading-relaxed">
          ডুয়োলিঙ্গোর মতো গেমসের ঢঙে প্রতি ওয়াক্তের ছোট ছোট পাঠ সম্পন্ন করুন, সঠিক উত্তরের মাধ্যমে পয়েন্ট ও ব্যাজ অর্জন করুন এবং আপনার র্যাঙ্ক উপরে তুলুন!
        </p>
      </div>

      {/* Gamified Lessons Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-charcoal px-1 flex items-center justify-between">
          <span>ইন্টারেক্টিভ লেসন ও কুইজসমূহ</span>
          <span className="text-[10px] font-bold text-forest bg-mint px-2 py-0.5 rounded-full">
            {lessons.filter((l) => l.completed).length} / {lessons.length} সম্পন্ন
          </span>
        </h3>

        <div className="space-y-2.5">
          {lessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              onClick={() => startLesson(lesson)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between smooth-press ${
                lesson.completed
                  ? 'bg-emerald-50/80 border-emerald-200 hover:border-emerald-300'
                  : 'bg-white border-gray-100 hover:border-forest/30 card-shadow'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-mint/50 flex items-center justify-center text-2xl shrink-0 border border-forest/10">
                  {lesson.icon}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-gray-400">পাঠ {idx + 1}</span>
                    {lesson.completed && (
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> সম্পন্ন
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-charcoal">{lesson.titleBn}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                    {lesson.subtitleBn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60">
                  +{lesson.xpReward} XP
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 card-shadow space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-softgold" />
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
              সাপ্তাহিক তাকওয়া লিডারবোর্ড
            </h4>
          </div>
          <span className="text-[10px] font-bold text-forest bg-mint/60 px-2 py-0.5 rounded-full">
            র্যাঙ্ক #৩
          </span>
        </div>

        <div className="space-y-2">
          {leaderboardUsers.map((usr) => (
            <div
              key={usr.rank}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                usr.rank === 3
                  ? 'bg-mint/40 border-forest font-bold'
                  : 'bg-gray-50/80 border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[11px] ${
                    usr.rank === 1
                      ? 'bg-amber-400 text-charcoal'
                      : usr.rank === 2
                      ? 'bg-slate-300 text-charcoal'
                      : usr.rank === 3
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {usr.rank}
                </span>

                <div>
                  <p className="font-bold text-charcoal">{usr.name}</p>
                  <p className="text-[10px] text-gray-500">{usr.badge}</p>
                </div>
              </div>

              <span className="font-black text-forest">{usr.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz / Lesson Active Overlay Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-5 border border-gray-100 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeLesson.icon}</span>
                <div>
                  <h3 className="text-xs font-bold text-charcoal">{activeLesson.titleBn}</h3>
                  <p className="text-[10px] text-gray-400">
                    প্রশ্ন {currentQuestionIndex + 1} / {activeLesson.questions.length}
                  </p>
                </div>
              </div>

              <button
                onClick={closeQuizModal}
                className="text-gray-400 hover:text-charcoal p-1 rounded-lg text-xs font-bold"
              >
                ✕ বন্ধ
              </button>
            </div>

            {!isQuizCompleted ? (
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-forest h-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / activeLesson.questions.length) * 100
                      }%`
                    }}
                  />
                </div>

                {/* Question */}
                <div className="bg-mint/30 p-4 rounded-2xl border border-forest/10">
                  <h4 className="text-sm font-extrabold text-charcoal leading-snug">
                    {activeLesson.questions[currentQuestionIndex].question}
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {activeLesson.questions[currentQuestionIndex].options.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === activeLesson.questions[currentQuestionIndex].correctIndex;

                    let btnStyle = 'bg-white border-gray-200 text-charcoal hover:border-forest';
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-mint border-forest text-forest font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all smooth-press cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Answer Explanation */}
                {isAnswerSubmitted && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed animate-fade-in">
                    <p className="font-bold mb-0.5">সহীহ ব্যাখ্যা:</p>
                    <p>{activeLesson.questions[currentQuestionIndex].explanation}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 flex justify-end">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="w-full py-3 bg-forest text-white rounded-xl font-bold text-xs shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      উত্তর যাঁচাই করুন
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-3 bg-forest text-white rounded-xl font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>পরবর্তী ধাপে যান</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Completion Screen */
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg border border-emerald-200">
                  🎉
                </div>

                <div>
                  <h3 className="text-lg font-black text-charcoal">অভিনন্দন! লেসন সম্পন্ন হয়েছে!</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    আপনি অর্জন করেছেন <span className="font-bold text-amber-600">+{activeLesson.xpReward} XP সাওয়াব পয়েন্ট!</span>
                  </p>
                </div>

                <div className="bg-mint/40 p-4 rounded-2xl border border-forest/15 text-xs text-charcoal/90">
                  <p className="font-bold text-forest mb-1">প্রোফাইল আপডেট:</p>
                  <p>আপনার নতুন মোট সাওয়াব পয়েন্ট: <strong className="text-forest">{userXp} XP</strong></p>
                  <p className="mt-0.5">ধারাবাহিকতা স্ট্রীক: 🔥 {streakDays} দিন অব্যাহত রয়েছে!</p>
                </div>

                <button
                  onClick={closeQuizModal}
                  className="w-full py-3 bg-forest text-white font-bold rounded-2xl text-xs shadow-md cursor-pointer"
                >
                  কোর্সে ফিরে যান
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
