<script>
  import { t } from '../lib/i18n';
  import { grammarCategories } from '../data/grammar/grammar_content';
  import { navigate } from '../lib/router';
  import GrammarTopic from './GrammarTopic.svelte';

  let selectedTopic = null;

  function selectTopic(categoryId, topicId) {
    navigate(`/learn/${categoryId}/${topicId}`);
  }

  import { currentRoute } from '../lib/router';

  $: {
    const path = $currentRoute;
    const pathParts = path.split('/');
    if (pathParts.length === 4 && pathParts[1] === 'learn') {
      const categoryId = pathParts[2];
      const topicId = pathParts[3];
      const category = grammarCategories.find(cat => cat.id === categoryId);
      if (category) {
        selectedTopic = category.topics.find(topic => topic.id === topicId);
      } else {
        selectedTopic = null; // Category not found
      }
    } else if (pathParts.length === 2 && pathParts[1] === 'learn') {
      selectedTopic = null;
    } else {
      selectedTopic = null; // Not a learn path
    }
  }
</script>

<div class="learn-container">
  {#if selectedTopic}
    <button on:click={() => { selectedTopic = null; navigate('/learn'); }}>{$t('back_to_categories')}</button>
    <GrammarTopic topic={selectedTopic} />
  {:else}
    <h2>{$t('learn_section_title')}</h2>
    <p>{$t('learn_section_description')}</p>

        <div class="grammar-categories-grid">
      {#each grammarCategories as category}
        <div class="grammar-category-card">
          <h3>{category.title}</h3>
          <p>{category.description}</p>
          <!-- Progress indicator will go here -->
          <div class="category-topics">
            {#each category.topics as topic}
              <button on:click={() => selectTopic(category.id, topic.id)}>{topic.title}</button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .learn-container {
    padding: 20px;
    text-align: center;
  }

  .grammar-categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .grammar-category-card {
    border: 1px solid var(--border-color);
    padding: 20px;
    border-radius: 8px;
    background-color: var(--card-background);
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .grammar-category-card h3 {
    color: var(--text-color-primary);
    margin-top: 0;
  }

  .grammar-category-card p {
    color: var(--text-color-secondary);
    flex-grow: 1;
  }

  .grammar-category-card button {
    margin-top: 15px;
    /* align-self: flex-end; */ /* Removed this as it might interfere with flex-wrap */
  }

  .category-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
  }

  .category-topics button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s ease;
  }

  .category-topics button:hover {
    background-color: #0056b3;
  }
</style>