<script>
  import { t } from '../lib/i18n';
  import { kanjiData } from '../data/kanji';
  import { vocabulary } from '../data/vocabulary';
  import { masteryProgress } from '../lib/stores';
  import { createEventDispatcher } from 'svelte';

  export let masteredIds = [];

  const dispatch = createEventDispatcher();

  function selectKanji(kanji) {
    dispatch('selectKanji', kanji);
    masteryProgress.update(progress => {
      if (!progress.kanji.includes(kanji.id)) {
        progress.kanji.push(kanji.id);
      }
      return progress;
    });
  }
</script>

<div class="kanji-chart">
  <h2>{$t('kanji_chart')}</h2>
  <div class="kanji-grid">
    {#each kanjiData as kanji}
      <div
        class="kanji-item {masteredIds.includes(kanji.id) ? 'mastered' : ''}"
        on:click={() => selectKanji(kanji)}
        on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectKanji(kanji); }}
        role="button"
        tabindex="0"
      >
        <div class="kanji-character">{kanji.kanji}</div>
        <div class="kanji-readings">
          <p>On: {kanji.onyomi.join(', ')}</p>
          <p>Kun: {kanji.kunyomi.join(', ')}</p>
        </div>
        <div class="kanji-meaning">{$t(kanji.meaning)}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .kanji-chart {
    margin-top: 20px;
  }

  .kanji-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--background-color-secondary);
  }

  .kanji-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    background-color: var(--background-color-primary);
  }

  .kanji-item:hover {
    background-color: var(--hover-color);
  }

  .kanji-character {
    font-size: 2em;
    font-weight: bold;
    color: var(--text-color-primary);
  }

  .kanji-readings,
  .kanji-meaning {
    font-size: 0.8em;
    color: var(--text-color-secondary);
    text-align: center;
  }
</style>
