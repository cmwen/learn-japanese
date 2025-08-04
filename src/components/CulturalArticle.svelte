<script>
  import { t } from '../lib/i18n';
  import { marked } from 'marked';
  import Tooltip from './Tooltip.svelte';

  export let article;

  let renderedContent = '';

  // Function to process article content for furigana and tooltips
  function processArticleContent(text) {
    // Placeholder for furigana - a real implementation would be more robust
    let processedText = text
      .replace(/日本/g, '<ruby>日本<rt>にほん</rt></ruby>')
      .replace(/花見/g, '<ruby>花見<rt>はなみ</rt></ruby>')
      .replace(/神社/g, '<ruby>神社<rt>じんじゃ</rt></ruby>')
      .replace(/鳥居/g, '<ruby>鳥居<rt>とりい</rt></ruby>');

    // Placeholder for tooltips - wrapping specific words with the Tooltip component
    // In a real scenario, this would likely come from a structured data source
    processedText = processedText
      .replace(/桜/g, '<span class="tooltip-wrapper"><Tooltip text="桜" tooltipContent="Cherry blossom, a symbol of Japan." link="/explore/cultural-articles/sakura"/></span>')
      .replace(/武士/g, '<span class="tooltip-wrapper"><Tooltip text="武士" tooltipContent="Samurai, a member of a powerful military caste in feudal Japan." link="/explore/cultural-articles/samurai"/></span>');

    return processedText;
  }

  $: if (article) {
    const contentWithFuriganaAndTooltips = processArticleContent(article.content);
    renderedContent = marked(contentWithFuriganaAndTooltips);
  }
</script>

<div class="cultural-article-detail">
  {#if article.image}
    <img src={article.image} alt={article.title} class="article-image" />
  {/if}
  <h2>{article.title}</h2>
  <div class="article-content">
    {@html renderedContent}
  </div>

  {#if article.keywords && article.keywords.length > 0}
    <div class="article-keywords">
      <strong>{$t('keywords')}:</strong>
      {#each article.keywords as keyword}
        <span>{keyword}</span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .cultural-article-detail {
    padding: 20px;
    background-color: var(--card-background);
    border-radius: 8px;
    margin-top: 20px;
    text-align: left;
  }

  .article-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .cultural-article-detail h2 {
    color: var(--text-color-primary);
    margin-bottom: 15px;
  }

  .article-content {
    color: var(--text-color-secondary);
    line-height: 1.6;
  }

  .article-content :global(h1), .article-content :global(h2), .article-content :global(h3) {
    color: var(--text-color-primary);
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .article-content :global(p) {
    margin-bottom: 10px;
  }

  .article-content :global(ul) {
    list-style-type: disc;
    margin-left: 20px;
    margin-bottom: 10px;
  }

  .article-content :global(li) {
    margin-bottom: 5px;
  }

  .article-keywords {
    margin-top: 20px;
    font-size: 0.9em;
    color: var(--text-color-secondary);
  }

  .article-keywords span {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  /* Style for furigana */
  .article-content :global(ruby) {
    ruby-align: center;
  }

  .article-content :global(rt) {
    font-size: 0.6em;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
</style>