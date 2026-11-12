import React, { useState } from 'react';
import { Copy, Check, Sparkles, RotateCcw, ArrowDownRight, FileText } from 'lucide-react';

interface TextSummarizerProps {
  onNotify: (message: string) => void;
}

const SAMPLE_TEXT = `Artificial intelligence and automated text processing are transforming how modern knowledge workers interact with information. In traditional corporate workflows, managers and researchers often spend between 20% and 30% of their working hours reading through lengthy memos, research reports, and technical documentation. By leveraging smart summarization architectures, organizations can distill complex 10-page documents into high-priority actionable takeaways within seconds. This shift not only accelerates decision-making cycles but also eliminates cognitive fatigue, enabling teams to allocate more energy toward creative strategy, user research, and collaborative problem-solving across all departments.`;

const DUMMY_SUMMARIES: Record<string, string> = {
  brief: `AI-driven text processing is fundamentally changing corporate knowledge workflows. Rather than dedicating 20–30% of daily hours to lengthy reports, knowledge workers use automated summarization to distill 10-page documents into actionable takeaways, speeding decisions and reducing cognitive overload.`,
  bullets: `• Knowledge workers currently spend 20–30% of work hours reading dense memos and reports.
• Smart summarization condenses 10-page documents into core executive points in seconds.
• Speeds up organizational decision cycles while drastically reducing mental fatigue.
• Frees high-value time for strategy, customer discovery, and cross-team execution.`,
  executive: `Executive Brief:
Modern AI summarization tools address critical productivity bottlenecks where teams lose up to nearly a third of their time reading documentation. By compressing complex data into instant briefings, enterprises achieve higher velocity, consistent alignment, and improved focus on strategic business outcomes.`,
};

export const TextSummarizer: React.FC<TextSummarizerProps> = ({ onNotify }) => {
  const [inputText, setInputText] = useState('');
  const [summaryMode, setSummaryMode] = useState<'brief' | 'bullets' | 'executive'>('brief');
  const [summarizedText, setSummarizedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  const handleSummarize = () => {
    if (!inputText.trim()) {
      // If user clicks without entering text, give them a helpful nudge
      setInputText(SAMPLE_TEXT);
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSummarizedText(DUMMY_SUMMARIES[summaryMode]);
      onNotify('Text summarized successfully!');
    }, 450);
  };

  const handleLoadSample = () => {
    setInputText(SAMPLE_TEXT);
    onNotify('Sample article loaded');
  };

  const handleClear = () => {
    setInputText('');
    setSummarizedText(null);
  };

  const handleCopy = () => {
    if (!summarizedText) return;
    navigator.clipboard.writeText(summarizedText);
    setCopied(true);
    onNotify('Summary copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const summaryWords = summarizedText ? summarizedText.trim().split(/\s+/).length : 0;
  const reductionPercent = wordCount > 0 && summaryWords > 0 
    ? Math.max(10, Math.round(((wordCount - summaryWords) / wordCount) * 100))
    : 68;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Text Summarizer</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Condense lengthy articles, meeting notes, and research into concise highlights.
          </p>
        </div>

        {/* Style Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => {
              setSummaryMode('brief');
              if (summarizedText) setSummarizedText(DUMMY_SUMMARIES['brief']);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              summaryMode === 'brief'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Brief Paragraph
          </button>
          <button
            onClick={() => {
              setSummaryMode('bullets');
              if (summarizedText) setSummarizedText(DUMMY_SUMMARIES['bullets']);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              summaryMode === 'bullets'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Key Bullets
          </button>
          <button
            onClick={() => {
              setSummaryMode('executive');
              if (summarizedText) setSummarizedText(DUMMY_SUMMARIES['executive']);
            }}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              summaryMode === 'executive'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Executive
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <label htmlFor="summarizer-input" className="font-medium text-slate-700">
            Paste or type your text:
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLoadSample}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
            >
              Paste sample article
            </button>
            {inputText && (
              <>
                <span>·</span>
                <button
                  onClick={handleClear}
                  className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            id="summarizer-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your report, article, or essay here to generate a clear, summarized overview..."
            rows={7}
            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-400">
            <span className="font-mono tabular-nums">
              {wordCount} words · {charCount} characters
            </span>
            <span>Recommended: 50+ words</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={handleSummarize}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Summarizing...' : 'Summarize'}</span>
        </button>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Instant client-side generation
        </span>
      </div>

      {/* Result Output */}
      {summarizedText && (
        <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in duration-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                Generated Summary
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono tabular-nums">
                <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                ~{reductionPercent}% shorter ({summaryWords} words)
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg shadow-2xs transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-98"
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

          <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-100 text-slate-800 text-sm leading-relaxed whitespace-pre-line font-normal">
            {summarizedText}
          </div>
        </div>
      )}
    </div>
  );
};
