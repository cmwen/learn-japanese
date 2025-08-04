import { get } from 'svelte/store';
import { masteryProgress, gamificationProgress, language, theme } from './stores';

// Utility functions will go here

export function exportUserData() {
  const data = {
    masteryProgress: get(masteryProgress),
    gamificationProgress: get(gamificationProgress),
    language: get(language),
    theme: get(theme)
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
    return { success: true };
  } catch (e) {
    console.error("Error importing user data:", e);
    return { success: false, error: e.message };
  }
}

export function clearUserData() {
  masteryProgress.set({ hiragana: [], katakana: [], vocabulary: [], kanji: [] });
  gamificationProgress.set({ currentStreak: 0, longestStreak: 0, lastStudyDate: null, totalPoints: 0 });
  language.set('en'); // Reset to default language
  theme.set('system'); // Reset to default theme
}