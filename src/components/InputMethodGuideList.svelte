<script>
  import { t } from '../lib/i18n';
  export let guides = [];
  export let onSelectGuide;
</script>

<div class="guide-list-container">
  {#if guides.length > 0}
    <ul class="guide-list">
      {#each guides as guide (guide.id)}
        <li class="guide-item">
          <button 
            type="button" 
            class="guide-button" 
            on:click={() => onSelectGuide(guide)}
            aria-label="View guide for {guide.title}"
          >
            <h4>{guide.title}</h4>
            <p>{guide.description}</p>
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>{$t('no_guides_available')}</p>
  {/if}
</div>

<style>
  .guide-list-container {
    margin-top: 20px;
  }

  .guide-list {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }

  .guide-item {
    border-radius: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .guide-button {
    width: 100%;
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-align: left;
    color: inherit;
    font: inherit;
  }

  .guide-button:hover, .guide-button:focus {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .guide-button h4 {
    margin-top: 0;
    color: var(--text-color-primary);
  }

  .guide-button p {
    font-size: 0.9em;
    color: var(--text-color-secondary);
  }
</style>