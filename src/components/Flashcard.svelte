<script>
  import { createEventDispatcher } from 'svelte';

  export let kana = {}; // { id, kana, romaji }
  export let flipped = false;

  const dispatch = createEventDispatcher();

  function toggleFlip() {
    flipped = !flipped;
    dispatch('flip', { flipped });
  }
</script>

<div class="flashcard" on:click={toggleFlip} class:flipped={flipped}>
  <div class="flashcard-inner">
    <div class="flashcard-front">
      <span class="kana-char">{kana.kana}</span>
    </div>
    <div class="flashcard-back">
      <span class="romaji">{kana.romaji}</span>
    </div>
  </div>
</div>

<style>
  .flashcard {
    width: 180px; /* Slightly wider */
    height: 180px;
    perspective: 1000px;
    cursor: pointer;
    margin: 20px auto;
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 10px;
  }

  .flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
  }

  .flashcard-front, .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px; /* Add padding */
    box-sizing: border-box; /* Include padding in width/height */
  }

  .flashcard-front {
    background-color: #f0f8ff; /* Light blue */
    color: #333;
    font-size: 3em;
    word-break: break-word; /* Allow long words to break */
  }

  .flashcard-back {
    background-color: #e0ffff; /* Lighter blue */
    color: #333;
    transform: rotateY(180deg);
    font-size: 2em;
    word-break: break-word; /* Allow long words to break */
  }

  .kana-char {
    font-size: 1.8em;
    font-weight: bold;
  }

  .romaji {
    font-size: 1.2em;
  }

  /* Responsive font sizes for smaller screens */
  @media (max-width: 600px) {
    .flashcard {
      width: 150px;
      height: 150px;
    }
    .flashcard-front {
      font-size: 2.5em;
    }
    .flashcard-back {
      font-size: 1.8em;
    }
  }
</style>
