import React, { useState } from 'react';
import { Calculator, Copy, Check, RotateCcw, Clock, Type, AlignLeft } from 'lucide-react';

interface WordCounterProps {
  onNotify: (message: string) => void;
}

const SAMPLE_TEXT = `Effective communication is the cornerstone of high-performing distributed teams. When writing documentation, clarity and conciseness save hundreds of hours across an organization. A well-structured proposal outlines the problem statement clearly, presents empirical evidence, and outlines concrete milestones for execution.

Remember to balance thoroughness with brevity: readers appreciate crisp explanations over convoluted prose.`;

export const WordCounter: React.FC<WordCounterProps> = ({ onNotify }) => {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [copied, setCopied] = useState(false);

  // Live Metric Calculations
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    : 0;
  const paragraphs = trimmed
    ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length
    : 0;

  // Reading time (~225 words per minute)
  const readingTimeMinutes = Math.ceil(words / 225);
  const readingTimeFormatted = words === 0
    ? '0 sec'
    : words < 60
    ? `${Math.max(1, Math.round((words / 225) * 60))} sec`
    : `${(words / 225).toFixed(1)} min`;

  // Speaking time (~130 words per minute)
  const speakingTimeFormatted = words === 0
    ? '0 sec'
    : words < 40
    ? `${Math.max(1, Math.round((words / 130) * 60))} sec`
    : `${(words / 130).toFixed(1)} min`;

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    onNotify('Text copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
    onNotify('Editor cleared');
  };

  const handleUpperCase = () => {
    setText(text.toUpperCase());
    onNotify('Converted to UPPERCASE');
  };

  const handleLowerCase = () => {
    setText(text.toLowerCase());
    onNotify('Converted to lowercase');
  };

  const handleTitleCase = () => {
    const titleCased = text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
    setText(titleCased);
    onNotify('Converted to Title Case');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span>Word Counter</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time live statistics as you type, with reading estimates and text tools.
          </p>
        </div>

        {/* Quick Utilities */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleTitleCase}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
          >
            Title Case
          </button>
          <button
            onClick={handleUpperCase}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
          >
            UPPERCASE
          </button>
          <button
            onClick={handleLowerCase}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
          >
            lowercase
          </button>
          {text && (
            <button
              onClick={handleClear}
              className="px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary KPI Strip (Mandatory Word Count, Character Count, Reading Time) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Word Count (Primary Highlight) */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-100/90 rounded-xl">
          <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
            Words
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-mono tabular-nums mt-1">
            {words.toLocaleString()}
          </div>
          <div className="text-[11px] text-blue-600/80 mt-0.5">Live updated</div>
        </div>

        {/* Character Count */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Characters
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {charsWithSpaces.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5 font-mono tabular-nums">
            {charsNoSpaces} no spaces
          </div>
        </div>

        {/* Reading Time */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Reading Time</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {readingTimeFormatted}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">@ 225 wpm</div>
        </div>

        {/* Speaking Time */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Type className="w-3 h-3 text-slate-400" />
            <span>Speaking Time</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {speakingTimeFormatted}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">@ 130 wpm</div>
        </div>

        {/* Sentences */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <AlignLeft className="w-3 h-3 text-slate-400" />
            <span>Sentences</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {sentences}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {sentences > 0 ? (words / sentences).toFixed(1) : 0} w/sent
          </div>
        </div>

        {/* Paragraphs */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Paragraphs
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {paragraphs}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {paragraphs > 0 ? (words / paragraphs).toFixed(1) : 0} w/para
          </div>
        </div>
      </div>

      {/* Live Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <label htmlFor="word-counter-input" className="font-medium text-slate-700">
            Type, edit, or paste your copy below:
          </label>
          <button
            onClick={handleCopy}
            disabled={!text}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 disabled:opacity-40 disabled:hover:text-slate-600 font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>
        </div>

        <textarea
          id="word-counter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here to inspect live word count, character count, and reading duration..."
          rows={9}
          className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 leading-relaxed resize-y font-normal"
        />
      </div>
    </div>
  );
};
