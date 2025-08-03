### V3 Implementation Tasks

#### 1. Core Setup & Global Navigation
- [ ] Update `package.json` dependencies if new libraries are required (e.g., for charting, markdown parsing).
- [ ] Implement new top-level navigation components (`Learn`, `Explore`, `Progress`) and integrate them into the main layout.
- [ ] Define and implement Svelte routing for the new sections (`/learn`, `/explore`, `/progress`).
- [ ] Ensure new navigation is fully responsive and accessible across devices.

#### 2. State Management & Portability
- [ ] **Export Data:**
    - [ ] Create a utility function to serialize relevant Svelte store data into a JSON object.
    - [ ] Implement a "Download My Progress (JSON)" button in Settings.
    - [ ] On click, trigger a file download of the generated JSON.
    - [ ] Add a "Download started!" toast message.
- [ ] **Import Data:**
    - [ ] Implement a file input element for "Upload Progress File (JSON)" in Settings.
    - [ ] Implement logic to read the selected file using `FileReader`.
    - [ ] Parse the file content as JSON.
    - [ ] Create a utility function to deserialize JSON data and update Svelte stores.
    - [ ] Implement a "Load Data" button that appears after file selection.
    - [ ] Add a confirmation dialog: "Are you sure you want to overwrite your current progress with this file? This action cannot be undone."
    - [ ] Implement robust error handling for invalid file types or malformed JSON.
- [ ] **Clear State:**
    - [ ] Implement a "Clear All Data" button in Settings.
    - [ ] Add a prominent confirmation dialog for this action.
    - [ ] Implement logic to reset all persistent Svelte stores to their initial default values.

#### 3. Language Mechanics & Grammar Features (Learn Section)
- [ ] **Content Structure:**
    - [ ] Define a data structure (e.g., JSON files) for grammar categories and individual grammar topics.
    - [ ] Create placeholder content for a few grammar categories and topics.
- [ ] **Landing Page (`/learn`):**
    - [ ] Design and implement the card-based layout for grammar categories.
    - [ ] Display category titles and potentially brief descriptions.
    - [ ] Implement progress indicators (e.g., small progress bar or checkmark) for each category, based on completed topics.
- [ ] **Grammar Topic Detail Page:**
    - [ ] Design and implement the article-like layout for individual grammar topics.
    - [ ] Render headings, explanations, and example sentences.
    - [ ] Implement furigana display for Japanese text (consider `<ruby>` tags or custom Svelte component).
    - [ ] Implement a toggle for furigana visibility if desired.
    - [ ] Integrate audio playback for example sentences (if audio files are available).
    - [ ] Design and implement a distinct section for "Nuances/Tips."
    - [ ] **Mini-Quiz:**
        - [ ] Define a simple data structure for static quiz questions (e.g., multiple-choice, fill-in-the-blank).
        - [ ] Implement the UI for displaying questions and collecting answers.
        - [ ] Implement logic for checking answers and providing immediate feedback.

#### 4. Cultural & Contextual Information (Explore Section)
- [ ] **Content Structure:**
    - [ ] Define a data structure for cultural articles (e.g., JSON files with title, content, categories).
    - [ ] Create placeholder content for a few articles across different categories.
- [ ] **Landing Page (`/explore`):**
    - [ ] Implement the "Fact of the Day" banner (rotating content).
    - [ ] Design and implement the grid/list layout for article categories.
    - [ ] Display article lists within each category.
- [ ] **Article View:**
    - [ ] Implement the standard article layout (title, image, body text).
    - [ ] Ensure good readability (font size, line height, contrast).
    - [ ] Integrate any interactive elements (e.g., embedded maps, image galleries) if applicable.
- [ ] **Contextual Pop-ups/Tooltips:**
    - [ ] Identify key vocabulary/kanji within cultural articles that should trigger tooltips.
    - [ ] Implement a mechanism to wrap these terms with a Svelte component that displays a tooltip on hover/tap.
    - [ ] Ensure tooltips are non-intrusive and provide a "Read More" link to the full article.

#### 5. Input Methods & Tools (within Explore Section)
- [ ] **Content Structure:**
    - [ ] Define a data structure for input method guides (e.g., JSON files with OS/device, steps, troubleshooting).
    - [ ] Create placeholder content for a few guides (e.g., Windows, macOS, iOS).
- [ ] **Guide List:**
    - [ ] Implement a list of guides, clearly labeled by operating system/device.
- [ ] **Guide Detail Page:**
    - [ ] Implement step-by-step instructions with clear language.
    - [ ] Integrate placeholder images/screenshots for visual guidance.
    - [ ] Implement a dedicated troubleshooting section.

#### 6. Learning & Progress Tracking (Progress Section)
- [ ] **Data Storage:**
    - [ ] Design and implement `IndexedDB` schema for storing user progress data (Kana, Kanji, Vocabulary mastery, quiz performance, learning streak, notes).
    - [ ] Create utility functions for reading from and writing to `IndexedDB`.
- [ ] **Dashboard View:**
    - [ ] Implement prominent progress bars for "Kana Mastery," "Kanji Mastery," and "Vocabulary Mastery."
    - [ ] Display the current learning streak (e.g., "🔥 7-Day Streak!").
    - [ ] Implement summary displays for quiz performance (e.g., average score, accuracy, weakest areas).
    - [ ] Display "Total Learning Time" or "Average Daily Study" (requires basic time tracking logic).
    - [ ] Integrate charts/graphs for progress visualization (e.g., using a lightweight charting library or custom SVG).
- [ ] **Personal Notes & Journaling:**
    - [ ] **Note List:**
        - [ ] Implement a scrollable list of notes (title, date, snippet).
        - [ ] Implement search and filter functionality for notes.
    - [ ] **Note Editor:**
        - [ ] Implement a clean, full-screen text editor (e.g., a `<textarea>` or a simple Markdown editor).
        - [ ] Implement basic formatting options (bold, italics, bullet points) if using a custom editor.
        - [ ] Implement logic to save notes to `IndexedDB`.
        - [ ] Implement linking/tagging notes with specific vocabulary/kanji/grammar points.
    - [ ] **Actions:**
        - [ ] Implement "New Note" button.
        - [ ] Implement "Edit" and "Delete" functionality for individual notes.
        - [ ] Implement "Export All Notes" functionality (e.g., as a JSON or plain text file).

#### 7. Cross-Cutting Concerns
- [ ] **Performance Optimization:**
    - [ ] Optimize image assets for web.
    - [ ] Consider lazy loading for content-heavy sections.
    - [ ] Implement efficient rendering for long lists (e.g., virtual scrolling if needed for notes or vocabulary).
- [ ] **Accessibility (A11y):**
    - [ ] Ensure all new UI elements are keyboard navigable.
    - [ ] Add appropriate ARIA attributes for screen reader compatibility.
    - [ ] Maintain sufficient color contrast.
- [ ] **Internationalization (i18n):**
    - [ ] Ensure all new UI text and content strings are added to the i18n system.
    - [ ] Verify proper display of translated content.
- [ ] **Error Handling & User Feedback:**
    - [ ] Implement consistent toast messages or other feedback mechanisms for user actions (e.g., save, delete, import/export success/failure).
    - [ ] Implement robust error boundaries for critical components.
- [ ] **Testing:**
    - [ ] Write unit tests for new Svelte components and utility functions.
    - [ ] Write end-to-end tests (e.g., using Playwright) for critical user flows (import/export, navigation, note taking).