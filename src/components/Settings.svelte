<script>
  import { t } from '../lib/i18n';
  import ThemeSwitcher from './ThemeSwitcher.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import { exportUserData, importUserData, clearUserData } from '../lib/utils';
  import { furiganaVisibility, selectedInterests } from '../lib/stores';
  import { get } from 'svelte/store';

  let fileInput;
  let showImportConfirmation = false;
  let fileToImport = null;

  function handleExportData() {
    exportUserData();
    alert(get(t)('download_started')); // Simple toast message
  }

  function handleImportData(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          fileToImport = e.target.result;
          showImportConfirmation = true;
        } catch (error) {
          alert(get(t)('invalid_json_file') + ': ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  }

  function confirmImport() {
    if (fileToImport) {
      const result = importUserData(fileToImport);
      if (result.success) {
        alert(get(t)('import_success'));
      } else {
        alert(get(t)('import_error') + ': ' + result.error);
      }
      fileToImport = null;
      showImportConfirmation = false;
      fileInput.value = ''; // Clear the file input
    }
  }

  function cancelImport() {
    fileToImport = null;
    showImportConfirmation = false;
    fileInput.value = ''; // Clear the file input
  }

  function handleClearData() {
    if (confirm(get(t)('confirm_clear_data'))) {
      clearUserData();
      alert(get(t)('data_cleared'));
    }
  }

  const interestOptions = [
    { key: 'one_piece', labelKey: 'topic_one_piece' },
    { key: 'dragon_quest', labelKey: 'topic_dragon_quest' },
    { key: 'zelda', labelKey: 'topic_zelda' }
  ];

  function toggleInterest(key) {
    selectedInterests.update(list => {
      const set = new Set(list || []);
      if (set.has(key)) set.delete(key); else set.add(key);
      return Array.from(set);
    });
  }
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

  <section class="setting-section">
    <h3>{$t('display_settings')}</h3>
    <div class="setting-item">
      <label for="furigana-toggle">{$t('show_furigana')}</label>
      <input type="checkbox" id="furigana-toggle" bind:checked={$furiganaVisibility} />
    </div>
  </section>

  <section class="setting-section" aria-labelledby="interests-heading">
    <h3 id="interests-heading">{$t('interests')}</h3>
    <p>{$t('interests_description')}</p>
    <div class="interests-grid">
      {#each interestOptions as opt}
        <label class="interest-item">
          <input type="checkbox" checked={$selectedInterests.includes(opt.key)} on:change={() => toggleInterest(opt.key)} />
          <span>{$t(opt.labelKey)}</span>
        </label>
      {/each}
    </div>
  </section>

  <section class="setting-section">
    <h3>{$t('data_management')}</h3>
    <button on:click={handleExportData}>{$t('download_progress')}</button>
    <input type="file" accept=".json" on:change={handleImportData} bind:this={fileInput} style="display: none;" />
    <button on:click={() => fileInput.click()}>{$t('upload_progress')}</button>
    {#if showImportConfirmation}
      <p>{$t('confirm_overwrite')}</p>
      <button on:click={confirmImport}>{$t('yes_overwrite')}</button>
      <button on:click={cancelImport}>{$t('cancel')}</button>
    {/if}
    <button on:click={handleClearData}>{$t('clear_all_data')}</button>
  </section>
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

  .interests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
    margin-top: 10px;
  }

  .interest-item {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }
</style>