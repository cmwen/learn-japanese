# V2 Feature Implementation Task List

**1. Interactive Kana Chart with Vocabulary Examples**
    *   [x] **Modify `src/components/KanaChart.svelte`:**
        *   [x] Make `div.kana-item` clickable (`cursor: pointer`, `:hover` effect).
        *   [x] Dispatch `on:selectKana` event with `kana` object as detail on click.
        *   [x] Add a reactive prop `selectedExample` to display vocabulary.
        *   [x] Add a dedicated display area within `KanaChart.svelte` for `selectedExample`.
        *   [x] Implement UI to show vocabulary word (Kana, Romaji, translation) and "No example found" message.
    *   [x] **Modify `src/App.svelte`:**
        *   [x] Import `vocabulary` array from `src/data/vocabulary.js`.
        *   [x] Introduce `currentKanaExample` Svelte reactive state variable.
        *   [x] Create `handleKanaSelect` function to listen for `selectKana` event.
        *   [x] In `handleKanaSelect`, search `vocabulary` for the first entry containing the clicked Kana character.
        *   [x] Update `currentKanaExample` with the found object or `null`.
        *   [x] Pass `currentKanaExample` as `selectedExample` prop to `KanaChart` instances.

**2. Kanji Learning Module (Basic)**
    *   [x] **Create `src/data/kanji.js`:**
        *   [x] Define `kanjiData` array with `id`, `kanji`, `onyomi`, `kunyomi`, `meaning`, `examples`, `strokeOrderImg` properties.
    *   [x] **Create `src/components/KanjiChart.svelte`:**
        *   [x] Implement a grid layout to display Kanji characters.
        *   [x] Display character, primary readings, and meaning for each Kanji item.
        *   [x] (Optional, for future) Implement click-to-expand for details, stroke order image, and linked vocabulary.
    *   [x] **Modify `src/components/Navigation.svelte`:**
        *   [x] Add a new main navigation tab for "Kanji".
    *   [x] **Modify `src/App.svelte`:**
        *   [x] Manage a new `activeView` state for `'kanji_charts'`.
        *   [x] Conditionally render `KanjiChart.svelte` based on `activeView`.

**3. Themed Vocabulary Packs**
    *   [x] **Modify `src/data/vocabulary.js`:**
        *   [x] Add `themes: string[]` property to each vocabulary object.
    *   [x] **Create `src/components/VocabularyFilter.svelte`:**
        *   [x] Implement UI for theme selection (e.g., dropdown, buttons).
        *   [x] Emit `on:filterChange` event with selected theme(s).
        *   [x] Include "All" or "Clear Filters" option.
    *   [x] **Modify `src/components/VocabularyList.svelte`:**
        *   [x] Accept selected filter criteria as a prop.
        *   [x] Apply filtering logic to internal vocabulary data before rendering.
    *   [x] **Integrate `VocabularyFilter.svelte`:**
        *   [x] Place `VocabularyFilter.svelte` prominently in `App.svelte` or directly within `VocabularyList.svelte`.
        *   [x] Ensure selected theme(s) are clearly indicated in the UI.

**4. Basic Gamification & Motivation**
    *   [x] **Modify `src/lib/stores.js`:**
        *   [x] Create a new Svelte `writable` store `gamificationProgress` and persist it to `localStorage`.
        *   [x] Define structure: `currentStreak`, `longestStreak`, `lastStudyDate`, `totalPoints`.
    *   [x] **Implement Logic (e.g., in `src/App.svelte` or a utility):**
        *   [x] On app load, implement streak tracking logic (increment/reset `currentStreak`, update `longestStreak`, update `lastStudyDate`).
    *   [x] **Modify `src/components/KanaQuiz.svelte`:**
        *   [x] Update to award points.
    *   [x] **Create `src/components/ProgressDisplay.svelte`:**
        *   [x] Display `currentStreak`, `longestStreak`, and `totalPoints`.
    *   [x] **Modify `src/components/Navigation.svelte`:**
        *   [x] Add a new main navigation tab for "Progress".
    *   [x] **Modify `src/App.svelte`:**
        *   [x] Manage a new `activeView` state for `'progress'`.
        *   [x] Conditionally render `ProgressDisplay.svelte` based on `activeView`.
        *   [x] (Optional) Display a small, persistent streak counter in the header.

**5. Enhanced User Customization**
    *   [x] **Modify `src/styles/global.css`:**
        *   [x] Define additional CSS variables for new color palettes (e.g., `--theme-blue-primary`).
    *   [x] **Modify `src/components/ThemeSwitcher.svelte`:**
        *   [x] Update to offer more theme options (e.g., "Ocean Blue," "Forest Green," "High Contrast").
    *   [x] **Create `src/components/Settings.svelte`:**
        *   [x] Serve as a central hub for user preferences, including theme selection.
    *   [x] **Modify `src/components/Navigation.svelte`:**
        *   [x] Add a new icon (e.g., gear icon) to access `Settings.svelte`.
    *   [x] **Modify `src/App.svelte`:**
        *   [x] Manage a new `activeView` state for `'settings'`.
        *   [x] Conditionally render `Settings.svelte` based on `activeView`.
        *   [x] Ensure new themes are designed with accessibility in mind.
