import React from 'react';
import { X, Check, Crown, Zap, Shield, Sparkles } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onNotify }) => {
  if (!isOpen) return null;

  const handleSelectPlan = (plan: string) => {
    onNotify(`Selected ${plan} plan (UI preview mode)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Crown className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Upgrade to SmartTools Pro</h3>
              <p className="text-xs text-slate-500">Supercharge your writing and translation workflow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Comparison */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Free Tier */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Free Starter</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">$0 <span className="text-xs font-normal text-slate-500">/ forever</span></div>
                <p className="text-xs text-slate-500 mt-2">Essential utilities with standard limits</p>

                <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Basic Text Summarizer (up to 2,000 words)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Standard Translator (Top 10 languages)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Live Word Counter with reading stats</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan('Free Starter')}
                className="mt-6 w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Current Active Plan
              </button>
            </div>

            {/* Pro Tier */}
            <div className="p-5 rounded-xl border-2 border-blue-600 bg-blue-50/30 flex flex-col justify-between relative shadow-xs">
              <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-blue-600 text-white rounded text-[10px] font-bold tracking-wide uppercase">
                Popular
              </div>

              <div>
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Pro Member</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-1">$9 <span className="text-xs font-normal text-slate-500">/ month</span></div>
                <p className="text-xs text-slate-500 mt-2">For power researchers, copywriters & pros</p>

                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-medium">Ad-Free clean interface</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Unlimited document length summarization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>95+ languages with dialect support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Batch file upload & PDF export</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan('Pro')}
                className="mt-6 w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Start 14-Day Free Trial</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              Cancel anytime
            </span>
            <span>·</span>
            <span>Secure 256-bit encryption</span>
            <span>·</span>
            <span>No credit card required for trial</span>
          </div>
        </div>
      </div>
    </div>
  );
};
