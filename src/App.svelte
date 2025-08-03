<script>
  import { onMount } from 'svelte';
  import { initI18n, t } from './lib/i18n';
  import KanaChart from './components/KanaChart.svelte';
  import { hiragana, katakana } from './data/kana';
  import LanguageSwitcher from './components/LanguageSwitcher.svelte';
  import VocabularyList from './components/VocabularyList.svelte';
  import KanaQuiz from './components/KanaQuiz.svelte';
  import Navigation from './components/Navigation.svelte';
  import { masteryProgress } from './lib/stores';
  import { derived } from 'svelte/store';

  let activeView = 'kana_charts'; // Default view

  onMount(async () => {
    await initI18n();
  });

  function handleNavigation(event) {
    activeView = event.detail;
  }

  const masteredHiraganaIds = derived(masteryProgress, $masteryProgress => $masteryProgress.hiragana);
  const masteredKatakanaIds = derived(masteryProgress, $masteryProgress => $masteryProgress.katakana);
</script>

<main>
  <h1>{$t('main_title')}</h1>

  <LanguageSwitcher />

  <Navigation on:navigate={handleNavigation} {activeView} />

  {#if activeView === 'kana_charts'}
    <KanaChart kanaData={hiragana} type="hiragana" masteredIds={$masteredHiraganaIds} />
    <KanaChart kanaData={katakana} type="katakana" masteredIds={$masteredKatakanaIds} />
  {:else if activeView === 'vocabulary_list'}
    <VocabularyList />
  {:else if activeView === 'quiz'}
    <KanaQuiz />
  {/if}

</main>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
