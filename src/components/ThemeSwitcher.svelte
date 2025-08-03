<script>
  import { theme } from '../lib/stores';
  import { t } from '../lib/i18n'; // Import t directly

  // Reactive declarations using the imported t store
  $: themeLabel = $t('theme');
  $: systemOption = $t('theme_system');
  $: lightOption = $t('theme_light');
  $: darkOption = $t('theme_dark');
  $: oceanBlueOption = $t('theme_ocean_blue');
  $: forestGreenOption = $t('theme_forest_green');
  $: highContrastOption = $t('theme_high_contrast');

  // Reactive statement to log the translation
  $: console.log('ThemeSwitcher: themeLabel', themeLabel);
</script>

<div class="theme-switcher">
  <label for="theme-select">{themeLabel}:</label>
  <select id="theme-select" bind:value={$theme}>
    <option value="system">{systemOption}</option>
    <option value="light">{lightOption}</option>
    <option value="dark">{darkOption}</option>
    <option value="ocean-blue">{oceanBlueOption}</option>
    <option value="forest-green">{forestGreenOption}</option>
    <option value="high-contrast">{highContrastOption}</option>
  </select>
</div>

<style>
  .theme-switcher {

  }

  label {
    margin-right: 0.5em;
    font-weight: bold;
  }

  select {
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background-color: var(--card-background);
    color: var(--text-color);
  }
</style>