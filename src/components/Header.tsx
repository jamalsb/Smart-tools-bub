import React from 'react';
import { Sparkles, Crown } from 'lucide-react';

interface HeaderProps {
  onOpenPremium: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPremium }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Logo Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              SmartTools<span className="text-blue-600"> Hub</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-medium">
              v1.0
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation / Trust indicators (clean, subtle text links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <span className="text-slate-400">·</span>
          <span className="text-xs text-slate-500">Fast, free client-side productivity</span>
          <span className="text-slate-400">·</span>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPremium}
            className="group flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <Crown className="w-3.5 h-3.5 text-amber-300 transition-transform group-hover:scale-110" />
            <span>Go Premium</span>
          </button>
        </div>
      </div>
    </header>
  );
};
