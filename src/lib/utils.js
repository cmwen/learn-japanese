import { get } from 'svelte/store';
import { masteryProgress, gamificationProgress, language, theme, selectedInterests } from './stores';

// Utility functions will go here

export function exportUserData() {
  const data = {
    masteryProgress: get(masteryProgress),
    gamificationProgress: get(gamificationProgress),
    language: get(language),
  theme: get(theme),
  selectedInterests: get(selectedInterests)
  };

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'kanjigo_progress.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importUserData(jsonData) {
  try {
    const parsedData = JSON.parse(jsonData);

    if (parsedData.masteryProgress) {
      masteryProgress.set(parsedData.masteryProgress);
    }
    if (parsedData.gamificationProgress) {
      gamificationProgress.set(parsedData.gamificationProgress);
    }
    if (parsedData.language) {
      language.set(parsedData.language);
    }
    if (parsedData.theme) {
      theme.set(parsedData.theme);
    }
    if (parsedData.selectedInterests) {
      selectedInterests.set(parsedData.selectedInterests);
    }
    return { success: true };
  } catch (e) {
    console.error("Error importing user data:", e);
    return { success: false, error: e.message };
  }
}

export function clearUserData() {
  masteryProgress.set({ hiragana: [], katakana: [], vocabulary: [], kanji: [] });
  gamificationProgress.set({ 
    currentStreak: 0, 
    longestStreak: 0, 
    lastStudyDate: null, 
    totalPoints: 0,
    totalStudyTime: 0,
    dailyStudyTime: {},
    sessionStartTime: null
  });
  language.set('en'); // Reset to default language
  theme.set('system'); // Reset to default theme
  selectedInterests.set([]);
}

// Time tracking utilities
export function startStudySession() {
  gamificationProgress.update(progress => ({
    ...progress,
    sessionStartTime: Date.now()
  }));
}

export function endStudySession() {
  gamificationProgress.update(progress => {
    if (!progress.sessionStartTime) return progress;
    
    const sessionDuration = Math.floor((Date.now() - progress.sessionStartTime) / (1000 * 60)); // Minutes
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    return {
      ...progress,
      totalStudyTime: (progress.totalStudyTime || 0) + sessionDuration,
      dailyStudyTime: {
        ...progress.dailyStudyTime,
        [today]: (progress.dailyStudyTime?.[today] || 0) + sessionDuration
      },
      sessionStartTime: null
    };
  });
}

export function getAverageDailyStudyTime() {
  const progress = get(gamificationProgress);
  const dailyTimes = Object.values(progress.dailyStudyTime || {});
  
  if (dailyTimes.length === 0) return 0;
  
  const total = dailyTimes.reduce((sum, time) => sum + time, 0);
  return Math.round(total / dailyTimes.length);
}

export function formatStudyTime(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

// Accessibility utilities
export function focusElement(selector, delay = 0) {
  setTimeout(() => {
    const element = document.querySelector(selector);
    if (element) {
      element.focus();
    }
  }, delay);
}

export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      element.dispatchEvent(new CustomEvent('escape'));
    }
  }

  element.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}