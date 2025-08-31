### V3 Implementation Tasks

#### 1. Core Setup & Global Navigation
- [x] Update `package.json` dependencies if new libraries are required (e.g., for charting, markdown parsing).
- [x] Implement new top-level navigation components (`Learn`, `Explore`, `Progress`) and integrate them into the main layout.
- [x] Define and implement Svelte routing for the new sections (`/learn`, `/explore`, `/progress`).
- [ ] Ensure new navigation is fully responsive and accessible across devices.

#### 2. State Management & Portability
- [x] **Export Data:**
    - [x] Create a utility function to serialize relevant Svelte store data into a JSON object.
    - [x] Implement a "Download My Progress (JSON)" button in Settings.
    - [x] On click, trigger a file download of the generated JSON.
    - [x] Add a "Download started!" toast message.
- [x] **Import Data:**
    - [x] Implement a file input element for "Upload Progress File (JSON)" in Settings.
    - [x] Implement logic to read the selected file using `FileReader`.
    - [x] Parse the file content as JSON.
    - [x] Create a utility function to deserialize JSON data and update Svelte stores.
    - [x] Implement a "Load Data" button that appears after file selection.
    - [x] Add a confirmation dialog: "Are you sure you want to overwrite your current progress with this file? This action cannot be undone."
    - [x] Implement robust error handling for invalid file types or malformed JSON.
- [x] **Clear State:**
    - [x] Implement a "Clear All Data" button in Settings.
    - [x] Add a prominent confirmation dialog for this action.
    - [x] Implement logic to reset all persistent Svelte stores to their initial default values.

#### 3. Language Mechanics & Grammar Features (Learn Section)
- [x] **Content Structure:**
    - [x] Define a data structure (e.g., JSON files) for grammar categories and individual grammar topics.
    - [x] Create placeholder content for a few grammar categories and topics.
- [x] **Landing Page (`/learn`):**
    - [x] Design and implement the card-based layout for grammar categories.
    - [x] Display category titles and potentially brief descriptions.
    - [x] Implement progress indicators (e.g., small progress bar or checkmark) for each category, based on completed topics.
- [x] **Grammar Topic Detail Page:**
    - [x] Design and implement the article-like layout for individual grammar topics.
    - [x] Render headings, explanations, and example sentences.
    - [x] Implement furigana display for Japanese text (consider `<ruby>` tags or custom Svelte component).
    - [x] Implement a toggle for furigana visibility if desired.
    - [ ] Integrate audio playback for example sentences (if audio files are available). (Not yet implemented) (Not yet implemented)
    - [x] Design and implement a distinct section for "Nuances/Tips."
    - [x] **Mini-Quiz:**
        - [x] Define a simple data structure for static quiz questions (e.g., multiple-choice, fill-in-the-blank).
        - [x] Implement the UI for displaying questions and collecting answers.
        - [x] Implement logic for checking answers and providing immediate feedback.

#### 4. Cultural & Contextual Information (Explore Section)
- [x] **Content Structure:**
    - [x] Define a data structure for cultural articles (e.g., JSON files with title, content, categories).
    - [x] Create placeholder content for a few articles across different categories.
- [x] **Landing Page (`/explore`):**
    - [x] Implement the "Fact of the Day" banner (rotating content).
    - [x] Design and implement the grid/list layout for article categories.
    - [x] Display article lists within each category.
- [x] **Article View:**
    - [x] Implement the standard article layout (title, image, body text).
    - [x] Ensure good readability (font size, line height, contrast).
    - [ ] Integrate any interactive elements (e.g., embedded maps, image galleries) if applicable.
- [ ] **Contextual Pop-ups/Tooltips:**
    - [ ] Identify key vocabulary/kanji within cultural articles that should trigger tooltips.
    - [x] Implement a mechanism to wrap these terms with a Svelte component that displays a tooltip on hover/tap.
    - [x] Ensure tooltips are non-intrusive and provide a "Read More" link to the full article.

#### 5. Input Methods & Tools (within Explore Section)
- [x] **Content Structure:**
    - [x] Define a data structure for input method guides (e.g., JSON files with OS/device, steps, troubleshooting).
    - [x] Create placeholder content for a few guides (e.g., Windows, macOS, iOS).
- [x] **Guide List:**
    - [x] Implement a list of guides, clearly labeled by operating system/device.
- [x] **Guide Detail Page:**
    - [x] Implement step-by-step instructions with clear language.
    - [x] Integrate placeholder images/screenshots for visual guidance.
    - [x] Implement a dedicated troubleshooting section.

#### 6. Learning & Progress Tracking (Progress Section)
- [x] **Data Storage:**
    - [x] Design and implement `IndexedDB` schema for storing user progress data (Kana, Kanji, Vocabulary mastery, quiz performance, learning streak, notes).
    - [x] Create utility functions for reading from and writing to `IndexedDB`.
- [x] **Dashboard View:**
    - [x] Implement prominent progress bars for "Kana Mastery," "Kanji Mastery," and "Vocabulary Mastery."
    - [x] Display the current learning streak (e.g., "🔥 7-Day Streak!").
    - [x] Implement summary displays for quiz performance (e.g., average score, accuracy, weakest areas).
    - [x] Display "Total Learning Time" or "Average Daily Study" (requires basic time tracking logic).
    - [x] Integrate charts/graphs for progress visualization (e.g., using a lightweight charting library or custom SVG).
- [x] **Personal Notes & Journaling:**
    - [x] **Note List:**
        - [x] Implement a scrollable list of notes (title, date, snippet).
        - [x] Implement search and filter functionality for notes.
    - [x] **Note Editor:**
        - [x] Implement a clean, full-screen text editor (e.g., a `<textarea>` or a simple Markdown editor).
        - [ ] Implement basic formatting options (bold, italics, bullet points) if using a custom editor.
        - [x] Implement logic to save notes to `IndexedDB`.
        - [x] Implement linking/tagging notes with specific vocabulary/kanji/grammar points.
    - [x] **Actions:**
        - [x] Implement "New Note" button.
        - [x] Implement "Edit" and "Delete" functionality for individual notes.
        - [x] Implement "Export All Notes" functionality (e.g., as a JSON or plain text file).

#### 7. Cross-Cutting Concerns
- [x] **Performance Optimization:**
    - [x] Optimize image assets for web.
    - [x] Consider lazy loading for content-heavy sections.
    - [ ] Implement efficient rendering for long lists (e.g., virtual scrolling if needed for notes or vocabulary).
- [x] **Accessibility (A11y):**
    - [x] Ensure all new UI elements are keyboard navigable.
    - [x] Add appropriate ARIA attributes for screen reader compatibility.
    - [x] Maintain sufficient color contrast.
- [x] **Internationalization (i18n):**
    - [x] Ensure all new UI text and content strings are added to the i18n system.
    - [x] Verify proper display of translated content.
- [x] **Error Handling & User Feedback:**
    - [x] Implement consistent toast messages or other feedback mechanisms for user actions (e.g., save, delete, import/export success/failure).
    - [ ] Implement robust error boundaries for critical components.
- [ ] **Testing:**
    - [ ] Write unit tests for new Svelte components and utility functions.
    - [ ] Write end-to-end tests (e.g., using Playwright) for critical user flows (import/export, navigation, note taking).

    ---

    ### 8. V3.1 Interest-Based Personalization
    - [x] Data: Add topic tags to select vocabulary items (`one_piece`, `dragon_quest`, `zelda`).
    - [x] Store: Create `selectedInterests` persistent store and default to `[]`.
    - [x] i18n: Add keys for Interests UI and topic names in `public/locales/en.json` and `zh-TW.json`.
    - [x] Settings: Add Interests section with three checkboxes bound to store.
    - [x] App wiring: Bias Kana example selection by interests; sort Kanji examples by interest relevance.
    - [x] Utils: Include `selectedInterests` in export/import/clear.
    - [x] A11y: Ensure labels, focus order, and key handling in Interests UI.