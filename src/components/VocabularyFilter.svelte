<script>
  import { createEventDispatcher } from 'svelte';
  import { t } from '../lib/i18n';

  const dispatch = createEventDispatcher();

  export let themes = [];
  export let selectedTheme = 'all';

  function handleChange(event) {
    selectedTheme = event.target.value;
    dispatch('filterChange', selectedTheme);
  }
</script>

<div class="vocabulary-filter">
  <label for="theme-select">{$t('filter_by_theme')}:</label>
  <select id="theme-select" on:change={handleChange} bind:value={selectedTheme}>
    <option value="all">{$t('all_themes')}</option>
    {#each themes as theme}
      <option value={theme}>{$t(theme)}</option>
    {/each}
  </select>
</div>

<style>
  .vocabulary-filter {
    margin-bottom: 20px;
    text-align: center;
  }

  label {
    margin-right: 10px;
    font-size: 1.1em;
    color: var(--text-color);
  }

  select {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background-color: var(--input-background);
    color: var(--text-color);
    font-size: 1em;
    cursor: pointer;
  }

  select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
</style>