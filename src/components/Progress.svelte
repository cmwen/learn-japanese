<script>
  import { t } from '../lib/i18n';
  import { masteryProgress, gamificationProgress } from '../lib/stores';
  import { hiragana, katakana } from '../data/kana';
  import { kanjiData } from '../data/kanji';
  import { vocabulary } from '../data/vocabulary';
  import Notes from './Notes.svelte';

  // Calculate mastery percentages
  $: hiraganaMastery = ($masteryProgress.hiragana.length / hiragana.length) * 100;
  $: katakanaMastery = ($masteryProgress.katakana.length / katakana.length) * 100;
  $: kanjiMastery = ($masteryProgress.kanji.length / kanjiData.length) * 100;
  $: vocabularyMastery = ($masteryProgress.vocabulary.length / vocabulary.length) * 100;
</script>

<div class="progress-container">
  <h2>{$t('progress_tracking')}</h2>
  <p>{$t('progress_description')}</p>

  <section class="progress-section">
    <h3>{$t('your_mastery')}</h3>
    <div class="progress-item">
      <p>{$t('hiragana_mastery')}: {hiraganaMastery.toFixed(1)}%</p>
      <div class="progress-bar-container"><div class="progress-bar" style="width: {hiraganaMastery}%;"></div></div>
    </div>
    <div class="progress-item">
      <p>{$t('katakana_mastery')}: {katakanaMastery.toFixed(1)}%</p>
      <div class="progress-bar-container"><div class="progress-bar" style="width: {katakanaMastery}%;"></div></div>
    </div>
    <div class="progress-item">
      <p>{$t('kanji_mastery')}: {kanjiMastery.toFixed(1)}%</p>
      <div class="progress-bar-container"><div class="progress-bar" style="width: {kanjiMastery}%;"></div></div>
    </div>
    <div class="progress-item">
      <p>{$t('vocabulary_mastery')}: {vocabularyMastery.toFixed(1)}%</p>
      <div class="progress-bar-container"><div class="progress-bar" style="width: {vocabularyMastery}%;"></div></div>
    </div>
  </section>

  <section class="progress-section">
    <h3>{$t('gamification_stats')}</h3>
    <p>{$t('current_streak')}: 🔥 {$gamificationProgress.currentStreak} {$t('days')}</p>
    <p>{$t('longest_streak')}: 🏆 {$gamificationProgress.longestStreak} {$t('days')}</p>
    <p>{$t('total_points')}: ⭐ {$gamificationProgress.totalPoints}</p>
  </section>

  <section class="progress-section">
    <h3>{$t('personal_notes')}</h3>
    <Notes />
  </section>
</div>

<style>
  .progress-container {
    padding: 20px;
    text-align: center;
  }

  .progress-section {
    margin-top: 20px;
    border: 1px solid var(--border-color);
    padding: 15px;
    border-radius: 8px;
    background-color: var(--card-background);
    text-align: left;
  }

  .progress-section h3 {
    color: var(--text-color-primary);
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
  }

  .progress-item {
    margin-bottom: 10px;
  }

  .progress-item p {
    margin-bottom: 5px;
    color: var(--text-color-secondary);
  }

  .progress-bar-container {
    width: 100%;
    background-color: var(--background-color-secondary);
    border-radius: 5px;
    overflow: hidden;
    height: 15px;
  }

  .progress-bar {
    height: 100%;
    background-color: var(--primary-color);
    border-radius: 5px;
    transition: width 0.5s ease-in-out;
  }
</style>