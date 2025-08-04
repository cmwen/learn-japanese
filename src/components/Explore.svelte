<script>
  import { t } from '../lib/i18n';
  import { culturalArticles } from '../data/cultural/cultural_articles';
  import { navigate } from '../lib/router';
  import CulturalArticle from './CulturalArticle.svelte';
  import InputMethodGuideList from './InputMethodGuideList.svelte';
  import InputMethodGuideDetail from './InputMethodGuideDetail.svelte';
  import { inputMethodGuides } from '../data/input_methods/input_method_guides';

  let selectedArticle = null;
  let selectedInputMethodGuide = null;

  // Group cultural articles by category
  const culturalCategories = {};
  culturalArticles.forEach(article => {
    if (!culturalCategories[article.category]) {
      culturalCategories[article.category] = [];
    }
    culturalCategories[article.category].push(article);
  });

  function selectArticle(articleId) {
    selectedArticle = culturalArticles.find(article => article.id === articleId);
    selectedInputMethodGuide = null; // Clear selected guide
    navigate(`/explore/articles/${articleId}`);
  }

  function selectInputMethodGuide(guide) {
    selectedInputMethodGuide = guide;
    selectedArticle = null; // Clear selected article
    navigate(`/explore/input-methods/${guide.id}`);
  }

  // Handle direct navigation to an article or guide if the URL matches
  import { currentRoute } from '../lib/router';
  import { onMount } from 'svelte';

  onMount(() => {
    const pathParts = $currentRoute.split('/');
    if (pathParts.length >= 3 && pathParts[1] === 'explore') {
      if (pathParts[2] === 'articles' && pathParts.length === 4) {
        const articleId = pathParts[3];
        selectArticle(articleId);
      } else if (pathParts[2] === 'input-methods' && pathParts.length === 4) {
        const guideId = pathParts[3];
        selectedInputMethodGuide = inputMethodGuides.find(guide => guide.id === guideId);
        selectedArticle = null;
      }
    }
  });

  // Fact of the Day (simple rotation for now)
  let factOfTheDay = 'Loading fact...';
  const facts = [
    'Did you know that Japan has more vending machines per capita than any other country?',
    'The world\'s oldest company, Kongo Gumi, was a Japanese construction company that lasted for over 1,400 years.',
    'Japan consists of over 6,800 islands!',
    'Sumo wrestling is Japan\'s national sport.'
  ];

  onMount(() => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    factOfTheDay = facts[randomIndex];
  });
</script>

<div class="explore-container">
  {#if selectedArticle}
    <button on:click={() => { selectedArticle = null; navigate('/explore'); }}>{$t('back_to_explore')}</button>
    <CulturalArticle article={selectedArticle} />
  {:else if selectedInputMethodGuide}
    <button on:click={() => { selectedInputMethodGuide = null; navigate('/explore'); }}>{$t('back_to_explore')}</button>
    <InputMethodGuideDetail guide={selectedInputMethodGuide} />
  {:else}
    <h2>{$t('explore_section_title')}</h2>
    <p>{$t('explore_section_description')}</p>

    <div class="fact-of-the-day">
      <h3>{$t('fact_of_the_day')}</h3>
      <p>{factOfTheDay}</p>
    </div>

    <div class="cultural-articles-grid">
      {#each Object.entries(culturalCategories) as [categoryName, articles] (categoryName)}
        <section class="article-category-section">
          <h3>{categoryName}</h3>
          <div class="articles-list">
            {#each articles as article}
              <div class="article-card" on:click={() => selectArticle(article.id)}>
                <h4>{article.title}</h4>
                <p>{article.keywords.join(', ')}</p>
              </div>
            {/each}
          </div>
        </section>
      {/each}
    </div>

    <div class="input-methods">
      <h3>{$t('input_methods')}</h3>
      <InputMethodGuideList guides={inputMethodGuides} onSelectGuide={selectInputMethodGuide} />
    </div>
  {/if}
</div>

<style>
  .explore-container {
    padding: 20px;
    text-align: center;
  }

  .fact-of-the-day {
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .cultural-articles-grid {
    display: grid;
    gap: 20px;
    margin-top: 30px;
  }

  .article-category-section {
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    padding: 20px;
    border-radius: 8px;
    text-align: left;
  }

  .articles-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }

  .article-card {
    border: 1px solid var(--card-border);
    padding: 15px;
    border-radius: 8px;
    background-color: var(--background-color-secondary);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .article-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .article-card h4 {
    margin-top: 0;
    color: var(--text-color-primary);
  }

  .article-card p {
    font-size: 0.9em;
    color: var(--text-color-secondary);
  }

  .input-methods {
    margin-top: 30px;
    border: 1px solid var(--border-color);
    padding: 20px;
    border-radius: 8px;
    background-color: var(--card-background);
  }
</style>