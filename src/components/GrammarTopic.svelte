<script>
  import { t } from '../lib/i18n';
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import Furigana from './Furigana.svelte';
  import { furiganaVisibility } from '../lib/stores';

  export let topic;

  let renderedContent = '';

  let currentQuestionIndex = 0;
  let selectedOption = null;
  let isCorrect = false;
  let showFeedback = false;
  let quizCompleted = false;

  onMount(() => {
    renderedContent = marked(topic.content);
  });

  function selectOption(option) {
    selectedOption = option;
    showFeedback = false;
  }

  function checkAnswer() {
    if (selectedOption === topic.quiz[currentQuestionIndex].answer) {
      isCorrect = true;
    } else {
      isCorrect = false;
    }
    showFeedback = true;
  }

  function nextQuestion() {
    if (currentQuestionIndex < topic.quiz.length - 1) {
      currentQuestionIndex++;
      selectedOption = null;
      isCorrect = false;
      showFeedback = false;
    } else {
      quizCompleted = true;
    }
  }

  function resetQuiz() {
    currentQuestionIndex = 0;
    selectedOption = null;
    isCorrect = false;
    showFeedback = false;
    quizCompleted = false;
  }
</script>

<div class="grammar-topic-detail">
  <h2>{topic.title}</h2>
  <div class="grammar-content">
    {@html renderedContent}
  </div>

  {#if topic.examples && topic.examples.length > 0}
    <h3>{$t('examples')}</h3>
    <ul>
      {#each topic.examples as example}
        <li>{#if $furiganaVisibility}<Furigana japanese={example.japanese} reading={example.reading} />{:else}{example.japanese}{/if} ({example.romaji}) - {$t(example.english)}</li>
      {/each}
    </ul>
  {/if}

  {#if topic.nuances && topic.nuances.length > 0}
    <h3>{$t('nuances_tips')}</h3>
    <ul>
      {#each topic.nuances as nuance}
        <li>{$t(nuance)}</li>
      {/each}
    </ul>
  {/if}

  {#if topic.quiz && topic.quiz.length > 0}
    <h3>{$t('mini_quiz')}</h3>
    {#if !quizCompleted}
      <div class="quiz-container">
        <p class="question">{topic.quiz[currentQuestionIndex].question}</p>
        <div class="options">
          {#each topic.quiz[currentQuestionIndex].options as option}
            <button
              class:selected={selectedOption === option}
              class:correct={showFeedback && option === topic.quiz[currentQuestionIndex].answer}
              class:incorrect={showFeedback && selectedOption === option && selectedOption !== topic.quiz[currentQuestionIndex].answer}
              on:click={() => selectOption(option)}
              disabled={showFeedback}
            >
              {option}
            </button>
          {/each}
        </div>
        {#if showFeedback}
          <p class="feedback" class:correct={isCorrect} class:incorrect={!isCorrect}>
            {#if isCorrect}
              {$t('correct_answer')}
            {:else}
              {$t('incorrect_answer')} {$t('correct_is')} {topic.quiz[currentQuestionIndex].answer}
            {/if}
          </p>
          <button on:click={nextQuestion}>{$t('next_question')}</button>
        {:else}
          <button on:click={checkAnswer} disabled={selectedOption === null}>{$t('check_answer')}</button>
        {/if}
      </div>
    {:else}
      <div class="quiz-completed">
        <p>{$t('quiz_complete')}</p>
        <button on:click={resetQuiz}>{$t('start_new_quiz')}</button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .grammar-topic-detail {
    padding: 20px;
    background-color: var(--card-background);
    border-radius: 8px;
    margin-top: 20px;
    text-align: left;
  }

  .grammar-topic-detail h2 {
    color: var(--text-color-primary);
    margin-bottom: 15px;
  }

  .grammar-content {
    color: var(--text-color-secondary);
    line-height: 1.6;
  }

  .grammar-content :global(h1), .grammar-content :global(h2), .grammar-content :global(h3) {
    color: var(--text-color-primary);
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .grammar-content :global(p) {
    margin-bottom: 10px;
  }

  .grammar-content :global(ul) {
    list-style-type: disc;
    margin-left: 20px;
    margin-bottom: 10px;
  }

  .grammar-content :global(li) {
    margin-bottom: 5px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 8px;
    color: var(--text-color-secondary);
  }

  .quiz-container {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--background-color-secondary);
  }

  .question {
    font-size: 1.1em;
    margin-bottom: 15px;
    color: var(--text-color-primary);
  }

  .options button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .options button:hover:not(:disabled) {
    background-color: #0056b3;
  }

  .options button.selected {
    border: 2px solid var(--secondary-color);
  }

  .options button.correct {
    background-color: #4CAF50; /* Green for correct */
  }

  .options button.incorrect {
    background-color: #f44336; /* Red for incorrect */
  }

  .feedback {
    margin-top: 15px;
    font-weight: bold;
  }

  .feedback.correct {
    color: #4CAF50;
  }

  .feedback.incorrect {
    color: #f44336;
  }

  .quiz-completed {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--background-color-secondary);
    text-align: center;
  }
</style>