<script>
  export let kanaData = [];
  export let type = ''; // 'hiragana' or 'katakana'
  export let masteredIds = []; // Array of mastered Kana IDs
</script>

<div class="kana-chart">
  <h2>{type === 'hiragana' ? 'Hiragana Chart' : 'Katakana Chart'}</h2>
  <div class="grid">
    {#each kanaData as kana (kana.id)}
      <div class="kana-item" class:mastered={masteredIds.includes(kana.id)}>
        <span class="kana-char">{kana.kana}</span>
        <span class="romaji">{kana.romaji}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .kana-chart {
    margin-top: 20px;
    border: 1px solid #eee;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
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
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  .kana-char {
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
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