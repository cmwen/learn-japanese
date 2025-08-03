import { writable } from 'svelte/store';

// Function to create a writable store that persists to localStorage
function createPersistentStore(key, startValue) {
  const storedValue = localStorage.getItem(key);
  console.log(`createPersistentStore: key=${key}, storedValue=${storedValue}`);
  let initialValue;

  if (typeof startValue !== 'object' || startValue === null) {
    // Handle primitive types (string, number, boolean)
    initialValue = storedValue ? JSON.parse(storedValue) : startValue;
  } else {
    // Handle object types
    initialValue = startValue; // Start with the default structure
    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue);
        console.log(`createPersistentStore: parsedValue=${JSON.stringify(parsedValue)}`);
        // Merge parsedValue into initialValue, ensuring default properties are kept
        for (const prop in initialValue) {
          if (Object.prototype.hasOwnProperty.call(parsedValue, prop)) {
            initialValue[prop] = parsedValue[prop];
          }
        }
      } catch (e) {
        console.error("Error parsing localStorage item for key:", key, e);
        // Fallback to startValue if parsing fails
        initialValue = startValue;
      }
    }
  }
  console.log(`createPersistentStore: initialValue=${JSON.stringify(initialValue)}`);

  const { subscribe, set, update } = writable(initialValue);

  subscribe(value => {
    localStorage.setItem(key, JSON.stringify(value));
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