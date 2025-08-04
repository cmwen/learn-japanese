import { writable } from 'svelte/store';
import localforage from 'localforage';

// Function to create a writable store that persists to IndexedDB using localforage
function createPersistentStore(key, startValue) {
  const { subscribe, set, update } = writable(startValue);

  localforage.getItem(key).then(storedValue => {
    if (storedValue !== null && storedValue !== undefined) {
      if (Array.isArray(startValue)) {
        // If startValue is an array, ensure storedValue is also an array. Otherwise, use startValue.
        set(Array.isArray(storedValue) ? storedValue : startValue);
      } else if (typeof startValue === 'object' && startValue !== null && typeof storedValue === 'object' && storedValue !== null) {
        // Merge stored object with default, ensuring new properties are added
        set({ ...startValue, ...storedValue });
      } else {
        set(storedValue);
      }
    } else {
      // If no stored value, initialize with startValue
      set(startValue);
    }
  }).catch(err => {
    console.error(`Error reading from IndexedDB for key ${key}:`, err);
  });

  subscribe(value => {
    localforage.setItem(key, value).catch(err => {
      console.error(`Error writing to IndexedDB for key ${key}:`, err);
    });
  });

  return { subscribe, set, update };
}

export const language = createPersistentStore('kanjiGo_language', 'en');

export const masteryProgress = createPersistentStore('kanjiGo_masteryProgress', {
  hiragana: [],
  katakana: [],
  vocabulary: [],
  kanji: []
});

export const theme = createPersistentStore('kanjiGo_theme', 'system');

export const gamificationProgress = createPersistentStore('kanjiGo_gamificationProgress', {
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: null, // ISO string 'YYYY-MM-DD'
  totalPoints: 0,
});

export const notes = createPersistentStore('kanjiGo_notes', []); // New store for notes

export const furiganaVisibility = createPersistentStore('kanjiGo_furiganaVisibility', true);