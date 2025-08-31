### **Product Requirements Document: "Kanji-Go" (Working Title) - v1.1**

**1. Introduction & Vision**

*   **Product:** A simple, fast, and accessible Progressive Web App (PWA) for learning fundamental Japanese (Hiragana, Katakana, and basic vocabulary), with support for English and Traditional Chinese interfaces.
*   **Vision:** To provide absolute beginners with a free, offline-first, multilingual tool to master the foundational building blocks of the Japanese language.
*   **Target Audience:**
    *   English and Traditional Chinese-speaking travelers planning a trip to Japan.
    *   Anime/manga fans who want to understand basic terms.
    *   Anyone curious about the Japanese language but not ready to commit to a paid course.

**2. Goals & Objectives**

*   **User Goal:** Learn and memorize Hiragana, Katakana, and ~100 common vocabulary words, using either an English or Traditional Chinese interface for translations and instructions.
*   **Product Goal:** Deliver a complete, self-contained, multilingual learning experience that is installable and works entirely offline.
*   **Business Goal:** Create a popular, open-source project on GitHub that can be used as a portfolio piece and a foundation for future community contributions.

**3. Core Features (V1 Scope)**

*   **Feature 1: Kana Learning Module**
    *   Two separate sections for Hiragana and Katakana.
    *   Display a grid/chart of all characters.
    *   Clicking a character shows its Romaji (e.g., あ -> 'a').

*   **Feature 2: Kana Flashcard Quiz**
    *   A simple flashcard system to test Kana knowledge. UI text will be localized.
    *   Show one Kana character at a time.
    *   User thinks of the answer and "flips" the card to reveal the Romaji.
    *   Buttons for "I knew it" and "I didn't know."
    *   The app should shuffle the deck and prioritize characters the user struggles with.
    *   UI elements like "Flip Card", "I knew it", "I didn't know" must be displayed in the selected language.

*   **Feature 3: Vocabulary Module**
    *   A curated list of ~100 essential vocabulary words for beginners.
    *   A searchable list of words.
    *   Each entry shows the word in Kana, its Romaji, and its **translation in the currently selected language (English or Traditional Chinese)**.
    *   A flashcard quiz mode, similar to the Kana quiz.

*   **Feature 4: Kanji Learning Module**
    *   Display a grid/chart of common Kanji characters.
    *   Clicking a character shows its Onyomi, Kunyomi, meaning, and stroke order (SVG).
    *   Include example vocabulary words for each Kanji.

*   **Feature 5: Progress Tracking**
    *   Use browser `localStorage` to save the user's "mastery" status for each Kana character, Kanji character, and vocabulary word.
    *   A simple visual indicator (e.g., a progress bar, a colored checkmark on the charts) to show progress.

*   **Feature 6: Internationalization (i18n)**
    *   A clear language-switching mechanism (e.g., a dropdown or toggle in the header/menu).
    *   The app should attempt to auto-detect the user's browser language on first visit. Default to English if the browser language is not supported.
    *   User's language preference must be saved in `localStorage`.

**4. Technical & Non-Functional Requirements**

*   **Technology Stack:**
    *   Vanilla HTML5, CSS3, and JavaScript.
    *   All data (Kana, vocab lists) will be stored in local JS objects.
    *   **i18n Implementation:** Language strings will be stored in JSON files (e.g., `en.json`, `zh-TW.json`).
*   **PWA & Offline-First:**
    *   Must include a `service-worker.js` to cache all assets, **including the language JSON files**.
    *   Must include a `manifest.json` to allow users to "Add to Home Screen."
    *   The app must be 100% functional without an internet connection after the first visit.
*   **Performance:**
    *   Load time under 2 seconds on a 3G network.
    *   Responsive design that works seamlessly on mobile, tablet, and desktop.

**5. Out of Scope (Future Versions)**


*   Audio pronunciation.
*   User accounts or cloud synchronization.
*   Gamification (badges, leaderboards).
*   Spaced Repetition System (SRS) algorithms.
*   Support for additional languages beyond English and Traditional Chinese.

---

## V3.1 Add-on: Interest-Based Personalization (One Piece, Dragon Quest, Zelda)

Goal: Increase engagement by letting users choose interests so examples and suggested vocabulary prioritize selected topics.

Scope (initial):
- Topics: `one_piece`, `dragon_quest`, `zelda`.
- Users select any subset in Settings. Default is none selected.
- Impacted surfaces:
    - Example selection for Kana/ Kanji bottom sheet uses vocabulary tagged with selected topics when available; falls back to generic.
    - Vocabulary list gains themes for these topics (filter remains unchanged).

Non-goals (for now):
- No dynamic content from the network; data is static and shipped in `src/data/vocabulary.js`.
- No changes to mastery logic; interests only affect ordering/selection of examples and optional filters.

Success criteria:
- Users can toggle interests in Settings and see examples reflect those interests.
- App remains fully offline and accessible.
