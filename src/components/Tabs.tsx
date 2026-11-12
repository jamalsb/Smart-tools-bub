import React from 'react';
import { FileText, Languages, Calculator } from 'lucide-react';

export type ToolTab = 'summarizer' | 'translator' | 'word-counter';

interface NavigationTabsProps {
  activeTab: ToolTab;
  onTabChange: (tab: ToolTab) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'summarizer' as ToolTab,
      label: 'Text Summarizer',
      icon: FileText,
      description: 'Condense long articles & notes',
    },
    {
      id: 'translator' as ToolTab,
      label: 'Translator',
      icon: Languages,
      description: 'Multi-language instant translation',
    },
    {
      id: 'word-counter' as ToolTab,
      label: 'Word Counter',
      icon: Calculator,
      description: 'Live counts & reading speed',
    },
  ];

  return (
    <div className="w-full">
      <div className="p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row gap-1 shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isActive
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
