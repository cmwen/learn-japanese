<script>
  import { t } from '../lib/i18n';
  import { kanjiData } from '../data/kanji';

  // This component will display a grid of Kanji characters.
  // For now, we'll just display the kanji character, onyomi, kunyomi, and meaning.

  let selectedKanji = null;

  function selectKanji(kanji) {
    selectedKanji = kanji;
  }
</script>

<div class="kanji-chart">
  <h2>{$t('kanji_chart')}</h2>
  <div class="kanji-grid">
    {#each kanjiData as kanji}
      <div class="kanji-item" on:click={() => selectKanji(kanji)}>
        <div class="kanji-character">{kanji.kanji}</div>
        <div class="kanji-readings">
          <p>On: {kanji.onyomi.join(', ')}</p>
          <p>Kun: {kanji.kunyomi.join(', ')}</p>
        </div>
        <div class="kanji-meaning">{$t(kanji.meaning)}</div>
      </div>
    {/each}
  </div>

  {#if selectedKanji}
    <div class="selected-kanji-details">
      <h3>{$t('selected_kanji')}: {selectedKanji.kanji}</h3>
      <p><strong>{$t('meaning')}:</strong> {$t(selectedKanji.meaning)}</p>
      <p><strong>{$t('onyomi')}:</strong> {selectedKanji.onyomi.join(', ')}</p>
      <p><strong>{$t('kunyomi')}:</strong> {selectedKanji.kunyomi.join(', ')}</p>
      {#if selectedKanji.strokeOrderImg}
        <img src={selectedKanji.strokeOrderImg} alt="{$t('stroke_order')} {selectedKanji.kanji}" />
      {/if}
      <!-- Add linked vocabulary examples here later -->
    </div>
  {/if}
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

  .selected-kanji-details {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--background-color-secondary);
  }

  .selected-kanji-details h3 {
    margin-top: 0;
    color: var(--text-color-primary);
  }

  .selected-kanji-details p {
    margin-bottom: 5px;
    color: var(--text-color-secondary);
  }

  .selected-kanji-details img {
    max-width: 100px;
    height: auto;
    margin-top: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }
</style>
