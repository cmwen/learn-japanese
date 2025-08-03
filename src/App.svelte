<script>
  import { onMount } from 'svelte';
  import { t, translationsLoaded, translations } from './lib/i18n'; // Import translationsLoaded and translations
  import KanaChart from './components/KanaChart.svelte';
  import { hiragana, katakana } from './data/kana';
  import LanguageSwitcher from './components/LanguageSwitcher.svelte';
  import ThemeSwitcher from './components/ThemeSwitcher.svelte';
  import VocabularyList from './components/VocabularyList.svelte';
  import KanaQuiz from './components/KanaQuiz.svelte';
  import Navigation from './components/Navigation.svelte';
  import { masteryProgress, theme } from './lib/stores';
  import { derived } from 'svelte/store';

  let activeView = 'kana_charts'; // Default view

  let mediaQuery;

  function applyTheme(currentTheme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }

    if (currentTheme === 'system') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      handleSystemThemeChange(mediaQuery);
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      document.body.classList.add(`theme-${currentTheme}`);
    }
  }

  function handleSystemThemeChange(e) {
    if (e.matches) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    }
  }

  onMount(() => {
    theme.subscribe(applyTheme);
  });

  function handleNavigation(event) {
    activeView = event.detail;
  }

  const masteredHiraganaIds = derived(masteryProgress, $masteryProgress => $masteryProgress.hiragana);
  const masteredKatakanaIds = derived(masteryProgress, $masteryProgress => $masteryProgress.katakana);

  // Add console logs for debugging
  $: if ($translationsLoaded) {
    console.log('App.svelte: translationsLoaded is true');
    console.log('App.svelte: translations store value', $translations);
  }
</script>

<main>
  {#if $translationsLoaded}
    <h1>{$t('main_title')}</h1>

    <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 20px;">
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>

    <Navigation on:navigate={handleNavigation} {activeView} />

    {#if activeView === 'kana_charts'}
      <KanaChart kanaData={hiragana} type="hiragana" masteredIds={$masteredHiraganaIds} />
      <KanaChart kanaData={katakana} type="katakana" masteredIds={$masteredKatakanaIds} />
    {:else if activeView === 'vocabulary_list'}
      <VocabularyList />
    {:else if activeView === 'quiz'}
      <KanaQuiz />
    {/if}
  {:else}
    <div>Loading translations...</div>
  {/if}
</main>