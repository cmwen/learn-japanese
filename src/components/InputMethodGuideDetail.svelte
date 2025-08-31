<script>
  import { t } from '../lib/i18n';

  export let guide;
</script>

<div class="guide-detail-container">
  {#if guide}
    <h2>{guide.title}</h2>
    <p class="guide-description">{guide.description}</p>
    
    <div class="guide-content">
      <h3>Step-by-Step Instructions</h3>
      {#each guide.steps as step, index}
        <div class="step">
          <h4>Step {index + 1}: {step.title}</h4>
          <p class="step-description">{step.description}</p>
          <ol class="step-details">
            {#each step.details as detail}
              <li>{detail}</li>
            {/each}
          </ol>
        </div>
      {/each}
      
      {#if guide.troubleshooting && guide.troubleshooting.length > 0}
        <div class="troubleshooting-section">
          <h3>Troubleshooting</h3>
          {#each guide.troubleshooting as item}
            <div class="troubleshooting-item">
              <h4>Problem: {item.problem}</h4>
              <p class="solution"><strong>Solution:</strong> {item.solution}</p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <p>{$t('select_a_guide')}</p>
  {/if}
</div>

<style>
  .guide-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }

  .guide-description {
    font-size: 1.1em;
    color: var(--text-color-secondary);
    margin-bottom: 30px;
  }

  .guide-content h3 {
    color: var(--text-color-primary);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 5px;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .step {
    background-color: var(--card-background);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .step h4 {
    color: var(--primary-color);
    margin-top: 0;
    margin-bottom: 10px;
  }

  .step-description {
    color: var(--text-color-secondary);
    margin-bottom: 15px;
  }

  .step-details {
    margin: 0;
    padding-left: 20px;
  }

  .step-details li {
    margin-bottom: 8px;
    color: var(--text-color);
  }

  .troubleshooting-section {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
  }

  .troubleshooting-item {
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 15px;
  }

  .troubleshooting-item h4 {
    color: #856404;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .solution {
    margin: 0;
    color: #856404;
  }

  /* Dark theme adjustments */
  :global(body.theme-dark) .troubleshooting-item {
    background-color: #4a4a2a;
    border-color: #6b6b3a;
  }

  :global(body.theme-dark) .troubleshooting-item h4,
  :global(body.theme-dark) .solution {
    color: #f4d03f;
  }

  @media (max-width: 600px) {
    .guide-detail-container {
      padding: 15px;
    }
    
    .step {
      padding: 15px;
    }
  }
</style>