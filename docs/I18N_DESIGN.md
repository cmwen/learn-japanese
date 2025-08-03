# Internationalization (i18n) System Design

This document explains the design and implementation of the internationalization (i18n) system in this project.

### High-Level Overview

The i18n system is custom-built using Svelte's core features, primarily its reactive **stores**. It's designed to be simple and efficient.

1.  **Language Data:** Translations are stored in simple JSON files located in `public/locales/`.
2.  **State Management:** A Svelte writable store (`locale`) tracks the current language. This choice is saved to the browser's `localStorage` to persist between visits.
3.  **Translation Loading:** A core `i18n.js` file dynamically loads the correct JSON file when the language changes.
4.  **Reactive Translations:** A derived Svelte store (`t`) provides a translation function that automatically updates whenever the language changes, causing the UI to re-render with the new text.

---

### Detailed Breakdown

Here are the key files and how they work together:

#### 1. State Management: `src/lib/stores.js`

This file is the heart of the language state. It defines a writable store called `language`.

*   **`createPersistentStore`:** This is a custom factory function that creates a Svelte store whose value is automatically saved to `localStorage`.
*   **`language`:** This exported store holds the current language code (e.g., `'en'` or `'zh-TW'`). It defaults to `'en'` if no value is found in `localStorage`.

#### 2. Translation Logic: `src/lib/i18n.js`

This file orchestrates the entire translation process.

*   **`initI18n()`:** This function is called when the application starts. It gets the current language from the `language` store and calls `loadTranslations()` to fetch the appropriate JSON file.
*   **`loadTranslations(lang)`:** This function fetches the translation file (e.g., `/locales/en.json`) from the `public` directory. It then updates the `translations` store with the new data.
*   **`t` (Derived Store):** This is the most important part for the UI. It's a **derived store** that depends on `translations`. It returns a function that takes a key (e.g., `"main_title"`) and returns the translated string. Because it's a derived store, any component that uses `t` will **automatically re-render** when the `translations` store changes.
*   **`language.subscribe()`:** This code listens for changes to the `language` store. When the user selects a new language, this function is called, which in turn calls `loadTranslations()` to load the new language file, updating the `translations` store and triggering a UI update.

#### 3. UI Integration: Svelte Components

In any Svelte component, you can import the `t` store and use it to display translated text.

**Example:**

```svelte
<script>
  import { t } from './lib/i18n.js';
</script>

<h1>{$t('main_title')}</h1>
```

*   **`$t`:** The `$` prefix is Svelte's syntax for automatically subscribing to a store's value. So, `$t('main_title')` calls the translation function and gets the value for the key `"main_title"` from the currently loaded language file.

### Summary of the Flow

1.  **App Starts:** `initI18n()` is called.
2.  **Language Determined:** The `language` store provides the current language (from `localStorage` or the default).
3.  **Translations Fetched:** `loadTranslations()` fetches the correct JSON file.
4.  **UI Renders:** Components use the `$t` function to display translated text.
5.  **User Changes Language:** The `language` store is updated (e.g., by a language switcher component).
6.  **New Translations Loaded:** The `language.subscribe()` callback fires, loading the new language file.
7.  **UI Automatically Updates:** The `translations` store is updated, which causes the `t` derived store to update, and all components using `$t` re-render with the new translations.

This setup is a clean and idiomatic Svelte way to handle i18n, leveraging its powerful and simple reactivity model.
