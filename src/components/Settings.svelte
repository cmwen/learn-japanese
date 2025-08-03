<script>
  import { t } from '../lib/i18n';
  import ThemeSwitcher from './ThemeSwitcher.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
</script>

<div class="settings-page">
  <h2>{$t('settings')}</h2>

  <section class="setting-section">
    <h3>{$t('theme_settings')}</h3>
    <ThemeSwitcher />
  </section>

  <section class="setting-section">
    <h3>{$t('language_settings')}</h3>
    <LanguageSwitcher />
  </section>

  <!-- Future settings can be added here -->
</div>

<style>
  .settings-page {
    margin-top: 20px;
    border: 1px solid var(--border-color);
    padding: 15px;
    border-radius: 8px;
    background-color: var(--card-background);
    text-align: center;
  }

  .setting-section {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--background-color);
  }

  h2, h3 {
    color: var(--text-color);
  }
</style>