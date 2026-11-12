import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-8 mt-12 text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <p className="font-medium text-slate-600">
            © 2026 SmartTools Hub. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </a>
          <span className="text-slate-300">·</span>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition-colors">
            Terms of Service
          </a>
          <span className="text-slate-300">·</span>
          <a href="#status" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition-colors">
            System Status
          </a>
        </div>
      </div>
    </footer>
  );
};
