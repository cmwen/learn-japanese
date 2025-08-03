### **Technical Design Specification: "Kanji-Go" - V2 Features**

**1. Introduction & Goals for V2**

This document details the technical design for the second major iteration of the "Kanji-Go" Progressive Web App. Building upon the existing Svelte/Vite client-side architecture, V2 aims to significantly enhance the core learning experience by introducing interactive elements, expanding content, and integrating foundational gamification and personalization features. The design incorporates feedback from UX specialists to ensure a user-centric and intuitive experience.

**2. Key Features for V2**

The following features are prioritized for V2 implementation, with a focus on feasibility within the current tech stack and alignment with UX principles:

*   **Interactive Kana Chart with Vocabulary Examples:** Enable users to click on Kana characters to view an example vocabulary word that uses that character, displayed in a persistent and non-intrusive manner.
*   **Kanji Learning Module (Basic):** Introduce fundamental Kanji characters with their readings and meanings, accessible via a dedicated section.
*   **Themed Vocabulary Packs:** Allow users to filter vocabulary lists by thematic categories for more focused study.
*   **Basic Gamification & Motivation:** Implement simple tracking for user engagement metrics (e.g., study streaks) and display them in an accessible "Progress" section.
*   **Enhanced User Customization:** Expand theme options and provide a dedicated "Settings" area for personalization.

**3. Technical Design Details**

**3.1. Interactive Kana Chart with Vocabulary Examples**

*   **Objective:** Provide immediate contextual examples of Kana usage directly within the Kana chart view.
*   **Data Source:** `src/data/vocabulary.js`.
*   **Component Interaction & Logic:**
    *   **`src/components/KanaChart.svelte` (Modification):**
        *   Each `div.kana-item` will be made clickable (`cursor: pointer` and a subtle `:hover` effect will be added via CSS).
        *   On click, a custom event (e.g., `on:selectKana`) will be dispatched, carrying the `kana` object (containing `kana.kana` character) as its detail.
        *   A new reactive prop, `selectedExample`, will be added to receive the vocabulary example to display.
        *   A dedicated display area will be added *within* `KanaChart.svelte` (e.g., below the grid) to show the `selectedExample`. This ensures the display is persistent and contextual to the chart.
    *   **`src/App.svelte` (Modification):**
        *   Will import the `vocabulary` array from `src/data/vocabulary.js`.
        *   A new Svelte reactive state variable, `currentKanaExample`, will be introduced to hold the vocabulary object for the currently selected Kana.
        *   An event handler function (`handleKanaSelect`) will listen for the `selectKana` event from both `KanaChart` instances.
        *   `handleKanaSelect` will:
            1.  Receive the clicked Kana character (`event.detail`).
            2.  Search the `vocabulary` array for the *first* entry whose `kana` property contains the clicked Kana character using `vocabulary.find(word => word.kana.includes(clickedKana.kana))`.
            3.  Update `currentKanaExample` with the found vocabulary object. If no example is found, `currentKanaExample` will be set to `null` or a specific "no example" object.
        *   `currentKanaExample` will be passed as the `selectedExample` prop to both `KanaChart` instances.
*   **UI/UX Considerations:**
    *   The example display area within `KanaChart.svelte` will clearly show the vocabulary word in Kana, Romaji, and its translation (using the `t()` function for i18n).
    *   A user-friendly message (e.g., "No vocabulary example found for this character yet.") will be displayed if `currentKanaExample` is null.

**3.2. Kanji Learning Module (Basic)**

*   **Objective:** Introduce foundational Kanji characters with their readings and meanings.
*   **Data Model (`src/data/kanji.js` - New File):**
    ```javascript
    // Example structure for src/data/kanji.js
    export const kanjiData = [
      { id: 'k_one', kanji: '一', onyomi: ['ichi'], kunyomi: ['hito(tsu)'], meaning: 'One', examples: ['v_one'], strokeOrderImg: '/assets/kanji/ichi_stroke.svg' },
      // ... more Kanji entries
    ];
    ```
    *   `id`: Unique identifier.
    *   `kanji`: The Kanji character.
    *   `onyomi`: Array of On'yomi readings.
    *   `kunyomi`: Array of Kun'yomi readings.
    *   `meaning`: English meaning.
    *   `examples`: Array of `vocabulary.id`s that use this Kanji (linking to existing vocabulary).
    *   `strokeOrderImg`: Path to an embedded static SVG/PNG image for stroke order.
*   **Component (`src/components/KanjiChart.svelte` - New Component):**
    *   Will feature a grid layout similar to `KanaChart.svelte`.
    *   Each Kanji item will display the character, its primary readings, and meaning.
    *   Clicking a Kanji item could expand to show more details, including the `strokeOrderImg` and linked vocabulary examples (similar interaction pattern to KanaChart).
*   **Navigation (`src/App.svelte` & `src/components/Navigation.svelte` - Modification):**
    *   A new main navigation tab, "Kanji," will be added to `Navigation.svelte`.
    *   `App.svelte` will manage a new `activeView` state for `'kanji_charts'` to conditionally render `KanjiChart.svelte`.
*   **UI/UX Considerations:**
    *   Stroke order images will be embedded within the application's assets to ensure offline availability.

**3.3. Themed Vocabulary Packs**

*   **Objective:** Allow users to focus on specific vocabulary categories.
*   **Data Model (`src/data/vocabulary.js` - Modification):**
    *   Add a `themes: string[]` property to each vocabulary object:
        ```javascript
        { id: 'v_konnichiwa', kana: 'こんにちは', romaji: 'konnichiwa', en: 'Hello', 'zh-TW': '你好', themes: ['greetings', 'daily_life'] },
        ```
*   **Component (`src/components/VocabularyFilter.svelte` - New Component):**
    *   This component will house the filter UI (e.g., a dropdown or a set of buttons).
    *   It will emit an event (e.g., `on:filterChange`) with the selected theme(s).
    *   It will include an "All" or "Clear Filters" option.
*   **Component (`src/components/VocabularyList.svelte` - Modification):**
    *   Will receive the selected filter criteria as a prop.
    *   It will apply the filtering logic to its internal vocabulary data before rendering the list.
*   **UI/UX Considerations:**
    *   The `VocabularyFilter.svelte` component will be placed prominently above the vocabulary list in `App.svelte` or directly within `VocabularyList.svelte`.
    *   The selected theme(s) will be clearly indicated to the user.

**3.4. Basic Gamification & Motivation**

*   **Objective:** Encourage consistent engagement through simple tracking.
*   **Data Model (`src/lib/stores.js` - Modification):**
    *   A new Svelte `writable` store, `gamificationProgress`, will be created and persisted to `localStorage`.
    *   Structure:
        ```javascript
        // Example gamificationProgress store structure
        {
          currentStreak: 0,
          longestStreak: 0,
          lastStudyDate: null, // ISO string 'YYYY-MM-DD'
          totalPoints: 0,
          // ... potentially other simple metrics
        }
        ```
*   **Logic:**
    *   **Streak Tracking:** On app load (e.g., in `App.svelte` `onMount`), check `lastStudyDate`. If it's the day after the `lastStudyDate`, increment `currentStreak`. If it's more than one day after, reset `currentStreak` to 1. Update `longestStreak` if `currentStreak` surpasses it. Update `lastStudyDate` to the current date.
    *   **Points:** Quizzes (`KanaQuiz.svelte`) will be modified to award points for correct answers, updating `totalPoints` in the `gamificationProgress` store.
*   **Component (`src/components/ProgressDisplay.svelte` - New Component):**
    *   This component will display `currentStreak`, `longestStreak`, and `totalPoints`.
*   **Navigation (`src/App.svelte` & `src/components/Navigation.svelte` - Modification):
    *   A new main navigation tab, "Progress," will be added to `Navigation.svelte`.
    *   `App.svelte` will manage a new `activeView` state for `'progress'` to conditionally render `ProgressDisplay.svelte`.
*   **UI/UX Considerations:**
    *   A small, persistent streak counter could be displayed in the header (e.g., within `Navigation.svelte` or `App.svelte`) for constant motivation without cluttering the main views.
    *   The "Progress" section will provide a more detailed overview of achievements.

**3.5. Enhanced User Customization**

*   **Objective:** Provide more visual personalization options.
*   **Styling (`src/styles/global.css` - Modification):
    *   Additional CSS variables will be defined to support new color palettes (e.g., `--theme-blue-primary`, `--theme-blue-background`).
*   **Component (`src/components/ThemeSwitcher.svelte` - Modification):**
    *   The component will be updated to offer more theme options (e.g., "Ocean Blue," "Forest Green," "High Contrast") that correspond to different sets of CSS variables.
*   **Component (`src/components/Settings.svelte` - New Component):**
    *   This component will serve as a central hub for user preferences, including theme selection, and potentially future options like font choices.
*   **Navigation (`src/App.svelte` & `src/components/Navigation.svelte` - Modification):**
    *   A new icon (e.g., a gear icon) will be added to the header/navigation to access the `Settings.svelte` component.
    *   `App.svelte` will manage a new `activeView` state for `'settings'` to conditionally render `Settings.svelte`.
*   **UI/UX Considerations:**
    *   All new themes will be designed with accessibility (e.g., sufficient contrast ratios) in mind.
    *   The settings icon will be intuitive and easily discoverable.

**4. Updated Data Models (Summary of Changes)**

*   **`src/data/vocabulary.js`:**
    *   Add `themes: string[]` property to each vocabulary object.
*   **`src/data/kanji.js` (New File):**
    ```javascript
    // Example structure
    { id: string, kanji: string, onyomi: string[], kunyomi: string[], meaning: string, examples: string[], strokeOrderImg: string }
    ```
*   **`src/lib/stores.js`:**
    *   Add new `gamificationProgress` Svelte store for streaks, points, and last study date.

**5. Component Breakdown (New/Modified)**

*   **Modified Components:**
    *   `src/App.svelte`: Manage new views, handle `selectKana` event, pass example data, manage gamification logic.
    *   `src/components/KanaChart.svelte`: Add click handler, dispatch event, display selected example.
    *   `src/components/VocabularyList.svelte`: Implement filtering logic.
    *   `src/components/ThemeSwitcher.svelte`: Expand theme options.
    *   `src/components/Navigation.svelte`: Add new navigation tabs/icons for Kanji, Progress, and Settings.
    *   `src/components/KanaQuiz.svelte`: Update to award points.
*   **New Components:**
    *   `src/components/KanjiChart.svelte`: Displays Kanji characters.
    *   `src/components/VocabularyFilter.svelte`: UI for selecting vocabulary themes.
    *   `src/components/ProgressDisplay.svelte`: Displays gamification metrics.
    *   `src/components/Settings.svelte`: Central hub for user preferences.

**6. Open Questions & Future Considerations**

*   **Data Volume for Kanji:** While basic, the number of Kanji and associated stroke order images could grow. Monitor performance and consider more advanced asset loading or data storage (e.g., IndexedDB) if needed in future iterations.
*   **Vocabulary Example Selection:** The current logic for `KanaChart` selects the *first* matching vocabulary word. Consider refining this to select a "best" example (e.g., shortest, most common) if multiple matches exist.
*   **Accessibility of New Features:** Ensure all new UI elements and interactions meet accessibility standards (e.g., keyboard navigation, screen reader compatibility).
*   **Error Handling:** Implement robust error handling for data loading and unexpected states in all new features.