import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, Volume2, Languages, RotateCcw } from 'lucide-react';

interface TranslatorProps {
  onNotify: (message: string) => void;
}

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  isRtl?: boolean;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', isRtl: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', isRtl: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

const SAMPLE_ENGLISH_PHRASE = "SmartTools Hub provides automated productivity utilities for researchers, writers, and students worldwide.";

// High-quality dummy translations for different target languages
const TRANSLATION_MAP: Record<string, string> = {
  ur: 'سمارٹ ٹولز ہب دنیا بھر کے محققین، مصنفین اور طلباء کے لیے خودکار پیداواری صلاحیت کے ٹولز فراہم کرتا ہے۔',
  ar: 'يوفر سمارت تولز هب أدوات إنتاجية مؤتمتة للباحثين والكتاب والطلاب في جميع أنحاء العالم.',
  es: 'SmartTools Hub proporciona utilidades de productividad automatizadas para investigadores, redactores y estudiantes de todo el mundo.',
  fr: 'SmartTools Hub fournit des utilitaires de productivité automatisés pour les chercheurs, les rédacteurs et les étudiants du monde entier.',
  de: 'SmartTools Hub bietet automatisierte Produktivitätswerkzeuge für Forscher, Autoren und Studenten weltweit.',
  zh: 'SmartTools Hub 为全球的研究人员、作家和学生提供自动化的生产力实用工具。',
  hi: 'स्मार्टटूल्स हब दुनिया भर के शोधकर्ताओं, लेखकों और छात्रों के लिए स्वचालित उत्पादकता उपकरण प्रदान करता है।',
  en: 'SmartTools Hub provides automated productivity utilities for researchers, writers, and students worldwide.',
};

export const Translator: React.FC<TranslatorProps> = ({ onNotify }) => {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ur');
  const [inputText, setInputText] = useState(SAMPLE_ENGLISH_PHRASE);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const targetLangObj = LANGUAGES.find((l) => l.code === targetLang) || LANGUAGES[1];

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    if (translatedText && inputText) {
      setInputText(translatedText);
      setTranslatedText(inputText);
    }
    onNotify('Languages swapped');
  };

  const handleTranslate = () => {
    if (!inputText.trim()) {
      setInputText(SAMPLE_ENGLISH_PHRASE);
    }

    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      // Pick dummy translation based on target language
      const dummy = TRANSLATION_MAP[targetLang] || TRANSLATION_MAP['ur'];
      setTranslatedText(dummy);
      onNotify('Translation completed');
    }, 400);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    onNotify('Translation copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (!translatedText) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLang;
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      onNotify('Text-to-speech audio playback simulated');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-600" />
            <span>Translator</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant multi-language translation with native script formatting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setInputText(SAMPLE_ENGLISH_PHRASE)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
          >
            Insert sample phrase
          </button>
          {inputText && (
            <>
              <span className="text-slate-300">·</span>
              <button
                onClick={() => {
                  setInputText('');
                  setTranslatedText(null);
                }}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Language Selectors Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* From Dropdown */}
        <div className="w-full sm:flex-1">
          <label htmlFor="source-lang-select" className="block text-xs font-semibold text-slate-500 mb-1">
            From:
          </label>
          <div className="relative">
            <select
              id="source-lang-select"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full h-11 px-3.5 py-2 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all"
            >
              {LANGUAGES.map((lang) => (
                <option key={`from-${lang.code}`} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex sm:pt-5">
          <button
            onClick={handleSwapLanguages}
            title="Swap source and target languages"
            className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors shadow-xs"
          >
            <ArrowRightLeft className="w-4 h-4 text-blue-600" />
          </button>
        </div>

        {/* To Dropdown */}
        <div className="w-full sm:flex-1">
          <label htmlFor="target-lang-select" className="block text-xs font-semibold text-slate-500 mb-1">
            To:
          </label>
          <div className="relative">
            <select
              id="target-lang-select"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full h-11 px-3.5 py-2 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all"
            >
              {LANGUAGES.map((lang) => (
                <option key={`to-${lang.code}`} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Source Text Area */}
      <div className="space-y-1.5">
        <label htmlFor="translator-input" className="block text-xs font-medium text-slate-700">
          Source Text ({LANGUAGES.find((l) => l.code === sourceLang)?.name}):
        </label>
        <textarea
          id="translator-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste text to translate..."
          rows={5}
          className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 leading-relaxed resize-y"
        />
        <div className="flex justify-between items-center text-xs text-slate-400 px-1">
          <span className="font-mono tabular-nums">{inputText.length} characters</span>
          <span>Automatic sentence splitting</span>
        </div>
      </div>

      {/* Translate Action Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <Languages className={`w-4 h-4 ${isTranslating ? 'animate-pulse' : ''}`} />
          <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
        </button>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Target: <strong className="text-slate-600 font-semibold">{targetLangObj.name}</strong>
        </span>
      </div>

      {/* Translated Result Output */}
      {translatedText && (
        <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in duration-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                Translated Result ({targetLangObj.name})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSpeech}
                title="Listen to translation"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                  isSpeaking
                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                    : 'text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg shadow-2xs transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-98"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div
            dir={targetLangObj.isRtl ? 'rtl' : 'ltr'}
            className={`p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 leading-relaxed ${
              targetLangObj.isRtl
                ? 'font-urdu text-lg leading-loose text-right'
                : 'text-sm font-normal'
            }`}
          >
            {translatedText}
          </div>
        </div>
      )}
    </div>
  );
};
