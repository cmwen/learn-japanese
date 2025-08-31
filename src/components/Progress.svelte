<script>
  import { t } from '../lib/i18n';
  import { masteryProgress, gamificationProgress } from '../lib/stores';
  import { getAverageDailyStudyTime, formatStudyTime } from '../lib/utils';
  import { hiragana, katakana } from '../data/kana';
  import { kanjiData } from '../data/kanji';
  import { vocabulary } from '../data/vocabulary';
  import Notes from './Notes.svelte';
  import { Chart, registerables } from 'chart.js';
  import { onMount } from 'svelte';

  Chart.register(...registerables);

  let chartCanvas;
  let chart;

  // Calculate mastery percentages
  $: hiraganaMastery = ($masteryProgress.hiragana.length / hiragana.length) * 100;
  $: katakanaMastery = ($masteryProgress.katakana.length / katakana.length) * 100;
  $: kanjiMastery = ($masteryProgress.kanji.length / kanjiData.length) * 100;
  $: vocabularyMastery = ($masteryProgress.vocabulary.length / vocabulary.length) * 100;

  $: masteryData = [hiraganaMastery, katakanaMastery, kanjiMastery, vocabularyMastery];

  onMount(() => {
    if (chartCanvas) {
      createChart();
    }
  });

  // Update chart when mastery data changes
  $: if (chart && masteryData) {
    chart.data.datasets[0].data = masteryData;
    chart.update();
  }

  function createChart() {
    const ctx = chartCanvas.getContext('2d');
    chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Hiragana', 'Katakana', 'Kanji', 'Vocabulary'],
        datasets: [{
          data: masteryData,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'var(--text-color-primary)',
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed.toFixed(1) + '%';
              }
            }
          }
        }
      }
    });
  }
</script>

<div class="progress-container">
  <h2>{$t('progress_tracking')}</h2>
  <p>{$t('progress_description')}</p>

  <section class="progress-section">
    <h3>{$t('your_mastery')}</h3>
    <div class="mastery-overview">
      <div class="progress-bars">
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
      </div>
      <div class="chart-container">
        <canvas bind:this={chartCanvas} width="300" height="300"></canvas>
      </div>
    </div>
  </section>

  <section class="progress-section">
    <h3>{$t('gamification_stats')}</h3>
    <p>{$t('current_streak')}: 🔥 {$gamificationProgress.currentStreak} {$t('days')}</p>
    <p>{$t('longest_streak')}: 🏆 {$gamificationProgress.longestStreak} {$t('days')}</p>
    <p>{$t('total_points')}: ⭐ {$gamificationProgress.totalPoints}</p>
    <p>{$t('total_study_time')}: 📚 {formatStudyTime($gamificationProgress.totalStudyTime || 0)}</p>
    <p>{$t('average_daily_study')}: ⏱️ {formatStudyTime(getAverageDailyStudyTime())}</p>
    {#if $gamificationProgress.dailyStudyTime}
      {@const today = new Date().toISOString().split('T')[0]}
      {@const todayStudyTime = $gamificationProgress.dailyStudyTime[today] || 0}
      <p>{$t('study_time_today')}: 🕒 {formatStudyTime(todayStudyTime)}</p>
    {/if}
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

  .mastery-overview {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    align-items: start;
  }

  .chart-container {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    .mastery-overview {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .chart-container {
      height: 250px;
    }
  }

  .progress-bars {
    display: flex;
    flex-direction: column;
    gap: 15px;
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