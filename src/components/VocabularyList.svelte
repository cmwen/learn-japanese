<script>
  import { vocabulary } from '../data/vocabulary';
  import { t } from '../lib/i18n';
  import { language } from '../lib/stores';
  import { get } from 'svelte/store';

  let currentLanguage = get(language);
  language.subscribe(value => currentLanguage = value);

  function getTranslation(word) {
    return word[currentLanguage] || word.en; // Fallback to English
  }
</script>

<div class="vocabulary-list">
  <h2>{$t('vocabulary_list')}</h2>
  <div class="grid">
    {#each vocabulary as word (word.id)}
      <div class="vocab-item">
        <span class="kana-char">{word.kana}</span>
        <span class="romaji">{word.romaji}</span>
        <span class="translation">{getTranslation(word)}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .vocabulary-list {
    margin-top: 20px;
    border: 1px solid var(--border-color);
    padding: 15px;
    border-radius: 8px;
    background-color: var(--card-background);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    margin-top: 15px;
  }
  .vocab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--card-background);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  .kana-char {
    font-size: 1.2em;
    font-weight: bold;
    color: var(--text-color);
  }
  .romaji {
    font-size: 0.8em;
    color: #666;
  }
  .translation {
    font-size: 0.9em;
    color: #007bff;
    margin-top: 5px;
  }
</style>
