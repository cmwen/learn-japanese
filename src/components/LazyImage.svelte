<script>
  import { onMount } from 'svelte';

  export let src = '';
  export let alt = '';
  export let className = '';
  export let loading = 'lazy';
  export let placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPg==';

  let imageElement;
  let loaded = false;
  let error = false;
  let intersecting = false;

  onMount(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting = true;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    );

    if (imageElement) {
      observer.observe(imageElement);
    }

    return () => {
      if (imageElement) {
        observer.unobserve(imageElement);
      }
    };
  });

  function handleLoad() {
    loaded = true;
    error = false;
  }

  function handleError() {
    error = true;
    loaded = false;
  }
</script>

<div bind:this={imageElement} class="lazy-image-container {className}">
  {#if intersecting}
    <img
      {src}
      {alt}
      {loading}
      class="lazy-image {loaded ? 'loaded' : ''} {error ? 'error' : ''}"
      on:load={handleLoad}
      on:error={handleError}
    />
  {:else}
    <img
      src={placeholder}
      {alt}
      class="lazy-image placeholder"
    />
  {/if}
</div>

<style>
  .lazy-image-container {
    position: relative;
    overflow: hidden;
  }

  .lazy-image {
    width: 100%;
    height: auto;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  .lazy-image.loaded {
    opacity: 1;
  }

  .lazy-image.error {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .lazy-image.placeholder {
    opacity: 0.7;
  }

  /* Responsive image behavior */
  .lazy-image {
    max-width: 100%;
    height: auto;
  }
</style>
