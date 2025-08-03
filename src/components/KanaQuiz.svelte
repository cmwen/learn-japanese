<script>
  import { hiragana, katakana } from '../data/kana';
  import { t } from '../lib/i18n';
  import { masteryProgress } from '../lib/stores';
  import Flashcard from './Flashcard.svelte';
  import { onMount } from 'svelte';

  let allKana = [...hiragana, ...katakana];
  let quizDeck = [];
  let currentCard = null;
  let flipped = false;

  onMount(() => {
    startQuiz();
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startQuiz() {
    quizDeck = shuffleArray([...allKana]);
    nextCard();
  }

  function nextCard() {
    if (quizDeck.length > 0) {
      currentCard = quizDeck.pop();
      flipped = false;
    } else {
      currentCard = null; // Quiz finished
      alert($t('quiz_finished')); // Need to add this translation
    }
  }

  function handleFlip() {
    flipped = true;
  }

  function handleKnewIt() {
    if (currentCard) {
      masteryProgress.update(progress => {
        const type = currentCard.type || (currentCard.id.startsWith('h_') ? 'hiragana' : 'katakana');
        if (!progress[type].includes(currentCard.id)) {
          progress[type].push(currentCard.id);
        }
        return progress;
      });
    }
    nextCard();
  }

  function handleDidntKnow() {
    // Optionally re-add to deck for review later, or just move on
    nextCard();
  }
</script>

<div class="kana-quiz">
  <h2>{$t('quiz')}</h2>

  {#if currentCard}
    <Flashcard kana={currentCard} bind:flipped={flipped} on:flip={handleFlip} />

    {#if flipped}
      <div class="quiz-controls">
        <button on:click={handleKnewIt}>{$t('i_knew_it')}</button>
        <button on:click={handleDidntKnow}>{$t('i_didnt_know')}</button>
      </div>
    {/if}
  {:else}
    <p>{$t('quiz_complete')}</p> <!-- Need to add this translation -->
    <button on:click={startQuiz}>{$t('start_new_quiz')}</button> <!-- Need to add this translation -->
  {/if}
</div>

<style>
  .kana-quiz {
    margin-top: 20px;
    border: 1px solid #eee;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
    text-align: center;
  }
  .quiz-controls button {
    padding: 10px 20px;
    margin: 10px;
    font-size: 1em;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  .quiz-controls button:first-child {
    background-color: #28a745; /* Green for knew it */
    color: white;
  }
  .quiz-controls button:first-child:hover {
    background-color: #218838;
  }
  .quiz-controls button:last-child {
    background-color: #dc3545; /* Red for didn't know */
    color: white;
  }
  .quiz-controls button:last-child:hover {
    background-color: #c82333;
  }
</style>
