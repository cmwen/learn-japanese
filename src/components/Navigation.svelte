<script>
  import { createEventDispatcher } from 'svelte';
  import { t } from '../lib/i18n';

  const dispatch = createEventDispatcher();

  export let activeView = 'kana_charts'; // Default active view

  function setView(view) {
    activeView = view;
    dispatch('navigate', view);
  }
</script>

<nav>
  <button on:click={() => setView('kana_charts')} class:active={activeView === 'kana_charts'}>{$t('hiragana_chart')}</button>
  <button on:click={() => setView('kanji_charts')} class:active={activeView === 'kanji_charts'}>{$t('kanji_chart')}</button>
  <button on:click={() => setView('vocabulary_list')} class:active={activeView === 'vocabulary_list'}>{$t('vocabulary_list')}</button>
  <button on:click={() => setView('progress')} class:active={activeView === 'progress'}>{$t('progress')}</button>
  <button on:click={() => setView('quiz')} class:active={activeView === 'quiz'}>{$t('quiz')}</button>
  <button on:click={() => setView('settings')} class:active={activeView === 'settings'}>{$t('settings')}</button>
</nav>

<style>
  nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
  }

  button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  button.active {
    background-color: #0056b3;
    border-bottom: 3px solid #00c0ff;
  }
</style>
