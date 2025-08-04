<script>
  import { t } from '../lib/i18n';
  import { marked } from 'marked';
  import { onMount } from 'svelte';

  export let guide;

  let renderedContent = '';

  onMount(() => {
    if (guide && guide.content) {
      renderedContent = marked(guide.content);
    }
  });

  // Reactively update if the guide prop changes
  $: if (guide && guide.content) {
    renderedContent = marked(guide.content);
  }
</script>

<div class="guide-detail-container">
  {#if guide}
    <h2>{guide.title}</h2>
    <p class="guide-os">{$t('operating_system')}: {guide.os}</p>
    <div class="guide-content">
      {@html renderedContent}
    </div>
  {:else}
    <p>{$t('select_a_guide')}</p>
  {/if}
</div>

<style>
  .guide-detail-container {
    padding: 20px;
    background-color: var(--card-background);
    border-radius: 8px;
    margin-top: 20px;
    text-align: left;
  }

  .guide-detail-container h2 {
    color: var(--text-color-primary);
    margin-bottom: 10px;
  }

  .guide-os {
    font-size: 0.9em;
    color: var(--text-color-secondary);
    margin-bottom: 20px;
  }

  .guide-content {
    color: var(--text-color-secondary);
    line-height: 1.6;
  }

  .guide-content :global(h1), .guide-content :global(h2), .guide-content :global(h3) {
    color: var(--text-color-primary);
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .guide-content :global(p) {
    margin-bottom: 10px;
  }

  .guide-content :global(ul) {
    list-style-type: disc;
    margin-left: 20px;
    margin-bottom: 10px;
  }

  .guide-content :global(li) {
    margin-bottom: 5px;
  }
</style>