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
  import BottomSheet from './components/BottomSheet.svelte';
  
  
        import { masteryProgress, gamificationProgress } from './lib/stores';
  import { derived } from 'svelte/store';

  let currentKanaExample = null; // New reactive state for selected Kana example
  let selectedKanjiExample = null; // New reactive state for selected Kanji example

  let activeView = 'kana_charts'; // Default view
  let selectedVocabularyTheme = 'all'; // New state for vocabulary filter

  let showBottomSheet = false;
  let bottomSheetTitle = '';
  let bottomSheetContent = null;

  

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
    const clickedKana = event.detail;
    currentKanaExample = vocabulary.find(word => word.kana.startsWith(clickedKana.kana)) || null;
    bottomSheetTitle = $t('vocabulary_example');
    bottomSheetContent = {
      type: 'kana',
      data: currentKanaExample
    };
    showBottomSheet = true;
  }

  function handleKanjiSelect(event) {
    const selectedKanji = event.detail;
    selectedKanjiExample = selectedKanji;
    bottomSheetTitle = selectedKanji.kanji;
    bottomSheetContent = {
      type: 'kanji',
      data: selectedKanjiExample
    };
    showBottomSheet = true;
  }

  function closeBottomSheet() {
    showBottomSheet = false;
    bottomSheetContent = null;
    currentKanaExample = null;
    selectedKanjiExample = null;
  }

  function handleVocabularyFilterChange(event) {
    selectedVocabularyTheme = event.detail;
  }

  const allVocabularyThemes = [...new Set(vocabulary.flatMap(word => word.themes || []))];

  const masteredHiraganaIds = derived(masteryProgress, $masteryProgress => $masteryProgress.hiragana);
  const masteredKatakanaIds = derived(masteryProgress, $masteryProgress => $masteryProgress.katakana);
  const masteredKanjiIds = derived(masteryProgress, $masteryProgress => $masteryProgress.kanji);

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
      <KanaChart kanaData={hiragana} type="hiragana" masteredIds={$masteredHiraganaIds} on:selectKana={handleKanaSelect} t={$t} />
      <KanaChart kanaData={katakana} type="katakana" masteredIds={$masteredKatakanaIds} on:selectKana={handleKanaSelect} t={$t} />
    {:else if activeView === 'kanji_charts'}
      <KanjiChart masteredIds={$masteredKanjiIds} on:selectKanji={handleKanjiSelect} />
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

<BottomSheet bind:show={showBottomSheet} title={bottomSheetTitle} on:close={closeBottomSheet}>
    {#if bottomSheetContent && bottomSheetContent.type === 'kana'}
      {#if bottomSheetContent.data}
        <div class="vocabulary-example-content">
          <p><strong>{$t('kana')}:</strong> {bottomSheetContent.data.kana}</p>
          <p><strong>{$t('romaji')}:</strong> {bottomSheetContent.data.romaji}</p>
          <p><strong>{$t('meaning')}:</strong> {$t(bottomSheetContent.data.id)}</p>
        </div>
      {:else}
        <p>{$t('no_vocabulary_example_selected')}</p>
      {/if}
    {:else if bottomSheetContent && bottomSheetContent.type === 'kanji'}
      {#if bottomSheetContent.data}
        <h3>{$t('selected_kanji')}: {bottomSheetContent.data.kanji}</h3>
        <p><strong>{$t('meaning')}:</strong> {$t(bottomSheetContent.data.meaning)}</p>
        <p><strong>{$t('onyomi')}:</strong> {bottomSheetContent.data.onyomi.join(', ')}</p>
        <p><strong>{$t('kunyomi')}:</strong> {bottomSheetContent.data.kunyomi.join(', ')}</p>
        {#if bottomSheetContent.data.strokeOrderImg}
          <img src={bottomSheetContent.data.strokeOrderImg} alt="{$t('stroke_order')} {bottomSheetContent.data.kanji}" />
        {/if}
        {#if bottomSheetContent.data.examples && bottomSheetContent.data.examples.length > 0}
          <h4>{$t('examples')}:</h4>
          <ul>
            {#each bottomSheetContent.data.examples as exampleId}
              {@const example = vocabulary.find(v => v.id === exampleId)}
              {#if example}
                <li>{example.kana} ({example.romaji}) - {$t(example.en)}</li>
              {/if}
            {/each}
          </ul>
        {/if}
      {/if}
    {/if}
  </BottomSheet>