### **Technical Design Specification: "Kanji-Go" v1.0 (Svelte/Vite)**

**1. Introduction**

This document outlines the technical architecture and design for the "Kanji-Go" Progressive Web App. It is based on the functional and non-functional requirements detailed in `PRD.md v1.1`. The goal is a lightweight, offline-first, client-side-only application built with **Svelte and modern web technologies (Vite)**.

**2. High-Level Architecture**

The application will be a **Svelte-based Single Page Application (SPA)** with no backend.

*   **Build Tool (Vite):** Vite will serve as the development server and build tool, providing fast HMR (Hot Module Replacement) during development and optimizing the application for production.
*   **Structure (Svelte Components):** The UI will be composed of reusable Svelte components (`.svelte` files). The main application entry point will be `src/main.js`, which mounts the root `App.svelte` component.
*   **Presentation (CSS):** Styling will primarily be handled within Svelte components using scoped CSS, ensuring styles are encapsulated. Global styles will be defined in a central CSS file.
*   **Logic (JavaScript/Svelte):** Application logic will reside within Svelte components and dedicated JavaScript/TypeScript modules (e.g., Svelte stores for state management, utility functions).
*   **Offline Capability (PWA):** A `service-worker.js` will cache all application assets (HTML, CSS, JS bundles, JSON data, images) to ensure full offline functionality. A `manifest.json` will describe the PWA for installation on user devices.

**3. File & Directory Structure**

To maintain clarity and separation of concerns, the project will use the following structure:

```
/learn-japanese/
├── public/                 # Static assets served directly
│   ├── index.html          # Main entry point (minimal HTML)
│   ├── manifest.json
│   ├── service-worker.js
│   └── assets/
│       └── icons/
│           ├── icon-192x192.png
│           └── icon-512x512.png
│
├── src/
│   ├── main.js             # Svelte application entry point
│   ├── App.svelte          # Root Svelte component
│   ├── components/         # Reusable UI components
│   │   ├── KanaChart.svelte
│   │   ├── Flashcard.svelte
│   │   └── VocabularyList.svelte
│   │   └── LanguageSwitcher.svelte
│   │   └── ...
│   │
│   ├── lib/                # Utility modules and Svelte stores
│   │   ├── stores.js       # Svelte stores for state management (e.g., progress, language)
│   │   ├── i18n.js         # Internationalization logic and Svelte store
│   │   └── utils.js        # General utility functions
│   │
│   ├── data/               # Application data
│   │   ├── kana.js         # Hiragana and Katakana data
│   │   ├── vocabulary.js   # Vocabulary data
│   │   └── locales/
│   │       ├── en.json     # English UI strings
│   │       ├── zh-TW.json  # Traditional Chinese UI strings
│   │
│   └── styles/
│       └── global.css      # Global CSS styles
│
├── node_modules/           # Installed npm packages
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── svelte.config.js        # Svelte configuration
├── README.md
└── docs/
    ├── PRD.md
    ├── V2_IDEAS.md
    └── TECH_DESIGN.md
```

**4. Data Models & Storage**

*   **Kana Data (`src/data/kana.js`):**
    *   Two arrays, `hiragana` and `katakana`.
    *   Each array will contain objects with a consistent structure:
        ```javascript
        // Example
        { id: 'h_a', type: 'hiragana', kana: 'あ', romaji: 'a' }
        ```

*   **Vocabulary Data (`src/data/vocabulary.js`):**
    *   A single array named `vocabulary`.
    *   Each object will contain the word and all its translations:
        ```javascript
        // Example
        { id: 'v_konnichiwa', kana: 'こんにちは', romaji: 'konnichiwa', en: 'Hello', 'zh-TW': '你好' }
        ```

*   **Localization Data (`public/locales/*.json`):**
    *   Simple key-value JSON files. Keys will be consistent across files.
    *   `en.json`: `{ "main_title": "Kanji-Go", "flip_card": "Flip Card" }`
    *   `zh-TW.json`: `{ "main_title": "漢字Go", "flip_card": "翻卡" }`

*   **Local Storage (`src/lib/stores.js`):**
    *   Svelte stores will be used to manage application state, with persistence to `localStorage`.
    *   A `writable` store (e.g., `progressStore`, `languageStore`) will automatically synchronize with `localStorage` on changes.
    *   The structure in `localStorage` will remain similar:
        ```json
        {
          "language": "en", // or "zh-TW"
          "mastery": {
            "hiragana": ["h_a", "h_i", "h_u"], // Array of mastered item IDs
            "katakana": ["k_a"],
            "vocabulary": ["v_konnichiwa"]
          }
        }
        ```

**5. Svelte Components & Logic**

*   **`src/main.js`:**
    *   Initializes the Svelte application by importing and mounting the `App.svelte` component to the `index.html` body.

*   **`src/App.svelte`:**
    *   The root component, responsible for overall layout, routing (if implemented, or conditional rendering of main views), and integrating global stores.

*   **`src/components/`:**
    *   Houses individual, reusable Svelte components (e.g., `KanaChart.svelte`, `Flashcard.svelte`, `VocabularyList.svelte`).
    *   Each component will manage its own local state and props, receiving data from parent components or subscribing to Svelte stores.

*   **`src/lib/stores.js`:**
    *   Defines Svelte `writable` stores for managing global application state (e.g., `language`, `masteryProgress`).
    *   These stores will handle reading from and writing to `localStorage` to persist user data.

*   **`src/lib/i18n.js`:**
    *   Manages the internationalization logic.
    *   Will likely expose a Svelte `readable` store for the current language and a function to change it.
    *   Provides a `t()` function (or similar) for translating strings within components, subscribing to the language store for reactivity.
    *   Loads locale JSON files dynamically.

**6. PWA Implementation**

*   **`public/manifest.json`:**
    *   Will define `name`, `short_name`, `start_url` (`/`), `display` (`standalone`), `background_color`, `theme_color`, and paths to the icons in `public/assets/icons/`.

*   **`public/service-worker.js`:**
    *   On the `install` event, it will cache all critical assets: `index.html`, the bundled JS and CSS files generated by Vite, and all files in `public/assets/` and `public/locales/`. (Note: `src/data/` files are bundled into JS, so they don't need explicit caching here).
    *   On the `fetch` event, it will implement a "cache-first" strategy. It will try to serve the request from the cache first. If the resource is not in the cache, it will fetch it from the network and then cache it for future use.

**7. Development, Build & Deployment Process**

*   **Development:** `npm run dev` (or `yarn dev`) will start the Vite development server with HMR.
*   **Build:** `npm run build` (or `yarn build`) will compile the Svelte application into optimized static assets in a `dist/` directory.
*   **Deployment (GitHub Pages):**
    *   The application will be automatically deployed to GitHub Pages using GitHub Actions.
    *   A workflow file (`.github/workflows/deploy.yml`) will be configured to:
        *   Trigger on pushes to the `main` (or `master`) branch.
        *   Checkout the repository.
        *   Set up Node.js.
        *   Install project dependencies.
        *   Run the `npm run build` command.
        *   Deploy the contents of the `dist` directory to the `gh-pages` branch using `peaceiris/actions-gh-pages@v3`.
