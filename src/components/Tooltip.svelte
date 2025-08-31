<script>
  export let text;
  export let tooltipContent;
  export let link = '';

  let showTooltip = false;

  function handleMouseEnter() {
    showTooltip = true;
  }

  function handleMouseLeave() {
    showTooltip = false;
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showTooltip = !showTooltip;
    } else if (event.key === 'Escape') {
      showTooltip = false;
    }
  }
</script>

<span
  class="tooltip-container"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:keydown={handleKeyDown}
  role="button"
  tabindex="0"
  aria-expanded={showTooltip}
  aria-describedby={showTooltip ? 'tooltip-content' : undefined}
>
  {text}
  {#if showTooltip}
    <div class="tooltip-content" id="tooltip-content" role="tooltip">
      <p>{tooltipContent}</p>
      {#if link}
        <a href={link} target="_blank" rel="noopener noreferrer">Read More</a>
      {/if}
    </div>
  {/if}
</span>

<style>
  .tooltip-container {
    position: relative;
    display: inline-block;
    cursor: help;
    border-bottom: 1px dotted var(--text-color-secondary);
  }

  .tooltip-container:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .tooltip-content {
    visibility: hidden;
    width: 200px;
    background-color: var(--background-color-secondary);
    color: var(--text-color-primary);
    text-align: center;
    border-radius: 6px;
    padding: 10px;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* Position the tooltip above the text */
    left: 50%;
    margin-left: -100px; /* Center the tooltip */
    opacity: 0;
    transition: opacity 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    font-size: 0.9em;
  }

  .tooltip-container:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
  }

  .tooltip-content::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--background-color-secondary) transparent transparent transparent;
  }

  .tooltip-content p {
    margin-bottom: 5px;
  }

  .tooltip-content a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: bold;
  }

  .tooltip-content a:hover {
    text-decoration: underline;
  }
</style>