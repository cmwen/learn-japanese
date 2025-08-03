<script>
  import { language } from '../lib/stores';
  import { t } from '../lib/i18n';

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh-TW', name: '繁體中文' },
  ];

  function handleLanguageChange(event) {
    language.set(event.target.value);
  }
</script>

<div class="language-switcher">
  <label for="language-select">{$t('language')}:</label>
  <select id="language-select" on:change={handleLanguageChange} value={$language}>
    {#each languages as lang}
      <option value={lang.code}>{lang.name}</option>
    {/each}
  </select>
</div>

<style>
  .language-switcher {

  }
  label {
    margin-right: 0.5em;
    font-weight: bold;
  }
  select {
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    font-size: 1em;
    background-color: var(--card-background);
    color: var(--text-color);
  }
</style>
