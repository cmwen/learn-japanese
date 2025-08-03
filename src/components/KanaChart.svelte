<script>
  import { createEventDispatcher } from 'svelte';

  export let kanaData = [];
  export let type = ''; // 'hiragana' or 'katakana'
  export let masteredIds = []; // Array of mastered Kana IDs
  export let selectedExample = null; // New prop for selected vocabulary example
  export let t; // Receive t function as a prop

  const dispatch = createEventDispatcher();

  function selectKana(kana) {
    dispatch('selectKana', kana);
  }
</script>

<div class="kana-chart">
  <h2>{type === 'hiragana' ? t('hiragana_chart') : t('katakana_chart')}</h2>
  <div class="grid">
    {#each kanaData as kana (kana.id)}
      <div class="kana-item" class:mastered={masteredIds.includes(kana.id)} on:click={() => selectKana(kana)}>
        <span class="kana-char">{kana.kana}</span>
        <span class="romaji">{kana.romaji}</span>
      </div>
    {/each}
  </div>

  {#if selectedExample}
    <div class="vocabulary-example">
      <h3>{t('vocabulary_example')}</h3>
      <p><strong>{t('kana')}:</strong> {selectedExample.kana}</p>
      <p><strong>{t('romaji')}:</strong> {selectedExample.romaji}</p>
      <p><strong>{t('meaning')}:</strong> {t(selectedExample.id)}</p>
    </div>
  {:else}
    <div class="vocabulary-example">
      <p>{t('no_vocabulary_example_selected')}</p>
    </div>
  {/if}
</div>

<style>
  .kana-chart {
    margin-top: 20px;
    border: 1px solid var(--border-color);
    padding: 15px;
    border-radius: 8px;
    background-color: var(--card-background);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 10px;
    margin-top: 15px;
  }
  .kana-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--card-background);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    cursor: pointer; /* Add cursor pointer to indicate clickability */
  }
  .kana-item:hover {
    background-color: var(--hover-background); /* Add hover effect */
  }
  .kana-char {
    font-size: 1.8em;
    font-weight: bold;
    color: var(--text-color);
  }
  .romaji {
    font-size: 0.8em;
    color: #666;
  }
  .kana-item.mastered {
    background-color: #d4edda; /* Light green for mastered items */
    border-color: #28a745;
  }
</style>