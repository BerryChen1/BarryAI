import { useEffect, useState } from 'react';

type ExperienceHistoryState = {
  portfolioExperienceIndex?: number;
  portfolioExperienceTab?: string;
  portfolioExperienceDepth?: number;
};

function tabFromHistory(state: unknown, experienceIndex: number, tabs: readonly string[]): string {
  const entry = (state ?? {}) as ExperienceHistoryState;
  return entry.portfolioExperienceIndex === experienceIndex &&
    entry.portfolioExperienceTab && tabs.includes(entry.portfolioExperienceTab)
    ? entry.portfolioExperienceTab
    : 'overview';
}

export function useExperienceTabHistory(experienceIndex: number, tabs: readonly string[]) {
  const [activeTab, setActiveTab] = useState(() =>
    tabFromHistory(window.history.state, experienceIndex, tabs),
  );

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setActiveTab(tabFromHistory(event.state, experienceIndex, tabs));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [experienceIndex, tabs]);

  const changeTab = (tab: string) => {
    if (tab === activeTab || !tabs.includes(tab)) return;
    const state = (window.history.state ?? {}) as ExperienceHistoryState;
    if (state.portfolioExperienceIndex === experienceIndex) {
      window.history.pushState(
        {
          ...state,
          portfolioExperienceTab: tab,
          portfolioExperienceDepth: (state.portfolioExperienceDepth ?? 0) + 1,
        },
        '',
        window.location.href,
      );
    }
    setActiveTab(tab);
  };

  return [activeTab, changeTab] as const;
}
