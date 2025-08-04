# Kanji-Go

A Progressive Web App (PWA) for learning basic Japanese (Hiragana, Katakana, and essential vocabulary).

This project was developed with the assistance of Google Gemini. For more details on the development process, see [GEMINI.md](GEMINI.md).

## Features

### V1 Features

*   **Kana Learning Module:** Interactive charts for Hiragana and Katakana.
*   **Kana Flashcard Quiz:** Test your knowledge with flashcards.
*   **Vocabulary Module:** Learn essential Japanese vocabulary with translations.
*   **Progress Tracking:** Track your mastery of Kana characters.
*   **Multilingual Support:** Available in English and Traditional Chinese.
*   **Offline-First:** Works completely offline after the initial visit.

### V3 Features (In Progress)

*   **Enhanced Navigation:** New top-level navigation for Learn, Explore, and Progress sections with Svelte routing.
*   **Grammar Learning Section:** Structured content for Japanese grammar topics, including particles, verb conjugations, and adjectives.
*   **Cultural Exploration Section:** Articles on Japanese culture and traditions.
*   **Data Management:** Functionality to export and import user progress data (mastery, gamification) and clear all local data.
*   **Markdown Rendering:** Integration of `marked` and `svelte-markdown` for rich content display in learning and cultural sections.

## Technologies Used

*   [Svelte](https://svelte.dev/): A modern JavaScript framework for building user interfaces.
*   [Vite](https://vitejs.dev/): A fast build tool that provides a lightning-fast development experience.

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/kanji-go.git
    cd kanji-go
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173/` (or similar).

## Adding New Kanji

To add new Kanji characters:
1.  Update `src/data/kanji.js` with the new Kanji character, its readings, meaning, and a placeholder for `strokeOrderImg` (e.g., `/assets/kanji/new_kanji_stroke.svg`).
2.  Run the Kanji SVG generation script:
    ```bash
    ./generate_kanji_svgs.sh
    ```
    This script will download the necessary SVG data from KanjiVG and place the stroke order SVG for the new Kanji in `public/assets/kanji/` with the correct filename.

## Deployment

This application is set up for automatic deployment to GitHub Pages using GitHub Actions. Pushing to the `main` branch will trigger a build and deploy to the `gh-pages` branch.

## License

[MIT License](LICENSE) (To be added)
