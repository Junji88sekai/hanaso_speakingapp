/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Trophy, 
  Home,
  MessageSquare,
  BookOpen,
  Eye,
  Mic,
  MicOff,
  Volume2,
  Globe,
  Castle
} from 'lucide-react';

// Language Type
type AppLanguage = 'es' | 'en' | 'ja' | 'it';

interface LanguageConfig {
  code: AppLanguage;
  flag: string;
  name: string;
}

const LANGUAGES: LanguageConfig[] = [
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' }
];

const getTranslatedText = (key: string, lang: AppLanguage) => {
  const translations: Record<string, Record<AppLanguage, string>> = {
    'app_title': {
      es: '¡Hablemos! App de Japanese Speaking',
      en: 'Let\'s Talk! Japanese Speaking App',
      ja: '話そう！日本語スピーキングアプリ',
      it: 'Parliamo! App di Conversazione'
    },
    'app_subtitle': {
      es: 'Practica japonés libremente con 31 lecciones de gramática',
      en: 'Practice Japanese freely with 31 grammar lessons',
      ja: '31の文法レッスンで、自由に日本語のスピーキングを練習しよう',
      it: 'Pratica il giapponese con 31 lezioni di grammatica'
    },
    'start_practice': {
      es: 'Comenzar el entrenamiento',
      en: 'Start training',
      ja: '修行を開始する',
      it: 'Inizia allenamento'
    },
    'progress_title': {
      es: 'Progreso total',
      en: 'Total Progress',
      ja: '全体の進捗',
      it: 'Progresso totale'
    },
    'reset_progress': {
      es: 'Reiniciar progreso',
      en: 'Reset progress',
      ja: '進捗をリセット',
      it: 'Reset'
    },
    'back_to_home': {
      es: 'Volver',
      en: 'Back',
      ja: '戻る',
      it: 'Indietro'
    },
    'strategy_portal': {
      es: 'Seleccionar lección',
      en: 'Select Lesson',
      ja: 'レッスン選択',
      it: 'Seleziona lezione'
    },
    'military_records': {
      es: 'Lecciones',
      en: 'Lessons',
      ja: 'レッスン',
      it: 'Lezioni'
    },
    'unlock_requirement': {
      es: 'Requisito de desbloqueo',
      en: 'Requirement',
      ja: '解禁',
      it: 'Requisito'
    },
    'voice_mode': {
      es: 'Voz',
      en: 'Voice',
      ja: '音声',
      it: 'Voce'
    },
    'text_mode': {
      es: 'Teclado',
      en: 'Keyboard',
      ja: 'キーボード',
      it: 'Tastiera'
    },
    'hover_hint': {
      es: 'Pase el cursor sobre las palabras para ver el significado',
      en: 'Hover over words to see their meaning',
      ja: '単語に属性がある場合マウスを合わせて意味を表示',
      it: 'Passa il mouse sulle parole per vedere il significato'
    },
    'record_hint': {
      es: '[Espacio] para grabar',
      en: '[Space] to record',
      ja: '[Space]で録音',
      it: '[Spazio] per registrare'
    },
    'check_hint': {
      es: '[Enter] para comprobar',
      en: '[Enter] to check',
      ja: '[Enter]で判定',
      it: '[Invio] per controllare'
    },
    'check_button': {
      es: 'Comprobar',
      en: 'Check',
      ja: '判定する',
      it: 'Verifica'
    },
    'try_again': {
      es: 'Intentar de nuevo',
      en: 'Try again',
      ja: 'もう一度',
      it: 'Riprova'
    },
    'judging': {
      es: 'Evaluando...',
      en: 'Evaluating...',
      ja: '判定中...',
      it: 'Valutazione...'
    },
    'correct_solution': {
      es: 'Solución correcta',
      en: 'Correct Answer',
      ja: '正解',
      it: 'Risposta Corretta'
    },
    'next_step': {
      es: 'Siguiente',
      en: 'Next',
      ja: '次へ',
      it: 'Avanti'
    },
    'lesson_complete': {
        es: '¡Lección completada!',
        en: 'Lesson Complete!',
        ja: 'レッスン完了！',
        it: 'Lezione completata!'
    },
    'advice_loading': {
      es: 'Analizando...',
      en: 'Analyzing...',
      ja: '判定中...',
      it: 'Analisi...'
    },
    'show_answer_hint': {
      es: 'Ver la respuesta',
      en: 'Show Answer',
      ja: '答えを確認',
      it: 'Mostra risposta'
    },
    'progress_label': {
      es: 'Progreso del entrenamiento',
      en: 'Training progress',
      ja: '修行進捗',
      it: 'Progresso di allenamento'
    },
    'next_sentence': {
      es: 'Siguiente formación',
      en: 'Next formation',
      ja: '次の方陣へ',
      it: 'Prossima frase'
    },
    'complete_practice': {
      es: 'Entrenamiento finalizado',
      en: 'Training finished',
      ja: '修行完了',
      it: 'Allenamento finito'
    },
    'congratulations': {
        es: '¡Entrenamiento completado!',
        en: 'Training complete!',
        ja: '修行完了！',
        it: 'Congratulazioni!'
    },
    'lesson_cleared': {
        es: ' ha sido superado',
        en: ' completed',
        ja: 'を突破しました',
        it: ' completata'
    },
    'back_to_map': {
        es: 'Volver a la lista',
        en: 'Back to lessons',
        ja: 'レッスン一覧へ戻る',
        it: 'Torna alle lezioni'
    },
    'castle_expansion': {
        es: '¡Buen trabajo!',
        en: 'Good Job!',
        ja: 'ナイス！',
        it: 'Ottimo lavoro!'
    },
    'castle_expansion_desc': {
        es: 'Tus habilidades de japonés están mejorando día a día.',
        en: 'Your Japanese skills are improving day by day.',
        ja: 'あなたの日本語は日々向上しています。',
        it: 'Le tue abilità migliorano giorno dopo giorno!'
    },
    'timer_none': {
      es: 'Sin límite',
      en: 'No timer',
      ja: 'なし',
      it: 'Nessuno'
    },
    'timer_5s': {
      es: '5 Segundos',
      en: '5 Seconds',
      ja: '5秒',
      it: '5 secondi'
    },
    'timer_8s': {
      es: '8 Segundos',
      en: '8 Seconds',
      ja: '8秒',
      it: '8 secondi'
    },
    'timer_setting_title': {
      es: 'Límite de tiempo',
      en: 'Time Limit',
      ja: 'タイムリミット',
      it: 'Limite di tempo'
    },
    'next_label': {
      es: 'Siguiente',
      en: 'Next',
      ja: '次へ',
      it: 'Avanti'
    },
    'done_label': {
      es: 'Finalizar',
      en: 'Done',
      ja: '完了',
      it: 'Fatto'
    },
    'time_up': {
      es: '¡Tiempo agotado!',
      en: 'Time Up!',
      ja: '時間切れ！',
      it: 'Tempo scaduto!'
    }
  };

  return translations[key]?.[lang] || translations[key]?.['es'] || key;
};

// Speech Recognition Type Definitions
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}
import { LESSONS } from './data/lessons';
import { Lesson, Sentence } from './types';

// Helper function for success sound
const playSuccessSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.1); // C6

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.error("Audio error", e);
  }
};

export default function App() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [mastery, setMastery] = useState<Record<number, number>>({});
  const [currentView, setCurrentView] = useState<'home' | 'lessons' | 'practice' | 'completion'>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [language, setLanguage] = useState<AppLanguage>('es');
  const [timerDuration, setTimerDuration] = useState<number | null>(null);
  const [lessonTitleTranslation, setLessonTitleTranslation] = useState<string | null>(null);
  const [lessonGrammarTranslation, setLessonGrammarTranslation] = useState<string | null>(null);
  
  // Persistence
  useEffect(() => {
    const savedMastery = localStorage.getItem('speaking_app_mastery');
    if (savedMastery) {
      const parsed = JSON.parse(savedMastery);
      // Clean up potentially corrupted data where mastery > sentence count
      const cleaned: Record<number, number> = {};
      Object.entries(parsed).forEach(([idStr, count]) => {
        const id = parseInt(idStr);
        const lesson = LESSONS.find(l => l.id === id);
        if (lesson) {
          cleaned[id] = Math.min(count as number, lesson.sentences.length);
        } else {
          cleaned[id] = count as number;
        }
      });
      setMastery(cleaned);
      localStorage.setItem('speaking_app_mastery', JSON.stringify(cleaned));
    } else {
      // Migrate from old progress if needed
      const savedProgress = localStorage.getItem('shunjyoki_progress');
      if (savedProgress) {
        const progressArray = JSON.parse(savedProgress);
        const initialMastery: Record<number, number> = {};
        progressArray.forEach((id: number) => {
          initialMastery[id] = 20; // Assume 20 if completed previously
        });
        setMastery(initialMastery);
        localStorage.setItem('speaking_app_mastery', JSON.stringify(initialMastery));
      }
    }
    
    const savedLang = localStorage.getItem('shunjyoki_lang') as AppLanguage;
    if (savedLang && ['es', 'en', 'it'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      setLanguage('en');
    }

    const savedTimer = localStorage.getItem('shunjyoki_timer');
    if (savedTimer && savedTimer !== 'null') {
      setTimerDuration(parseInt(savedTimer));
    }
  }, []);

  const changeLanguage = (newLang: AppLanguage) => {
    setLanguage(newLang);
    localStorage.setItem('shunjyoki_lang', newLang);
  };

  const changeTimer = (duration: number | null) => {
    setTimerDuration(duration);
    localStorage.setItem('shunjyoki_timer', String(duration));
  };

  const saveProgress = (lessonId: number, correctCount: number) => {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;
    
    const cappedCount = Math.min(correctCount, lesson.sentences.length);
    const newMastery = { ...mastery, [lessonId]: Math.max(mastery[lessonId] || 0, cappedCount) };
    
    // Final safety check to clean up old corrupted data
    if (newMastery[lessonId] > lesson.sentences.length) {
      newMastery[lessonId] = lesson.sentences.length;
    }

    setMastery(newMastery);
    localStorage.setItem('speaking_app_mastery', JSON.stringify(newMastery));
  };

  const resetProgress = () => {
    const msg = language === 'ja' ? '進捗をリセットしますか？' : 'Reset progress?';
    if (confirm(msg)) {
      setMastery({});
      localStorage.removeItem('speaking_app_mastery');
      localStorage.removeItem('shunjyoki_progress');
    }
  };

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentView('practice');
  };

  const handleLessonComplete = (correctCount: number) => {
    if (selectedLesson) {
      saveProgress(selectedLesson.id, correctCount);
      setCurrentView('completion');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 flex flex-col">
      {/* Global Header / Language Switcher - Only on Home and Completion */}
      {(currentView === 'home' || currentView === 'completion') && (
        <header className="p-4 flex justify-between items-center z-50 absolute top-0 left-0 w-full">
          <div className="flex items-center gap-2">
            {currentView !== 'home' && (
              <button 
                onClick={() => setCurrentView('home')}
                className="p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-colors shadow-sm"
              >
                <Home size={18} className="text-stone-500" />
              </button>
            )}
          </div>
          
          <div className="flex bg-white/80 backdrop-blur-sm p-1 rounded-full border border-stone-200 shadow-sm gap-2 items-center">
            <div className="flex gap-1.5 border-r border-stone-200 pr-2 mr-1 ml-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`
                    w-7 h-7 rounded-full text-base transition-all flex items-center justify-center
                    ${language === lang.code 
                      ? 'bg-amber-600 shadow-md ring-2 ring-amber-400' 
                      : 'opacity-50 hover:opacity-100'}
                  `}
                  title={lang.name}
                >
                  <span>{lang.flag}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-1 items-center px-1">
              <RotateCcw size={12} className="text-stone-400 mr-1" />
              {[null, 5, 8].map((d) => (
                <button
                  key={String(d)}
                  onClick={() => changeTimer(d)}
                  className={`
                    px-2 py-0.5 rounded-full text-[9px] font-black transition-all
                    ${timerDuration === d 
                      ? 'bg-stone-800 text-white shadow-md' 
                      : 'text-stone-400 hover:text-stone-600'}
                  `}
                >
                  {d === null ? '∞' : (d + 's')}
                </button>
              ))}
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomeView 
              mastery={mastery} 
              language={language}
              onStart={() => setCurrentView('lessons')} 
              onReset={resetProgress}
            />
          )}
          {currentView === 'lessons' && (
            <LessonsView 
              mastery={mastery}
              language={language}
              onSelectLesson={startLesson}
              onBack={() => setCurrentView('home')}
            />
          )}
          {currentView === 'practice' && selectedLesson && (
            <PracticeView 
              lesson={selectedLesson}
              mastery={mastery}
              language={language}
              timerDuration={timerDuration}
              lessonTitleTranslation={lessonTitleTranslation}
              setLessonTitleTranslation={setLessonTitleTranslation}
              lessonGrammarTranslation={lessonGrammarTranslation}
              setLessonGrammarTranslation={setLessonGrammarTranslation}
              onComplete={handleLessonComplete}
              onBack={() => setCurrentView('lessons')}
            />
          )}
          {currentView === 'completion' && selectedLesson && (
            <CompletionView 
              lesson={selectedLesson}
              language={language}
              mastery={mastery}
              lessonTitleTranslation={lessonTitleTranslation}
              onNext={() => {
                setLessonTitleTranslation(null);
                setLessonGrammarTranslation(null);
                setCurrentView('lessons');
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- VIEWS ---

function HomeView({ 
  mastery, 
  language,
  onStart, 
  onReset 
}: { 
  mastery: Record<number, number>; 
  language: AppLanguage;
  onStart: () => void; 
  onReset: () => void 
}) {
  const totalCorrect = LESSONS.reduce((acc, lesson) => acc + Math.min(mastery[lesson.id] || 0, lesson.sentences.length), 0);
  const totalTarget = LESSONS.reduce((acc, lesson) => acc + lesson.sentences.length, 0);
  const progressPercent = (totalCorrect / totalTarget) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-center min-h-full p-6 text-center overflow-hidden"
      id="home-view"
    >
      <div className="relative z-10 space-y-12 w-full max-w-lg">
        <div className="space-y-6">
          <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto shadow-inner border-4 border-amber-200"
          >
            <MessageSquare size={64} className="text-amber-600" />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight text-stone-800 drop-shadow-sm" id="app-title">
              {getTranslatedText('app_title', language)}
            </h1>
            <p className="text-stone-500 font-medium max-w-sm mx-auto leading-relaxed">
              {getTranslatedText('app_subtitle', language)}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <button 
            onClick={onStart}
            className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
            id="btn-start"
          >
            <Play size={24} fill="currentColor" />
            {getTranslatedText('start_practice', language)}
          </button>

          <div className="space-y-4 bg-white/50 p-6 rounded-3xl border border-stone-200 shadow-sm">
            <div className="flex justify-between items-end">
              <span className="text-sm font-black text-stone-400 uppercase tracking-widest">
                {getTranslatedText('progress_title', language)}
              </span>
              <span className="text-lg font-black text-amber-600">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-4 w-full bg-stone-200 rounded-full overflow-hidden p-1 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-amber-600 rounded-full shadow-sm"
              />
            </div>
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
              {totalCorrect} / {totalTarget} phrases mastered
            </p>
          </div>
          
          {Object.keys(mastery).length > 0 && (
            <button 
              onClick={onReset}
              className="text-stone-400 hover:text-red-600 text-xs font-bold transition-colors flex items-center gap-1 mx-auto"
            >
              <RotateCcw size={12} />
              {getTranslatedText('reset_progress', language)}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function PracticeView({ 
  lesson, 
  mastery,
  language,
  lessonTitleTranslation,
  setLessonTitleTranslation,
  lessonGrammarTranslation,
  setLessonGrammarTranslation,
  onComplete, 
  onBack,
  timerDuration
}: { 
  lesson: Lesson; 
  mastery: Record<number, number>;
  language: AppLanguage;
  timerDuration: number | null;
  lessonTitleTranslation: string | null;
  setLessonTitleTranslation: (val: string | null) => void;
  lessonGrammarTranslation: string | null;
  setLessonGrammarTranslation: (val: string | null) => void;
  onComplete: (correctCount: number) => void; 
  onBack: () => void 
}) {
  const [queue, setQueue] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionCorrectIds, setSessionCorrectIds] = useState<Set<string>>(new Set());
  const correctCount = sessionCorrectIds.size;
  const [showAnswer, setShowAnswer] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [judgement, setJudgement] = useState<'correct' | 'wrong' | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [inputText, setInputText] = useState('');
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [inputMethod, setInputMethod] = useState<'voice' | 'keyboard'>('voice');
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedTextTranslation, setSelectedTextTranslation] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false);

  // Translation Cache for Prompts
  const [promptTranslations, setPromptTranslations] = useState<Record<string, string>>({});
  const [isTranslatingPrompt, setIsTranslatingPrompt] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const currentSentenceId = queue[currentIndex];
  const currentSentence = lesson.sentences.find(s => s.id === currentSentenceId);

  // Timer Logic
  useEffect(() => {
    if (timerDuration && !showAnswer && judgement === null) {
      setTimeLeft(timerDuration);
    } else {
      setTimeLeft(null);
    }
  }, [currentIndex, timerDuration, lesson.id, showAnswer, judgement]);

  useEffect(() => {
    if (timeLeft === null || showAnswer || judgement !== null) return;

    if (timeLeft === 0) {
      setJudgement('wrong');
      setShowAnswer(true);
      setWrongCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 2 && currentSentence) {
          getAdvice('', currentSentence.target, currentSentence.display_es || currentSentence.display || '');
        }
        return newCount;
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, judgement, currentSentence]);

  useEffect(() => {
    if (inputMethod === 'keyboard') {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [inputMethod]);
  const [isTranslatingWord, setIsTranslatingWord] = useState(false);
  const [wordCache, setWordCache] = useState<Record<string, string>>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Translate specific sentence parts and lesson info when language or sentence changes
  useEffect(() => {
    if (!currentSentence) return;
    
    const translateContent = async () => {
      let title = lesson.title_en || lesson.title;
      let grammar = lesson.grammar_en || lesson.grammar;
      let promptText = currentSentence.display_en || currentSentence.display || '';

      if (language === 'es') {
        if (lesson.title_es) title = lesson.title_es;
        if (lesson.grammar_es) grammar = lesson.grammar_es;
        if (currentSentence.display_es) promptText = currentSentence.display_es;
      } else if (language === 'en') {
        title = lesson.title_en || lesson.title;
        grammar = lesson.grammar_en || lesson.grammar;
        if (currentSentence.display_en) promptText = currentSentence.display_en;
        else if (currentSentence.display) promptText = currentSentence.display;
      } else if (language === 'it') {
        if (lesson.title_it) title = lesson.title_it;
        if (lesson.grammar_it) grammar = lesson.grammar_it;
        if (currentSentence.display_it) promptText = currentSentence.display_it;
      } else if (language === 'ja') {
        title = lesson.title_ja || lesson.title;
        grammar = lesson.grammar_ja || lesson.grammar;
        if (currentSentence.display_ja) promptText = currentSentence.display_ja;
      }

      setLessonTitleTranslation(title);
      setLessonGrammarTranslation(grammar);

      const cacheKey = currentSentence.id + '_' + language;
      const hasCorrectLang = (
        (language === 'es' && currentSentence.display_es) ||
        (language === 'en' && (currentSentence.display_en || currentSentence.display)) ||
        (language === 'it' && currentSentence.display_it) ||
        (language === 'ja' && currentSentence.display_ja)
      );

      // Set fallback if we don't have the translation yet
      if (!promptTranslations[cacheKey]) {
        setPromptTranslations(prev => ({ ...prev, [cacheKey]: promptText }));
      }

      if (hasCorrectLang) {
        return;
      }

      setIsTranslatingPrompt(true);
      try {
        const langMap: Record<AppLanguage, string> = { es: 'Spanish', en: 'English', it: 'Italian', ja: 'Japanese' };
        const targetLangName = langMap[language];
        
        const response = await fetch('/api/ai/translate-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: currentSentence.display_es || currentSentence.display || '',
            targetLang: targetLangName
          })
        });
        
        const data = await response.json();
        if (data.translatedText) {
          setPromptTranslations(prev => ({ ...prev, [cacheKey]: data.translatedText }));
        }
      } catch (e) {
        console.error("Translation failed:", e);
      } finally {
        setIsTranslatingPrompt(false);
      }
    };
    translateContent();
  }, [currentSentence?.id, language, lesson.id]);

  const displayPrompt = currentSentence 
    ? (promptTranslations[currentSentence.id + '_' + language] || currentSentence.display_es || currentSentence.display_en || currentSentence.display || '') 
    : '';

  const handleWordHover = (word: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    const cleanWord = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '').toLowerCase();
    if (!cleanWord) return;

    if (wordCache[cleanWord]) {
      setSelectedTextTranslation(wordCache[cleanWord]);
      return;
    }

    hoverTimeoutRef.current = setTimeout(async () => {
      setIsTranslatingWord(true);
      try {
        const response = await fetch('/api/ai/translate-word', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            word: cleanWord,
            context: displayPrompt
          })
        });
        
        const data = await response.json();
        if (data.translatedText) {
          setWordCache(prev => ({ ...prev, [cleanWord]: data.translatedText }));
          setSelectedTextTranslation(data.translatedText);
        }
      } catch (e) {
        console.error("Word hover translation failed:", e);
      } finally {
        setIsTranslatingWord(false);
      }
    }, 450);
  };

  const handleHoverLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setSelectedTextTranslation(null);
  };

  const handleTextSelection = async () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    
    if (!selectedText || selectedText.length === 0 || selectedText.length > 50) {
      setSelectedTextTranslation(null);
      return;
    }

    setIsTranslatingWord(true);
    try {
      const response = await fetch('/api/ai/translate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: selectedText,
          targetLang: 'Japanese'
        })
      });
      const data = await response.json();
      if (data.translatedText) {
        setSelectedTextTranslation(data.translatedText);
      }
    } catch (e) {
      console.error("Word translation failed:", e);
    } finally {
      setIsTranslatingWord(false);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if focus is on an input, unless we are in voice mode and pressing space
      const isInputFocused = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName);
      
      if (e.key === ' ' && inputMethod === 'voice' && judgement !== 'correct') {
        e.preventDefault();
        toggleListening();
      }
      
      if (e.key === 'ArrowRight' && judgement === 'correct') {
        e.preventDefault();
        next();
      }
      
      if (e.key === 'Enter') {
        if (judgement === 'correct') {
          next();
        } else if (inputText || isListening) {
          checkAnswer();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, inputText, judgement, inputMethod, lesson.id]);

  // Reset practice state when lesson changes
  useEffect(() => {
    const sessionKey = `practice_session_${lesson.id}`;
    const saved = localStorage.getItem(sessionKey);
    if (saved) {
      setQueue(JSON.parse(saved));
    } else {
      const shuffledIds = lesson.sentences.map(s => s.id).sort(() => Math.random() - 0.5);
      setQueue(shuffledIds);
      localStorage.setItem(sessionKey, JSON.stringify(shuffledIds));
    }
    setCurrentIndex(0);
    setSessionCorrectIds(new Set());
    setShowAnswer(false);
    setInputText('');
    setSelectedTextTranslation(null);
    setJudgement(null);
    setWrongCount(0);
  }, [lesson.id]);

  const next = () => {
    const sessionKey = `practice_session_${lesson.id}`;
    
    if (judgement !== 'correct') {
      // Re-queue if wrong or skipped
      const newQueue = [...queue, currentSentenceId];
      setQueue(newQueue);
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      localStorage.setItem(sessionKey, JSON.stringify(newQueue.slice(nextIdx)));
    } else {
      // Correct
      if (currentIndex < queue.length - 1) {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        localStorage.setItem(sessionKey, JSON.stringify(queue.slice(nextIdx)));
      } else {
        localStorage.removeItem(sessionKey);
        onComplete(correctCount);
        return;
      }
    }

    setShowAnswer(false);
    setInputText('');
    setSelectedTextTranslation(null);
    setJudgement(null);
    setAdvice(null);
    setWrongCount(0);
  };

  const normalizeJapanese = (str: string) => {
    // Basic number mapping for common N5 kanji to arabic
    const kanjiNumbers: Record<string, string> = {
      '〇': '0', '一': '1', '二': '2', '三': '3', '四': '4', 
      '五': '5', '六': '6', '七': '7', '八': '8', '九': '9', '十': '10',
      '１': '1', '２': '2', '３': '3', '４': '4', '５': '5', '６': '6', '７': '7', '８': '8', '９': '9', '０': '0'
    };

    // Equivalencies for common variations (Place vs Direction)
    const equivalencies: Record<string, string> = {
      'コチラ': 'ココ',
      'ソチラ': 'ソコ',
      'アチラ': 'アソコ',
      'ドチラ': 'ドコ',
    };

    let normalized = str
      .replace(/[、。！？\s・「」『』（）]/g, '')
      .replace(/[ぁ-ゔ]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0x60)) // To Katakana for uniform comparison
      .replace(/[ァ-ヴ]/g, (s) => s) // Keep Katakana
      .toLowerCase();

    // Multi-pass replacement for simple kanji numbers
    Object.entries(kanjiNumbers).forEach(([kanji, num]) => {
      normalized = normalized.split(kanji).join(num);
    });

    // Handle place/direction equivalencies
    Object.entries(equivalencies).forEach(([from, to]) => {
      normalized = normalized.split(from).join(to);
    });

    return normalized;
  };

  const getAdvice = async (userInput: string, targetAnswer: string, displayPrompt: string) => {
    setIsGeneratingAdvice(true);
    try {
      const langNames: Record<AppLanguage, string> = {
        es: 'Español',
        en: 'Inglés',
        it: 'Italiano',
        ja: 'Japanese'
      };
      
      const response = await fetch('/api/ai/get-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput,
          targetAnswer,
          displayPrompt,
          languageName: langNames[language]
        })
      });
      
      const data = await response.json();
      if (data.advice) {
        setAdvice(data.advice);
      }
    } catch (error) {
      console.error("Advice generation error:", error);
      setAdvice("アドバイスの生成に失敗しました。正解を確認して次に進みましょう！");
    } finally {
      setIsGeneratingAdvice(false);
    }
  };

  const compareAnswers = (userInput: string, correctTarget: string) => {
    const user = normalizeJapanese(userInput);
    const target = normalizeJapanese(correctTarget);
    
    // 1. Direct match (Normalized)
    if (user === target) return true;
    
    // Allow for small variations if it's long enough
    if (target.length > 5) {
      if (user.includes(target) || target.includes(user)) return true;
    }
    
    return false;
  };

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('お使いのブラウザは音声認識に対応していません。');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP'; 
    recognition.interimResults = false; // Set to false to avoid multiple AI conversion calls

    recognition.onstart = () => {
      setIsListening(true);
      setInputText('');
      setJudgement(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setInputText(result);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-judge when listending stops and we have a transcript
    };

    recognition.start();
  };

  const [isJudging, setIsJudging] = useState(false);

  // Add an effect to judge when transcript is finalized or user manually checks
  const checkAnswer = async () => {
    const finalAnswer = inputText;
    if (!finalAnswer || !currentSentence || isJudging) return;
    
    setIsJudging(true);
    try {
      let isCorrect = compareAnswers(finalAnswer, currentSentence.target);
      
      if (!isCorrect) {
        try {
          const response = await fetch('/api/ai/judge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userInput: finalAnswer,
              targetAnswer: currentSentence.target,
              romaji: currentSentence.romaji
            })
          });
          
          const data = await response.json();
          if (data.judgement && data.judgement.includes('CORRECT')) {
            isCorrect = true;
          }
        } catch (e) {
          console.error("AI Judging failed or timed out", e);
        }
      }

      if (isCorrect) {
        setJudgement('correct');
        setShowAnswer(true);
        playSuccessSound();
        setSessionCorrectIds(prev => new Set(prev).add(currentSentenceId));
      } else {
        setJudgement('wrong');
        const newWrongCount = wrongCount + 1;
        setWrongCount(newWrongCount);
        
        if (newWrongCount >= 2) {
          setShowAnswer(true);
          getAdvice(finalAnswer, currentSentence.target, currentSentence.display_es || currentSentence.display || '');
        }
      }
    } finally {
      setIsJudging(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // Speak in Japanese
    window.speechSynthesis.speak(utterance);
  };

  if (queue.length === 0 || !currentSentence) {
    return (
      <motion.div 
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-screen flex items-center justify-center bg-stone-100"
      >
        <div className="text-amber-800 font-serif text-xl flex items-center gap-2">
          <Castle className="animate-bounce" /> {language === 'ja' ? '準備中...' : 'Loading...'}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key="practice-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-white flex flex-col"
    >
      {/* Header for mobile practice */}
      <div className="p-4 flex items-center border-b border-stone-100 bg-white shadow-sm shrink-0">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-800 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 text-center">
             <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none mb-1">
               {lessonTitleTranslation || lesson.title}
             </div>
             <h2 className="text-sm font-black text-stone-800 leading-none truncate px-4">
               {lessonGrammarTranslation || lesson.grammar}
             </h2>
          </div>
          <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      <div className="flex-1 flex flex-col relative bg-stone-50 overflow-y-auto">
        {/* Timer Bar */}
        {timerDuration && !showAnswer && judgement === null && (
          <div className="absolute top-0 left-0 w-full h-1 z-30 overflow-hidden bg-stone-200">
            <motion.div
              key={currentIndex + (timeLeft ?? 0)}
              initial={timeLeft === timerDuration ? { width: '100%' } : false}
              animate={{ width: `${((timeLeft ?? 0) / timerDuration) * 100}%` }}
              transition={{ duration: 1, ease: 'linear' }}
              className={`h-full ${timeLeft !== null && timeLeft <= 2 ? 'bg-red-500' : 'bg-amber-600'}`}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center items-center gap-6 px-6 py-8 max-w-lg mx-auto w-full">
          
          {/* Input Method Toggle */}
          <div className="flex bg-stone-200/50 p-1 rounded-xl w-fit">
            <button
              onClick={() => setInputMethod('voice')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${
                inputMethod === 'voice' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Mic size={12} /> {getTranslatedText('voice_mode', language)}
            </button>
            <button
              onClick={() => setInputMethod('keyboard')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-2 ${
                inputMethod === 'keyboard' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <MessageSquare size={12} /> {getTranslatedText('text_mode', language)}
            </button>
          </div>

          {/* Spanish Prompt (Question) */}
          <div className="group space-y-1 text-center w-full" onMouseUp={handleTextSelection}>
             <h3 className="text-3xl font-black leading-tight text-stone-800 flex flex-wrap justify-center gap-x-2">
               {isTranslatingPrompt ? (
                 <div className="flex gap-2">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-8 bg-stone-300 rounded-sm" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-4 h-8 bg-stone-300 rounded-sm" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-4 h-8 bg-stone-300 rounded-sm" />
                 </div>
               ) : (
                displayPrompt.split(' ').map((word, idx) => (
                  <span 
                    key={idx} 
                    className="hover:text-amber-600 transition-colors"
                    onClick={() => handleWordHover(word)}
                  >
                    {word}
                  </span>
                ))
               )}
             </h3>
             <div className="min-h-[2rem] flex items-center justify-center mt-2">
               {selectedTextTranslation ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-amber-800 text-sm font-black bg-white px-4 py-1.5 rounded-full shadow-md border-b-2 border-amber-200 flex items-center gap-2"
                 >
                   <BookOpen size={14} className="text-amber-500" />
                   {selectedTextTranslation}
                 </motion.div>
               ) : isTranslatingWord ? (
                 <div className="w-4 h-4 border-2 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
               ) : null}
             </div>
          </div>

          {/* Interaction Zone */}
          <div className="w-full flex flex-col items-center gap-6">
            
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex items-center gap-3 w-full">
                <AnimatePresence mode="wait">
                  {judgement && (
                    <motion.div
                      key={judgement + currentIndex + (judgement === 'wrong' ? wrongCount : 0)}
                      initial={{ scale: 0.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.2, opacity: 0 }}
                      className="shrink-0"
                    >
                      {judgement === 'correct' ? (
                        <div className="text-5xl text-green-500 font-black">◯</div>
                      ) : (
                        <div className="text-5xl text-red-600 font-black">×</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="flex-1 relative flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input 
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => {
                        setInputText(e.target.value);
                        if (judgement) setJudgement(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') checkAnswer();
                      }}
                      placeholder={inputMethod === 'voice' ? (isListening ? "Listening..." : "Tap to record") : "Type here..."}
                      disabled={showAnswer && judgement === 'correct'}
                      className={`
                        w-full bg-white border-2 px-6 py-4 rounded-2xl font-bold text-xl shadow-sm transition-all
                        focus:outline-none focus:ring-4 focus:ring-amber-400/20
                        ${judgement === 'wrong' ? 'border-red-200 text-red-600' : 'border-stone-100 text-stone-800'}
                        ${isListening || isProcessingAudio ? 'opacity-50' : ''}
                        ${inputMethod === 'voice' ? 'text-center' : ''}
                      `}
                    />
                  </div>

                  {inputMethod === 'voice' && (
                    <button
                      onClick={toggleListening}
                      disabled={showAnswer && judgement === 'correct'}
                      className={`
                        p-6 rounded-2xl transition-all duration-300 shadow-xl relative shrink-0
                        ${isListening ? 'bg-red-500 text-white scale-105' : 'bg-white text-stone-400 hover:text-amber-800'}
                        ${showAnswer && judgement === 'correct' ? 'opacity-40' : ''}
                      `}
                    >
                      {isListening && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="absolute inset-0 bg-red-400 rounded-full"
                        />
                      )}
                      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                  )}
                </div>
              </div>

              {(isJudging || isGeneratingAdvice) && (
                <div className="flex items-center gap-2 text-stone-400 font-bold text-[10px] tracking-widest px-4 py-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  {isJudging ? "Judging..." : "Thinking..."}
                </div>
              )}
              
              <div className="w-full">
                {((inputText || isListening) && judgement !== 'correct') && (
                  <button 
                    onClick={checkAnswer}
                    disabled={isJudging}
                    className="w-full bg-amber-600 text-white py-4 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isJudging ? "..." : getTranslatedText('check_button', language)}
                  </button>
                )}
                
                {judgement === 'wrong' && !isListening && (
                  <button 
                    onClick={() => {
                      setInputText('');
                      setJudgement(null);
                      if (inputMethod === 'voice') toggleListening();
                    }}
                    className="mt-4 w-full py-3 bg-white text-red-600 rounded-xl font-black text-sm border border-red-100 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> {getTranslatedText('try_again', language)}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Answer Preview */}
          <div className="w-full min-h-[10rem] relative">
            <AnimatePresence mode="wait">
              {showAnswer ? (
                <motion.div 
                  key="answer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-full p-6 bg-amber-800 text-white rounded-[2rem] shadow-xl flex flex-col justify-center items-center text-center"
                >
                  <button 
                    onClick={() => speak(currentSentence.target)}
                    className="mb-4 p-3 bg-amber-700/50 rounded-full"
                  >
                    <Volume2 size={24} />
                  </button>
                  
                  <div className="space-y-1">
                    <p className="text-2xl font-black">{currentSentence.target}</p>
                    {currentSentence.romaji && (
                      <p className="text-xs font-bold text-amber-200/60 font-mono italic">
                        {currentSentence.romaji}
                      </p>
                    )}
                  </div>

                  {judgement === 'wrong' && advice && (
                    <div className="mt-4 pt-4 border-t border-amber-700/50">
                      <p className="text-xs text-amber-100 font-medium italic">
                        {advice}
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="w-full h-full border-2 border-dashed border-stone-200 rounded-[2rem] text-stone-300 flex flex-col items-center justify-center gap-2 py-10"
                >
                  <Eye size={32} />
                  <span className="font-black text-xs uppercase tracking-widest">{getTranslatedText('show_answer_hint', language)}</span>
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="p-4 bg-white border-t border-stone-100 flex items-center gap-4 shrink-0 shadow-lg">
         <div className="flex-1">
           <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / queue.length) * 100}%` }}
                className="h-full bg-amber-600 rounded-full"
              />
           </div>
           <div className="flex justify-between text-[8px] font-black text-stone-400 mt-1 uppercase">
             <span>{correctCount} / {lesson.sentences.length}</span>
             <span>{Math.round((correctCount / lesson.sentences.length) * 100)}%</span>
           </div>
         </div>

        <button
          disabled={!showAnswer}
          onClick={next}
          className={`
            px-8 py-3 rounded-xl font-black transition-all flex items-center gap-2
            ${showAnswer ? 'bg-stone-900 text-white shadow-xl scale-105' : 'bg-stone-100 text-stone-300'}
          `}
        >
          {currentIndex === queue.length - 1 && judgement === 'correct' 
            ? getTranslatedText('done_label', language) 
            : getTranslatedText('next_label', language)}
          <Play size={18} fill="currentColor" />
        </button>
      </div>
    </motion.div>
  )
}

function LessonsView({ 
  mastery, 
  language,
  onSelectLesson,
  onBack 
}: { 
  mastery: Record<number, number>; 
  language: AppLanguage;
  onSelectLesson: (l: Lesson) => void; 
  onBack: () => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-stone-50 flex flex-col overflow-hidden"
    >
      <header className="p-4 flex items-center justify-between bg-white border-b border-stone-200 sticky top-0 z-50">
        <button onClick={onBack} className="p-2 text-stone-400 hover:text-stone-800">
          <Home size={20} />
        </button>
        <h2 className="text-xl font-black tracking-tight text-stone-800">
          {getTranslatedText('military_records', language)}
        </h2>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-lg mx-auto w-full">
        {LESSONS.map((l) => {
          const lessonId = l.id;
          const lessonMastery = mastery[lessonId] || 0;
          const progress = (lessonMastery / l.sentences.length) * 100;
          const displayTitle = language === 'es' ? (l.title_es || l.title) : 
                               language === 'en' ? (l.title_en || l.title) : 
                               language === 'it' ? (l.title_it || l.title) : 
                               (l.title_ja || l.title);
          const displayGrammar = language === 'es' ? (l.grammar_es || l.grammar) : 
                                 language === 'en' ? (l.grammar_en || l.grammar) : 
                                 language === 'it' ? (l.grammar_it || l.grammar) : 
                                 (l.grammar_ja || l.grammar);

          return (
            <button
              key={lessonId}
              onClick={() => onSelectLesson(l)}
              className="w-full bg-white p-5 rounded-3xl text-left transition-all border border-stone-200 hover:border-amber-400 hover:shadow-lg flex flex-col gap-4 group active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 transition-colors
                    ${lessonMastery === l.sentences.length ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'}
                `}>
                  {lessonMastery === l.sentences.length ? <CheckCircle2 size={24} /> : lessonId}
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">
                    {displayTitle}
                  </div>
                  <div className="text-lg font-black text-stone-800 group-hover:text-amber-900 transition-colors">
                    {displayGrammar} <span className="opacity-40 font-bold ml-1 text-sm tracking-normal">({l.sentences.length}{language === 'ja' ? '問' : ' Qs'})</span>
                  </div>
                </div>
                <ChevronLeft size={20} className="rotate-180 text-stone-300 group-hover:text-amber-500" />
              </div>
              
              <div className="bg-stone-50 rounded-2xl p-3 flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-stone-400 uppercase">
                  <span>{getTranslatedText('progress_label', language)}</span>
                  <span className={lessonMastery === l.sentences.length ? 'text-green-600' : 'text-amber-600'}>{lessonMastery}/{l.sentences.length}</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full transition-colors ${lessonMastery === l.sentences.length ? 'bg-green-500' : 'bg-amber-500'}`}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function CompletionView({ 
  lesson, 
  language,
  mastery,
  lessonTitleTranslation,
  onNext 
}: { 
  lesson: Lesson; 
  language: AppLanguage;
  mastery: Record<number, number>;
  lessonTitleTranslation: string | null;
  onNext: () => void 
}) {
  const lessonMastery = mastery[lesson.id] || 0;
  const progress = (lessonMastery / lesson.sentences.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 bg-stone-50 relative overflow-hidden"
    >
      <motion.div
        initial={{ y: 50, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="relative z-10"
      >
        <div className="w-48 h-48 bg-white p-6 rounded-full shadow-2xl border-4 border-amber-200 flex items-center justify-center">
          <Trophy size={100} className="text-amber-500 drop-shadow-lg" />
        </div>
      </motion.div>

      <div className="space-y-3 relative z-10">
        <h2 className="text-4xl font-black text-stone-900">
          {getTranslatedText('congratulations', language)}
        </h2>
        <p className="text-amber-800 font-bold bg-amber-50 px-6 py-2 rounded-full border border-amber-200 shadow-sm">
          {lessonTitleTranslation || lesson.title} {getTranslatedText('lesson_cleared', language)}
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-8 rounded-[2rem] shadow-xl border-b-4 border-amber-600 w-full max-w-sm relative z-10"
      >
        <div className="text-xs text-amber-600 font-black mb-4 flex items-center justify-center gap-1 tracking-widest uppercase">
          <Play size={14} fill="currentColor" /> {getTranslatedText('progress_label', language)}
        </div>
        <div className="text-4xl font-black text-stone-800 mb-2">{lessonMastery} / {lesson.sentences.length}</div>
        <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200 p-0.5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-amber-500 rounded-full"
          />
        </div>
        <p className="text-xs text-stone-400 mt-4 font-bold uppercase tracking-wider">
           Mastery: {Math.round(progress)}%
        </p>
      </motion.div>

      <button 
        onClick={onNext}
        className="w-full max-w-sm py-5 bg-stone-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl relative z-10 active:translate-y-1"
      >
         {getTranslatedText('back_to_map', language)}
         <ChevronLeft className="rotate-180" size={20} />
      </button>
    </motion.div>
  )
}
