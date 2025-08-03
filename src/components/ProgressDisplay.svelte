<script>
  import { gamificationProgress } from '../lib/stores';
  export let t;
</script>

<div class="progress-display">
  <h2>{t('your_progress')}</h2>
  <div class="progress-metrics">
    <div class="metric-item">
      <span class="metric-value">{$gamificationProgress.currentStreak}</span>
      <span class="metric-label">{t('current_streak')}</span>
    </div>
    <div class="metric-item">
      <span class="metric-value">{$gamificationProgress.longestStreak}</span>
      <span class="metric-label">{t('longest_streak')}</span>
    </div>
    <div class="metric-item">
      <span class="metric-value">{$gamificationProgress.totalPoints}</span>
      <span class="metric-label">{t('total_points')}</span>
    </div>
  </div>
</div>

<style>
  .progress-display {
    margin-top: 20px;
    border: 1px solid var(--border-color);
    padding: 15px;
    border-radius: 8px;
    background-color: var(--card-background);
    text-align: center;
  }

  .progress-metrics {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .metric-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  .metric-value {
    font-size: 2.5em;
    font-weight: bold;
    color: var(--primary-color);
  }

  .metric-label {
    font-size: 0.9em;
    color: var(--text-color-light);
    margin-top: 5px;
  }
</style>