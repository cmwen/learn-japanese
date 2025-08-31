# Copilot Instructions for learn-japanese (Kanji-Go)

Purpose: Help AI agents quickly make effective changes to this Svelte + Vite PWA while preserving data, i18n, and routing.

- Tech stack: Svelte 4 + Vite 5 (package.json scripts: `npm run dev|build|preview`). Entry is `src/main.js` mounting `src/App.svelte`. Global styles in `src/styles/global.css`.
- Routing: Minimal client routing via `src/lib/router.js` using history API and the `currentRoute` store. Views are switched in `App.svelte` by checking `activeView` derived from `window.location.pathname` (e.g., `/learn`, `/explore`, `/progress`, `kana_charts`, etc.). Use `navigate('/path')` to change views.
- State/persistence: Use stores from `src/lib/stores.js`. The helper `createPersistentStore(key, startValue)` persists to IndexedDB via `localforage`. Existing persistent stores: `language`, `masteryProgress` (object with arrays: hiragana, katakana, vocabulary, kanji), `theme`, `gamificationProgress`, `notes`, `furiganaVisibility`. When adding a new store, follow this pattern and choose a unique key prefix `kanjiGo_*`.
- i18n: `src/lib/i18n.js` loads JSON from `public/locales/{lang}.json` and exposes stores: `translations`, `currentLocale`, `translationsLoaded`, and derived `t`. Always gate UI on `$translationsLoaded` and query text with `$t('key')`. If a key is missing, the helper shows `MISSING_TRANSLATION_key`. When adding visible strings, add keys to `public/locales/en.json` (and `zh-TW.json` if applicable).
- Data: Static learning data lives in:
  - Kana: `src/data/kana.js`
  - Vocabulary: `src/data/vocabulary.js` (array of items with shape: `{ id, kana, romaji, en, 'zh-TW', themes: [...] }`). UI commonly filters by `themes`.
  - Kanji: `src/data/kanji.js` (array of items with shape: `{ id, kanji, onyomi[], kunyomi[], meaning, examples[], strokeOrderImg }`). `examples` reference vocabulary ids.
- Components: Key screens/components in `src/components/` used by `App.svelte`: `Navigation.svelte`, `Learn.svelte`, `Explore.svelte`, `Progress.svelte`, `KanaChart.svelte`, `KanjiChart.svelte`, `VocabularyList.svelte`, `VocabularyFilter.svelte`, `KanaQuiz.svelte`, `Settings.svelte`, `BottomSheet.svelte`.
- Example wiring: `App.svelte` reacts to selection events from charts and shows a `BottomSheet` with either a vocabulary example or kanji details. For vocabulary, it calls `vocabulary.find(...)` and renders `$t(example.en)` or `$t(example.id)` depending on context.
- Assets: Kanji stroke SVGs are in `public/assets/kanji/`. Add new ones there; filenames referenced in `kanji.js`. A helper script `./generate_kanji_svgs.sh` can fetch SVGs (see README). Service worker at `public/service-worker.js`; registered in `src/main.js`.
- Conventions:
  - Persisted store keys use `kanjiGo_*`. Keep types stable to avoid IndexedDB migration issues. When changing store shapes, merge defaults in `createPersistentStore` is already supported for objects.
  - Keep routes simple (string paths only). Update `Navigation.svelte` and the switch in `App.svelte` when adding a new top-level view.
  - Vocabulary/kanji link via ids; prefer adding new vocabulary ids then referencing them from kanji `examples` to power the details panel.
  - UI strings must use `$t(...)`; don’t hardcode.

Common tasks/examples:
- Add new vocabulary: append to `src/data/vocabulary.js`, add translation keys for the new `id` in `public/locales/*.json`. If tied to themes, include `themes` array. Example item exists throughout the file.
- Add new kanji: update `src/data/kanji.js` with proper `examples` and `strokeOrderImg` path; drop SVG under `public/assets/kanji/`.
- Add a new persisted setting: in `src/lib/stores.js`, create `export const newSetting = createPersistentStore('kanjiGo_newSetting', defaultValue)`, consume with `$newSetting` in components.
- Build/run: use `npm run dev` for local, `npm run build` to generate `dist/`. Preview via `npm run preview`. This is a static SPA suitable for GitHub Pages.

Notes:
- The app is offline-first via service worker; don’t rely on network at runtime except for i18n asset fetches (served from `public/`).
- Avoid renaming public asset paths referenced in data arrays without updating data.
- Be cautious editing `App.svelte` switch logic to keep Back/Forward navigation working via `popstate`.
