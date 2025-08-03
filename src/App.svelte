<script>
  import { onMount } from 'svelte';
  import { t, translationsLoaded, translations } from './lib/i18n'; // Import translationsLoaded and translations
  import KanaChart from './components/KanaChart.svelte';
  import KanjiChart from './components/KanjiChart.svelte'; // Import KanjiChart
  
  import { hiragana, katakana } from './data/kana';
  import { vocabulary } from './data/vocabulary'; // Import vocabulary data
  import { kanjiData } from './data/kanji'; // Import kanji data
  
  import VocabularyList from './components/VocabularyList.svelte';
  import VocabularyFilter from './components/VocabularyFilter.svelte'; // Import VocabularyFilter
  import KanaQuiz from './components/KanaQuiz.svelte';
  import ProgressDisplay from './components/ProgressDisplay.svelte'; // Import ProgressDisplay
  import Settings from './components/Settings.svelte'; // Import Settings
  import Navigation from './components/Navigation.svelte';
  
  
        import { masteryProgress, gamificationProgress } from './lib/stores';
  import { derived } from 'svelte/store';

  let currentKanaExample = null; // New reactive state for selected Kana example

  let activeView = 'kana_charts'; // Default view
  let selectedVocabularyTheme = 'all'; // New state for vocabulary filter

  

  onMount(() => {

    // Streak tracking logic
    gamificationProgress.update(progress => {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      let newProgress = { ...progress };

      if (newProgress.lastStudyDate) {
        const lastDate = new Date(newProgress.lastStudyDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10)) {
          // Continued streak
          newProgress.currentStreak++;
        } else if (lastDate.toISOString().slice(0, 10) !== today) {
          // Streak broken
          newProgress.currentStreak = 1;
        }
      } else {
        // First study day
        newProgress.currentStreak = 1;
      }

      if (newProgress.currentStreak > newProgress.longestStreak) {
        newProgress.longestStreak = newProgress.currentStreak;
      }
      newProgress.lastStudyDate = today;
      return newProgress;
    });
  });

  function handleNavigation(event) {
    activeView = event.detail;
  }

  function handleKanaSelect(event) {
    const clickedKana = event.detail.kana;
    currentKanaExample = vocabulary.find(word => word.kana.startsWith(clickedKana)) || null;
  }

  function handleVocabularyFilterChange(event) {
    selectedVocabularyTheme = event.detail;
  }

  const allVocabularyThemes = [...new Set(vocabulary.flatMap(word => word.themes || []))];

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

    

    <Navigation on:navigate={handleNavigation} {activeView} />

    {#if activeView === 'kana_charts'}
      <KanaChart kanaData={hiragana} type="hiragana" masteredIds={$masteredHiraganaIds} on:selectKana={handleKanaSelect} selectedExample={currentKanaExample} t={$t} />
      <KanaChart kanaData={katakana} type="katakana" masteredIds={$masteredKatakanaIds} on:selectKana={handleKanaSelect} selectedExample={currentKanaExample} t={$t} />
    {:else if activeView === 'kanji_charts'}
      <KanjiChart />
    {:else if activeView === 'vocabulary_list'}
      <VocabularyFilter themes={allVocabularyThemes} on:filterChange={handleVocabularyFilterChange} translations={$translations} />
      <VocabularyList filterTheme={selectedVocabularyTheme} />
    
    {:else if activeView === 'progress'}
      <ProgressDisplay t={$t} />
    {:else if activeView === 'quiz'}
      <KanaQuiz />
    {:else if activeView === 'settings'}
      <Settings />
    {/if}
  {:else}
    <div>Loading translations...</div>
  {/if}
</main>