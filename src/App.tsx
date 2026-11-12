import React, { useState } from 'react';
import { Header } from './components/Header';
import { NavigationTabs, ToolTab } from './components/Tabs';
import { TextSummarizer } from './components/TextSummarizer';
import { Translator } from './components/Translator';
import { WordCounter } from './components/WordCounter';
import { AdSpace } from './components/AdSpace';
import { Footer } from './components/Footer';
import { PremiumModal } from './components/PremiumModal';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<ToolTab>('summarizer');
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Header */}
      <Header onOpenPremium={() => setIsPremiumOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Intro Hero Strip */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            All-in-One Online Text Utilities
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Free, instantaneous text tools for summarizing documents, translating across languages, and tracking word metrics in real-time.
          </p>
        </div>

        {/* 2. Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

        {/* 3, 4, 5. Active Tool Content */}
        <section aria-label="Productivity Tool Workspace" className="w-full">
          {activeTab === 'summarizer' && (
            <div className="transition-opacity duration-150">
              <TextSummarizer onNotify={showNotification} />
            </div>
          )}

          {activeTab === 'translator' && (
            <div className="transition-opacity duration-150">
              <Translator onNotify={showNotification} />
            </div>
          )}

          {activeTab === 'word-counter' && (
            <div className="transition-opacity duration-150">
              <WordCounter onNotify={showNotification} />
            </div>
          )}
        </section>

        {/* 6. Ad Space */}
        <section aria-label="Advertisement Banner">
          <AdSpace />
        </section>
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Go Premium Modal Dialog */}
      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
        onNotify={showNotification}
      />

      {/* Action Notification Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
