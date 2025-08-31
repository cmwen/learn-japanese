<script>
  import { navigate, currentRoute } from '../lib/router';
  import { t } from '../lib/i18n';

  $: activeView = $currentRoute.substring(1) || 'learn';

  function setView(path) {
    navigate(path);
  }

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      isMenuOpen = false;
    }
  }
</script>

<nav aria-label="Main navigation">
  <button 
    class="menu-toggle" 
    on:click={toggleMenu}
    aria-expanded={isMenuOpen}
    aria-controls="main-menu"
    aria-label="Toggle navigation menu"
  >
    ☰
  </button>
  
  <div 
    class="nav-menu" 
    class:open={isMenuOpen}
    id="main-menu"
    role="menu"
    tabindex="-1"
    on:keydown={handleKeyDown}
  >
    <button on:click={() => setView('/learn')} class:active={activeView === 'learn'} aria-current={activeView === 'learn' ? 'page' : undefined}>{$t('learn')}</button>
    <button on:click={() => setView('/explore')} class:active={activeView === 'explore'} aria-current={activeView === 'explore' ? 'page' : undefined}>{$t('explore')}</button>
    <button on:click={() => setView('/progress')} class:active={activeView === 'progress'} aria-current={activeView === 'progress' ? 'page' : undefined}>{$t('progress')}</button>
    <button on:click={() => setView('/kana_charts')} class:active={activeView === 'kana_charts'} aria-current={activeView === 'kana_charts' ? 'page' : undefined}>{$t('hiragana_chart')}</button>
    <button on:click={() => setView('/kanji_charts')} class:active={activeView === 'kanji_charts'} aria-current={activeView === 'kanji_charts' ? 'page' : undefined}>{$t('kanji_chart')}</button>
    <button on:click={() => setView('/vocabulary_list')} class:active={activeView === 'vocabulary_list'} aria-current={activeView === 'vocabulary_list' ? 'page' : undefined}>{$t('vocabulary_list')}</button>
    <button on:click={() => setView('/quiz')} class:active={activeView === 'quiz'} aria-current={activeView === 'quiz' ? 'page' : undefined}>{$t('quiz')}</button>
    <button on:click={() => setView('/settings')} class:active={activeView === 'settings'} aria-current={activeView === 'settings' ? 'page' : undefined}>{$t('settings')}</button>
  </div>
</nav>

<style>
  nav {
    position: relative;
    margin-bottom: 20px;
  }

  .menu-toggle {
    display: none;
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  .nav-menu {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .nav-menu button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
    white-space: nowrap;
  }

  .nav-menu button:hover, .nav-menu button:focus {
    background-color: #0056b3;
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }

  .nav-menu button.active {
    background-color: #0056b3;
    border-bottom: 3px solid #00c0ff;
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
    }

    .nav-menu {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--card-background);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      padding: 10px;
    }

    .nav-menu.open {
      display: flex;
    }

    .nav-menu button {
      width: 100%;
      margin-bottom: 5px;
      text-align: left;
    }
  }

  /* Tablet styles */
  @media (max-width: 1024px) and (min-width: 769px) {
    .nav-menu {
      gap: 8px;
    }
    
    .nav-menu button {
      padding: 8px 12px;
      font-size: 0.9em;
    }
  }
</style>
