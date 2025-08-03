import { writable, get, derived } from 'svelte/store';
import { language } from './stores';

export const translations = writable({});
export const currentLocale = writable('en');
export const translationsLoaded = writable(false); // New store

export async function initI18n() {
  const lang = get(language);
  await loadTranslations(lang);
  currentLocale.set(lang);
  translationsLoaded.set(true); // Set to true after loading
}

export async function loadTranslations(lang) {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Could not load translations for ${lang}`);
    }
    const newTranslations = await response.json();
    translations.set(newTranslations);
  } catch (error) {
    console.error('Error loading translations:', error);
    const response = await fetch(`${import.meta.env.BASE_URL}locales/en.json`);
    const newTranslations = await response.json();
    translations.set(newTranslations);
    language.set('en');
    currentLocale.set('en');
  }
}

// Create a derived store for the t function
export const t = derived(translations, ($translations) => (key) => {
  return $translations[key] || `MISSING_TRANSLATION_${key}`;
});

// Reactively update translations when language store changes
language.subscribe(async (lang) => {
  if (lang && get(currentLocale) !== lang) {
    translationsLoaded.set(false); // Set to false before loading new translations
    await loadTranslations(lang);
    currentLocale.set(lang);
    translationsLoaded.set(true); // Set to true after loading new translations
  }
});