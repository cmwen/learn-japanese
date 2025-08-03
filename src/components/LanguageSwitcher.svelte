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
    margin: 20px 0;
    text-align: center;
  }
  label {
    margin-right: 10px;
    font-weight: bold;
  }
  select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1em;
  }
</style>
