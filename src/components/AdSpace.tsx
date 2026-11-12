import React from 'react';

export const AdSpace: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-28 sm:h-24 rounded-2xl border-2 border-dashed border-slate-300/90 bg-slate-100/70 flex flex-col items-center justify-center p-4 transition-colors hover:bg-slate-100">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] rounded-2xl" />

        <div className="relative z-10 text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-white/80 border border-slate-200/60 shadow-2xs">
            <span>Ad</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-600 tracking-tight">
            Advertisement Space
          </p>
          <p className="text-[11px] text-slate-400 font-mono">
            Responsive Display Slot · 728 × 90
          </p>
        </div>
      </div>
    </div>
  );
};
