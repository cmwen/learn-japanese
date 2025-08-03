import { writable } from 'svelte/store';

// Function to create a writable store that persists to localStorage
function createPersistentStore(key, startValue) {
  const storedValue = localStorage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : startValue;

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
  vocabulary: []
});
